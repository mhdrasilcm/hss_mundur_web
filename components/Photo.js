// Responsive <img> for the optimised WebP variants in /public/images.
// Regenerate the variants with `python3 scripts/optimize-images.py`.
const IMAGES = {
  c1: { w: 6000, h: 4000, widths: [480, 960, 1600] },
  c2: { w: 6000, h: 4000, widths: [480, 960, 1600] },
  lb1: { w: 6000, h: 4000, widths: [480, 960, 1600] },
  lb2: { w: 4000, h: 6000, widths: [480, 960] },
};

export default function Photo({ name, alt, sizes, priority = false, className }) {
  const meta = IMAGES[name];
  const mid = meta.widths[Math.min(1, meta.widths.length - 1)];
  const srcSet = meta.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={`/images/${name}-${mid}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={meta.w}
      height={meta.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
