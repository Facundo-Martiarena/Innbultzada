import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { EcosystemDiagram } from '../components/EcosystemDiagram';
import { SECTIONS, sectionBySlug } from '../data/sections';

/*
 * Diapositiva de sección del pitch (deck principal, 5 secciones). Entra completa en una
 * pantalla; la flecha (→) revela cada punto y luego pasa a la siguiente. En móvil: swipe.
 */
export default function Section() {
  const { slug } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const sec = sectionBySlug(slug);
  const startX = useRef<number | null>(null);
  const stateRevealed = (loc.state as { revealed?: number } | null)?.revealed;
  const [revealed, setRevealed] = useState(typeof stateRevealed === 'number' ? stateRevealed : (sec?.beats.length ?? 0));
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    const s = (loc.state as { revealed?: number } | null)?.revealed;
    setRevealed(typeof s === 'number' ? s : (sec?.beats.length ?? 0));
    window.scrollTo({ top: 0 });
  }, [loc.key]); // eslint-disable-line react-hooks/exhaustive-deps

  const idx = sec ? SECTIONS.indexOf(sec) : -1;
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];

  const step = (dir: 1 | -1) => {
    if (!sec) return;
    if (dir === 1) {
      if (revealed < sec.beats.length) setRevealed((r) => r + 1);
      else if (next) nav(`/seccion/${next.slug}`, { state: { revealed: 0 } });
      else nav('/programa');
    } else {
      if (revealed > 0) setRevealed((r) => r - 1);
      else if (prev) nav(`/seccion/${prev.slug}`, { state: { revealed: prev.beats.length } });
      else nav('/');
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

  if (!sec) return <Navigate to="/seccion/portada" replace />;
  const total = sec.beats.length;
  const more = revealed < total;

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
      {/* Progreso: 5 secciones */}
      <ol className="flex items-center gap-1.5" aria-label={`Sección ${sec.n} de ${SECTIONS.length}`}>
        {SECTIONS.map((s, i) => {
          const frac = i < idx ? 1 : i > idx ? 0 : total ? revealed / total : 1;
          return (
            <li key={s.slug} className="flex-1">
              <button type="button" onClick={() => nav(`/seccion/${s.slug}`, { state: { revealed: s.beats.length } })}
                aria-current={i === idx ? 'step' : undefined} aria-label={`Sección ${s.n}: ${s.title}`}
                className="block h-1.5 w-full overflow-hidden rounded-full bg-navy-100">
                <span className="block h-full rounded-full bg-magenta transition-all duration-300" style={{ width: `${frac * 100}%` }} />
              </button>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-1 flex-col justify-center gap-5 py-4">
        {sec.cover ? (
          imgOk ? (
            <img src={`${import.meta.env.BASE_URL}brand/${sec.cover}`} alt="INNBULTZADA · portada" onError={() => setImgOk(false)}
              className="mx-auto max-h-[calc(100dvh-11rem)] w-full rounded-xl2 object-contain shadow-card" />
          ) : (
            <div className="grid min-h-[50vh] place-items-center rounded-xl2 border border-line bg-paper-raised p-8 text-center">
              <div>
                <p className="font-display text-4xl font-bold tracking-tight text-magenta sm:text-6xl">INNBULTZADA</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-navy sm:text-sm">Impulsar · Conectar · Crear</p>
                <p className="mt-4 text-ink-soft">Solución para activar nuevas oportunidades de emprendimiento e innovación.</p>
                <p className="mt-5 text-xs text-ink-muted">Guardá la portada en <code>public/brand/portada.png</code></p>
              </div>
            </div>
          )
        ) : (
        <>
        <header>
          <p className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-white">{sec.eyebrow}</p>
          <h1 className="mt-2.5 text-2xl font-semibold leading-tight sm:text-[2rem]">{sec.title}</h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]">{sec.lead}</p>
        </header>

        {sec.loop && (
          <p className="flex items-center gap-2 self-start rounded-full bg-impact-50 px-3 py-1 text-xs font-semibold text-impact-600">
            <RefreshCw size={14} aria-hidden />El ciclo se repite en cada vuelta
          </p>
        )}

        {sec.diagram ? (
          <EcosystemDiagram sel="match" onSelect={(id) => nav(`/seccion/${id}`, { state: { revealed: 0 } })} />
        ) : (
          <div className="grid gap-3">
            {sec.beats.slice(0, revealed).map((b) => (
              <article key={b.title} className="card animate-reveal p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 animate-popIn place-items-center rounded-xl bg-navy-50 text-navy"><b.Icon size={20} strokeWidth={1.75} aria-hidden /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <h2 className="font-semibold leading-snug text-navy sm:text-lg">{b.title}</h2>
                      {b.stat && <span className="chip bg-opportunity-100 px-2 py-0.5 text-xs text-navy">{b.stat}</span>}
                    </div>
                    <p className="mt-1 text-sm leading-snug text-ink-soft">{b.text}</p>
                  </div>
                </div>
              </article>
            ))}

            {sec.cta && (
              <button type="button" onClick={() => nav(sec.cta!.to, { state: { revealed: 0 } })}
                className="btn-primary min-h-[52px] justify-center text-base">
                {sec.cta.label} <ArrowRight size={18} aria-hidden />
              </button>
            )}
          </div>
        )}
        </>
        )}
      </div>

      <nav className="flex items-center justify-between gap-3 border-t border-line pt-4" aria-label="Presentación">
        <button type="button" className="btn-ghost min-h-[44px] shrink-0" onClick={() => step(-1)}>
          <ArrowLeft size={18} aria-hidden />
          <span className="max-sm:sr-only">{revealed > 0 ? 'Anterior' : prev ? prev.title : 'Inicio'}</span>
        </button>
        <span className="mx-auto font-mono text-xs text-ink-muted" aria-hidden>
          {total ? `${Math.min(revealed + (more ? 1 : 0), total)}/${total}` : ''} · <span className="max-sm:hidden">← →</span><span className="sm:hidden">deslizá</span>
        </span>
        <button type="button" className="btn-primary min-h-[44px] shrink-0" onClick={() => step(1)}>
          <span>{more ? 'Siguiente' : next ? next.title : 'Programa'}</span>
          <ArrowRight size={18} aria-hidden />
        </button>
      </nav>
    </div>
  );
}
