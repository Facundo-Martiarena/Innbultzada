import type { Actor } from '../data/types';
import { ACTOR_ICON, STROKE } from '../lib/icons';

export function ActorBadge({ actor, size = 'md', showRole = false }: { actor: Actor; size?: 'sm' | 'md'; showRole?: boolean }) {
  const Icon = ACTOR_ICON[actor.type];
  const isLK = actor.id === 'lk';
  return (
    <span className="inline-flex items-center gap-2.5 text-left">
      <span className={`grid shrink-0 place-items-center rounded-xl ${size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'} ${isLK ? 'bg-magenta text-white' : actor.conceptual ? 'bg-navy text-white' : 'bg-opportunity-100 text-navy'}`}>
        <Icon size={size === 'sm' ? 15 : 18} strokeWidth={STROKE} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className={`block font-semibold leading-tight text-navy ${size === 'sm' ? 'text-sm' : ''}`}>{actor.name}</span>
        <span className="block text-xs text-ink-muted">{showRole ? actor.teamRole : actor.typeLabel}</span>
      </span>
    </span>
  );
}
