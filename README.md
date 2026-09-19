<p align="center">
  <img src="./public/logo.svg" alt="Stacklenzz Logo" width="80" height="80" />
</p>

<h1 align="center">Stacklenzz Documentation & Interactive Portal</h1>

<p align="center">
  Official documentation website and live interactive demo console for the <b>Stacklenzz</b> observability ecosystem.
</p>

<p align="center">
  <a href="https://stacklenzz.vercel.app/"><b>🌐 Live Documentation: https://stacklenzz.vercel.app/</b></a>
</p>

---

## ⚡️ What This Project Contains

- **Interactive Documentation Pages (`/docs`)**: Full guides covering `@stacklenzz/server` (Express & NestJS), `@stacklenzz/ui` (React/Next.js), and `@stacklenzz/cli`.
- **Live Demo Console (`/docs/observability-dashboard`)**: Offline simulated telemetry playground running `@stacklenzz/ui` with realistic cluster mock data, 500 incident stack traces, event breadcrumb timelines, and all 6 runtime themes.
- **Modern Landing Page (`/`)**: Interactive framework code switchers (Express, NestJS, React, Next.js), live status radar strips, and direct quick-start workflows.

---

## 🚀 Running Locally

```bash
# Install dependencies
pnpm install
# or
npm install

# Start local development server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation portal.

---

## 📦 Monorepo Packages Documented Here

1. **`@stacklenzz/server`**: Backend telemetry SDK with dedicated modules for Express (`/express`), NestJS (`/nestjs`), and general Node.js frameworks like Fastify, Koa, Hono, and Hapi (`/core`).
2. **`@stacklenzz/ui`**: Standalone React/Next.js dashboard components with Redux Toolkit and 6 runtime themes.
3. **`@stacklenzz/cli`**: Zero-config CLI (`stacklenzz dashboard`, `stacklenzz doctor`, `stacklenzz init`).

---

## 📄 License
MIT © [Goodnews Azonubi](https://github.com/ideateGudy)

