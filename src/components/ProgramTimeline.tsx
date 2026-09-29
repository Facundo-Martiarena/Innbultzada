import { Check } from 'lucide-react';

export type ProgramPhase = 'alta' | 'piloto' | 'decision' | 'post';

const PHASES: { id: ProgramPhase; label: string; months: string; span: number; note: string }[] = [
  { id: 'alta', label: 'Alta y seguridad', months: 'Mes 1', span: 1, note: 'Alta como proveedor · revisión de seguridad' },
  { id: 'piloto', label: 'Piloto pagado', months: 'Meses 2–5', span: 4, note: '30.000 € · sandbox con datos anonimizados' },
  { id: 'decision', label: 'Evaluación y decisión', months: 'Mes 6', span: 1, note: '¿LABORAL Kutxa firma como cliente?' },
  { id: 'post', label: 'Post-programa', months: '+12 meses', span: 2, note: 'KPIs, posventa, pool y alumni' },
];

/* Línea temporal del programa: 6 meses prorrogables + 12 meses de seguimiento. */
export function ProgramTimeline({ current }: { current?: ProgramPhase }) {
  const ci = current ? PHASES.findIndex((p) => p.id === current) : -1;
  return (
    <section className="card p-5" aria-label="Calendario del programa">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-navy">Programa INNBULTZADA · 6 meses, prorrogables</p>
        <p className="text-xs text-ink-muted">Sin equity · piloto pagado de 30.000 € por startup</p>
      </div>
      <ol className="grid grid-cols-4 gap-1.5 sm:grid-cols-8">
        {PHASES.map((p, i) => {
          const st = i < ci ? 'done' : i === ci ? 'current' : 'pending';
          return (
            <li key={p.id} aria-current={st === 'current' ? 'step' : undefined} style={{ gridColumn: `span ${p.span}` }}
              className={`rounded-xl px-3 py-2.5 ${st === 'current' ? 'bg-magenta text-white shadow-lift' : st === 'done' ? 'bg-impact-50 text-impact-600' : p.id === 'post' ? 'border border-dashed border-navy-300 text-ink-muted' : 'bg-navy-50 text-navy'}`}>
              <p className="flex items-center gap-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider">
                {st === 'done' && <Check size={12} strokeWidth={3} aria-hidden />}{p.months}
                <span className="sr-only"> — {st === 'done' ? 'completado' : st === 'current' ? 'en curso' : 'pendiente'}</span>
              </p>
              <p className="font-semibold leading-tight">{p.label}</p>
              <p className={`text-[0.72rem] leading-snug ${st === 'current' ? 'text-magenta-50' : 'opacity-80'}`}>{p.note}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
