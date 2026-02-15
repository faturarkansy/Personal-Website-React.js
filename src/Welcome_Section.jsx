import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Welcome_Section = ({ isDarkMode }) => {
    const [index, setIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const roles = [
        { prefix: "Mobile", highlight: "De", suffix: "velopment" },
        { prefix: "Web", highlight: "De", suffix: "velopment" },
        { prefix: "UI/UX", highlight: "De", suffix: "sign" }
    ];

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }, 3000);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(interval);
        };
    }, []);

    const isMobile = windowWidth <= 430;
    const isMidRange = windowWidth <= 1030 && windowWidth > 430;
    const isTabletRange = windowWidth < 920 && windowWidth > 430;
    const isBelow920 = windowWidth <= 920;

    return (
        /* MODIFIKASI 1: Hilangkan min-h-screen jika di bawah 920px agar konten tidak dipaksa ke tengah layar */
        <div className={`w-full flex transition-colors duration-300 ease-in-out box-border font-sans ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} ${isBelow920 ? "h-auto" : "min-h-screen"}`}>

            {/* --- LEFT SIDEBAR --- */}
            {!isMobile && (
                <div
                    className={`flex flex-col items-center border-r flex-shrink-0 transition-all duration-300 ${isDarkMode ? "border-white" : "border-black"
                        } ${isTabletRange ? "w-[60px]" : "w-[90px]"
                        }`}
                >
                </div>
            )}

            {/* Main Content Area */}
            {/* MODIFIKASI 2: Sesuaikan padding top mengikuti tinggi header dinamis (90px vs 70px) */}
            <div className={`flex-1 flex flex-col min-w-0 ${isMobile ? "px-6" : "mx-4"} ${windowWidth > 920 ? "pt-[90px]" : (windowWidth <= 920 && windowWidth > 430) ? "pt-[30px]" : "pt-[0px]"}`}>
                {/* MODIFIKASI 3: Ubah justify-center menjadi justify-start jika di bawah 920px agar konten naik ke atas */}
                <div className={`flex-1 flex flex-col ${isBelow920 ? "justify-start pt-[0px]" : "justify-center"}`}>

                    <div className={`flex ${windowWidth < 700 ? "flex-col" : "flex-row"} items-center justify-between ml-0 md:ml-6 lg:ml-6`}>

                        {/* Teks Content */}
                        <div className={`flex-1 flex flex-col justify-center relative z-10 ${isMobile ? "py-6 px-0 text-center items-center" : "py-10 px-6 lg:px-10"}`}>
                            <span className={`font-['Playfair_Display'] italic mb-1 ${isMidRange || isMobile ? "text-lg" : "text-2xl"}`}>
                                Hi there
                            </span>

                            <h1 className={`font-['Poppins'] font-bold mb-1 leading-tight ${isMidRange || isMobile ? "text-4xl" : "text-6xl"}`}>
                                I am F<span className="text-[#4F75B0]">a</span>tur
                            </h1>

                            <div className={`font-['Poppins'] font-bold mb-4 opacity-90 ${isMidRange || isMobile ? "text-xl" : "text-3xl"}`}>
                                Arkan Syawalva
                            </div>

                            {/* ANIMATED SECTION */}
                            <div className={`flex items-center gap-2 lg:gap-3 ${isMidRange || isMobile ? "h-[45px]" : "h-[60px]"}`}>
                                <span className={`font-['Poppins'] text-lg lg:text-3xl font-medium`}>I do</span>

                                <motion.div
                                    layout
                                    transition={{ layout: { type: "spring", stiffness: 120, damping: 20 } }}
                                    className={`relative px-4 lg:px-6 py-1 lg:py-1.5 rounded-full overflow-hidden flex items-center justify-center ${isDarkMode ? "bg-white text-black" : "bg-black text-white"}`}
                                    style={{ borderRadius: 9999, minWidth: "fit-content" }}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={index}
                                            initial={{ y: 15, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -15, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`font-['Poppins'] font-medium whitespace-nowrap block ${isMidRange || isMobile ? "text-base" : "text-2xl"}`}
                                        >
                                            {roles[index].prefix} <span className="text-[#4F75B0]">{roles[index].highlight}</span>{roles[index].suffix}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        </div>

                        {/* Image Area */}
                        <div className={`flex-1 flex items-center justify-center overflow-hidden ${isMobile ? "p-4 w-full" : "p-8"}`}>
                            <img
                                src={isDarkMode ? "/images/Home_Picture_Dark.svg" : "/images/Home_Picture_Light.svg"}
                                alt="Fatur Profile"
                                className={`h-auto w-auto object-contain transition-all duration-500 
                                    ${isMobile ? "max-h-[245px]" : isTabletRange ? "max-h-[320px]" : isMidRange ? "max-h-[400px]" : "max-h-[55vh]"}`}
                            />
                        </div>
                    </div>
                </div>

                {/* --- FOOTER --- */}
                <div className={`flex flex-wrap items-center mb-4 gap-y-4 gap-x-2 py-8 border-t border-transparent ${isMobile ? "justify-center text-center px-0" : "px-6 lg:px-10"}`}>
                    <div className="flex flex-col">
                        <span className="font-['Poppins'] text-sm lg:text-lg  font-bold">Email</span>
                        <a href="mailto:faturarkansyawalva@gmail.com" className="text-xs lg:text-sm mt-0.5 hover:text-[#4F75B0] hover:underline transition-all">
                            faturarkansyawalva@gmail.com
                        </a>
                    </div>

                    {windowWidth >= 490 && <div className={`h-8 w-[1px] mx-4 ${isDarkMode ? "bg-white/30" : "bg-black/20"}`}></div>}

                    <div className="flex flex-col">
                        <span className="font-['Poppins'] text-sm lg:text-lg font-bold">Phone</span>
                        <a href="https://wa.me/6281947897059" target="_blank" rel="noopener noreferrer" className="text-xs lg:text-sm mt-0.5 hover:text-[#4F75B0] hover:underline transition-all">
                            +62 819-4789-7059
                        </a>
                    </div>

                    {windowWidth >= 490 && <div className={`h-8 w-[1px] mx-4 ${isDarkMode ? "bg-white/30" : "bg-black/20"}`}></div>}

                    <div className="flex flex-col">
                        <span className="font-['Poppins'] text-sm lg:text-lg font-bold">Location</span>
                        <a href="#" className="text-xs lg:text-sm mt-0.5 hover:text-[#4F75B0] hover:underline transition-all">
                            Lampung, ID
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome_Section;