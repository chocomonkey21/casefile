/**
 * SVG filters that make type look printed into paper rather than laid on top of it.
 * Rendered once in the root layout and referenced from CSS with `filter: url(#ink-type)` and so on.
 *
 *  ink-type        Special Elite headings and labels: a tiny bleed, uneven ribbon density and a few
 *                  missing speckles, like a worn typewriter ribbon.
 *  ink-stamp       Large rubber stamps (Case Closed): rough edges, patchy ink, more gaps.
 *  ink-stamp-small Small status stamps. The same look, gentler, so 12px text stays readable.
 *
 * Every filter keeps a floor on ink density (INK_DENSITY in theme.ts: 92% for type, 94% for small
 * stamps, 80% for large ones) so the lightest part of a letter still passes the contrast check.
 * The floor is the alpha the colour matrix gives at the noise's brightest (about 0.9). DM Sans body text gets no filter, only a soft text shadow
 * in CSS, because readability wins over texture.
 */
export function InkFilters() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <defs>
        <filter id="ink-type" x="-3%" y="-20%" width="106%" height="140%" colorInterpolationFilters="sRGB">
          {/* ink creeping a fraction of a pixel into the fibres */}
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="3" result="fibre" />
          <feDisplacementMap in="SourceGraphic" in2="fibre" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="bled" />
          {/* ribbon density: wide soft patches between 92% and 100% (INK_DENSITY.type in theme.ts) */}
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.09" numOctaves="2" seed="11" result="ribbon" />
          <feColorMatrix in="ribbon" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.22 0 0 0 1.118" result="density" />
          <feComposite in="bled" in2="density" operator="in" result="dense" />
          {/* a few pinholes where the ribbon missed */}
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="5" result="speck" />
          <feColorMatrix in="speck" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -16 0 0 0 11.4" result="holes" />
          <feComposite in="dense" in2="holes" operator="in" result="printed" />
          {/* soft edge where the ink soaked in */}
          <feGaussianBlur in="printed" stdDeviation="0.3" result="soak" />
          <feMerge>
            <feMergeNode in="soak" />
            <feMergeNode in="printed" />
          </feMerge>
        </filter>

        <filter id="ink-stamp" x="-8%" y="-20%" width="116%" height="140%" colorInterpolationFilters="sRGB">
          {/* rough rubber edge */}
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="8" result="edge" />
          <feDisplacementMap in="SourceGraphic" in2="edge" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="rough" />
          {/* patchy ink: heavier on one side, the way a hand presses unevenly */}
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.03" numOctaves="2" seed="13" result="press" />
          <feColorMatrix in="press" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.6 0 0 0 1.34" result="density" />
          <feComposite in="rough" in2="density" operator="in" result="pressed" />
          {/* gaps where the paper grain did not take ink */}
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="2" result="grain" />
          <feColorMatrix in="grain" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -9 0 0 0 6.1" result="holes" />
          <feComposite in="pressed" in2="holes" operator="in" result="inked" />
          <feGaussianBlur in="inked" stdDeviation="0.35" result="soak" />
          <feMerge>
            <feMergeNode in="soak" />
            <feMergeNode in="inked" />
          </feMerge>
        </filter>

        <filter id="ink-stamp-small" x="-8%" y="-25%" width="116%" height="150%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="2" seed="8" result="edge" />
          <feDisplacementMap in="SourceGraphic" in2="edge" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="13" result="press" />
          <feColorMatrix in="press" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.25 0 0 0 1.165" result="density" />
          <feComposite in="rough" in2="density" operator="in" result="pressed" />
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="2" result="grain" />
          <feColorMatrix in="grain" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -16 0 0 0 11.2" result="holes" />
          <feComposite in="pressed" in2="holes" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
