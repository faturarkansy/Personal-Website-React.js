import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const experiences = [
    {
        id: 12, date: "2024-03", startDate: "Feb 2023", title: "Extra-Campus Divison Staff", company: "HMIF ITERA", logoPath: "/images/HMIF.png",
        desc: (
            <div>
                <p className="font-bold mb-2 text-[12px] lg:text-[14px]">Activity details : </p>
                <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
                    <li>Establishing relationships with the Lampung Province Communication and Information Office.</li>
                    <li>Establishing relationships with the Student Association in the Lampung Province in Permikomnas (National Informatics and Computer Students Association) Region 15.</li>
                    <li>Establishing relationships with the Hactiv8 Company.</li>
                    <li>Establishing relationships with Universities in the Java region (Pertamina University, Pancasila University).</li>
                </ul>
            </div>

        )
    },
    {
        id: 11, date: "2024-05", startDate: "Feb 2024", title: "Frontend Web Developer", company: "Sejahtera Perkasa Energi", logoPath: "/images/Sejahtera_Perkasa_Energi.png",
        desc: "Mengembangkan antarmuka landing page perusahaan menggunakan React dan Tailwind CSS dengan fokus pada responsivitas dan performa."
    },
    {
        id: 10, date: "2024-08", startDate: "Jul 2024", title: "Backend Web Developer Intern", company: "Gink Technology", logoPath: "/images/Gink.jpg",
        desc: "Membangun RESTful API menggunakan Express.js, mengoptimalkan query database PostgreSQL, dan mengimplementasikan sistem autentikasi JWT."
    },
    {
        id: 9, date: "2024-11", startDate: "Aug 2024", title: "IT Support PKM Desa Tulung Kakan", company: "LPPM ITERA", logoPath: "/images/ITERA_LPPM.png",
        desc: (
            <div>
                <p className="font-bold mb-2 text-[12px] lg:text-[14px]">Activity details : </p>
                <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
                    <li>Focused on the optimization of WebGIS to support the development of a Smart Village in Kampung Tulung Kakan, Lampung Tengah.</li>
                    <li>Assisted in improving digital infrastructure and promoting technology adoption within the local community.</li>
                </ul>
            </div>

        )
    },
    {
        id: 8, date: "2024-12", startDate: "Aug 2024", title: "IT Project Assistant", company: "ITERA Informatics Engineering", logoPath: "/images/Informatika.png",
        desc: "Membantu koordinasi proyek pengembangan sistem informasi internal jurusan serta memastikan timeline berjalan sesuai target."
    },
    {
        id: 7, date: "2024-12", startDate: "Aug 2024", title: "Information Systems Assistant", company: "ITERA Informatics Engineering", logoPath: "/images/Informatika.png",
        desc: "Mengelola basis data akademik dan memberikan asisten teknis dalam penggunaan sistem informasi bagi mahasiswa dan dosen."
    },
    {
        id: 6, date: "2025-06", startDate: "Feb 2025", title: "SWE Fundamentals Assistant", company: "ITERA Informatics Engineering", logoPath: "/images/Informatika.png",
        desc: "Menjadi asisten praktikum mata kuliah dasar rekayasa perangkat lunak, membimbing mahasiswa dalam pemahaman SDLC dan Git."
    },
    {
        id: 5, date: "2025-06", startDate: "Feb 2025", title: "Data Visualization Assistant", company: "ITERA Informatics Engineering", logoPath: "/images/Informatika.png",
        desc: "Membimbing mahasiswa dalam mengolah data kompleks menjadi visualisasi interaktif menggunakan library seperti D3.js dan ApexCharts."
    },
    {
        id: 4, date: "2025-06", startDate: "Aug 2024", title: "Frontend Web Developer Intern", company: "Init Visual Experia (INVIX)", logoPath: "/images/Invix.png",
        desc: (
            <div>
                <p className="font-bold mb-2 text-[12px] lg:text-[14px]">Activity details : </p>
                <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
                    <li>Develop on several company internal projects undertaken by the company as frontend developer with <b>React.js</b></li>
                    <li>Analyze system requirements, flow activities, and scope of system usage.</li>
                    <li>Implementation of <b>Agile</b> methods in development that focuses on client input regarding the dynamics of system needs in fast projects.</li>
                    <li>Implementation of <b>Modified Waterfall</b> methods in internal company service product development projects.</li>
                    <li><b>Design UI/UX interfaces</b> in the early stages of development.</li>
                    <li>Create documentation and user guide for a completed project.</li>
                </ul>
            </div>

        )
    },
    {
        id: 3, date: "2025-09", startDate: "Mar 2025", title: "Web Developer", company: "DPMPPTSP Lampung Selatan", logoPath: "/images/DPMPPTSP_Lamsel.png",
        desc: (
            <div>
                <p className="font-bold mb-2 text-[12px] lg:text-[14px]">Activity details : </p>
                <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
                    <li>Developed a system to visualize the distribution of potential points in South Lampung Regency.</li>
                    <li>Implementation of <b>Agile</b> methods in development that focuses on client input regarding the dynamics of system needs.</li>
                    <li><b>Design UI/UX interfaces</b> in the early stages of development.</li>
                    <li>Utilized <b>CodeIgniter 4</b> for backend and web framework development.</li>
                    <li>Implemented <b>Leaflet.js</b> for interactive map visualization and geolocation features.</li>
                    <li>Collaborated in designing data flow and optimizing performance for map rendering.</li>
                </ul>
            </div>

        )
    },
    {
        id: 2, date: "2025-12", startDate: "Feb 2025", title: "Surveyor Tracer Study", company: "Karir & Alumni Itera", logoPath: "/images/Karir_Alumni_ITERA.png",
        desc: (
            <div>
                <p className="font-bold mb-2 text-[12px] lg:text-[14px]">Activity details : </p>
                <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
                    <li><b>Collecting and analyzing data on alumni employment</b> to assess the curriculum's alignment with industry needs.</li>
                    <li>Data collection and analysis were conducted for several graduation periods within the past year.</li>
                    <li>Assisting with the implementation of events organized by Itera alumni careers.</li>
                </ul>
            </div>

        )
    },
    {
        id: 1,
        date: "2026-01",
        startDate: "Jun 2025",
        title: "Android Mobile Developer",
        company: "Ariftama Tekindo",
        logoPath: "/images/Ariftama_Tekindo.png",
        desc: (
            <div>
                <p className="font-bold mb-2 text-[12px] lg:text-[14px]">Activity details : </p>
                <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
                    <li>Develop and maintain Android-based applications using <b>Flutter and Express.js</b> for <b>e-commerce system.</b></li>
                    <li>Implement <b>Extreme Programming (XP)</b> core practices with Test-Driven Development (TDD), Continuous Integration (CI), Pair Programming, and Small Releases.</li>
                    <li><b>Design and improve the UI/UX interface</b> to ensure an intuitive user experience on Android and web admin panels.</li>
                    <li>Develop and integrate <b>RESTful APIs</b> between frontend (Flutter) and backend (Express.js) to support real-time data operations.</li>
                    <li>Build and optimize admin panel websites using Flutter Web, focusing on responsive design and functionality.</li>
                    <li>Analyze, document, and adapt business process workflows to ensure system alignment with company operations.</li>
                </ul>
            </div>

        )
    }
].sort((a, b) => new Date(a.date) - new Date(b.date));

