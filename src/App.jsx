import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Welcome_Section from "./Welcome_Section";
import Services_Section from "./Services_Section";
import TechStack_Section from "./TechStack_Section";
import Portfolio_Section from "./Portfolio_Section";
import WorkExperience_Section from "./WorkExperience_Section";

// Custom Hook untuk deteksi arah scroll
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => window.removeEventListener("scroll", updateScrollDirection);
  }, [scrollDirection, lastScrollY]);

  return scrollDirection;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scrollDirection = useScrollDirection();
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Logic: Header muncul saat scroll up atau di posisi paling atas
  useEffect(() => {
    if (window.scrollY < 20) {
      setIsNavVisible(true);
    } else {
      setIsNavVisible(scrollDirection === "up");
    }
  }, [scrollDirection]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // --- ICON COMPONENTS ---
  const IconInstagram = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  );
  const IconGithub = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
  );
  const IconLinkedin = () => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
  );

  // --- HELPER COMPONENT SOCIAL LINK ---
  const SocialLink = ({ href, Icon, label }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        // Hapus class warna statis jika ada, biarkan dia inherit dari parent (container)
        className="relative flex items-center justify-center hover:text-gray-500 transition-colors duration-300 hover:scale-110 pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute left-full ml-4 px-3 py-1 rounded text-sm font-bold whitespace-nowrap shadow-lg
                ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}
              `}
            >
              <div className={`absolute top-1/2 -left-1 -mt-1 border-4 border-transparent 
                ${isDarkMode ? "border-r-white" : "border-r-black"}
              `}></div>
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </a>
    );
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? "bg-black" : "bg-white"}`}>

      {/* Style Global */}
      <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;500;700&display=swap');
            body { 
                cursor: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 5V19M12 19L5 12M12 19L19 12' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") 16 16, auto;
            }
            a, button { cursor: pointer; }
          `}
      </style>

      {/* --- GLOBAL STICKY LOGO "F" --- */}
      <div className="fixed top-0 left-0 w-[120px] h-screen z-50 pointer-events-none">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`absolute top-0 w-full flex justify-center pt-8 h-[120px] pointer-events-auto
                            backdrop-blur-md transition-colors duration-300
                            ${isDarkMode ? "bg-black/70 border-white border-r" : "bg-white/70 border-black border-r"}
                        `}
            >
              <span className={`font-['Playfair_Display'] text-5xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                F
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- GLOBAL STICKY SOCIAL ICONS (FIXED COLOR) --- */}
      {/* PERBAIKAN DI SINI:
          Menambahkan logic class: ${isDarkMode ? "text-white" : "text-black"}
          agar icon SVG (currentColor) mengikuti warna teks container.
      */}
      <div className={`fixed bottom-0 left-0 w-[120px] pb-16 z-50 flex flex-col items-center gap-8 pointer-events-none transition-colors duration-300
            ${isDarkMode ? "text-white" : "text-black"}
      `}>
        <SocialLink href="https://www.instagram.com/faturarkansyy?igsh=MTk3bXRvdTQ4a3h5MQ==" Icon={IconInstagram} label="Instagram" />
        <SocialLink href="https://github.com/faturarkansy" Icon={IconGithub} label="Github" />
        <SocialLink href="https://www.linkedin.com/in/fatur-arkan-syawalva-339253255/" Icon={IconLinkedin} label="LinkedIn" />
      </div>


      {/* --- GLOBAL STICKY HEADER --- */}
      <div className="fixed top-0 left-[120px] right-0 z-50 pointer-events-none">
        <AnimatePresence>
          {isNavVisible && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`h-[120px] flex items-center pr-8 pointer-events-auto transition-all duration-300
                            backdrop-blur-md
                            ${isDarkMode ? "bg-black/70" : "bg-white/70"}
                        `}
            >
              {/* Navigation Menu */}
              <div className={`flex-4 flex pl-16 items-center gap-10 text-xl font-medium font-['Poppins'] ${isDarkMode ? "text-white" : "text-black"}`}>
                <a href="#" className="hover:text-blue-600 transition-colors">Welcome</a>
                <a href="#" className="hover:text-blue-600 transition-colors">About</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Portfolio</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Experience</a>
              </div>

              {/* Toggle Button */}
              <div className="flex-1 flex items-center justify-center p-2">
                <button onClick={toggleTheme} className={`relative w-[140px] h-[50px] rounded-full border-2 flex items-center px-1 cursor-pointer transition-colors ${isDarkMode ? "border-white" : "border-black"}`}>
                  <span className={`absolute w-full text-center font-bold text-lg pointer-events-none transition-all duration-300 ${isDarkMode ? "pl-8 opacity-100 text-white" : "opacity-0"}`}>Dark</span>
                  <span className={`absolute w-full text-center font-bold text-lg pointer-events-none transition-all duration-300 ${!isDarkMode ? "pr-8 opacity-100 text-black" : "opacity-0"}`}>Light</span>
                  <div className={`w-[40px] h-[40px] rounded-full border border-black bg-white shadow-md transform transition-transform duration-300 ease-in-out ${isDarkMode ? "translate-x-0" : "translate-x-[88px]"}`}></div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div className="w-full">
        <Welcome_Section isDarkMode={isDarkMode} />
        <Services_Section isDarkMode={isDarkMode} />
        <TechStack_Section isDarkMode={isDarkMode} />
        <Portfolio_Section isDarkMode={isDarkMode} />
        <WorkExperience_Section isDarkMode={isDarkMode} />
      </div>

    </div>
  );
}

export default App;