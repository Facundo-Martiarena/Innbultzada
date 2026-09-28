import { Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  code: string;
  title: string;
  summary: string;
  bullets?: string[];
  footer?: ReactNode;
  Icon: LucideIcon;
  selected: boolean;
  onSelect: () => void;
  tone?: 'green' | 'yellow' | 'magenta' | 'navy';
  name: string;
}

const TONES = {
  green: 'bg-impact text-white',
  yellow: 'bg-opportunity text-navy',
  magenta: 'bg-magenta text-white',
  navy: 'bg-navy text-white',
};

/* Tarjeta de decisión con semántica de radio (teclado + lector de pantalla). */
export function DecisionCard({ code, title, summary, bullets, footer, Icon, selected, onSelect, tone = 'navy', name }: Props) {
  return (
    <label className={`card group relative flex cursor-pointer flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-magenta ${selected ? '!border-magenta ring-2 ring-magenta' : ''}`}>
      <input type="radio" name={name} className="sr-only" checked={selected} onChange={onSelect} />
      <div className="flex items-center justify-between">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${TONES[tone]}`}><Icon size={22} strokeWidth={1.75} aria-hidden /></span>
        <span className={`grid h-7 w-7 place-items-center rounded-full border-2 ${selected ? 'border-magenta bg-magenta text-white' : 'border-line'}`}>
          {selected && <Check size={14} strokeWidth={3} aria-hidden />}
        </span>
      </div>
      <p className="mt-4 font-mono text-sm font-semibold tracking-wider text-navy">{code}</p>
      <p className="font-display text-xl font-semibold text-navy">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{summary}</p>
      {bullets && (
        <ul className="mt-3 grid gap-1 text-sm text-ink-soft present:hidden">
          {bullets.map((b) => <li key={b} className="flex gap-2"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-navy-300" />{b}</li>)}
        </ul>
      )}
      {footer && <div className="mt-auto pt-4">{footer}</div>}
    </label>
  );
}
