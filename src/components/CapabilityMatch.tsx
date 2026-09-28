import { Check, Plus } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import type { Challenge, CapabilityId } from '../data/types';
import { capabilityById } from '../data/model';
import type { ActorMatch } from '../lib/match';
import { CAPABILITY_ICON, STROKE } from '../lib/icons';
import { ActorBadge } from './ActorBadge';
import { CompatibilityRing } from './primitives';

interface Props {
  challenge: Challenge;
  matches: ActorMatch[];
  team: string[];
  covered: Set<CapabilityId>;
  onToggle: (actorId: string) => void;
  labels?: { on: string; off: string; right: string };
}

interface Line { need: CapabilityId; actor: string; d: string }

/*
 * Visual de Match: necesidades del reto (izquierda) ↔ actores del ecosistema (derecha).
 * Las conexiones se dibujan en SVG midiendo la posición real de los nodos.
 */
export function CapabilityMatch({ challenge, matches, team, covered, onToggle, labels = { on: 'En equipo', off: 'Añadir', right: 'Capacidades del ecosistema · actores potenciales' } }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const needRefs = useRef(new Map<string, HTMLElement>());
  const actorRefs = useRef(new Map<string, HTMLElement>());
  const [lines, setLines] = useState<Line[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [hoverActor, setHoverActor] = useState<string | null>(null);
  const [hoverNeed, setHoverNeed] = useState<CapabilityId | null>(null);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const compute = () => {
      const base = el.getBoundingClientRect();
      const out: Line[] = [];
      matches.forEach((m) => {
        const a = actorRefs.current.get(m.actor.id)?.getBoundingClientRect();
        if (!a) return;
        m.covers.forEach((need) => {
          const n = needRefs.current.get(need)?.getBoundingClientRect();
          if (!n) return;
          const x1 = n.right - base.left, y1 = n.top + n.height / 2 - base.top;
          const x2 = a.left - base.left, y2 = a.top + a.height / 2 - base.top;
          const mx = (x1 + x2) / 2;
          out.push({ need, actor: m.actor.id, d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}` });
        });
      });
      setBox({ w: base.width, h: base.height });
      setLines(out);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [matches]);

  const focus = (l: Line) =>
    (hoverActor ? l.actor === hoverActor : true) && (hoverNeed ? l.need === hoverNeed : true);
  const anyHover = hoverActor || hoverNeed;

  return (
    <div ref={wrap} className="relative grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(120px,0.55fr)_minmax(0,1.35fr)] lg:gap-0">
      {/* Conexiones (solo desktop, donde las columnas están lado a lado) */}
      <svg className="pointer-events-none absolute inset-0 hidden lg:block" width={box.w} height={box.h} aria-hidden>
        {lines.map((l) => {
          const inTeam = team.includes(l.actor);
          const hi = anyHover ? focus(l) : inTeam;
          return (
            <path
              key={l.need + l.actor}
              d={l.d}
              fill="none"
              stroke={hi ? (inTeam ? 'rgb(var(--magenta))' : 'rgb(var(--navy-500))') : 'rgb(var(--navy-300))'}
              strokeWidth={hi ? 2.25 : 1}
              strokeDasharray={inTeam ? undefined : '4 5'}
              opacity={anyHover && !focus(l) ? 0.12 : hi ? 0.95 : 0.45}
              className={inTeam && hi ? '' : 'animate-dash'}
              style={{ transition: 'opacity .2s, stroke .2s' }}
            />
          );
        })}
      </svg>

      {/* RETO */}
      <div className="relative z-10">
        <p className="eyebrow mb-3">Reto · capacidades necesarias</p>
        <div className="card mb-4 border-navy bg-navy p-5 text-white">
          <p className="font-mono text-xs text-navy-100">{challenge.code} · Reto Demo</p>
          <p className="mt-1 font-display text-lg font-semibold leading-snug">{challenge.title}</p>
        </div>
        <ul className="grid gap-2.5">
          {challenge.needs.map((n) => {
            const Icon = CAPABILITY_ICON[n];
            const ok = covered.has(n);
            return (
              <li key={n}>
                <div
                  ref={(el) => { if (el) needRefs.current.set(n, el); }}
                  onMouseEnter={() => setHoverNeed(n)}
                  onMouseLeave={() => setHoverNeed(null)}
                  className={`flex items-center gap-3 rounded-2xl border bg-paper-raised px-3 py-2.5 transition ${hoverNeed === n ? 'border-magenta shadow-lift' : ok ? 'border-impact/40' : 'border-line'}`}
                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${ok ? 'bg-impact-50 text-impact-600' : 'bg-navy-50 text-navy'}`}>
                    <Icon size={17} strokeWidth={STROKE} aria-hidden />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-navy">{capabilityById(n).name}</span>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${ok ? 'text-impact-600' : 'text-ink-muted'}`}>
                    {ok ? <><Check size={13} strokeWidth={3} aria-hidden />Cubierta</> : 'Pendiente'}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div aria-hidden className="hidden lg:block" />

      {/* ECOSISTEMA */}
      <div className="relative z-10">
        <p className="eyebrow mb-3">{labels.right}</p>
        <ul className="grid gap-2.5" aria-label={`${labels.right}. Pulsa para marcar o desmarcar`}>
          {matches.map((m) => {
            const inTeam = team.includes(m.actor.id);
            return (
              <li key={m.actor.id}>
                <button
                  type="button"
                  ref={(el) => { if (el) actorRefs.current.set(m.actor.id, el); }}
                  aria-pressed={inTeam}
                  onClick={() => onToggle(m.actor.id)}
                  onMouseEnter={() => setHoverActor(m.actor.id)}
                  onMouseLeave={() => setHoverActor(null)}
                  onFocus={() => setHoverActor(m.actor.id)}
                  onBlur={() => setHoverActor(null)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition hover:shadow-lift ${inTeam ? 'border-magenta bg-magenta-50' : 'border-line bg-paper-raised hover:border-navy-300'}`}
                >
                  <span className="min-w-0 flex-1"><ActorBadge actor={m.actor} size="sm" /></span>
                  <span className="hidden gap-1 xl:flex">
                    {m.covers.map((c) => {
                      const Icon = CAPABILITY_ICON[c];
                      return (
                        <span key={c} title={capabilityById(c).name} className="grid h-7 w-7 place-items-center rounded-md bg-paper-sunk text-navy-700">
                          <Icon size={14} strokeWidth={STROKE} aria-hidden />
                          <span className="sr-only">{capabilityById(c).name}</span>
                        </span>
                      );
                    })}
                  </span>
                  <CompatibilityRing value={m.score} size={44} />
                  <span className={`flex w-[6.5rem] items-center justify-center gap-1 rounded-full py-1 text-xs font-semibold ${inTeam ? 'bg-magenta text-white' : 'bg-paper-sunk text-navy'}`}>
                    {inTeam ? <><Check size={13} strokeWidth={3} aria-hidden />{labels.on}</> : <><Plus size={13} strokeWidth={3} aria-hidden />{labels.off}</>}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
