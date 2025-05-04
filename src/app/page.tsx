"use client";

import { useState } from "react";
import { Guess } from "@/types/video";
import { getRandomVideoByGenre } from "@/lib/videoPicker";
import Link from "next/link";
import { scoreGuess } from "@/lib/scoring";
import { VideoPlayer } from "@/components/VideoPlayer";
import { GuessForm } from "@/components/GuessForm";

export default function HomePage() {
  const [result, setResult] = useState<ReturnType<typeof scoreGuess> | null>(
    null
  );

  const genre = "All"; // or "All", "Hip Hop", etc.
  const video = getRandomVideoByGenre(genre);

  const handleGuess = (guess: Guess) => {
    const score = scoreGuess(guess, video);
    setResult(score);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center px-4 py-40">
      <h1 className="text-4xl font-bold mb-8 text-center">
        🎯 YouTube Guesser{" "}
        <span className="bg-blue-900 text-2xl font-bold p-4 rounded-full">
          MUSIC
        </span>
      </h1>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome to the Music Guessing Game 🎧
        </h1>
        <p className="text-gray-300 mb-6">
          Listen to the clip and guess the artist and song title!
        </p>
        <Link href="/game">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md cursor-pointer">
            🎮 Start Game
          </button>
        </Link>
      </div>
    </main>
  );
}
