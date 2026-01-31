"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DailyChallenge } from "./types";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FinalStatsModal, {FinalStats} from "./FinalStatsModal";

const today = new Date().toISOString().slice(0, 10);

export default function Home() {
  const [challengeData, setChallengeData] = useState<DailyChallenge | null>();
  const [isLoading, setIsLoading] = useState<boolean | null>(true);
  const [guessValue, setGuessValue] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(true);
  const [answer, setAnswer] = useState<number | null>(null);
  const [stats, setStats] = useState<{
  totalPlayers: number;
  exactPercent: number;
  mostPopularGuess: { guess: string; count: number } | null;
    } | null>(null);
  const [step, setStep] = useState(0);
  const [isCompleted,setIsCompleted] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [points, setPoints] = useState<number>(0);
  const [finalStats, setFinalStats] = useState<FinalStats | null>(null);
  const [showFinalModal, setShowFinalModal] = useState(false);

useEffect(() => {
  async function fetchChallengeData() {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/daily?step=${step}`);
      if (!res.ok) throw new Error("Failed to fetch challenge");
      const data = await res.json();
      setChallengeData(data);
      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  fetchChallengeData();
}, [step]);

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
  setPoints(data.points);
  setResult((prev) => prev + data.points);

  const statsRes = await fetch(`/api/stats?step=${step}`);
  const statsData = await statsRes.json();
  setStats(statsData);
  setIsCompleted(true);

  if (Number(guessValue) !== challengeData?.answer) setIsCorrect(false);

   if (step === 4) {
    const finalRes = await fetch("/api/final", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: result + data.points }),
    });

    const finalData = await finalRes.json();

      const finalStatsPayload = {
      totalPlayers: finalData.totalPlayers,
      percentile: finalData.percentile,
      avgScore: finalData.avgScore,
      score: result,
    };

    setFinalStats(finalStatsPayload);
    setShowFinalModal(true);

   localStorage.setItem(
     `daily-final-stats:${today}`,
    JSON.stringify({ ...finalStatsPayload, date: today })
    );
  }
};

useEffect(() => {
  const saved = localStorage.getItem(`daily-progress:${today}`);
  if (saved) {
    setStep(Number(saved));
  } else {
    setStep(0); 
  }
}, []);

useEffect(() => {
  localStorage.setItem(`daily-progress:${today}`, String(step));
}, [step]);

useEffect(() => {
  const saved = localStorage.getItem(`daily-final-stats:${today}`);
  if (saved) {
    const parsed = JSON.parse(saved);
    setResult(parsed.score);
    setFinalStats(parsed);
    setShowFinalModal(true);
  }
}, []);

useEffect(() => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("daily-progress:") || key.startsWith("daily-final-stats:")) {
      if (!key.includes(today)) {
        localStorage.removeItem(key);
      }
    }
  });
}, []);

const handleNext = async() => {
  setStep((prev) => prev + 1);
  setGuessValue("")
  setStats(null);
  setIsCompleted(false);
  setIsCorrect(true);
}

if(isLoading) return <div>Loading...</div>

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 font-sans text-white">
       <div className="mb-6 flex flex-col items-center text-center gap-2 px-2">
  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
    Guess the year of real events
  </h1>
  <p className="max-w-md text-sm sm:text-base text-zinc-400 leading-relaxed">
    Play 5 daily challenges, score points, and see how you rank against players worldwide.
  </p>
</div>
    <main className="w-full max-w-md rounded-2xl bg-zinc-900/90 shadow-2xl p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
  <h1 className="text-xl font-semibold">Guess the Year</h1>
  {status === "loading" ? (
    <span className="text-sm text-zinc-300">Loading...</span>
  ) : session?.user ? (
      <div className="flex items-center gap-2">
        {session?.user?.image && (
    <img
      src={session.user.image}
      alt={session.user.name || "avatar"}
      className="w-6 h-6 rounded-full"
    />
  )}
      <span className="text-sm text-white">{session.user.name}</span>
      <button
        onClick={() => signOut()}
        className="text-sm text-zinc-300 hover:text-white underline cursor-pointer"
      >
        Sign out
      </button>
    </div>
  ) : (
    <div className="flex gap-4">
    <button
      onClick={() => signIn()}
      className="text-sm text-zinc-300 hover:text-white underline cursor-pointer"
    >
      Sign in
    </button>
      <button
    type="button"
    className="text-sm text-zinc-300 hover:text-white underline cursor-pointer"
    onClick={() => router.push("/auth/register")}
  >
    <span>Register</span>
  </button>
    </div>
  )}
</div>
<div className="text-xs text-zinc-400 text-center">
  Question {step + 1} of 5
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

      <div className="-mt-3 text-center text-zinc-300 text-sm">
        {challengeData?.question || "Sorry, there was an error to get a question"}
      </div>

      <div className="-mt-2 relative w-full">
        {!isCorrect && (
        <span className="bg-zinc-900 text-[11px] text-green-500">
          Correct answer is <span className="font-bold">{challengeData?.answer}</span>
        </span>
      )}
      <input
       disabled={isCompleted}
    className={`w-full rounded-lg px-4 py-2
    ${
      isCompleted
        ? isCorrect
          ? "bg-green-900/20 border-green-500 text-green-300 cursor-not-allowed"
          : "bg-red-900/20 border-red-500 text-red-300 cursor-not-allowed"
        : "bg-zinc-800 border-zinc-700 text-white"
    }
    border focus:outline-none focus:ring-2 focus:ring-green-600`}

        type="number"
        name="guess"
        value={guessValue}
        placeholder="Enter year (e.g. 1800)"
        onChange={(e) => setGuessValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return;
          e.preventDefault();
          handleGuessValue();
                }
              }
          />
          </div>

      {!isCompleted && (
      <button
        onClick={handleGuessValue}
        disabled={isCompleted}
        className={`w-full rounded-lg py-2 font-semibold transition-colors hover:cursor-pointer
          ${isCompleted 
            ? "bg-zinc-600 cursor-not-allowed" 
            : "bg-green-600 hover:bg-green-500"}`}
      >
        Guess
      </button>
      )}
      {isCompleted && step !== 4 && (
      <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors py-2 font-semibold hover:cursor-pointer"
      onClick={handleNext}
      >
        Next
      </button>
      )}
      
          {stats && (
  <div className="w-full rounded-lg border bg-gray-300 p-3 text-sm text-gray-800">
    <p>
      🎯 <strong>{stats.exactPercent}%</strong> of players got it exactly right
    {(points === 3) && <span> (including you!)</span>}
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
        {points === 3 && isCompleted && <span className="text-yellow-600 text-sm"> (you're not cheating right?)</span>}
        {points === 2 && isCompleted && <span className="text-yellow-600 text-sm"> (very close!)</span>}
        {points === 1 && isCompleted && <span className="text-yellow-600 text-sm"> (well at least you got a point)</span>}
        {points === 0 && isCompleted && <span className="text-yellow-600 text-sm"> (at least you're not cheating)</span>}
      </div>
      {showFinalModal && finalStats && (
  <FinalStatsModal
    score={result}
    stats={finalStats}
    onClose={() => setShowFinalModal(false)}
  />
)}
    </main>
  </div>
);
}
