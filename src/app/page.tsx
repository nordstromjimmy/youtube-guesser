import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
          🎯 YTGuessr
        </h1>
        <p className="text-lg text-gray-400 mb-16">
          A fast-paced guessing game powered by real YouTube videos.
        </p>

        {/* 🎧 MUSIC GUESSING GAME */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-3">🎧 Music Mode</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Listen to a snippet of a real YouTube music video and guess the{" "}
            <span className="text-white font-semibold">artist</span>,{" "}
            <span className="text-white font-semibold">song name</span>, and{" "}
            <span className="text-white font-semibold">upload year</span> for
            points.
          </p>
          <Link href="/music">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-all hover:scale-105 shadow-md cursor-pointer">
              🎮 Play Music Game
            </button>
          </Link>
        </div>

        {/* DIVIDER */}
        <div className="h-px w-24 bg-gray-700 mx-auto mb-20 opacity-50" />

        {/* 📹 CREATOR GUESSING GAME */}
        <div>
          <h2 className="text-2xl font-bold mb-3">📹 Creator Mode</h2>
          <p className="text-gray-400 mb-4 max-w-xl mx-auto">
            Watch a short clip and try to identify the{" "}
            <span className="text-white font-medium">YouTuber</span> behind the
            video — no title, no intro.
          </p>
          <span className="inline-block bg-yellow-300 text-yellow-900 font-semibold px-4 py-2 rounded-full text-sm mt-2">
            🚧 Coming Soon
          </span>
        </div>
      </div>
    </main>
  );
}
