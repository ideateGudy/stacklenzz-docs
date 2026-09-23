"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  PanelLeft,
  ChevronRight,
  GitBranch,
  Play,
  Layers,
} from "lucide-react";
import { StacklenzzLogo } from "./StacklenzzLogo";
import { CURRENT_PROJECT_VERSION, AVAILABLE_VERSIONS } from "../docs/version";

interface NestHeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenSearch: () => void;
}

export const NestHeader: React.FC<NestHeaderProps> = ({
  sidebarCollapsed,
  onToggleSidebar,
  mobileMenuOpen,
  onToggleMobileMenu,
  onOpenSearch,
}) => {
  const pathname = usePathname();
  const [selectedVersion, setSelectedVersion] = useState<string>(CURRENT_PROJECT_VERSION);
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState<boolean>(false);

  // Stacklenzz top multi-page navigation tabs
  const topTabs = [
    { label: "Getting Started", href: "/docs/getting-started" },
    { label: "Frontend & UI", href: "/docs/frontend-ui" },
    { label: "Backend SDK", href: "/docs/backend-sdk" },
    { label: "Production", href: "/docs/production" },
    { label: "Community", href: "/docs/community" },
  ];

  return (
    <header className="relative z-50 shrink-0 h-14 flex items-center justify-between px-4 bg-[#0f172a] border-b border-[#1e293b] w-full text-slate-100 shadow-md">
      {/* Left side: Hamburger, Sidebar toggle, Logo, Version selector */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleMobileMenu}
          className="flex lg:hidden items-center justify-center p-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-slate-300 hover:text-white cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {/* Desktop Sidebar toggle */}
        <button
          onClick={onToggleSidebar}
          className="hidden lg:flex items-center justify-center p-1.5 rounded-lg bg-[#111827] border border-[#1e293b] text-slate-400 hover:text-white cursor-pointer transition-colors"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <PanelLeft size={18} />}
        </button>

        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <StacklenzzLogo size={32} />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              Stacklenzz
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]">
              DOCS
            </span>
          </div>
        </Link>

        {/* Version dropdown */}
        <div className="hidden sm:block relative ml-1">
          <button
            onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
            className="flex items-center gap-1 bg-[#111827] hover:bg-[#1f2937] border border-[#1e293b] rounded-lg px-2.5 py-1 text-slate-300 text-[11px] font-semibold cursor-pointer transition-colors"
          >
            <span className="text-indigo-400">{selectedVersion}</span>
            <ChevronDown size={11} className={`text-slate-400 transition-transform ${isVersionDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isVersionDropdownOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-[160px] bg-[#111827] border border-[#1e293b] rounded-xl p-1.5 shadow-2xl">
              <div className="text-[10px] font-bold uppercase text-slate-500 px-2 py-1">
                Select Version
              </div>
              {AVAILABLE_VERSIONS.map((item) => (
                <button
                  key={item.version}
                  onClick={() => {
                    setSelectedVersion(item.version);
                    setIsVersionDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer text-left transition-colors ${
                    selectedVersion === item.version
                      ? "bg-indigo-500/20 text-indigo-400 font-semibold"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <span>{item.version}</span>
                  {item.label && (
                    <span className="text-[9px] text-slate-400 font-mono">
                      {item.label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Top Category Tabs */}
      <nav className="hidden lg:flex items-center gap-1">
        {topTabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                isActive
                  ? "bg-indigo-600 text-white font-semibold shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Right side: Search trigger, Demo console & GitHub */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#111827] hover:bg-[#1f2937] border border-[#1e293b] rounded-lg text-slate-300 text-xs transition-colors cursor-pointer"
        >
          <Search size={14} className="text-indigo-400" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ⌘K
          </kbd>
        </button>

        <Link
          href="/docs/observability-dashboard"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold no-underline shadow-md hover:from-indigo-500 hover:to-blue-500 transition-all"
        >
          <Play size={13} /> Demo Console
        </Link>

        <a
          href="https://github.com/ideateGudy/stacklenzz"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-[#111827] hover:bg-[#1f2937] border border-[#1e293b] text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
          title="Stacklenzz GitHub"
        >
          <GitBranch size={16} />
        </a>
      </div>
    </header>
  );
};
