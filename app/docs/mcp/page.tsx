"use client";

import React from "react";
import { Cpu, Terminal, Sparkles, CheckCircle, Zap, Shield, Code, Server } from "lucide-react";
import { CodeBlock } from "../../components/CodeBlock";
import { NestCallout } from "../../components/NestCallout";

export default function McpPage() {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Cpu size={13} /> Model Context Protocol (MCP) Integration
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 mb-3">
          Agentic AI & MCP Server (@stacklenzz/mcp)
        </h1>
        <p className="text-slate-400 text-base leading-relaxed m-0">
          Connect your live backend telemetry, active 5xx crash logs, distributed traces, and SLO compliance metrics directly to AI coding assistants like Cursor, Windsurf, Claude Desktop, and Antigravity.
        </p>
      </div>

      <NestCallout type="info" title="AI-ASSISTED DEBUGGING & OBSERVABILITY">
        With <code>@stacklenzz/mcp</code>, your AI assistant can query live backend errors, inspect function stack traces, check database latency, and suggest code fixes directly in your IDE without leaving your editor.
      </NestCallout>

      {/* Section 1: What is MCP */}
      <section id="what-is-mcp" className="space-y-4">
        <h2 id="overview-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          Model Context Protocol Overview
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The <strong>Model Context Protocol (MCP)</strong> is an open standard that allows LLM applications to securely access local tools and real-time operational state. The <code>@stacklenzz/mcp</code> package implements a standard MCP stdio server exposing 5 dedicated telemetry tools:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 flex flex-col">
            <h3 className="font-mono text-indigo-300 font-bold text-sm m-0 mb-1">get_service_health</h3>
            <p className="m-0 text-xs text-slate-400 leading-relaxed">
              Returns real-time health score, uptime, active error rate, CPU load, and V8 heap utilization.
            </p>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 flex flex-col">
            <h3 className="font-mono text-rose-400 font-bold text-sm m-0 mb-1">get_recent_errors</h3>
            <p className="m-0 text-xs text-slate-400 leading-relaxed">
              Retrieves recent 4xx/5xx crash logs, fingerprints, stack traces, and request breadcrumbs.
            </p>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 flex flex-col">
            <h3 className="font-mono text-sky-400 font-bold text-sm m-0 mb-1">get_recent_traces</h3>
            <p className="m-0 text-xs text-slate-400 leading-relaxed">
              Inspects distributed trace waterfall spans (controller, middleware, database) to pinpoint latency bottlenecks.
            </p>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 flex flex-col">
            <h3 className="font-mono text-emerald-400 font-bold text-sm m-0 mb-1">get_slo_status</h3>
            <p className="m-0 text-xs text-slate-400 leading-relaxed">
              Queries SRE Target compliance (e.g. 99.5%), remaining error budget percentage, and burn rate.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Quick Start CLI / NPX */}
      <section id="mcp-quickstart" className="space-y-4">
        <h2 id="quickstart-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          🚀 Quick Start: Running the MCP Server
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          You can launch the MCP server over standard I/O (stdio) using <code>npx</code>:
        </p>

        <CodeBlock
          title="Launch MCP Server over Stdio"
          language="bash"
          code={`npx -y @stacklenzz/mcp`}
        />

        <p className="text-slate-300 text-sm leading-relaxed mt-4">
          By default, it queries your local backend stats endpoint at <code>http://localhost:5000/api/observability/stats</code>. You can customize the target backend using the <code>STACKLENZZ_ENDPOINT</code> environment variable.
        </p>
      </section>

      {/* Section 3: Configuration in AI Assistants */}
      <section id="ai-assistant-configs" className="space-y-4">
        <h2 id="configs-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          ⚙️ IDE & Assistant Configurations
        </h2>

        <h3 id="cursor-config" className="text-lg font-semibold text-indigo-300 mt-4">
          Cursor IDE Setup (.cursor/mcp.json)
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Add the following configuration to <code>.cursor/mcp.json</code> in your project workspace:
        </p>

        <CodeBlock
          title=".cursor/mcp.json"
          language="json"
          code={`{
  "mcpServers": {
    "stacklenzz": {
      "command": "npx",
      "args": ["-y", "@stacklenzz/mcp"],
      "env": {
        "STACKLENZZ_ENDPOINT": "http://localhost:5000/api/observability/stats"
      }
    }
  }
}`}
        />

        <h3 id="claude-desktop-config" className="text-lg font-semibold text-indigo-300 mt-6">
          Claude Desktop Setup (claude_desktop_config.json)
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Add Stacklenzz to your global Claude Desktop configuration file:
        </p>

        <CodeBlock
          title="claude_desktop_config.json"
          language="json"
          code={`{
  "mcpServers": {
    "stacklenzz-telemetry": {
      "command": "npx",
      "args": ["-y", "@stacklenzz/mcp"],
      "env": {
        "STACKLENZZ_ENDPOINT": "http://localhost:5000/api/observability/stats"
      }
    }
  }
}`}
        />
      </section>

      {/* Section 4: Example Prompts */}
      <section id="example-prompts" className="space-y-4">
        <h2 id="prompts-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          💬 Example AI Assistant Prompts
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Once configured, you can ask your AI coding assistant questions like:
        </p>

        <div className="space-y-3">
          <div className="p-4 bg-[#111827] border border-[#1e293b] rounded-xl text-xs sm:text-sm text-slate-200 font-mono">
            &ldquo;Check @stacklenzz/mcp for recent 5xx crash logs and suggest a fix for the failing route.&rdquo;
          </div>
          <div className="p-4 bg-[#111827] border border-[#1e293b] rounded-xl text-xs sm:text-sm text-slate-200 font-mono">
            &ldquo;Fetch slow API endpoints from Stacklenzz and inspect the trace waterfall for /api/checkout.&rdquo;
          </div>
          <div className="p-4 bg-[#111827] border border-[#1e293b] rounded-xl text-xs sm:text-sm text-slate-200 font-mono">
            &ldquo;What is our current SLO error budget remaining and burn rate?&rdquo;
          </div>
        </div>
      </section>
    </div>
  );
}
