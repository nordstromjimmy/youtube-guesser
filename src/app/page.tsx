import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-4">🎯 YouTube Guesser</h1>
        <p className="text-lg text-gray-400 mb-12">
          A fast-paced guessing game powered by real videos. Watch. Guess.
          Score.
        </p>

        {/* 🎧 MUSIC GAME SECTION */}
        <section className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8 mb-12 mt-42">
          <h2 className="text-3xl font-bold mb-2 text-white">
            🎧 Music Guessing Game
          </h2>
          <p className="text-gray-300 mb-6">
            Listen to a snippet of a music video and guess the{" "}
            <strong>artist</strong>, <strong>song</strong>, and more for points.
          </p>
          <Link href="/game">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-all hover:scale-105 cursor-pointer">
              Start Music Game
            </button>
          </Link>
        </section>

        {/* 📹 CONTENT CREATOR GAME */}
        <section className="bg-gray-800 border border-gray-700 rounded-xl shadow-inner p-8">
          <h2 className="text-2xl font-bold mb-2 text-white">
            📹 Content Creator Game
          </h2>
          <p className="text-gray-400 mb-4">
            Watch a short clip and guess the{" "}
            <strong className="text-white">name of the YouTuber</strong>. Can
            you recognize them without the intro?
          </p>
          <span className="inline-block bg-yellow-300 text-yellow-900 font-medium px-4 py-2 rounded-full text-sm">
            Coming soon!
          </span>
        </section>
      </div>
    </main>
  );
}
