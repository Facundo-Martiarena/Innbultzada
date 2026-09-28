import { SCALE_RINGS } from '../data/model';

/* Mapa de escalado en anillos concéntricos: del Cliente 0 al mercado global. */
export function EcosystemMap({ level, onSelect }: { level: number; onSelect: (i: number) => void }) {
  const size = 520;
  const c = size / 2;
  const radii = [58, 108, 158, 208, 256];
  const fills = ['rgb(var(--magenta))', 'rgb(var(--navy))', 'rgb(var(--navy-700))', 'rgb(var(--navy-500))', 'rgb(var(--navy-300))'];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" role="img" aria-label={`Escalado alcanzado: ${SCALE_RINGS[level].label}`}>
        {[...radii].reverse().map((r, ri) => {
          const i = radii.length - 1 - ri;
          const on = i <= level;
          return (
            <circle key={r} cx={c} cy={c} r={r}
              fill={on ? fills[i] : 'rgb(var(--paper-sunk))'}
              fillOpacity={on ? (i === 0 ? 1 : 0.14 + (4 - i) * 0.05) : 0.6}
              stroke={on ? fills[i] : 'rgb(var(--line))'} strokeWidth={on ? 1.5 : 1}
              strokeDasharray={on ? undefined : '4 6'}
              style={{ transition: 'all .6s ease' }}
            />
          );
        })}
        {SCALE_RINGS.map((ring, i) => {
          const y = i === 0 ? c + 5 : c - (radii[i - 1] + radii[i]) / 2 + 5;
          const on = i <= level;
          return (
            <text key={ring.id} x={c} y={y} textAnchor="middle"
              className="font-sans" fontSize={i === 0 ? 15 : 14} fontWeight={700}
              fill={i === 0 ? '#fff' : on ? 'rgb(var(--navy))' : 'rgb(var(--ink-muted))'}>
              {ring.label}
            </text>
          );
        })}
      </svg>
      <div className="sr-only">
        {SCALE_RINGS.map((r, i) => <button key={r.id} type="button" onClick={() => onSelect(i)}>{r.label}</button>)}
      </div>
    </div>
  );
}
