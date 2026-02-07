import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// --- DATA PENGALAMAN ---
const experiences = [
    { id: 12, date: "2024-03", startDate: "Feb 2023", title: "Extra-Campus Divison Staff", company: "HMIF ITERA", logoPath: "/images/HMIF.png" },
    { id: 11, date: "2024-05", startDate: "Feb 2024", title: "Frontend Web Developer", company: "Sejahtera Perkasa Energi", logoPath: "/images/Sejahtera_Perkasa_Energi.png" },
    { id: 10, date: "2024-08", startDate: "Jul 2024", title: "Backend Web Developer Intern", company: "Gink Technology", logoPath: "/images/Gink.jpg" },
    { id: 9, date: "2024-11", startDate: "Aug 2024", title: "IT Support PKM Desa Tulung Kakan", company: "LPPM ITERA", logoPath: "/images/ITERA_LPPM.png" },
    { id: 8, date: "2024-12", startDate: "Aug 2024", title: "Information Technology Project Assistant", company: "ITERA Informatics Engineering", logoPath: "/images/Informatika.png" },
    { id: 7, date: "2024-12", startDate: "Aug 2024", title: "Information Systems Assistant", company: "ITERA Informatics Engineering", logoPath: "/images/Informatika.png" },
    { id: 6, date: "2025-06", startDate: "Feb 2025", title: "Software Engineering Fundamentals Assistant", company: "ITERA Informatics Engineering", logoPath: "/images/Informatika.png" },
    { id: 5, date: "2025-06", startDate: "Feb 2025", title: "Data Visualization Assistant", company: "ITERA Informatics Engineering", logoPath: "/images/Informatika.png" },
    { id: 4, date: "2025-06", startDate: "Aug 2024", title: "Frontend Web Developer Intern", company: "Init Visual Experia (INVIX)", logoPath: "/images/Invix.png" },
    { id: 3, date: "2025-09", startDate: "Mar 2025", title: "Web Developer", company: "DPMPPTSP Lampung Selatan", logoPath: "/images/DPMPPTSP_Lamsel.png" },
    { id: 2, date: "2025-12", startDate: "Feb 2025", title: "Surveyor Tracer Study", company: "Karir & Alumni Itera", logoPath: "/images/Karir_Alumni_ITERA.png" },
    { id: 1, date: "2026-01", startDate: "Jun 2025", title: "Android Mobile Developer", company: "Ariftama Tekindo", logoPath: "/images/Ariftama_Tekindo.png" },
].sort((a, b) => new Date(a.date) - new Date(b.date));

const ITEM_WIDTH = 220;
const ROW_HEIGHT = 140;
const CONTAINER_HEIGHT = 1200;

