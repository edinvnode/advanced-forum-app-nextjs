"use client";

import { Movie } from "@/types/movie";

type Props = {
  movie: Movie;
  onSelect: (id: string) => void;
};

export default function MovieCard({ movie, onSelect }: Props) {
  return (
    <li
      onClick={() => {
        console.log("Clicked:", movie.imdbID);
        onSelect(movie.imdbID);
      }}
      className="border p-2 cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="mb-2"
      />
      <h2 className="font-semibold">{movie.Title}</h2>
      <p>{movie.Year}</p>
    </li>
  );
}
