import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- KOMPONEN SPOTLIGHT CARD (Optimasi Layer & Scaling) ---
const SpotlightCard = ({ children, isDarkMode, className = "" }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${className}`}
        >
            {/* Mekanisme Spotlight: Pastikan z-index di bawah konten tetapi di atas background asli */}
            <div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
                style={{
                    opacity: isFocused ? 1 : 0,
                    // Radius diperbesar menjadi 350px agar pancaran cahaya lebih natural di zoom 100%
                    background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${isDarkMode
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(79, 117, 176, 0.15)"
                        }, transparent 80%)`,
                }}
            />
            {/* Wrapper konten dengan z-index agar teks tetap tajam di atas spotlight */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};

const Services_Section = ({ isDarkMode }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth <= 430;
    const isTabletRange = windowWidth <= 920 && windowWidth > 430;
    const isBelow920 = windowWidth <= 920;

    const services = [
        {
            title: "Mobile Development",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
            desc: "Build functional mobile applications that run smoothly on iOS and Android devices. My focus is on creating responsive interfaces."
        },
        {
            title: "Web Development",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
            desc: "Bringing designs to life with clean and optimized code. I build responsive and interactive web applications using React."
        },
        {
            title: "UI/UX Design",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>,
            desc: "I design intuitive and visually compelling user interfaces that enhance engagement, focusing on user behavior."
        }
    ];

    return (
        <div className={`w-full flex transition-colors duration-300 ease-in-out font-sans ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} ${isBelow920 ? "h-auto" : "min-h-screen"}`}>

            {/* --- SIDEBAR SYNC --- */}
            {!isMobile && (
                <div className={`flex flex-col items-center border-r flex-shrink-0 transition-all duration-300 ${isDarkMode ? "border-white" : "border-black"} ${isTabletRange ? "w-[60px]" : "w-[90px]"}`} />
            )}

            {/* --- MAIN CONTENT area (Optimasi Spasi Zoom 100%) --- */}
            <div className={`flex-1 flex flex-col min-w-0 mx-12 lg:mx-20
                ${windowWidth > 920 ? "pt-[90px]" : isTabletRange ? "pt-[30px]" : "pt-[10px]"} pb-20`}>

                <div className={`flex-1 flex flex-col ${isBelow920 ? "justify-start pt-10" : "justify-center"} max-w-7xl w-full`}>

                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                        {/* Kolom Teks Kiri */}
                        <div className="flex-1 flex flex-col gap-6 lg:gap-10">
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="text-3xl lg:text-4xl font-bold mb-4 font-['Poppins']"
                                >
                                    My <span className="text-[#4F75B0]">Services</span>
                                </motion.h2>
                                <p className="text-sm lg:text-[15px] opacity-75 leading-relaxed max-w-md">
                                    Explore my range of services designed to go beyond aesthetics. I craft visually appealing and fully functional systems.
                                </p>
                            </div>

                            <div className="mt-2">
                                <span className={`text-5xl font-serif ${isDarkMode ? "text-white" : "text-black"}`}>“</span>
                                <h3 className="text-xl lg:text-2xl font-bold font-['Poppins'] leading-tight -mt-4 ml-4 italic opacity-90">
                                    Architecting logic.<br />
                                    Debugging reality.
                                </h3>
                            </div>
                        </div>

                        {/* Kolom Kartu Kanan (Optimasi Ukuran Kartu) */}
                        <div className="flex-1 flex flex-col gap-4 w-full max-w-xl">
                            {services.map((item, idx) => (
                                <SpotlightCard
                                    key={idx}
                                    isDarkMode={isDarkMode}
                                    className={`border p-5 flex flex-col gap-2 transition-all
                                        ${isDarkMode
                                            ? "bg-[#0A0A0A]/80 border-white/10 hover:border-white/30"
                                            : "bg-gray-50/80 border-black/5 hover:border-black/20"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="text-[#4F75B0] scale-90 lg:scale-100">
                                            {item.icon}
                                        </div>
                                        <h4 className="font-['Poppins'] text-base lg:text-lg font-bold">{item.title}</h4>
                                    </div>
                                    <p className="text-[11px] lg:text-xs opacity-70 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </SpotlightCard>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services_Section;