"use client";

import { useEffect, useState } from "react";

type Book = {
  id: string;
  title: string;
  image: string;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/books");

        if (!res.ok) {
          throw new Error("API failed");
        }

        const data = await res.json();

        setBooks(data.books);
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book.id} className="border p-3 rounded">
          <img src={book.image} alt={book.title} />
          <h2>{book.title}</h2>
        </div>
      ))}
    </div>
  );
}
