"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Newspaper, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewspaperHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Set Bengali date
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // const bengaliDate = today.toLocaleDateString("bn-IN", options);
    const date = today.toLocaleDateString("en-IN", options);
    setCurrentDate(date);

    // Handle scroll for navbar shadow
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full bg-cream border-b-2 border-taupe">
            {/* Navbar */}
            <nav
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Name (left) */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image
                src="/logo.jpg"
                alt="Agartala Darpan Logo"
                width={50}
                height={50}
                className="w-12 h-12 object-contain"
              />
              <span className="bengali-serif text-lg md:text-xl font-semibold text-burgundy hidden sm:inline">
                আগরতলা দৰ্পণ
              </span>
            </Link>

            {/* Navigation Links (center) */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="#epaper"
                className="bengali-text text-base text-charcoal hover:text-burgundy transition-colors duration-300"
              >
                ই-পেপার
              </Link>
              <Link
                href="#contact"
                className="bengali-text text-base text-charcoal hover:text-burgundy transition-colors duration-300"
              >
                যোগাযোগ
              </Link>
            </div>

            {/* Admin Button (right) */}
            <Link href="/sign-in">
              <Button
                variant="outline"
                size="sm"
                className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white transition-all duration-300"
              >
                <Lock className="w-4 h-4 mr-2" />
                <span className="font-inter">Admin</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center justify-center gap-6 mt-4 pt-4 border-t border-taupe">
            <Link
              href="#epaper"
              className="bengali-text text-sm text-charcoal hover:text-burgundy transition-colors duration-300"
            >
              ই-পেপার
            </Link>
            <Link
              href="#contact"
              className="bengali-text text-sm text-charcoal hover:text-burgundy transition-colors duration-300"
            >
              যোগাযোগ
            </Link>
          </div>
        </div>
      </nav>
      {/* Masthead */}
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.jpg"
              alt="Agartala Darpan Logo"
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"
            />
          </div>

          {/* Newspaper Name */}
          <h1 className="bengali-serif text-[56px] md:text-[64px] font-bold text-burgundy tracking-tight">
            আগরতলা দৰ্পণ
          </h1>

          {/* Tagline */}
          <p className="bengali-text text-lg md:text-xl text-charcoal/80">
            কুঞ্জাবন কলোনি, আগরতলা, পশ্চিম ত্রিপুরা থেকে প্রকাশিত
          </p>

          {/* Editor Info */}
          <p className="font-inter text-sm md:text-base text-charcoal/70">
            Published from: P.O-Abhoynagar, Agartala, West Tripura. PIN-799005 | Email: agtdarpan16@gmail.com | M: 9774842294 | Landline: 0381 359 6723
          </p>

          {/* Date */}
          <p className="bengali-text text-sm text-charcoal/60 pt-2">
            {currentDate}
          </p>
        </div>
      </div>
    </header>
  );
}