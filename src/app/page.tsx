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

  useEffect(()=>{
    async function fetchChallengeData(){
      try{
    const res = await fetch('/api/daily')
    const data = await res.json();
    if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  else{
    setChallengeData(data);
    setIsLoading(false)
  }
  console.log(data)
    }
    catch(err){
      console.error(err);
    }
  }
    fetchChallengeData();
  },[])

  useEffect(() => {
  console.log('isLoading changed:', isLoading);
}, [isLoading]);

  const handleGuessValue = async() =>{
    if(!guessValue) return;

    const res = await fetch('/api/guess',{
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ guess: Number(guessValue) })
    })
    const data = await res.json();
    console.log('post', data)
    setResult(data.points)
  }

if(isLoading) return <div>Loading...</div>

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-background">
      <main className="flex flex-col items-center justify-center gap-5">
        <div>
          <Image
              src={challengeData?.image || '/placeholder.jpg'}
              alt="guess the even"
              width={350}
              height={250}
            />
            </div>
               <div>{challengeData?.question || ''}</div>
            <div className="bg-white w-full">
              <input
              className="w-full text-black"
              type="text"
              name="guess"
              value={guessValue}
              placeholder="Guess the date"
              onChange={(e) => setGuessValue(e.target.value)}
              >
              </input>
            </div>
            <div className="w-full">
              <button className="w-full border border-gray-500 bg-green-700"
              onClick = {handleGuessValue}>
               <span>Guess</span>
              </button>
            </div>
            {result && <div className="mt-3">{result}</div>}
      </main>
    </div>
  );
}
