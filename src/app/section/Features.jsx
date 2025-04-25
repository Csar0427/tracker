"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  BarChart3,
  Upload,
  Bell,
  ArrowRight,
  CheckCircle,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    color: "from-violet-500 to-indigo-600",
    title: "Intelligent Progress Tracking",
    description:
      "Our AI-powered system automatically tracks your milestones and visualizes your journey with interactive charts and timelines.",
    highlight: "Real-time updates",
  },
  {
    icon: Upload,
    color: "from-fuchsia-500 to-purple-600",
    title: "Seamless Document Submission",
    description:
      "Drag-and-drop your files directly to professors with version control and smart organization of all your submissions.",
    highlight: "Cloud storage included",
  },
  {
    icon: Bell,
    color: "from-amber-400 to-orange-500",
    title: "Smart Notification System",
    description:
      "Receive personalized alerts about deadlines, feedback, and approvals through multiple channels including email and mobile.",
    highlight: "Priority messaging",
  },
  {
    icon: Zap,
    color: "from-emerald-400 to-teal-500",
    title: "AI-Powered Insights",
    description:
      "Get intelligent suggestions and feedback on your work based on analysis of successful past projects and professor preferences.",
    highlight: "Continuous improvement",
  },
];

export default function Features() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section
      id="features"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-black to-purple-950 py-24 px-6"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-500/20 to-transparent"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-purple-200 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            <span className="text-sm font-medium">Powerful Capabilities</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Supercharge
            </span>{" "}
            Your Capstone Experience
          </h2>

          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with intuitive design
            to transform how you manage your academic projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 },
                },
              }}
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-500/50 to-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
              <div className="relative h-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-8 transition-all group-hover:translate-y-[-4px]">
                <div className="flex items-start gap-6">
                  <div
                    className={`flex-shrink-0 rounded-xl bg-gradient-to-br ${feature.color} p-3`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-purple-100/80">{feature.description}</p>

                    <div className="pt-2 flex items-center gap-2 text-sm text-purple-300">
                      <CheckCircle size={14} className="text-purple-400" />
                      <span>{feature.highlight}</span>
                    </div>

                    <div className="pt-3">
                      <button className="group/btn inline-flex items-center text-sm font-medium text-purple-300 hover:text-white transition-colors">
                        Learn more
                        <ArrowRight
                          size={14}
                          className="ml-1 transition-transform group-hover/btn:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.6, duration: 0.5 } },
          }}
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 opacity-70 blur-sm"></div>
            <button className="relative rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-4 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              Explore All Features
            </button>
          </div>
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <StatItem number="98%" label="Completion Rate" />
          <StatItem number="24/7" label="Support Access" />
          <StatItem number="500+" label="Universities" />
          <StatItem number="10k+" label="Active Users" />
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full text-purple-950"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,202.7C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

function StatItem({ number, label }) {
  return (
    <motion.div
      className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-sm text-purple-200 mt-1">{label}</div>
    </motion.div>
  );
}
