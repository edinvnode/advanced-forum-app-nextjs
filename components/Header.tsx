import React from "react";
import Link from "next/link";
import Tooltip from "./Tooltip";

function Header() {
  return (
    <nav className="bg-[#3390d6] p-4">
      <ul className="flex flex-row justify-around">
        <li>
          <Tooltip text="Explore forum topics" position="right">
            <Link href="/">Forum</Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="Search for games" position="right">
            <Link href="/games">Games</Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="Checkout your favorite book" position="right">
            <Link href="books">Books</Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip text="Search for you favorite movies" position="right">
            <Link href="/movies">Movies</Link>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
