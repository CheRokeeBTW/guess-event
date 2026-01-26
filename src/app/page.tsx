"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DailyChallenge } from "./types";

export default function Home() {
  const [challengeData, setChallengeData] = useState<DailyChallenge | null>();
  const [isLoading, setIsLoading] = useState<Boolean | null>(true);
  const [guessValue, setGuessValue] = useState<string>("");
  const [result, setResult] = useState<number | null>(0);
  const [questionData, setQuestionData] = useState<string | null>("");
  const [stats, setStats] = useState<{
  totalPlayers: number;
  exactPercent: number;
  mostPopularGuess: { guess: string; count: number } | null;
} | null>(null);
const [step, setStep] = useState(0);
const [isCompleted,setIsCompleted] = useState<Boolean> (false);

useEffect(() => {
  async function fetchChallengeData() {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/daily?step=${step}`);
      if (!res.ok) throw new Error("Failed to fetch challenge");
      const data = await res.json();
      setChallengeData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  fetchChallengeData();
}, [step]);

  useEffect(() => {
  console.log('isLoading changed:', isLoading);
}, [isLoading]);

 const handleGuessValue = async () => {
  if (!guessValue) return;

  const res = await fetch("/api/guess", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      guess: Number(guessValue),
      step,
    }),
  });

  const data = await res.json();
  setResult((prev) => prev + data.points);

  const statsRes = await fetch(`/api/stats?step=${step}`);
  const statsData = await statsRes.json();
  setStats(statsData);
  console.log(statsData, step)
  setIsCompleted(true);

  // setGuessValue("");
  // setTimeout(() => {
  //   setStep((prev) => prev + 1);
  //   setResult(0);
  //   setStats(null);
  // }, 1500);
};

const handleNext = async() => {
  setStep((prev) => prev + 1);
  setGuessValue("")
  setStats(null);
}

if(isLoading) return <div>Loading...</div>

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 font-sans text-white">
    <main className="w-full max-w-md rounded-2xl bg-zinc-900/90 shadow-2xl p-6 flex flex-col gap-5">

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Guess the Year</h1>
        <button className="text-sm text-zinc-300 hover:text-white underline">
          Sign in
        </button>
      </div>
<div className="text-xs text-zinc-400 text-center">
  Event {step + 1} of 5
</div>
      <div className="rounded-xl overflow-hidden border border-zinc-700">
        <Image
          src={challengeData?.image || "/placeholder.jpg"}
          alt="historical event"
          width={350}
          height={250}
          className="object-cover w-full h-auto"
        />
      </div>

      <div className="text-center text-zinc-300 text-sm">
        {challengeData?.question || "When did this event happen?"}
      </div>

      <input
        className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-600"
        type="number"
        name="guess"
        value={guessValue}
        placeholder="Enter year (e.g. 1800)"
        onChange={(e) => setGuessValue(e.target.value)}
      />

      <button
        onClick={handleGuessValue}
        className="w-full rounded-lg bg-green-600 hover:bg-green-500 transition-colors py-2 font-semibold"
      >
        Guess
      </button>
      {isCompleted &&(
      <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors py-2 font-semibold"
      onClick={handleNext}
      >
        Next
      </button>
      )}
      
          {stats && (
  <div className="w-full rounded-lg border bg-gray-300 p-3 text-sm text-gray-800">
    <p>
      🎯 <strong>{stats.exactPercent}%</strong> of players got it exactly right
    {(result === 3) && <span> (including you!)</span>}
    </p>
    {stats.mostPopularGuess && (
      <p className="mt-1">
        📊 Most popular guess:{" "}
        <strong>{stats.mostPopularGuess.guess}</strong>
      </p>
    )}
    <p className="mt-1 text-gray-500">
      👥 {stats.totalPlayers} players today
    </p>
  </div>
)}

      <div className="text-center text-lg text-zinc-300">
        Your points: <span className="font-semibold text-white">{result}</span>
        {result === 3 && <span className="text-yellow-600 text-sm"> (you're not cheating right?)</span>}
        {result === 2 && <span className="text-yellow-600 text-sm"> (very close!)</span>}
        {result === 1 && <span className="text-yellow-600 text-sm"> (well at least you got a point)</span>}
        {result === 0 && <span className="text-yellow-600 text-sm"> (at least you're not cheating)</span>}
      </div>

    </main>
  </div>
);
}
