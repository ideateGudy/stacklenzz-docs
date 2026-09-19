"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LenzzyMascotProps {
  className?: string;
}

const TELEMETRY_MESSAGES = [
  { text: "Tracking Express & NestJS in real-time ⚡", tag: "LIVE TRACE", color: "#38bdf8" },
  { text: "p99 latency 14.2ms • 0 unhandled rejections 🛡️", tag: "HEALTHY", color: "#34d399" },
  { text: "Winston logs streaming • 1,420 events/sec 📊", tag: "LOG ENGINE", color: "#818cf8" },
  { text: "Prometheus metrics exported at /metrics 🚀", tag: "PROMETHEUS", color: "#fbbf24" },
  { text: "Cluster worker health: 100% operational 💚", tag: "MONITOR", color: "#10b981" },
];

export function LenzzyMascot({ className = "" }: LenzzyMascotProps) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [clickReactions, setClickReactions] = useState(0);

  // Rotate telemetry status message every 3.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % TELEMETRY_MESSAGES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Periodic eye blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleMascotClick = () => {
    setIsScanning(true);
    setClickReactions((prev) => prev + 1);
    setMsgIndex((prev) => (prev + 1) % TELEMETRY_MESSAGES.length);
    setTimeout(() => setIsScanning(false), 1200);
  };

  const currentMsg = TELEMETRY_MESSAGES[msgIndex];

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* Floating HUD Telemetry Speech Capsule */}
      <AnimatePresence mode="wait">
        <motion.div
          key={msgIndex}
          initial={{ opacity: 0, y: 6, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.94 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute -top-10 sm:-top-11 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap"
        >
          <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-white/15 backdrop-blur-md shadow-[0_8px_25px_-5px_rgba(0,0,0,0.8)] text-xs">
            <span
              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0"
              style={{
                backgroundColor: `${currentMsg.color}20`,
                color: currentMsg.color,
                border: `1px solid ${currentMsg.color}40`,
              }}
            >
              {currentMsg.tag}
            </span>
            <span className="text-slate-200 font-medium text-[11px] sm:text-[11.5px]">
              {currentMsg.text}
            </span>
            {/* Downward pointer notch */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-b border-r border-white/15 rotate-45" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lenzzy Robot Drone Mascot */}
      <motion.div
        animate={{
          y: [-5, 7, -5],
          rotate: [-1.5, 1.5, -1.5],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={handleMascotClick}
        className="relative cursor-pointer group p-1"
        title="Hi, I'm Lenzzy! Click me to probe telemetry status!"
      >
        {/* Ambient Halo Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-500/25 to-emerald-500/25 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-80" />

        {/* Sonar Scan Wave when clicked */}
        {isScanning && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.9 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-cyan-400 pointer-events-none"
          />
        )}

        {/* Character SVG Art */}
        <svg
          width="82"
          height="82"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="lenzzy-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>

            <linearGradient id="lenzzy-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>

            <linearGradient id="lenzzy-visor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#030712" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="lenzzy-thruster-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <filter id="lenzzy-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Top Telemetry Beacon Antenna */}
          <line x1="50" y1="18" x2="50" y2="8" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
          {/* Antenna Ball */}
          <circle cx="50" cy="7" r="4" fill="#38bdf8" filter="url(#lenzzy-glow)" />
          <circle cx="50" cy="7" r="2" fill="#ffffff" />

          {/* Dual Ion Thrusters at Bottom */}
          {/* Left Thruster Exhaust */}
          <ellipse cx="36" cy="85" rx="5" ry="9" fill="url(#lenzzy-thruster-grad)" opacity="0.85" />
          <ellipse cx="36" cy="83" rx="2.5" ry="4.5" fill="#ffffff" opacity="0.9" />
          {/* Right Thruster Exhaust */}
          <ellipse cx="64" cy="85" rx="5" ry="9" fill="url(#lenzzy-thruster-grad)" opacity="0.85" />
          <ellipse cx="64" cy="83" rx="2.5" ry="4.5" fill="#ffffff" opacity="0.9" />

          {/* Thruster Nozzles */}
          <rect x="31" y="73" width="10" height="6" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
          <rect x="59" y="73" width="10" height="6" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />

          {/* Left & Right Drone Wings / Sensors */}
          <path
            d="M 16 46 C 10 44 8 54 15 57 C 18 58 22 55 22 50 Z"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1.5"
          />
          <circle cx="13" cy="51" r="1.5" fill="#38bdf8" />

          <path
            d="M 84 46 C 90 44 92 54 85 57 C 82 58 78 55 78 50 Z"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="1.5"
          />
          <circle cx="87" cy="51" r="1.5" fill="#38bdf8" />

          {/* Main Chassis Body: High-tech Squircle Pod */}
          <rect
            x="20"
            y="18"
            width="60"
            height="58"
            rx="24"
            fill="url(#lenzzy-body-grad)"
            stroke="url(#lenzzy-rim-grad)"
            strokeWidth="2.5"
          />

          {/* Dark Glass Visor Screen */}
          <rect
            x="26"
            y="26"
            width="48"
            height="34"
            rx="14"
            fill="url(#lenzzy-visor-grad)"
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Oscilloscope ECG wave subtle grid in visor */}
          <line x1="28" y1="43" x2="72" y2="43" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="2 2" />

          {/* Dynamic Lens Eyes */}
          {isBlinking ? (
            /* Blinking Slit Eyes */
            <g>
              <line x1="36" y1="42" x2="44" y2="42" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="56" y1="42" x2="64" y2="42" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          ) : (
            /* Open Cybernetic Optical Lens Eyes */
            <g>
              {/* Left Eye */}
              <circle cx="40" cy="42" r="7" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.8" filter="url(#lenzzy-glow)" />
              <circle cx="40" cy="42" r="4.5" fill="#38bdf8" />
              <circle cx="41.5" cy="40.5" r="1.8" fill="#ffffff" />
              {/* Left Eye Crosshair */}
              <line x1="33" y1="42" x2="35" y2="42" stroke="#bae6fd" strokeWidth="1" />
              <line x1="45" y1="42" x2="47" y2="42" stroke="#bae6fd" strokeWidth="1" />

              {/* Right Eye */}
              <circle cx="60" cy="42" r="7" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.8" filter="url(#lenzzy-glow)" />
              <circle cx="60" cy="42" r="4.5" fill="#38bdf8" />
              <circle cx="61.5" cy="40.5" r="1.8" fill="#ffffff" />
              {/* Right Eye Crosshair */}
              <line x1="53" y1="42" x2="55" y2="42" stroke="#bae6fd" strokeWidth="1" />
              <line x1="65" y1="42" x2="67" y2="42" stroke="#bae6fd" strokeWidth="1" />
            </g>
          )}

          {/* Cute Smile / Status Indicator */}
          <path
            d="M 45 52 Q 50 55 55 52"
            stroke="#34d399"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Chest Optical Telemetry Badge (Stacklenzz Logo Icon miniature) */}
          <circle cx="50" cy="67" r="4.5" fill="#090d16" stroke="#818cf8" strokeWidth="1.2" />
          <path d="M 47 67 L 49 67 L 50 65 L 51 69 L 52 67 L 53 67" stroke="#34d399" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Orbiting Telemetry Satellite Spark */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] -top-1 left-1/2 -translate-x-1/2 absolute" />
        </motion.div>
      </motion.div>
    </div>
  );
}
