import rawVideos from "@/data/songs/songs.json";
import { VideoData } from "@/types/video";

const videos = rawVideos as VideoData[];

export function getRandomVideo(): VideoData {
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
}

export function getRandomVideoByGenre(genre: string): VideoData {
  if (genre === "All") return getRandomVideo();

  const filtered = videos.filter((v) =>
    v.genres?.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
  );

  if (filtered.length === 0) {
    throw new Error(`No videos found for genre: ${genre}`);
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
