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
          padding: '40px 60px',
          boxSizing: 'border-box',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background ambient glow effects */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '300px',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(56, 189, 248, 0.1) 50%, transparent 75%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            display: 'flex',
          }}
        />

        {/* Top Navbar / Brand header */}
        <div
          style={{
            position: 'absolute',
            top: '36px',
            left: '56px',
            right: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '1088px',
          }}
        >
          {/* Logo & Brand Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg
              width="36"
              height="36"
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
                d="M 10 20 L 15 20 L 17.5 14 L 21 25 L 23.5 17 L 25.5 20 L 30 20"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="20" r="2.5" fill="#38bdf8" />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.03em' }}>
                Stacklenzz
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#818cf8', letterSpacing: '0.05em', textTransform: 'uppercase', padding: '3px 8px', backgroundColor: 'rgba(99, 102, 241, 0.15)', borderRadius: '6px', border: '1px solid rgba(99, 102, 241, 0.3)', display: 'flex' }}>
                DOCS
              </span>
            </div>
          </div>

          {/* Real-time Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#34d399',
                letterSpacing: '0.04em',
              }}
            >
              LIVE TELEMETRY ACTIVE
            </span>
          </div>
        </div>

        {/* Center Mascot & Main Hero Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '50px',
          }}
        >
          {/* Lenzzy Mascot Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              marginBottom: '20px',
            }}
          >
            {/* Robot Mascot Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" y1="15" x2="8" y2="15.01" />
              <line x1="16" y1="15" x2="16" y2="15.01" />
            </svg>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#c7d2fe' }}>
              Meet Lenzzy • Your AI Telemetry Companion
            </span>
          </div>

          {/* Main Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              marginBottom: '16px',
            }}
          >
            <span style={{ color: '#ffffff' }}>Effortless Observability,</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4px' }}>
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 50%, #34d399 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Zero Boilerplate.
              </span>

              {/* ECG Waveform SVG */}
              <svg
                width="240"
                height="16"
                viewBox="0 0 200 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginTop: '8px' }}
              >
                <path
                  d="M 0 8 L 45 8 L 54 2 L 62 14 L 70 3 L 78 12 L 86 8 L 200 8"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '18px',
              lineHeight: 1.5,
              color: '#94a3b8',
              maxWidth: '820px',
              textAlign: 'center',
              marginBottom: '28px',
            }}
          >
            A production-grade instrumentation toolkit providing Express and NestJS telemetry, Prometheus metrics, structured Winston JSON logs, and mountable React &amp; Next.js admin dashboards.
          </div>

          {/* Console / Quick CLI Action pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 24px',
              backgroundColor: '#030712',
              borderRadius: '14px',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            }}
          >
            <span style={{ color: '#818cf8', fontWeight: 800, fontFamily: 'monospace', fontSize: '16px' }}>$</span>
            <span style={{ color: '#f8fafc', fontFamily: 'monospace', fontSize: '15px', fontWeight: 600 }}>
              npx stacklenzz dashboard -y
            </span>
            <span style={{ marginLeft: '12px', fontSize: '12px', fontWeight: 700, color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.12)', padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(52, 211, 153, 0.25)', display: 'flex' }}>
              Quick Setup
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

