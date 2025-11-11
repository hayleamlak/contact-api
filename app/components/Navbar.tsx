"use client"; // 
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">My Portfolio</div>
      <div className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
     
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
