export default function Schematic() {
  return (
    <div style={{ marginTop: 18, position: 'relative', height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 260 90" style={{ width: '100%', height: '100%' }}>
        <line x1="10" y1="50" x2="250" y2="50" stroke="var(--blueprint-line)" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
        <line x1="130" y1="8" x2="130" y2="82" stroke="var(--blueprint-line)" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
        <path d="M 40 50 Q 60 42, 90 40 Q 130 28, 170 40 Q 200 42, 220 50 Q 200 58, 170 60 Q 130 64, 90 60 Q 60 58, 40 50 Z" fill="none" stroke="var(--blueprint-line)" strokeWidth="1" />
        <path d="M 100 40 Q 110 28, 130 25 Q 150 28, 160 40" fill="none" stroke="var(--blueprint-line)" strokeWidth="1" />
        <circle cx="115" cy="50" r="2" fill="var(--accent)" />
        <circle cx="130" cy="50" r="2" fill="var(--accent)" />
        <circle cx="145" cy="50" r="2" fill="var(--accent)" />
        <line x1="40" y1="78" x2="220" y2="78" stroke="var(--blueprint-line)" strokeWidth="0.5" />
        <line x1="40" y1="74" x2="40" y2="82" stroke="var(--blueprint-line)" strokeWidth="0.5" />
        <line x1="220" y1="74" x2="220" y2="82" stroke="var(--blueprint-line)" strokeWidth="0.5" />
        <text x="130" y="89" fontSize="6" fill="var(--text-muted)" textAnchor="middle" fontFamily="monospace" letterSpacing="0.5">11.2 m</text>
        <line x1="160" y1="40" x2="195" y2="18" stroke="var(--blueprint-line)" strokeWidth="0.4" />
        <text x="198" y="16" fontSize="5" fill="var(--text-muted)" fontFamily="monospace">DORSAL VENT</text>
        <line x1="115" y1="50" x2="70" y2="18" stroke="var(--blueprint-line)" strokeWidth="0.4" />
        <text x="15" y="16" fontSize="5" fill="var(--text-muted)" fontFamily="monospace">VIEWPORT ×3</text>
      </svg>
    </div>
  );
}
