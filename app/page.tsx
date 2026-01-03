"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const data = [
    { id: 1, topicTitle: "New Games", topicAuthor: "admin" },
    { id: 1, topicTitle: "Old Games", topicAuthor: "admin" },
    { id: 1, topicTitle: "Best Games", topicAuthor: "admin" },
    { id: 1, topicTitle: "Clasic Games", topicAuthor: "admin" },
    { id: 1, topicTitle: "Retro Games", topicAuthor: "admin" },
  ];

  return (
    <div className="flex min-h-screen items-center  bg-zinc-50 font-sans dark:bg-black flex-col">
      {data.map((topic) => (
        <div className="flex flex-col w-screen text-center border border-black">
          <h2>{topic.topicTitle}</h2>
          <span>{topic.topicAuthor}</span>
        </div>
      ))}
    </div>
  );
}
