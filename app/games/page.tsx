"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function Games() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/api/games");

        if (!res.ok) {
          throw new Error("API failed");
        }

        const data = await res.json();
        setGames(data.slice(0, 12));
      } catch (err) {
        setError("Failed to load games");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  const filteredList = games.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  if (loading)
    return (
      <p className="min-h-screen flex justify-center items-center">
        <Loading />
      </p>
    );
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border p-2 mb-4 mt-6 ml-6 w-full max-w-md text-white"
      />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredList.map((game) => (
          <div key={game.id} className="border p-3 rounded">
            <img src={game.thumbnail} alt={game.title} />
            <h2 className="text-white">{game.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
