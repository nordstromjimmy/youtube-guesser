"use client";

import { useState } from "react";
import { Guess, GuessFormState } from "@/types/video";

interface Props {
  onSubmit: (guess: Guess) => void;
}

export const GuessForm = ({ onSubmit }: Props) => {
  const [form, setForm] = useState<GuessFormState>({
    artist: "",
    song: "",
    likes: "",
    comments: "",
    views: "",
    year: "",
  });

  const handleSubmit = () => {
    onSubmit({
      artist: form.artist.trim(),
      song: form.song.trim(),
      likes: Number(form.likes),
      comments: Number(form.comments),
      views: Number(form.views),
      year: Number(form.year),
    });
  };

  return (
    <div className="w-full max-w-3xl flex flex-col gap-4">
      <input
        className="p-3 bg-gray-800 border border-gray-700 rounded-lg"
        placeholder="Guess the Artist"
        value={form.artist}
        onChange={(e) => setForm({ ...form, artist: e.target.value })}
      />
      <input
        className="p-3 bg-gray-800 border border-gray-700 rounded-lg"
        placeholder="Guess the Song Name"
        value={form.song}
        onChange={(e) => setForm({ ...form, song: e.target.value })}
      />
      {(["year", "views", "likes", "comments"] as const).map((field) => (
        <input
          key={field}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={`Guess ${
            field.charAt(0).toUpperCase() + field.slice(1)
          }`}
          className="p-3 bg-gray-800 border border-gray-700 rounded-lg"
          value={(form as any)[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          onFocus={(e) => e.target.select()}
        />
      ))}
      <button
        onClick={handleSubmit}
        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold cursor-pointer"
      >
        Submit Guess
      </button>
    </div>
  );
};
