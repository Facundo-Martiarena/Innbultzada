import { Coins, Heart, Wrench } from 'lucide-react';
import type { Evidence, Lens } from '../data/types';
import { STROKE } from '../lib/icons';

export const LENS: Record<Lens, { title: string; q: string; Icon: typeof Heart }> = {
  deseabilidad: { title: 'Deseabilidad', q: '¿Lo quieren los usuarios?', Icon: Heart },
  factibilidad: { title: 'Factibilidad', q: '¿Podemos construirlo?', Icon: Wrench },
  viabilidad: { title: 'Viabilidad', q: '¿Es sostenible como negocio?', Icon: Coins },
};

const STEPS: { key: keyof Evidence; label: string }[] = [
  { key: 'hypothesis', label: 'Hipótesis' },
  { key: 'experiment', label: 'Experimento' },
  { key: 'evidence', label: 'Evidencia' },
  { key: 'learning', label: 'Aprendizaje' },
];

export function EvidenceCard({ e, index = 0 }: { e: Evidence; index?: number }) {
  const { title, q, Icon } = LENS[e.lens];
  return (
    <article className="card flex flex-col p-6 animate-rise" style={{ animationDelay: `${index * 110}ms` }}>
      <header className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white"><Icon size={20} strokeWidth={STROKE} aria-hidden /></span>
        <div>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          <p className="text-sm text-ink-muted">{q}</p>
        </div>
      </header>
      <ol className="relative mt-5 grid gap-4 border-l-2 border-navy-100 pl-5">
        {STEPS.map((s) => (
          <li key={s.key} className="relative">
            <span aria-hidden className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-paper-raised ${s.key === 'evidence' ? 'bg-magenta' : s.key === 'learning' ? 'bg-impact' : 'bg-navy-300'}`} />
            <p className="eyebrow !text-[0.66rem]">{s.label}</p>
            <p className="mt-0.5 text-[0.92rem] leading-snug text-ink">{String(e[s.key])}</p>
            {s.key === 'evidence' && (
              <p className="mt-2 inline-flex items-baseline gap-2 rounded-lg bg-magenta-50 px-2.5 py-1">
                <span className="font-display text-xl font-semibold text-magenta">{e.metric.value}</span>
                <span className="text-xs text-magenta-600">{e.metric.label}</span>
              </p>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-auto pt-5">
        <div className="flex justify-between text-xs"><span className="font-semibold text-navy">Confianza en la evidencia</span><span className="font-mono">{e.confidence}%</span></div>
        <div className="mt-1.5 h-2 rounded-full bg-paper-sunk" role="meter" aria-valuenow={e.confidence} aria-valuemin={0} aria-valuemax={100} aria-label={`Confianza ${title}`}>
          <div className="h-full rounded-full bg-impact transition-all duration-700" style={{ width: `${e.confidence}%` }} />
        </div>
      </div>
    </article>
  );
}
