import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiReact, SiFramer, SiTypescript, SiTailwindcss, SiExpress, SiMysql, SiFlutter, SiGithub, SiPostman, SiRedux
} from "react-icons/si";
import { HiOutlineExternalLink } from "react-icons/hi";

const customBlackCursor = `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 24 24' fill='black' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 3V19L8.5 15L11.5 21L14.5 19.5L11.5 13.5L17 13.5L4.5 3Z' stroke='black' stroke-width='1.8' stroke-linejoin='round'/%3E%3C/svg%3E") 4 3, pointer`;

const Portfolio_Section = ({ isDarkMode }) => {
    // --- RESPONSIVE STATE ---
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            title: "Dikedo Tracker App",
            description: "Develop a website-based application that is integrated with a GPS device to track vehicle positions based on maps using Google Maps by Leaflet. The GPS device on the vehicle also has a camera that can be used live when the vehicle is turned on.",
            focus: ["Google Map", "Tracking", "Subscription"],
            image: "/images/dikedo_preview.png",
            tags: [
                { name: "React.js", icon: SiReact, color: "#3178C6" },
                { name: "MySQL", icon: SiMysql, color: "#06B6D4" },
                { name: "Postman", icon: SiPostman, color: "#EF5B25" },
                { name: "Express.js", icon: SiExpress, color: isDarkMode ? "#fff" : "#000" }
            ],
            link: "#",
            github: "https://github.com/faturarkansy/Dikedo"
        },
        {
            id: 2,
            title: "Fatur Arkan Personal Website",
            description: "This is a platform where I introduce myself. I showcase my portfolio, work, and experience. Through this website, I centrally demonstrate my personal branding.",
            focus: ["Comfortable UI", "Personal Branding", "Portfolio"],
            image: "/images/freshmart.jpg",
            tags: [
                { name: "React", icon: SiReact, color: "#61DAFB" },
                { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
            ],
            link: "#",
            github: "https://github.com/faturarkansy/Personal-Website-React.js"
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
    const activeProject = allProjects.find(p => p.id === selectedId) || allProjects[0];

    const isMobile = windowWidth <= 430;
    const isTabletRange = windowWidth <= 920 && windowWidth > 430;
    const isBelow920 = windowWidth <= 920;

    return (
        <div className={`w-full flex transition-colors duration-300 ease-in-out font-sans ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} ${isBelow920 ? "h-auto" : "min-h-screen"}`}>

            {/* --- SIDEBAR SYNC (Sama dengan Services_Section) --- */}
            {!isMobile && (
                <div className={`flex flex-col items-center border-r flex-shrink-0 transition-all duration-300 ${isDarkMode ? "border-white" : "border-black"} ${isTabletRange ? "w-[60px]" : "w-[90px]"}`} />
            )}

            {/* --- MAIN CONTENT area (Menerapkan mx-12 lg:mx-20 seperti Services_Section) --- */}
            <div className={`flex-1 flex flex-col min-w-0 mx-12 lg:mx-20
                ${windowWidth > 920 ? "pt-[90px]" : isTabletRange ? "pt-[30px]" : "pt-[10px]"} pb-20 overflow-hidden`}>

                <div className={`flex-1 flex flex-col ${isBelow920 ? "justify-start pt-10" : "justify-center"} max-w-7xl w-full`}>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`text-3xl lg:text-4xl font-bold mb-10 font-['Poppins'] ${isBelow920 ? "text-center lg:text-left" : ""}`}
                    >
                        My <span className="text-[#4F75B0]">Portfolio</span>
                    </motion.h2>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`img-${activeProject.id}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="relative rounded-3xl overflow-hidden border border-gray-800/20 shadow-xl bg-zinc-900 aspect-video lg:aspect-square xl:aspect-video flex items-center justify-center"
                            >
                                <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                            </motion.div>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`text-${activeProject.id}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex flex-wrap justify-between items-start gap-3">
                                    <h3 className="text-2xl font-bold font-['Poppins'] leading-tight flex-1">{activeProject.title}</h3>
                                    <div className="flex gap-1">
                                        {/* Pengamanan: Gunakan optional chaining ?. */}
                                        {activeProject.tags?.map((tag, idx) => (
                                            <div key={idx} className={`p-1.5 rounded-lg border ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-100 border-gray-200"}`}>
                                                {tag.icon && <tag.icon style={{ color: tag.color }} size={20} />}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-sm lg:text-base opacity-75 leading-relaxed max-w-xl">{activeProject.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {activeProject.focus?.map((item, index) => (
                                        <span key={index} className={`px-4 py-1 rounded-full font-medium border text-xs ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-6 mt-2">
                                    <a href={activeProject.link} className="flex items-center gap-2 text-lg font-bold hover:text-[#4F75B0] transition-all group">
                                        <HiOutlineExternalLink className="group-hover:scale-110 transition-transform" /> Visit
                                    </a>
                                    <a href={activeProject.github} className="flex items-center gap-2 text-lg font-bold hover:text-[#4F75B0] transition-all group">
                                        <SiGithub className="group-hover:scale-110 transition-transform" /> Source
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Sub-projects Carousel */}
                    <div className="w-full">
                        <h3 className="text-lg font-bold font-['Poppins'] opacity-70 mb-2 tracking-tight">EXPLORE MORE</h3>
                        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 custom-scrollbar scroll-smooth no-scrollbar">
                            {allProjects
                                .filter(project => project.id !== selectedId)
                                .map((project) => (
                                    <motion.div
                                        key={project.id}
                                        whileHover={{ y: -8 }}
                                        onClick={() => setSelectedId(project.id)}
                                        style={{ cursor: customBlackCursor }}
                                        className={`flex-shrink-0 w-[240px] md:w-[280px] rounded-2xl overflow-hidden border transition-all group ${isDarkMode ? "bg-[#0A0A0A] border-white/5" : "bg-white border-black/5 shadow-sm"}`}
                                    >
                                        <div className="h-36 overflow-hidden bg-zinc-900">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                                        </div>
                                        <div className="p-4 flex flex-col gap-2">
                                            {/* HEADER KARTU: Judul dan Ikon diatur berjajar */}
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="font-bold text-xs truncate font-['Poppins'] flex-1">
                                                    {project.title}
                                                </h4>
                                                <div className="flex gap-1 flex-shrink-0">
                                                    {project.tags?.map((tag, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`p-1 rounded-md border ${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-gray-100 border-gray-200"}`}
                                                        >
                                                            {tag.icon && <tag.icon style={{ color: tag.color }} size={12} />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-[10px] line-clamp-1 opacity-50">{project.description}</p>
                                            <div className="text-[#4F75B0] text-[10px] font-black mt-1 flex items-center gap-1">
                                                View Details <span className="group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; border-radius: 10px; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default Portfolio_Section;