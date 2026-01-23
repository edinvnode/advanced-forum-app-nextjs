"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

type Book = {
  id: string;
  title: string;
  image: string;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

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

  const filteredList = books.filter((item) =>
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
        placeholder="Search books..."
        className="border p-2 mb-4 mt-6 ml-6 w-full max-w-md text-white"
      />
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredList.map((book) => (
          <div key={book.id} className="border p-3 rounded">
            <div className="h-9/10">
              <img src={book.image} alt={book.title} className="h-9/10" />
            </div>
            <h2 className="text-white">{book.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
