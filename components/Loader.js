export default function Loader() {
  return (
    <div id="loader">
      <div className="loader-glow"></div>
      <div className="loader-lamp">
        <div className="loader-flame">
          <svg viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="fg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffe9b0" />
                <stop offset="45%" stopColor="#ffb870" />
                <stop offset="100%" stopColor="#ff6b35" />
              </linearGradient>
            </defs>
            <path d="M12 0C12 0 3 11 3 20a9 9 0 0018 0C21 11 12 0 12 0z" fill="url(#fg1)" />
          </svg>
        </div>
        <div className="loader-stand"></div>
        <div className="loader-base"></div>
      </div>
      <div className="loader-text">
        HSS <span>MUNDUR</span>
      </div>
    </div>
  );
}
