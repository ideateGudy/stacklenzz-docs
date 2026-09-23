"use client";

import React from "react";
import { GitBranch, Heart, BookOpen, ExternalLink } from "lucide-react";
import { NestCallout } from "../../components/NestCallout";

export default function CommunityPage() {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <GitBranch size={13} /> Community & Monorepo
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 mb-3">
          Contributing & Open Source Repositories
        </h1>
        <p className="text-slate-400 text-base leading-relaxed m-0">
          We welcome contributions to improve Stacklenzz backend telemetry, React dashboard UI components, CLI utilities, and documentation.
        </p>
      </div>

      {/* Section 1: Repositories */}
      <section id="repositories" className="space-y-4">
        <h2 id="repositories-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          🐙 GitHub Repositories
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Explore and contribute to our GitHub repositories:
        </p>

        <div className="space-y-3">
          <div className="p-5 bg-[#111827] border border-[#1e293b] rounded-2xl">
            <h3 id="repo-docs" className="text-base font-bold text-white m-0 mb-1 flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-400" /> Documentation Website Repo
            </h3>
            <p className="text-xs text-slate-400 m-0 mb-3">
              Source code for this Next.js 16 documentation site.
            </p>
            <a
              href="https://github.com/ideateGudy/stacklenzz-docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold hover:underline"
            >
              github.com/ideateGudy/stacklenzz-docs <ExternalLink size={12} />
            </a>
          </div>

          <div className="p-5 bg-[#111827] border border-[#1e293b] rounded-2xl">
            <h3 id="repo-monorepo" className="text-base font-bold text-white m-0 mb-1 flex items-center gap-2">
              <GitBranch size={18} className="text-emerald-400" /> Main Monorepo (Source Code)
            </h3>
            <p className="text-xs text-slate-400 m-0 mb-3">
              Core telemetry SDK (`@stacklenzz/server`), UI dashboard library (`@stacklenzz/ui`), CLI tool, and MCP server (`@stacklenzz/mcp`).
            </p>
            <a
              href="https://github.com/ideateGudy/stacklenzz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold hover:underline"
            >
              github.com/ideateGudy/stacklenzz <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <NestCallout type="tip" title="SUBMITTING PULL REQUESTS">
          Please check open issues and pull request guidelines in the repository before starting major feature implementations.
        </NestCallout>
      </section>
    </div>
  );
}
