import { ChevronDown, Info } from 'lucide-react';
import type { ReactNode } from 'react';

/* Divulgación progresiva: esconde lo secundario tras un resumen. details/summary nativo, accesible. */
export function Reveal({ summary, children, defaultOpen = false, className = '' }: { summary: ReactNode; children: ReactNode; defaultOpen?: boolean; className?: string }) {
  return (
    <details className={`group card overflow-hidden ${className}`} {...(defaultOpen ? { open: true } : {})}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 text-sm font-semibold text-navy [&::-webkit-details-marker]:hidden">
        {summary}
        <ChevronDown size={16} className="shrink-0 text-ink-muted transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="border-t border-line px-5 py-4">{children}</div>
    </details>
  );
}

/* Etiqueta obligatoria para contenido de demostración. */
export function DemoBadge({ label = 'Dato demostrativo', className = '' }: { label?: 'Dato demostrativo' | 'Ejemplo ficticio' | 'Reto Demo' | 'Actor conceptual'; className?: string }) {
  return (
    <span className={`chip border border-dashed border-navy-300 bg-paper-raised text-navy-500 ${className}`}>
      <Info size={12} strokeWidth={2} aria-hidden />
      {label}
    </span>
  );
}

export function SectionTitle({ eyebrow, title, children, action }: { eyebrow?: string; title: ReactNode; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="max-w-3xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="text-2xl font-semibold present:text-3xl">{title}</h2>
        {children && <p className="mt-2 text-ink-soft leading-relaxed">{children}</p>}
      </div>
      {action}
    </div>
  );
}

/* Anillo de compatibilidad: el valor también se muestra como texto. */
export function CompatibilityRing({ value, size = 56, label = 'compatibilidad' }: { value: number; size?: number; label?: string }) {
  const r = size / 2 - 5;
  const c = 2 * Math.PI * r;
  const tone = value >= 80 ? 'rgb(var(--green))' : value >= 60 ? 'rgb(var(--navy))' : 'rgb(var(--yellow-600))';
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`${value}% de ${label}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--paper-sunk))" strokeWidth={5} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone} strokeWidth={5} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)}
          style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1)' }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-mono text-[0.8rem] font-semibold text-navy">{value}</span>
    </div>
  );
}

export function MetricCard({ label, value, hint, tone = 'navy' }: { label: string; value: string; hint?: string; tone?: 'navy' | 'green' | 'magenta' }) {
  const color = tone === 'green' ? 'text-impact-600' : tone === 'magenta' ? 'text-magenta' : 'text-navy';
  return (
    <div className="card p-5">
      <p className="text-sm font-medium text-ink-muted">{label}</p>
      <p className={`mt-2 font-display text-4xl font-semibold tracking-tight ${color}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

export function PriorityPill({ p }: { p: 'Alta' | 'Media' | 'Baja' }) {
  const bars = p === 'Alta' ? 3 : p === 'Media' ? 2 : 1;
  return (
    <span className="chip bg-paper-sunk text-ink-soft">
      <span aria-hidden className="flex items-end gap-[2px]">
        {[1, 2, 3].map((b) => (
          <span key={b} className={`w-[3px] rounded-sm ${b <= bars ? 'bg-magenta' : 'bg-navy-100'}`} style={{ height: 4 + b * 3 }} />
        ))}
      </span>
      Prioridad {p.toLowerCase()}
    </span>
  );
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`card p-6 ${className}`}>{children}</section>;
}
