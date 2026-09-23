"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Search, BookOpen } from "lucide-react";

export interface NavSubItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface NavGroup {
  group: string;
  items: NavSubItem[];
}

interface NestSidebarProps {
  navItems: NavGroup[];
  activeSection?: string;
  collapsed?: boolean;
  onSearchClick?: () => void;
  onSelectNav?: () => void;
}

export const NestSidebar: React.FC<NestSidebarProps> = ({
  navItems,
  activeSection,
  collapsed = false,
  onSearchClick,
  onSelectNav,
}) => {
  const pathname = usePathname();

  // Store expanded state for category groups
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navItems.forEach((g) => {
      initial[g.group] = true;
    });
    return initial;
  });

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  if (collapsed) {
    return (
      <aside className="w-16 shrink-0 bg-[#0f172a] border-r border-[#1e293b] flex flex-col items-center py-4 gap-4 z-40 transition-all duration-200">
        {navItems.flatMap((g) => g.items).map((item) => {
          const isActive = pathname === item.href || (activeSection && activeSection === item.id);
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={onSelectNav}
              className={`relative p-2.5 rounded-lg transition-all duration-150 group ${
                isActive
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
              }`}
              title={item.label}
            >
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-indigo-500 rounded-r-sm" />
              )}
              {item.icon || <BookOpen size={18} />}
            </Link>
          );
        })}
      </aside>
    );
  }

  return (
    <aside className="w-72 shrink-0 bg-[#0f172a] border-r border-[#1e293b] flex flex-col h-full overflow-y-auto select-none z-40 transition-all duration-200">
      {/* Quick Search Button */}
      <div className="p-3 border-b border-[#1e293b]">
        <button
          onClick={onSearchClick}
          className="w-full flex items-center justify-between px-3 py-2 bg-[#111827] hover:bg-[#1f2937] border border-[#1e293b] rounded-lg text-slate-400 text-xs transition-all duration-150 cursor-pointer shadow-sm group"
        >
          <div className="flex items-center gap-2">
            <Search size={14} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            <span>Search docs...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Navigation Links Accordions */}
      <nav className="flex-1 px-3 py-4 space-y-4">
        {navItems.map((group) => {
          const isExpanded = expandedGroups[group.group] ?? true;
          const hasActiveChild = group.items.some(
            (item) => pathname === item.href || (activeSection && activeSection === item.id)
          );

          return (
            <div key={group.group} className="space-y-1">
              {/* Category Header Accordion Trigger */}
              <button
                onClick={() => toggleGroup(group.group)}
                className={`w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-left ${
                  hasActiveChild ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{group.group}</span>
                <span className="text-slate-500 hover:text-slate-300">
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </button>

              {/* Sub-items List */}
              {isExpanded && (
                <ul className="space-y-0.5 pl-1.5">
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href || (activeSection && activeSection === item.id);
                    return (
                      <li key={item.id} className="relative">
                        <Link
                          href={item.href}
                          onClick={onSelectNav}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 text-left ${
                            isActive
                              ? "bg-indigo-500/15 text-indigo-400 font-semibold"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                          }`}
                        >
                          {/* Stacklenzz Active Indicator line */}
                          {isActive && <div className="nest-active-indicator" />}

                          <div className="flex items-center gap-2.5 truncate">
                            <span
                              className={`shrink-0 ${
                                isActive ? "text-indigo-400" : "text-slate-400"
                              }`}
                            >
                              {item.icon}
                            </span>
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span className="ml-2 px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer info tag */}
      <div className="p-3 border-t border-[#1e293b] text-center">
        <span className="text-[11px] text-slate-500 font-medium">
          Stacklenzz Documentation &bull; v1.0
        </span>
      </div>
    </aside>
  );
};
