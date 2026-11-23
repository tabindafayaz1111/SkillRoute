import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { localMentorReply, type MentorMessage } from "@/lib/mentor";
import {
  MENTOR_SYSTEM_PROMPT,
  GEMINI_SAFETY_SETTINGS,
  evaluateInputGuardrails,
  evaluateOutputGuardrails,
} from "@/lib/guardrails";

export const runtime = "nodejs";

/**
 * AI Mentor endpoint — priority order:
 *  1. Google Gemini Flash-Lite via direct REST API (handles both AQ. OAuth tokens and AIza API keys)
 *  2. Anthropic Claude (if ANTHROPIC_API_KEY set)
 *  3. Offline local keyword responder (always works, never crashes)
 *
 * Includes pre-flight and post-flight guardrails aligned with SkillRoute's
 * pedagogical standards, academic integrity, and safety boundaries.
 */

// Model priority cascade: prefers Flash-Lite models for fast, low-latency, cost-effective mentoring.
const configuredModel = process.env.GEMINI_MODEL?.trim();

const GEMINI_MODELS: { api: "v1beta" | "v1"; model: string }[] = [
  // If user explicitly configured a specific model in environment, try it first
  ...(configuredModel ? [{ api: "v1beta" as const, model: configuredModel }] : []),

  // Gemini Flash-Lite family (fastest response, lowest latency)
  { api: "v1beta", model: "gemini-2.0-flash-lite" },
  { api: "v1beta", model: "gemini-2.0-flash-lite-preview-02-05" },
  { api: "v1beta", model: "gemini-2.0-flash-lite-preview" },
  { api: "v1beta", model: "gemini-2.5-flash-lite" },
  { api: "v1beta", model: "gemini-1.5-flash-8b" },

  // General Gemini Flash family fallbacks
  { api: "v1beta", model: "gemini-2.0-flash" },
  { api: "v1beta", model: "gemini-1.5-flash" },
  { api: "v1beta", model: "gemini-1.5-flash-latest" },

  // Standard Gemini fallbacks
  { api: "v1beta", model: "gemini-pro" },
  { api: "v1",     model: "gemini-1.5-flash" },
  { api: "v1",     model: "gemini-pro" },
];

async function callGeminiREST(
  geminiKey: string,
  question: string,
  history: MentorMessage[]
): Promise<string | null> {
  const isOAuth = geminiKey.startsWith("AQ.");

  // System prompt turn for backward compatibility across all endpoints
  const systemMsg = { role: "user", parts: [{ text: `[System Instruction]:\n${MENTOR_SYSTEM_PROMPT}` }] };
  const systemAck = { role: "model", parts: [{ text: "Understood. I will strictly act as the SkillRoute AI Mentor following all pedagogical alignment rules, safety boundaries, and guardrails." }] };

  // Format message history (limit to last 10 messages for token efficiency and security)
  const historyMsgs = history
    .slice(-10)
    .filter((m) => m.role === "user" || m.role === "mentor")
    .map((m) => ({
      role: m.role === "mentor" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

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

      const requestPayload: Record<string, any> = {
        contents,
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.7,
        },
        safetySettings: GEMINI_SAFETY_SETTINGS,
      };

      // v1beta supports native system_instruction parameter
      if (api === "v1beta") {
        requestPayload.system_instruction = {
          parts: [{ text: MENTOR_SYSTEM_PROMPT }],
        };
      }

      const res = await fetch(baseUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(requestPayload),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.warn(`Gemini ${api}/${model} failed (${res.status}):`, errText.slice(0, 200));
        continue; // Try next model in priority order
      }

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (rawText) {
        console.log(`✓ Gemini responded via ${api}/${model}`);
        return evaluateOutputGuardrails(rawText);
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

  // ── 0. Pre-Flight Input Guardrails ─────────────────────────────────────────
  const guardrailCheck = evaluateInputGuardrails(question, history);
  if (!guardrailCheck.allowed) {
    return NextResponse.json({
      reply: guardrailCheck.deflectionReply,
      source: "guardrail",
    });
  }

  // ── 1. Try Google Gemini Flash-Lite (preferred) ───────────────────────────
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (geminiKey) {
    const reply = await callGeminiREST(geminiKey, question, history);
    if (reply) {
      return NextResponse.json({ reply, source: "gemini" });
    }
  }

  // ── 2. Try Anthropic Claude (fallback LLM) ────────────────────────────────
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const client = new Anthropic({ apiKey: anthropicKey });
      const messages = [
        ...history
          .slice(-10)
          .filter((m) => m.role === "user" || m.role === "mentor")
          .map((m) => ({
            role: (m.role === "mentor" ? "assistant" : "user") as "user" | "assistant",
            content: m.content,
          })),
        { role: "user" as const, content: question },
      ];

      const res = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 800,
        system: MENTOR_SYSTEM_PROMPT,
        messages,
      });

      const reply = res.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();

      const finalReply = reply ? evaluateOutputGuardrails(reply) : localMentorReply(question, history);

      return NextResponse.json({
        reply: finalReply,
        source: "claude",
      });
    } catch (err) {
      console.error("Anthropic API error:", err);
    }
  }

  // ── 3. Offline fallback ────────────────────────────────────────────────────
  return NextResponse.json({
    reply: localMentorReply(question, history),
    source: "offline",
  });
}
