"use client";

import React from "react";
import { Activity, Sparkles, Terminal, Code, Cpu } from "lucide-react";
import { CodeBlock } from "../../components/CodeBlock";
import { NestCallout } from "../../components/NestCallout";

export default function FrontendUiPage() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Activity size={13} /> Frontend & UI Dashboard Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 mb-3">
          React & Next.js Admin Dashboard UI
        </h1>
        <p className="text-slate-400 text-base leading-relaxed m-0">
          Embed pre-built, production-grade telemetry dashboards directly into your Next.js App Router or React application. Features 6 runtime themes, live chart refresh, and stack trace inspection.
        </p>
      </div>

      {/* Section 1: React Component Mount */}
      <section id="react-component-setup" className="space-y-4">
        <h2 id="component-mounting-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          React Component Mounting & Props
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Render the unified <code>&lt;ObservabilityDashboard /&gt;</code> component inside any client component:
        </p>

        <CodeBlock
          title="Next.js App Router Page (app/admin/observability/page.tsx)"
          language="tsx"
          code={`"use client";

import { ObservabilityDashboard } from "@stacklenzz/ui";

export default function AdminObservabilityPage() {
  return (
    <main className="min-h-screen bg-[#090d16]">
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
        />

        <h3 id="dashboard-prop-options" className="text-lg font-semibold text-indigo-300 mt-4">
          Available Dashboard Component Props
        </h3>
        <div className="bg-[#111827] border border-[#1e293b] rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead className="bg-[#0f172a] text-slate-400 font-semibold border-b border-[#1e293b]">
              <tr>
                <th className="p-3">Prop</th>
                <th className="p-3">Type</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              <tr>
                <td className="p-3 font-mono text-indigo-300">endpoint</td>
                <td className="p-3 font-mono">string</td>
                <td className="p-3 font-mono">"/api/observability/stats"</td>
                <td className="p-3">URL of the backend observability stats endpoint</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-indigo-300">refreshIntervalMs</td>
                <td className="p-3 font-mono">number</td>
                <td className="p-3 font-mono">5000</td>
                <td className="p-3">Polling interval for live metric updates</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-indigo-300">defaultDashboard</td>
                <td className="p-3 font-mono">"full" | "minimal" | "errors"</td>
                <td className="p-3 font-mono">"full"</td>
                <td className="p-3">Initial dashboard tab layout view</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-indigo-300">showSwitcher</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono">true</td>
                <td className="p-3">Display theme & dashboard mode selector header</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: 6 Built-in Themes */}
      <section id="dashboard-themes" className="space-y-4">
        <h2 id="themes-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          🎨 6 Built-in Runtime Themes
        </h2>
        <p className="text-slate-400 text-sm">
          Switch themes live on the UI or configure your preferred default aesthetic. Theme selections automatically persist immediately to <code>localStorage</code> (key: <code>stacklenzz_theme</code>):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4">
          {[
            { name: "Tokyo Night", id: "theme-tokyo-night", color: "#7aa2f7", desc: "Deep indigo & neon cyan" },
            { name: "Nord", id: "theme-nord", color: "#88c0d0", desc: "Arctic cool frost blues" },
            { name: "Dracula", id: "theme-dracula", color: "#bd93f9", desc: "Vibrant purple & pink accents" },
            { name: "Catppuccin Mocha", id: "theme-catppuccin", color: "#cba6f7", desc: "Soothing pastel dark palette" },
            { name: "Emerald Terminal", id: "theme-emerald", color: "#10b981", desc: "Monochrome hacker terminal" },
            { name: "Cyberpunk", id: "theme-cyberpunk", color: "#f43f5e", desc: "High-contrast neon pink" },
          ].map((t) => (
            <div key={t.id} className="p-4 bg-[#111827] border border-[#1e293b] rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.color }}></span>
                <h3 id={t.id} className="font-semibold text-sm text-white m-0">{t.name}</h3>
              </div>
              <div className="text-xs text-slate-400">{t.desc}</div>
            </div>
          ))}
        </div>

        <NestCallout type="tip" title="NO FLICKER RE-RENDERING">
          The active theme is calculated before component mount to ensure crisp initial render with zero unstyled color flash.
        </NestCallout>
      </section>

      {/* Section 3: SLA Health Evaluation Logic */}
      <section id="sla-health-evaluation" className="space-y-4">
        <h2 id="sla-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          🏥 Dynamic SLA Health Evaluation Logic
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The service header dynamically calculates composite system health (<code>HEALTHY</code> / <code>DEGRADED</code> / <code>CRITICAL</code>) in real-time, respecting your active <strong>Error Rate time window filter</strong>:
        </p>

        <ul className="space-y-2 text-slate-300 text-xs sm:text-sm pl-4 list-disc">
          <li><strong className="text-rose-400">CRITICAL</strong>: Triggered if active 5xx Error Rate &ge; 5.0%, remaining error budget &le; 0%, P95 Latency &ge; 2,000ms, CPU Load &ge; 90%, Event Loop Lag &ge; 100ms, or Heap &ge; 95% (when Heap &gt; 128MB).</li>
          <li><strong className="text-amber-400">DEGRADED</strong>: Triggered if active 5xx Error Rate &ge; 1.0%, P95 Latency &ge; 800ms, CPU Load &ge; 75%, Event Loop Lag &ge; 30ms, or Heap &ge; 85% (when Heap &gt; 128MB).</li>
          <li><strong className="text-emerald-400">HEALTHY</strong>: All metrics operating within normal baseline boundaries.</li>
        </ul>

        <h3 id="error-rate-formula" className="text-lg font-semibold text-indigo-300 mt-4">
          5xx Server Error Rate Formula & Depleted SLO Bar
        </h3>
        <pre className="p-3.5 bg-slate-950 rounded-xl text-indigo-300 font-mono text-xs border border-[#1e293b] overflow-x-auto whitespace-pre-wrap break-words">
          Error Rate % = (Total HTTP 500+ Responses / Total HTTP Responses) &times; 100
        </pre>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          When your error budget drops to 0%, the <code>&lt;SloCard /&gt;</code> visualizes a clear red depleted budget track rather than rendering empty space, keeping SLO status and service headers synchronized.
        </p>
      </section>

      {/* Section 4: CLI Commands Reference */}
      <section id="cli-commands" className="space-y-4">
        <h2 id="cli-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          💻 CLI Commands Reference
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The zero-config CLI simplifies setup and diagnostic checks across Next.js and Vite projects:
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-[#111827] border border-[#1e293b] rounded-xl">
            <h3 id="cli-dashboard" className="font-mono text-sm text-indigo-300 font-bold m-0 mb-1">
              npx stacklenzz dashboard
            </h3>
            <p className="text-xs text-slate-400 m-0">
              Scaffolds the administrative observability route for Next.js App Router, Pages Router, or Vite.
            </p>
          </div>

          <div className="p-4 bg-[#111827] border border-[#1e293b] rounded-xl">
            <h3 id="cli-doctor" className="font-mono text-sm text-emerald-300 font-bold m-0 mb-1">
              npx stacklenzz doctor
            </h3>
            <p className="text-xs text-slate-400 m-0">
              Validates backend connection, CORS settings, Prometheus endpoint output, and telemetry health.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
