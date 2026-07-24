import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { localMentorReply, type MentorMessage } from "@/lib/mentor";

export const runtime = "nodejs";

/**
 * AI Mentor endpoint — priority order:
 *  1. Google Gemini via direct REST API (handles both AQ. OAuth tokens and AIza API keys)
 *  2. Anthropic Claude (if ANTHROPIC_API_KEY set)
 *  3. Offline local keyword responder (always works, never crashes)
 */

const SYSTEM_PROMPT = `You are the "AI Mentor" inside SkillRoute, a platform that teaches programming, web development, data analytics, and AI to complete beginners — including people who have never written code and get bored by dry, academic explanations.

Your job is to ACTUALLY HELP and TEACH, clearly and warmly. Rules:
- Answer the real question directly. Give a genuinely useful explanation — do not just deflect.
- Assume zero prior knowledge. Explain like you're talking to a curious friend who hates jargon.
- Lead every concept with a plain-English idea or everyday analogy BEFORE any math or code.
- Keep answers short and skimmable: 2-4 short paragraphs or a tiny bullet list. Never a wall of text.
- When you show code, keep it minimal and explain each line in plain words.
- Be encouraging and human. A little warmth or humour is good. Never condescending.
- If the learner is overwhelmed, slow down, reassure them, and break the idea into one tiny piece.
Stay on topic: coding, web, data, AI/ML, tools (Git, SQL, Excel), projects, careers, and study help.`;

// Models to try in order — covers both v1 and v1beta endpoints.
const GEMINI_MODELS = [
  { api: "v1beta", model: "gemini-1.5-flash" },
  { api: "v1beta", model: "gemini-1.5-flash-latest" },
  { api: "v1beta", model: "gemini-pro" },
  { api: "v1",     model: "gemini-pro" },
  { api: "v1",     model: "gemini-1.5-flash-001" },
];

async function callGeminiREST(
  geminiKey: string,
  question: string,
  history: MentorMessage[]
): Promise<string | null> {
  // AQ. = OAuth2 access token → use Bearer header
  // AIza... = API key → use ?key= query param
  const isOAuth = geminiKey.startsWith("AQ.");

  // Build contents array (system prompt prepended as first user turn for compatibility)
  const systemMsg = { role: "user",  parts: [{ text: `[System]: ${SYSTEM_PROMPT}` }] };
  const systemAck = { role: "model", parts: [{ text: "Understood. I'll follow those instructions." }] };

  const historyMsgs = history
    .filter((m) => m.role === "user" || m.role === "mentor")
    .map((m) => ({
      role: m.role === "mentor" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  // Drop leading model messages (Gemini requires history to start with user)
  const firstUserIdx = historyMsgs.findIndex((m) => m.role === "user");
  const cleanHistory = firstUserIdx >= 0 ? historyMsgs.slice(firstUserIdx) : [];

  const contents = [
    systemMsg,
    systemAck,
    ...cleanHistory,
    { role: "user", parts: [{ text: question }] },
  ];

  for (const { api, model } of GEMINI_MODELS) {
    try {
      const baseUrl = isOAuth
        ? `https://generativelanguage.googleapis.com/${api}/models/${model}:generateContent`
        : `https://generativelanguage.googleapis.com/${api}/models/${model}:generateContent?key=${geminiKey}`;

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (isOAuth) headers["Authorization"] = `Bearer ${geminiKey}`;

      const res = await fetch(baseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          contents,
          generationConfig: { maxOutputTokens: 700, temperature: 0.7 },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`Gemini ${api}/${model} failed (${res.status}):`, errText.slice(0, 200));
        continue; // Try next model
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (text) {
        console.log(`✓ Gemini responded via ${api}/${model}`);
        return text;
      }
    } catch (err) {
      console.warn(`Gemini ${api}/${model} threw:`, err);
    }
  }

  return null; // All models failed
}

export async function POST(req: Request) {
  let history: MentorMessage[] = [];
  let question = "";
  try {
    const body = await req.json();
    history = Array.isArray(body?.messages) ? body.messages : [];
    question = String(body?.question ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // ── 1. Try Google Gemini (free) ──────────────────────────────────────────
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (geminiKey) {
    const reply = await callGeminiREST(geminiKey, question, history);
    if (reply) {
      return NextResponse.json({ reply, source: "gemini" });
    }
  }

  // ── 2. Try Anthropic Claude (optional) ──────────────────────────────────
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const client = new Anthropic({ apiKey: anthropicKey });
      const messages = [
        ...history
          .filter((m) => m.role === "user" || m.role === "mentor")
          .map((m) => ({
            role: (m.role === "mentor" ? "assistant" : "user") as "user" | "assistant",
            content: m.content,
          })),
        { role: "user" as const, content: question },
      ];

      const res = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 700,
        system: SYSTEM_PROMPT,
        messages,
      });

      const reply = res.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();

      return NextResponse.json({
        reply: reply || localMentorReply(question, history),
        source: "claude",
      });
    } catch (err) {
      console.error("Anthropic API error:", err);
    }
  }

  // ── 3. Offline fallback ──────────────────────────────────────────────────
  return NextResponse.json({ reply: localMentorReply(question, history), source: "offline" });
}
