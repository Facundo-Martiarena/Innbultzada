import type { ReactNode } from 'react';
import type { StageId } from '../data/types';
import { stageById } from '../data/model';
import { STAGE_ICON } from '../lib/icons';

/* Cabecera de pantalla: etapa + título narrativo. */
export function PageHeader({ stage, title, lead, aside }: { stage?: StageId; title: ReactNode; lead?: ReactNode; aside?: ReactNode }) {
  const s = stage ? stageById(stage) : null;
  const Icon = stage ? STAGE_ICON[stage] : null;
  return (
    <header className="flex flex-col gap-4 pb-6 pt-6 animate-rise sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:pb-8 sm:pt-10">
      <div className="max-w-4xl">
        {s && Icon && (
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 font-mono text-xs font-semibold tracking-wider text-white">
            <Icon size={14} aria-hidden /> {s.en} <span className="text-navy-300">·</span> <span className="font-sans font-medium normal-case tracking-normal text-navy-100">{s.es}</span>
          </p>
        )}
        <h1 className="text-[1.9rem] font-semibold leading-[1.1] sm:text-[2.5rem] sm:leading-[1.08] present:text-[2.9rem]">{title}</h1>
        {lead && <p className="mt-3 max-w-3xl leading-relaxed text-ink-soft sm:text-lg">{lead}</p>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </header>
  );
}
