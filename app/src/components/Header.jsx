export default function Header({ cartCount, active = 'archive', onHome, onShadowCasters }) {
  const go = (handler) => (e) => {
    if (handler) { e.preventDefault(); handler(); }
  };
  return (
    <header id="site-header">
      <div className="header-inner">
        <a href="#" className="logo" onClick={go(onHome)}>SHADOW THREADS</a>
        <nav id="main-nav">
          <a
            href="#"
            className={'nav-link' + (active === 'archive' ? ' active' : '')}
            onClick={go(onHome)}
          >ARCHIVE</a>
          <a href="#" className="nav-link">THE LAB</a>
          <a
            href="#"
            className={'nav-link' + (active === 'shadow-casters' ? ' active' : '')}
            onClick={go(onShadowCasters)}
          >SHADOW CASTERS</a>
          <a href="#" className="nav-link">TERMINAL</a>
          <button className="nav-icon" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="nav-icon" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className={'nav-cart-count' + (cartCount > 0 ? ' has-items' : '')}>{cartCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
