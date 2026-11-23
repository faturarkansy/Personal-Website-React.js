import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";

const PROFESSIONAL_COMPANIES = new Set([
  "Nusantara Sakti Group",
  "Ariftama Tekindo",
  "DPMPPTSP Lampung Selatan",
  "Init Visual Experia (INVIX)",
  "Gink Technology",
  "Sejahtera Perkasa Energi",
]);

const PROFESSIONAL_DESCRIPTIONS = {
  "Nusantara Sakti Group": (
    <div>
      <p className="font-bold mb-2 text-[12px] lg:text-[14px]">
        Activity details :{" "}
      </p>
      <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
        <li>
          Developed a Dealer Group Integration system using APIs to synchronize
          multi-branch data, ensuring seamless business workflows and real-time
          data availability across all company branches in Indonesia.
        </li>
        <li>
          Performed company&apos;s Enterprise Resource Planning (ERP) system
          maintenance, troubleshooting, testing, and enhancements to ensure
          application reliability and performance, including streamlining core
          accounting and financial workflow processes.
        </li>
      </ul>
    </div>
  ),
  "Ariftama Tekindo": (
    <div>
      <p className="font-bold mb-2 text-[12px] lg:text-[14px]">
        Activity details :{" "}
      </p>
      <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
        <li>
          Architected and developed a full-stack e-commerce mobile application
          using Flutter and Express JS following the Extreme-Programming (XP)
          methodology, streamlining core checkout workflows and payment gateways
          to enhance transaction speed.
        </li>
        <li>
          Ensured high backend reliability by executing 277 Jest unit tests with
          a 100% pass rate, achieving over 80% function coverage on critical
          modules.
        </li>
      </ul>
    </div>
  ),
  "DPMPPTSP Lampung Selatan": (
    <div>
      <p className="font-bold mb-2 text-[12px] lg:text-[14px]">
        Activity details :{" "}
      </p>
      <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
        <li>
          Engineered an interactive GIS (Geographic Information System) portal
          using CodeIgniter 4 and Leaflet to map regional investment and
          potential points across South Lampung for improving external investor
          engagement and site navigation clarity.
        </li>
        <li>
          Enhanced GIS spatial query execution by implementing spatial indexing,
          reducing server response times by 40% during multilayer spatial
          analysis requests.
        </li>
      </ul>
    </div>
  ),
  "Init Visual Experia (INVIX)": (
    <div>
      <p className="font-bold mb-2 text-[12px] lg:text-[14px]">
        Activity details :{" "}
      </p>
      <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
        <li>
          Developed responsive web frontend interfaces for core company products
          and multiple client projects using React.js and integrating RESTful
          APIs to ensure smooth data synchronization.
        </li>
        <li>
          Supported the preparation of Software Requirement Specifications (SRS)
          and project documentation by assisting in mapping core business
          workflows into actionable technical specifications for the development
          team.
        </li>
      </ul>
    </div>
  ),
  "Gink Technology": (
    <div>
      <p className="font-bold mb-2 text-[12px] lg:text-[14px]">
        Activity details :{" "}
      </p>
      <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
        <li>
          Engineered an automated real-time student attendance monitoring system
          using Laravel (MVC architecture) and NFC hardware integration,
          featuring real-time parent notification endpoints to deliver instant
          daily check-in alerts.
        </li>
        <li>
          Achieved 100% data logging accuracy for daily student check-ins by
          implementing Unit and Integration Testing to validate API payloads and
          database writes, eliminating manual data entry bottlenecks for
          administrative staff.
        </li>
      </ul>
    </div>
  ),
  "Sejahtera Perkasa Energi": (
    <div>
      <p className="font-bold mb-2 text-[12px] lg:text-[14px]">
        Activity details :{" "}
      </p>
      <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
        <li>
          Built a secure, high-performance web monitoring dashboard for
          corporate administrators using React JS and Firebase under the Scrum
          framework.
        </li>
        <li>
          Successfully integrated web-based admin tools with existing React
          Native mobile apps, enabling real-time data synchronization and
          minimizing operational reporting delays by 15%.
        </li>
      </ul>
    </div>
  ),
};

