export type DailyChallenge = { 
    image: string,
    question: string,
    answer: number, 
    }

export type FinalStats = {
  totalPlayers: number;
  percentile: number;
  avgScore: number;
};