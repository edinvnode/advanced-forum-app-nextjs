"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";
import { Movie, MovieDetails } from "@/types/movie";

export default function Movies() {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [details, setDetails] = useState<MovieDetails | null>(null);

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
      } catch {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  useEffect(() => {
    if (!selectedId) return;

    async function fetchDetails() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=ced0841&i=${selectedId}&plot=full`
      );
      const data = await res.json();
      setDetails(data);
    }

    fetchDetails();
  }, [selectedId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie Search</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border p-2 mb-4 w-full max-w-md"
      />

      {loading && (
        <p className="min-h-screen flex justify-center items-center">
          Loading...
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onSelect={setSelectedId}
          />
        ))}
      </ul>

      {selectedId && (
        <MovieModal
          movie={details}
          onClose={() => {
            setSelectedId(null);
            setDetails(null);
          }}
        />
      )}
    </div>
  );
}
