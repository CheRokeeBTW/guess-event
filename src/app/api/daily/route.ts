import { NextResponse } from "next/server";
import { redis } from "@/app/api/auth/lib/redis";
import events from "@/app/dailyEvents/events";
import { DailyChallenge } from "@/app/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const step = Number(searchParams.get("step") ?? 0);

  const today = new Date().toISOString().slice(0, 10);
  const seed = Number(today.replace(/-/g, ""));
  const dayIndex = seed % events.length;

  const dayPack = events[dayIndex];
  const challenge = dayPack?.[step];

  const answer = challenge.answer;

  if (!challenge) {
    return NextResponse.json({ done: true });
  }

  return NextResponse.json({
    step,
    totalSteps: dayPack.length,
    image: challenge.image,
    question: challenge.question,
    answer,
  });
}