const parseExpDateValue = (dateStr) => {
  if (!dateStr || dateStr === "Present") return Number.MAX_SAFE_INTEGER;
  const parsed = new Date(`${dateStr}-01`).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const baseExperiences = [
  {
    id: 12,
    date: "2024-03",
    startDate: "Feb 2023",
    title: "Extra-Campus Divison Staff",
    company: "HMIF ITERA",
    logoPath: "/images/HMIF.png",
    desc: (
      <div>
        <p className="font-bold mb-2 text-[12px] lg:text-[14px]">
          Activity details :{" "}
        </p>
        <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
          <li>
            Establishing relationships with the Lampung Province Communication
            and Information Office.
          </li>
          <li>
            Establishing relationships with the Student Association in the
            Lampung Province in Permikomnas (National Informatics and Computer
            Students Association) Region 15.
          </li>
          <li>Establishing relationships with the Hactiv8 Company.</li>
          <li>
            Establishing relationships with Universities in the Java region
            (Pertamina University, Pancasila University).
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 11,
    date: "2024-05",
    startDate: "Feb 2024",
    title: "Frontend Developer",
    company: "Sejahtera Perkasa Energi",
    logoPath: "/images/Sejahtera_Perkasa_Energi.png",
  },
  {
    id: 10,
    date: "2024-08",
    startDate: "Jul 2024",
    title: "Backend Developer Intern",
    company: "Gink Technology",
    logoPath: "/images/Gink.jpg",
  },
  {
    id: 9,
    date: "2024-11",
    startDate: "Aug 2024",
    title: "IT Support PKM Desa Tulung Kakan",
    company: "LPPM ITERA",
    logoPath: "/images/ITERA_LPPM.png",
    desc: (
      <div>
        <p className="font-bold mb-2 text-[12px] lg:text-[14px]">
          Activity details :{" "}
        </p>
        <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
          <li>
            Focused on the optimization of WebGIS to support the development of
            a Smart Village in Kampung Tulung Kakan, Lampung Tengah.
          </li>
          <li>
            Assisted in improving digital infrastructure and promoting
            technology adoption within the local community.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 8,
    date: "2024-12",
    startDate: "Aug 2024",
    title: "IT Project Assistant",
    company: "ITERA Informatics Engineering",
    logoPath: "/images/Informatika.png",
    desc: "Membantu koordinasi proyek pengembangan sistem informasi internal jurusan serta memastikan timeline berjalan sesuai target.",
  },
  {
    id: 7,
    date: "2024-12",
    startDate: "Aug 2024",
    title: "Information Systems Assistant",
    company: "ITERA Informatics Engineering",
    logoPath: "/images/Informatika.png",
    desc: "Mengelola basis data akademik dan memberikan asisten teknis dalam penggunaan sistem informasi bagi mahasiswa dan dosen.",
  },
  {
    id: 6,
    date: "2025-06",
    startDate: "Feb 2025",
    title: "SWE Fundamentals Assistant",
    company: "ITERA Informatics Engineering",
    logoPath: "/images/Informatika.png",
    desc: "Menjadi asisten praktikum mata kuliah dasar rekayasa perangkat lunak, membimbing mahasiswa dalam pemahaman SDLC dan Git.",
  },
  {
    id: 5,
    date: "2025-06",
    startDate: "Feb 2025",
    title: "Data Visualization Assistant",
    company: "ITERA Informatics Engineering",
    logoPath: "/images/Informatika.png",
    desc: "Membimbing mahasiswa dalam mengolah data kompleks menjadi visualisasi interaktif menggunakan library seperti D3.js dan ApexCharts.",
  },
  {
    id: 4,
    date: "2025-06",
    startDate: "Aug 2024",
    title: "Frontend Developer Intern",
    company: "Init Visual Experia (INVIX)",
    logoPath: "/images/Invix.png",
  },
  {
    id: 3,
    date: "2025-09",
    startDate: "Mar 2025",
    title: "Full Stack Developer",
    company: "DPMPPTSP Lampung Selatan",
    logoPath: "/images/DPMPPTSP_Lamsel.png",
  },
  {
    id: 2,
    date: "2025-12",
    startDate: "Feb 2025",
    title: "Surveyor Tracer Study",
    company: "Karir & Alumni ITERA",
    logoPath: "/images/Karir_Alumni_ITERA.png",
    desc: (
      <div>
        <p className="font-bold mb-2 text-[12px] lg:text-[14px]">
          Activity details :{" "}
        </p>
        <ul className="list-disc ml-4 space-y-1 text-[12px] lg:text-[14px]">
          <li>
            <b>Collecting and analyzing data on alumni employment</b> to assess
            the curriculum&apos;s alignment with industry needs.
          </li>
          <li>
            Data collection and analysis were conducted for several graduation
            periods within the past year.
          </li>
          <li>
            Assisting with the implementation of events organized by Itera
            alumni careers.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 1,
    date: "2026-01",
    startDate: "Jun 2025",
    title: "Full Stack Developer",
    company: "Ariftama Tekindo",
    logoPath: "/images/Ariftama_Tekindo.png",
  },
  {
    id: 13,
    date: "Present",
    startDate: "Jul 2026",
    title: "Programmer Junior",
    company: "Nusantara Sakti Group",
    logoPath: "/images/Nusantara_Sakti.jpg",
  },
]
  .map((exp) => ({
    ...exp,
    desc: PROFESSIONAL_DESCRIPTIONS[exp.company] ?? exp.desc,
  }))
  .sort((a, b) => parseExpDateValue(a.date) - parseExpDateValue(b.date));

const professionalExperiences = baseExperiences
  .filter((exp) => PROFESSIONAL_COMPANIES.has(exp.company))
  .map((exp) => ({
    ...exp,
    id: `pro-${exp.id}`,
  }));

const orgVolunteerExperiences = baseExperiences
  .filter((exp) => !PROFESSIONAL_COMPANIES.has(exp.company))
  .map((exp) => ({
    ...exp,
    id: `org-${exp.id}`,
  }));

const SWITCH_OPTIONS = [
  { key: "professional", label: "Professional" },
  { key: "org-volunteer", label: "Org/Volunteer" },
  { key: "timeline", label: "Timeline" },
];

const ITEM_WIDTH = 180;
const ROW_HEIGHT = 110;
const CONTAINER_HEIGHT = 900;

function ExperienceListView({
  experiences,
  isDarkMode,
  expandedId,
  toggleExpand,
  formatFinishDate,
  isMobile,
}) {
  const listWrapperRef = useRef(null);
  const firstCardRef = useRef(null);
  const lastCardRef = useRef(null);
  const [lineMetrics, setLineMetrics] = useState({ top: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: listWrapperRef,
    offset: ["start center", "end center"],
  });

  // Garis biru penuh di dasar; lapisan abu-abu tumbuh dari 0% ke 100% dari atas ke bawah saat di-scroll
  const pastGrayHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const orderedExperiences = useMemo(
    () => experiences.slice().reverse(),
    [experiences],
  );

  useEffect(() => {
    const updateLinePosition = () => {
      const wrapperEl = listWrapperRef.current;
      const firstEl = firstCardRef.current;
      const lastEl = lastCardRef.current;
      if (!wrapperEl || !firstEl || !lastEl) return;

      const wrapperRect = wrapperEl.getBoundingClientRect();
      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();

      const startCenterY =
        firstRect.top - wrapperRect.top + firstRect.height / 2;
      const endCenterY = lastRect.top - wrapperRect.top + lastRect.height / 2;

      setLineMetrics({
        top: Math.max(0, startCenterY),
        height: Math.max(0, endCenterY - startCenterY),
      });
    };

    updateLinePosition();

    const resizeObserver = new ResizeObserver(updateLinePosition);
    if (listWrapperRef.current) resizeObserver.observe(listWrapperRef.current);
    if (firstCardRef.current) resizeObserver.observe(firstCardRef.current);
    if (lastCardRef.current) resizeObserver.observe(lastCardRef.current);

    window.addEventListener("resize", updateLinePosition);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLinePosition);
    };
  }, [orderedExperiences.length, expandedId, isMobile]);

  return (
    <div
      ref={listWrapperRef}
      className="relative h-auto px-0 sm:px-8 py-4 sm:py-6"
    >
      <div className="relative max-w-4xl mx-auto">
        {/* Garis Vertikal Penghubung: Hanya dari tengah kartu pertama (atas) ke tengah kartu terakhir (bawah) */}
        {lineMetrics.height > 0 && (
          <div
            aria-hidden="true"
            style={{
              top: `${lineMetrics.top}px`,
              height: `${lineMetrics.height}px`,
            }}
            className="pointer-events-none left-1/2 -translate-x-1/2 w-[2px] z-0 absolute"
          >
            {/* Warna biru full */}
            <div className="w-full h-full bg-[#4F75B0]" />

            {/* Warna abu-abu dari atas ke bawah (kilas balik pengalaman yang telah lalu) */}
            <motion.div
              style={{ height: pastGrayHeight }}
              className={`absolute top-0 left-0 w-full ${
                isDarkMode ? "bg-zinc-500/80" : "bg-gray-400"
              }`}
            />
          </div>
        )}

        <div className="relative z-10 flex flex-col gap-5">
          {orderedExperiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            const isExpanded = expandedId === exp.id;
            const zigzagOffset = isMobile ? 0 : isEven ? -28 : 28;
            const isFirst = idx === 0;
            const isLast = idx === orderedExperiences.length - 1;

            return (
              <motion.div
                key={exp.id}
                ref={isFirst ? firstCardRef : isLast ? lastCardRef : null}
                layout
                initial={{ opacity: 0, y: 14, x: zigzagOffset }}
                animate={{ opacity: 1, y: 0, x: zigzagOffset }}
                transition={{ duration: 0.3 }}
                className="w-full sm:w-[68%] md:w-[58%] lg:w-[52%] mx-auto"
              >
                <div
                  onClick={() => toggleExpand(exp.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleExpand(exp.id);
                    }
                  }}
                  className={`flex flex-col p-4 sm:p-5 rounded-2xl border shadow-sm cursor-pointer transition-all ${
                    isDarkMode
                      ? "bg-[#0A0A0A] border-white/10 hover:border-white/25 text-white"
                      : "bg-white border-black/10 hover:border-black/20 text-black"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl bg-white flex items-center justify-center p-1.5 border border-black/10">
                        <img
                          src={exp.logoPath}
                          alt={exp.company}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <h3 className="font-bold text-sm sm:text-base leading-snug font-['Poppins']">
                          {exp.company}
                        </h3>
                        <p className="text-xs font-semibold text-[#4F75B0] mt-0.5">
                          {exp.title}
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs opacity-65 mt-1">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>
                            {exp.startDate} - {formatFinishDate(exp.date)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(exp.id);
                      }}
                      aria-label={
                        isExpanded ? "Collapse detail" : "Expand detail"
                      }
                      className="p-1.5 rounded-lg opacity-65 hover:opacity-100 transition-all flex-shrink-0"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          className={`mt-4 pt-3.5 border-t text-xs sm:text-sm leading-relaxed opacity-80 font-['Poppins'] ${
                            isDarkMode ? "border-white/10" : "border-black/10"
                          }`}
                        >
                          {exp.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const WorkExperience_Section = ({ isDarkMode }) => {
  const [viewMode, setViewMode] = useState("professional");
  const [expandedId, setExpandedId] = useState(null);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    const end = new Date("2026-12-01");
    while (curr <= end) {
      items.push({
        month: curr.toLocaleString("default", { month: "short" }),
        year: curr.getFullYear(),
        key: `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, "0")}`,
      });
      curr.setMonth(curr.getMonth() + 1);
    }
    return items;
  }, []);

  const totalWidth = timelineItems.length * ITEM_WIDTH;

  const experiencePositions = useMemo(() => {
    return baseExperiences.map((exp, index) => {
      const monthIndex = timelineItems.findIndex((m) => m.key === exp.date);
      const safeMonthIndex =
        monthIndex >= 0 ? monthIndex : timelineItems.length - 1;
      const yPos = CONTAINER_HEIGHT - (index + 1) * ROW_HEIGHT;
      return {
        ...exp,
        x: safeMonthIndex * ITEM_WIDTH + ITEM_WIDTH / 2,
        y: yPos,
      };
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

  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    if (viewMode !== "timeline" || !e.touches?.[0]) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (viewMode !== "timeline" || !e.touches?.[0]) return;
    if (e.cancelable) e.preventDefault();

    const touch = e.touches[0];
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaX = touch.clientX - touchStartRef.current.x;
    const dominantDelta =
      Math.abs(deltaY) >= Math.abs(deltaX) ? deltaY : deltaX;
    const sensitivity = 0.0025;

    progress.set(
      Math.min(1, Math.max(0, progress.get() - dominantDelta * sensitivity)),
    );
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  useEffect(() => {
    const handleWheel = (e) => {
      if (viewMode !== "timeline" || !containerRef.current?.contains(e.target))
        return;
      e.preventDefault();
      const delta = e.deltaY * 0.0006;
      progress.set(Math.min(1, Math.max(0, progress.get() - delta)));
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [progress, viewMode]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
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
    if (!dateStr || dateStr === "Present") return "Present";
    const d = new Date(dateStr + "-01");
    return d.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const isListMode =
    viewMode === "professional" || viewMode === "org-volunteer";

  return (
    <div
      className={`w-full h-auto bg-transparent flex transition-colors duration-300 font-sans ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {/* --- LEFT SIDEBAR --- */}
      {!isMobile && (
        <div
          className={`border-r flex-shrink-0 transition-all duration-300 ${
            isDarkMode ? "border-white" : "border-black"
          } ${isTabletRange ? "w-[60px]" : "w-[90px]"}`}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 px-6 sm:px-10 lg:px-16 py-24 mb-8">
        <div
          className={`flex mb-8 ${
            isMobile
              ? "flex-col items-center text-center gap-4"
              : "flex-row justify-between items-end gap-4"
          } ${isBelow920 ? "pt-10" : ""}`}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`font-bold font-['Poppins'] ${
              isMidRange || isMobile ? "text-3xl" : "text-4xl"
            } ${isMobile ? "text-center" : ""}`}
          >
            Work <span className="text-[#4F75B0]">& Experience</span>
          </motion.h2>

          <div
            className={`flex flex-wrap justify-center p-1 rounded-lg border ${
              isMobile ? "w-fit mx-auto" : ""
            } ${
              isDarkMode
                ? "bg-zinc-900 border-zinc-800"
                : "bg-gray-100 border-gray-200"
            }`}
          >
            {SWITCH_OPTIONS.map((option) => (
              <button
                key={option.key}
                onClick={() => setViewMode(option.key)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all ${
                  viewMode === option.key
                    ? "bg-[#4F75B0] text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-auto">
          {viewMode === "timeline" && (
            <div
              className={`absolute pointer-events-none z-[60] transition-all ${
                isMobile
                  ? "bottom-[-10px] right-[-10px]"
                  : "bottom-[-20px] right-[-20px]"
              }`}
            >
              <img
                src={
                  isDarkMode
                    ? "/images/Scroll_text_dark.png"
                    : "/images/Scroll_text_light.png"
                }
                alt="Scroll Journey"
                className={`${isMobile ? "w-32" : "w-40 lg:w-48"} object-contain opacity-60`}
              />
            </div>
          )}

          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className={`relative transition-all duration-500 ${
              isListMode
                ? "h-auto bg-transparent"
                : `border ${
                    isDarkMode ? "border-white/10" : "border-black/10"
                  } rounded-2xl overflow-hidden h-[400px] bg-zinc-500/5 touch-none`
            }`}
          >
            {viewMode === "timeline" ? (
              <>
                <motion.div
                  className={`absolute top-0 left-0 flex border-b ${
                    isDarkMode ? "border-white/10" : "border-black/10"
                  } backdrop-blur-md z-30`}
                  style={{ x: translateX }}
                >
                  {timelineItems.map((item, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 py-4 flex flex-col items-center"
                      style={{ width: ITEM_WIDTH }}
                    >
                      <span
                        className={`text-sm font-bold uppercase tracking-widest mb-1 ${
                          item.month === "Jan" ? "text-[#4F75B0]" : "opacity-0"
                        }`}
                      >
                        {item.year}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          isDarkMode ? "text-white/40" : "text-black/30"
                        }`}
                      >
                        {item.month}
                      </span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  className="absolute top-0 left-0"
                  animate={{ x: translateX, y: translateY }}
                  transition={{ type: "spring", damping: 25, stiffness: 100 }}
                  style={{ width: totalWidth, height: CONTAINER_HEIGHT }}
                >
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                    <path
                      ref={svgRef}
                      d={pathData}
                      fill="none"
                      stroke="transparent"
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke={
                        isDarkMode
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(0,0,0,0.03)"
                      }
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <motion.path
                      d={pathData}
                      fill="none"
                      stroke="#4F75B0"
                      strokeWidth="4"
                      strokeLinecap="round"
                      style={{ pathLength: animatedProgress }}
                    />
                  </svg>

                  {experiencePositions.map((exp) => (
                    <div
                      key={exp.id}
                      className="absolute flex items-center group"
                      style={{ left: exp.x, top: exp.y }}
                    >
                      <div className="w-4 h-4 bg-white border-[3px] border-[#4F75B0] rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-sm" />
                      <motion.div
                        className={`ml-6 flex items-center gap-3 px-4 py-3 rounded-xl border min-w-[280px] shadow-sm transition-all ${
                          isDarkMode
                            ? "bg-[#0A0A0A] border-white/10 text-white"
                            : "bg-white border-black/5 text-black"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg bg-white p-1 border border-black/5">
                          <img
                            src={exp.logoPath}
                            alt={exp.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="font-bold text-sm leading-snug font-['Poppins']">
                            {exp.company}
                          </h3>
                          <p className="text-xs font-semibold text-[#4F75B0]">
                            {exp.title}
                          </p>
                          <div className="inline-flex items-center gap-1.5 text-[11px] opacity-65 mt-1">
                            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>
                              {exp.startDate} - {formatFinishDate(exp.date)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </>
            ) : (
              <ExperienceListView
                experiences={
                  viewMode === "professional"
                    ? professionalExperiences
                    : orgVolunteerExperiences
                }
                isDarkMode={isDarkMode}
                expandedId={expandedId}
                toggleExpand={toggleExpand}
                formatFinishDate={formatFinishDate}
                isMobile={isMobile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience_Section;
