"use client";
import React, { useState } from "react";
import { Button } from "../ui/button"; 
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full z-50 bg-white text-gray-800 shadow-md">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="text-xl font-bold">NextBLog</div>
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" passHref>
                <span className="text-lg text-gray-800 hover:underline">Home</span>
              </Link>
            </li>
            <li>
              <Link href="/blogs" passHref>
                <span className="text-lg text-gray-800 hover:underline">Blogs</span>
              </Link>
            </li>
          </ul>
          <SignedIn>
            <Link href="/create" passHref>
              <span className="text-lg text-gray-800 hover:underline">Create</span>
            </Link>
            <Link href="/profile" passHref>
              <span className="text-lg text-gray-800 hover:underline">Profile</span>
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className="bg-green-500 text-white hover:bg-green-600">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 right-0 bg-white w-full shadow-lg md:hidden z-50">
          <div className="flex flex-col items-center p-4">
            <ul className="flex flex-col space-y-2">
              <li>
                <Link href="/" passHref>
                  <span
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg text-gray-800 hover:underline"
                  >
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blogs" passHref>
                  <span
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg text-gray-800 hover:underline"
                  >
                    Blogs
                  </span>
                </Link>
              </li>
            </ul>
            <SignedIn>
              <>
                <Link href="/create" passHref>
                  <span
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg text-gray-800 hover:underline"
                  >
                    Create
                  </span>
                </Link>
                <Link href="/profile" passHref>
                  <span
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg text-gray-800 hover:underline"
                  >
                    Profile
                  </span>
                </Link>
                <UserButton />
              </>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
