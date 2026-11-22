import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpFromLine,
  ExternalLink,
  FolderGit2,
  GitCommitHorizontal,
} from "lucide-react";
import { getGithubActivity } from "./services/github_activity";

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function toDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function buildHeatmapWeeks(calendar = {}) {
  const today = startOfDay(new Date());
  const end = new Date(today);
  const day = end.getDay();
  end.setDate(end.getDate() + (6 - day));

  const start = new Date(end);
  start.setDate(start.getDate() - 52 * 7 + 1);
  start.setDate(start.getDate() - start.getDay());

  const weeks = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(cursor);
      const key = toDateKey(date);
      week.push({ date, key, count: calendar[key] ?? 0 });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

function scaleMax(counts) {
  const nonzero = counts.filter((c) => c > 0).sort((a, b) => a - b);
  if (!nonzero.length) return 1;
  const p90 = nonzero[Math.floor((nonzero.length - 1) * 0.9)] ?? 1;
  return Math.max(p90, 1);
}

function intensity(count, max) {
  if (count <= 0 || max <= 0) return 0;
  const ratio = Math.log1p(count) / Math.log1p(max);
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function formatNumber(n) {
  return new Intl.NumberFormat("en-US").format(n ?? 0);
}

function GithubMark({ className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  delay,
  isDarkMode,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: "some" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`p-4 sm:p-6 rounded-2xl border transition-colors ${
        isDarkMode
          ? "bg-zinc-900/60 border-white/10 text-white"
          : "bg-gray-50 border-black/10 text-black"
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] opacity-60">
          {label}
        </p>
        <span className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-[#4F75B0]/15 text-[#4F75B0]">
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      </div>
      <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight tabular-nums">
        {formatNumber(value)}
      </p>
    </motion.div>
  );
}

function Heatmap({ calendar, isDarkMode }) {
  const weeks = useMemo(() => buildHeatmapWeeks(calendar), [calendar]);
  const max = useMemo(
    () => scaleMax(weeks.flatMap((w) => w.map((d) => d.count))),
    [weeks],
  );

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const month = week[0]?.date.getMonth() ?? -1;
      if (month !== lastMonth) {
        labels.push({ weekIndex: i, label: MONTHS[month] });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  const levelClasses = isDarkMode
    ? [
        "bg-white/10",
        "bg-[#4F75B0]/30",
        "bg-[#4F75B0]/55",
        "bg-[#4F75B0]/80",
        "bg-[#4F75B0]",
      ]
    : [
        "bg-black/10",
        "bg-[#4F75B0]/25",
        "bg-[#4F75B0]/50",
        "bg-[#4F75B0]/75",
        "bg-[#4F75B0]",
      ];

  const cell = "h-[10px] w-[10px] sm:h-[11px] sm:w-[11px]";
  const gap = "gap-[2px] sm:gap-[3px]";
  const weekStep = 12;
  const weekStepSm = 14;

  return (
    <div className="overflow-x-auto -mx-1 px-1 touch-pan-x">
      <div className="inline-block min-w-[520px] sm:min-w-[640px]">
        <div className="relative h-4 mb-1.5 ml-7 sm:ml-8">
          {monthLabels.map((m) => (
            <span
              key={`${m.label}-${m.weekIndex}`}
              className="absolute top-0 text-[9px] sm:text-[10px] opacity-60 sm:hidden"
              style={{ left: m.weekIndex * weekStep }}
            >
              {m.label}
            </span>
          ))}
          {monthLabels.map((m) => (
            <span
              key={`sm-${m.label}-${m.weekIndex}`}
              className="absolute top-0 text-[10px] opacity-60 hidden sm:block"
              style={{ left: m.weekIndex * weekStepSm }}
            >
              {m.label}
            </span>
          ))}
        </div>

        <div className={`flex ${gap}`}>
          <div className={`flex flex-col pr-1.5 sm:pr-2 shrink-0 ${gap}`}>
            {WEEKDAYS.map((d, i) => (
              <div
                key={i}
                className="h-[10px] sm:h-[11px] w-5 sm:w-6 text-[9px] sm:text-[10px] leading-[10px] sm:leading-[11px] opacity-60"
              >
                {d}
              </div>
            ))}
          </div>

          {weeks.map((week, wi) => (
            <div key={wi} className={`flex flex-col ${gap}`}>
              {week.map((day) => {
                const level = intensity(day.count, max);
                const future = day.date > startOfDay(new Date());
                return (
                  <div
                    key={day.key}
                    title={
                      future
                        ? undefined
                        : `${day.key}: ${day.count} contribution${day.count === 1 ? "" : "s"}`
                    }
                    className={`${cell} rounded-[2px] transition-colors ${
                      future ? "bg-transparent" : levelClasses[level]
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 flex items-center justify-end gap-1.5 text-[9px] sm:text-[10px] opacity-60">
          <span>Less</span>
          {levelClasses.map((cls, i) => (
            <span key={i} className={`${cell} rounded-[2px] ${cls}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default function GithubActivity_Section({ isDarkMode }) {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    getGithubActivity("faturarkansy")
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            status: "error",
            message:
              err instanceof Error
                ? err.message
                : "Failed to load GitHub activity",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className={`w-full px-6 sm:px-10 lg:px-16 py-16 transition-colors duration-300 overflow-x-clip ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: "some" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#4F75B0]">
              Activity
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-['Poppins'] mt-1">
              GitHub <span className="text-[#4F75B0]">Activity</span>
            </h2>
          </div>

          {state.status === "ready" && (
            <a
              href={state.data.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4F75B0] hover:underline"
            >
              <GithubMark className="h-4 w-4" />@{state.data.username}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </motion.div>

        {state.status === "loading" && (
          <div className="space-y-4 animate-pulse">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-24 rounded-2xl border ${
                    i === 2 ? "col-span-2 sm:col-span-1" : ""
                  } ${
                    isDarkMode
                      ? "bg-zinc-900/40 border-white/10"
                      : "bg-gray-100 border-black/10"
                  }`}
                />
              ))}
            </div>
            <div
              className={`h-40 rounded-2xl border ${
                isDarkMode
                  ? "bg-zinc-900/40 border-white/10"
                  : "bg-gray-100 border-black/10"
              }`}
            />
          </div>
        )}

        {state.status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: "some" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? "bg-zinc-900/50 border-white/10"
                : "bg-gray-50 border-black/10"
            }`}
          >
            <p className="text-sm opacity-80">
              Gagal memuat data aktivitas GitHub saat ini.
            </p>
            <p className="mt-2 text-xs opacity-60 break-words">
              {state.message}
            </p>
          </motion.div>
        )}

        {state.status === "ready" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              <StatCard
                label="Repositories"
                value={state.data.projects}
                icon={FolderGit2}
                delay={0}
                isDarkMode={isDarkMode}
              />
              <StatCard
                label="Commits"
                value={state.data.commits}
                icon={GitCommitHorizontal}
                delay={0.05}
                isDarkMode={isDarkMode}
              />
              <StatCard
                label="Pushes"
                value={state.data.pushes}
                icon={ArrowUpFromLine}
                delay={0.1}
                isDarkMode={isDarkMode}
                className="col-span-2 sm:col-span-1"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: "some" }}
              transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
              className={`p-4 sm:p-6 rounded-2xl border ${
                isDarkMode
                  ? "bg-zinc-900/60 border-white/10"
                  : "bg-gray-50 border-black/10"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-5">
                <div>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] opacity-60">
                    Contribution activity
                  </p>
                  <p className="mt-1 text-xs sm:text-sm opacity-70">
                    Last 12 months on GitHub
                  </p>
                </div>
              </div>

              <Heatmap calendar={state.data.calendar} isDarkMode={isDarkMode} />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
