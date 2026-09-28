import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLOW, flowIndex } from '../lib/flow';
import { useDemo } from '../state/DemoContext';

interface Props {
  step: string;
  nextLabel?: string;
  onNext?: () => void;       // acción adicional antes de navegar
  nextDisabled?: boolean;
  disabledHint?: string;
}

/* Navegación atrás / siguiente siempre visible + indicador de paso. */
export function FlowNav({ step, nextLabel, onNext, nextDisabled, disabledHint }: Props) {
  const nav = useNavigate();
  const { challengeId, presentation } = useDemo();
  const i = flowIndex(step);
  const prev = FLOW[i - 1];
  const next = FLOW[i + 1];

  const goNext = () => {
    if (!next || nextDisabled) return;
    onNext?.();
    nav(next.path(challengeId));
  };
  const goPrev = () => prev && nav(prev.path(challengeId));

  // En modo presentación: flechas / PageUp / PageDown (compatibles con mandos de presentación).
  useEffect(() => {
    if (!presentation) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select')) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <nav aria-label="Recorrido de la demo" className="sticky bottom-0 z-30 mt-12 border-t border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center gap-2 px-4 py-3 sm:gap-4 sm:px-8">
        <button type="button" className="btn-ghost shrink-0" onClick={goPrev} disabled={!prev}>
          <ArrowLeft size={18} aria-hidden />
          <span className="max-sm:sr-only">{prev ? prev.label : 'Atrás'}</span>
        </button>

        <span className="mx-auto font-mono text-xs text-ink-muted md:hidden" aria-hidden>{String(i + 1).padStart(2, '0')}/{String(FLOW.length).padStart(2, '0')}</span>

        <ol className="mx-auto flex items-center gap-1.5 max-md:hidden" aria-label={`Paso ${i + 1} de ${FLOW.length}`}>
          {FLOW.map((s, k) => (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => nav(s.path(challengeId))}
                aria-current={k === i ? 'step' : undefined}
                aria-label={`Paso ${k + 1}: ${s.narrative}`}
                title={s.narrative}
                className={`block h-2.5 rounded-full transition-all ${k === i ? 'w-8 bg-magenta' : k < i ? 'w-2.5 bg-navy' : 'w-2.5 bg-navy-100 hover:bg-navy-300'}`}
              />
            </li>
          ))}
          <li className="ml-3 font-mono text-xs text-ink-muted" aria-hidden>{String(i + 1).padStart(2, '0')}/{String(FLOW.length).padStart(2, '0')} · {FLOW[i].narrative}</li>
        </ol>

        {nextDisabled && disabledHint && <p className="max-w-[16rem] text-right text-xs text-ink-muted max-lg:hidden">{disabledHint}</p>}
        {next ? (
          <button type="button" className="btn-primary shrink-0" onClick={goNext} disabled={nextDisabled}>
            <span>{nextLabel ?? next.label}</span>
            <ArrowRight size={18} aria-hidden />
          </button>
        ) : (
          <button type="button" className="btn-navy shrink-0" onClick={() => nav('/programa')}>
            Ficha del programa <ArrowRight size={18} aria-hidden />
          </button>
        )}
      </div>
      {presentation && <p className="sr-only">Usa las flechas izquierda y derecha para avanzar.</p>}
    </nav>
  );
}
