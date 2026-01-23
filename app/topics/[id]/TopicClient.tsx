"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type Props = {
  topicId: string;
};

export default function TopicClient({ topicId }: Props) {
  const [form, setForm] = useState({
    postTitle: "",
    postData: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!form.postTitle || !form.postData) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/topics/${topicId}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postTitle: form.postTitle,
        postData: form.postData,
        postAuthor: "admin",
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok || !data.success) {
      setError(data.message || "Failed to post reply.");
      return;
    }

    setForm({ postTitle: "", postData: "" });

    // optional refresh (so replies appear immediately)
    window.location.reload();
  }

  return (
    <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Post title..."
        className="border border-black bg-gray-100 m-2 p-2"
        name="postTitle"
        value={form.postTitle}
        onChange={handleChange}
      />

      <textarea
        className="bg-gray-100 border border-black m-2 p-2"
        placeholder="Enter your post data here..."
        cols={50}
        rows={6}
        value={form.postData}
        name="postData"
        onChange={handleChange}
      />

      {error && <p className="text-red-500 m-2 font-bold">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-[#3390d6] text-black border border-black m-2 p-2 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Submit reply"}
      </button>
    </form>
  );
}
