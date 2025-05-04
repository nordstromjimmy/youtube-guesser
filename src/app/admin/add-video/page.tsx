"use client";

import { YouTubeVideoData } from "@/types/video";
import { useState } from "react";

export default function AddVideoPage() {
  const [video, setVideo] = useState<YouTubeVideoData | null>(null);
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [genres, setGenres] = useState("");
  const [videoIdInput, setVideoIdInput] = useState("");

  const API_KEY = "AIzaSyCKOrCUfHuVMYZLTzweEqbeL010L2OHrgI";

  const fetchVideoData = async (id: string) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
      );
      const data = await res.json();
      const item = data.items[0];

      const parsed: YouTubeVideoData = {
        id: item.id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        views: Number(item.statistics.viewCount),
        likes: Number(item.statistics.likeCount),
        comments: Number(item.statistics.commentCount),
        year: new Date(item.snippet.publishedAt).getFullYear(),
        thumbnail: item.snippet.thumbnails.high.url,
      };

      setVideo(parsed);
      setArtist("");
      setSong("");
      setGenres("");
    } catch (error) {
      console.error("Failed to fetch video", error);
    }
  };

  const fetchRandomMusicVideo = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=US&videoCategoryId=10&maxResults=25&key=${API_KEY}`
      );
      const data = await res.json();
      const items = data.items;

      if (!items || items.length === 0) {
        throw new Error("No music videos returned");
      }

      const randomItem = items[Math.floor(Math.random() * items.length)];

      const parsed: YouTubeVideoData = {
        id: randomItem.id,
        title: randomItem.snippet.title,
        channel: randomItem.snippet.channelTitle,
        views: Number(randomItem.statistics.viewCount),
        likes: Number(randomItem.statistics.likeCount),
        comments: Number(randomItem.statistics.commentCount),
        year: new Date(randomItem.snippet.publishedAt).getFullYear(),
        thumbnail: randomItem.snippet.thumbnails.high.url,
      };

      setVideo(parsed);
      setArtist("");
      setSong("");
      setGenres("");
    } catch (error) {
      console.error("Failed to fetch music video", error);
    }
  };

  const generatedJSON = video
    ? {
        id: video.id,
        title: video.title,
        channel: video.channel,
        views: video.views,
        likes: video.likes,
        comments: video.comments,
        year: video.year,
        artist,
        song,
        genres: genres.split(",").map((g) => g.trim()),
        type: "music",
      }
    : null;

  return (
    <div className="p-8 max-w-3xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">🎵 Curate Music Videos</h1>
      <div className="flex gap-3 mb-6">
        <button
          onClick={fetchRandomMusicVideo}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded mb-6"
        >
          🎲 Fetch Random Music Video
        </button>
        <input
          type="text"
          placeholder="YouTube Video ID"
          value={videoIdInput}
          onChange={(e) => setVideoIdInput(e.target.value)}
          className="bg-gray-800 border border-gray-700 px-3 py-2 rounded w-full"
        />
        <button
          onClick={() => fetchVideoData(videoIdInput)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          🔍 Fetch by ID
        </button>
      </div>

      {video && (
        <div className="bg-gray-900 p-4 rounded mb-4 space-y-2">
          <img
            src={video.thumbnail}
            alt="thumbnail"
            className="w-full rounded mb-2"
          />
          <p>
            <strong>Title:</strong> {video.title}
          </p>
          <p>
            <strong>Channel:</strong> {video.channel}
          </p>
          <p>
            <strong>Views:</strong> {video.views.toLocaleString()}
          </p>
          <p>
            <strong>Likes:</strong> {video.likes.toLocaleString()}
          </p>
          <p>
            <strong>Comments:</strong> {video.comments.toLocaleString()}
          </p>
          <p>
            <strong>Upload Year:</strong> {video.year}
          </p>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
          >
            ▶️ Watch on YouTube
          </a>
        </div>
      )}

      {video && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700 w-full"
          />
          <input
            type="text"
            placeholder="Song Name"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700 w-full"
          />
          <input
            type="text"
            placeholder="Genres (comma-separated)"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700 w-full"
          />
        </div>
      )}

      {generatedJSON && (
        <div className="mt-6">
          <h2 className="font-bold text-xl mb-2">📦 JSON Entry</h2>
          <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(generatedJSON, null, 2)}
          </pre>
        </div>
      )}
      {generatedJSON && (
        <button
          onClick={async () => {
            const res = await fetch("/api/save-song", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(generatedJSON),
            });

            if (res.ok) {
              alert("✅ Song saved!");
              setArtist("");
              setSong("");
              setGenres("");
              setVideo(null); // Clear after save
            } else {
              const err = await res.json();
              alert(`❌ Failed to save: ${err.error}`);
            }
          }}
          className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
        >
          💾 Save to Songs
        </button>
      )}
    </div>
  );
}
