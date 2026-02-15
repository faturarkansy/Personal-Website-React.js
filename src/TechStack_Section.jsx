import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiReact, SiTypescript, SiTailwindcss, SiBootstrap, SiFramer,
    SiExpress, SiPostgresql, SiMysql, SiSqlite, SiLaravel,
    SiFlutter, SiElectron, SiGit, SiGithub, SiFirebase,
    SiFigma, SiPython, SiPostman, SiTableau
} from "react-icons/si";

const TechStack_Section = ({ isDarkMode }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // --- RESPONSIVE CONSTANTS ---
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth <= 430;
    const isMidRange = windowWidth <= 1030 && windowWidth > 430;
    const isTabletRange = windowWidth <= 920 && windowWidth > 430;
    const isBelow920 = windowWidth < 920;

    const categories = ["All", "Frontend", "Backend", "UI/UX Design", "Mobile/Desktop", "Data", "Tools"];
    const customBlackCursor = `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 24 24' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 3V19L8.5 15L11.5 21L14.5 19.5L11.5 13.5L17 13.5L4.5 3Z' stroke='black' stroke-width='1.8' stroke-linejoin='round'/%3E%3C/svg%3E") 4 3, pointer`;

    const techStack = [
        { name: "React", category: "Frontend", icon: SiReact, color: "#61DAFB" },
        { name: "TypeScript", category: "Frontend", icon: SiTypescript, color: "#3178C6" },
        { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Bootstrap", category: "Frontend", icon: SiBootstrap, color: "#7952B3" },
        { name: "Framer Motion", category: "Frontend", icon: SiFramer, color: "#0055FF" },
        { name: "Laravel", category: "Backend", icon: SiLaravel, color: "#FF2D20" },
        { name: "Express.js", category: "Backend", icon: SiExpress, color: isDarkMode ? "#ffffff" : "#000000" },
        { name: "PostgreSQL", category: "Backend", icon: SiPostgresql, color: "#336791" },
        { name: "MySQL", category: "Backend", icon: SiMysql, color: "#4479A1" },
        { name: "SQLite", category: "Backend", icon: SiSqlite, color: "#003B57" },
        { name: "Figma", category: "UI/UX Design", icon: SiFigma, color: "#F24E1E" },
        { name: "Flutter", category: "Mobile/Desktop", icon: SiFlutter, color: "#02569B" },
        { name: "Electron", category: "Mobile/Desktop", icon: SiElectron, color: "#47848F" },
        { name: "Python", category: "Data", icon: SiPython, color: "#3776AB" },
        { name: "Tableau", category: "Data", icon: SiTableau, color: "#E97627" },
        { name: "Git", category: "Tools", icon: SiGit, color: "#F05032" },
        { name: "GitHub", category: "Tools", icon: SiGithub, color: isDarkMode ? "#ffffff" : "#181717" },
        { name: "Firebase", category: "Tools", icon: SiFirebase, color: "#FFCA28" },
        { name: "Postman", category: "Tools", icon: SiPostman, color: "#FF6C37" },
        { name: "Tableau Tools", category: "Tools", icon: SiTableau, color: "#E97627", displayName: "Tableau" },
    ];

    const filteredTech = activeCategory === "All"
        ? techStack.filter((item, index, self) =>
            index === self.findIndex((t) => (t.displayName || t.name) === (item.displayName || item.name))
        )
        : techStack.filter(item => item.category === activeCategory);

    return (
        <div className={`w-full flex transition-colors duration-300 ease-in-out font-sans ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} ${isBelow920 ? "h-auto" : "min-h-screen"}`}>

            {/* --- LEFT SIDEBAR: Mengikuti logic Welcome_Section --- */}
            {!isMobile && (
                <div
                    className={`flex flex-col items-center border-r flex-shrink-0 transition-all duration-300 ${isDarkMode ? "border-white" : "border-black"
                        } ${isTabletRange ? "w-[60px]" : "w-[90px]"}`}
                >
                </div>
            )}

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col items-center min-w-0 px-12 lg:px-20 py-24 ${windowWidth > 920
                ? "pt-[90px]"
                : (windowWidth <= 920 && windowWidth > 430)
                    ? "pt-[30px]"
                    : "pt-[10px]"
                } pb-24`}>

                <div className={`mb-6 flex flex-col items-center text-center ${isBelow920 ? "pt-10" : ""}`}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`font-bold mb-3 font-['Poppins'] ${isMidRange || isMobile ? "text-3xl" : "text-4xl"}`}
                    >
                        Tech <span className="text-[#4F75B0]">Stack</span>
                    </motion.h2>
                    <p className={`opacity-75 max-w-2xl leading-relaxed ${isMobile ? "text-sm" : "text-base lg:text-lg"}`}>
                        The tools and technologies I use to bring products to life.
                    </p>
                </div>

                {/* Categories: Button dibuat lebih adaptif */}
                <div className={`flex flex-wrap justify-center gap-2 mb-5`}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full font-medium transition-all duration-300 border ${isMobile ? "text-xs" : "text-sm"
                                } ${activeCategory === cat
                                    ? (isDarkMode ? "bg-white text-black border-white" : "bg-black text-white border-black")
                                    : (isDarkMode ? "bg-transparent text-gray-500 border-gray-800 hover:border-white" : "bg-transparent text-gray-400 border-gray-200 hover:border-black")
                                }
                    `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid: Penyesuaian kolom berdasarkan layar */}
                <motion.div
                    layout
                    className={`grid gap-3 w-full max-w-6xl ${isMobile
                        ? "grid-cols-2"
                        : isTabletRange
                            ? "grid-cols-3"
                            : "grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
                        }`}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredTech.map((tech) => (
                            <motion.div
                                layout
                                key={`${tech.category}-${tech.name}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                style={{ cursor: customBlackCursor }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all hover:scale-[1.03] ${isDarkMode
                                    ? "bg-[#0A0A0A] border-white/10 hover:border-white/40 hover:bg-[#111]"
                                    : "bg-gray-50 border-black/5 hover:border-black/20 hover:bg-white"
                                    }`}
                            >
                                <div className={`${isMobile ? "text-lg" : "text-xl"} flex-shrink-0`}>
                                    <tech.icon style={{ color: tech.color }} />
                                </div>
                                <span className={`font-['Poppins'] font-medium truncate ${isMobile ? "text-xs" : "text-sm lg:text-base"}`}>
                                    {tech.displayName || tech.name}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </div>
    );
};

export default TechStack_Section;