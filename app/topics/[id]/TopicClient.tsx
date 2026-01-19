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

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // later: POST reply to API
    console.log("Submitting post for topic:", topicId, form);

    setForm({ postTitle: "", postData: "" });
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

      <button
        type="submit"
        className="bg-[#3390d6] text-black border border-black m-2 p-2"
      >
        Submit reply
      </button>
    </form>
  );
}
