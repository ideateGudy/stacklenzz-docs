"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Server,
  Activity,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  Play,
  Layers,
} from "lucide-react";
import { CodeBlock } from "../../components/CodeBlock";
import { NestCallout } from "../../components/NestCallout";

export default function GettingStartedPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [installPm, setInstallPm] = useState<"cli" | "npm" | "pnpm" | "bun" | "yarn">("cli");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Sparkles size={13} /> Getting Started Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 mb-3">
          Overview & Quick Start
        </h1>
        <p className="text-slate-400 text-base leading-relaxed m-0">
          Turnkey Node.js backend observability for Express, NestJS, Fastify, and Koa, paired with ready-to-mount React & Next.js admin dashboards. Collect Prometheus metrics, OpenTelemetry traces, and intelligent error fingerprints with zero external framework lock-in.
        </p>
      </div>

      <NestCallout type="info" title="PRODUCTION-READY TELEMETRY">
        Stacklenzz runs directly inside your existing infrastructure without requiring expensive third-party SaaS agents or external collectors.
      </NestCallout>

      {/* Section 1: Core Architecture */}
      <section id="architecture" className="space-y-6">
        <h2 id="architecture-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          Architecture & Pipeline Overview
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Stacklenzz provides an end-to-end telemetry pipeline designed specifically for JavaScript and TypeScript applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 flex flex-col">
            <div className="text-indigo-400 mb-2"><Server size={22} /></div>
            <h3 id="backend-core-sdk" className="m-0 mb-1.5 text-base font-bold text-white tracking-tight">
              Backend Core SDK
            </h3>
            <p className="m-0 text-xs text-slate-400 leading-relaxed">
              One-line middleware setup for Express and NestJS. Exposes <code className="text-indigo-300 font-mono">/metrics</code> for Prometheus and <code className="text-indigo-300 font-mono">/api/observability/stats</code>.
            </p>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 flex flex-col">
            <div className="text-sky-400 mb-2"><Activity size={22} /></div>
            <h3 id="react-dashboard-ui" className="m-0 mb-1.5 text-base font-bold text-white tracking-tight">
              React Dashboard UI
            </h3>
            <p className="m-0 text-xs text-slate-400 leading-relaxed">
              6 pre-built dashboard layouts, 6 runtime color themes, deep error inspector with stack traces and breadcrumb timelines.
            </p>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 flex flex-col">
            <div className="text-emerald-400 mb-2"><Terminal size={22} /></div>
            <h3 id="zero-config-cli" className="m-0 mb-1.5 text-base font-bold text-white tracking-tight">
              Zero-Config CLI
            </h3>
            <p className="m-0 text-xs text-slate-400 leading-relaxed">
              Detects Next.js App/Pages Router and Vite. Installs UI routes, initializes configs, and validates connectivity with <code className="text-emerald-300 font-mono">doctor</code>.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 id="telemetry-flow" className="text-lg font-semibold text-indigo-300 m-0">
            Telemetry Data Flow
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed m-0">
            1. Incoming HTTP requests pass through the Stacklenzz backend middleware.<br />
            2. Latencies, HTTP status codes, CPU/memory stats, and error stack traces are aggregated into memory buffers.<br />
            3. React administrative UI fetches aggregated stats from your server or queries OpenTelemetry traces.
          </p>
        </div>
      </section>

      {/* Section 2: Quick Start Steps */}
      <section id="quickstart-steps" className="space-y-6">
        <h2 id="quickstart-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          ⚡️ Quick Start in 3 Steps
        </h2>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <h3 id="step-1-backend" className="flex items-center gap-2.5 font-bold text-base text-white m-0">
                <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white shrink-0">1</span>
                Instrument Your Backend
              </h3>
              <button
                onClick={() => copyToClipboard("npm install @stacklenzz/server", "code-step1")}
                className="bg-transparent border-none text-slate-400 cursor-pointer flex items-center gap-1.5 text-xs hover:text-white transition-colors"
              >
                {copiedCode === "code-step1" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />} Copy
              </button>
            </div>
            <pre className="m-0 p-3.5 bg-slate-950 rounded-xl text-slate-100 font-mono text-xs sm:text-sm border border-[#1e293b] overflow-x-auto whitespace-pre-wrap break-words">
              npm install @stacklenzz/server
            </pre>
          </div>

          {/* Step 2 */}
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6">
            <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
              <h3 id="step-2-frontend" className="flex items-center gap-2.5 font-bold text-base text-white m-0">
                <span className="w-6 h-6 rounded-full bg-sky-600 flex items-center justify-center text-xs text-white shrink-0">2</span>
                Scaffold Frontend Dashboard
              </h3>
              <button
                onClick={() => copyToClipboard("npx stacklenzz dashboard", "code-step2")}
                className="bg-transparent border-none text-slate-400 cursor-pointer flex items-center gap-1.5 text-xs hover:text-white transition-colors"
              >
                {copiedCode === "code-step2" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />} Copy
              </button>
            </div>
            <pre className="m-0 p-3.5 bg-slate-950 rounded-xl text-slate-100 font-mono text-xs sm:text-sm border border-[#1e293b] overflow-x-auto whitespace-pre-wrap break-words">
              npx stacklenzz dashboard
            </pre>
          </div>

          {/* Step 3 */}
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-6">
            <h3 id="step-3-demo" className="font-bold text-base mb-2 flex items-center gap-2.5 text-white m-0">
              <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs text-white shrink-0">3</span>
              View Live Protected Route
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Navigate to your frontend application to inspect live traffic, latencies, and errors in real-time:
            </p>
            <div>
              <Link
                href="/docs/observability-dashboard"
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold no-underline hover:bg-indigo-500 transition-colors shadow-lg"
              >
                Open Live Demo Console <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Installation Options */}
      <section id="installation-options" className="space-y-4">
        <h2 id="installation-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          📦 Package Installation Options
        </h2>
        <p className="text-slate-400 text-sm">
          Select your preferred package manager to view installation commands:
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {(["cli", "npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setInstallPm(pm)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer uppercase transition-colors ${
                installPm === pm
                  ? "border-indigo-500 bg-indigo-500/20 text-white"
                  : "border-[#1e293b] bg-[#111827] text-slate-400 hover:bg-slate-800"
              }`}
            >
              {pm === "cli" ? "CLI Auto (Recommended)" : pm}
            </button>
          ))}
        </div>

        <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 id="package-managers" className="text-xs text-slate-400 font-mono m-0">
              Terminal Command ({installPm.toUpperCase()})
            </h3>
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
              {copiedCode === "install-cmd" ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />} Copy
            </button>
          </div>

          <pre className="m-0 p-4 bg-slate-950 rounded-xl text-slate-50 font-mono text-xs sm:text-sm border border-[#1e293b] overflow-x-auto whitespace-pre-wrap break-words">
            {installPm === "cli" && `# 1. Scaffold Dashboard Route\nnpx stacklenzz dashboard\n\n# 2. Run Doctor to Validate Connection\nnpx stacklenzz doctor`}
            {installPm === "npm" && `npm install @stacklenzz/server @stacklenzz/ui lucide-react`}
            {installPm === "pnpm" && `pnpm add @stacklenzz/server @stacklenzz/ui lucide-react`}
            {installPm === "bun" && `bun add @stacklenzz/server @stacklenzz/ui lucide-react`}
            {installPm === "yarn" && `yarn add @stacklenzz/server @stacklenzz/ui lucide-react`}
          </pre>
        </div>
      </section>
    </div>
  );
}
