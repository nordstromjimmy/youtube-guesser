"use client";

import React, { useRef, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";

interface Props {
  videoId: string;
}

export const VideoPlayer = ({ videoId }: Props) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolume] = useState(0);

  const onPlayerReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;

    try {
      event.target.mute(); // Always mute for autoplay
      event.target.playVideo(); // Try autoplay
      setHasStarted(true);
    } catch (err) {
      console.warn("Autoplay blocked, showing Start button");
    }

    setIsReady(true);
  };

  const handleStart = () => {
    if (playerRef.current) {
      playerRef.current.mute(); // Required for autoplay in most browsers
      playerRef.current.unMute();
      playerRef.current.setVolume(20);
      playerRef.current.playVideo();
      setHasStarted(true);
    }
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1, // autoplay manually after click
      controls: 1,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      disablekb: 1,
      start: 60,
    },
  };

  return (
    <div className="relative w-full max-w-3xl aspect-video overflow-hidden rounded-md shadow-md">
      <YouTube
        videoId={videoId}
        onReady={onPlayerReady}
        opts={opts}
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* DARK COVER BEFORE PLAYING */}
      {!hasStarted && (
        <div className="absolute top-0 left-0 w-full h-full z-20 bg-black" />
      )}
      {/* TOP blocker */}
      <div className="absolute top-0 left-0 w-full h-12 z-20 bg-black pointer-events-none" />
      {/* LEFT blocker */}
      <div className="absolute top-0 left-0 w-12 h-full z-20 bg-black pointer-events-none" />
      {/* RIGHT blocker */}
      <div className="absolute top-0 right-0 w-12 h-full z-20 bg-black pointer-events-none" />
      {/* BOTTOM blocker */}
      <div className="absolute bottom-0 left-0 w-full h-12 z-20 bg-black pointer-events-none" />
      {/* LEFT blocker */}
      {/* Prevent right-click */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        onContextMenu={(e) => e.preventDefault()}
      />
      {/* Custom Start Button */}
      {isReady && !hasStarted && (
        <button
          onClick={handleStart}
          className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-bold text-lg shadow-xl cursor-pointer"
        >
          Start Video
        </button>
      )}
      {hasStarted && (
        <div className="absolute top-2 right-2 z-30 flex items-center gap-2 bg-black/60 px-3 py-1 rounded shadow">
          <span className="text-white">🔊</span>
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => {
              const newVolume = Number(e.target.value);
              setVolume(newVolume);
              playerRef.current?.setVolume(newVolume);
              playerRef.current?.unMute();
            }}
            className="w-24 cursor-pointer accent-red-600"
          />
        </div>
      )}
    </div>
  );
};
