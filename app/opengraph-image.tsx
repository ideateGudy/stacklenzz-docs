import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Stacklenzz - Developer-First Node.js & React Observability';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#090d16',
          color: '#f1f5f9',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '48px 56px',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
        }}
      >
        {/* Background ambient glow effects */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '300px',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(56, 189, 248, 0.12) 50%, transparent 75%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            right: '50px',
            width: '450px',
            height: '250px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />

        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Logo & Brand Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <svg
              width="44"
              height="44"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="11"
                fill="#090d16"
                stroke="#6366f1"
                strokeWidth="2"
              />
              <circle cx="20" cy="20" r="14" fill="rgba(56, 189, 248, 0.15)" />
              <circle
                cx="20"
                cy="20"
                r="11.5"
                stroke="#38bdf8"
                strokeWidth="1.6"
                strokeDasharray="4 2"
              />
              <path
                d="M 12 28 L 20 31.5 L 28 28"
                stroke="#475569"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 12 24 L 20 27.5 L 28 24"
                stroke="#64748b"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M 10 20 L 15 20 L 17.5 14 L 21 25 L 23.5 17 L 25.5 20 L 30 20"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="20" r="2.5" fill="#38bdf8" />
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                }}
              >
                Stacklenzz
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#818cf8',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Node.js & React Telemetry
              </div>
            </div>
          </div>

          {/* Real-time Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 12px #10b981',
              }}
            />
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#34d399',
                letterSpacing: '0.02em',
              }}
            >
              LIVE TELEMETRY ACTIVE
            </span>
          </div>
        </div>

        {/* Center Hero Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: '1040px',
            position: 'relative',
            marginTop: '10px',
          }}
        >
          {/* Hero Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#38bdf8',
              }}
            />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#c7d2fe',
              }}
            >
              Full-Stack Telemetry for Node.js Backends
            </span>
          </div>

          {/* Main Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.035em',
              marginBottom: '16px',
            }}
          >
            <span style={{ color: '#ffffff' }}>Effortless Observability,</span>
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 50%, #34d399 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Zero Boilerplate.
            </span>
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: '20px',
              lineHeight: 1.45,
              color: '#94a3b8',
              maxWidth: '860px',
            }}
          >
            Production-grade instrumentation for Express and NestJS backends with Prometheus metrics, structured Winston JSON logs, and mountable React & Next.js admin dashboards.
          </div>
        </div>

        {/* Bottom Hero Metrics Bar & CLI snippet */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* 3 Metric Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '12px 24px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Metric 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                  Heartbeat
                </span>
                <span style={{ fontSize: '14px', color: '#34d399', fontWeight: 800, fontFamily: 'monospace' }}>
                  99.99% UP
                </span>
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

            {/* Metric 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#38bdf8',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                  Latency
                </span>
                <span style={{ fontSize: '14px', color: '#38bdf8', fontWeight: 800, fontFamily: 'monospace' }}>
                  14.2 ms p99
                </span>
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />

            {/* Metric 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#a855f7',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                  Throughput
                </span>
                <span style={{ fontSize: '14px', color: '#c084fc', fontWeight: 800, fontFamily: 'monospace' }}>
                  1.4k req/s
                </span>
              </div>
            </div>
          </div>

          {/* Quick CLI Command */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 20px',
              backgroundColor: '#030712',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            }}
          >
            <span style={{ color: '#818cf8', fontWeight: 800, fontFamily: 'monospace', fontSize: '15px' }}>$</span>
            <span style={{ color: '#e2e8f0', fontFamily: 'monospace', fontSize: '14px', fontWeight: 600 }}>
              npx stacklenzz dashboard -y
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
