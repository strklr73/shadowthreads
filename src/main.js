/* ══════════════════════════════════════════════
   SHADOW THREADS — Main Application
   Three.js 3D Hero + Product Grid + Animations
   ══════════════════════════════════════════════ */

import * as THREE from 'three';

/* ──────────────────────────────────────────────
   PRODUCT DATA
   ────────────────────────────────────────────── */
const products = [
  { id: 1, image: '/images/tshirt-1.png', name: 'UFO SCHEMATIC TEE',   price: '$45.00', code: 'REF:7F3A9 ENCR:AES PROTO:OMEGA' },
  { id: 2, image: '/images/tshirt-2.png', name: 'ALIEN BLUEPRINT TEE', price: '$45.00', code: 'REF:3B1D7 ENCR:RSA PROTO:DELTA' },
  { id: 3, image: '/images/tshirt-3.png', name: 'RADAR SCAN TEE',      price: '$45.00', code: 'REF:9C4E2 ENCR:SHA PROTO:SIGMA' },
  { id: 4, image: '/images/tshirt-4.png', name: 'PROVIDENCE TEE',      price: '$45.00', code: 'REF:0A8F6 ENCR:AES PROTO:THETA' },
  { id: 5, image: '/images/tshirt-5.png', name: 'CIRCUIT BOARD TEE',   price: '$45.00', code: 'REF:5D2B1 ENCR:RSA PROTO:GAMMA' },
  { id: 6, image: '/images/tshirt-6.png', name: 'ABDUCTION TEE',       price: '$45.00', code: 'REF:2E7C4 ENCR:SHA PROTO:ALPHA' },
];


/* ──────────────────────────────────────────────
   THREE.JS — 3D WIREFRAME UFO HERO
   ────────────────────────────────────────────── */
