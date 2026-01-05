"use client";

import { useEffect, useState } from "react";

export default function Games() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {games.map((game) => (
        <div key={game.id} className="border p-3 rounded">
          <img src={game.thumbnail} alt={game.title} />
          <h2>{game.title}</h2>
        </div>
      ))}
    </div>
  );
}
