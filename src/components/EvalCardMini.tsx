import type { LucideIcon } from 'lucide-react';

interface Props {
  eyebrow: string;
  cardTitle: string;
  cardSub: string;
  encaje: number;        // 0–100
  action: string;        // acción explícita (no swipe)
  ActionIcon: LucideIcon;
}

/*
 * Mini-visual de la decisión evaluada: una tarjeta estática con el encaje (barra + %)
 * y una acción explícita. Sin swipe ni gesto: se evalúa y se decide. Solo ilustrativo.
 */
export function EvalCardMini({ eyebrow, cardTitle, cardSub, encaje, action, ActionIcon }: Props) {
  return (
    <div className="w-[152px]" aria-hidden>
      <div className="overflow-hidden rounded-lg border border-line bg-paper-raised shadow-card">
        <div className="bg-navy px-2.5 py-1.5 text-white">
          <p className="font-mono text-[0.48rem] leading-tight tracking-wide text-navy-100">{eyebrow}</p>
          <p className="text-[0.68rem] font-semibold leading-tight">{cardTitle}</p>
        </div>
        <div className="px-2.5 py-1.5">
          <p className="text-[0.56rem] leading-tight text-ink-soft">{cardSub}</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-sunk">
              <div className="h-full rounded-full bg-impact" style={{ width: `${encaje}%` }} />
            </div>
            <span className="font-mono text-[0.56rem] font-semibold text-impact-600">{encaje}%</span>
          </div>
          <p className="mt-0.5 text-[0.5rem] leading-tight text-ink-muted">encaje</p>
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-center gap-1 rounded-lg border border-impact/30 bg-impact-50 py-1 text-[0.6rem] font-semibold text-impact-600">
        <ActionIcon size={11} strokeWidth={2.5} aria-hidden /> {action}
      </div>
    </div>
  );
}
