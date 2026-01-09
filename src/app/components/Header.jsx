"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
   const navItems = [
    { href: "/about", label: "ABOUT" },
    { href: "/our-work", label: "OUR WORK" },
    { href: "/services", label: "SERVICES" },
    { href: "/awards", label: "AWARDS" },
    { href: "/client", label: "CLIENTS" },
    { href: "/careers", label: "CAREERS" },
    { href: "/privacy-policy", label: "PRIVACY POLICY" },
    { href: "/contact", label: "CONTACT" },
  ];

  const isLoggedIn = status === "authenticated";

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            D2D SOCIAL
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">

            {[
              { href: "/about", label: "ABOUT", icon: "🧠" },
              { href: "/our-work", label: "OUR WORK", icon: "✏️" },
              { href: "/services", label: "SERVICES", icon: "🛠️" },
              { href: "/awards", label: "AWARDS", icon: "🏆" },
              { href: "/client", label: "CLIENTS", icon: "🤝" },
              { href: "/careers", label: "CAREERS", icon: "🚀" },
              { href: "/privacy-policy", label: "PRIVACY POLICY", icon: "🔒" },
              { href: "/contact", label: "CONTACT", icon: "📩" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center text-sm font-medium hover:text-primary transition-all"
              >
                <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* 🔐 AUTH NAV ITEMS (SAME STYLE) */}
            {status !== "loading" && (
              <>
                {!isLoggedIn ? (
                  <button
                    onClick={() => signIn()}
                    className="group flex flex-col items-center text-sm font-medium hover:text-primary transition-all"
                  >
                    <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">
                      🔐
                    </span>
                    <span>LOGIN</span>
                  </button>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className="group flex flex-col items-center text-sm font-medium hover:text-primary transition-all"
                    >
                      <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">
                        📊
                      </span>
                      <span>DASHBOARD</span>
                    </Link>

                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="group flex flex-col items-center text-sm font-medium hover:text-primary transition-all"
                    >
                      <span className="text-lg opacity-0 group-hover:opacity-100 transition-all">
                        🚪
                      </span>
                      <span>LOGOUT</span>
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
          
        </div>
      </div>

      {/* ✅ MOBILE DRAWER */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="flex flex-col px-6 py-4 space-y-4">

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}

            <hr />

            {status !== "loading" && (
              !isLoggedIn ? (
                <button
                  onClick={() => {
                    signIn();
                    setIsOpen(false);
                  }}
                  className="text-left font-medium"
                >
                  LOGIN
                </button>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    DASHBOARD
                  </Link>

                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/login" });
                      setIsOpen(false);
                    }}
                    className="text-left"
                  >
                    LOGOUT
                  </button>
                </>
              )
            )}
          </div>
        </div>
      )}

      
    </nav>
  );
}

export default Header;
