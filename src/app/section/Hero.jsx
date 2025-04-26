"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 py-20 px-4"
    >
      {/* Animated background elements */}

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 pt-16">
        <motion.div
          className="lg:w-1/2 space-y-8 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-purple-100 mb-4">
            <Sparkles size={16} className="text-purple-200" />
            <span className="text-sm font-medium">
              Revolutionizing Capstone Management
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            <span className="block">Elevate Your</span>
            <span className="bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Capstone Journey
            </span>
          </h1>

          <p className="text-lg text-purple-100 max-w-xl mx-auto lg:mx-0">
            Transform how you manage academic milestones. Our intelligent
            platform streamlines submissions, provides real-time feedback, and
            ensures you never miss a deadline.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/signup"
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-purple-500/25"
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <ArrowRight
                className="inline-block ml-2 relative z-10"
                size={18}
              />
            </Link>

            <Link
              href="#features"
              className="rounded-lg border-2 border-purple-300/30 bg-white/5 backdrop-blur-sm px-8 py-4 font-semibold text-purple-100 transition-all hover:bg-white/10"
            >
              Explore Features
            </Link>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-purple-200 pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span>Real-time Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} />
              <span>Mentor Access</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            transform: `translateY(${scrollY * 0.05}px) rotate(${
              scrollY * 0.02
            }deg)`,
          }}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-75 blur"></div>
            <div className="relative overflow-hidden rounded-2xl border border-purple-300/20 bg-black/80 shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                width={800}
                height={600}
                alt="Capstone Tracker Dashboard"
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <span className="text-sm font-medium">
                    Live Progress Tracking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
