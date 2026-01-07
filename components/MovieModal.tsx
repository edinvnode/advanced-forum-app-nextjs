"use client";

import { MovieDetails } from "@/types/movie";

type Props = {
  movie: MovieDetails | null;
  onClose: () => void;
};

export default function MovieModal({ movie, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full p-6 rounded relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          ✕
        </button>

        {!movie ? (
          <p className="text-center">Loading movie details...</p>
        ) : (
          <div className="flex gap-4">
            <img src={movie.Poster} alt={movie.Title} className="w-40" />

            <div>
              <h2 className="text-xl font-bold">{movie.Title}</h2>
              <p className="text-sm text-gray-600">
                {movie.Year} • {movie.Runtime}
              </p>

              <p className="mt-2">{movie.Plot}</p>

              <p className="mt-2">
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <strong>Actors:</strong> {movie.Actors}
              </p>
              <p>
                <strong>IMDb:</strong> ⭐ {movie.imdbRating}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
