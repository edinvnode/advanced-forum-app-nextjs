"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

type Topic = {
  id: number;
  topicTitle: string;
  topicDescription: string;
  topicData: string;
  topicAuthor: string;
};

export default function Home() {
  const [topics, setTopics] = useState<Topic[]>([]);

  const [form, setForm] = useState({
    topicTitle: "",
    topicDescription: "",
    topicData: "",
    topicAuthor: "admin",
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
    });
  }

  return (
    <div className="flex min-h-full items-center bg-green-300 font-sans dark:bg-black flex-col">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className="flex flex-row w-full text-center border border-black justify-between px-5"
        >
          <div className="flex flex-col justify-start items-start">
            <h2>{topic.topicTitle}</h2>
            <h3>{topic.topicDescription}</h3>
          </div>
          <span>Created by: {topic.topicAuthor}</span>
        </div>
      ))}

      <form className="m-2 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Topic title..."
          className="border border-black bg-gray-100 m-2"
          name="topicTitle"
          value={form.topicTitle}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Topic description..."
          className="border border-black bg-gray-100 m-2"
          name="topicDescription"
          value={form.topicDescription}
          onChange={handleChange}
        />

        <textarea
          className="bg-gray-100 border border-black m-2"
          placeholder="Enter your post data here..."
          cols={50}
          rows={10}
          value={form.topicData}
          name="topicData"
          onChange={handleChange}
        />

        <button type="submit" className="bg-gray-400 border border-black m-2">
          Submit thread
        </button>
      </form>
    </div>
  );
}
