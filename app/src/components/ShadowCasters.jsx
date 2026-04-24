import { useState } from 'react';
import Header from './Header.jsx';

const OPERATIVES = [
  { code: 'SPECTRE-7',  file: 'ST-2041-0091', division: 'BLACK OPS',             specialty: 'Satellite Image Decryption',           coords: '51.477°N · 0.001°W' },
  { code: 'CIPHER-12',  file: 'ST-2039-0134', division: 'SIGNALS INTELLIGENCE',  specialty: 'Frequency Pattern Analysis',           coords: '38.897°N · 77.036°W' },
  { code: 'VORTEX-3',   file: 'ST-2043-0027', division: 'BIO-TECH RESEARCH',     specialty: 'Genetic Anomaly Mapping',              coords: '35.689°N · 139.691°E' },
  { code: 'PHANTOM-9',  file: 'ST-2040-0088', division: 'ORBITAL INTELLIGENCE',  specialty: 'Unidentified Aerial Phenomena',        coords: '33.942°N · 118.408°W' },
  { code: 'WRAITH-11',  file: 'ST-2042-0056', division: 'DEEP OCEAN RECON',      specialty: 'Subsurface Acoustic Leaks',            coords: '27.175°N · 78.042°E' },
  { code: 'ECHO-6',     file: 'ST-2038-0201', division: 'PSYOPS DIVISION',       specialty: 'Mass Perception Engineering',          coords: '48.856°N · 2.352°E' },
  { code: 'NULL-14',    file: 'ST-2044-0003', division: 'QUANTUM RESEARCH',      specialty: 'Timeline Divergence Tracking',         coords: '46.204°N · 6.143°E' },
  { code: 'FLUX-2',     file: 'ST-2041-0177', division: 'ELECTRONIC WARFARE',    specialty: 'Infrastructure Vulnerability Mapping', coords: '55.755°N · 37.617°E' },
  { code: 'HELIX-8',    file: 'ST-2039-0099', division: 'BIO-TECH RESEARCH',     specialty: 'Pathogen Classification Leaks',        coords: '39.904°N · 116.407°E' },
  { code: 'NEXUS-5',    file: 'ST-2043-0041', division: 'INFORMATION WARFARE',   specialty: 'Archive Falsification Detection',      coords: '59.329°N · 18.068°E' },
  { code: 'SHADE-10',   file: 'ST-2040-0162', division: 'COUNTER-INTELLIGENCE',  specialty: 'Double Agent Protocol Breach',         coords: '40.712°N · 74.006°W' },
  { code: 'DRIFT-4',    file: 'ST-2044-0019', division: 'ORBITAL INTELLIGENCE',  specialty: 'Deep Space Signal Intercept',          coords: '28.573°N · 80.649°W' },
];

function SilhouetteAvatar() {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="28" r="14" stroke="var(--text-primary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <path d="M16 72 C16 52, 28 44, 40 44 C52 44, 64 52, 64 72" stroke="var(--text-primary)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
      <rect x="28" y="18" rx="1" width="24" height="12" fill="var(--redacted-bg)" opacity="0.85" />
      <line x1="20" y1="50" x2="60" y2="50" stroke="var(--accent)" strokeWidth="0.5" opacity="0.4" />
      <circle cx="40" cy="28" r="2" fill="var(--accent)" opacity="0.8" />
    </svg>
  );
}

function ThermalAvatar({ id }) {
  const gid = `therm-${id}`;
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="28" r="14" fill={`url(#${gid})`} opacity="0.7" />
      <path d="M16 72 C16 52, 28 44, 40 44 C52 44, 64 52, 64 72" fill={`url(#${gid})`} opacity="0.5" />
      <circle cx="40" cy="28" r="5" fill="var(--accent)" opacity="0.3" />
      <line x1="10" y1="40" x2="70" y2="40" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.3" />
      <line x1="40" y1="5" x2="40" y2="75" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.3" />
    </svg>
  );
}

function PixelAvatar({ seed }) {
  let rng = seed;
  const rand = () => {
    rng = (rng * 9301 + 49297) % 233280;
    return rng / 233280;
  };
  const rects = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const dist = Math.sqrt((x - 3.5) ** 2 + (y - 3) ** 2);
      if (dist < 3.8 && rand() > 0.2) {
        const op = Math.max(0.15, 1 - dist / 4).toFixed(2);
        rects.push(
          <rect key={`${x}-${y}`} x={x * 10} y={y * 10} width="9" height="9" rx="1" fill="var(--text-primary)" opacity={op} />
        );
      }
    }
  }
  return (
    <svg viewBox="0 0 80 80" fill="none">
      {rects}
      <rect x="20" y="15" width="40" height="8" fill="var(--redacted-bg)" opacity="0.9" rx="1" />
    </svg>
  );
}

function avatarFor(index) {
  const types = ['silhouette', 'thermal', 'pixelated'];
  const t = types[index % 3];
  if (t === 'silhouette') return <SilhouetteAvatar />;
  if (t === 'thermal')    return <ThermalAvatar id={index} />;
  return <PixelAvatar seed={index + 1} />;
}

