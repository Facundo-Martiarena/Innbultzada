import { Users } from 'lucide-react';
import { actorById } from '../data/actors';
import { ActorBadge } from './ActorBadge';

export function VentureTeam({ team, ownerRole }: { team: string[]; ownerRole: string }) {
  return (
    <section className="card p-6" aria-labelledby="team-title">
      <div className="flex items-center gap-2">
        <Users size={18} className="text-magenta" aria-hidden />
        <h3 id="team-title" className="text-lg font-semibold">Venture Team</h3>
      </div>
      <p className="mt-1 text-sm text-ink-muted">Equipo multiactor formado a partir del match. Roles ilustrativos.</p>
      <ul className="mt-5 grid gap-3">
        <li className="flex items-center gap-3 rounded-2xl bg-opportunity-100 p-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-opportunity font-mono text-xs font-bold text-navy">CO</span>
          <span>
            <span className="block font-semibold leading-tight text-navy">Challenge Owner</span>
            <span className="block text-xs text-ink-soft">{ownerRole} · valida el problema y el éxito</span>
          </span>
        </li>
        {team.map((id) => (
          <li key={id} className="rounded-2xl border border-line p-3">
            <ActorBadge actor={actorById(id)} showRole />
          </li>
        ))}
      </ul>
    </section>
  );
}
