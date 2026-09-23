"use client";

import React, { ReactNode } from "react";
import { Info, AlertTriangle, HelpCircle, Lightbulb } from "lucide-react";

interface NestCalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: ReactNode;
}

export const NestCallout: React.FC<NestCalloutProps> = ({
  type = "info",
  title,
  children,
}) => {
  const styles = {
    info: {
      border: "border-l-4 border-l-indigo-500 bg-indigo-950/30 border-y border-r border-indigo-500/20",
      icon: <Info size={18} className="text-indigo-400 shrink-0 mt-0.5" />,
      titleColor: "text-indigo-400",
      defaultTitle: "NOTE",
    },
    tip: {
      border: "border-l-4 border-l-emerald-500 bg-emerald-950/30 border-y border-r border-emerald-500/20",
      icon: <Lightbulb size={18} className="text-emerald-400 shrink-0 mt-0.5" />,
      titleColor: "text-emerald-400",
      defaultTitle: "HINT",
    },
    warning: {
      border: "border-l-4 border-l-amber-500 bg-amber-950/30 border-y border-r border-amber-500/20",
      icon: <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />,
      titleColor: "text-amber-400",
      defaultTitle: "WARNING",
    },
    danger: {
      border: "border-l-4 border-l-rose-500 bg-rose-950/30 border-y border-r border-rose-500/20",
      icon: <HelpCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />,
      titleColor: "text-rose-400",
      defaultTitle: "IMPORTANT",
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <div className={`my-5 rounded-r-xl p-4 transition-all duration-150 ${currentStyle.border}`}>
      <div className="flex items-start gap-3">
        {currentStyle.icon}
        <div className="flex-1 text-sm text-slate-300 leading-relaxed">
          <div className={`font-bold text-xs uppercase tracking-wider mb-1 ${currentStyle.titleColor}`}>
            {title || currentStyle.defaultTitle}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