const WorkExperience_Section = ({ isDarkMode }) => {
    const [viewMode, setViewMode] = useState("timeline");
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    const progress = useMotionValue(0);
    const animatedProgress = useSpring(progress, { stiffness: 40, damping: 15 });

    const timelineItems = useMemo(() => {
        const items = [];
        let curr = new Date("2024-01-01");
        const end = new Date("2026-06-01");
        while (curr <= end) {
            items.push({
                month: curr.toLocaleString('default', { month: 'short' }),
                year: curr.getFullYear(),
                key: `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}`
            });
            curr.setMonth(curr.getMonth() + 1);
        }
        return items;
    }, []);

    const totalWidth = timelineItems.length * ITEM_WIDTH;

    const experiencePositions = useMemo(() => {
        return experiences.map((exp, index) => {
            const monthIndex = timelineItems.findIndex(m => m.key === exp.date);
            const yPos = CONTAINER_HEIGHT - ((index + 1) * ROW_HEIGHT);
            return { ...exp, x: monthIndex * ITEM_WIDTH + (ITEM_WIDTH / 2), y: yPos };
        });
    }, [timelineItems]);

    const pathData = useMemo(() => {
        if (experiencePositions.length === 0) return "";
        let d = `M ${experiencePositions[0].x} ${experiencePositions[0].y}`;
        for (let i = 0; i < experiencePositions.length - 1; i++) {
            const start = experiencePositions[i];
            const end = experiencePositions[i + 1];
            const midY = start.y + (end.y - start.y) / 2;
            d += ` L ${start.x} ${midY + 10} Q ${start.x} ${midY} ${start.x + (end.x > start.x ? 10 : -10)} ${midY}`;
            d += ` H ${end.x - (end.x > start.x ? 10 : -10)} Q ${end.x} ${midY} ${end.x} ${midY - 10} L ${end.x} ${end.y}`;
        }
        return d;
    }, [experiencePositions]);

    const [cameraPos, setCameraPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const unsubscribe = animatedProgress.on("change", (latest) => {
            if (svgRef.current && viewMode === "timeline") {
                const path = svgRef.current;
                const length = path.getTotalLength();
                if (latest >= 0.999) {
                    const lastExp = experiencePositions[experiencePositions.length - 1];
                    setCameraPos({ x: lastExp.x, y: lastExp.y });
                } else {
                    const point = path.getPointAtLength(latest * length);
                    setCameraPos({ x: point.x, y: point.y });
                }
            }
        });
        return () => unsubscribe();
    }, [animatedProgress, experiencePositions, viewMode]);

    useEffect(() => {
        const handleWheel = (e) => {
            if (viewMode !== "timeline" || !containerRef.current || !containerRef.current.contains(e.target)) return;
            e.preventDefault();
            const delta = e.deltaY * 0.0005;
            progress.set(Math.min(1, Math.max(0, progress.get() + delta)));
        };
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [progress, viewMode]);

    useEffect(() => {
        if (containerRef.current && viewMode === "timeline") {
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            setContainerSize({ width, height });
            const firstExp = experiencePositions[0];
            if (firstExp) {
                setCameraPos({ x: firstExp.x, y: firstExp.y });
                progress.jump(0);
            }
        }
    }, [viewMode, experiencePositions, progress]);

    const translateX = containerSize.width / 2 - cameraPos.x;
    const translateY = containerSize.height / 2 - cameraPos.y;

    const formatFinishDate = (dateStr) => {
        const d = new Date(dateStr + "-01");
        return d.toLocaleString('default', { month: 'short', year: 'numeric' });
    };

    return (
        <div className={`w-full min-h-screen flex transition-colors duration-300 font-sans ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
            <style>
                {`
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { 
                    background: ${isDarkMode ? '#333' : '#ddd'}; 
                    border-radius: 10px; 
                }
                .custom-scrollbar::-webkit-scrollbar-button { display: none; }
                `}
            </style>

            <div className={`w-[120px] border-r flex-shrink-0 min-h-screen ${isDarkMode ? "border-white" : "border-black"}`} />

            <div className="flex-1 flex flex-col px-16 py-24 relative">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-5xl font-bold font-['Poppins']">
                        Work <span className="text-[#4F75B0]">& Experience</span>
                    </h2>
                    <div className={`flex p-1 rounded-xl border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200'}`}>
                        <button onClick={() => setViewMode("timeline")} className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all ${viewMode === "timeline" ? 'bg-[#4F75B0] text-white' : 'text-gray-500 hover:text-gray-700'}`}>Timeline</button>
                        <button onClick={() => setViewMode("list")} className={`px-4 py-2 rounded-lg text-lg font-semibold transition-all ${viewMode === "list" ? 'bg-[#4F75B0] text-white' : 'text-gray-500 hover:text-gray-700'}`}>List</button>
                    </div>
                </div>

                <div ref={containerRef} className={`relative border border-gray-800/30 rounded-3xl transition-all duration-500 overflow-hidden ${viewMode === 'list' ? 'h-auto bg-black' : 'h-[450px] bg-opacity-50'}`}>
                    {viewMode === "timeline" ? (
                        <>
                            <motion.div className="absolute top-0 left-0 flex border-b border-gray-800/30 bg-opacity-80 backdrop-blur-xl z-50" style={{ x: translateX }}>
                                {timelineItems.map((item, i) => (
                                    <div key={i} className="flex-shrink-0 py-6 flex flex-col items-center" style={{ width: ITEM_WIDTH }}>
                                        <span className={`text-xl font-bold uppercase tracking-tighter mb-1 ${item.month === "Jan" ? "text-[#4F75B0]" : "opacity-0"}`}>{item.year}</span>
                                        <span className={`text-lg font-semibold ${isDarkMode ? 'text-white/60' : 'text-black/40'}`}>{item.month}</span>
                                        <div className={`w-1 h-1 rounded-full mt-3 ${isDarkMode ? 'bg-zinc-600' : 'bg-gray-700'}`} />
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div className="absolute top-0 left-0" animate={{ x: translateX, y: translateY }} transition={{ type: "spring", damping: 25, stiffness: 100 }} style={{ width: totalWidth, height: CONTAINER_HEIGHT }}>
                                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                                    <path ref={svgRef} d={pathData} fill="none" stroke="transparent" strokeWidth="1" />
                                    <path d={pathData} fill="none" stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeWidth="6" strokeLinecap="round" />
                                    <motion.path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" style={{ pathLength: animatedProgress }} />
                                </svg>

                                {experiencePositions.map((exp) => (
                                    <div key={exp.id} className="absolute flex items-center group" style={{ left: exp.x, top: exp.y }}>
                                        <div className="w-5 h-5 bg-white border-[4px] border-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 z-20" />
                                        <motion.div className={`ml-8 flex items-center gap-4 px-5 py-4 rounded-xl border min-w-[340px] transition-all ${isDarkMode ? "bg-[#111] border-gray-800/50 text-white" : "bg-white border-gray-200 text-black"}`} whileHover={{ scale: 1.05 }}>
                                            <div className="w-18 h-18 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-xl bg-white p-1">
                                                <img src={exp.logoPath} alt={exp.company} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-xl truncate font-['Poppins'] leading-tight">{exp.title}</h4>
                                                <p className="text-base font-semibold opacity-80 flex items-center gap-2">
                                                    <span className={`w-0 h-0 border-l-[12px] border-l-transparent border-b-[12px] ${isDarkMode ? 'border-b-white' : 'border-b-black'}`} /> {exp.company}
                                                </p>
                                                <p className="text-sm mt-1 font-medium opacity-50">{exp.startDate} – {formatFinishDate(exp.date)}</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>

                            <div className="absolute inset-0 pointer-events-none rounded-3xl z-40" />

                            {/* JOURNEY INDICATOR */}
                            <div className="absolute bottom-6 right-8 bg-[#4F75B0] text-white px-4 pt-1 pb-2 rounded-full text-md font-bold z-50 shadow-lg">
                                {Math.round(progress.get() * 100)}% Journey
                            </div>
                        </>
                    ) : (
                        <div className={`custom-scrollbar flex flex-col gap-4 p-8 max-h-[500px] overflow-y-auto transition-colors duration-500 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                            {experiences.slice().reverse().map((exp) => (
                                <motion.div key={exp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`flex items-center justify-between p-3 rounded-2xl border transition-all group ${isDarkMode ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-600" : "bg-gray-50 border-gray-200 hover:border-gray-300 shadow-sm"}`}>
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center p-2 border border-gray-100">
                                            <img src={exp.logoPath} alt={exp.company} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className={`font-bold text-xl leading-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{exp.title}</h3>
                                            <span className={`font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>{exp.company}</span>
                                        </div>
                                    </div>
                                    <div className={`font-mono text-md font-semibold tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-gray-400'}`}>
                                        {exp.startDate?.split(' ')[1]} {exp.startDate?.split(' ')[0]} - {formatFinishDate(exp.date)}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SCROLL TEXT & ARROW (DI LUAR CONTAINER TIMELINE UNTUK POSISI POJOK KANAN BAWAH) */}
                {viewMode === "timeline" && (
                    <div className="absolute bottom-32 right-32 flex flex-col items-center">
                        <img
                            src={isDarkMode ? "/images/Scroll_text_dark.png" : "/images/Scroll_text_light.png"}
                            alt="Scroll to See Journey"
                            className="w-52 object-contain"
                        />

                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkExperience_Section;