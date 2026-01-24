import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";
import events from "@/app/dailyEvents/events";

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const seed = Number(today.replace(/-/g, ""));
  const index = seed % events.length;

  const statsKey = `stats:${today}:event:${index}`;
  const guessesKey = `${statsKey}:guesses`;

  const stats = await redis.hgetall(statsKey);
  const topGuesses = await redis.zrange(
    guessesKey,
    0,
    0,
    { rev: true, withScores: true }
  );

  const total = Number(stats?.total || 0);
  const exact = Number(stats?.exact || 0);

  const exactPercent =
    total > 0 ? Math.round((exact / total) * 100) : 0;

  const mostPopularGuess = topGuesses.length
    ? { guess: topGuesses[0], count: topGuesses[1] }
    : null;

    console.log(guessesKey, 'most popular guess')

  return NextResponse.json({
    totalPlayers: total,
    exactPercent,
    mostPopularGuess,
  });
}