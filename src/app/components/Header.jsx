"use client";

import Link from "next/link";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            D2D SOCIAL
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">

            <Link href="/about" className="group flex flex-col items-center text-sm font-medium hover:text-primary">
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">🧠</span>
              <span>ABOUT</span>
            </Link>

            <Link href="/our-work" className="group flex flex-col items-center text-sm font-medium hover:text-primary">
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">✏️</span>
              <span>OUR WORK</span>
            </Link>

            <Link href="/services" className="group flex flex-col items-center text-sm font-medium hover:text-primary">
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">🛠️</span>
              <span>SERVICES</span>
            </Link>

            <Link href="/awards" className="group flex flex-col items-center text-sm font-medium hover:text-primary">
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">🏆</span>
              <span>AWARDS</span>
            </Link>

            <Link href="/client" className="group flex flex-col items-center text-sm font-medium hover:text-primary">
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">🧑‍💼</span>
              <span>CLIENTS</span>
            </Link>

            <Link href="/careers" className="group flex flex-col items-center text-sm font-medium hover:text-primary">
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">🚀</span>
              <span>CAREERS</span>
            </Link>

            <Link href="/contact" className="group flex flex-col items-center text-sm font-medium hover:text-primary">
              <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">📩</span>
              <span>CONTACT</span>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;