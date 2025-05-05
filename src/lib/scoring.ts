export function scoreGuessDetailed(
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
  const result = {
    artist: 0,
    song: 0,
    year: 0,
    views: 0,
    likes: 0,
    comments: 0,
    total: 0,
  };

  if (guess.artist.toLowerCase() === actual.artist.toLowerCase()) {
    result.artist = 50;
  }

  if (guess.song.toLowerCase() === actual.song.toLowerCase()) {
    result.song = 50;
  }

  const yearDiff = Math.abs(guess.year - actual.year);
  if (yearDiff === 0) result.year = 20;
  else if (yearDiff <= 1) result.year = 10;

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

  result.views = scoreNumberGuess(actual.views, guess.views, 15);
  result.likes = scoreNumberGuess(actual.likes, guess.likes, 10);
  result.comments = scoreNumberGuess(actual.comments, guess.comments, 5);

  result.total =
    result.artist +
    result.song +
    result.year +
    result.views +
    result.likes +
    result.comments;

  return result;
}
