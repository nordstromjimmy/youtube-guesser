"use client";

import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { VideoData } from "@/types/video";
import { scoreGuessDetailed } from "@/lib/scoring";

interface Props {
  video: VideoData;
  round: number;
  totalRounds: number;
  onComplete: (result: number) => void;
}

export function GameRound({ video, round, totalRounds, onComplete }: Props) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [submitted, setSubmitted] = useState(false);
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const [guess, setGuess] = useState({
    artist: "",
    song: "",
    year: "",
    views: "",
    likes: "",
    comments: "",
  });
  const [scoreBreakdown, setScoreBreakdown] = useState<null | {
    artist: number;
    song: number;
    year: number;
    views: number;
    likes: number;
    comments: number;
    total: number;
  }>(null);
  const handleSubmitRef = useRef(() => {});
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  // ⏱ Reset state every time a new video is passed in
  useEffect(() => {
    setTimeLeft(30);
    setSubmitted(false);
    setGuess({
      artist: "",
      song: "",
      year: "",
      views: "",
      likes: "",
      comments: "",
    });
  }, [video]);

  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  });

  // ⏱ Countdown timer runs just once per round
  useEffect(() => {
    if (submitted || !videoStarted) return; // stop timer if guess already submitted

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // stop timer
          handleSubmitRef.current(); // auto-submit when timer hits 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup when component unmounts or video changes
  }, [submitted, videoStarted]);

  const handleSubmit = () => {
    if (submitted || !videoStarted) return;
    setSubmitted(true);
    setIsLoadingNext(true);

    const result = scoreGuessDetailed(
      {
        artist: video.artist,
        song: video.song,
        year: video.year,
        views: video.views,
        likes: video.likes,
        comments: video.comments,
      },
      {
        artist: guess.artist,
        song: guess.song,
        year: Number(guess.year),
        views: Number(guess.views),
        likes: Number(guess.likes),
        comments: Number(guess.comments),
      }
    );

    setScoreBreakdown(result);

    setTimeout(() => {
      onComplete(result.total);
      setIsLoadingNext(false);
    }, 3000);
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
          {video?.id && (
            <VideoPlayer
              videoId={video.id}
              soundEnabled={soundEnabled}
              onEnableSound={() => setSoundEnabled(true)}
              onStart={() => setVideoStarted(true)}
            />
          )}
        </div>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <div className="relative">
            {/* Core fields */}
            <input
              type="text"
              placeholder="Guess the artist"
              className={`p-3 pr-12 rounded border w-full bg-gray-100 ${
                submitted && scoreBreakdown
                  ? scoreBreakdown.artist > 0
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-400"
              }`}
              value={guess.artist}
              onChange={(e) => setGuess({ ...guess, artist: e.target.value })}
              disabled={submitted}
            />
            {submitted && scoreBreakdown && (
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold ${
                  scoreBreakdown.artist > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {scoreBreakdown.artist > 0 ? `+${scoreBreakdown.artist}` : "❌"}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Guess the song"
              className={`p-3 rounded border border-gray-300 w-full ${
                submitted && scoreBreakdown
                  ? scoreBreakdown.song > 0
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-400"
              }`}
              value={guess.song}
              onChange={(e) => setGuess({ ...guess, song: e.target.value })}
              disabled={submitted}
            />
            {submitted && scoreBreakdown && (
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold ${
                  scoreBreakdown.song > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {scoreBreakdown.song > 0 ? `+${scoreBreakdown.song}` : "❌"}
              </span>
            )}
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Guess the year uploaded"
              className={`p-3 rounded border border-gray-300 w-full mb-2 ${
                submitted && scoreBreakdown
                  ? scoreBreakdown.year > 0
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-400"
              }`}
              value={guess.year}
              onChange={(e) => setGuess({ ...guess, year: e.target.value })}
              disabled={submitted}
            />
            {submitted && scoreBreakdown && (
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold ${
                  scoreBreakdown.year > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {scoreBreakdown.year > 0 ? `+${scoreBreakdown.year}` : "❌"}
              </span>
            )}
          </div>
          <hr className="my-4 border-gray-300" />

          {/* Bonus fields */}
          <p className="text-sm text-gray-500 mb-1">🎁 Bonus Guesses</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Views"
              className={`p-2 rounded border border-gray-200 w-full mb-2 ${
                submitted && scoreBreakdown
                  ? scoreBreakdown.views > 0
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
              value={guess.views}
              onChange={(e) => setGuess({ ...guess, views: e.target.value })}
              disabled={submitted}
            />
            {submitted && scoreBreakdown && (
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold ${
                  scoreBreakdown.views > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {scoreBreakdown.views > 0 ? `+${scoreBreakdown.views}` : "❌"}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Likes"
              className={`p-2 rounded border border-gray-200 w-full mb-2 ${
                submitted && scoreBreakdown
                  ? scoreBreakdown.likes > 0
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
              value={guess.likes}
              onChange={(e) => setGuess({ ...guess, likes: e.target.value })}
              disabled={submitted}
            />
            {submitted && scoreBreakdown && (
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold ${
                  scoreBreakdown.likes > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {scoreBreakdown.likes > 0 ? `+${scoreBreakdown.likes}` : "❌"}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Comments"
              className={`p-2 rounded border border-gray-200 w-full mb-2 ${
                submitted && scoreBreakdown
                  ? scoreBreakdown.comments > 0
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
              value={guess.comments}
              onChange={(e) => setGuess({ ...guess, comments: e.target.value })}
              disabled={submitted}
            />
            {submitted && scoreBreakdown && (
              <span
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold ${
                  scoreBreakdown.comments > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {scoreBreakdown.comments > 0
                  ? `+${scoreBreakdown.comments}`
                  : "❌"}
              </span>
            )}
          </div>
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
              ⏳ Loading next round..
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
