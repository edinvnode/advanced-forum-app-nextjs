"use client";

import { useEffect, useState } from "react";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
};

export default function Movies() {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=ced0841&s=${query}`
        );
        const data = await res.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch (err) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie Search</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border p-2 mb-4 w-full max-w-md"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="border p-2">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              className="mb-2"
            />
            <h2 className="font-semibold">{movie.Title}</h2>
            <p>{movie.Year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
