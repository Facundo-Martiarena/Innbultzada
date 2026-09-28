import { Check, CircleDashed, LoaderCircle } from 'lucide-react';
import { MILESTONES, stageById, stageIndex } from '../data/model';
import type { Milestone, MilestoneStatus } from '../data/types';

export const milestoneStatus = (m: Milestone, reached: number): MilestoneStatus => {
  const i = stageIndex(m.stage);
  return i < reached ? 'done' : i === reached ? 'progress' : 'pending';
};

const LABEL: Record<MilestoneStatus, string> = { done: 'Completado', progress: 'En progreso', pending: 'Pendiente' };

export function Passport({ reached, ventureName, compact = false }: { reached: number; ventureName: string; compact?: boolean }) {
  const items = MILESTONES.map((m) => ({ m, s: milestoneStatus(m, reached) }));
  const done = items.filter((i) => i.s === 'done').length;
  return (
    <section className="card overflow-hidden" aria-labelledby="passport-title">
      <header className="flex items-center justify-between gap-4 border-b border-line bg-navy px-6 py-4 text-white">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-navy-100">Pasaporte INNBULTZADA</p>
          <h3 id="passport-title" className="font-display text-xl font-semibold text-white">{ventureName}</h3>
        </div>
        <div className="text-right">
          <p className="font-display text-3xl font-semibold">{done}<span className="text-lg text-navy-300">/{items.length}</span></p>
          <p className="text-xs text-navy-100">hitos acreditados</p>
        </div>
      </header>
      <div className="h-1.5 bg-navy-100" aria-hidden>
        <div className="h-full bg-impact transition-all duration-700" style={{ width: `${(done / items.length) * 100}%` }} />
      </div>
      <ul className={`grid gap-px bg-line ${compact ? 'grid-cols-2' : 'grid-cols-3 max-lg:grid-cols-2'}`}>
        {items.map(({ m, s }) => (
          <li key={m.id} className={`flex gap-3 bg-paper-raised p-4 ${s === 'pending' ? 'opacity-70' : ''}`}>
            <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${s === 'done' ? 'bg-impact text-white' : s === 'progress' ? 'bg-magenta-50 text-magenta ring-1 ring-magenta' : 'text-navy-300'}`}>
              {s === 'done' ? <Check size={15} strokeWidth={3} aria-hidden /> : s === 'progress' ? <LoaderCircle size={15} strokeWidth={2.25} aria-hidden /> : <CircleDashed size={20} strokeWidth={1.75} aria-hidden />}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-tight text-navy">{m.label}</span>
              <span className={`block text-xs font-semibold ${s === 'done' ? 'text-impact-600' : s === 'progress' ? 'text-magenta-600' : 'text-ink-muted'}`}>
                {LABEL[s]} · {stageById(m.stage).en}
              </span>
              {!compact && <span className="mt-1 block text-xs leading-snug text-ink-muted present:hidden">{m.evidence}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
