"use client";

import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";

interface Props {
  videoId: string;
  soundEnabled: boolean;
  onEnableSound: () => void;
  onStart: () => void;
}

export const VideoPlayer = ({
  videoId,
  soundEnabled,
  onEnableSound,
  onStart,
}: Props) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [forcePlay, setForcePlay] = useState(false); // triggers actual start
  const [volume, setVolume] = useState(20);

  // Reset state when videoId changes
  useEffect(() => {
    setIsReady(false);
    setHasStarted(false);
    setForcePlay(false);
  }, [videoId]);

  const onPlayerReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    setIsReady(true);

    if (!hasStarted) {
      playerRef.current.pauseVideo();
    }
  };
  const handleStart = () => {
    if (!playerRef.current) return;

    playerRef.current.mute();
    playerRef.current.playVideo();

    setHasStarted(true);
    onStart(); // notify GameRound
  };

  // If sound already enabled, skip prompt and start automatically when ready
  useEffect(() => {
    if (isReady && soundEnabled && !hasStarted) {
      setForcePlay(true); // trigger auto-start
    }
  }, [isReady, soundEnabled, hasStarted]);

  useEffect(() => {
    if (forcePlay) {
      handleStart();
    }
  }, [forcePlay]);

  const onPlayerStateChange = (event: any) => {
    // YT.PlayerState.PLAYING === 1
    if (event.data === 1 && soundEnabled && playerRef.current) {
      playerRef.current.setVolume(20);
      playerRef.current.unMute();
    }
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
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
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Enable Sound prompt */}
      {!soundEnabled && isReady && !hasStarted && (
        <div className="absolute inset-0 bg-black bg-opacity-80 z-30 flex flex-col items-center justify-center text-center p-6">
          <p className="text-white text-lg mb-4">
            🔇 Sound is off by default due to browser rules.
          </p>
          <button
            onClick={() => {
              onEnableSound(); // lifts up state
              handleStart(); // also trigger auto-play right after
            }}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-bold text-lg cursor-pointer"
          >
            ✅ Enable Sound & Start
          </button>
        </div>
      )}

      {/* Manual Start button in case autoplay not desired */}
      {soundEnabled && isReady && !hasStarted && (
        <button
          onClick={handleStart}
          className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-bold text-lg shadow-xl"
        >
          ▶️ Start Video
        </button>
      )}
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
