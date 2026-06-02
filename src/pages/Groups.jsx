import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import groupsData from "../data/groups.json";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function GroupCard({ group }) {
  const sorted = [...group.teams].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    return b.gf - a.gf;
  });

  const getRowStyle = (idx) => {
    if (idx < 2) return { borderLeft: "3px solid #22c55e" };
    return { borderLeft: "3px solid transparent" };
  };

  const GDIcon = ({ gd }) => {
    if (gd > 0) return <span className="text-green-400 text-xs">+{gd}</span>;
    if (gd < 0) return <span className="text-red-400 text-xs">{gd}</span>;
    return <span className="text-slate-500 text-xs">0</span>;
  };

  return (
    <motion.div variants={itemVariants} className="glass-card overflow-hidden">
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{
          background: "rgba(245,158,11,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="font-display text-xl" style={{ color: "#f59e0b" }}>
          Group {group.id}
        </span>
        <span className="badge badge-gold text-xs">
          {group.teams.length} Teams
        </span>
      </div>
      <div className="table-scroll">
        <table className="w-full text-sm">
          <thead>
            <tr
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                color: "var(--color-text-muted)",
              }}
            >
              <th className="text-left px-3 py-2 font-medium text-xs">Team</th>
              <th className="px-2 py-2 font-medium text-xs text-center">MP</th>
              <th className="px-2 py-2 font-medium text-xs text-center">W</th>
              <th className="px-2 py-2 font-medium text-xs text-center">D</th>
              <th className="px-2 py-2 font-medium text-xs text-center">L</th>
              <th className="px-2 py-2 font-medium text-xs text-center">GD</th>
              <th className="px-2 py-2 font-medium text-xs text-center">PTS</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((team, idx) => (
              <tr
                key={team.id}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  ...getRowStyle(idx),
                }}
                className="hover:bg-white/5 transition-colors"
              >
                <td className="px-3 py-2.5">
                  <Link
                    to={`/teams/${team.id}`}
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                  >
                    <span className="text-xl leading-none">{team.flag}</span>
                    <span className="font-medium truncate max-w-[100px]">
                      {team.name}
                    </span>
                    {idx < 2 && (
                      <span className="badge badge-green text-xs hidden sm:inline-flex">
                        ADV
                      </span>
                    )}
                  </Link>
                </td>
                <td
                  className="px-2 py-2.5 text-center"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {team.mp}
                </td>
                <td className="px-2 py-2.5 text-center text-green-400">
                  {team.w}
                </td>
                <td
                  className="px-2 py-2.5 text-center"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {team.d}
                </td>
                <td className="px-2 py-2.5 text-center text-red-400">
                  {team.l}
                </td>
                <td className="px-2 py-2.5 text-center">
                  <GDIcon gd={team.gd} />
                </td>
                <td
                  className="px-2 py-2.5 text-center font-bold"
                  style={{ color: "#f59e0b" }}
                >
                  {team.pts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState("ALL");
  const groups =
    selectedGroup === "ALL"
      ? groupsData
      : groupsData.filter((g) => g.id === selectedGroup);

  return (
    <div className="py-10">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="section-title gold-text mb-2">Group Stage</h1>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            12 Groups · 48 Teams · Top 2 advance to Round of 32
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-6 flex-wrap"
        >
          <div className="flex items-center gap-2 text-xs">
            <div
              className="w-3 h-4 rounded-sm"
              style={{ background: "#22c55e" }}
            />
            <span style={{ color: "var(--color-text-muted)" }}>
              Advances to Round of 32
            </span>
          </div>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          <button
            onClick={() => setSelectedGroup("ALL")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedGroup === "ALL" ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/40" : "border border-white/10 text-slate-400 hover:border-white/20"}`}
          >
            All Groups
          </button>
          {groupsData.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGroup(g.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedGroup === g.id ? "bg-yellow-400/20 text-yellow-400 border border-yellow-400/40" : "border border-white/10 text-slate-400 hover:border-white/20"}`}
            >
              Group {g.id}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
