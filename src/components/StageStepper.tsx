import { ArrowRight, Check } from 'lucide-react';
import { STAGES, stageIndex } from '../data/model';
import type { StageId } from '../data/types';
import { STAGE_ICON, STROKE } from '../lib/icons';

type Variant = 'hero' | 'compact' | 'workspace';

interface Props {
  current?: StageId | null;
  /** Índice hasta el que las etapas se consideran superadas (exclusivo). Por defecto = current. */
  doneBefore?: number;
  variant?: Variant;
  onSelect?: (id: StageId) => void;
}

const statusOf = (i: number, cur: number, doneBefore: number) =>
  i < doneBefore ? 'done' : i === cur ? 'current' : 'pending';

const STATUS_TEXT = { done: 'Superada', current: 'En curso', pending: 'Pendiente' } as const;

export function StageStepper({ current = null, doneBefore, variant = 'compact', onSelect }: Props) {
  const cur = current ? stageIndex(current) : -1;
  const done = doneBefore ?? cur;

  if (variant === 'hero') {
    return (
      <ol className="grid grid-cols-6 gap-3 max-lg:grid-cols-3" aria-label="Modelo INNBULTZADA en seis etapas">
        {STAGES.map((s, i) => {
          const Icon = STAGE_ICON[s.id];
          return (
            <li key={s.id} className="relative animate-rise" style={{ animationDelay: `${120 + i * 90}ms` }}>
              <button
                type="button"
                onClick={() => onSelect?.(s.id)}
                className="group card w-full h-full p-4 text-left transition hover:-translate-y-1 hover:shadow-lift hover:border-navy-300"
              >
                <span className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy group-hover:bg-magenta group-hover:text-white transition-colors">
                    <Icon size={20} strokeWidth={STROKE} aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-ink-muted">0{i + 1}</span>
                </span>
                <span className="mt-4 block font-mono text-sm font-semibold tracking-wider text-navy">{s.en}</span>
                <span className="block text-sm text-ink-muted">{s.es}</span>
                <span className="mt-2 block text-[0.8rem] leading-snug text-ink-soft present:hidden">{s.question}</span>
              </button>
              {i < STAGES.length - 1 && (
                <ArrowRight
                  aria-hidden
                  size={16}
                  className="absolute -right-[13px] top-1/2 z-10 -translate-y-1/2 rounded-full bg-paper text-navy-300 max-lg:hidden"
                />
              )}
            </li>
          );
        })}
      </ol>
    );
  }

  if (variant === 'workspace') {
    return (
      <ol className="grid grid-cols-6 gap-2" aria-label="Progreso del proyecto">
        {STAGES.map((s, i) => {
          const st = statusOf(i, cur, done);
          const Icon = STAGE_ICON[s.id];
          return (
            <li
              key={s.id}
              aria-current={st === 'current' ? 'step' : undefined}
              className={`relative rounded-2xl border p-3 transition ${
                st === 'done' ? 'border-impact/30 bg-impact-50' : st === 'current' ? 'border-magenta bg-magenta-50 shadow-card' : 'border-line border-dashed bg-paper-raised'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`grid h-8 w-8 place-items-center rounded-lg ${st === 'done' ? 'bg-impact text-white' : st === 'current' ? 'bg-magenta text-white' : 'bg-paper-sunk text-ink-muted'}`}>
                  {st === 'done' ? <Check size={16} strokeWidth={2.5} aria-hidden /> : <Icon size={16} strokeWidth={STROKE} aria-hidden />}
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-navy">{s.en}</span>
              </div>
              <p className={`mt-2 text-xs font-semibold ${st === 'done' ? 'text-impact-600' : st === 'current' ? 'text-magenta-600' : 'text-ink-muted'}`}>
                {STATUS_TEXT[st]}
              </p>
              <p className="mt-1 text-[0.72rem] leading-snug text-ink-soft present:hidden">{s.gate}</p>
            </li>
          );
        })}
      </ol>
    );
  }

  // compact: barra de etapa global
  return (
    <ol className="flex items-center gap-1" aria-label="Etapa INNBULTZADA">
      {STAGES.map((s, i) => {
        const st = statusOf(i, cur, done);
        return (
          <li key={s.id} className="flex items-center gap-1" aria-current={st === 'current' ? 'step' : undefined}>
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.68rem] font-semibold tracking-wider transition-all ${
                st === 'current' ? 'bg-navy text-white' : st === 'done' ? 'text-impact-600' : 'text-ink-muted'
              }`}
            >
              {st === 'done' ? <Check size={12} strokeWidth={3} aria-hidden /> : <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${st === 'current' ? 'bg-magenta' : 'bg-navy-300'}`} />}
              {s.en}
              <span className="sr-only"> — {STATUS_TEXT[st]}</span>
            </span>
            {i < STAGES.length - 1 && <span aria-hidden className={`h-px w-3 ${i < done ? 'bg-impact' : 'bg-line'}`} />}
          </li>
        );
      })}
    </ol>
  );
}
