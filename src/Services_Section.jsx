import React, { useState, useRef } from "react";

// --- KOMPONEN BARU: SPOTLIGHT CARD ---
// Komponen ini membungkus isi card untuk menangani logika mouse tracking
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
            className={`relative overflow-hidden ${className}`}
        >
            {/* Layer Efek Spotlight */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    opacity: isFocused ? 1 : 0,
                    background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${isDarkMode
                        ? "rgba(255, 255, 255, 0.15)" // Putih pudar saat Dark Mode
                        : "rgba(79, 117, 176, 0.15)"  // #4F75B0 pudar saat Light Mode
                        }, transparent 40%)`,
                }}
            />

            {/* Konten Card */}
            <div className="relative h-full">
                {children}
            </div>
        </div>
    );
};

const Services_Section = ({ isDarkMode }) => {
    // Data Services
    const services = [
        {
            title: "Mobile Development",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            ),
            desc: "Build functional mobile applications that run smoothly on iOS and Android devices. My focus is on creating responsive interfaces to ensure a consistent user experience."
        },
        {
            title: "Web Development",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            ),
            desc: "Bringing designs to life with clean, efficient, and optimized code. I build responsive, interactive, and user-friendly web applications using the latest front-end technologies like React."
        },
        {
            title: "UI/UX Design",
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            ),
            desc: "I design intuitive and visually compelling user interfaces that enhance engagement. My approach focuses on user behavior, accessibility, and aesthetics to deliver a polished digital experience."
        }
    ];

    return (
        <div
            className={`w-full min-h-screen flex transition-colors duration-300 ease-in-out font-sans
      ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
        >
            {/* Spacer Left Sidebar */}
            <div className={`w-[120px] border-r flex-shrink-0 ${isDarkMode ? "border-white" : "border-black"}`}>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col px-24 py-36">

                <div className="flex gap-12">
                    {/* Left Text Column */}
                    <div className="flex-1 flex flex-col gap-12">
                        <div>
                            <h2 className="font-['Poppins'] text-5xl font-bold mb-2">
                                My <span className="text-[#4F75B0]">Services</span>
                            </h2>
                            <p className="mt-6 text-lg opacity-80 leading-relaxed max-w-md">
                                Explore my range of services designed to go beyond aesthetics. I craft visually appealing and fully functional system tailored to your business needs.
                            </p>
                        </div>

                        {/* Quote Block */}
                        <div className="mt-12">
                            <span className="text-6xl font-serif">“</span>
                            <h3 className="text-4xl font-bold font-['Poppins'] leading-tight -mt-4 ml-4">
                                Architecting logic.<br />
                                Debugging reality.
                            </h3>
                        </div>
                    </div>

                    {/* Right Cards Column */}
                    <div className="flex-1 flex flex-col gap-6">
                        {services.map((item, idx) => (
                            // MENGGUNAKAN KOMPONEN SPOTLIGHT CARD DI SINI
                            <SpotlightCard
                                key={idx}
                                isDarkMode={isDarkMode}
                                className={`border rounded-lg p-8 flex flex-col gap-4 transition-all hover:shadow-lg
                                    ${isDarkMode ? "border-white hover:bg-[#222]" : "border-black hover:bg-gray-50"}
                                `}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-[#4F75B0]">
                                        {item.icon}
                                    </div>
                                    <h4 className="font-['Poppins'] text-xl font-bold text-[#4F75B0]">{item.title}</h4>
                                </div>
                                <p className="text-sm opacity-80 leading-relaxed">
                                    {item.desc}
                                </p>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Services_Section;