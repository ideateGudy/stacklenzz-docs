"use client";

import React, { useState, useEffect } from "react";
import { List } from "lucide-react";
import { usePathname } from "next/navigation";

export interface TocItem {
  id: string;
  text: string;
  level: number; // 2 for h2, 3 for h3, 4 for h4
}

export const NestToc: React.FC = () => {
  const pathname = usePathname();
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");

  const updateToc = () => {
    const container = document.getElementById("docs-main-scroll-container");
    if (!container) return;

    const headings = Array.from(
      container.querySelectorAll("h2, h3, h4")
    ) as HTMLElement[];

    const items: TocItem[] = headings.map((h, idx) => {
      let id = h.id;
      if (!id) {
        id = `heading-${idx}-${h.innerText.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        h.id = id;
      }
      const level = parseInt(h.tagName.substring(1), 10) || 2;
      return {
        id,
        text: h.innerText.replace(/#/g, "").trim(),
        level,
      };
    });

    setTocItems(items);
    if (items.length > 0 && !activeHeadingId) {
      setActiveHeadingId(items[0].id);
    }
  };

  useEffect(() => {
    updateToc();

    // Re-run TOC extraction after small delays to ensure client components are mounted
    const t1 = setTimeout(updateToc, 100);
    const t2 = setTimeout(updateToc, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  // Track scroll position inside container to highlight active heading
  useEffect(() => {
    const container = document.getElementById("docs-main-scroll-container");
    if (!container || tocItems.length === 0) return;

    const handleScroll = () => {
      const containerTop = container.scrollTop;
      let current = tocItems[0]?.id || "";

      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const topPos = el.offsetTop - container.offsetTop;
          if (containerTop >= topPos - 90) {
            current = item.id;
          }
        }
      }
      setActiveHeadingId(current);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    setActiveHeadingId(id);
    const target = document.getElementById(id);
    const container = document.getElementById("docs-main-scroll-container");
    if (target && container) {
      const topPos = target.offsetTop - container.offsetTop;
      container.scrollTo({ top: topPos - 30, behavior: "smooth" });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 shrink-0 pl-6 pr-4 py-8 z-30 select-none">
      <div className="sticky top-8 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-[#1e293b]">
          <List size={14} className="text-indigo-400" />
          <span>On this page</span>
        </div>

        <nav className="relative border-l border-[#1e293b] pl-3 space-y-2">
          {tocItems.map((item) => {
            const isActive = activeHeadingId === item.id;
            return (
              <div key={item.id} className="relative">
                {isActive && (
                  <div className="absolute -left-[13px] top-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
                )}
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-left transition-colors duration-150 cursor-pointer block leading-relaxed ${
                    item.level === 4
                      ? "pl-5 text-[10.5px]"
                      : item.level === 3
                      ? "pl-2.5 text-[11.5px]"
                      : "text-xs font-medium"
                  } ${
                    isActive
                      ? "text-indigo-400 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {item.text}
                </button>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
