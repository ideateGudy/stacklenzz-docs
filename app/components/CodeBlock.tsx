"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  id?: string;
}

export function CodeBlock({ code, language = "typescript", title, id }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-2xl bg-slate-950 border border-white/10 overflow-hidden my-4 group box-border w-full min-w-0 max-w-full">
      {/* Top Bar with Title / Lang & Copy Button */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-white/10 text-xs font-mono text-slate-400">
        <span className="font-medium text-slate-300 truncate">
          {title || (language ? `${language}` : "Code")}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer text-xs shrink-0"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <div className="p-4 sm:p-5 overflow-x-auto">
        <pre className="m-0 text-slate-100 font-mono text-[13px] leading-relaxed whitespace-pre-wrap break-words">
          {code}
        </pre>
      </div>
    </div>
  );
}
