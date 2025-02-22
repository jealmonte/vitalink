import React from "react";
import "../globals.css";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-background text-foreground">
        {/* Top Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/VITALINK-M362MO4bhUbjzCOWAfCoe6UkfJzDvG.png"
                    alt="Vitalink Logo"
                    width={120}
                    height={32}
                    className="animate-fade-in"
                  />
                </a>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-4">
                <a href="/about" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </a>
                <a href="/contact" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </a>
                <a
                  href="/login"
                  className="text-gray-300 hover:text-white border border-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-purple-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-[4rem]">{children}</main> {/* Adjust padding to avoid overlap with the navbar */}
      </body>
    </html>
  );
}
