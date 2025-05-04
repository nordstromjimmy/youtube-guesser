"use client";

import { useEffect, useState } from "react";
import { getRandomVideo } from "@/lib/videoPicker";
import { VideoData } from "@/types/video";
import { GameRound } from "@/components/GameRound";
import { GameSummary } from "@/components/GameSummary";

const TOTAL_ROUNDS = 5;

export default function GamePage() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Pick 5 random unique songs
    const seen = new Set<string>();
    const selected: VideoData[] = [];

    while (selected.length < TOTAL_ROUNDS) {
      const song = getRandomVideo();
      if (!seen.has(song.id)) {
        seen.add(song.id);
        selected.push(song);
      }
    }

    setVideos(selected);
  }, []);

  const handleRoundComplete = (roundScore: number) => {
    setScore((prev) => prev + roundScore);

    if (roundIndex + 1 < TOTAL_ROUNDS) {
      setRoundIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  if (!videos.length)
    return <div className="text-white p-4">Loading songs...</div>;

  return (
    <div className="p-6 text-white">
      {!isComplete ? (
        <GameRound
          video={videos[roundIndex]}
          round={roundIndex + 1}
          totalRounds={TOTAL_ROUNDS}
          onComplete={handleRoundComplete}
        />
      ) : (
        <GameSummary score={score} maxScore={TOTAL_ROUNDS * 100} />
      )}
    </div>
  );
}
