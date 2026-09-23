"use client";

import React from "react";
import { Server, Cpu, Zap, Bot, Bell, Workflow, Target, Gauge, AlertTriangle, Database, Box } from "lucide-react";
import { CodeBlock } from "../../components/CodeBlock";
import { NestCallout } from "../../components/NestCallout";

export default function BackendSdkPage() {
  return (
    <div className="space-y-12">
      {/* Header Banner */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Server size={13} /> Backend Core SDK Instrumentation Guide
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 mb-3">
          Backend SDK, Frameworks & Telemetry
        </h1>
        <p className="text-slate-400 text-base leading-relaxed m-0">
          Instrument Node.js server applications in one line. Expose Prometheus metrics, track distributed OpenTelemetry traces, capture unhandled exceptions, and monitor queue performance.
        </p>
      </div>

      {/* Section 1: Express Middleware */}
      <section id="express-setup" className="space-y-4">
        <h2 id="express-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          Express Middleware Instrumentation
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Call <code>setupObservability(app)</code> after initializing your Express application instance:
        </p>

        <CodeBlock
          title="Express Server (src/server.ts)"
          language="typescript"
          code={`import express from "express";
import { setupObservability } from "@stacklenzz/server";

const app = express();
app.use(express.json());

// Enable Stacklenzz Telemetry Pipeline & /metrics endpoint
setupObservability(app, {
  serviceName: "payment-service",
  metricsPath: "/metrics",
  statsPath: "/api/observability/stats",
  enableTracing: true,
});

app.get("/api/checkout", (req, res) => {
  res.json({ status: "success", orderId: "ord_99482" });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});`}
        />

        <h3 id="express-options" className="text-lg font-semibold text-indigo-300 mt-4">
          Express Setup Options
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Configure custom Prometheus metrics endpoints, trace sampling rates, and error breadcrumb limits.
        </p>
      </section>

      {/* Section 2: NestJS Module Setup */}
      <section id="nestjs-setup" className="space-y-4">
        <h2 id="nestjs-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          NestJS Module & Interceptor Setup
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Import <code>ObservabilityModule</code> into your root <code>AppModule</code>:
        </p>

        <CodeBlock
          title="NestJS App Module (src/app.module.ts)"
          language="typescript"
          code={`import { Module } from "@nestjs/common";
import { ObservabilityModule } from "@stacklenzz/server";

@Module({
  imports: [
    ObservabilityModule.forRoot({
      serviceName: "billing-microservice",
      enableInterceptors: true,
      captureErrors: true,
    }),
  ],
})
export class AppModule {}`}
        />

        <h3 id="nestjs-options" className="text-lg font-semibold text-indigo-300 mt-4">
          NestJS Interceptor Features
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Automatically injects request execution duration, controller method metadata, and unhandled Nest HTTP exception breadcrumbs.
        </p>
      </section>

      {/* Section 2b: Fastify & Koa Adapters */}
      <section id="fastify-koa-setup" className="space-y-4">
        <h2 id="fastify-koa-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          Fastify & Koa Framework Instrumentation
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Dedicated 1-line subpath adapters for Fastify (<code>@stacklenzz/server/fastify</code>) and Koa (<code>@stacklenzz/server/koa</code>):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CodeBlock
            title="Fastify Setup (src/server.ts)"
            language="typescript"
            code={`import Fastify from "fastify";
import { fastifyObservability } from "@stacklenzz/server/fastify";

const app = Fastify();

await app.register(fastifyObservability, {
  serviceName: "payment-fastify-api",
});

await app.listen({ port: 5000 });`}
          />

          <CodeBlock
            title="Koa Setup (src/server.ts)"
            language="typescript"
            code={`import Koa from "koa";
import { koaObservability } from "@stacklenzz/server/koa";

const app = new Koa();

app.use(koaObservability({
  serviceName: "billing-koa-api",
}));

app.listen(5000);`}
          />
        </div>
      </section>

      {/* Section 3: Framework Compatibility */}
      <section id="framework-compat" className="space-y-4">
        <h2 id="framework-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          📦 Node.js Framework Compatibility Matrix
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Stacklenzz is compatible across popular Node.js frameworks:
        </p>

        <div className="bg-[#111827] border border-[#1e293b] rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead className="bg-[#0f172a] text-slate-400 font-semibold border-b border-[#1e293b]">
              <tr>
                <th className="p-3">Framework</th>
                <th className="p-3">Support Level</th>
                <th className="p-3">Adapter / Setup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e293b]">
              <tr>
                <td className="p-3 font-semibold text-white">Express.js</td>
                <td className="p-3 text-emerald-400 font-bold">Native First-Class</td>
                <td className="p-3 font-mono">setupObservability(app)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">NestJS</td>
                <td className="p-3 text-emerald-400 font-bold">Native First-Class</td>
                <td className="p-3 font-mono">ObservabilityModule.forRoot()</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Fastify</td>
                <td className="p-3 text-indigo-400">Native Plugin Adapter</td>
                <td className="p-3 font-mono">app.register(fastifyObservability)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Koa / Connect</td>
                <td className="p-3 text-indigo-400">Native Middleware Adapter</td>
                <td className="p-3 font-mono">app.use(koaObservability())</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Advanced Telemetry APIs */}
      <section id="sdk-advanced" className="space-y-4">
        <h2 id="advanced-apis-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          ⚡️ Advanced Telemetry APIs & Custom Spans
        </h2>
        <p className="text-slate-300 text-sm">
          Instrument custom code execution blocks, measure DB queries, and emit custom counter metrics:
        </p>

        <CodeBlock
          title="Custom Metrics & Prom-Client Exports (src/services/payment.service.ts)"
          language="typescript"
          code={`import { Counter, register, logger, addBreadcrumb } from "@stacklenzz/server/core";

// Register custom Prometheus counter metric
const ordersCounter = new Counter({
  name: "orders_processed_total",
  help: "Total processed checkout orders",
  labelNames: ["currency"],
  registers: [register],
});

export async function processPayment(amount: number) {
  addBreadcrumb({ category: "payment", message: \`Processing \${amount} USD\` });
  ordersCounter.inc({ currency: "USD" });
  
  const result = await stripe.charges.create({ amount });
  return result;
}`}
        />

        <h3 id="custom-spans" className="text-lg font-semibold text-indigo-300 mt-4">
          Custom OpenTelemetry Spans & Database Tracing (trackDatabaseQuery)
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Wrap PostgreSQL, MongoDB, or Prisma calls with <code>trackDatabaseQuery</code> to generate child spans in your trace waterfall:
        </p>

        <CodeBlock
          title="Tracing Database Queries (src/db/users.ts)"
          language="typescript"
          code={`import { trackDatabaseQuery } from "@stacklenzz/server";

export async function findUser(id: string) {
  return await trackDatabaseQuery("pg.users.findById", async () => {
    return await db.query("SELECT * FROM users WHERE id = $1", [id]);
  });
}`}
        />

        <h3 id="db-adaptor" className="text-lg font-semibold text-indigo-300 mt-4">
          Pluggable Database Crash Adaptors (PostgreSQL, MongoDB, Prisma)
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Persist 5xx server crash logs and breadcrumbs directly into your primary database for historical analysis:
        </p>

        <CodeBlock
          title="PostgreSQL / MongoDB Adaptor Configuration"
          language="typescript"
          code={`setupObservability(app, {
  serviceName: "my-api",
  crashLogAdaptor: {
    async save(errorLog) {
      await db.query("INSERT INTO crash_logs (id, timestamp, message) VALUES ($1, $2, $3)", 
        [errorLog.id, errorLog.timestamp, errorLog.message]);
    },
    async list() {
      return await db.query("SELECT * FROM crash_logs ORDER BY timestamp DESC LIMIT 50");
    },
  },
});`}
        />
      </section>

      {/* Section 5: Agentic AI & MCP Server */}
      <section id="mcp-server" className="space-y-4">
        <h2 id="mcp-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          🤖 Agentic AI & Model Context Protocol (@stacklenzz/mcp)
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Allow AI coding assistants (Claude Desktop, Cursor, Antigravity) to query server telemetry, active error logs, and metrics directly via MCP:
        </p>

        <CodeBlock
          title="MCP Configuration (.cursor/mcp.json or Claude Desktop)"
          language="json"
          code={`{
  "mcpServers": {
    "stacklenzz": {
      "command": "npx",
      "args": ["-y", "@stacklenzz/mcp"],
      "env": {
        "STACKLENZZ_URL": "http://localhost:5000/api/observability/stats"
      }
    }
  }
}`}
        />
      </section>

      {/* Section 6: Distributed Trace Explorer */}
      <section id="trace-explorer" className="space-y-4">
        <h2 id="trace-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          🔄 Distributed Trace Explorer & W3C Propagation
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Stacklenzz automatically injects and extracts W3C <code>traceparent</code> headers across HTTP requests for microservice trace continuity.
        </p>

        <h3 id="w3c-propagation" className="text-lg font-semibold text-indigo-300 mt-4">
          W3C Traceparent Header Format
        </h3>
        <pre className="p-3 bg-slate-950 text-indigo-[#818cf8] font-mono text-xs rounded-xl border border-[#1e293b] overflow-x-auto whitespace-pre-wrap break-words">
          traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
        </pre>

        <NestCallout type="info" title="W3C TRACEPARENT SUPPORT">
          Compatible with Jaeger, Zipkin, OpenTelemetry Collectors, and Datadog trace formats.
        </NestCallout>
      </section>

      {/* Section 7: Queue Monitoring */}
      <section id="jobs-queues" className="space-y-4">
        <h2 id="jobs-title" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          ⚙️ Background Jobs & Queue Monitoring (trackJob)
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Track job throughput, queue lag, failed job retry attempts, and worker execution durations:
        </p>

        <CodeBlock
          title="Wrapping Worker Tasks with trackJob"
          language="typescript"
          code={`import { trackJob } from "@stacklenzz/server";

// Wrap any async job or queue worker function
await trackJob("send-welcome-email", "email-queue", async () => {
  await mailer.send({ to: user.email, subject: "Welcome to Stacklenzz!" });
});`}
        />
      </section>

      {/* Section 8: Webhooks Link */}
      <section id="webhooks-link" className="space-y-4 border-t border-[#1e293b] pt-6">
        <h2 id="webhooks-heading" className="text-2xl font-bold text-white tracking-tight border-b border-[#1e293b] pb-2">
          🔔 Zero-Cost Webhook Alerts
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Configure real-time 5xx crash notifications and latency degradation alerts to Slack and Discord channels.
        </p>
        <NestCallout type="info" title="WEBHOOK ALERTS DOCUMENTATION">
          For full setup instructions, Slack Block Kit formatting, Discord Embed payloads, and testing guides, check out our dedicated <a href="/docs/webhooks" className="text-indigo-400 font-semibold underline">Slack &amp; Discord Webhooks Guide →</a>.
        </NestCallout>
      </section>
    </div>
  );
}
