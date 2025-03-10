"use client";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

const images = [
  "/bg1.jpg",
  "/bg2.jpg",
  "/bg3.jpg",
]; // Ensure these paths are correct in your Next.js public folder

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + direction;

        // Reverse direction when reaching the last or first image
        if (nextIndex >= images.length - 1) {
          setDirection(-1); // Switch to moving back
        } else if (nextIndex <= 0) {
          setDirection(1); // Switch to moving forward
        }

        return nextIndex;
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Slideshow container */}
      <div
        className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="min-w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Welcome to Careven Fresh 
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          Indulge in our heavenly pastries and cakes
        </p>
        <Button size="lg" className="text-lg px-8 py-3">
          Explore Our Menu
        </Button>
      </div>
    </section>
  );
}








