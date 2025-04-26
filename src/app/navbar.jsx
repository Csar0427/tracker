"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-300 to-indigo-600 group-hover:animate-spin-slow"></div>
            <div className="absolute inset-1 rounded-full bg-black flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
          </div>
          <span className="text-white font-bold text-xl">
            Capstone<span className="text-purple-400">Tracker</span>
          </span>
        </Link>

        {/* Mobile Menu Button (Animated Hamburger) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-between items-center p-1 group z-50"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          <NavItem label="Home" onClick={() => handleScroll("hero")} />
          <NavItem label="Features" onClick={() => handleScroll("features")} />
          <NavItem
            label="Partnership"
            onClick={() => handleScroll("partnership")}
          />

          <div className="ml-4 flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-white hover:text-purple-200 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="relative group px-5 py-2 overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium shadow-md"
            >
              <span className="relative z-10">Sign up</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4 border-t border-white/10">
              <MobileNavItem
                label="Home"
                onClick={() => handleScroll("hero")}
              />
              <MobileNavItem
                label="Features"
                onClick={() => handleScroll("features")}
              />
              <MobileNavItem
                label="Partnership"
                onClick={() => handleScroll("partnership")}
              />

              <div className="pt-4 grid gap-3">
                <Link
                  href="/login"
                  className="block text-center py-3 text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block text-center py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavItem({ label, onClick }) {
  return (
    <button onClick={onClick} className="relative px-4 py-2 text-white group">
      <span>{label}</span>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-purple-400 transition-all group-hover:w-1/2"></span>
    </button>
  );
}

function MobileNavItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left px-2 py-3 text-white border-b border-white/10 hover:text-purple-300 transition-colors"
    >
      {label}
    </button>
  );
}