const ITEM_WIDTH = 180;
const ROW_HEIGHT = 110;
const CONTAINER_HEIGHT = 900;

const WorkExperience_Section = ({ isDarkMode }) => {
    const [viewMode, setViewMode] = useState("timeline");
    const [expandedId, setExpandedId] = useState(null);
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
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

    const progress = useMotionValue(0);
    const animatedProgress = useSpring(progress, { stiffness: 45, damping: 20 });

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
            if (viewMode !== "timeline" || !containerRef.current?.contains(e.target)) return;
            e.preventDefault();
            const delta = e.deltaY * 0.0006;
            progress.set(Math.min(1, Math.max(0, progress.get() - delta)));
        };
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [progress, viewMode]);

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);

        if (viewMode === "timeline") {
            const firstExp = experiencePositions[0];
            if (firstExp) {
                setCameraPos({ x: firstExp.x, y: firstExp.y });
                progress.jump(0);
            }
        }
        return () => window.removeEventListener("resize", updateSize);
    }, [viewMode, experiencePositions, progress]);

    const translateX = containerSize.width / 2 - cameraPos.x;
    const translateY = containerSize.height / 2 - cameraPos.y;

    const formatFinishDate = (dateStr) => {
        const d = new Date(dateStr + "-01");
        return d.toLocaleString('default', { month: 'short', year: 'numeric' });
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className={`w-full flex transition-colors duration-300 font-sans ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} ${isBelow920 ? "h-auto" : "min-h-screen"}`}>

            {/* --- LEFT SIDEBAR: Lebar adaptif 90px -> 60px -> 0px --- */}
            {!isMobile && (
                <div className={`border-r flex-shrink-0 transition-all duration-300 ${isDarkMode ? "border-white" : "border-black"} ${isTabletRange ? "w-[60px]" : "w-[90px]"}`} />
            )}

            <div className={`flex-1 flex flex-col min-w-0 px-10 lg:px-16 py-16 ${windowWidth > 920
                ? "pt-[90px]"
                : (windowWidth <= 920 && windowWidth > 430)
                    ? "pt-[30px]"
                    : "pt-[10px]"
                } mb-24`}>

                <div className={`flex justify-between items-end mb-8 ${isBelow920 ? "pt-10" : ""}`}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`font-bold font-['Poppins'] ${isMidRange || isMobile ? "text-3xl" : "text-4xl"}`}
                    >
                        Work <span className="text-[#4F75B0]">& Experience</span>
                    </motion.h2>

                    <div className={`flex p-1 rounded-lg border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200'}`}>
                        {["timeline", "list"].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all capitalize ${viewMode === mode ? 'bg-[#4F75B0] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    {/* SCROLL TEXT: Penyesuaian posisi responsif */}
                    {viewMode === "timeline" && (
                        <div className={`absolute pointer-events-none z-[60] transition-all ${isMobile ? "bottom-[-10px] right-[-10px]" : "bottom-[-20px] right-[-20px]"}`}>
                            <img
                                src={isDarkMode ? "/images/Scroll_text_dark.png" : "/images/Scroll_text_light.png"}
                                alt="Scroll Journey"
                                className={`${isMobile ? "w-32" : "w-40 lg:w-48"} object-contain opacity-60`}
                            />
                        </div>
                    )}

                    <div ref={containerRef} className={`relative border ${isDarkMode ? 'border-white/10' : 'border-black/10'} rounded-2xl transition-all duration-500 overflow-hidden ${viewMode === 'list' ? 'h-auto max-h-[600px] overflow-y-auto' : 'h-[400px] bg-zinc-500/5'}`}>
                        {viewMode === "timeline" ? (
                            <>
                                <motion.div className="absolute top-0 left-0 flex border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'} backdrop-blur-md z-30" style={{ x: translateX }}>
                                    {timelineItems.map((item, i) => (
                                        <div key={i} className="flex-shrink-0 py-4 flex flex-col items-center" style={{ width: ITEM_WIDTH }}>
                                            <span className={`text-sm font-bold uppercase tracking-widest mb-1 ${item.month === "Jan" ? "text-[#4F75B0]" : "opacity-0"}`}>{item.year}</span>
                                            <span className={`text-xs font-bold ${isDarkMode ? 'text-white/40' : 'text-black/30'}`}>{item.month}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.div className="absolute top-0 left-0" animate={{ x: translateX, y: translateY }} transition={{ type: "spring", damping: 25, stiffness: 100 }} style={{ width: totalWidth, height: CONTAINER_HEIGHT }}>
                                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                                        <path ref={svgRef} d={pathData} fill="none" stroke="transparent" />
                                        <path d={pathData} fill="none" stroke={isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} strokeWidth="4" strokeLinecap="round" />
                                        <motion.path d={pathData} fill="none" stroke="#4F75B0" strokeWidth="4" strokeLinecap="round" style={{ pathLength: animatedProgress }} />
                                    </svg>

                                    {experiencePositions.map((exp) => (
                                        <div key={exp.id} className="absolute flex items-center group" style={{ left: exp.x, top: exp.y }}>
                                            <div className="w-4 h-4 bg-white border-[3px] border-[#4F75B0] rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-sm" />
                                            <motion.div className={`ml-6 flex items-center gap-3 px-4 py-3 rounded-xl border min-w-[280px] shadow-sm transition-all ${isDarkMode ? "bg-[#0A0A0A] border-white/10 text-white" : "bg-white border-black/5 text-black"}`} whileHover={{ scale: 1.02 }}>
                                                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg bg-white p-1 border border-black/5">
                                                    <img src={exp.logoPath} alt={exp.company} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-sm truncate font-['Poppins']">{exp.title}</h4>
                                                    <p className="text-[11px] font-semibold opacity-80 flex items-center gap-2 truncate">
                                                        <span className={`w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] ${isDarkMode ? 'border-b-white' : 'border-b-black'}`} /> {exp.company}
                                                    </p>
                                                    <p className="text-[10px] mt-0.5 opacity-40">{exp.startDate} – {formatFinishDate(exp.date)}</p>
                                                </div>
                                            </motion.div>
                                        </div>
                                    ))}
                                </motion.div>

                                <div className="absolute bottom-4 right-6 bg-[#4F75B0] text-white px-3 py-1 rounded-full text-[10px] font-black z-40 shadow-md">
                                    {Math.round(progress.get() * 100)}% JOURNEY
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3 p-6">
                                {experiences.slice().reverse().map((exp) => (
                                    <motion.div
                                        key={exp.id}
                                        layout // Penting agar baris lain bergeser mulus saat satu baris memanjang
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex flex-col p-4 rounded-xl border transition-all ${isDarkMode ? "bg-zinc-900/40 border-white/5 hover:border-white/20" : "bg-gray-50 border-black/5 hover:border-black/10"
                                            }`}
                                    >
                                        {/* Header Baris: Selalu Muncul */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center p-1.5 border border-black/5">
                                                    <img src={exp.logoPath} alt={exp.company} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="font-bold text-sm lg:text-base leading-tight">{exp.title}</h3>
                                                    <span className="text-[10px] lg:text-[12px] opacity-60 font-medium">{exp.company}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end">
                                                <div className="text-[10px] lg:text-[12px] font-bold opacity-60 font-mono">
                                                    {exp.startDate} - {formatFinishDate(exp.date)}
                                                </div>
                                                <button
                                                    onClick={() => toggleExpand(exp.id)}
                                                    className="text-[11px] lg:text-[13px] font-bold text-[#4F75B0] hover:underline transition-all"
                                                >
                                                    {expandedId === exp.id ? "Close Detail" : "Show Detail"}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Bagian Deskripsi: Hanya muncul jika expandedId cocok */}
                                        <AnimatePresence>
                                            {expandedId === exp.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="mt-4 pt-4 border-t border-gray-800/10 text-xs lg:text-sm leading-relaxed opacity-70 font-['Poppins']">
                                                        {exp.desc}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkExperience_Section;