function BioCard({ op, index }) {
  return (
    <article className="bio-card">
      <div className="bio-top">
        <span>FILE: {op.file}</span>
        <div className="bio-status-dot" />
      </div>
      <div className="bio-avatar">
        <div className="bio-avatar-inner">{avatarFor(index)}</div>
        <div className="bio-scan-line" />
        <div className="cm cm-tl" /><div className="cm cm-tr" />
        <div className="cm cm-bl" /><div className="cm cm-br" />
      </div>
      <div className="bio-details">
        <div className="bio-codename">{op.code}</div>
        <div className="bio-field"><span className="k">DIVISION</span><span className="v">{op.division}</span></div>
        <div className="bio-field"><span className="k">LEAK</span><span className="v">{op.specialty}</span></div>
        <div className="bio-field"><span className="k">COORDS</span><span className="v coords">{op.coords}</span></div>
      </div>
      <div className="bio-redact-bar" />
    </article>
  );
}

function RedactText({ children }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <span
      className={'redact-line' + (revealed ? ' revealed' : '')}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      onFocus={() => setRevealed(true)}
      onBlur={() => setRevealed(false)}
      tabIndex={0}
    >
      {children}
    </span>
  );
}

export default function ShadowCasters({ onHome }) {
  const [joined, setJoined] = useState(false);

  return (
    <div className="sc-page">
      <Header cartCount={0} active="shadow-casters" onHome={onHome} />

      <section className="sc-hero">
        <div className="sc-hero-tag">
          <span className="accent-dot">●</span> CLASSIFIED PERSONNEL DOSSIER · CLEARANCE LEVEL 5
        </div>
        <h1 className="sc-hero-title">
          SHADOW<br /><span className="accent">CASTERS</span>
        </h1>
        <div className="sc-hero-sub-tag">
          REF:ST-2045-OMEGA <span className="accent-dot">●</span> ENCR:AES-8192 <span className="accent-dot">●</span> PROTO:BLACKSITE
        </div>
      </section>

      <section className="sc-origin">
        <div className="sc-origin-label">
          <div className="sc-origin-label-text">ORIGIN<br />RECORD</div>
          <div className="sc-origin-label-meta">
            ENTRY LOGGED 11.09.2041 · SOURCE TS-2041<br />
            STATUS: <span className="accent-dot">●</span> ACTIVE
          </div>
        </div>
        <div className="sc-origin-body">
          <p>
            Shadow Threads is not a company. It is a <RedactText>decentralized collective</RedactText> — an unregistered network of former military intelligence officers, rogue scientists expelled from <RedactText>black-budget programs</RedactText>, and whistleblowers operating under assumed codenames across 14 sovereign territories. The collective emerged in Y2k from the remains of a disbanded signals intelligence unit whose final transmission contained coordinates to a dead drop in the Nevada basin. Inside: 3 holographic hard drives of <RedactText>redacted schematics &amp; data</RedactText>, and a single directive — leak everything.
          </p>
          <p>
            Every garment produced by Shadow Threads is a <RedactText>decrypted piece of intelligence</RedactText>. The designs are not aesthetic choices. They are visual transcriptions of classified material — satellite intercepts, bio-surveillance grids, orbital trajectory maps, and frequency analyses pulled from sources that <RedactText>officially do not exist</RedactText>. The collective operates on a single principle: the most dangerous weapon is the truth.
          </p>
        </div>
      </section>

      <section className="sc-dossier-section">
        <div className="sc-section-head">
          <span className="tag-text">CASTERS</span>
          <div className="line" />
          <span className="meta">12/12 ACTIVE · LVL 5 CLEARANCE</span>
        </div>
        <div className="sc-dossier-grid">
          {OPERATIVES.map((op, i) => <BioCard key={op.code} op={op} index={i} />)}
        </div>
      </section>

      <section className="sc-cta-section">
        <div className="sc-cta-tag">TRANSMISSION OPEN</div>
        <h2 className="sc-cta-title">INFORMATION IS THE GREATEST THREAT</h2>
        <p className="sc-cta-body">
          Become a Shadow Caster.{'\n'}No application. No interview. Transmit your signal.{'\n'}If the frequency matches, you will receive coordinates.
        </p>
        <button
          className={'join-btn' + (joined ? ' transmitted' : '')}
          onClick={() => setJoined(true)}
        >
          {joined ? '● SIGNAL TRANSMITTED' : 'JOIN THE SHADOW'}
        </button>
        {joined && (
          <div className="sc-transmit-confirm">AWAITING CONFIRMATION · FREQ 7.83 Hz · STANDBY</div>
        )}
      </section>

      <footer>
        <p className="footer-text">© 2045 SHADOW THREADS — ALL FILES REMAIN CLASSIFIED — CLEARANCE LEVEL 7 REQUIRED</p>
        <p className="footer-sub">
          DOCUMENT REF: SC-2045-OMEGA · ENCRYPTION: AES-8192 · STATUS: <span className="accent-dot">●</span> ACTIVE
        </p>
      </footer>
    </div>
  );
}
