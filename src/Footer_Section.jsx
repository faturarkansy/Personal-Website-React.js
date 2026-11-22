import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";

const Footer_Section = ({ isDarkMode = false }) => {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 430;
  const isTabletRange = windowWidth <= 920 && windowWidth > 430;

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setStatusMessage("Please enter your email address.");
      return;
    }
    setStatusMessage("Subscribed! New posts will be sent to your inbox.");
    setEmail("");
  };

  return (
    <footer className="w-full flex transition-colors duration-300 font-sans">
      {/* --- LEFT SIDEBAR (PUTIH SAAT LIGHT MODE, HITAM SAAT DARK MODE) --- */}
      {!isMobile && (
        <div
          className={`border-r border-black flex-shrink-0 transition-all duration-300 ${
            isDarkMode ? "bg-black" : "bg-white"
          } ${isTabletRange ? "w-[60px]" : "w-[90px]"}`}
        />
      )}

      {/* --- FOOTER CONTENT (HITAM SAAT LIGHT MODE, PUTIH SAAT DARK MODE) --- */}
      <div
        className={`flex-1 min-w-0 transition-colors duration-300 ${
          isDarkMode ? "bg-white text-black" : "bg-black text-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-12 pb-8">
          {/* Newsletter / Stay Updated */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-['Poppins']">
              Stay <span className="text-[#4F75B0]">Up</span>dated
            </h3>
            <p
              className={`text-xs sm:text-sm mt-1.5 ${
                isDarkMode ? "text-zinc-600" : "text-zinc-400"
              }`}
            >
              Get new posts delivered to your inbox.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-5 w-full max-w-lg flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (statusMessage) setStatusMessage("");
                }}
                placeholder="your@email.com"
                aria-label="Email address"
                className={`flex-1 h-11 px-4 rounded-lg border text-sm outline-none transition-colors ${
                  isDarkMode
                    ? "bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500"
                    : "bg-zinc-950 border-white/50 text-white placeholder:text-white/50 focus:border-white/50"
                }`}
              />

              <button
                type="submit"
                className={`h-11 px-5 rounded-lg text-sm font-semibold inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer ${
                  isDarkMode
                    ? "bg-[#111111] text-white"
                    : "bg-white text-zinc-950"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </form>

            {statusMessage && (
              <p
                className={`mt-2.5 text-xs ${
                  isDarkMode ? "text-zinc-700" : "text-zinc-300"
                }`}
              >
                {statusMessage}
              </p>
            )}
          </div>

          {/* Divider */}
          <hr
            className={`my-10 border-t ${
              isDarkMode ? "border-gray-500" : "border-white/90"
            }`}
          />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
            {/* Brand Monogram & Name */}
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-md border flex items-center justify-center p-0.5 overflow-hidden select-none ${
                  isDarkMode ? "border-black" : "border-white"
                }`}
              >
                <img
                  src="/logo.svg"
                  alt="Fatur Arkan Syawalva Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold font-['Poppins'] tracking-tight">
                Fatur Arkan Syawalva
              </span>
            </div>

            {/* Copyright at Bottom Right */}
            <p
              className={`text-sm text-center sm:text-right ${
                isDarkMode ? "text-zinc-600" : "text-zinc-400"
              }`}
            >
              © 2026 Fatur Arkan Syawalva. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer_Section;
