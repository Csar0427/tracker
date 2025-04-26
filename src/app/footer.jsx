import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-to-r from-purple-800 to-indigo-600 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">CapstoneTracker</h2>
          <p className="text-sm mt-1">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>

      {/* Optional spinning background effect */}
      <div className="absolute inset-0 rounded-none bg-gradient-to-r from-purple-300 to-indigo-600 opacity-10 group-hover:animate-spin-slow pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
