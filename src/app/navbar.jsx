"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          MyApp
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`md:flex space-x-6 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <Link href="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-gray-200">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-200">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
