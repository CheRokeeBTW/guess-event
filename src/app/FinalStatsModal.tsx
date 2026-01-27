import type { FC } from "react";

export type FinalStats = {
  totalPlayers: number;
  percentile: number;
  avgScore: number;
};

type FinalStatsModalProps = {
  score: number;
  stats: FinalStats;
  onClose: () => void;
};

const FinalStatsModal: FC<FinalStatsModalProps> = ({
  score,
  stats,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-sm text-white shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-center">
          Daily Results
        </h2>

        <div className="space-y-2 text-sm">
          <p>🎯 Your final score: <b>{score} points</b></p>
          <p>📊 Average today: <b>{stats.avgScore} points</b></p>
          <p>👥 Players today: <b>{stats.totalPlayers}</b></p>
          <p className="text-green-400 font-semibold">
            🏆 Better than {stats.percentile}% of players
          </p>
          <h1 className="text-lg whitespace-nowrap">Comeback tomorrow for new challenges!</h1>
        </div>

        {/* <button
          onClick={onClose}
          className="mt-6 w-full bg-zinc-700 hover:bg-zinc-600 py-2 rounded-lg"
        >
          Close
        </button> */}
      </div>
    </div>
  );
}

export default FinalStatsModal;