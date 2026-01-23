import { NextResponse } from "next/server";
import { redis } from "@/app/lib/redis";

type DailyChallenge = {
  image: string;
  answer: number;
};

export async function POST(req: Request) {
  const { guess } = await req.json();
  const todayKey = `daily:challenge:${new Date().toISOString().slice(0,10)}`;
  let resultValue: number = 0;

  if(!Number(guess)) return NextResponse.json({ points: 0, message: "Guess is not a number" })

  const challenge = await redis.get<DailyChallenge>(todayKey);

  if (!challenge) {
  return NextResponse.json({
    points: 0,
    message: "Sorry, no challenge today",
  });
}

  const answer = challenge.answer;
  
  if(guess === answer) resultValue = 3
  else if(Math.abs(guess - answer) <= 4) resultValue = 2
  else if(Math.abs(guess - answer) <= 10) resultValue = 1

  console.log('answer', answer, 'guess', guess)

  return NextResponse.json({ points: resultValue, message: "Success" })
}