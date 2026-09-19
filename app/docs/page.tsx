"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Activity,
  Layers,
  Terminal,
  Cpu,
  Server,
  Code,
  Shield,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Zap,
  Gauge,
  AlertTriangle,
  Play,
  GitBranch,
  ChevronDown,
  CheckCircle2,
  Menu,
  X,
  Search,
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
  ArrowRight,
  CornerDownLeft,
  Box,
  Database,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { StacklenzzLogo } from "../components/StacklenzzLogo";
import { CURRENT_PROJECT_VERSION, AVAILABLE_VERSIONS } from "./version";

export default function DocumentationPage() {
  const [selectedVersion, setSelectedVersion] = useState<string>(CURRENT_PROJECT_VERSION);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("quickstart");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [installPm, setInstallPm] = useState<"cli" | "npm" | "pnpm" | "bun" | "yarn">("cli");
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Auto-highlight sidebar section as user scrolls & reveal/hide nav based on scroll direction
  useEffect(() => {
    const container = document.getElementById("docs-main-scroll-container");
    if (!container) return;

    const allSectionIds = navItems.flatMap((g) => g.items.map((item) => item.id));
    let lastScrollTop = container.scrollTop;

    const handleScroll = () => {
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      // Scroll direction detection for navbar
      const scrollDiff = containerTop - lastScrollTop;
      if (containerTop <= 40) {
        // At or near top of the page -> always show navbar
        setIsNavVisible(true);
      } else if (scrollDiff > 8) {
        // Scrolling down -> hide navbar
        setIsNavVisible(false);
      } else if (scrollDiff < -8) {
        // Scrolling up -> show navbar
        setIsNavVisible(true);
      }
      lastScrollTop = containerTop;

      // If scrolled near bottom of container, highlight the last section
      if (container.scrollHeight - (containerTop + containerHeight) < 80) {
        setActiveSection(allSectionIds[allSectionIds.length - 1]);
        return;
      }

      let currentSection = allSectionIds[0];
      for (const id of allSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const relativeTop = el.offsetTop - container.offsetTop;
          if (containerTop >= relativeTop - 120) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navItems = [
    {
      group: "Getting Started",
      items: [
        { id: "overview", label: "Overview & Architecture", icon: <Layers size={16} /> },
        { id: "quickstart", label: "Quick Start Guide", icon: <Zap size={16} /> },
        { id: "installation", label: "Installation & CLI Options", icon: <Terminal size={16} /> },
      ],
    },
    {
      group: "Frontend & UI Dashboards",
      items: [
        { id: "ui-dashboard", label: "React & Next.js UI", icon: <Activity size={16} /> },
        { id: "dashboard-themes", label: "6 Runtime Themes", icon: <Sparkles size={16} /> },
        { id: "cli-commands", label: "CLI Commands Reference", icon: <Code size={16} /> },
      ],
    },
    {
      group: "Backend SDK",
      items: [
        { id: "express", label: "Express Instrumentation", icon: <Server size={16} /> },
        { id: "nestjs", label: "NestJS Module Setup", icon: <Cpu size={16} /> },
        { id: "framework-compat", label: "Node.js Framework Compatibility", icon: <Box size={16} /> },
        { id: "sdk-advanced", label: "Advanced SDK Features & APIs", icon: <Zap size={16} /> },
        { id: "metrics-tracing", label: "Metrics & OpenTelemetry", icon: <Gauge size={16} /> },
        { id: "error-intel", label: "Error Intelligence & Breadcrumbs", icon: <AlertTriangle size={16} /> },
        { id: "crash-log-adaptor", label: "Database Crash Log Adaptor", icon: <Database size={16} /> },
      ],
    },
    {
      group: "Production & Deploy",
      items: [
        { id: "security", label: "Auth & Middleware Security", icon: <Shield size={16} /> },
        { id: "deployment", label: "Hosting Live on Vercel / Cloud", icon: <ExternalLink size={16} /> },
      ],
    },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setIsNavVisible(true);
    const target = document.getElementById(id);
    const container = document.getElementById("docs-main-scroll-container");
    if (target && container) {
      const topPos = target.offsetTop - container.offsetTop;
      container.scrollTo({ top: topPos - 20, behavior: "smooth" });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen w-screen max-w-[100vw] overflow-hidden bg-background text-slate-100">
      {/* Top Navbar: Auto-hides on scroll down, reappears on scroll up */}
      <header
        className={`relative z-50 shrink-0 h-[60px] flex items-center justify-between px-5 bg-[#090d16]/95 backdrop-blur-md border-b border-white/10 w-full transition-all duration-300 ease-in-out ${
          isNavVisible
            ? "translate-y-0 opacity-100 mt-0"
            : "-translate-y-full opacity-0 -mt-[60px] pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Desktop Sidebar Expand/Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`hidden lg:flex items-center justify-center bg-white/5 border border-white/10 rounded-md p-1.5 cursor-pointer transition-all duration-150 ${sidebarCollapsed ? "text-indigo-400" : "text-slate-400"}`}
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse to Icons Only"}
            aria-label="Toggle Sidebar Width"
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <PanelLeft size={18} />}
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => {
              setIsNavVisible(true);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex lg:hidden items-center justify-center bg-white/5 border border-white/10 rounded-md p-1.5 text-white cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 no-underline text-inherit"
              title="Return to Home"
            >
              <StacklenzzLogo size={34} />
              <div className="hidden sm:block font-extrabold text-base tracking-tight text-white">
                Stacklenzz
              </div>
            </Link>
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
                className="flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/25 rounded-md px-2 py-0.5 text-indigo-400 text-[11px] font-semibold cursor-pointer"
              >
                <span>{selectedVersion}</span>
                <ChevronDown size={11} className={isVersionDropdownOpen ? "rotate-180" : ""} />
              </button>

              {isVersionDropdownOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-[170px] bg-slate-900 border border-white/10 rounded-lg p-1.5 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6)]">
                  <div className="text-[10px] font-bold uppercase text-slate-500 px-2 pt-1.5 pb-1">
                    Select Version
                  </div>
                  {AVAILABLE_VERSIONS.map((item) => (
                    <button
                      key={item.version}
                      onClick={() => {
                        setSelectedVersion(item.version);
                        setIsVersionDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md border-none text-xs cursor-pointer text-left ${
                        selectedVersion === item.version
                          ? "bg-indigo-500/20 text-white font-semibold"
                          : "bg-transparent text-slate-400 font-normal"
                      }`}
                    >
                      <span>{item.label}</span>
                      {selectedVersion === item.version && <CheckCircle2 size={12} className="text-indigo-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center: Search Button (trigger for modal or direct search) */}
        <div className="flex-1 max-w-[420px] mx-2 sm:mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between bg-white/[0.04] border border-white/[0.09] rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-slate-400 text-xs sm:text-[13px] cursor-pointer hover:bg-white/[0.08] transition-all"
          >
            <div className="flex items-center gap-2">
              <Search size={15} className="text-indigo-400" />
              <span className="hidden sm:inline">Search docs...</span>
              <span className="sm:hidden text-slate-400">Search...</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 bg-white/[0.08] border border-white/[0.12] rounded px-1.5 py-0.5 text-[10px] font-semibold text-slate-300">
              <span>Ctrl</span>
              <span>K</span>
            </div>
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link
            href="/docs/observability-dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 text-white text-[11px] sm:text-xs font-semibold no-underline whitespace-nowrap"
          >
            <Play size={13} /> <span className="hidden sm:inline">Demo Console</span><span className="sm:hidden">Demo</span>
          </Link>
          <a
            href="https://github.com/ideateGudy/stacklenzz"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium no-underline hover:bg-white/10 transition-colors"
          >
            <GitBranch size={14} /> GitHub
          </a>
        </div>
      </header>

      {/* Main Documentation Layout: Takes remaining viewport height with independent Main Scroll */}
      <div className="flex w-full max-w-[1600px] mx-auto flex-1 min-h-0 overflow-hidden relative">
        {/* Mobile Backdrop Overlay when Drawer is open */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className={`fixed inset-x-0 bottom-0 ${
                isNavVisible ? "top-[60px]" : "top-0"
              } bg-black/75 backdrop-blur-sm z-[39] transition-all duration-300`}
            />
          )}
        </AnimatePresence>

        {/* Sidebar Navigation: Static / Non-scrolling with the page - Expandable / Collapsible */}
        <aside
          style={{ width: sidebarCollapsed ? "68px" : "260px" }}
          className={`shrink-0 h-full overflow-y-auto overflow-x-hidden border-r border-white/5 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? "p-5 px-2" : "p-6 px-4"
          } max-lg:fixed ${
            isNavVisible
              ? "max-lg:top-[60px] max-lg:h-[calc(100vh-60px)]"
              : "max-lg:top-0 max-lg:h-screen"
          } max-lg:left-0 max-lg:z-40 max-lg:bg-[#090d16]/95 max-lg:backdrop-blur-xl max-lg:shadow-2xl ${
            mobileMenuOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
          }`}
        >
          <div className={`flex flex-col ${sidebarCollapsed ? "gap-4" : "gap-6"}`}>
            {navItems.map((group, idx) => (
              <div key={idx}>
                {!sidebarCollapsed ? (
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2 pl-2">
                    {group.group}
                  </div>
                ) : (
                  <div className="h-px bg-white/5 my-1.5 mx-1" title={group.group} />
                )}
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        title={sidebarCollapsed ? item.label : undefined}
                        className={`flex items-center gap-2.5 rounded-lg border-none text-[13px] cursor-pointer text-left transition-all duration-150 w-full ${
                          sidebarCollapsed ? "justify-center p-2.5" : "justify-start py-2 px-3"
                        } ${
                          isActive
                            ? "font-semibold text-white bg-indigo-500/15"
                            : "font-normal text-slate-400 bg-transparent hover:bg-white/5"
                        }`}
                      >
                        <span className={`flex items-center justify-center ${isActive ? "text-indigo-400" : "text-slate-500"}`}>
                          {item.icon}
                        </span>
                        {!sidebarCollapsed && (
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Content Area: The ONLY area that scrolls down */}
        <main
          id="docs-main-scroll-container"
          className="flex-1 min-w-0 w-full max-w-full h-full overflow-y-auto overflow-x-hidden p-10 pb-24 max-lg:p-6 max-lg:pb-16 leading-relaxed docs-main-content"
        >
          {/* Section: Overview */}
          <section id="overview" style={{ marginBottom: "3.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "9999px",
                background: "rgba(59, 130, 246, 0.12)",
                color: "#60a5fa",
                fontSize: "0.75rem",
                fontWeight: 600,
                marginBottom: "0.75rem",
                border: "1px solid rgba(59, 130, 246, 0.25)",
              }}
            >
              <Sparkles size={13} /> Complete Observability Pipeline
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, margin: "0 0 0.75rem 0", letterSpacing: "-0.03em" }}>
              Developer-First Observability
            </h1>
            <p style={{ fontSize: "1.05rem", color: "#94a3b8", margin: "0 0 1.5rem 0" }}>
              A turnkey monitoring system for Express and NestJS backends, paired with ready-to-mount React & Next.js admin dashboards. Collect Prometheus metrics, OpenTelemetry traces, and intelligent error fingerprints with zero external framework lock-in.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 w-full">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="text-indigo-400 mb-2"><Server size={22} /></div>
                <h3 className="m-0 mb-1.5 text-base font-bold text-white tracking-tight">Backend Core SDK</h3>
                <p className="m-0 text-xs sm:text-sm text-slate-400 leading-relaxed break-words">
                  One-line middleware setup for Express and NestJS. Exposes <code className="break-all font-mono text-indigo-300">/metrics</code> for Prometheus and <code className="break-all font-mono text-indigo-300">/api/observability/stats</code>.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="text-sky-400 mb-2"><Activity size={22} /></div>
                <h3 className="m-0 mb-1.5 text-base font-bold text-white tracking-tight">React Dashboard UI</h3>
                <p className="m-0 text-xs sm:text-sm text-slate-400 leading-relaxed break-words">
                  6 pre-built dashboard layouts, 6 runtime color themes, deep error inspector with stack traces and breadcrumb timelines.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="text-emerald-400 mb-2"><Terminal size={22} /></div>
                <h3 className="m-0 mb-1.5 text-base font-bold text-white tracking-tight">Zero-Config CLI</h3>
                <p className="m-0 text-xs sm:text-sm text-slate-400 leading-relaxed break-words">
                  Detects Next.js App/Pages Router and Vite. Installs UI routes, initializes configs, and validates connectivity with <code className="break-all font-mono text-emerald-300">doctor</code>.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Quick Start */}
          <section id="quickstart" className="mb-14">
            <h2 className="text-2xl font-bold m-0 mb-4">⚡️ Quick Start in 3 Steps</h2>
            <div className="flex flex-col gap-4 w-full">
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base text-white">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white shrink-0">1</span>
                    Instrument Your Backend
                  </div>
                  <button
                    onClick={() => copyToClipboard("npm install @stacklenzz/server", "code-step1")}
                    className="bg-transparent border-none text-slate-400 cursor-pointer flex items-center gap-1.5 text-xs hover:text-white transition-colors"
                  >
                    {copiedCode === "code-step1" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />} Copy
                  </button>
                </div>
                <pre className="m-0 p-3.5 bg-slate-950 rounded-xl color-slate-100 font-mono text-xs sm:text-sm max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border border border-white/5">
                  npm install @stacklenzz/server
                </pre>
              </div>

              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                  <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base text-white">
                    <span className="w-6 h-6 rounded-full bg-sky-600 flex items-center justify-center text-xs text-white shrink-0">2</span>
                    Scaffold Frontend Dashboard
                  </div>
                  <button
                    onClick={() => copyToClipboard("npx stacklenzz dashboard", "code-step2")}
                    className="bg-transparent border-none text-slate-400 cursor-pointer flex items-center gap-1.5 text-xs hover:text-white transition-colors"
                  >
                    {copiedCode === "code-step2" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />} Copy
                  </button>
                </div>
                <pre className="m-0 p-3.5 bg-slate-950 rounded-xl color-slate-100 font-mono text-xs sm:text-sm max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border border border-white/5">
                  npx stacklenzz dashboard
                </pre>
              </div>

              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="font-bold text-sm sm:text-base mb-2 flex items-center gap-2.5 text-white">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs text-white shrink-0">3</span>
                  View Live Protected Route
                </div>
                <p className="m-0 mb-4 text-slate-400 text-xs sm:text-sm leading-relaxed break-words">
                  Navigate to your frontend application to inspect live traffic, latencies, and errors in real-time:
                </p>
                <div>
                  <Link
                    href="/docs/observability-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold no-underline hover:bg-indigo-500 transition-colors shadow-lg"
                  >
                    Open Live Demo Console <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Installation */}
          <section id="installation" className="mb-14">
            <h2 className="text-2xl font-bold m-0 mb-4">📦 Installation Options</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              Choose your preferred installation method:
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {(["cli", "npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
                <button
                  key={pm}
                  onClick={() => setInstallPm(pm)}
                  className={`px-3 py-1.5 rounded-md border text-[12px] font-semibold cursor-pointer uppercase transition-colors ${
                    installPm === pm
                      ? "border-indigo-500 bg-indigo-500/20 text-white"
                      : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {pm === "cli" ? "CLI Auto (Recommended)" : pm}
                </button>
              ))}
            </div>

            <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col min-w-0 max-w-full overflow-hidden box-border">
              <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                <span className="text-xs text-slate-500 font-mono">Terminal</span>
                <button
                  onClick={() => {
                    const cmd =
                      installPm === "cli"
                        ? "npx stacklenzz dashboard"
                        : installPm === "pnpm"
                        ? "pnpm add @stacklenzz/server @stacklenzz/ui lucide-react"
                        : installPm === "bun"
                        ? "bun add @stacklenzz/server @stacklenzz/ui lucide-react"
                        : installPm === "yarn"
                        ? "yarn add @stacklenzz/server @stacklenzz/ui lucide-react"
                        : "npm install @stacklenzz/server @stacklenzz/ui lucide-react";
                    copyToClipboard(cmd, "install-cmd");
                  }}
                  className="bg-transparent border-none text-slate-400 cursor-pointer flex items-center gap-1.5 text-xs hover:text-white"
                >
                  {copiedCode === "install-cmd" ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />} Copy
                </button>
              </div>

              <pre className="m-0 p-4 bg-slate-900/60 rounded-xl text-slate-50 font-mono text-xs sm:text-sm max-w-full overflow-x-auto whitespace-pre-wrap break-words border border-white/5 box-border">
                {installPm === "cli" && `# 1. Scaffold Dashboard Route\nnpx stacklenzz dashboard\n\n# 2. Run Doctor to Validate Connection\nnpx stacklenzz doctor`}
                {installPm === "npm" && `npm install @stacklenzz/server @stacklenzz/ui lucide-react`}
                {installPm === "pnpm" && `pnpm add @stacklenzz/server @stacklenzz/ui lucide-react`}
                {installPm === "bun" && `bun add @stacklenzz/server @stacklenzz/ui lucide-react`}
                {installPm === "yarn" && `yarn add @stacklenzz/server @stacklenzz/ui lucide-react`}
              </pre>
            </div>
          </section>

          {/* Section: UI Dashboard */}
          <section id="ui-dashboard" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">React & Next.js UI Dashboard</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              Render the unified <code>&lt;ObservabilityDashboard /&gt;</code> inside any client component:
            </p>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border">
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`"use client";

import { ObservabilityDashboard } from "@stacklenzz/ui";

export default function AdminObservabilityPage() {
  return (
    <main className="min-h-screen bg-background">
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
}`}
              </pre>
            </div>
          </section>

          {/* Section: Dashboard Themes */}
          <section id="dashboard-themes" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">6 Built-in Runtime Themes & State Management</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              Switch themes live on the UI or configure your preferred default aesthetic. Powered by built-in state management with automatic <code>localStorage</code> persistence (<code>stacklenzz_theme</code>):
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 mb-4 min-w-0 max-w-full">
              {[
                { name: "Tokyo Night", id: "tokyo-night", color: "#7aa2f7", desc: "Deep indigo & neon cyan" },
                { name: "Nord", id: "nord", color: "#88c0d0", desc: "Arctic cool frost blues" },
                { name: "Dracula", id: "dracula", color: "#bd93f9", desc: "Vibrant purple & pink accents" },
                { name: "Catppuccin Mocha", id: "catppuccin", color: "#cba6f7", desc: "Soothing pastel dark palette" },
                { name: "Emerald Terminal", id: "emerald-terminal", color: "#10b981", desc: "Monochrome hacker terminal" },
                { name: "Cyberpunk", id: "cyberpunk", color: "#f43f5e", desc: "High-contrast neon pink" },
              ].map((t) => (
                <div key={t.id} className="p-4 sm:p-5 bg-white/5 border border-white/10 rounded-xl min-w-0 max-w-full overflow-hidden box-border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.color }}></span>
                    <span className="font-semibold text-[13.5px] truncate">{t.name}</span>
                  </div>
                  <div className="text-[12px] text-slate-400 break-words">{t.desc}</div>
                </div>
              ))}
            </div>

            <div className="p-5 sm:p-6 bg-slate-950 border border-white/10 rounded-2xl min-w-0 max-w-full overflow-hidden box-border">
              <div className="text-[12.5px] font-bold text-indigo-400 uppercase mb-1.5">
                ⚡️ Automatic LocalStorage Persistence
              </div>
              <p className="m-0 text-[13px] text-slate-300 leading-relaxed break-words">
                Theme selections automatically persist immediately to <code>localStorage</code> (key: <code>stacklenzz_theme</code>). Upon page reloads or navigating between administrative views, your chosen theme is instantly restored without visual flickering.
              </p>
            </div>
          </section>

          {/* Section: CLI Commands */}
          <section id="cli-commands" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-4">💻 Stacklenzz CLI Reference</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              The CLI is accessible via <code>stacklenzz</code>, <code>stackcli</code>, or short command <code>stack</code>:
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 min-w-0 max-w-full mb-6">
              <div className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <h4 className="m-0 mb-1.5 text-sky-400 text-[15px]">1. dashboard</h4>
                <p className="m-0 mb-3 text-[13px] text-slate-400 break-words">
                  Auto-detects framework and generates an admin dashboard route with your choice of 7 templates.
                </p>
                <code className="block p-2.5 bg-slate-950 rounded-lg text-indigo-300 text-[12px] font-mono break-all border border-white/5">
                  npx stacklenzz dashboard
                </code>
                <span className="text-[11.5px] text-slate-500 mt-2 block break-words">
                  Supports <code>--dry-run</code>, <code>-y</code>, and custom <code>--route</code>
                </span>
              </div>

              <div className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <h4 className="m-0 mb-1.5 text-emerald-400 text-[15px]">2. doctor</h4>
                <p className="m-0 mb-3 text-[13px] text-slate-400 break-words">
                  Validates dependencies and tests live telemetry reachability against your backend.
                </p>
                <code className="block p-2.5 bg-slate-950 rounded-lg text-indigo-300 text-[12px] font-mono break-all border border-white/5">
                  npx stacklenzz doctor
                </code>
                <span className="text-[11.5px] text-slate-500 mt-2 block break-words">
                  Custom endpoint: <code>--endpoint &lt;url&gt;</code>
                </span>
              </div>

              <div className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <h4 className="m-0 mb-1.5 text-amber-400 text-[15px]">3. init</h4>
                <p className="m-0 mb-3 text-[13px] text-slate-400 break-words">
                  Creates a strongly-typed <code>observability.config.ts</code> configuration file.
                </p>
                <code className="block p-2.5 bg-slate-950 rounded-lg text-indigo-300 text-[12px] font-mono break-all border border-white/5">
                  npx stacklenzz init
                </code>
                <span className="text-[11.5px] text-slate-500 mt-2 block break-words">
                  Instant TypeScript starter configuration
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-slate-950 border border-white/10 rounded-2xl min-w-0 max-w-full overflow-hidden box-border">
              <div className="text-[12.5px] font-bold text-sky-400 uppercase mb-2">
                7 Scaffolding Dashboard Templates Available in CLI:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div>• <strong>Universal Console</strong> (Interactive switcher &amp; 6 themes)</div>
                <div>• <strong>Full Backend Suite</strong> (Health, metrics, errors, latency)</div>
                <div>• <strong>API Overview</strong> (Routes, traffic volume, HTTP codes)</div>
                <div>• <strong>Backend Performance</strong> (P50, P95, P99 tail latency)</div>
                <div>• <strong>Error Monitoring</strong> (Spikes, failure logs, breadcrumbs)</div>
                <div>• <strong>Node.js Runtime</strong> (CPU %, RSS, Heap, Event Loop lag)</div>
                <div className="sm:col-span-2">• <strong>Minimal Widget</strong> (Compact status badge for sidebars)</div>
              </div>
            </div>
          </section>

          {/* Section: Express */}
          <section id="express" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">Express Instrumentation</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              Import <code>setupObservability</code> directly from <code>@stacklenzz/server/express</code> and call it before declaring routes:
            </p>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border">
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import express from "express";
import { setupObservability } from "@stacklenzz/server/express";
import { logger, addBreadcrumb } from "@stacklenzz/server/core";

const app = express();

// Automatically configures:
// 1. /metrics (Prometheus scraper)
// 2. /api/observability/stats (JSON telemetry feed for dashboard UI)
// 3. OpenTelemetry NodeSDK distributed tracing
// 4. Winston JSON structured logging
setupObservability(app, {
  serviceName: "billing-service",
  environment: "production",
});

app.get("/api/checkout", (req, res) => {
  addBreadcrumb({ category: "cart", message: "Processing card payment", level: "info" });
  res.json({ status: "success" });
});

// Fallback for non-existent routes (captured as 404 in dashboard)
app.use((req, res) => {
  res.status(404).json({ statusCode: 404, error: "Not Found", message: \`Cannot \${req.method} \${req.url}\` });
});

app.listen(5000, () => console.log("Server listening on port 5000"));`}
              </pre>
            </div>
          </section>

          {/* Section: NestJS */}
          <section id="nestjs" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">NestJS Module Setup</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              Import <code>ObservabilityModule</code> directly from <code>@stacklenzz/server/nestjs</code> in your root <code>AppModule</code>:
            </p>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border mb-4">
              <div className="text-xs font-bold text-sky-400 uppercase mb-2">
                Synchronous Module Setup
              </div>
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import { Module } from "@nestjs/common";
import { ObservabilityModule } from "@stacklenzz/server/nestjs";

@Module({
  imports: [
    ObservabilityModule.forRoot({
      serviceName: "auth-service",
      environment: process.env.NODE_ENV || "production",
      autoInitTracing: true,
    }),
  ],
})
export class AppModule {}`}
              </pre>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border">
              <div className="text-xs font-bold text-indigo-400 uppercase mb-2">
                Asynchronous Module Setup with ConfigService
              </div>
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ObservabilityModule } from "@stacklenzz/server/nestjs";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ObservabilityModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        serviceName: config.get<string>("APP_NAME", "auth-service"),
        environment: config.get<string>("NODE_ENV", "production"),
      }),
    }),
  ],
})
export class AppModule {}`}
              </pre>
            </div>
          </section>

          {/* Section: Node.js Framework Compatibility */}
          <section id="framework-compat" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">📦 Node.js Framework Compatibility</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              If your backend uses <strong>Fastify</strong>, <strong>Koa</strong>, <strong>Hono</strong>, <strong>Hapi</strong>, or pure Node.js <code>http</code>, you can use <code>@stacklenzz/server/core</code> to capture errors, record Prometheus metrics, and feed real-time telemetry to the dashboard:
            </p>

            {/* Fastify */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border mb-4">
              <div className="text-xs font-bold text-sky-400 uppercase mb-2">
                1. Fastify Integration
              </div>
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import Fastify from "fastify";
import { getObservabilitySnapshot, recordError } from "@stacklenzz/server/core";

const fastify = Fastify();

// Expose stats endpoint for dashboard UI
fastify.get("/api/observability/stats", async (request, reply) => {
  const snapshot = await getObservabilitySnapshot();
  return reply.header("Access-Control-Allow-Origin", "*").send(snapshot);
});

// Capture unhandled errors into the dashboard error stream
fastify.setErrorHandler((error, request, reply) => {
  recordError({
    message: error.message,
    stack: error.stack,
    route: request.url,
    method: request.method,
    statusCode: error.statusCode || 500,
  });
  reply.status(error.statusCode || 500).send({ error: error.message });
});`}
              </pre>
            </div>

            {/* Koa */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border mb-4">
              <div className="text-xs font-bold text-indigo-400 uppercase mb-2">
                2. Koa Integration
              </div>
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import Koa from "koa";
import Router from "@koa/router";
import { getObservabilitySnapshot, recordError } from "@stacklenzz/server/core";

const app = new Koa();
const router = new Router();

// Stats endpoint
router.get("/api/observability/stats", async (ctx) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.body = await getObservabilitySnapshot();
});

// Global error tracking middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    recordError({
      message: err.message,
      stack: err.stack,
      route: ctx.path,
      method: ctx.method,
      statusCode: err.status || 500,
    });
    throw err;
  }
});

app.use(router.routes());`}
              </pre>
            </div>

            {/* Hono */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border">
              <div className="text-xs font-bold text-emerald-400 uppercase mb-2">
                3. Hono (Node.js)
              </div>
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import { Hono } from "hono";
import { getObservabilitySnapshot, recordError } from "@stacklenzz/server/core";

const app = new Hono();

app.get("/api/observability/stats", async (c) => {
  c.header("Access-Control-Allow-Origin", "*");
  return c.json(await getObservabilitySnapshot());
});

app.onError((err, c) => {
  recordError({
    message: err.message,
    stack: err.stack,
    route: c.req.path,
    method: c.req.method,
    statusCode: 500,
  });
  return c.text("Internal Server Error", 500);
});`}
              </pre>
            </div>
          </section>

          {/* Section: Advanced SDK Features */}
          <section id="sdk-advanced" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-xl sm:text-2xl font-bold m-0 mb-3 break-words">⚡️ Advanced SDK Features &amp; Telemetry APIs</h2>
            <p className="text-slate-400 m-0 mb-4 text-xs sm:text-[14px] leading-relaxed break-words">
              Unlock powerful built-in telemetry utilities directly from <code className="break-all">@stacklenzz/server</code>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 min-w-0 max-w-full">
              <div className="p-5 sm:p-6 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="flex items-start gap-2.5 mb-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0 mt-1"></span>
                  <h3 className="m-0 text-sm sm:text-[15px] font-bold text-sky-400 leading-snug break-words">
                    1. Automatic Error Fingerprinting &amp; Deduplication
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 m-0 leading-relaxed break-words">
                  Error messages are dynamically sanitized (stripping IDs, timestamps, and numbers) to compute a deterministic hash. 50 recurring database failures appear as <strong>1 grouped incident card</strong> with occurrence counters (<code className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-sky-300 font-mono text-[11px] break-all">x50</code>) and occurrence timestamps.
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="flex items-start gap-2.5 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0 mt-1"></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="m-0 text-sm sm:text-[15px] font-bold text-indigo-400 leading-snug break-words">
                      2. Programmatic Snapshot API
                    </h3>
                    <div className="mt-1">
                      <code className="inline-block px-2 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-mono text-[11px] sm:text-xs break-all">
                        getObservabilitySnapshot
                      </code>
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 m-0 leading-relaxed break-words mt-1">
                  Generate instant JSON operational snapshots directly inside your Node.js code to stream live metrics via WebSockets or push custom alerts to Slack/Discord.
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="flex items-start gap-2.5 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-1"></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="m-0 text-sm sm:text-[15px] font-bold text-emerald-400 leading-snug break-words">
                      3. Custom Prometheus Metrics
                    </h3>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <code className="px-1.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] sm:text-xs break-all">Counter</code>
                      <code className="px-1.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] sm:text-xs break-all">Gauge</code>
                      <code className="px-1.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] sm:text-xs break-all">register</code>
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 m-0 leading-relaxed break-words mt-1">
                  Re-exports <code className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-emerald-300 font-mono text-[11px] break-all">prom-client</code> primitives directly. Register custom domain metrics (e.g. <code className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-emerald-300 font-mono text-[11px] break-all">orders_created_total</code>) without installing extra dependencies.
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="flex items-start gap-2.5 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-1"></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="m-0 text-sm sm:text-[15px] font-bold text-amber-400 leading-snug break-words">
                      4. OpenTelemetry Native Exports
                    </h3>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <code className="px-1.5 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/30 text-amber-300 font-mono text-[11px] sm:text-xs break-all">trace</code>
                      <code className="px-1.5 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/30 text-amber-300 font-mono text-[11px] sm:text-xs break-all">context</code>
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-300 m-0 leading-relaxed break-words mt-1">
                  Direct access to OpenTelemetry API primitives to create custom spans and extract active trace IDs without installing <code className="px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-amber-300 font-mono text-[11px] break-all">@opentelemetry/api</code> separately.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-slate-950 border border-white/10 rounded-2xl min-w-0 max-w-full overflow-hidden box-border">
              <div className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase mb-2 break-words">
                Example: Programmatic Snapshot &amp; Custom Prometheus Metric
              </div>
              <pre className="m-0 text-slate-200 font-mono text-[11px] sm:text-xs leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import { getObservabilitySnapshot, Counter, register } from "@stacklenzz/server/core";

// 1. Register custom business metric on the /metrics endpoint
const ordersCounter = new Counter({
  name: "orders_processed_total",
  help: "Total processed checkout orders",
  registers: [register],
});
ordersCounter.inc();

// 2. Fetch live telemetry JSON directly in backend code
const snapshot = await getObservabilitySnapshot();
console.log("Current Error Rate:", snapshot.summary.errorRate);
console.log("Active Requests:", snapshot.summary.activeRequests);`}
              </pre>
            </div>
          </section>

          {/* Section: Metrics & OpenTelemetry */}
          <section id="metrics-tracing" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">📊 Metrics & OpenTelemetry Distributed Tracing</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              <code>@stacklenzz/server</code> provides built-in Prometheus metric collection via <code>prom-client</code> on <code>/metrics</code> and OpenTelemetry NodeSDK tracing:
            </p>
            <div className="p-5 sm:p-6 bg-slate-950 border border-white/10 rounded-2xl mb-4 min-w-0 max-w-full overflow-hidden box-border">
              <div className="text-xs font-bold text-sky-400 uppercase mb-2">
                Prometheus Endpoints &amp; Automatic Metrics
              </div>
              <ul className="m-0 pl-5 text-slate-300 text-xs flex flex-col gap-2 leading-relaxed break-words">
                <li><code>http_requests_total</code>: Counter tracking total HTTP requests broken down by method, route, and status code.</li>
                <li><code>http_request_duration_seconds</code>: Histogram tracking P50, P95, and P99 latency percentiles across endpoints.</li>
                <li><code>http_active_requests</code>: Gauge monitoring active in-flight requests.</li>
                <li>Standard Node.js runtime metrics: CPU usage %, RSS/Heap memory, and V8 event loop lag.</li>
              </ul>
            </div>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border">
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import { initTracing, logger } from "@stacklenzz/server";

// Tracing auto-initializes by default, injecting trace_id and span_id into Winston logs
logger.info("Processing order checkout", { orderId: "ORD-9912" });
// Output: {"level":"info","message":"Processing order checkout","trace_id":"4bf92f3577b34da6a3ce929d0e0e4736","span_id":"00f067aa0ba902b7"}`}
              </pre>
            </div>
          </section>

          {/* Section: Error Intelligence & Breadcrumbs */}
          <section id="error-intel" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">🐞 Error Intelligence & Event Breadcrumbs</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              Trace user interactions and operations prior to a failure using event breadcrumbs:
            </p>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 mb-4 min-w-0 max-w-full overflow-hidden box-border">
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import { addBreadcrumb, logger } from "@stacklenzz/server";

// 1. Record event trail before operations
addBreadcrumb({ category: "auth", message: "User session validated: usr_9921", level: "info" });
addBreadcrumb({ category: "db", message: "SELECT * FROM orders WHERE id = 'ORD-9912'", level: "info" });

// 2. Log error when failure occurs
try {
  throw new Error("DatabaseConnectionTimeout: Pool limit reached");
} catch (err) {
  // Breadcrumbs recorded above are automatically attached to this error card!
  logger.error(err);
}`}
              </pre>
            </div>
          </section>

          {/* Section: Pluggable Database Crash Log Adaptor */}
          <section id="crash-log-adaptor" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">💾 Pluggable Database Crash Log Adaptor</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              Persist <strong>5xx server crashes</strong> directly to your own database (PostgreSQL, MongoDB, Redis, Prisma, TypeORM, DynamoDB, etc.) without sending operational logs to third-party SaaS vendors:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-5 min-w-0 max-w-full">
              <div className="p-4 bg-slate-900/60 border border-white/10 rounded-xl">
                <div className="text-xs font-bold text-emerald-400 uppercase mb-1">
                  1. Opt-in Only
                </div>
                <p className="text-xs text-slate-300 m-0 leading-relaxed">
                  Zero setup or database overhead if omitted. In-memory ring buffers keep working out-of-the-box.
                </p>
              </div>

              <div className="p-4 bg-slate-900/60 border border-white/10 rounded-xl">
                <div className="text-xs font-bold text-sky-400 uppercase mb-1">
                  2. 5xx Crashes Only
                </div>
                <p className="text-xs text-slate-300 m-0 leading-relaxed">
                  Triggers only for 5xx HTTP errors and uncaught server exceptions. Excludes 4xx client errors and info logs.
                </p>
              </div>

              <div className="p-4 bg-slate-900/60 border border-white/10 rounded-xl">
                <div className="text-xs font-bold text-indigo-400 uppercase mb-1">
                  3. Non-Blocking Fire-and-Forget
                </div>
                <p className="text-xs text-slate-300 m-0 leading-relaxed">
                  Dispatched asynchronously. A failing database write or network rejection will never crash your API app.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border">
              <div className="text-xs font-bold text-sky-400 uppercase mb-2">
                Express / NestJS / Core Adaptor Integration Example
              </div>
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`import { setupObservability, CrashLogEntry } from "@stacklenzz/server";

setupObservability(app, {
  serviceName: "payment-api",
  environment: "production",
  // Configure pluggable crash log adaptor
  crashLogAdaptor: {
    save: async (entry: CrashLogEntry) => {
      // entry contains id, timestamp, message, stack, route, method, statusCode, breadcrumbs & context
      await db.crashLogs.create({
        data: {
          id: entry.id,
          timestamp: new Date(entry.timestamp),
          message: entry.message,
          stack: entry.stack,
          route: entry.route,
          method: entry.method,
          statusCode: entry.statusCode,
          breadcrumbs: entry.breadcrumbs,
          context: entry.context,
        },
      });
    },
  },
});`}
              </pre>
            </div>
          </section>

          {/* Section: Auth & Middleware Security */}
          <section id="security" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">🔒 Production Auth & Middleware Security</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              Because the dashboard displays live backend request timings and error logs, ensure the <code>/admin/observability</code> route is protected behind your application authentication layer:
            </p>
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-white/10 min-w-0 max-w-full overflow-hidden box-border">
              <pre className="m-0 text-slate-50 font-mono text-[13px] leading-relaxed max-w-full overflow-x-auto whitespace-pre-wrap break-words box-border">
{`// middleware.ts (Next.js App Router)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/observability")) {
    const adminToken = req.cookies.get("admin_session");
    if (!adminToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}`}
              </pre>
            </div>
          </section>

          {/* Section: Hosting Live on Vercel / Cloud */}
          <section id="deployment" className="mb-14 min-w-0 max-w-full">
            <h2 className="text-2xl font-bold m-0 mb-3">🚀 Hosting Live on Vercel / Cloud</h2>
            <p className="text-slate-400 m-0 mb-4 text-[14px]">
              Deploying your frontend dashboard and backend services to production:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-0 max-w-full">
              <div className="p-5 sm:p-6 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="text-sm font-bold text-sky-400 mb-1.5">
                  Frontend (Vercel / Netlify / Render)
                </div>
                <p className="text-xs text-slate-300 m-0 leading-relaxed break-words">
                  Set the environment variable <code>NEXT_PUBLIC_OBSERVABILITY_URL</code> to point to your live backend endpoint (e.g. <code>https://api.yourdomain.com/api/observability/stats</code>).
                </p>
              </div>

              <div className="p-5 sm:p-6 bg-slate-900/60 border border-white/10 rounded-2xl flex flex-col min-w-0 max-w-full overflow-hidden box-border">
                <div className="text-sm font-bold text-indigo-400 mb-1.5">
                  Backend (AWS / GCP / Docker / Railway)
                </div>
                <p className="text-xs text-slate-300 m-0 leading-relaxed break-words">
                  Ensure CORS headers permit requests from your admin dashboard origin in <code>setupObservability</code> or NestJS <code>app.enableCors()</code>.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Search Dialog Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 z-[9999] bg-slate-950/75 backdrop-blur-md flex items-start justify-center pt-[12vh] px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[580px] bg-slate-900 border border-white/10 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),0_0_35px_rgba(99,102,241,0.15)] overflow-hidden flex flex-col"
            >
              {/* Search Input Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-white/5">
                <Search size={18} className="text-indigo-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search documentation, topics, SDK setup..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-50 text-[15px]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="bg-transparent border-none text-slate-500 cursor-pointer p-1 hover:text-white"
                  >
                    <X size={15} />
                  </button>
                )}
                <div className="text-[11px] px-2 py-1 bg-white/5 rounded border border-white/10 text-slate-400 font-medium">
                  ESC
                </div>
              </div>

              {/* Search Results List */}
              <div className="max-h-[380px] overflow-y-auto p-2 flex flex-col gap-1">
                {(() => {
                  const query = searchQuery.trim().toLowerCase();
                  const allItems = navItems.flatMap((g) =>
                    g.items.map((it) => ({ ...it, groupName: g.group }))
                  );
                  const filtered = query
                    ? allItems.filter(
                        (item) =>
                          item.label.toLowerCase().includes(query) ||
                          item.groupName.toLowerCase().includes(query) ||
                          item.id.toLowerCase().includes(query)
                      )
                    : allItems;

                  if (filtered.length === 0) {
                    return (
                      <div className="py-8 px-4 text-center text-slate-500 text-[13.5px]">
                        No documentation matching &ldquo;<span className="text-slate-100">{searchQuery}</span>&rdquo;
                      </div>
                    );
                  }

                  return filtered.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                        handleNavClick(item.id);
                      }}
                      className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg border-none bg-transparent text-slate-200 cursor-pointer text-left transition-colors hover:bg-indigo-500/15"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-[13.5px] font-medium text-slate-50">
                            {item.label}
                          </div>
                          <div className="text-[11.5px] text-slate-500">
                            {item.groupName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Jump</span>
                        <CornerDownLeft size={13} />
                      </div>
                    </button>
                  ));
                })()}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5 text-[11px] text-slate-500 bg-slate-950/50">
                <div className="flex items-center gap-3">
                  <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5 mr-1 text-slate-400">↵</kbd> to select</span>
                  <span><kbd className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5 mr-1 text-slate-400">ESC</kbd> to close</span>
                </div>
                <span className="text-indigo-400 font-medium">Observability Docs</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
