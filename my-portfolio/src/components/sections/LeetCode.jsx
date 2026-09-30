import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ExternalLink, AlertCircle, RefreshCw } from "lucide-react";
import FadeIn from "../ui/FadeIn";

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────
const LEETCODE_USERNAME = "jainmayukh";
const PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}`;

// Dev: Vite proxy → leetcode.com/graphql. Prod (Vercel): /api/leetcode serverless proxy.
const GRAPHQL_URL = import.meta.env.DEV ? "/leetcode-api" : "/api/leetcode";

// Shared style tokens (one accent: amber. Difficulty colors are semantic only.)
const PANEL = "rounded-2xl border border-white/10 bg-white/[0.02]";
const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400";

// ─────────────────────────────────────────────────────────────
// GRAPHQL
// ─────────────────────────────────────────────────────────────
const USER_STATS_QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      username
      profile { realName userAvatar reputation ranking }
      badges { id displayName icon creationDate }
      submitStats: submitStatsGlobal {
        acSubmissionNum { difficulty count submissions }
      }
      submissionCalendar
      userCalendar { activeYears streak totalActiveDays submissionCalendar }
    }
    allQuestionsCount { difficulty count }
    userContestRanking(username: $username) {
      attendedContestsCount rating globalRanking topPercentage
    }
    userContestRankingHistory(username: $username) {
      attended trendDirection problemsSolved ranking rating
      contest { title startTime }
    }
  }
`;

const normalize = (json) => {
  const user = json.data?.matchedUser;
  if (!user) throw new Error(`No LeetCode user named "${LEETCODE_USERNAME}"`);

  const stats = user.submitStats.acSubmissionNum;
  const all = json.data.allQuestionsCount;
  const contest = json.data.userContestRanking;

  const stat = (d) => stats.find((s) => s.difficulty === d) || { count: 0, submissions: 0 };
  const total = (d) => all.find((q) => q.difficulty === d)?.count || 0;

  let calendar = {};
  try {
    calendar = user.submissionCalendar ? JSON.parse(user.submissionCalendar) : {};
  } catch {
    calendar = {};
  }

  const overall = stat("All");

  return {
    username: user.username,
    avatar: user.profile.userAvatar,
    realName: user.profile.realName,

    totalSolved: overall.count,
    totalSubmissions: overall.submissions,
    totalQuestions: total("All"),

    easySolved: stat("Easy").count,
    easyTotal: total("Easy"),
    mediumSolved: stat("Medium").count,
    mediumTotal: total("Medium"),
    hardSolved: stat("Hard").count,
    hardTotal: total("Hard"),

    acceptanceRate:
      overall.submissions > 0 ? ((overall.count / overall.submissions) * 100).toFixed(1) : "0",

    contestRating: contest?.rating ?? 0,
    globalRanking: contest?.globalRanking ?? 0,
    contestsAttended: contest?.attendedContestsCount ?? 0,
    topPercentage: contest?.topPercentage ?? 0,

    contestHistory: (json.data.userContestRankingHistory || []).filter(
      (c) => c.attended && c.rating > 0 && c.problemsSolved > 0
    ),

    badges: user.badges || [],
    submissionCalendar: calendar,
    activeYears: user.userCalendar?.activeYears || [],
    streak: user.userCalendar?.streak || 0,
    totalActiveDays: user.userCalendar?.totalActiveDays || 0,
  };
};

// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────
const useLeetCodeData = () => {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));

    (async () => {
      try {
        const res = await fetch(GRAPHQL_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: USER_STATS_QUERY,
            variables: { username: LEETCODE_USERNAME },
          }),
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`Request failed (HTTP ${res.status})`);
        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0].message);
        setState({ data: normalize(json), loading: false, error: null });
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("LeetCode fetch error:", err);
        setState({ data: null, loading: false, error: err.message });
      }
    })();

    return () => ctrl.abort();
  }, [attempt]);

  return { ...state, retry: () => setAttempt((a) => a + 1) };
};

