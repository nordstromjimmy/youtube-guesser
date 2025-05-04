"use client";

import { useEffect, useState } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { VideoData } from "@/types/video";

interface Props {
  video: VideoData;
  round: number;
  totalRounds: number;
  onComplete: (score: number) => void;
}

export function GameRound({ video, round, totalRounds, onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [guess, setGuess] = useState({ artist: "", song: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);

  // ⏱ Reset state every time a new video is passed in
  useEffect(() => {
    setTimeLeft(30);
    setSubmitted(false);
    setGuess({ artist: "", song: "" });
  }, [video]);

  // ⏱ Countdown timer runs just once per round
  useEffect(() => {
    if (submitted) return; // stop timer if guess already submitted

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // stop timer
          handleSubmit(); // auto-submit when timer hits 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup when component unmounts or video changes
  }, [submitted]);

  const handleSubmit = () => {
    setSubmitted(true);
    setIsLoadingNext(true);

    let points = 0;
    if (guess.artist.trim().toLowerCase() === video.artist.toLowerCase()) {
      points += 50;
    }
    if (guess.song.trim().toLowerCase() === video.song.toLowerCase()) {
      points += 50;
    }

    setTimeout(() => {
      onComplete(points);
      setIsLoadingNext(false);
    }, 2000);
  };

  return (
    <main className=" bg-gray-100 text-gray-900 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          🎯 YouTube Guesser{" "}
          <span className="bg-red-100 text-red-600 text-2xl font-semibold px-3 py-1 rounded-full">
            MUSIC
          </span>
        </h1>
        <h2 className="text-xl font-semibold mb-2 text-center">
          Round {round} of {totalRounds}
        </h2>
        <p className="text-center mb-6 text-sm text-gray-500">
          Time Left: {timeLeft}s
        </p>

        <div className="mb-6 bg-gray-100 border border-gray-200 rounded-md shadow-sm p-4">
          <VideoPlayer videoId={video.id} />
        </div>

        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Guess the artist"
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={guess.artist}
            onChange={(e) => setGuess({ ...guess, artist: e.target.value })}
          />
          <input
            type="text"
            placeholder="Guess the song name"
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            value={guess.song}
            onChange={(e) => setGuess({ ...guess, song: e.target.value })}
          />
          {!submitted && (
            <button
              onClick={handleSubmit}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded shadow cursor-pointer"
            >
              Submit Guess
            </button>
          )}
          {submitted && isLoadingNext && (
            <div className="text-center text-lg font-semibold text-gray-500 mt-6 animate-pulse">
              ⏳ Submitting guess... Loading next video...
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
