import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";
import events from "@/app/dailyEvents/events";

type DailyChallenge = {
    image: string,
    answer: number,
}

export async function GET() {
  const todayKey = `daily:challenge:${new Date().toISOString().slice(0,10)}`;

  let challenge = await redis.get<DailyChallenge>(todayKey);

  if (!challenge) {
    const allKeys = await redis.keys("daily:challenge:*");
    const index = allKeys.length % events.length;
    challenge = events[index];

    await redis.set(todayKey, challenge);
  }

  return NextResponse.json(challenge);
}