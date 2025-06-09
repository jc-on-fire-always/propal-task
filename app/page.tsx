"use client";

import Link from "next/link";
import { useTheme } from "./contexts/ThemeContext";
import { Moon, Sun, Mic, Users, Zap } from "lucide-react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "sonner";

function LandingPageContent() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mic className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            proPAL AI
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          <Link
            href="/login"
            className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Voice AI for
            <span className="text-blue-600 dark:text-blue-400">
              {" "}
              Indian Businesses
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Revolutionize customer interactions with multilingual voice agents
            that speak naturally in Indian languages and dialects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/signup"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-semibold rounded-xl transition-colors">
              Learn More
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Mic className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Multilingual Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Natural conversations in Hindi, English, and regional Indian
                languages
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Users className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                SMB Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built specifically for small and medium businesses in India
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Scale Automation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Automate calls, support, and outreach at scale
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LandingPage() {
  return (
    <ThemeProvider>
      <LandingPageContent />
      <Toaster />
    </ThemeProvider>
  );
}
