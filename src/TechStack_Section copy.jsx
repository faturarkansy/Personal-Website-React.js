import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiReact, SiTypescript, SiTailwindcss, SiBootstrap, SiFramer,
    SiExpress, SiPostgresql, SiMysql, SiSqlite, SiLaravel,
    SiFlutter, SiElectron, SiGit, SiGithub, SiFirebase,
    SiFigma, SiPython, SiPostman, SiTableau
} from "react-icons/si";

// --- KOMPONEN BARU: INDIKATOR KEMAHIRAN ---
const SkillLevel = ({ level, isDarkMode }) => {
    // 1 = Beginner, 2 = Intermediate, 3 = Expert
    const levels = { beginner: 1, intermediate: 2, expert: 3 };
    const activeDots = levels[level] || 1;

    return (
        <div className="flex gap-1 mt-1">
            {[1, 2, 3].map((dot) => (
                <div
                    key={dot}
                    className={`h-1 w-5 rounded-full transition-colors duration-500 ${dot <= activeDots
                        ? "bg-[#4F75B0]" // Biru untuk yang aktif
                        : (isDarkMode ? "bg-zinc-800" : "bg-gray-300") // Abu-abu untuk yang tidak aktif
                        }`}
                />
            ))}
        </div>
    );
};

const TechStack_Section = ({ isDarkMode }) => {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Frontend", "Backend", "UI/UX Design", "Mobile/Desktop", "Data", "Tools"];

    // TAMBAHKAN PROPERTI 'level' PADA SETIAP ITEM
    const techStack = [
        { name: "React", category: "Frontend", icon: SiReact, color: "#61DAFB", level: "intermediate" },
        { name: "TypeScript", category: "Frontend", icon: SiTypescript, color: "#3178C6", level: "intermediate" },
        { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#06B6D4", level: "intermediate" },
        { name: "Bootstrap", category: "Frontend", icon: SiBootstrap, color: "#7952B3", level: "intermediate" },
        { name: "Framer Motion", category: "Frontend", icon: SiFramer, color: isDarkMode ? "#ffffff" : "#0055FF", level: "beginner" },
        { name: "Laravel", category: "Backend", icon: SiLaravel, color: "#FF2D20", level: "beginner" },
        { name: "Express.js", category: "Backend", icon: SiExpress, color: isDarkMode ? "#ffffff" : "#000000", level: "beginner" },
        { name: "PostgreSQL", category: "Backend", icon: SiPostgresql, color: "#336791", level: "beginner" },
        { name: "MySQL", category: "Backend", icon: SiMysql, color: "#4479A1", level: "intermediate" },
        { name: "SQLite", category: "Backend", icon: SiSqlite, color: "#003B57", level: "beginner" },
        { name: "Figma", category: "UI/UX Design", icon: SiFigma, color: "#F24E1E", level: "intermediate" },
        { name: "Flutter", category: "Mobile/Desktop", icon: SiFlutter, color: "#02569B", level: "intermediate" },
        { name: "Electron", category: "Mobile/Desktop", icon: SiElectron, color: "#47848F", level: "beginner" },
        { name: "Python", category: "Data", icon: SiPython, color: "#3776AB", level: "beginner" },
        { name: "Tableau", category: "Data", icon: SiTableau, color: "#E97627", level: "intermediate" },
        { name: "Git", category: "Tools", icon: SiGit, color: "#F05032", level: "expert" },
        { name: "GitHub", category: "Tools", icon: SiGithub, color: isDarkMode ? "#ffffff" : "#181717", level: "expert" },
        { name: "Firebase", category: "Tools", icon: SiFirebase, color: "#FFCA28", level: "beginner" },
        { name: "Postman", category: "Tools", icon: SiPostman, color: "#FF6C37", level: "intermediate" },
    ];

    const filteredTech = activeCategory === "All"
        ? techStack.filter((item, index, self) =>
            index === self.findIndex((t) => (t.displayName || t.name) === (item.displayName || item.name))
        )
        : techStack.filter(item => item.category === activeCategory);

    return (
        <div className={`w-full min-h-screen flex transition-colors duration-300 ease-in-out font-sans ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>

            <div className={`w-[90px] border-r flex-shrink-0 ${isDarkMode ? "border-white/20" : "border-black/10"}`}></div>

            <div className="flex-1 flex flex-col items-center px-12 lg:px-20 py-24">
                <div className="mb-10 flex flex-col items-center text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl lg:text-4xl font-bold mb-3 font-['Poppins']"
                    >
                        Tech <span className="text-[#4F75B0]">Stack</span>
                    </motion.h2>
                    <p className="text-base lg:text-lg opacity-75 max-w-2xl leading-relaxed">
                        The tools and technologies I use to bring products to life.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border
                                ${activeCategory === cat
                                    ? (isDarkMode ? "bg-white text-black border-white" : "bg-black text-white border-black")
                                    : (isDarkMode ? "bg-transparent text-gray-500 border-gray-800 hover:border-white" : "bg-transparent text-gray-400 border-gray-200 hover:border-black")
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-6xl"
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
                                className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all hover:scale-[1.03] cursor-default
                                    ${isDarkMode
                                        ? "bg-[#0A0A0A] border-white/10 hover:border-white/40 shadow-xl"
                                        : "bg-white border-black/5 shadow-md hover:border-black/20"
                                    }
                                `}
                            >
                                <div className="text-3xl flex-shrink-0">
                                    <tech.icon style={{ color: tech.color }} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-['Poppins'] font-bold text-sm lg:text-base truncate leading-none">
                                        {tech.displayName || tech.name}
                                    </span>
                                    {/* MASUKKAN KOMPONEN SKILL LEVEL DISINI */}
                                    <SkillLevel level={tech.level} isDarkMode={isDarkMode} />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default TechStack_Section;