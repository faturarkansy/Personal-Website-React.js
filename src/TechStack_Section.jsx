import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiReact, SiTypescript, SiTailwindcss, SiBootstrap, SiFramer,
    SiExpress, SiPostgresql, SiMysql, SiSqlite, SiLaravel,
    SiFlutter, SiElectron, SiGit, SiGithub, SiFirebase,
    SiFigma, SiPython, SiPostman,
    SiTableau // <-- Import Tableau ditambahkan di sini
} from "react-icons/si";

const TechStack_Section = ({ isDarkMode }) => {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Frontend", "Backend", "UI/UX Design", "Mobile/Desktop", "Data", "Tools"];

    const techStack = [
        // FRONTEND
        { name: "React", category: "Frontend", icon: SiReact, color: "#61DAFB" },
        { name: "TypeScript", category: "Frontend", icon: SiTypescript, color: "#3178C6" },
        { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Bootstrap", category: "Frontend", icon: SiBootstrap, color: "#7952B3" },
        { name: "Framer Motion", category: "Frontend", icon: SiFramer, color: isDarkMode ? "#ffffff" : "#0055FF" },

        // BACKEND
        { name: "Laravel", category: "Backend", icon: SiLaravel, color: "#FF2D20" },
        { name: "Express.js", category: "Backend", icon: SiExpress, color: isDarkMode ? "#ffffff" : "#000000" },
        { name: "PostgreSQL", category: "Backend", icon: SiPostgresql, color: "#336791" },
        { name: "MySQL", category: "Backend", icon: SiMysql, color: "#4479A1" },
        { name: "SQLite", category: "Backend", icon: SiSqlite, color: "#003B57" },

        // UI/UX DESIGN
        { name: "Figma", category: "UI/UX Design", icon: SiFigma, color: "#F24E1E" },

        // MOBILE / DESKTOP
        { name: "Flutter", category: "Mobile/Desktop", icon: SiFlutter, color: "#02569B" },
        { name: "Electron", category: "Mobile/Desktop", icon: SiElectron, color: "#47848F" },

        // DATA
        { name: "Python", category: "Data", icon: SiPython, color: "#3776AB" },
        { name: "Tableau", category: "Data", icon: SiTableau, color: "#E97627" }, // <-- Masuk kategori Data

        // TOOLS
        { name: "Git", category: "Tools", icon: SiGit, color: "#F05032" },
        { name: "GitHub", category: "Tools", icon: SiGithub, color: isDarkMode ? "#ffffff" : "#181717" },
        { name: "Firebase", category: "Tools", icon: SiFirebase, color: "#FFCA28" },
        { name: "Postman", category: "Tools", icon: SiPostman, color: "#FF6C37" },
        { name: "Tableau Tools", category: "Tools", icon: SiTableau, color: "#E97627", displayName: "Tableau" }, // <-- Masuk kategori Tools
    ];

    const filteredTech = activeCategory === "All"
        ? techStack.filter((item, index, self) =>
            // Agar saat "All", Tableau tidak muncul ganda
            index === self.findIndex((t) => (t.displayName || t.name) === (item.displayName || item.name))
        )
        : techStack.filter(item => item.category === activeCategory);

    return (
        <div className={`w-full min-h-screen flex transition-colors duration-300 ease-in-out font-sans ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>

            <div className={`w-[120px] border-r flex-shrink-0 ${isDarkMode ? "border-white" : "border-black"}`}></div>

            <div className="flex-1 flex flex-col items-center px-28 py-32">

                <div className="mb-12 flex flex-col items-center text-center">
                    <h2 className="font-['Poppins'] text-5xl font-bold mb-4">
                        Tech <span className="text-[#4F75B0]">Stack</span>
                    </h2>
                    <p className="text-lg opacity-80 max-w-2xl">
                        The tools and technologies I use to bring products to life. From frontend interfaces to backend logic and mobile applications.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 border
                        ${activeCategory === cat
                                    ? (isDarkMode ? "bg-white text-black border-white" : "bg-black text-white border-black")
                                    : (isDarkMode ? "bg-transparent text-gray-400 border-gray-700 hover:border-white" : "bg-transparent text-gray-500 border-gray-300 hover:border-black")
                                }
                    `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredTech.map((tech) => (
                            <motion.div
                                layout
                                key={`${tech.category}-${tech.name}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className={`flex items-center gap-3 px-6 py-4 rounded-xl border transition-all hover:scale-105 cursor-default
                            ${isDarkMode
                                        ? "bg-[#111] border-gray-800 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                        : "bg-gray-50 border-gray-200 hover:border-black hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                                    }
                        `}
                            >
                                <div className="w-8 h-8 flex items-center justify-center text-2xl">
                                    <tech.icon style={{ color: tech.color }} />
                                </div>
                                <span className="font-['Poppins'] font-semibold text-lg">
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