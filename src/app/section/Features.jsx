import React from "react";
import { CheckCircle, Upload, Bell, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
    title: "Track Your Progress",
    description:
      "Monitor your capstone milestones with a clear progress bar. Know what’s done and what’s next.",
  },
  {
    icon: <Upload className="w-8 h-8 text-purple-600" />,
    title: "Send Files to Your Professor",
    description:
      "Easily upload and submit your capstone documents directly through the platform.",
  },
  {
    icon: <Bell className="w-8 h-8 text-yellow-500" />,
    title: "Receive Notifications",
    description:
      "Stay updated with real-time feedback, approvals, and alerts from your professor.",
  },
];

const FeaturesPage = () => {
  return (
    <main className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Features</h2>
        <p className="text-gray-600 mb-12">
          Everything you need to stay organized and connected throughout your
          capstone journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FeaturesPage;
