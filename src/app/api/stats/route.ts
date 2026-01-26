import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";
import events from "@/app/dailyEvents/events";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const step = Number(searchParams.get("step") ?? 0);

  const today = new Date().toISOString().slice(0, 10);
  const statsKey = `stats:${today}:step:${step}`;
  const guessesKey = `${statsKey}:guesses`;

  const rawStats = await redis.hgetall(statsKey);

  const totalPlayers = Number(rawStats?.total ?? 0);
  const exact = Number(rawStats?.exact ?? 0);

  const exactPercent =
    totalPlayers > 0 ? Math.round((exact / totalPlayers) * 100) : 0;

  const topGuesses = await redis.zrange(
    guessesKey,
    0,
    0,
    { rev: true, withScores: true }
  );

  const mostPopularGuess =
    topGuesses.length > 0
      ? { guess: topGuesses[0], count: topGuesses[1] as number }
      : null;

  return NextResponse.json({
    totalPlayers,
    exactPercent,
    mostPopularGuess,
  });
}