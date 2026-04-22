import { useState, useRef } from 'react';
import Header from './Header.jsx';
import Schematic from './Schematic.jsx';
import { PRODUCT, RELATED, MEASUREMENTS } from '../data.js';

const viewFilter = (id) =>
  id === 'macro'
    ? 'contrast(1.4) saturate(0.6)'
    : id === 'reverse'
    ? 'hue-rotate(180deg) brightness(0.9)'
    : id === 'folded'
    ? 'saturate(0.4) brightness(0.95)'
    : 'none';

export default function Details({ onHome }) {
  const [viewId, setViewId] = useState('front');
  const [colorId, setColorId] = useState('bone');
  const [sizeId, setSizeId] = useState('m');
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState(0);
  const [added, setAdded] = useState(false);
  const [tab, setTab] = useState('dossier');
  const [saved, setSaved] = useState(false);
  const [zoomPos, setZoomPos] = useState(null);
  const [locked, setLocked] = useState(false);
  const [toast, setToast] = useState(null);

  const dossierRef = useRef(null);

  const color = PRODUCT.colors.find((c) => c.id === colorId);
  const size = PRODUCT.sizes.find((s) => s.id === sizeId);
  const activeImg = PRODUCT.views.find((v) => v.id === viewId).img;
  const viewIdx = PRODUCT.views.findIndex((v) => v.id === viewId) + 1;

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const addToCart = () => {
    if (!size.available) return;
    setCart((c) => c + qty);
    setAdded(true);
    showToast(`+${qty} ${PRODUCT.name} · ${size.label} · ${color.name}`);
    setTimeout(() => setAdded(false), 1600);
  };

  const handleImageMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setZoomPos({
      x,
      y,
      pct: { x: ((x / rect.width) * 100).toFixed(1), y: ((y / rect.height) * 100).toFixed(1) },
    });
  };

  return (
    <>
      <Header cartCount={cart} />

      <div className="breadcrumb-bar">
        <a href="#" onClick={(e) => { e.preventDefault(); onHome?.(); }}>ARCHIVE</a>
        <span className="breadcrumb-sep">/</span>
        <a href="#">{PRODUCT.category}</a>
        <span className="breadcrumb-sep">/</span>
        <span className="current">{PRODUCT.name}</span>
        <div className="breadcrumb-meta">
          <span><span className="accent-dot">●</span> DOSSIER {PRODUCT.dossierId}</span>
          <span>ENCR: {PRODUCT.encr}-4096</span>
          <span>PROTO: {PRODUCT.proto}</span>
        </div>
      </div>

      <main>
        <section className="product-wrap">
          <aside className="thumb-rail">
            <div className="thumb-rail-label">VIEWS</div>
            {PRODUCT.views.map((v) => (
              <div
                key={v.id}
                className={'thumb' + (v.id === viewId ? ' active' : '')}
                onClick={() => setViewId(v.id)}
              >
                <img src={v.img} alt={v.label} style={{ filter: viewFilter(v.id) }} />
                <span className="thumb-view-tag">{v.tag}</span>
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <div
              className="thumb-rail-label"
              style={{ borderBottom: 'none', borderTop: '1px solid var(--blueprint-faint)', paddingTop: 6, marginTop: 4 }}
            >
              CLEARANCE
            </div>
            <div style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--accent)' }}>
              LVL 5
            </div>
          </aside>

          <div
            className={'image-panel' + (zoomPos ? ' zoomed' : '')}
            onMouseMove={handleImageMove}
            onMouseLeave={() => setZoomPos(null)}
          >
            <div className="corner-mark tl" />
            <div className="corner-mark tr" />
            <div className="corner-mark bl" />
            <div className="corner-mark br" />

            <div className="image-top-info">
              <span><span className="accent-dot">●</span> RECORDING</span>
              <span>CAM_{viewId.toUpperCase()}</span>
              <span>F/2.8 · 1/250</span>
              <span>47.123°N · 122.456°W</span>
            </div>

            <div className="image-canvas">
              <img
                src={activeImg}
                alt={PRODUCT.name}
                style={{
                  transformOrigin: zoomPos ? `${zoomPos.pct.x}% ${zoomPos.pct.y}%` : 'center',
                }}
              />
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

            <button className="zoom-hint" onClick={() => setLocked(!locked)}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
                <line x1="11" y1="8" x2="11" y2="14" />
              </svg>
              HOVER TO INSPECT
            </button>

            <div className="image-bottom-info">
              <span>SUBJECT: AV-19B</span>
              <span>SCALE: 1:1</span>
              <span>REV.{viewIdx}</span>
            </div>

            <div className={'clearance-lock' + (locked ? ' on' : '')}>
              <div className="lock-bar">RESTRICTED</div>
              <p>Further inspection requires Clearance Level 5 credentials. Continue to acknowledge archive protocol.</p>
              <button className="lock-toggle" onClick={() => setLocked(false)}>DISMISS</button>
            </div>
          </div>

          <div className="info-panel">
            <div className="dossier-tag">
              <span className="accent-dot">●</span>
              <span>DOSSIER {PRODUCT.dossierId}</span>
              <span className="tag-ref">CLEARANCE: {PRODUCT.classification}</span>
            </div>

            <h1 className="product-title">{PRODUCT.name}</h1>
            <p className="product-subtitle">{PRODUCT.tagline}</p>

            <div className="price-block">
              <span className="price">${PRODUCT.price.toFixed(2)}</span>
              <span className="price-sub">USD · FREE CARRIER · DROP-SHIP 48H</span>
              <span className="stock">
                <span className="dot" />
                IN SUPPLY
              </span>
            </div>

            <div className="selector-group">
              <div className="selector-head">
                <span>COLORWAY · <span className="selected-val">{color.name} {color.code}</span></span>
                <span style={{ fontSize: '0.55rem', color: 'var(--blueprint-line)' }}>
                  {PRODUCT.colors.filter((c) => c.stock).length}/{PRODUCT.colors.length} AVAIL
                </span>
              </div>
              <div className="color-row">
                {PRODUCT.colors.map((c) => (
                  <button
                    key={c.id}
                    className={'color-chip' + (c.id === colorId ? ' active' : '') + (!c.stock ? ' sold-out' : '')}
                    onClick={() => c.stock && setColorId(c.id)}
                    title={`${c.name} ${c.code}${!c.stock ? ' · Sold out' : ''}`}
                  >
                    <span className="swatch" style={{ background: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            <div className="selector-group">
              <div className="selector-head">
                <span>SIZE · <span className="selected-val">{size.label}</span></span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab('size');
                    dossierRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  SIZE CHART →
                </a>
              </div>
              <div className="size-grid">
                {PRODUCT.sizes.map((s) => (
                  <button
                    key={s.id}
                    className={'size-cell' + (s.id === sizeId ? ' active' : '') + (!s.available ? ' oos' : '')}
                    onClick={() => s.available && setSizeId(s.id)}
                    disabled={!s.available}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="cta-row">
              <div className="qty-box">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="qty-val">{qty.toString().padStart(2, '0')}</span>
                <button className="qty-btn" onClick={() => setQty(Math.min(9, qty + 1))}>+</button>
              </div>
              <button className={'add-cart-btn' + (added ? ' added' : '')} onClick={addToCart}>
                <span>
                  {added ? 'FILED · DISPATCHING' : 'FILE REQUISITION'}
                  <span className="ship-sub">DISCREET CARRIER · TRACKED · SIGNATURE REQUIRED</span>
                </span>
              </button>
            </div>

            <div className="accessory-row">
              <button
                className={'accessory-btn' + (saved ? ' active' : '')}
                onClick={() => {
                  setSaved(!saved);
                  showToast(saved ? 'REMOVED FROM WATCHLIST' : 'ADDED TO WATCHLIST');
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                {saved ? 'WATCHED' : 'ADD TO WATCHLIST'}
              </button>
              <button className="accessory-btn" onClick={() => showToast('SECURE LINK COPIED')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                SECURE LINK
              </button>
              <button className="accessory-btn" onClick={() => showToast('OPENING LIVE AR PREVIEW')}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2 2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                AR PREVIEW
              </button>
            </div>

            <div className="fact-grid">
              <FactCell label="DECLASSIFIED" value={PRODUCT.declassifiedOn} />
              <FactCell label="FIRST CONTACT" value={PRODUCT.firstSighting} />
              <FactCell label="GSM" value="240" />
              <FactCell label="ORIGIN" value="PORTUGAL" />
            </div>
          </div>
        </section>

        <section className="dossier" ref={dossierRef}>
          <div className="dossier-left">
            <div className="dossier-heading">DOSSIER · FILE 0x4F2A</div>
            <div className="tabs-row">
              {[
                { k: 'dossier', label: 'ACCOUNT' },
                { k: 'fabric', label: 'MATERIALS' },
                { k: 'size', label: 'FIT GUIDE' },
                { k: 'shipping', label: 'DISPATCH' },
              ].map((t) => (
                <button
                  key={t.k}
                  className={'tab' + (tab === t.k ? ' active' : '')}
                  onClick={() => setTab(t.k)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="tab-body">
              {tab === 'dossier' && (
                <>
                  <span className="ts">◦ ENTRY LOGGED {PRODUCT.declassifiedOn} · SOURCE TS-2045</span>
                  <p>{PRODUCT.description}</p>
                  <p>
                    Subject AV-19B was photographed at low altitude above the testing flats at 03:41 local time, 07.24.1947.
                    The original schematic — rendered in pencil by the duty operator within hours of contact — is preserved
                    in the archive under seal. This print is a faithful 1:1 reproduction with annotations intact.
                  </p>
                </>
              )}
              {tab === 'fabric' && (
                <ul>
                  <li><span className="k">COMPOSITION</span><span className="v">100% long-staple combed cotton</span></li>
                  <li><span className="k">WEIGHT</span><span className="v">240 GSM · midweight</span></li>
                  <li><span className="k">CONSTRUCTION</span><span className="v">Tubular body · taped shoulders · ribbed collar</span></li>
                  <li><span className="k">PRINT</span><span className="v">Discharge-dyed blueprint line · fade resistant</span></li>
                  <li><span className="k">MILL</span><span className="v">Porto, Portugal · OEKO-TEX 100 certified</span></li>
                  <li><span className="k">CARE</span><span className="v">Cold wash, tumble low, iron reverse</span></li>
                </ul>
              )}
              {tab === 'size' && (
                <>
                  <p style={{ marginBottom: '0.7rem' }}>
                    Drop-shoulder box cut. For the relaxed silhouette pictured, order your true size. For a closer fit, size down one.
                  </p>
                  <table className="measure-table">
                    <thead>
                      <tr><th>SIZE</th><th>CHEST</th><th>LENGTH</th><th>SHOULDER</th><th>SLEEVE</th></tr>
                    </thead>
                    <tbody>
                      {MEASUREMENTS.map((r) => (
                        <tr key={r.s} className={r.s.toLowerCase() === size.label.toLowerCase() ? 'selected' : ''}>
                          <td>{r.s}</td><td>{r.c}</td><td>{r.l}</td><td>{r.sh}</td><td>{r.sl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 8 }}>
                    All measurements in centimeters · tolerance ± 1 cm
                  </p>
                </>
              )}
              {tab === 'shipping' && (
                <ul>
                  <li><span className="k">CARRIER</span><span className="v">Encrypted courier · no return address</span></li>
                  <li><span className="k">TRANSIT</span><span className="v">Domestic 48h · Global 5–7 days</span></li>
                  <li><span className="k">PACKAGING</span><span className="v">Unmarked kraft sleeve · tamper-evident seal</span></li>
                  <li><span className="k">TRACKING</span><span className="v">One-time code · expires on delivery</span></li>
                  <li><span className="k">RETURNS</span><span className="v">30 days · archive-sealed · unworn</span></li>
                </ul>
              )}
            </div>
          </div>

          <div className="spec-sheet">
            <div className="spec-header">
              <span>SCHEMATIC</span>
              <span className="id">AV-19B / REV.{viewIdx}</span>
            </div>
            <div className="spec-body">
              <SpecRow k="SUBJECT" v="Disc-form vessel, AV-19B" />
              <SpecRow k="DIAMETER" v="11.2 m ± 0.3" />
              <SpecRow k="HULL" v="Unidentified alloy" />
              <SpecRow k="PROPULSION" v="Non-reactive gradient" />
              <SpecRow k="CREW" v="≤ 3, humanoid" />
              <SpecRow k="ACOUSTIC" v="24–31 dBA @ 50 m" />
              <SpecRow k="RECOVERY" v="Sector 4 · Flats" />
              <SpecRow k="STATUS" v="Archived · sealed" />
            </div>
            <Schematic />
          </div>
        </section>

        <section className="related">
          <div className="related-head">
            <span className="tag">ADJACENT FILES</span>
            <div className="line" />
            <span className="meta">{RELATED.length} RECORDS · SIGNAL STRENGTH GOOD</span>
          </div>
          <div className="related-grid">
            {RELATED.map((r) => (
              <div className="rel-card" key={r.id}>
                <div className="rel-top">
                  <span>{r.code}</span>
                  <span className="dot" />
                </div>
                <div className="rel-img">
                  <img src={r.img} alt={r.name} />
                </div>
                <div className="rel-sub">
                  <span>● ACTIVE</span>
                  <span className="temp">{r.temp}°</span>
                </div>
                <div className="rel-info">
                  <span className="name">{r.name}</span>
                  <span className="price">${r.price.toFixed(2)}</span>
                </div>
              </div>
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

      <div className={'toast' + (toast ? ' on' : '')}>
        <span className="dot" />
        {toast}
      </div>
    </>
  );
}

function FactCell({ label, value }) {
  return (
    <div className="fact-cell">
      <div className="k">{label}</div>
      <div className="v">{value}</div>
    </div>
  );
}

function SpecRow({ k, v }) {
  return (
    <div className="spec-row">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
    </div>
  );
}
