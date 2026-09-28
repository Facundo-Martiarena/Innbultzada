import { RotateCcw } from 'lucide-react';
import { useRef, useState, type ReactNode, type PointerEvent } from 'react';
import type { LucideIcon } from 'lucide-react';

export type SwipeDir = 'left' | 'right';

interface Action { label: string; Icon: LucideIcon; stamp: string }

interface Props<T> {
  items: T[];
  getKey: (item: T) => string;
  renderCard: (item: T) => ReactNode;
  onDecide: (item: T, dir: SwipeDir) => void;
  onUndo?: (item: T) => void;
  left: Action;
  right: Action;
  empty: ReactNode;
  /** Bloquea el deslizamiento a la derecha (p. ej. cupo lleno) */
  rightDisabled?: boolean;
  height?: number;
}

const THRESHOLD = 110;
/** Un gesto rápido (flick) decide aunque no llegue al umbral. px/ms. */
const FLICK_VELOCITY = 0.55;
const MAX_ROTATION = 16;

/*
 * Mazo de tarjetas deslizables (swipe): arrastrar la carta superior o usar los botones.
 * Punch: inercia por velocidad, tinte de color al arrastrar y salida fuera de pantalla según el gesto.
 * Accesible: los botones son la vía principal; el arrastre es un atajo.
 */
export function SwipeDeck<T>({ items, getKey, renderCard, onDecide, onUndo, left, right, empty, rightDisabled, height = 520 }: Props<T>) {
  const [index, setIndex] = useState(0);
  const [dx, setDx] = useState(0);
  const [exit, setExit] = useState<SwipeDir | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ x: number; t: number } | null>(null);

  const current = items[index];
  const decide = (dir: SwipeDir) => {
    if (!current || exit) return;
    if (dir === 'right' && rightDisabled) return;
    navigator.vibrate?.(12);
    setExit(dir);
    setTimeout(() => {
      onDecide(current, dir);
      setHistory((h) => [...h, index]);
      setIndex((i) => i + 1);
      setExit(null);
      setDx(0);
    }, 260);
  };

  const onDown = (e: PointerEvent) => {
    start.current = { x: e.clientX, t: performance.now() };
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: PointerEvent) => { if (start.current) setDx(e.clientX - start.current.x); };
  const onUp = () => {
    if (!start.current) return;
    const dt = performance.now() - start.current.t;
    const vx = dt > 0 ? dx / dt : 0; // velocidad del gesto (px/ms)
    start.current = null;
    setDragging(false);
    const flick = Math.abs(vx) > FLICK_VELOCITY && Math.abs(dx) > 40;
    if (dx > THRESHOLD || (flick && vx > 0)) decide('right');
    else if (dx < -THRESHOLD || (flick && vx < 0)) decide('left');
    else setDx(0);
  };

  // La carta sale volando fuera de la pantalla, en la dirección del gesto.
  const flyOut = (typeof window !== 'undefined' ? window.innerWidth : 900) + 200;
  const offset = exit === 'right' ? flyOut : exit === 'left' ? -flyOut : dx;
  const rot = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, offset / 18));
  const rightO = Math.max(0, Math.min(1, offset / THRESHOLD));
  const leftO = Math.max(0, Math.min(1, -offset / THRESHOLD));
  // Muelle al soltar sin decidir; salida más seca al confirmar.
  const ease = exit ? 'transform .26s cubic-bezier(.36,.07,.28,1), opacity .26s' : 'transform .32s cubic-bezier(.34,1.4,.5,1), opacity .26s';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[460px]" style={{ height }}>
        {!current && <div className="absolute inset-0 grid place-items-center rounded-[1.75rem] border-2 border-dashed border-line bg-paper-raised p-8 text-center">{empty}</div>}
        {items.slice(index, index + 3).map((item, i) => {
          const top = i === 0;
          return (
            <div
              key={getKey(item)}
              className={`absolute inset-0 select-none overflow-hidden rounded-[1.75rem] border border-line bg-paper-raised shadow-lift ${top ? 'cursor-grab touch-none active:cursor-grabbing' : 'pointer-events-none'}`}
              style={{
                zIndex: 10 - i,
                transform: top
                  ? `translateX(${offset}px) rotate(${rot}deg)`
                  : `translateY(${i * 14}px) scale(${1 - i * 0.045})`,
                opacity: top ? 1 : 1 - i * 0.25,
                transition: dragging && top ? 'none' : ease,
              }}
              onPointerDown={top ? onDown : undefined}
              onPointerMove={top ? onMove : undefined}
              onPointerUp={top ? onUp : undefined}
              onPointerCancel={top ? onUp : undefined}
              aria-hidden={!top}
            >
              {renderCard(item)}
              {top && (
                <>
                  {/* Tinte de color que crece con el arrastre (verde = aceptar, magenta = pasar). */}
                  <div className="pointer-events-none absolute inset-0 bg-impact mix-blend-multiply" style={{ opacity: rightO * 0.22 }} aria-hidden />
                  <div className="pointer-events-none absolute inset-0 bg-magenta mix-blend-multiply" style={{ opacity: leftO * 0.22 }} aria-hidden />
                  <span className="pointer-events-none absolute left-6 top-6 -rotate-12 rounded-xl border-4 border-impact px-3 py-1 font-display text-2xl font-bold text-impact" style={{ opacity: rightO }}>{right.stamp}</span>
                  <span className="pointer-events-none absolute right-6 top-6 rotate-12 rounded-xl border-4 border-magenta px-3 py-1 font-display text-2xl font-bold text-magenta" style={{ opacity: leftO }}>{left.stamp}</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button type="button" onClick={() => decide('left')} disabled={!current} aria-label={left.label}
          className="grid h-16 w-16 place-items-center rounded-full border-2 border-magenta/30 bg-paper-raised text-magenta shadow-card transition hover:scale-105 hover:border-magenta disabled:opacity-30">
          <left.Icon size={28} strokeWidth={2.25} aria-hidden />
        </button>
        <button type="button" disabled={history.length === 0 || !!exit} aria-label="Deshacer"
          onClick={() => { const prev = history[history.length - 1]; setHistory((h) => h.slice(0, -1)); setIndex(prev); onUndo?.(items[prev]); }}
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper-raised text-ink-muted transition hover:text-navy disabled:opacity-30">
          <RotateCcw size={18} aria-hidden />
        </button>
        <button type="button" onClick={() => decide('right')} disabled={!current || rightDisabled} aria-label={right.label}
          className="grid h-16 w-16 place-items-center rounded-full bg-impact text-white shadow-lift transition hover:scale-105 disabled:opacity-30">
          <right.Icon size={28} strokeWidth={2.25} aria-hidden />
        </button>
      </div>
      <p className="mt-3 text-xs text-ink-muted present:hidden">
        Arrastra la tarjeta o usa los botones · {left.label} / {right.label} · {Math.min(index + 1, items.length)} de {items.length}
      </p>
    </div>
  );
}
