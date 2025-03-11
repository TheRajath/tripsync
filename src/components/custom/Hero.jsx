import React from "react";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="relative flex flex-col items-center text-center px-6 md:px-12 lg:px-32 py-20 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white">
      <h1 className="font-extrabold text-4xl md:text-6xl max-w-3xl leading-tight drop-shadow-lg">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500">
          Unlock the Best Destinations with Smart Travel Planning!
        </span>
      </h1>

      <p className="text-lg md:text-2xl text-gray-200 mt-4 max-w-2xl">
        Your personal AI travel assistant, crafting custom itineraries based on
        your preferences, budget, and schedule.
      </p>

      <a href="/create-trip">
        <Button className="mt-8 px-10 py-4 text-lg font-bold bg-white text-[#7326d8] rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-110">
          🚀 Get Started
        </Button>
      </a>

      <div className="relative mt-12">
        <img
          src="/landingpage.jpg"
          className="w-full max-w-4xl rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105"
          alt="Travel Destination"
        />
      </div>

      <div className="absolute bottom-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            d="M0,256L48,234.7C96,213,192,171,288,176C384,181,480,235,576,261.3C672,288,768,288,864,282.7C960,277,1056,267,1152,240C1248,213,1344,171,1392,149.3L1440,128V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"
          />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
