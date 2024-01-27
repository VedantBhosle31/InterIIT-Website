"use client";
import React, { useState, useEffect } from "react";
import logo from "@/assets/logo_dark.svg";
import Image from "next/image";

const LandingPageBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Check screen width and update isLargeScreen state
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 640);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex justify-between">
      <div className="mt-1 ml-4">
        <a href="/">
          <Image src={logo} alt="logo" className="w-[100px]" />
        </a>
      </div>
      {isLargeScreen ? (
        <div className="sm:flex pt-5">
          <div>
            <a
              className="text-gray-700 hover:bg-gray-700 hover:text-white text-bold rounded-md p-2 font-bold lg:text-xl md:text-l sm:text-sm md:text-xl font-medium lg:mr-16 md:mr-8"
              href="/contact-us"
            >
              Contact Us
            </a>
          </div>
          <div>
            <a
              className="text-gray-700 hover:bg-gray-700 hover:text-white text-bold rounded-md p-2 font-bold lg:text-xl md:text-l sm:text-sm md:text-xl font-medium lg:mr-16 md:mr-8"
              href="/problem-statements"
            >
              Problem Statements
            </a>
          </div>
          <div>
            <a
              className="text-gray-700 hover:bg-gray-700 hover:text-white text-bold rounded-md p-2 font-bold lg:text-xl md:text-l sm:text-sm md:text-xl font-medium lg:mr-16 md:mr-8"
              href="/login"
            >
              Login
            </a>
          </div>
        </div>
      ) : (
        <div className="lg:hidden md:hidden relative">
          <button
            className="text-gray-700 p-2 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {menuOpen && (
            <div
              className={`flex flex-col space-y-2 absolute bg-white -left-[35vw] transition-opacity duration-500 ease-in-out rounded ${
                menuOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <a
                className="text-gray-700 hover:bg-gray-700 hover:text-white text-bold  rounded-md p-2 font-bold lg:text-xl md:text-l sm:text-sm font-medium lg:mr-16 md:mr-8 sm:mr-4"
                href="/contact-us"
              >
                Contact Us
              </a>
              <a
                className="text-gray-700 hover:bg-gray-700 hover:text-white text-bold rounded-md p-2 font-bold lg:text-xl md:text-l sm:text-sm md:text-xl font-medium lg:mr-16 md:mr-8"
                href="/problem-statements"
              >
                Problem Statements
              </a>
              <a
                className="text-gray-700 hover:bg-gray-700 hover:text-white text-bold rounded-md p-2 font-bold lg:text-xl md:text-l sm:text-sm md:text-xl font-medium lg:mr-16 md:mr-8"
                href="/login"
              >
                Login
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPageBar;
