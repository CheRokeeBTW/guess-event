import { NextResponse } from "next/server";
import { redis } from "@/app/api/auth/lib/redis";

export async function POST(req: Request) {
  const { score } = await req.json();

  const today = new Date().toISOString().slice(0, 10);
  const key = `stats:${today}:final:scores`;

  const scores = await redis.zrange(key, 0, -1, { withScores: true });

    let avgScore = 0;
    if (scores.length > 0) {
    let sum = 0;
    for (let i = 1; i < scores.length; i += 2) {
        sum += scores[i] as number;
    }
    avgScore = Number((sum / (scores.length / 2)).toFixed(1));
    }

  await redis.zadd(key, {
    score,
    member: crypto.randomUUID(),
  });
  
 const total = await redis.zcard(key);

const belowOrEqual = await redis.zcount(key, 0, score);

const betterThan = Math.max(0, belowOrEqual - 1);

const percentile =
  total > 1 ? Math.round((betterThan / (total - 1)) * 100) : 100;

  return NextResponse.json({
    totalPlayers: total,
    percentile,
    avgScore,
  });
}