export const PRODUCT = {
  id: 1,
  name: 'UFO SCHEMATIC TEE',
  ref: '7F3A9',
  encr: 'AES',
  proto: 'OMEGA',
  price: 45.0,
  category: 'DECLASSIFIED VESSEL BLUEPRINTS',
  classification: 'LEVEL 5',
  dossierId: 'ST-UFO-047-Ω',
  tagline:
    'Declassified flying saucer schematic — reproduced from Archive Document 0x4F2A, recovered TS-2045.',
  description:
    "Technical cross-section print reproduced in micro-detail on 240 GSM midweight combed cotton. Six views of subject AV-19B, annotated in the original operator's hand. Discharge-printed for a fade-resistant blueprint line. Cut for daily field deployment.",
  declassifiedOn: '03.04.2045',
  firstSighting: '07.24.1947',
  views: [
    { id: 'front', label: 'FRONT', tag: 'V1', img: '/assets/tshirt-1.png' },
    { id: 'macro', label: 'DETAIL', tag: 'V2', img: '/assets/tshirt-1.png' },
    { id: 'reverse', label: 'REVERSE', tag: 'V3', img: '/assets/tshirt-1.png' },
    { id: 'folded', label: 'FOLDED', tag: 'V4', img: '/assets/tshirt-1.png' },
  ],
  colors: [
    { id: 'bone', name: 'BONE', hex: '#ecead8', code: '#01', stock: true },
    { id: 'slate', name: 'SLATE', hex: '#2b2d3a', code: '#02', stock: true },
    { id: 'rust', name: 'RUST', hex: '#9b3e1d', code: '#03', stock: true },
    { id: 'fatigue', name: 'FATIGUE', hex: '#3e4231', code: '#04', stock: false },
  ],
  sizes: [
    { id: 'xs', label: 'XS', available: true },
    { id: 's', label: 'S', available: true },
    { id: 'm', label: 'M', available: true },
    { id: 'l', label: 'L', available: true },
    { id: 'xl', label: 'XL', available: false },
    { id: 'xxl', label: 'XXL', available: true },
  ],
};

export const RELATED = [
  { id: 2, name: 'ALIEN BLUEPRINT TEE', price: 45, code: 'REF:3B1D7', img: '/assets/tshirt-2.png', temp: 38 },
  { id: 3, name: 'RADAR SCAN TEE', price: 45, code: 'REF:9C4E2', img: '/assets/tshirt-3.png', temp: 52 },
  { id: 4, name: 'PROVIDENCE TEE', price: 45, code: 'REF:0A8F6', img: '/assets/tshirt-4.png', temp: 41 },
  { id: 5, name: 'CIRCUIT BOARD TEE', price: 45, code: 'REF:5D2B1', img: '/assets/tshirt-5.png', temp: 49 },
];

export const FEATURED = [
  {
    id: 'f1',
    name: 'UFO SCHEMATIC TEE',
    code: 'DOSSIER ST-UFO-047-Ω',
    tagline: 'Declassified flying saucer schematic — Archive 0x4F2A.',
    price: 45,
    img: '/assets/tshirt-1.png',
    cam: 'CAM_FRONT',
    coords: '47.123°N · 122.456°W',
    subject: 'AV-19B',
    rev: 'REV.1',
  },
  {
    id: 'f2',
    name: 'ALIEN BLUEPRINT TEE',
    code: 'DOSSIER ST-ALN-022-Δ',
    tagline: 'Hand-annotated biological cross-section, retrieved 1964.',
    price: 45,
    img: '/assets/tshirt-2.png',
    cam: 'CAM_MACRO',
    coords: '33.950°N · 106.418°W',
    subject: 'BIO-04C',
    rev: 'REV.3',
  },
  {
    id: 'f3',
    name: 'RADAR SCAN TEE',
    code: 'DOSSIER ST-RDR-013-Σ',
    tagline: 'Composite radar return · six unknown contacts · 1952.',
    price: 45,
    img: '/assets/tshirt-3.png',
    cam: 'CAM_SWEEP',
    coords: '38.893°N · 77.014°W',
    subject: 'RDR-06',
    rev: 'REV.2',
  },
  {
    id: 'f4',
    name: 'PROVIDENCE TEE',
    code: 'DOSSIER ST-PRV-031-Φ',
    tagline: 'Surveillance plate · night sky anomaly · Rhode Island.',
    price: 45,
    img: '/assets/tshirt-4.png',
    cam: 'CAM_LONG',
    coords: '41.824°N · 71.412°W',
    subject: 'PRV-31',
    rev: 'REV.1',
  },
];

export const CATALOG = [
  { id: 'c1', name: 'UFO SCHEMATIC TEE',   price: 45, code: 'REF:7F3A9', img: '/assets/tshirt-1.png', tag: 'OMEGA',   temp: 47, status: 'IN SUPPLY' },
  { id: 'c2', name: 'ALIEN BLUEPRINT TEE', price: 45, code: 'REF:3B1D7', img: '/assets/tshirt-2.png', tag: 'DELTA',   temp: 38, status: 'IN SUPPLY' },
  { id: 'c3', name: 'RADAR SCAN TEE',      price: 45, code: 'REF:9C4E2', img: '/assets/tshirt-3.png', tag: 'SIGMA',   temp: 52, status: 'IN SUPPLY' },
  { id: 'c4', name: 'PROVIDENCE TEE',      price: 48, code: 'REF:0A8F6', img: '/assets/tshirt-4.png', tag: 'PHI',     temp: 41, status: 'LOW STOCK' },
  { id: 'c5', name: 'CIRCUIT BOARD TEE',   price: 45, code: 'REF:5D2B1', img: '/assets/tshirt-5.png', tag: 'THETA',   temp: 49, status: 'IN SUPPLY' },
  { id: 'c6', name: 'MONOLITH TEE',        price: 50, code: 'REF:8E7C4', img: '/assets/tshirt-6.png', tag: 'OMICRON', temp: 44, status: 'IN SUPPLY' },
  { id: 'c7', name: 'RADAR SCAN TEE · ALT',price: 45, code: 'REF:9C4E3', img: '/assets/tshirt-3.png', tag: 'SIGMA-2', temp: 51, status: 'IN SUPPLY' },
  { id: 'c8', name: 'UFO SCHEMATIC · REV', price: 48, code: 'REF:7F3B0', img: '/assets/tshirt-1.png', tag: 'OMEGA-R', temp: 46, status: 'IN SUPPLY' },
];

export const MEASUREMENTS = [
  { s: 'XS', c: '48', l: '67', sh: '44', sl: '20' },
  { s: 'S', c: '51', l: '69', sh: '46', sl: '21' },
  { s: 'M', c: '54', l: '71', sh: '48', sl: '22' },
  { s: 'L', c: '57', l: '73', sh: '50', sl: '23' },
  { s: 'XL', c: '60', l: '75', sh: '52', sl: '24' },
  { s: 'XXL', c: '63', l: '77', sh: '54', sl: '25' },
];
