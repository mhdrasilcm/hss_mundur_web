'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Photo from './Photo';
import Icon from './Icons';

// Bento gallery + accessible lightbox built on the native <dialog> element
// (focus trapping, Esc to close and the backdrop come for free).
export default function Gallery({ items }) {
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const [index, setIndex] = useState(null);

  const open = (i) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (d) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (index === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, step]);

  const current = index === null ? null : items[index];

  return (
    <>
      <div className="bento">
        {items.map((it, i) => (
          <figure className={`tile ${it.className || ''}`.trim()} data-reveal key={it.id}>
            <button
              type="button"
              className="tile-btn"
              onClick={() => open(i)}
              aria-label={`View larger: ${it.caption}`}
            >
              <Photo name={it.name} alt={it.alt} sizes={it.sizes} />
            </button>
            <figcaption>{it.caption}</figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Photo viewer"
        onClose={() => setIndex(null)}
        onClick={(e) => {
          if (!e.target.closest('img, button, .lightbox-bar')) close();
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        }}
      >
        {current && (
          <div className="lightbox-inner">
            <button type="button" className="lightbox-close" onClick={close} aria-label="Close">
              <Icon name="close" size={22} />
            </button>
            <Photo name={current.name} alt={current.alt} sizes="(min-width: 1200px) 1200px, 94vw" />
            <div className="lightbox-bar">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo">
                <Icon name="chevron-left" size={22} />
              </button>
              <p aria-live="polite">
                {current.caption} <span>{index + 1} / {items.length}</span>
              </p>
              <button type="button" onClick={() => step(1)} aria-label="Next photo">
                <Icon name="chevron-right" size={22} />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
