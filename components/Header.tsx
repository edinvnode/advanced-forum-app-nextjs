import React from "react";
import Link from "next/link";

function Header() {
  return (
    <nav className="bg-[#3390d6] p-4">
      <ul className="flex flex-row justify-around">
        <li>
          <Link href="/">Forum</Link>
        </li>
        <li>
          <Link href="/games">Games</Link>
        </li>
        <li>
          <Link href="books">Books</Link>
        </li>
        <li>
          <Link href="/movies">Movies</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
