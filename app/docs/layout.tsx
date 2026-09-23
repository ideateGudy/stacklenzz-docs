"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Activity,
  Layers,
  Terminal,
  Cpu,
  Server,
  Bell,
  Code,
  Shield,
  Zap,
  Sparkles,
  GitBranch,
  Search,
  X,
  CornerDownLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NestHeader } from "../components/NestHeader";
import { NestSidebar, NavGroup } from "../components/NestSidebar";
import { NestToc } from "../components/NestToc";
import { NestPageNav } from "../components/NestPageNav";

export const DOCS_NAV_ITEMS: NavGroup[] = [
  {
    group: "Getting Started",
    items: [
      {
        id: "getting-started",
        label: "Overview & Quick Start",
        href: "/docs/getting-started",
        icon: <Zap size={16} />,
      },
    ],
  },
  {
    group: "Frontend & UI Dashboards",
    items: [
      {
        id: "frontend-ui",
        label: "React UI & 6 Themes",
        href: "/docs/frontend-ui",
        icon: <Activity size={16} />,
      },
    ],
  },
  {
    group: "Backend SDK & MCP",
    items: [
      {
        id: "backend-sdk",
        label: "Express, NestJS & Traces",
        href: "/docs/backend-sdk",
        icon: <Server size={16} />,
      },
      {
        id: "mcp",
        label: "Agentic AI & MCP Server",
        href: "/docs/mcp",
        icon: <Cpu size={16} />,
      },
      {
        id: "webhooks",
        label: "Slack & Discord Webhooks",
        href: "/docs/webhooks",
        icon: <Bell size={16} />,
      },
    ],
  },
  {
    group: "Production & Deploy",
    items: [
      {
        id: "production",
        label: "Security & Live Deploy",
        href: "/docs/production",
        icon: <Shield size={16} />,
      },
    ],
  },
  {
    group: "Community",
    items: [
      {
        id: "community",
        label: "Contributing",
        href: "/docs/community",
        icon: <GitBranch size={16} />,
      },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Listen for Ctrl+K / Cmd+K and Esc
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

  return (
    <div className="flex flex-col h-screen max-h-screen w-screen max-w-[100vw] overflow-hidden bg-[#090d16] text-slate-100 font-sans">
      {/* Header Bar */}
      <NestHeader
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex w-full flex-1 min-h-0 overflow-hidden relative">
        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 top-14 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="fixed top-14 left-0 bottom-0 z-50 w-72 lg:hidden bg-[#0f172a] border-r border-[#1e293b]"
              >
                <NestSidebar
                  navItems={DOCS_NAV_ITEMS}
                  onSelectNav={() => setMobileMenuOpen(false)}
                  onSearchClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Left Sidebar */}
        <div className="hidden lg:block h-full shrink-0">
          <NestSidebar
            navItems={DOCS_NAV_ITEMS}
            collapsed={sidebarCollapsed}
            onSearchClick={() => setIsSearchOpen(true)}
          />
        </div>

        {/* Center Main Article Scroll Container */}
        <main
          id="docs-main-scroll-container"
          className="flex-1 min-w-0 w-full h-full overflow-y-auto p-6 md:p-10 pb-24 leading-relaxed bg-[#090d16]"
        >
          <div className="max-w-4xl mx-auto">
            {children}
            <NestPageNav navItems={DOCS_NAV_ITEMS} />
          </div>
        </main>

        {/* Right Sidebar: "On this page" TOC */}
        <NestToc />
      </div>

      {/* Quick Command Palette / Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-[12vh] px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[580px] bg-[#111827] border border-[#1e293b] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_35px_rgba(99,102,241,0.15)] overflow-hidden flex flex-col"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1e293b] bg-[#0f172a]">
                <Search size={18} className="text-indigo-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search documentation topics, APIs, setup..."
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
                <div className="text-[11px] px-2 py-1 bg-[#111827] rounded border border-[#1e293b] text-slate-400 font-medium">
                  ESC
                </div>
              </div>

              <div className="max-h-[380px] overflow-y-auto p-2 flex flex-col gap-1">
                {(() => {
                  const query = searchQuery.trim().toLowerCase();
                  const allItems = DOCS_NAV_ITEMS.flatMap((g) =>
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
                        router.push(item.href);
                      }}
                      className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl border-none bg-transparent text-slate-200 cursor-pointer text-left transition-colors hover:bg-indigo-500/15"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-[13.5px] font-medium text-slate-50 group-hover:text-indigo-400 transition-colors">
                            {item.label}
                          </div>
                          <div className="text-[11.5px] text-slate-500">
                            {item.groupName}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-indigo-400">Open Page</span>
                        <CornerDownLeft size={13} className="text-indigo-400" />
                      </div>
                    </button>
                  ));
                })()}
              </div>

              <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#1e293b] text-[11px] text-slate-500 bg-[#0f172a]">
                <div className="flex items-center gap-3">
                  <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 mr-1 text-slate-400">↵</kbd> to select</span>
                  <span><kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 mr-1 text-slate-400">ESC</kbd> to close</span>
                </div>
                <span className="text-indigo-400 font-medium">Stacklenzz Docs</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
