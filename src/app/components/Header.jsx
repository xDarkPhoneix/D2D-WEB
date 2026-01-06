"use client";

<<<<<<< HEAD
function Header() {

  const [isOpen, setIsOpen] = useState(false)
=======
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

>>>>>>> 819a15cee2e67b7ad9fdd07420fc5d0d70c7d020
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
<<<<<<< HEAD
            <Link href="/privacy-policy" className="text-sm font-medium hover:text-primary transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="/awards" className="text-sm font-medium hover:text-primary transition-colors">
              AWARDS
            </Link>
            <Link href="/client" className="text-sm font-medium hover:text-primary transition-colors">
              CLIENTS
=======

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
>>>>>>> 819a15cee2e67b7ad9fdd07420fc5d0d70c7d020
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
<<<<<<< HEAD
  )
}

export default Header
  ;
=======
  );
}

export default Header;
>>>>>>> 819a15cee2e67b7ad9fdd07420fc5d0d70c7d020
