"use client";

import { useState, ChangeEvent } from "react";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TopicPage({ params }: Props) {
  const { id } = await params;
  const [form, setForm] = useState({
    postTitle: "",
    postData: "",
  });

  // Correct event type
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = () => {};

  const client = await clientPromise;
  const db = client.db("forumdata");

  const topic = await db.collection("topics").findOne({
    _id: new ObjectId(id),
  });

  if (!topic) {
    return <div className="p-10">Topic not found</div>;
  }

  return (
    <>
      <div className="p-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-white">
          {topic.topicTitle}
        </h1>
        <p className="text-white mb-2">{topic.topicDescription}</p>
        <p className="mb-4 text-white">{topic.topicData}</p>
        <span className="text-sm text-white">
          Created by: {topic.topicAuthor}
        </span>
      </div>

      <form className="m-2 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post title..."
          className="border border-black bg-gray-100 m-2"
          name="postTitle"
          value={form.postTitle}
          onChange={handleChange}
        />

        <textarea
          className="bg-gray-100 border border-black m-2"
          placeholder="Enter your post data here..."
          cols={50}
          rows={10}
          value={form.postData}
          name="postData"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-[#3390d6] text-black border border-black m-2"
        >
          Submit thread
        </button>
      </form>
    </>
  );
}
