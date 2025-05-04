import { Guess, VideoData } from "@/types/video";

// Core scoring function
export function scoreGuess(guess: Guess, actual: VideoData) {
  const score = {
    artist: scoreTitle(guess.artist, actual.artist),
    song: scoreUploader(guess.song, actual.song),
    likes: scoreNumberGuess(guess.likes, actual.likes),
    comments: scoreNumberGuess(guess.comments, actual.comments),
    views: scoreNumberGuess(guess.views, actual.views),
    uploadYear: scoreYear(guess.year, actual.year),
  };

  return {
    total: Object.values(score).reduce((a, b) => a + b, 0),
    breakdown: score,
  };
}

// Scoring logic for fuzzy title match
function scoreTitle(guess: string, actual: string) {
  const guessWords = guess.toLowerCase().split(/\s+/);
  const actualWords = actual.toLowerCase().split(/\s+/);
  const matchCount = guessWords.filter((word) =>
    actualWords.includes(word)
  ).length;
  const accuracy = matchCount / actualWords.length;
  return Math.round(accuracy * 25); // max 25 points
}

// Scoring logic for uploader (character match)
function scoreUploader(guess: string, actual: string) {
  const cleanGuess = guess.toLowerCase().replace(/\s/g, "");
  const cleanActual = actual.toLowerCase().replace(/\s/g, "");
  const matches = [...cleanGuess].filter((char) =>
    cleanActual.includes(char)
  ).length;
  const max = Math.max(cleanGuess.length, cleanActual.length);
  const accuracy = matches / max;
  return Math.round(accuracy * 25);
}

// Scoring for numbers (likes, comments, views)
function scoreNumberGuess(guess: number, actual: number) {
  const diff = Math.abs(guess - actual);
  const maxPoints = 25;

  if (diff < 0.05 * actual) return maxPoints; // within 5%
  if (diff < 0.1 * actual) return 20;
  if (diff < 0.2 * actual) return 15;
  if (diff < 0.5 * actual) return 10;
  return 0;
}

// Simple year score (exact = 25, -1 year = 20, -2 = 10, else 0)
function scoreYear(guess: number, actual: number) {
  const diff = Math.abs(guess - actual);
  if (diff === 0) return 25;
  if (diff === 1) return 20;
  if (diff === 2) return 10;
  return 0;
}
