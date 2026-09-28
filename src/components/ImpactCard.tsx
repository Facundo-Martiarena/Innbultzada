import { Building, Briefcase, Home, Lightbulb, MapPinned, Sprout, Users2 } from 'lucide-react';

const ICONS = { empresas: Sprout, negocios: Briefcase, empleo: Users2, arraigo: Home, intercoop: Building, innovacion: Lightbulb, territorio: MapPinned } as const;

export function ImpactCard({ id, label, kpi, index = 0 }: { id: keyof typeof ICONS; label: string; kpi: string; index?: number }) {
  const Icon = ICONS[id];
  return (
    <div className="card flex items-start gap-3 p-4 animate-rise" style={{ animationDelay: `${index * 70}ms` }}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-impact-50 text-impact-600"><Icon size={19} strokeWidth={1.75} aria-hidden /></span>
      <div>
        <p className="font-semibold leading-tight text-navy">{label}</p>
        <p className="mt-0.5 text-xs text-ink-muted">KPI propuesto: {kpi}</p>
      </div>
    </div>
  );
}
