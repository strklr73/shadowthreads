import { useState, useEffect, useRef } from 'react';
import Header from './Header.jsx';
import { FEATURED, CATALOG } from '../data.js';

export default function Home({ cartCount, onOpenProduct, onShadowCasters }) {
  const [slide, setSlide] = useState(0);
  const [zoomPos, setZoomPos] = useState(null);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const active = FEATURED[slide];

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % FEATURED.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const go = (dir) => {
    setSlide((s) => (s + dir + FEATURED.length) % FEATURED.length);
  };

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setZoomPos({
      x,
      y,
      pct: {
        x: ((x / rect.width) * 100).toFixed(1),
        y: ((y / rect.height) * 100).toFixed(1),
      },
    });
  };

  return (
    <>
      <Header cartCount={cartCount} active="archive" onShadowCasters={onShadowCasters} />

      <div className="breadcrumb-bar">
        <a href="#">ARCHIVE</a>
        <span className="breadcrumb-sep">/</span>
        <span className="current">HOME</span>
        <div className="breadcrumb-meta">
          <span><span className="accent-dot">●</span> LIVE FEED</span>
          <span>ENCR: AES-4096</span>
          <span>PROTO: OMEGA</span>
        </div>
      </div>

      <main>
        <section
          className={'hero-panel' + (zoomPos ? ' zoomed' : '')}
          onMouseMove={handleMove}
          onMouseLeave={() => setZoomPos(null)}
          onMouseEnter={() => setPaused(true)}
          onMouseOut={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
        >
          <div className="corner-mark tl" />
          <div className="corner-mark tr" />
          <div className="corner-mark bl" />
          <div className="corner-mark br" />

          <div className="image-top-info">
            <span><span className="accent-dot">●</span> RECORDING</span>
            <span>{active.cam}</span>
            <span>F/2.8 · 1/250</span>
            <span>{active.coords}</span>
          </div>

          <div className="hero-canvas">
            {FEATURED.map((f, i) => (
              <img
                key={f.id}
                src={f.img}
                alt={f.name}
                className={'hero-slide' + (i === slide ? ' on' : '')}
                style={{
                  transformOrigin: zoomPos ? `${zoomPos.pct.x}% ${zoomPos.pct.y}%` : 'center',
                }}
              />
            ))}
          </div>

          <div className="image-scan" />

          {zoomPos && (
            <div className="crosshair" style={{ opacity: 1 }}>
              <div className="ch-v" style={{ left: zoomPos.x }} />
              <div className="ch-h" style={{ top: zoomPos.y }} />
              <div className="ch-coord" style={{ left: zoomPos.x, top: zoomPos.y }}>
                X {zoomPos.pct.x} · Y {zoomPos.pct.y}
              </div>
            </div>
          )}

          <button className="zoom-hint" type="button">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
              <line x1="11" y1="8" x2="11" y2="14" />
            </svg>
            HOVER TO INSPECT
          </button>

          <div className="image-bottom-info">
            <span>SUBJECT: {active.subject}</span>
            <span>SCALE: 1:1</span>
            <span>{active.rev}</span>
          </div>

          <div className="hero-overlay">
            <div className="hero-dossier">
              <span className="accent-dot">●</span> {active.code}
            </div>
            <h1 className="hero-title">{active.name}</h1>
            <p className="hero-tagline">{active.tagline}</p>
            <div className="hero-cta-row">
              <span className="hero-price">${active.price.toFixed(2)}</span>
              <button className="hero-cta" onClick={() => onOpenProduct?.(active.id)}>
                OPEN DOSSIER →
              </button>
            </div>
          </div>

          <button className="hero-arrow prev" onClick={() => go(-1)} aria-label="Previous">‹</button>
          <button className="hero-arrow next" onClick={() => go(1)} aria-label="Next">›</button>

          <div className="hero-dots">
            {FEATURED.map((f, i) => (
              <button
                key={f.id}
                className={'hero-dot' + (i === slide ? ' on' : '')}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
              >
                <span className="hero-dot-num">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="catalog">
          <div className="related-head">
            <span className="tag">ARCHIVE CATALOG</span>
            <div className="line" />
            <span className="meta">{CATALOG.length} FILES · SIGNAL STRENGTH GOOD</span>
          </div>
          <div className="catalog-grid">
            {CATALOG.map((c) => (
              <article
                key={c.id}
                className="cat-card"
                onClick={() => onOpenProduct?.(c.id)}
              >
                <div className="cat-top">
                  <span>{c.code}</span>
                  <span className="cat-tag">{c.tag}</span>
                </div>

                <div className="cat-img">
                  <img src={c.img} alt={c.name} />
                  <div className="cat-scan" />
                  <div className="cat-zoom">
                    <img src={c.img} alt="" aria-hidden="true" />
                  </div>
                  <div className="cat-quick">
                    <span className="cat-quick-label">QUICK VIEW · HOVER TO INSPECT</span>
                    <button
                      className="cat-quick-btn"
                      onClick={(e) => { e.stopPropagation(); onOpenProduct?.(c.id); }}
                    >
                      OPEN DOSSIER →
                    </button>
                  </div>
                </div>

                <div className="cat-sub">
                  <span>● {c.status}</span>
                  <span className="cat-temp">{c.temp}°</span>
                </div>
                <div className="cat-info">
                  <span className="name">{c.name}</span>
                  <span className="price">${c.price.toFixed(2)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p className="footer-text">© 2045 SHADOW THREADS — ALL FILES REMAIN CLASSIFIED — CLEARANCE LEVEL 5 REQUIRED</p>
        <p className="footer-sub">
          DOCUMENT REF: ST-2045-OMEGA · ENCRYPTION: AES-4096 · STATUS: <span className="accent-dot">●</span> ACTIVE
        </p>
      </footer>
    </>
  );
}
