"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

type Topic = {
  _id: string;
  topicTitle: string;
  topicDescription: string;
  topicData: string;
  topicAuthor: string;
  posts: string[];
};

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);

  const [form, setForm] = useState({
    topicTitle: "",
    topicDescription: "",
    topicData: "",
    topicAuthor: "admin",
    posts: [],
  });

  useEffect(() => {
    async function fetchTopics() {
      const res = await fetch("/api/topics");
      const data = await res.json();
      setTopics(data);
    }

    fetchTopics();
  }, []);

  // Correct event type
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  //fetch data from route
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      form.topicTitle === "" ||
      form.topicDescription === "" ||
      form.topicData === "" ||
      form.topicAuthor === ""
    ) {
      return;
    }

    const res = await fetch("/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (result.success) {
      // refresh list from DB
      const updated = await fetch("/api/topics");
      const data = await updated.json();
      setTopics(data);
    }

    setForm({
      topicTitle: "",
      topicDescription: "",
      topicData: "",
      topicAuthor: "admin",
      posts: [],
    });
  }

  async function deleteTopic(id: string) {
    await fetch("/api/topics", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    // Refresh list
    const res = await fetch("/api/topics");
    const data = await res.json();
    setTopics(data);
  }

  useEffect(() => {
    if (topics.length > 0) {
      console.log("First topic id:", topics[0]._id);
    }
  }, [topics]);

  return (
    <div className="flex min-h-full items-center text-white bg-[#0f0f0f] font-sans dark:bg-black flex-col">
      {topics.map((topic) => (
        <div
          key={topic._id}
          className="flex flex-row w-full text-center border border-black justify-between px-5"
        >
          <div className="flex flex-col justify-start items-start">
            <Link href={`/topics/${topic._id}`}>
              <h2 className="cursor-pointer text-blue-600 hover:underline">
                {topic.topicTitle}
              </h2>
            </Link>
            <h3>{topic.topicDescription}</h3>
          </div>
          <div className="flex gap-3 items-center">
            <span>Created by: {topic.topicAuthor}</span>

            <button
              className="bg-red-500 text-white px-3 py-1"
              onClick={() => deleteTopic(topic._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <form className="m-2 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Topic title..."
          className="border border-black bg-gray-100 m-2 text-black"
          name="topicTitle"
          value={form.topicTitle}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Topic description..."
          className="border border-black bg-gray-100 m-2 text-black"
          name="topicDescription"
          value={form.topicDescription}
          onChange={handleChange}
        />

        <textarea
          className="bg-gray-100 border border-black m-2 text-black"
          placeholder="Enter your post data here..."
          cols={50}
          rows={10}
          value={form.topicData}
          name="topicData"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-[#3390d6] text-black border border-black m-2"
        >
          Submit thread
        </button>
      </form>
    </div>
  );
}
