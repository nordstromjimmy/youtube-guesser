import Link from "next/link";

export default function MusicSetupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">🎧 Music Game Setup</h1>
        <p className="text-gray-400 mb-10">
          Choose how you want to play. More options coming soon!
        </p>

        {/* 🎲 Current Mode */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-2 text-white">Game Mode</h2>
          <p className="text-gray-300 mb-1">🎲 Random Songs</p>
          <p className="text-sm text-gray-500">
            A mix of all songs in the database.
          </p>

          {/* Placeholder for future genre selector */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Genre (coming soon)
            </label>
            <select
              disabled
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-gray-400 cursor-not-allowed"
            >
              <option>All Genres</option>
            </select>
          </div>
        </div>

        {/* 🚀 Start Game */}
        <Link href="/game">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer">
            ▶️ Play Game
          </button>
        </Link>
      </div>
    </main>
  );
}
