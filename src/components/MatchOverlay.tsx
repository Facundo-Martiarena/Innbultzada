import { Building2, CircleCheck, Rocket, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { Applicant } from '../data/applicants';
import type { Challenge } from '../data/types';

interface Props {
  challenge: Challenge;
  startup: Applicant;
  score: number;
  reason?: string;
  onApply: () => void;
  onDismiss: () => void;
}

/*
 * Confirmación de encaje tras evaluar la tarjeta. Sobrio, de negocio (no festejo impulsivo).
 * Accesible: rol de diálogo, cierre con Esc y foco inicial en la acción principal.
 */
export function MatchOverlay({ challenge, startup, score, reason, onApply, onDismiss }: Props) {
  const applyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    applyRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onDismiss(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-navy/85 p-6 backdrop-blur-sm animate-rise"
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-title"
      onPointerDown={(e) => { if (e.target === e.currentTarget) onDismiss(); }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] bg-paper-raised text-center shadow-lift">
        <button type="button" onClick={onDismiss} aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white">
          <X size={18} aria-hidden />
        </button>

        <div className="bg-navy px-8 pb-9 pt-9 text-white">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-navy-100">Encaje {score}%</p>
          <h2 id="match-title" className="mt-2 font-display text-3xl font-semibold leading-none">Buen encaje</h2>

          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 ring-2 ring-white/30"><Rocket size={26} strokeWidth={1.75} aria-hidden /></span>
            <CircleCheck size={26} className="text-impact-600" aria-hidden />
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 ring-2 ring-white/30"><Building2 size={26} strokeWidth={1.75} aria-hidden /></span>
          </div>
          <p className="mt-4 text-sm text-navy-100">
            <span className="font-semibold text-white">{startup.name}</span> encaja con el reto
          </p>
          <p className="font-display text-lg font-semibold leading-tight">{challenge.title}</p>
          {reason && <p className="mt-2 text-xs leading-snug text-navy-100">{reason}</p>}
        </div>

        <div className="p-6">
          <button ref={applyRef} type="button" className="btn-primary w-full" onClick={onApply}>Postularme a este reto</button>
          <button type="button" className="btn-ghost mt-2 w-full" onClick={onDismiss}>Seguir evaluando</button>
        </div>
      </div>
    </div>
  );
}