function initHero() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.position.set(0, 2.2, 7);
  camera.lookAt(0, 0.3, 0);

  const lineMat = new THREE.LineBasicMaterial({ color: 0x8a8a9a, transparent: true, opacity: 0.55 });
  const lineMatAccent = new THREE.LineBasicMaterial({ color: 0xe85d26, transparent: true, opacity: 0.25 });

  // ── UFO Body — top dome ──
  const domePoints = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const r = Math.sin(t * Math.PI) * 1.1;
    const y = Math.cos(t * Math.PI) * 0.5 + 0.3;
    if (t <= 0.5) domePoints.push(new THREE.Vector2(r, y));
  }
  const domeGeo = new THREE.LatheGeometry(domePoints, 32);
  const domeEdges = new THREE.EdgesGeometry(domeGeo, 15);
  const domeLine = new THREE.LineSegments(domeEdges, lineMat);
  scene.add(domeLine);

  // ── UFO Body — main disc ──
  const discPoints = [
    new THREE.Vector2(0,    0.3),
    new THREE.Vector2(0.5,  0.3),
    new THREE.Vector2(1.6,  0.15),
    new THREE.Vector2(2.8,  0.05),
    new THREE.Vector2(3.2,  0.0),
    new THREE.Vector2(2.8, -0.1),
    new THREE.Vector2(1.6, -0.18),
    new THREE.Vector2(0.5, -0.2),
    new THREE.Vector2(0,   -0.2),
  ];
  const discGeo = new THREE.LatheGeometry(discPoints, 48);
  const discEdges = new THREE.EdgesGeometry(discGeo, 12);
  const discLine = new THREE.LineSegments(discEdges, lineMat);
  scene.add(discLine);

  // ── UFO Body — bottom ring ──
  const bottomPoints = [
    new THREE.Vector2(0,   -0.2),
    new THREE.Vector2(0.8, -0.2),
    new THREE.Vector2(1.0, -0.35),
    new THREE.Vector2(0.7, -0.5),
    new THREE.Vector2(0,   -0.5),
  ];
  const bottomGeo = new THREE.LatheGeometry(bottomPoints, 32);
  const bottomEdges = new THREE.EdgesGeometry(bottomGeo, 15);
  const bottomLine = new THREE.LineSegments(bottomEdges, lineMat);
  scene.add(bottomLine);

  // ── Landing legs ──
  const legMat = new THREE.LineBasicMaterial({ color: 0x8a8a9a, transparent: true, opacity: 0.4 });
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const legGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(Math.cos(angle) * 0.8, -0.5, Math.sin(angle) * 0.8),
      new THREE.Vector3(Math.cos(angle) * 1.3, -1.1, Math.sin(angle) * 1.3),
      new THREE.Vector3(Math.cos(angle) * 1.5, -1.1, Math.sin(angle) * 1.5),
    ]);
    scene.add(new THREE.Line(legGeo, legMat));
  }

  // ── Blueprint grid floor ──
  const gridHelper = new THREE.GridHelper(16, 40, 0x8a8a9a, 0x8a8a9a);
  gridHelper.position.y = -1.2;
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.08;
  scene.add(gridHelper);

  // ── Accent ring ──
  const ringGeo = new THREE.RingGeometry(3.15, 3.25, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xe85d26, transparent: true, opacity: 0.12, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.01;
  scene.add(ring);

  // ── Dimension lines (blueprint annotations) ──
  const dimLineMat = new THREE.LineBasicMaterial({ color: 0x8a8a9a, transparent: true, opacity: 0.2 });
  // Horizontal dimension
  const dimH = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-3.5, 0.05, 0),
    new THREE.Vector3(3.5, 0.05, 0),
  ]);
  scene.add(new THREE.Line(dimH, dimLineMat));
  // Vertical dimension
  const dimV = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(3.6, 0.8, 0),
    new THREE.Vector3(3.6, -1.2, 0),
  ]);
  scene.add(new THREE.Line(dimV, dimLineMat));

  // ── Group all UFO parts for rotation ──
  const ufoGroup = new THREE.Group();
  scene.children.forEach(child => {
    if (child !== gridHelper) {
      // We'll re-add them to the group
    }
  });

  // Mouse tracking
  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // Resize handler
  function onResize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.005;

    // Gentle idle rotation
    domeLine.rotation.y  = time * 0.15;
    discLine.rotation.y  = time * 0.15;
    bottomLine.rotation.y = time * 0.15;

    // Mouse-reactive tilt
    const targetRotX = mouse.y * 0.12;
    const targetRotZ = mouse.x * -0.08;
    domeLine.rotation.x  += (targetRotX - domeLine.rotation.x) * 0.03;
    domeLine.rotation.z  += (targetRotZ - domeLine.rotation.z) * 0.03;
    discLine.rotation.x  = domeLine.rotation.x;
    discLine.rotation.z  = domeLine.rotation.z;
    bottomLine.rotation.x = domeLine.rotation.x;
    bottomLine.rotation.z = domeLine.rotation.z;

    // Gentle hover float
    const floatY = Math.sin(time * 2) * 0.08;
    domeLine.position.y  = floatY;
    discLine.position.y  = floatY;
    bottomLine.position.y = floatY;

    // Pulse accent ring
    ring.material.opacity = 0.08 + Math.sin(time * 3) * 0.04;
    ring.rotation.z = time * 0.1;

    renderer.render(scene, camera);
  }
  animate();
}


/* ──────────────────────────────────────────────
   PRODUCT CARDS RENDERER
   ────────────────────────────────────────────── */
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = products.map((p, i) => `
    <article class="product-card" id="product-${p.id}" style="transition-delay: ${i * 0.08}s">
      <div class="card-meta-strip">
        <span class="card-code">${p.code}</span>
        <span class="card-status-dot"></span>
      </div>
      <div class="card-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="redact-bar">REDACTED</div>
      </div>
      <div class="card-reveal">
        <div class="card-title">${p.name}</div>
        <div class="card-price-row">
          <span class="card-price">${p.price}</span>
          <button class="card-view-btn" id="view-${p.id}">VIEW DETAIL</button>
        </div>
      </div>
      <div class="card-bottom-strip">
        <div class="card-dots">
          <span class="card-dot-sm active"></span>
          <span class="card-dot-sm active"></span>
          <span class="card-dot-sm"></span>
          <span class="card-dot-sm"></span>
        </div>
        <span class="card-temp">45°</span>
      </div>
    </article>
  `).join('');
}


/* ──────────────────────────────────────────────
   SCROLL REVEAL (Intersection Observer)
   ────────────────────────────────────────────── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.product-card').forEach(card => observer.observe(card));
}


/* ──────────────────────────────────────────────
   INIT
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  renderProducts();
  // Small delay so DOM paints, then start revealing
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initScrollReveal();
    });
  });
});
