import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://stacklenzz.vercel.app"),
  title: "Stacklenzz - Developer-First Node.js & React Observability",
  description: "Production-ready backend telemetry, Prometheus metrics, Winston logs, and React admin dashboards for Express, NestJS, Fastify & Koa",
  openGraph: {
    title: "Stacklenzz - Developer-First Node.js & React Observability",
    description: "Production-ready backend telemetry, Prometheus metrics, Winston logs, and React admin dashboards for Express, NestJS, Fastify & Koa",
    url: "https://stacklenzz.vercel.app",
    siteName: "Stacklenzz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stacklenzz - Developer-First Node.js & React Observability",
    description: "Production-ready backend telemetry, Prometheus metrics, Winston logs, and React admin dashboards for Express, NestJS, Fastify & Koa",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-indigo-500/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
