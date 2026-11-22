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
        <div className="max-w-5xl mx-auto px-5 sm:px-10 py-10 sm:py-12">
          {/* Newsletter / Stay Updated */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight font-['Poppins']">
              Stay <span className="text-[#4F75B0]">Up</span>dated
            </h3>
            <p
              className={`text-xs sm:text-sm mt-1.5 max-w-md leading-relaxed ${
                isDarkMode ? "text-zinc-600" : "text-zinc-400"
              }`}
            >
              Feel free to reach out — I usually get back within 1–2 days
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-5 w-full max-w-[270px] sm:max-w-lg mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
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
                className={`w-full sm:flex-1 h-[44px] min-h-[44px] max-h-[44px] px-3.5 sm:px-4 rounded-xl border box-border text-xs sm:text-sm leading-none outline-none transition-colors ${
                  isDarkMode
                    ? "bg-zinc-50 border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-[#4F75B0]"
                    : "bg-zinc-900/90 border-white/15 text-white placeholder:text-zinc-500 focus:border-[#4F75B0]"
                }`}
              />

              <button
                type="submit"
                className={`w-full sm:w-auto h-[44px] min-h-[44px] max-h-[44px] px-4 sm:px-5 rounded-xl border border-transparent box-border text-xs sm:text-sm leading-none font-semibold inline-flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.99] cursor-pointer ${
                  isDarkMode
                    ? "bg-[#111111] text-white"
                    : "bg-white text-zinc-950"
                }`}
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>Send</span>
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
            className={`my-7 sm:my-9 border-t ${
              isDarkMode ? "border-black/15" : "border-white/15"
            }`}
          />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm">
            {/* Brand Monogram & Name */}
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg border flex items-center justify-center p-1 overflow-hidden select-none flex-shrink-0 ${
                  isDarkMode
                    ? "border-black/20 bg-zinc-100"
                    : "border-white/20 bg-zinc-900"
                }`}
              >
                <img
                  src="/logo.svg"
                  alt="Fatur Arkan Syawalva Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold font-['Poppins'] tracking-tight text-xs sm:text-sm">
                Fatur Arkan Syawalva
              </span>
            </div>

            {/* Copyright */}
            <p
              className={`text-[11px] sm:text-xs text-center sm:text-right leading-relaxed ${
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
