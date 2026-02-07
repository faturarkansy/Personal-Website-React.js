import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Welcome_Section = ({ isDarkMode }) => {

    // 2. State untuk teks yang tampil
    const [index, setIndex] = useState(0);

    const roles = [
        { prefix: "Mobile", highlight: "De", suffix: "velopment" },
        { prefix: "Web", highlight: "De", suffix: "velopment" },
        { prefix: "UI/UX", highlight: "De", suffix: "sign" }
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // --- ICON COMPONENTS (SVG) ---
    const IconInstagram = () => (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    );
    const IconGithub = () => (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    );
    const IconLinkedin = () => (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    );

    // --- HELPER COMPONENT UNTUK SOCIAL LINK + TOOLTIP ---
    const SocialLink = ({ href, Icon, label }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center hover:text-gray-500 transition-transform hover:scale-110"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Icon />

                {/* TOOLTIP ANIMATION */}
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
                            {/* Panah kecil pada tooltip */}
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
        <div
            className={`w-full h-screen flex transition-colors duration-300 ease-in-out box-border font-sans
        ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
        >
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;500;700&display=swap');
                
                .cursor-down-arrow {
                    /* Menggunakan SVG encoded sebagai kursor */
                    cursor: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 5V19M12 19L5 12M12 19L19 12' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") 16 16, auto;
                }
                
                .text-content {
                    cursor: text;
                }
                `}
            </style>

            {/* --- LEFT SIDEBAR (UPDATED WITH LINKS & TOOLTIPS) --- */}
            <div className={`w-[120px] flex flex-col items-center justify-end pb-16 border-r flex-shrink-0 ${isDarkMode ? "border-white" : "border-black"}`}>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 mx-8 pt-[120px]">
                {/* Header */}

                {/* Middle Content */}
                <div className="flex-1 flex mx-6">
                    <div className="flex-1 flex flex-col justify-center px-16 relative z-10">
                        <span className="font-['Playfair_Display'] text-3xl mb-2 italic">Hi there</span>
                        <h1 className="font-['Poppins'] text-7xl font-bold mb-2">
                            I am F<span className="text-[#4F75B0]">a</span>tur
                        </h1>

                        <div className="font-['Poppins'] text-4xl font-bold mb-2">
                            Arkan Syawalva
                        </div>

                        {/* --- ANIMATED SECTION START --- */}
                        <div className="flex items-center gap-4 h-[80px]">
                            <span className="font-['Poppins'] text-5xl font-medium">I do</span>

                            {/* CONTAINER ANIMASI */}
                            <motion.div
                                layout
                                transition={{
                                    layout: { type: "spring", stiffness: 120, damping: 20 }
                                }}
                                className={`relative px-8 py-2 rounded-full overflow-hidden flex items-center justify-center ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}
                                style={{ borderRadius: 9999, minWidth: "fit-content", height: "fit-content" }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={index}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{
                                            y: 0, opacity: 1,
                                            transition: { delay: 0.2, duration: 0.4, type: "spring", stiffness: 200 }
                                        }}
                                        exit={{
                                            y: -20, opacity: 0,
                                            transition: { duration: 0.2 }
                                        }}
                                        className="font-['Poppins'] text-3xl font-medium whitespace-nowrap block"
                                    >
                                        {roles[index].prefix} <span className="text-[#4F75B0]">{roles[index].highlight}</span>{roles[index].suffix}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.div>
                        </div>
                        {/* --- ANIMATED SECTION END --- */}

                    </div>

                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                        <img src={isDarkMode ? "/images/Home_Picture_Dark.svg" : "/images/Home_Picture_Light.svg"} alt="Fatur Profile" className="h-5/6 object-contain" />
                    </div>
                </div>

                {/* Footer (UPDATED WITH LINKS) */}
                <div className="h-[160px] flex items-start px-16">
                    {/* 1. EMAIL */}
                    <div className="flex flex-col">
                        <span className="font-['Poppins'] text-xl font-bold">Email</span>
                        <a
                            href="mailto:faturarkansyawalva@gmail.com"
                            className="text-base mt-1 opacity-90 hover:text-[#4F75B0] hover:underline transition-all"
                        >
                            faturarkansyawalva@gmail.com
                        </a>
                    </div>

                    <div className={`h-12 w-[1.5px] mx-10 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>

                    {/* 2. PHONE (WhatsApp Link) */}
                    <div className="flex flex-col">
                        <span className="font-['Poppins'] text-xl font-bold">Phone</span>
                        <a
                            href="https://wa.me/6281947897059"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base mt-1 opacity-90 hover:text-[#4F75B0] hover:underline transition-all"
                        >
                            +62 819-4789-7059
                        </a>
                    </div>

                    <div className={`h-12 w-[1.5px] mx-10 ${isDarkMode ? "bg-white" : "bg-black"}`}></div>

                    {/* 3. LOCATION (Google Maps Link) */}
                    <div className="flex flex-col">
                        <span className="font-['Poppins'] text-xl font-bold">Location</span>
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Lampung,+ID"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base mt-1 opacity-90 hover:text-[#4F75B0] hover:underline transition-all"
                        >
                            Lampung, ID
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome_Section;