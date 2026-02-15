import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Welcome_Section from "./Welcome_Section";
import Services_Section from "./Services_Section";
import TechStack_Section from "./TechStack_Section";
import Portfolio_Section from "./Portfolio_Section";
import WorkExperience_Section from "./WorkExperience_Section";

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
  const [activeSection, setActiveSection] = useState("welcome");

  // State Baru untuk Responsivitas
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: "welcome", label: "Welcome" },
    { id: "services", label: "Services" },
    { id: "techstack", label: "Tech Stack" },
    { id: "portfolio", label: "Portfolio" },
    { id: "experience", label: "Work & Experience" },
  ];

  // Pantau Ukuran Layar
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setIsSidebarOpen(false); // Tutup sidebar jika diklik pada mobile
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (window.scrollY < 20) setIsNavVisible(true);
    else setIsNavVisible(scrollDirection === "up");
  }, [scrollDirection]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Icons
  const IconInstagram = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
  const IconGithub = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>);
  const IconLinkedin = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);

  const SocialLink = ({ href, Icon, label }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="relative flex items-center justify-center hover:text-blue-500 transition-all duration-300 hover:scale-110 pointer-events-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Icon />
        <AnimatePresence>
          {isHovered && (<motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className={`absolute left-full ml-4 px-2 py-1 rounded text-xs font-bold whitespace-nowrap shadow-lg ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}>{label}</motion.div>)}
        </AnimatePresence>
      </a>
    );
  };

  const isTablet = windowWidth < 920;
  const isMobile = windowWidth < 430;

  return (
    <div className={`relative min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;700&display=swap');
        
        /* Kursor Default: Isi Putih, Border Hitam */
        body { 
            cursor: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 3V19L8.5 15L11.5 21L14.5 19.5L11.5 13.5L17 13.5L4.5 3Z' stroke='black' stroke-width='1.8' stroke-linejoin='round'/%3E%3C/svg%3E") 4 3, auto;
        }
        
        /* Kursor Hover: Isi Abu-abu (%23888888), Border Tetap Hitam (black) */
        a, button { 
            cursor: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 24 24' fill='%23888888' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 3V19L8.5 15L11.5 21L14.5 19.5L11.5 13.5L17 13.5L4.5 3Z' stroke='black' stroke-width='1.8' stroke-linejoin='round'/%3E%3C/svg%3E") 4 3, pointer; 
        }
      `}
      </style>

      {/* --- MOBILE HEADER (< 920px) --- */}
      <AnimatePresence>
        {isTablet && isNavVisible && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className={`fixed top-0 left-0 right-0 z-[60] px-6 flex items-center justify-between backdrop-blur-md border-b transition-all duration-300
        ${windowWidth > 430 ? "h-[80px]" : "h-[70px]"} 
        ${isDarkMode ? "bg-black/90 border-white/10" : "bg-white border-black"}`}
          >
            <span className={`font-['Playfair_Display'] font-bold transition-all ${windowWidth > 430 ? "text-4xl" : "text-3xl"} ${isDarkMode ? "text-white" : "text-black"}`}>
              F
            </span>

            <button onClick={() => setIsSidebarOpen(true)} className={`p-2 ${isDarkMode ? "text-white" : "text-black"}`}>
              <svg
                width={windowWidth > 430 ? "34" : "30"}
                height={windowWidth > 430 ? "34" : "30"}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DESKTOP SIDEBAR LOGO (> 920px) --- */}
      {!isTablet && (
        <div className="fixed top-0 left-0 w-[90px] h-screen z-50 pointer-events-none">
          <AnimatePresence>
            {isNavVisible && (
              <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className={`absolute top-0 w-full flex justify-center pt-6 h-[90px] pointer-events-auto backdrop-blur-md border-r transition-colors duration-300 ${isDarkMode ? "bg-black border-white" : "bg-white border-black"}`}>
                <span className={`font-['Playfair_Display'] text-4xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>F</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* --- MOBILE SIDEBAR MENU --- */}
      <AnimatePresence>
        {isTablet && isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 w-[280px] z-[80] p-8 shadow-2xl flex flex-col ${isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsSidebarOpen(false)} className="p-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <nav className="flex flex-col gap-6 mb-12">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`text-xl transition-all duration-300 hover:text-gray-400 ${activeSection === item.id ? "font-bold text-[#4F75B0]" : "font-medium opacity-70"}`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-black/10 dark:border-white/10">
                <p className="text-xs font-bold opacity-50 mb-4 uppercase tracking-widest">Switch Theme</p>
                <button onClick={toggleTheme} className={`relative w-full h-[50px] rounded-xl border-2 flex p-1 items-center cursor-pointer transition-colors ${isDarkMode ? "border-white" : "border-black"}`}>
                  <span className={`absolute w-full text-center font-bold text-xs transition-all duration-300 ${isDarkMode ? "pl-8 opacity-100" : "opacity-0"}`}>DARK MODE</span>
                  <span className={`absolute w-full text-center font-bold text-xs transition-all duration-300 ${!isDarkMode ? "pr-8 opacity-100" : "opacity-0"}`}>LIGHT MODE</span>
                  <div className={`w-[38px] h-[38px] rounded-lg shadow-md transform transition-transform duration-300 ${isDarkMode ? "translate-x-0 bg-white" : "translate-x-[212px] bg-black"}`}></div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- SOCIAL ICONS (Hidden on Mobile if preferred, or kept) --- */}
      {!isTablet && (
        <div className={`fixed bottom-0 left-0 w-[90px] pb-10 z-50 flex flex-col items-center gap-7 pointer-events-none transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>
          <SocialLink href="#" Icon={IconInstagram} label="Instagram" />
          <SocialLink href="#" Icon={IconGithub} label="Github" />
          <SocialLink href="#" Icon={IconLinkedin} label="LinkedIn" />
        </div>
      )}

      {/* --- DESKTOP HEADER (> 920px) --- */}
      {!isTablet && (
        <div className="fixed top-0 left-[90px] right-0 z-50 pointer-events-none">
          <AnimatePresence>
            {isNavVisible && (
              <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className={`h-[90px] flex items-center px-6 pointer-events-auto backdrop-blur-md transition-all duration-300 ${isDarkMode ? "bg-black/70" : "bg-white/70"}`}>
                <div className={`flex-[4] flex pl-8 items-center gap-8 font-['Poppins'] ${isDarkMode ? "text-white" : "text-black"}`}>
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`transition-all duration-300 text-sm md:text-base
                        ${activeSection === item.id ? "scale-110 font-semibold text-[#4F75B0]" : "font-normal  text-gray-600 hover:text-gray-200"}`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <button onClick={toggleTheme} className={`relative w-[113px] h-[40px] rounded-full border-2 flex p-1 items-center cursor-pointer transition-colors ${isDarkMode ? "border-white text-white" : "border-black text-black"}`}>
                    <span className={`absolute w-full text-center pb-0.5 font-bold text-sm transition-all duration-300 ${isDarkMode ? "pl-8 opacity-100" : "opacity-0"}`}>Dark</span>
                    <span className={`absolute w-full text-center pb-0.5 font-bold text-sm transition-all duration-300 ${!isDarkMode ? "pr-8 opacity-100" : "opacity-0"}`}>Light</span>
                    <div className={`w-[32px] h-[32px] rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? "translate-x-0 bg-white" : "translate-x-[70px] bg-black"}`}></div>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* --- CONTENT --- */}
      <div className={`w-full ${windowWidth >= 700 && windowWidth < 920 ? "pt-[50px]" : isMobile ? "pt-[70px]" : "pt-[0px]"}`}>
        <section id="welcome"><Welcome_Section isDarkMode={isDarkMode} /></section>
        <section id="services"><Services_Section isDarkMode={isDarkMode} /></section>
        <section id="techstack"><TechStack_Section isDarkMode={isDarkMode} /></section>
        <section id="portfolio"><Portfolio_Section isDarkMode={isDarkMode} /></section>
        <section id="experience"><WorkExperience_Section isDarkMode={isDarkMode} /></section>
      </div>
    </div>
  );
}

export default App;