export interface VideoData {
  id: string;
  artist: string;
  song: string;
  year: number;
  views: number;
  likes: number;
  comments: number;
}

// The final guess type (used by the game logic)
export interface Guess {
  artist: string;
  song: string;
  year: number;
  views: number;
  likes: number;
  comments: number;
}

// The form state (used only by GuessForm)
export interface GuessFormState {
  artist: string;
  song: string;
  year: string;
  views: string;
  likes: string;
  comments: string;
}

export interface VideoData {
  id: string; // YouTube video ID
  title: string;
  channel: string;
  views: number;
  likes: number;
  comments: number;
  year: number;

  genres: string[]; // e.g. ["Pop", "2000s", "Viral"]
  type: "music" | "comedy" | "tech" | "gaming" | "other"; // general type
  difficulty?: "easy" | "medium" | "hard"; // optional
  language?: string; // e.g. "en", "es", "jp"
  hint?: string; // optional hint for future UI
}

// YouTube Fetch API
export interface YouTubeVideoData {
  id: string;
  title: string;
  channel: string;
  views: number;
  likes: number;
  comments: number;
  year: number;
  thumbnail: string;
}
