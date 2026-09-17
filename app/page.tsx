"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  Cpu,
  ExternalLink,
  Gauge,
  GitBranch,
  Layers,
  Play,
  Server,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { StacklenzzLogo } from "./components/StacklenzzLogo";
import { CURRENT_PROJECT_VERSION } from "./docs/version";

export default function LandingPage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [codeFramework, setCodeFramework] = useState<"express" | "nestjs" | "react" | "nextjs">("express");

  // Lock body & html scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileMenuOpen]);

  const frameworkSnippets: Record<
    string,
    { file: string; lang: string; status: string; code: string }
  > = {
    express: {
      file: "server.ts",
      lang: "Express.js",
      status: "listening :5000",
      code: `import express from "express";
import { setupObservability, addBreadcrumb } from "@stacklenzz/server";

const app = express();

// 1. One line adds Prometheus metrics, OTEL tracing, Winston logs & stats API
setupObservability(app, {
  serviceName: "payment-service",
  environment: "production",
});

// 2. Track custom business breadcrumbs on any route
app.post("/api/checkout", async (req, res) => {
  addBreadcrumb({ category: "billing", message: "Processing card payment" });
  res.json({ status: "confirmed" });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));`,
    },
    nestjs: {
      file: "app.module.ts",
      lang: "NestJS",
      status: "listening :5000",
      code: `import { Module } from "@nestjs/common";
import { ObservabilityModule } from "@stacklenzz/server/nestjs";
import { PaymentController } from "./payment.controller";

@Module({
  imports: [
    ObservabilityModule.forRoot({
      serviceName: "payment-service",
      environment: process.env.NODE_ENV || "production",
      enableMetrics: true,
      enableTracing: true,
    }),
  ],
  controllers: [PaymentController],
})
export class AppModule {}`,
    },
    react: {
      file: "src/App.tsx",
      lang: "React",
      status: "listening :5173",
      code: `import React from "react";
import { ObservabilityDashboard } from "@stacklenzz/ui";

export function App() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#090d16" }}>
      <ObservabilityDashboard
        config={{
          endpoint: "http://localhost:5000/api/observability/stats",
          refreshIntervalMs: 5000,
        }}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </div>
  );
}`,
    },
    nextjs: {
      file: "app/admin/observability/page.tsx",
      lang: "Next.js App Router",
      status: "listening :3000",
      code: `"use client";

import { ObservabilityDashboard } from "@stacklenzz/ui";

export default function AdminObservabilityPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6">
      <ObservabilityDashboard
        config={{
          endpoint: "http://localhost:5000/api/observability/stats",
          refreshIntervalMs: 5000,
        }}
        defaultDashboard="full"
        showSwitcher={true}
      />
    </main>
  );
}`,
    },
  };

  const copyCommand = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#090d16",
        color: "#f1f5f9",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 h-[64px] flex items-center justify-between px-4 sm:px-8 bg-[#090d16]/85 backdrop-blur-xl border-b border-white/10 w-full">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <StacklenzzLogo size={36} />
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
              Stacklenzz
            </div>
            <div style={{ fontSize: "0.7rem", color: "#818cf8", fontWeight: 600 }}>
              {CURRENT_PROJECT_VERSION}
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {/* Live Monitoring Pulse Status Indicator */}
            <div
              className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium"
              title="Telemetry Engine Active & Polling"
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
              </span>
              <span>Live Telemetry</span>
            </div>

            <Link
              href="/docs"
              className="text-slate-300 hover:text-white text-sm font-medium no-underline transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/docs/observability-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white text-sm font-medium no-underline transition-colors"
            >
              Live Demo
            </Link>
            <a
              href="https://github.com/ideateGudy/stacklenzz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-medium no-underline transition-colors"
            >
              <GitBranch size={15} /> GitHub
            </a>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold no-underline shadow-[0_0_16px_rgba(79,70,229,0.4)] hover:shadow-indigo-500/50 transition-all"
            >
              Get Started <ArrowRight size={14} />
            </Link>
          </nav>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 text-white cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 bg-[#090d16]/98 border-b border-white/10 p-5 flex flex-col gap-4 shadow-2xl backdrop-blur-2xl md:hidden z-50 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium w-fit">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
                </span>
                <span>Live Telemetry Active</span>
              </div>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-white text-base font-semibold no-underline py-2 border-b border-white/5"
              >
                Documentation
              </Link>
              <Link
                href="/docs/observability-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-white text-base font-semibold no-underline py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Live Demo Console</span>
                <Play size={16} className="text-sky-400" />
              </Link>
              <a
                href="https://github.com/ideateGudy/stacklenzz"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-white text-base font-semibold no-underline py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>GitHub Repository</span>
                <GitBranch size={16} />
              </a>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-sm no-underline shadow-lg mt-1"
              >
                Get Started <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Full-screen backdrop blur overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-[64px] bg-black/80 backdrop-blur-xl z-40 md:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-10 pb-8 sm:pt-20 sm:pb-16 max-w-[1200px] mx-auto text-center flex flex-col items-center w-full">
        {/* Glow backdrop decoration with subtle pulse */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "550px",
            height: "280px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 80%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Hero Top Pill Badge with Real-time Pulse Heartbeat */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-indigo-500/35 backdrop-blur-md text-indigo-200 text-xs sm:text-sm font-semibold mb-6 relative z-10 shadow-[0_0_20px_-5px_rgba(99,102,241,0.25)] max-w-[92vw] sm:max-w-none text-center justify-center"
        >
          {/* Animated radar/sonar ping dot */}
          <span style={{ position: "relative", display: "flex", width: "9px", height: "9px", flexShrink: 0 }}>
            <span
              style={{
                position: "absolute",
                display: "inline-flex",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "#38bdf8",
                opacity: 0.75,
                animation: "livePulseRing 2s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                borderRadius: "50%",
                width: "9px",
                height: "9px",
                backgroundColor: "#38bdf8",
              }}
            />
          </span>
          <span className="truncate max-w-[260px] sm:max-w-none">Full-Stack Telemetry for Node.js Backends</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight max-w-[920px] mx-auto mb-4 relative z-10"
        >
          Effortless Observability,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #818cf8 0%, #38bdf8 50%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Zero Boilerplate.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          className="text-sm sm:text-lg md:text-xl text-slate-400 max-w-[740px] mx-auto mb-8 leading-relaxed relative z-10 px-2"
        >
          A production-grade instrumentation toolkit providing Express and NestJS telemetry, Prometheus metrics, structured Winston JSON logs, and mountable React & Next.js admin dashboards.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto px-4 relative z-10 mb-10"
        >
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-semibold no-underline shadow-[0_10px_25px_-5px_rgba(79,70,229,0.5)] w-full sm:w-auto"
            >
              Explore Documentation <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              href="/docs/observability-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 border border-white/12 text-slate-100 text-sm sm:text-base font-semibold no-underline backdrop-blur-md w-full sm:w-auto"
            >
              <Play size={15} className="text-sky-400" /> Launch Demo Console
            </Link>
          </motion.div>
        </motion.div>

        {/* Live Observability Telemetry Radar Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          className="w-full max-w-[720px] mx-auto mb-8 relative z-10"
        >
          {/* Mobile view: Transparent 3-column minimal pill capsules */}
          <div className="grid sm:hidden grid-cols-3 gap-2 w-full px-1">
            {/* Metric 1 */}
            <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/20 backdrop-blur-sm text-center">
              <div className="flex items-center gap-1 mb-1">
                <span className="relative flex w-1.5 h-1.5 shrink-0">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-80 animate-ping" />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
                </span>
                <span className="text-[9.5px] text-slate-400 uppercase font-bold tracking-wider">Heartbeat</span>
              </div>
              <div className="text-xs font-extrabold text-emerald-400 font-mono">
                99.99%
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-sky-500/[0.07] border border-sky-500/20 backdrop-blur-sm text-center">
              <div className="flex items-center gap-1 mb-1">
                <span className="relative flex w-1.5 h-1.5 shrink-0">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-sky-400 opacity-80 animate-ping" />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-sky-400" />
                </span>
                <span className="text-[9.5px] text-slate-400 uppercase font-bold tracking-wider">Latency</span>
              </div>
              <div className="text-xs font-extrabold text-sky-400 font-mono">
                14.2 ms
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-purple-500/[0.07] border border-purple-500/20 backdrop-blur-sm text-center">
              <div className="flex items-center gap-1 mb-1">
                <span className="relative flex w-1.5 h-1.5 shrink-0">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-purple-400 opacity-80 animate-ping" />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-purple-400" />
                </span>
                <span className="text-[9.5px] text-slate-400 uppercase font-bold tracking-wider">Throughput</span>
              </div>
              <div className="text-xs font-extrabold text-purple-400 font-mono">
                1.4k req/s
              </div>
            </div>
          </div>

          {/* Desktop view: Floating capsule pill bar */}
          <div className="hidden sm:flex items-center justify-around gap-6 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl">
            {/* Metric 1 */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex w-2.5 h-2.5 shrink-0">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-80 animate-ping" />
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-emerald-500" />
              </span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Heartbeat
                </div>
                <div className="text-[13px] font-bold text-emerald-400 font-mono">
                  Healthy • 99.99%
                </div>
              </div>
            </div>

            <div className="w-px h-5 bg-white/10" />

            {/* Metric 2 */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex w-2.5 h-2.5 shrink-0">
                <span className="absolute inline-flex w-full h-full rounded-full bg-sky-400 opacity-80 animate-ping" />
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-sky-400" />
              </span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Latency (p99)
                </div>
                <div className="text-[13px] font-bold text-sky-400 font-mono">
                  14.2 ms
                </div>
              </div>
            </div>

            <div className="w-px h-5 bg-white/10" />

            {/* Metric 3 */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex w-2.5 h-2.5 shrink-0">
                <span className="absolute inline-flex w-full h-full rounded-full bg-purple-500 opacity-80 animate-ping" />
                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-purple-500" />
              </span>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Throughput
                </div>
                <div className="text-[13px] font-bold text-purple-400 font-mono">
                  1,420 req/s
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Install Banner with interactive copy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "#030712",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "0.75rem",
            padding: "0.65rem 1rem",
            position: "relative",
            zIndex: 1,
            boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", overflow: "hidden" }}>
            <Terminal size={16} color="#818cf8" />
            <span style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#e2e8f0", whiteSpace: "nowrap" }}>
              npx stacklenzz dashboard -y
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => copyCommand("npx stacklenzz dashboard -y", "cli-hero")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "0.375rem",
              padding: "0.3rem 0.6rem",
              color: "#94a3b8",
              fontSize: "0.72rem",
              cursor: "pointer",
            }}
          >
            {copiedCmd === "cli-hero" ? (
              <>
                <Check size={13} color="#10b981" />
                <span style={{ color: "#10b981" }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </section>

      {/* 3 Core Architecture Pillars */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2 style={{ fontSize: "2rem", fontWeight: 800, margin: "0 0 0.5rem 0" }}>
            The 3 Pillars of Stacklenzz
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", margin: 0 }}>
            Everything you need for backend instrumentation, dashboard rendering, and tooling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full">
          {/* Pillar 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden"
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                color: "#818cf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Server size={22} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.6rem 0" }}>
              @stacklenzz/server
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 1.25rem 0", flex: 1 }}>
              Plug-and-play middleware for Express and NestJS. Exposes <code>/metrics</code> for Prometheus scrapers, Winston JSON logging, and error tracking with automatic request-response latency percentiles (p50, p95, p99).
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#10b981" /> Express <code>setupObservability(app)</code>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#10b981" /> NestJS <code>ObservabilityModule.forRoot()</code>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#10b981" /> Breadcrumbs & Error Fingerprinting
              </li>
            </ul>
            <Link
              href="/docs#express"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#818cf8",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              SDK Documentation <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Pillar 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden"
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                color: "#38bdf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <BarChart3 size={22} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.6rem 0" }}>
              @stacklenzz/ui
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 1.25rem 0", flex: 1 }}>
              Embeddable observability dashboard package with 6 pre-built layout views, 6 runtime color themes (Tokyo Night, Nord, Dracula, etc.), and deep stack-trace inspection.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#38bdf8" /> Native React component: <code>&lt;ObservabilityDashboard /&gt;</code>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#38bdf8" /> 6 Runtime Theme Switchers
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#38bdf8" /> Live Auto-polling & Mock Fallback Mode
              </li>
            </ul>
            <Link
              href="/docs#ui-dashboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#38bdf8",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              UI Component Docs <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Pillar 3 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.45, delay: 0.25 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden"
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: "rgba(52, 211, 153, 0.15)",
                color: "#34d399",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
              }}
            >
              <Terminal size={22} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.6rem 0" }}>
              @stacklenzz/cli
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 1.25rem 0", flex: 1 }}>
              Command-line companion for developer happiness. Auto-detects Next.js App or Pages router, scaffolds dashboard routes, and validates server health with <code>stacklenzz doctor</code>.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem 0", display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.82rem", color: "#cbd5e1" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#34d399" /> <code>stacklenzz dashboard</code> - Auto-scaffold
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#34d399" /> <code>stacklenzz doctor</code> - Health validation
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle2 size={14} color="#34d399" /> <code>stacklenzz init</code> - Configuration generator
              </li>
            </ul>
            <Link
              href="/docs#cli-commands"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#34d399",
                fontSize: "0.84rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              CLI Reference <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Interactive Code Preview Section */}
      <section className="max-w-[1100px] mx-auto my-6 sm:my-16 px-4 w-full box-border">
        {/* Framework Tabs Bar */}
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap w-full">
          {(["express", "nestjs", "react", "nextjs"] as const).map((fw) => (
            <button
              key={fw}
              onClick={() => setCodeFramework(fw)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border cursor-pointer transition-all duration-150 ${
                codeFramework === fw
                  ? "border-indigo-500/50 bg-indigo-500/20 text-white shadow-lg"
                  : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {frameworkSnippets[fw].lang}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          style={{
            backgroundColor: "#030712",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:px-5 sm:py-3 border-b border-white/10 bg-white/[0.02]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="font-mono text-xs text-slate-400 font-medium truncate max-w-[180px] sm:max-w-none">
                {frameworkSnippets[codeFramework].file}
              </span>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-400 font-medium">
                <span className="relative flex w-1.5 h-1.5 shrink-0">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-500" />
                </span>
                <span>{frameworkSnippets[codeFramework].status}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => copyCommand(frameworkSnippets[codeFramework].code, "ide-code")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 hover:text-white text-xs font-medium cursor-pointer transition-colors"
              >
                {copiedCmd === "ide-code" ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <Link
                href="/docs"
                className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold no-underline flex items-center gap-1"
              >
                <span className="hidden sm:inline">View Full Docs</span>
                <span className="sm:hidden">Docs</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.pre
              key={codeFramework}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                margin: 0,
                padding: "1.5rem",
                color: "#e2e8f0",
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: "0.85rem",
                lineHeight: 1.6,
                overflowX: "auto",
              }}
            >
              {frameworkSnippets[codeFramework].code}
            </motion.pre>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Call to Action Footer Banner */}
      <section className="mt-auto py-12 sm:py-20 px-4 sm:px-6 bg-[#030712] border-t border-white/10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[800px] mx-auto"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-3 text-white tracking-tight">
            Ready to monitor your application?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mb-8 max-w-[650px] mx-auto leading-relaxed">
            Browse the interactive documentation for copy-paste examples, CLI commands, and complete SDK reference.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto px-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-semibold no-underline shadow-[0_0_20px_rgba(79,70,229,0.4)] w-full sm:w-auto"
              >
                Go to Documentation <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/docs/observability-dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/12 text-white text-sm sm:text-base font-semibold no-underline w-full sm:w-auto"
              >
                View Live Demo <ExternalLink size={14} />
              </Link>
            </motion.div>
          </div>
          <div className="mt-10 text-xs text-slate-500">
            Stacklenzz • MIT Licensed • Built with Node.js & React
          </div>
        </motion.div>
      </section>

      {/* Global CSS for Landing page */}
      <style jsx global>{`
        @keyframes livePulseRing {
          0% {
            transform: scale(0.95);
            opacity: 0.85;
          }
          70% {
            transform: scale(2.4);
            opacity: 0;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        @keyframes telemetryGlow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(16, 185, 129, 0.15);
          }
          50% {
            box-shadow: 0 0 25px rgba(16, 185, 129, 0.35);
          }
        }
        @media (max-width: 768px) {
          .landing-nav {
            gap: 0.75rem !important;
          }
          .landing-nav a:not(:last-child) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
