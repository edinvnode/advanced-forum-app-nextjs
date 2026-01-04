"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const data = [
    { id: 1, topicTitle: "New Games", topicAuthor: "admin" },
    { id: 2, topicTitle: "Old Games", topicAuthor: "admin" },
    { id: 3, topicTitle: "Best Games", topicAuthor: "admin" },
    { id: 4, topicTitle: "Clasic Games", topicAuthor: "admin" },
    { id: 5, topicTitle: "Retro Games", topicAuthor: "admin" },
    { id: 6, topicTitle: "PSX Games", topicAuthor: "admin" },
    { id: 7, topicTitle: "Xbox Games", topicAuthor: "admin" },
    { id: 8, topicTitle: "Nintendo Games", topicAuthor: "admin" },
    { id: 9, topicTitle: "Sega Games", topicAuthor: "admin" },
    { id: 10, topicTitle: "PS5 Games", topicAuthor: "admin" },
  ];

  return (
    <div className="flex min-h-screen items-center  bg-green-300 font-sans dark:bg-black flex-col">
      {data.map((topic) => (
        <div className="flex flex-col w-screen text-center border border-black">
          <h2>{topic.topicTitle}</h2>
          <span>Created by: {topic.topicAuthor}</span>
        </div>
      ))}
    </div>
  );
}
