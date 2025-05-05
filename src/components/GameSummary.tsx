interface Props {
  result: number;
  maxScore: number;
}

export function GameSummary({ result, maxScore }: Props) {
  return (
    <div className=" text-center bg-gray-50 p-8 rounded shadow max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">🏁 Game Over!</h2>
      <p className="text-xl text-gray-700">
        Your Score: {result} / {maxScore}
      </p>
      <p className="mt-4 text-gray-500">Thanks for playing! 🎵</p>
      <div className="mt-12">
        <a
          href="/music"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold  px-6 py-3 rounded shadow"
        >
          Back To Home
        </a>
      </div>
    </div>
  );
}
