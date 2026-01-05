"use client"
import Link from 'next/link';
import React, { useState } from 'react';

function  Header() {

     const [isOpen, setIsOpen] = useState(false)
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
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              ABOUT
            </Link>
            <Link href="/our-work" className="text-sm font-medium hover:text-primary transition-colors">
              OUR-WORK
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">
              SERVICES
            </Link>
             <Link href="/our-team" className="text-sm font-medium hover:text-primary transition-colors">
              OUT-TEAM
            </Link>
             <Link href="/awards" className="text-sm font-medium hover:text-primary transition-colors">
              AWADRS
            </Link>
             <Link href="/client" className="text-sm font-medium hover:text-primary transition-colors">
              CLIENTS
            </Link>
            <Link href="/careers" className="text-sm font-medium hover:text-primary transition-colors">
              CAREERS
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link href="/" className="block text-sm font-medium hover:text-primary transition-colors">
              WORK
            </Link>
            <Link href="/about" className="block text-sm font-medium hover:text-primary transition-colors">
              ABOUT
            </Link>
            <Link href="/services" className="block text-sm font-medium hover:text-primary transition-colors">
              SERVICES
            </Link>
            <Link href="/careers" className="block text-sm font-medium hover:text-primary transition-colors">
              CAREERS
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity w-fit"
            >
              CONTACT
            </Link>
          </div>
        )}
      </div>
    </nav>
    )
}

export default Header
;