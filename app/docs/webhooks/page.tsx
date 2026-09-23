"use client";

import React from "react";
import { Bell, ShieldAlert, Zap, MessageSquare, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { CodeBlock } from "../../components/CodeBlock";
import { NestCallout } from "../../components/NestCallout";

export default function WebhooksPage() {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Bell size={13} /> Zero-Cost Webhook Alerting Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 mb-3">
          Slack & Discord Webhook Alerts
        </h1>
        <p className="text-slate-400 text-base leading-relaxed m-0">
          Get real-time, beautifully formatted operational alerts delivered straight to your team's Slack channels or Discord servers without paying for third-party alert SaaS.
        </p>
      </div>

      <NestCallout type="info" title="SMART 5XX CRASH ALERTING">
        Stacklenzz automatically filters out 4xx client errors (e.g. 404 Not Found or 400 Bad Request) so your team is only alerted when actual 5xx server crashes occur. 5xx crash alerts fire immediately with zero cooldown suppression.
      </NestCallout>

      {/* Section 1: Overview & Channel Detection */}
      <section id="webhook-overview" className="space-y-4">
        <h2 id="overview-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          Automatic Channel Type Detection
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Stacklenzz inspects your webhook URL automatically to output native, visually rich payload cards for each platform:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 flex flex-col">
            <div className="text-emerald-400 mb-2 flex items-center gap-2 font-bold text-base">
              <Bell size={20} /> Slack Webhooks
            </div>
            <p className="m-0 text-xs text-slate-400 leading-relaxed">
              Detects <code className="text-emerald-300 font-mono">hooks.slack.com</code> URLs and formats alerts using Slack Block Kit UI with colored attachments, status badges, formatted stack traces, and local timestamps.
            </p>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-5 flex flex-col">
            <div className="text-indigo-400 mb-2 flex items-center gap-2 font-bold text-base">
              <MessageSquare size={20} /> Discord Webhooks
            </div>
            <p className="m-0 text-xs text-slate-400 leading-relaxed">
              Detects <code className="text-indigo-300 font-mono">discord.com/api/webhooks</code> URLs and formats alerts using rich Discord Embed cards with color-coded sidebar indicators and metadata fields.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Express Configuration */}
      <section id="express-webhooks" className="space-y-4">
        <h2 id="express-webhook-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          Express Setup & Environment Variables
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Pass your webhook configuration directly into <code>setupObservability(app)</code> or use standard environment variables:
        </p>

        <CodeBlock
          title="Express App Setup (src/index.ts)"
          language="typescript"
          code={`import express from "express";
import { setupObservability } from "@stacklenzz/server";

const app = express();

setupObservability(app, {
  serviceName: "bookme-express-api",
  environment: "production",
  alerts: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL,
    alertOn5xxCrash: true,      // Fire instant alert on 5xx server crash (bypasses cooldown)
    errorRateThreshold: 5.0,    // Trigger alert if 5xx error rate exceeds 5%
    p95LatencyThresholdMs: 1000,// Trigger warning if P95 response latency exceeds 1000ms
    cooldownMinutes: 15,        // Smart cooldown for threshold metric alerts
  },
});`}
        />
      </section>

      {/* Section 3: NestJS Configuration */}
      <section id="nestjs-webhooks" className="space-y-4">
        <h2 id="nestjs-webhook-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          NestJS Webhook Setup
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          In your NestJS root module (<code>AppModule</code>), pass the alert options into <code>ObservabilityModule.forRoot()</code> or <code>forRootAsync()</code>:
        </p>

        <CodeBlock
          title="NestJS AppModule (src/app.module.ts)"
          language="typescript"
          code={`import { Module } from "@nestjs/common";
import { ObservabilityModule } from "@stacklenzz/server";

@Module({
  imports: [
    ObservabilityModule.forRoot({
      serviceName: "bookme-nestjs-api",
      environment: "production",
      alerts: {
        webhookUrl: process.env.SLACK_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL,
        alertOn5xxCrash: true,
        errorRateThreshold: 3.0,
        cooldownMinutes: 15,
      },
    }),
  ],
})
export class AppModule {}`}
        />
      </section>

      {/* Section 4: Testing Webhooks */}
      <section id="testing-webhooks" className="space-y-4">
        <h2 id="testing-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          🧪 How to Test Alerts
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          You can test your webhook integration by adding your Slack or Discord URL to your <code>.env</code> file:
        </p>

        <CodeBlock
          title=".env File"
          language="env"
          code={`# For Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_WORKSPACE/YOUR_CHANNEL/YOUR_TOKEN

# Or For Discord
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN`}
        />

        <p className="text-slate-300 text-sm leading-relaxed mt-4">
          Trigger a test 5xx server crash endpoint using <code>curl</code>:
        </p>

        <pre className="p-3 bg-slate-950 text-indigo-[#818cf8] font-mono text-xs rounded-xl border border-[#1e293b] overflow-x-auto whitespace-pre-wrap break-words">
          curl http://localhost:4000/api/error
        </pre>

        <p className="text-slate-300 text-sm leading-relaxed">
          You will immediately receive an alert payload notification in your Slack channel or Discord server showing the exact crash message, endpoint route, HTTP status 500, and timestamp!
        </p>
      </section>
    </div>
  );
}
