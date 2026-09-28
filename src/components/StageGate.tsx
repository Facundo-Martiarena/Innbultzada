import { Check, DoorOpen, X } from 'lucide-react';

export interface GateCriterion { label: string; met: boolean }

export function StageGate({ from, to, criteria, note }: { from: string; to: string; criteria: GateCriterion[]; note?: string }) {
  const passed = criteria.every((c) => c.met);
  return (
    <section className={`rounded-xl2 border-2 p-5 ${passed ? 'border-impact bg-impact-50' : 'border-dashed border-navy-300 bg-paper-raised'}`} aria-label={`Hito de paso de ${from} a ${to}`}>
      <div className="flex items-center gap-2">
        <DoorOpen size={18} className={passed ? 'text-impact-600' : 'text-navy'} aria-hidden />
        <p className="font-mono text-xs font-semibold tracking-wider text-navy">STAGE GATE · {from} → {to}</p>
      </div>
      <ul className="mt-3 grid gap-2">
        {criteria.map((c) => (
          <li key={c.label} className="flex items-start gap-2 text-sm">
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${c.met ? 'bg-impact text-white' : 'bg-paper-sunk text-ink-muted'}`}>
              {c.met ? <Check size={12} strokeWidth={3} aria-hidden /> : <X size={12} strokeWidth={3} aria-hidden />}
            </span>
            <span className={c.met ? 'text-ink' : 'text-ink-muted'}>{c.label}<span className="sr-only">{c.met ? ' (cumplido)' : ' (no cumplido)'}</span></span>
          </li>
        ))}
      </ul>
      <p className={`mt-3 text-sm font-semibold ${passed ? 'text-impact-600' : 'text-ink-muted'}`}>
        {passed ? 'Hito superado: el proyecto puede avanzar.' : note ?? 'Se avanza con evidencias, no por calendario.'}
      </p>
    </section>
  );
}
