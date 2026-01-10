"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const data = [
    {
      id: 1,
      topicTitle: "New Games",
      description: "Talk about latest games on market",
      topicAuthor: "admin",
    },
    {
      id: 2,
      topicTitle: "Old Games",
      description: "Talk about old games you like",
      topicAuthor: "admin",
    },
    {
      id: 3,
      topicTitle: "Best Games",
      description: "What are the best games you played?",
      topicAuthor: "admin",
    },
    {
      id: 4,
      topicTitle: "Clasic Games",
      description: "Know good clasic game? Post about it here.",
      topicAuthor: "admin",
    },
    {
      id: 5,
      topicTitle: "Retro Games",
      description: "Retro games topic.",
      topicAuthor: "admin",
    },
    {
      id: 6,
      topicTitle: "PSX Games",
      description: "Talk about play station games.",
      topicAuthor: "admin",
    },
    {
      id: 7,
      topicTitle: "Xbox Games",
      description: "Xbox games thread.",
      topicAuthor: "admin",
    },
    {
      id: 8,
      topicTitle: "Nintendo Games",
      description: "Like nintendo games? This is the place for you.",
      topicAuthor: "admin",
    },
    {
      id: 9,
      topicTitle: "Sega Games",
      description: "Sega games thread.",
      topicAuthor: "admin",
    },
    {
      id: 10,
      topicTitle: "PS5 Games",
      description: "Tqlk about play station 5 games.",
      topicAuthor: "admin",
    },
  ];

  return (
    <div className="flex min-h-full items-center  bg-green-300 font-sans dark:bg-black flex-col">
      {data.map((topic) => (
        <div className="flex flex-row w-full text-center border border-black justify-between px-5">
          <div className="flex flex-col justify-start items-start">
            <h2>{topic.topicTitle}</h2>
            <h3>{topic.description}</h3>
          </div>
          <span>Created by: {topic.topicAuthor}</span>
        </div>
      ))}
    </div>
  );
}
