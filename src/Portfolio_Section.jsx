import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiReact, SiTypescript, SiTailwindcss, SiBootstrap, SiFramer,
    SiExpress, SiPostgresql, SiMysql, SiSqlite, SiLaravel,
    SiFlutter, SiElectron, SiGit, SiGithub, SiFirebase,
    SiFigma, SiPython, SiPostman, SiNextdotjs, SiRedux
} from "react-icons/si";
import { HiOutlineExternalLink } from "react-icons/hi";

const Portfolio_Section = ({ isDarkMode }) => {
    const allProjects = [
        {
            id: 0,
            title: "Ariftama Tekindo E-Commerce Mobile App",
            description: "Building a digital platform that supports the sale of Ariftama Tekindo company products by implementing the payment gateway from Midtrans along with the provision of monitored and documented services.",
            focus: ["Product", "Services", "Payment Gateway"],
            image: "/images/ariftama_tekindo_preview.png",
            tags: [
                { name: "Flutter", icon: SiFlutter, color: "#3178C6" },
                { name: "MySQL", icon: SiMysql, color: "#06B6D4" },
                { name: "Postman", icon: SiPostman, color: "#EF5B25" },
                { name: "Express", icon: SiExpress, color: isDarkMode ? "#fff" : "#000" }
            ],
            link: "https://drive.google.com/file/d/1sh7ANxcZRq7j4nWb85Ke2u2LPSkLE7rf/view?usp=sharing",
            github: "https://github.com/faturarkansy/Ariftama-Tekindo"
        },
        {
            id: 1,
            title: "Dikedo",
            description: "Develop a website-based application that is integrated with a GPS device to track vehicle positions based on maps using Google Maps.",
            focus: ["Google Map", "Tracking", "Subscription"],
            image: "/images/dikedo_preview.png",
            tags: [
                { name: "React.js", icon: SiReact, color: "#3178C6" },
                { name: "Express.js", icon: SiExpress, color: isDarkMode ? "#fff" : "#000" }
            ],
            link: "#",
            github: "#"
        },
        {
            id: 2,
            title: "Freshmart Store",
            description: "Modern grocery store web application with a clean and responsive UI. Built with efficient state management using Redux Toolkit for seamless shopping.",
            focus: ["E-commerce", "State Management", "UI UX"],
            image: "/images/freshmart.jpg",
            tags: [
                { name: "React", icon: SiReact, color: "#61DAFB" },
                { name: "Redux", icon: SiRedux, color: "#764ABC" }
            ],
            link: "#",
            github: "#"
        },
        {
            id: 3,
            title: "Nike Reimagined",
            description: "A sleek and modern Nike website redesign showcasing fully responsive design with smooth animations and high-performance image rendering.",
            focus: ["UI UX Design", "High-Fidelity Animation"],
            image: "/images/nike.jpg",
            tags: [
                { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
                { name: "React", icon: SiReact, color: "#61DAFB" }
            ],
            link: "#",
            github: "#"
        },
        {
            id: 4,
            title: "News Hub",
            description: "Real-time news application integrating News API to deliver headlines across various categories with a focus on clean typography and readability.",
            focus: ["Real-time API", "Integration", "News Feed"],
            image: "/images/newshub.jpg",
            tags: [
                { name: "TS", icon: SiTypescript, color: "#3178C6" },
                { name: "React", icon: SiReact, color: "#61DAFB" }
            ],
            link: "#",
            github: "#"
        }
    ];

    const [selectedId, setSelectedId] = useState(0);

    // Perbaikan: Gunakan fallback array kosong [] jika activeProject tidak ditemukan
    const activeProject = allProjects.find(p => p.id === selectedId) || allProjects[0];

    // Jika data masih belum siap, tampilkan loading sederhana (mencegah layar putih)
    if (!activeProject) return <div className="h-screen bg-black" />;

    return (
        <div className={`w-full min-h-screen flex transition-colors duration-300 ease-in-out font-sans ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>

            <div className={`w-[120px] border-r flex-shrink-0 min-h-screen ${isDarkMode ? "border-white" : "border-black"}`} />

            <div className="flex-1 flex flex-col px-12 md:px-20 py-24 overflow-hidden max-w-[calc(100vw-120px)]">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-12 font-['Poppins']"
                >
                    My <span className="text-[#4F75B0]">Portfolio</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start min-h-[450px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`img-${activeProject.id}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                            className="relative rounded-[2.5rem] overflow-hidden border border-gray-800/30 shadow-2xl bg-zinc-900"
                        >
                            <img src={activeProject.image} alt={activeProject.title} className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105" />
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`text-${activeProject.id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="flex flex-wrap justify-between items-start gap-4">
                                <h3 className="text-4xl font-bold font-['Poppins'] leading-tight flex-1">{activeProject.title}</h3>
                                <div className="flex gap-2">
                                    {/* Pengamanan: Gunakan optional chaining ?. */}
                                    {activeProject.tags?.map((tag, idx) => (
                                        <div key={idx} className={`p-2 rounded-xl border ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-100 border-gray-200"}`}>
                                            {tag.icon && <tag.icon style={{ color: tag.color }} size={20} />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-lg opacity-70 leading-relaxed max-w-xl">{activeProject.description}</p>

                            {/* RENDER FOCUS POINTS */}
                            <div className="flex flex-wrap gap-3">
                                {activeProject.focus?.map((item, index) => (
                                    <span
                                        key={index}
                                        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 border text-sm
                                            ${isDarkMode
                                                ? "bg-white text-black border-white"
                                                : "bg-black text-white border-black"}`}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-6 mt-2">
                                <a href={activeProject.link} className="flex items-center gap-2 text-xl font-bold hover:text-[#4F75B0] transition-all group">
                                    <HiOutlineExternalLink className="group-hover:scale-110 transition-transform" /> Visit
                                </a>
                                <a href={activeProject.github} className="flex items-center gap-2 text-xl font-bold hover:text-[#4F75B0] transition-all group">
                                    <SiGithub className="group-hover:scale-110 transition-transform" /> Source
                                </a>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="w-full">
                    <h3 className="text-2xl font-bold font-['Poppins'] opacity-80">Looking for the next project</h3>
                    <div className="flex gap-6 pt-6 overflow-x-auto pb-10 custom-scrollbar scroll-smooth">
                        {allProjects
                            .filter(project => project.id !== selectedId)
                            .map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedId(project.id)}
                                    className={`flex-shrink-0 w-[340px] rounded-[2rem] overflow-hidden border transition-all cursor-pointer group ${isDarkMode ? "bg-[#0c0c0c] border-zinc-800 shadow-2xl" : "bg-gray-50 border-gray-200 shadow-lg"}`}
                                >
                                    <div className="h-44 overflow-hidden bg-zinc-900">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 transition-all group-hover:opacity-100 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-bold text-lg truncate font-['Poppins']">{project.title}</h4>
                                            <div className="flex gap-1">
                                                {project.tags?.map((tag, idx) => (
                                                    tag.icon && <tag.icon key={idx} className="text-zinc-500" size={14} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm line-clamp-2 opacity-50">{project.description}</p>
                                        <div className="text-[#4F75B0] text-xs font-bold mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                                            View Project <span>→</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background: ${isDarkMode ? '#333' : '#ddd'}; 
                    border-radius: 10px; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4F75B0; }
            `}</style>
        </div>
    );
};

export default Portfolio_Section;