const useAnimatedCounter = (end, duration, run, reduce) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (reduce || !end) {
      setCount(end || 0);
      return;
    }
    let start;
    let frame;
    const tick = (ts) => {
      if (start === undefined) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, run, reduce]);

  return count;
};

// Measures an element's width so charts can render at real pixel size
// (keeps text crisp and readable on phones instead of scaling a fixed viewBox).
const useElementWidth = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(Math.round(el.getBoundingClientRect().width));
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return [ref, width];
};

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// ─────────────────────────────────────────────────────────────
// HERO: total solved + difficulty coverage
// ─────────────────────────────────────────────────────────────
const DifficultyRow = ({ label, solved, total, textClass, barClass, delay, inView, reduce }) => {
  const pct = total > 0 ? (solved / total) * 100 : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className={`text-sm font-medium ${textClass}`}>{label}</span>
        <span className="text-sm tabular-nums text-zinc-500">
          <span className="text-lg font-semibold text-white">{solved}</span> / {total.toLocaleString()}
        </span>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
        role="progressbar"
        aria-label={`${label} problems solved`}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={solved}
      >
        <motion.div
          className={`h-full rounded-full ${barClass}`}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
        />
      </div>
    </div>
  );
};

const Hero = ({ data }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const count = useAnimatedCounter(data.totalSolved, 1600, inView, reduce);

  const rows = [
    { label: "Easy", solved: data.easySolved, total: data.easyTotal, textClass: "text-teal-400", barClass: "bg-teal-400" },
    { label: "Medium", solved: data.mediumSolved, total: data.mediumTotal, textClass: "text-amber-400", barClass: "bg-amber-400" },
    { label: "Hard", solved: data.hardSolved, total: data.hardTotal, textClass: "text-rose-400", barClass: "bg-rose-400" },
  ];

  return (
    <div ref={ref} className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:grid-cols-12 lg:gap-0 lg:p-10">
      <div className="lg:col-span-6 lg:pr-10">
        <div className="flex items-center gap-3">
          {data.avatar && (
            <img
              src={data.avatar}
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{data.realName || data.username}</p>
            <p className="truncate text-xs text-zinc-500">@{data.username}</p>
          </div>
        </div>

        <p
          className="mt-8 text-7xl font-semibold leading-none tracking-tighter text-white tabular-nums sm:text-8xl lg:text-9xl"
          aria-hidden="true"
        >
          {count.toLocaleString()}
        </p>
        <p className="sr-only">{data.totalSolved} problems solved</p>
        <p className="mt-4 text-base text-zinc-400">
          problems solved, out of {data.totalQuestions.toLocaleString()} on LeetCode
        </p>
      </div>

      <div className="flex flex-col justify-end gap-6 border-t border-white/10 pt-8 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        {rows.map((r, i) => (
          <DifficultyRow key={r.label} {...r} delay={0.15 * i} inView={inView} reduce={reduce} />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// LEDGER: key numbers in one strip
// ─────────────────────────────────────────────────────────────
const Ledger = ({ data }) => {
  const hasContests = data.contestsAttended > 0;
  const items = [
    {
      label: "Contest rating",
      value: hasContests ? Math.round(data.contestRating) : "—",
    },
    {
      label: "Global rank",
      value: hasContests && data.globalRanking ? `#${data.globalRanking.toLocaleString()}` : "—",
      hint: hasContests && data.topPercentage ? `Top ${data.topPercentage.toFixed(1)}%` : "",
    },
    { label: "Contests", value: data.contestsAttended },
    { label: "Acceptance", value: `${data.acceptanceRate}%` },
    { label: "Submissions", value: data.totalSubmissions.toLocaleString() },
    {
      label: "Active days",
      value: data.totalActiveDays,
      hint: data.streak > 0 ? `${data.streak}-day streak` : "",
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((it) => (
        <div key={it.label} className="bg-zinc-950 p-4 sm:p-5">
          <dt className="text-xs text-zinc-400">{it.label}</dt>
          <dd className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums">{it.value}</dd>
          <dd className="mt-1 min-h-4 text-xs text-zinc-500">{it.hint}</dd>
        </div>
      ))}
    </dl>
  );
};

// ─────────────────────────────────────────────────────────────
// CONTEST RATING CHART (renders at real pixel width)
// ─────────────────────────────────────────────────────────────
const PAD = { top: 16, right: 16, bottom: 28, left: 44 };

const ContestGraph = ({ history, className = "" }) => {
  const reduce = useReducedMotion();
  const [wrapRef, width] = useElementWidth();
  const inView = useInView(wrapRef, { once: true, margin: "-60px" });
  const [active, setActive] = useState(null);

  const n = history.length;
  const height = width < 480 ? 200 : 260;

  const model = useMemo(() => {
    if (!width) return null;
    const chartW = Math.max(width - PAD.left - PAD.right, 1);
    const chartH = height - PAD.top - PAD.bottom;
    const ratings = history.map((c) => c.rating);
    const lo = Math.floor((Math.min(...ratings) - 25) / 50) * 50;
    const hi = Math.ceil((Math.max(...ratings) + 25) / 50) * 50;

    const pts = history.map((c, i) => ({
      x: PAD.left + (n === 1 ? chartW / 2 : (i / (n - 1)) * chartW),
      y: PAD.top + (1 - (c.rating - lo) / (hi - lo)) * chartH,
      c,
    }));

    const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
    const base = PAD.top + chartH;
    const area = `${line} L${pts[n - 1].x.toFixed(1)} ${base} L${pts[0].x.toFixed(1)} ${base} Z`;

    const yTicks = Array.from({ length: 5 }, (_, i) => ({
      v: Math.round(lo + (i / 4) * (hi - lo)),
      y: PAD.top + (1 - i / 4) * chartH,
    }));

    const labelCount = Math.max(2, Math.min(n, Math.floor(width / 96)));
    const xIdx = [
      ...new Set(
        n === 1 ? [0] : Array.from({ length: labelCount }, (_, i) => Math.round((i * (n - 1)) / (labelCount - 1)))
      ),
    ];

    return { pts, line, area, yTicks, xIdx, chartW, base, peak: Math.max(...ratings) };
  }, [history, width, height, n]);

  const fmtAxis = (t) =>
    new Date(t * 1000).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  const fmtFull = (t) =>
    new Date(t * 1000).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

  const onPointer = (e) => {
    if (!model) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - rect.left - PAD.left) / model.chartW) * (n - 1));
    setActive(clamp(i, 0, n - 1));
  };

  const onKey = (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    setActive((a) => clamp((a ?? n - 1) + dir, 0, n - 1));
  };

  const last = history[n - 1];
  const ap = model && active !== null ? model.pts[active] : null;

  return (
    <section className={`${PANEL} p-5 sm:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">Contest rating</h3>
          <p className="mt-1 text-sm text-zinc-500">
            Across {n} contest{n === 1 ? "" : "s"}
          </p>
        </div>
        <dl className="flex gap-6 text-right">
          <div>
            <dt className="text-xs text-zinc-400">Current</dt>
            <dd className="text-xl font-semibold tabular-nums text-white">{Math.round(last.rating)}</dd>
          </div>
          {model && (
            <div>
              <dt className="text-xs text-zinc-400">Peak</dt>
              <dd className="text-xl font-semibold tabular-nums text-amber-300">{Math.round(model.peak)}</dd>
            </div>
          )}
        </dl>
      </div>

      <div ref={wrapRef} className="relative mt-5 min-h-[200px]">
        {model && (
          <>
            <svg
              width={width}
              height={height}
              role="img"
              tabIndex={0}
              aria-label={`Contest rating over ${n} contests. Current ${Math.round(last.rating)}, peak ${Math.round(model.peak)}. Use left and right arrow keys to inspect each contest.`}
              className={`block touch-pan-y select-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70`}
              onPointerMove={onPointer}
              onPointerDown={onPointer}
              onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
              onKeyDown={onKey}
              onBlur={() => setActive(null)}
            >
              <defs>
                <linearGradient id="lcArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                </linearGradient>
              </defs>

              {model.yTicks.map((t) => (
                <g key={t.v}>
                  <line x1={PAD.left} x2={width - PAD.right} y1={t.y} y2={t.y} stroke="rgba(255,255,255,0.06)" />
                  <text x={PAD.left - 10} y={t.y + 3.5} textAnchor="end" fontSize="11" fill="#71717a">
                    {t.v}
                  </text>
                </g>
              ))}

              {model.xIdx.map((i, k) => (
                <text
                  key={i}
                  x={model.pts[i].x}
                  y={height - 8}
                  fontSize="11"
                  fill="#71717a"
                  textAnchor={k === 0 && n > 1 ? "start" : k === model.xIdx.length - 1 && n > 1 ? "end" : "middle"}
                >
                  {fmtAxis(model.pts[i].c.contest.startTime)}
                </text>
              ))}

              <motion.path
                d={model.area}
                fill="url(#lcArea)"
                initial={false}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
              />
              <motion.path
                d={model.line}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ pathLength: inView ? 1 : 0 }}
                transition={reduce ? { duration: 0 } : { duration: 1.4, ease: "easeOut" }}
              />

              {ap && (
                <line x1={ap.x} x2={ap.x} y1={PAD.top} y2={model.base} stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
              )}

              {/* Latest point is always marked; hovered point on demand */}
              <circle cx={model.pts[n - 1].x} cy={model.pts[n - 1].y} r="4" fill="#fbbf24" />
              {ap && <circle cx={ap.x} cy={ap.y} r="5" fill="#09090b" stroke="#fbbf24" strokeWidth="2" />}
            </svg>

            {ap && (
              <div
                className="pointer-events-none absolute z-10 w-44 rounded-xl border border-white/10 bg-zinc-900/95 px-3.5 py-3 shadow-xl backdrop-blur"
                style={{
                  left: clamp(ap.x, 88, width - 88),
                  top: ap.y - 12,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <p className="truncate text-xs font-medium text-white">{ap.c.contest.title}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{fmtFull(ap.c.contest.startTime)}</p>
                <dl className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <dt className="text-zinc-500">Rating</dt>
                    <dd className="font-semibold tabular-nums text-amber-300">{Math.round(ap.c.rating)}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Rank</dt>
                    <dd className="font-semibold tabular-nums text-white">#{ap.c.ranking.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Solved</dt>
                    <dd className="font-semibold tabular-nums text-white">{ap.c.problemsSolved}</dd>
                  </div>
                </dl>
              </div>
            )}
            <p className="sr-only" aria-live="polite">
              {ap
                ? `${ap.c.contest.title}: rating ${Math.round(ap.c.rating)}, rank ${ap.c.ranking}, ${ap.c.problemsSolved} solved`
                : ""}
            </p>
          </>
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// BADGES
// ─────────────────────────────────────────────────────────────
const Badges = ({ badges, wide }) => {
  const url = (icon) => (icon.startsWith("http") ? icon : `https://leetcode.com${icon}`);
  const fmt = (d) => {
    const date = new Date(d);
    return isNaN(date) ? "" : date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <section className={`${PANEL} p-5 sm:p-6 ${wide ? "lg:col-span-12" : "lg:col-span-4"}`}>
      <h3 className="text-base font-semibold text-white">Badges</h3>
      <p className="mt-1 text-sm text-zinc-500">{badges.length} earned</p>

      <ul
        className={`mt-5 grid gap-2 sm:grid-cols-2 ${
          wide ? "lg:grid-cols-4" : "max-h-72 overflow-y-auto pr-1 lg:grid-cols-1"
        }`}
      >
        {badges.map((b) => (
          <li
            key={b.id}
            className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
          >
            <img
              src={url(b.icon)}
              alt=""
              loading="lazy"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 object-contain"
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium leading-tight text-white">{b.displayName}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{fmt(b.creationDate)}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// SUBMISSION HEATMAP (fluid grid, real month labels)
// ─────────────────────────────────────────────────────────────
const HEAT = [
  "bg-white/[0.05]",
  "bg-amber-400/25",
  "bg-amber-400/45",
  "bg-amber-400/70",
  "bg-amber-400",
];
const heatLevel = (c) => (c === 0 ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 10 ? 3 : 4);
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const GAP = 3;

const SubmissionHeatmap = ({ submissionCalendar, activeYears }) => {
  const thisYear = new Date().getFullYear();
  const [picked, setPicked] = useState(null);
  const [hovered, setHovered] = useState(null);
  const scrollRef = useRef(null);

  const years = useMemo(() => {
    let list = activeYears?.length ? [...activeYears] : [];
    if (!list.length) {
      const set = new Set();
      Object.keys(submissionCalendar || {}).forEach((ts) => set.add(new Date(Number(ts) * 1000).getUTCFullYear()));
      list = [...set];
    }
    if (!list.length) list = [thisYear];
    return list.sort((a, b) => b - a);
  }, [activeYears, submissionCalendar, thisYear]);

  const year = picked ?? years[0];

  const { weeks, total, marks } = useMemo(() => {
    const first = new Date(year, 0, 1);
    const daysInYear = (Date.UTC(year + 1, 0, 1) - Date.UTC(year, 0, 1)) / 86400000;
    const weekCount = Math.ceil((first.getDay() + daysInYear) / 7);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const cursor = new Date(year, 0, 1 - first.getDay());
    const weeks = [];
    const marks = [];
    let total = 0;

    for (let w = 0; w < weekCount; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const inYear = cursor.getFullYear() === year;
        const ts = Math.floor(Date.UTC(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()) / 1000);
        const count = inYear ? submissionCalendar?.[ts] || 0 : 0;
        if (inYear && cursor.getDate() === 1) marks.push({ week: w, label: MONTHS[cursor.getMonth()] });
        total += count;
        week.push({
          date: new Date(cursor),
          count,
          visible: inYear && cursor <= endOfToday,
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    return { weeks, total, marks };
  }, [year, submissionCalendar]);

  // On narrow screens the grid scrolls; start at the most recent weeks
  useEffect(() => {
    const el = scrollRef.current;
    if (el && year === thisYear) el.scrollLeft = el.scrollWidth;
    else if (el) el.scrollLeft = 0;
  }, [year, thisYear, weeks.length]);

  const cols = `28px repeat(${weeks.length}, minmax(0, 1fr))`;
  const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <section className={`${PANEL} p-5 sm:p-6`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">Submissions</h3>
          <p className="mt-1 text-sm text-zinc-500">
            {total.toLocaleString()} in {year}
          </p>
        </div>

        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1" role="group" aria-label="Choose year">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setPicked(y)}
              aria-pressed={y === year}
              className={`min-h-9 shrink-0 rounded-lg border px-3.5 text-sm tabular-nums transition-colors ${FOCUS} ${
                y === year
                  ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                  : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollRef} className="-mx-1 mt-6 overflow-x-auto px-1 pb-2">
        <div className="min-w-[640px]">
          {/* Month labels, placed on the week each month actually starts */}
          <div className="mb-1.5 grid text-[11px] text-zinc-500" style={{ gridTemplateColumns: cols, columnGap: GAP }}>
            {marks.map((m) => (
              <span key={m.label} className="whitespace-nowrap" style={{ gridColumn: m.week + 2, gridRow: 1 }}>
                {m.label}
              </span>
            ))}
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: cols,
              gridTemplateRows: "repeat(7, auto)",
              gridAutoFlow: "column",
              gap: GAP,
            }}
            onPointerLeave={() => setHovered(null)}
          >
            {DAY_LABELS.map((d, i) => (
              <span key={`l${i}`} className="flex items-center pr-1 text-[10px] leading-none text-zinc-500">
                {d}
              </span>
            ))}
            {weeks.flat().map((day, i) => (
              <div
                key={i}
                onPointerEnter={() => day.visible && setHovered(day)}
                onPointerDown={() => day.visible && setHovered(day)}
                className={`aspect-square w-full rounded-[3px] ${day.visible ? HEAT[heatLevel(day.count)] : ""}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 text-xs text-zinc-500">
        <p aria-live="polite" className="min-h-4 truncate">
          {hovered
            ? `${fmt(hovered.date)}: ${hovered.count} submission${hovered.count === 1 ? "" : "s"}`
            : "Tap or hover a day for details"}
        </p>
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span>Less</span>
          {HEAT.map((c) => (
            <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────
// LOADING + ERROR
// ─────────────────────────────────────────────────────────────
const Skeleton = () => (
  <div
    role="status"
    className="mx-auto max-w-6xl animate-pulse space-y-4 motion-reduce:animate-none sm:space-y-6"
  >
    <span className="sr-only">Loading LeetCode stats</span>
    <div className="h-4 w-28 rounded bg-white/5" />
    <div className="h-12 w-72 max-w-full rounded-lg bg-white/5" />
    <div className="h-80 rounded-3xl bg-white/[0.03] lg:h-96" />
    <div className="h-40 rounded-2xl bg-white/[0.03] sm:h-28" />
    <div className="grid gap-4 lg:grid-cols-12 sm:gap-6">
      <div className="h-80 rounded-2xl bg-white/[0.03] lg:col-span-8" />
      <div className="h-80 rounded-2xl bg-white/[0.03] lg:col-span-4" />
    </div>
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="mx-auto max-w-xl py-10 text-center">
    <AlertCircle className="mx-auto h-10 w-10 text-amber-400/60" aria-hidden="true" />
    <h2 className="mt-4 text-xl font-semibold text-white">Couldn't load LeetCode stats</h2>
    <p className="mt-2 text-sm text-zinc-400">
      The request to LeetCode failed. Try again, or view the profile directly.
    </p>
    <p className="mt-2 break-words text-xs text-zinc-600">{message}</p>
    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <button
        type="button"
        onClick={onRetry}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-400 px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300 ${FOCUS}`}
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" /> Try again
      </button>
      <a
        href={PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:border-amber-400/60 hover:text-amber-300 ${FOCUS}`}
      >
        View profile <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────
const LeetCode = () => {
  const { data, loading, error, retry } = useLeetCodeData();

  const wrap = (children) => (
    <section id="leetcode" className="relative px-4 py-20 sm:px-6 sm:py-28">
      {children}
    </section>
  );

  if (loading) return wrap(<Skeleton />);
  if (error || !data) return wrap(<ErrorState message={error || "No data received"} onRetry={retry} />);

  const hasGraph = data.contestHistory.length > 0;
  const hasBadges = data.badges.length > 0;

  return wrap(
    <div className="mx-auto max-w-6xl">
      <FadeIn>
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-amber-400">03 / LeetCode</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Problem solving
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
              Live stats from my LeetCode account: what I've solved, how I do in contests, and how
              often I practice.
            </p>
          </div>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white transition-colors hover:border-amber-400/60 hover:text-amber-300 ${FOCUS}`}
          >
            View profile <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </header>
      </FadeIn>

      <div className="mt-10 space-y-4 sm:mt-14 sm:space-y-6">
        <Hero data={data} />
        <Ledger data={data} />

        {(hasGraph || hasBadges) && (
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-12">
            {hasGraph && (
              <ContestGraph
                history={data.contestHistory}
                className={hasBadges ? "lg:col-span-8" : "lg:col-span-12"}
              />
            )}
            {hasBadges && <Badges badges={data.badges} wide={!hasGraph} />}
          </div>
        )}

        <SubmissionHeatmap
          submissionCalendar={data.submissionCalendar}
          activeYears={data.activeYears}
        />
      </div>
    </div>
  );
};

export default LeetCode;