import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";
import { DailyChallenge } from "@/app/types";
import events from "@/app/dailyEvents/events";

export async function POST(req: Request) {
  const { guess } = await req.json();

  const parsedGuess = Number(guess);
  if (Number.isNaN(parsedGuess)) {
    return NextResponse.json(
      { points: 0, message: "Guess is not a number" },
      { status: 400 }
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const seed = Number(today.replace(/-/g, ""));
  const index = seed % events.length;

  const challengeKey = `daily:challenge:${today}`;
  const statsKey = `stats:${today}:event:${index}`;
  const guessesKey = `${statsKey}:guesses`;

  const challenge = await redis.get<DailyChallenge>(challengeKey);
  if (!challenge) {
    return NextResponse.json({ error: "No challenge" }, { status: 400 });
  }

  const diff = Math.abs(parsedGuess - challenge.answer);

  let points = 0;
  let bucket: "exact" | "within5" | "within10" | null = null;

  if (diff === 0) {
    points = 3;
    bucket = "exact";
  } else if (diff <= 5) {
    points = 2;
    bucket = "within5";
  } else if (diff <= 10) {
    points = 1;
    bucket = "within10";
  }

  await redis.hincrby(statsKey, "total", 1);
  if (bucket) {
    await redis.hincrby(statsKey, bucket, 1);
  }

  await redis.zincrby(guessesKey, 1, String(parsedGuess));

  return NextResponse.json({ points, message: "Success" });
}