export function scoreGuess(
  actual: {
    artist: string;
    song: string;
    year: number;
    views: number;
    likes: number;
    comments: number;
  },
  guess: {
    artist: string;
    song: string;
    year: number;
    views: number;
    likes: number;
    comments: number;
  }
) {
  let score = 0;

  // Core matching
  if (guess.artist.toLowerCase() === actual.artist.toLowerCase()) score += 50;
  if (guess.song.toLowerCase() === actual.song.toLowerCase()) score += 50;

  const yearDiff = Math.abs(guess.year - actual.year);
  if (yearDiff === 0) score += 20;
  else if (yearDiff <= 1) score += 10;

  // Bonus points for close estimates
  const scoreNumberGuess = (
    actualVal: number,
    guessVal: number,
    maxPoints = 10
  ) => {
    const diff = Math.abs(actualVal - guessVal);
    const tolerance = actualVal * 0.2;
    if (diff < tolerance * 0.1) return maxPoints;
    if (diff < tolerance * 0.5) return Math.floor(maxPoints * 0.5);
    return 0;
  };

  score += scoreNumberGuess(actual.views, guess.views, 15);
  score += scoreNumberGuess(actual.likes, guess.likes, 10);
  score += scoreNumberGuess(actual.comments, guess.comments, 5);

  return score;
}
