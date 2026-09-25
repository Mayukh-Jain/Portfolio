import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Your LeetCode username
const LEETCODE_USERNAME = "jainmayukh";

// Public community API (github.com/alfaarghya/alfa-leetcode-api)
const API_BASE = "https://alfa-leetcode-api.onrender.com";

function useLeetCodeStats(username) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const [solvedRes, profileRes] = await Promise.all([
          fetch(`${API_BASE}/${username}/solved`),
          fetch(`${API_BASE}/${username}`),
        ]);

        if (!solvedRes.ok || !profileRes.ok) throw new Error("Request failed");

        const solved = await solvedRes.json();
        const profile = await profileRes.json();

        if (!cancelled) {
          setData({ ...solved, ranking: profile.ranking });
          setStatus("success");
        }
      } catch (err) {
        if (!cancelled) setStatus("error");
      }
    }

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { data, status };
}

function DifficultyBar({ label, solved, total, colorClass }) {
  const pct = total ? Math.min(100, (solved / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-white/70">{label}</span>
        <span className="text-white/90 font-medium">
          {solved}
          <span className="text-white/40"> / {total}</span>
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function LeetCodeStats() {
  const { data, status } = useLeetCodeStats(LEETCODE_USERNAME);

  return (
    <section id="leetcode" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-white">LeetCode</h2>
          <p className="text-white/50 mt-2">
            Live stats pulled from{" "}
            <a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-white/80 underline underline-offset-4 hover:text-white"
            >
              leetcode.com/u/{LEETCODE_USERNAME}
            </a>
          </p>
        </div>

        {status === "loading" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 animate-pulse">
            <div className="h-4 w-1/3 bg-white/10 rounded mb-6" />
            <div className="space-y-4">
              <div className="h-3 w-full bg-white/10 rounded" />
              <div className="h-3 w-full bg-white/10 rounded" />
              <div className="h-3 w-full bg-white/10 rounded" />
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-white/60">
            Couldn't load live stats right now — check back shortly, or view the
            profile directly on{" "}
            <a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              LeetCode
            </a>
            .
          </div>
        )}

        {status === "success" && data && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div>
                <div className="text-3xl font-semibold text-white">
                  {data.solvedProblem ?? data.totalSolved}
                </div>
                <div className="text-xs text-white/50 mt-1">Solved</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-white">
                  {data.acceptanceRate ? `${data.acceptanceRate.toFixed(1)}%` : "—"}
                </div>
                <div className="text-xs text-white/50 mt-1">Acceptance</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-white">
                  {data.ranking ? `#${data.ranking.toLocaleString()}` : "—"}
                </div>
                <div className="text-xs text-white/50 mt-1">Global Rank</div>
              </div>
            </div>

            <div className="space-y-5">
              <DifficultyBar
                label="Easy"
                solved={data.easySolved}
                total={data.totalEasy}
                colorClass="bg-emerald-400"
              />
              <DifficultyBar
                label="Medium"
                solved={data.mediumSolved}
                total={data.totalMedium}
                colorClass="bg-amber-400"
              />
              <DifficultyBar
                label="Hard"
                solved={data.hardSolved}
                total={data.totalHard}
                colorClass="bg-rose-400"
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
