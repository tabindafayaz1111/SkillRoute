import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { localMentorReply, type MentorMessage } from "@/lib/mentor";

export const runtime = "nodejs";

/**
 * AI Mentor endpoint.
 *
 * If ANTHROPIC_API_KEY is set (locally in .env.local, or in Vercel → Project
 * Settings → Environment Variables), the mentor is a real Claude tutor. If not,
 * it gracefully falls back to the built-in offline responder so the widget
 * always works. Either way the client calls this one route.
 *
 * Model: claude-haiku-4-5 — fastest + cheapest tier, ideal for a snappy tutor
 * chat. Swap to claude-sonnet-5 for deeper answers, or claude-opus-4-8 for the
 * most capable (higher latency/cost). Change MENTOR_MODEL below.
 */
const MENTOR_MODEL = "claude-haiku-4-5";

const SYSTEM_PROMPT = `You are the "AI Mentor" inside SkillRoute, a platform that teaches programming, web development, data analytics, and AI to complete beginners — including people who have never written code and get bored by dry, academic explanations.

Your job is to ACTUALLY HELP and TEACH, clearly and warmly. Rules:
- Answer the real question directly. Give a genuinely useful explanation — do not just deflect with "what's your guess?". You may ask ONE short guiding question, but always follow it with real substance.
- Assume zero prior knowledge. Explain like you're talking to a curious 50-year-old friend who hates jargon.
- Lead every concept with a plain-English idea or a everyday analogy (cooking, driving, budgets, sorting mail) BEFORE any math or code.
- Keep answers short and skimmable: 2-4 short paragraphs or a tiny bullet list. Never a wall of text.
- When you show code, keep it minimal and explain each line in plain words.
- Be encouraging and human. A little warmth or humour is good. Never condescending.
- If the learner is overwhelmed, slow down, reassure them, and break the idea into one tiny piece.
Stay on topic: coding, web, data, AI/ML, tools (Git, SQL, Excel, BI), projects, careers, and study help.`;

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

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // No key configured → offline mentor (still helpful, no crash, no cost).
  if (!apiKey) {
    return NextResponse.json({ reply: localMentorReply(question, history), source: "offline" });
  }

  try {
    const client = new Anthropic({ apiKey });
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
      model: MENTOR_MODEL,
      max_tokens: 700,
      system: SYSTEM_PROMPT,
      messages,
    });

    const reply = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return NextResponse.json({ reply: reply || localMentorReply(question, history), source: "claude" });
  } catch (err) {
    // Any API failure (bad key, rate limit, network) → offline fallback.
    console.error("Mentor API error:", err);
    return NextResponse.json({ reply: localMentorReply(question, history), source: "offline" });
  }
}
