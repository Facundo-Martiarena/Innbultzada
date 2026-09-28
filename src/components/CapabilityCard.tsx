import { Check } from 'lucide-react';
import { capabilityById } from '../data/model';
import type { CapabilityId } from '../data/types';
import { CAPABILITY_ICON, STROKE } from '../lib/icons';

export function CapabilityCard({ id, covered, compact = false, active = false }: { id: CapabilityId; covered?: boolean; compact?: boolean; active?: boolean }) {
  const cap = capabilityById(id);
  const Icon = CAPABILITY_ICON[id];
  return (
    <div className={`flex items-center gap-3 rounded-2xl border bg-paper-raised transition ${compact ? 'px-3 py-2' : 'p-4'} ${active ? 'border-magenta shadow-lift' : covered ? 'border-impact/40' : 'border-line'}`}>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${covered ? 'bg-impact-50 text-impact-600' : 'bg-navy-50 text-navy'}`}>
        <Icon size={18} strokeWidth={STROKE} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-tight text-navy">{cap.name}</span>
        {!compact && <span className="block text-xs text-ink-muted">{cap.short}</span>}
      </span>
      {covered !== undefined && (
        <span className={`flex items-center gap-1 text-xs font-semibold ${covered ? 'text-impact-600' : 'text-ink-muted'}`}>
          {covered ? <><Check size={14} strokeWidth={3} aria-hidden />Cubierta</> : 'Sin cubrir'}
        </span>
      )}
    </div>
  );
}
