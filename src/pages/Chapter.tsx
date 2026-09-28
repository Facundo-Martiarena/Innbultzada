import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { SwipeCardMini } from '../components/SwipeCardMini';
import { CHAPTERS, chapterBySlug } from '../data/chapters';
import { stageById } from '../data/model';
import { STAGE_ICON } from '../lib/icons';
import { useDemo } from '../state/DemoContext';

/*
 * Diapositiva de capítulo: entra completa en una pantalla (sin scroll). La flecha (→)
 * revela cada punto y, cuando no quedan, pasa al capítulo siguiente. En móvil: swipe.
 */
export default function Chapter() {
  const { slug } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const { challengeId } = useDemo();
  const ch = chapterBySlug(slug);
  const startX = useRef<number | null>(null);
  const stateRevealed = (loc.state as { revealed?: number } | null)?.revealed;
  const [revealed, setRevealed] = useState(typeof stateRevealed === 'number' ? stateRevealed : (ch?.beats.length ?? 0));

  useEffect(() => {
    const s = (loc.state as { revealed?: number } | null)?.revealed;
    setRevealed(typeof s === 'number' ? s : (ch?.beats.length ?? 0));
    window.scrollTo({ top: 0 });
  }, [loc.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const idx = ch ? CHAPTERS.indexOf(ch) : -1;
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];

  const step = (dir: 1 | -1) => {
    if (!ch) return;
    if (dir === 1) {
      if (revealed < ch.beats.length) setRevealed((r) => r + 1);
      else if (next) nav(`/capitulo/${next.slug}`, { state: { revealed: 0 } });
      else nav('/seccion/modelo', { state: { revealed: 0 } }); // sigue la presentación
    } else {
      if (revealed > 0) setRevealed((r) => r - 1);
      else if (prev) nav(`/capitulo/${prev.slug}`, { state: { revealed: prev.beats.length } });
      else nav('/seccion/herramienta'); // vuelve a la slide "La herramienta"
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); step(1); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); step(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!ch) return <Navigate to="/capitulo/reto" replace />;
  const total = ch.beats.length;
  const more = revealed < total;
  const s = stageById(ch.stage);
  const StageIcon = STAGE_ICON[ch.stage];

  return (
    <div
      className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-3xl flex-col py-3"
      onPointerDown={(e) => { startX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (dx < -55) step(1);
        else if (dx > 55) step(-1);
      }}
    >
      {/* Progreso: 4 capítulos, con avance dentro del actual */}
      <ol className="flex items-center gap-1.5" aria-label={`Capítulo ${ch.n} de ${CHAPTERS.length}`}>
        {CHAPTERS.map((c, i) => {
          const frac = i < idx ? 1 : i > idx ? 0 : total ? revealed / total : 1;
          return (
            <li key={c.slug} className="flex-1">
              <button type="button" onClick={() => nav(`/capitulo/${c.slug}`, { state: { revealed: c.beats.length } })}
                aria-current={i === idx ? 'step' : undefined} aria-label={`Capítulo ${c.n}: ${c.title}`}
                className="block h-1.5 w-full overflow-hidden rounded-full bg-navy-100">
                <span className="block h-full rounded-full bg-magenta transition-all duration-300" style={{ width: `${frac * 100}%` }} />
              </button>
            </li>
          );
        })}
      </ol>

      {/* Contenido centrado como diapositiva */}
      <div className="flex flex-1 flex-col justify-center gap-5 py-4">
        <header>
          <p className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 font-mono text-[0.7rem] font-semibold tracking-wider text-white">
            <StageIcon size={13} aria-hidden /> {s.en} <span className="text-navy-300">·</span> <span className="font-sans font-medium normal-case tracking-normal text-navy-100">{s.es}</span>
          </p>
          <h1 className="mt-2.5 text-2xl font-semibold leading-tight sm:text-[2rem]"><span className="text-ink-muted">0{ch.n}.</span> {ch.title}</h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]">{ch.lead}</p>
        </header>

        <div className="grid gap-3">
          {ch.beats.slice(0, revealed).map((b) => (
            <article key={b.title} className="card animate-reveal p-4 sm:p-5">
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="flex flex-1 items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 animate-popIn place-items-center rounded-xl bg-navy-50 text-navy"><b.Icon size={20} strokeWidth={1.75} aria-hidden /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <h2 className="font-semibold leading-snug text-navy sm:text-lg">{b.title}</h2>
                      {b.stat && <span className="chip bg-opportunity-100 px-2 py-0.5 text-xs text-navy">{b.stat}</span>}
                    </div>
                    <p className="mt-1 text-sm leading-snug text-ink-soft">{b.text}</p>
                    {b.detail && (
                      <button type="button" onClick={() => nav(b.detail!.path(challengeId))}
                        className="mt-2 inline-flex min-h-[36px] items-center gap-1.5 text-sm font-semibold text-magenta hover:underline">
                        {b.detail.label} <ArrowRight size={15} aria-hidden />
                      </button>
                    )}
                  </div>
                </div>
                {b.swipe && (
                  <div className="shrink-0">
                    <SwipeCardMini eyebrow={b.swipe.eyebrow} cardTitle={b.swipe.cardTitle} cardSub={b.swipe.cardSub} rightStamp={b.swipe.rightStamp} RightIcon={b.swipe.RightIcon} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Navegación de la diapositiva */}
      <nav className="flex items-center justify-between gap-3 border-t border-line pt-4" aria-label="Presentación">
        <button type="button" className="btn-ghost min-h-[44px] shrink-0" onClick={() => step(-1)}>
          <ArrowLeft size={18} aria-hidden />
          <span className="max-sm:sr-only">{revealed > 0 ? 'Anterior' : prev ? prev.title : 'La herramienta'}</span>
        </button>
        <span className="mx-auto font-mono text-xs text-ink-muted" aria-hidden>
          {total ? `${Math.min(revealed + (more ? 1 : 0), total)}/${total}` : ''} · <span className="max-sm:hidden">← →</span><span className="sm:hidden">deslizá</span>
        </span>
        <button type="button" className="btn-primary min-h-[44px] shrink-0" onClick={() => step(1)}>
          <span>{more ? 'Siguiente' : next ? next.title : 'El modelo'}</span>
          <ArrowRight size={18} aria-hidden />
        </button>
      </nav>
    </div>
  );
}
