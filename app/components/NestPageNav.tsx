"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NavGroup } from "./NestSidebar";

interface NestPageNavProps {
  navItems: NavGroup[];
}

export const NestPageNav: React.FC<NestPageNavProps> = ({ navItems }) => {
  const pathname = usePathname();
  const flatItems = navItems.flatMap((g) => g.items);
  const currentIndex = flatItems.findIndex((item) => item.href === pathname);

  if (currentIndex === -1) return null;

  const prevItem = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const nextItem = currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  return (
    <div className="mt-14 pt-6 border-t border-[#1e293b] grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prevItem ? (
        <Link
          href={prevItem.href}
          className="flex items-center gap-3 p-4 bg-[#111827] hover:bg-[#1f2937] border border-[#1e293b] hover:border-indigo-500/50 rounded-xl text-left transition-all duration-200 cursor-pointer group shadow-sm no-underline"
        >
          <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors shrink-0">
            <ArrowLeft size={18} />
          </div>
          <div className="truncate">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Previous Section
            </span>
            <span className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors truncate block">
              {prevItem.label}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextItem && (
        <Link
          href={nextItem.href}
          className="flex items-center justify-end gap-3 p-4 bg-[#111827] hover:bg-[#1f2937] border border-[#1e293b] hover:border-indigo-500/50 rounded-xl text-right transition-all duration-200 cursor-pointer group shadow-sm sm:col-start-2 no-underline"
        >
          <div className="truncate">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Next Section
            </span>
            <span className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors truncate block">
              {nextItem.label}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors shrink-0">
            <ArrowRight size={18} />
          </div>
        </Link>
      )}
    </div>
  );
};
