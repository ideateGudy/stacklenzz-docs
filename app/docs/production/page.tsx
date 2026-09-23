"use client";

import React from "react";
import { Shield, ExternalLink, Server, Key, Lock, Cloud } from "lucide-react";
import { CodeBlock } from "../../components/CodeBlock";
import { NestCallout } from "../../components/NestCallout";

export default function ProductionPage() {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Shield size={13} /> Production & Security Deployment Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 mb-3">
          Production Security & Live Deployment
        </h1>
        <p className="text-slate-400 text-base leading-relaxed m-0">
          Secure your telemetry endpoints with token authentication, rate limiting, and CORS configurations. Deploy on Vercel, AWS, Docker, or Railway.
        </p>
      </div>

      {/* Section 1: Security & Auth */}
      <section id="security" className="space-y-4">
        <h2 id="security-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          🔒 Endpoint Security & Authentication
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Because the dashboard displays real-time operational telemetry, process memory, and error logs, protect the administrative dashboard route (<code>/admin/observability</code>) or your backend endpoints using standard application session or cookie middleware:
        </p>

        <CodeBlock
          title="Next.js App Router Protection (middleware.ts)"
          language="typescript"
          code={`import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin/observability")) {
    const adminSession = req.cookies.get("admin_session");
    if (!adminSession) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}`}
        />

        <NestCallout type="tip" title="100% SELF-HOSTED & PRIVATE">
          Stacklenzz runs completely within your own infrastructure. No external SaaS cloud keys or external vendor signups required.
        </NestCallout>

        <h3 id="cors-configuration" className="text-lg font-semibold text-indigo-300 mt-4">
          CORS & Origin Whitelisting
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          When serving the admin dashboard on a separate domain (e.g., <code>https://admin.yourdomain.com</code>), configure CORS headers on the backend server:
        </p>

        <CodeBlock
          title="NestJS CORS Configuration (src/main.ts)"
          language="typescript"
          code={`app.enableCors({
  origin: ["https://admin.yourdomain.com"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
});`}
        />
      </section>

      {/* Section 2: Hosting & Deployment */}
      <section id="deployment" className="space-y-4">
        <h2 id="deployment-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          ☁️ Hosting & Cloud Deployment Options
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Stacklenzz is lightweight and runs seamlessly in any cloud container or serverless environment:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          <div className="p-5 bg-[#111827] border border-[#1e293b] rounded-2xl">
            <h3 id="deploy-vercel" className="font-bold text-white text-base m-0 mb-1 flex items-center gap-2">
              <Cloud size={18} className="text-sky-400" /> Vercel Serverless
            </h3>
            <p className="text-xs text-slate-400 m-0 leading-relaxed">
              Deploy Next.js App Router dashboards directly to Vercel with zero runtime configuration required.
            </p>
          </div>

          <div className="p-5 bg-[#111827] border border-[#1e293b] rounded-2xl">
            <h3 id="deploy-docker" className="font-bold text-white text-base m-0 mb-1 flex items-center gap-2">
              <Server size={18} className="text-indigo-400" /> Docker Containers
            </h3>
            <p className="text-xs text-slate-400 m-0 leading-relaxed">
              Expose Prometheus metrics on port 5000 for standard Docker Compose or Kubernetes scraping targets.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
