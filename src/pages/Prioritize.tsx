import { Check, Megaphone, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { DemoBadge } from '../components/primitives';
import { CHALLENGES } from '../data/challenges';
import type { Challenge } from '../data/types';
import { useDemo } from '../state/DemoContext';

/** Puntuación de prioridad (0–100): impacto 40%, urgencia 30%, alineación 30%. Dato demostrativo. */
export const priorityScore = (c: Challenge) =>
  Math.round(((c.scores.impacto * 0.4 + c.scores.urgencia * 0.3 + c.scores.alineacion * 0.3) / 5) * 100);

/** Votos de los departamentos en la plantilla de votación (dato demostrativo). */
export const DEPT_VOTES: Record<string, number> = {
  'tesoreria-pymes': 9, 'relevo-generacional': 7, 'mayores-digital': 7, 'huella-carbono': 5, 'seguro-clima': 4, 'prevencion-riesgos': 3,
};
/** Clasificación por ámbito de servicios financieros. */
export const SECTOR: Record<string, string> = {
  'tesoreria-pymes': 'Banca · Financiación', 'relevo-generacional': 'Banca · Empresas', 'mayores-digital': 'Banca · Canales',
  'huella-carbono': 'Sostenibilidad', 'seguro-clima': 'Seguros', 'prevencion-riesgos': 'Seguros · Riesgos',
};

const W = 440, H = 400, PAD = 48;
const px = (v: number) => PAD + ((v - 1) / 4) * (W - PAD * 2);
const py = (v: number) => H - PAD - ((v - 1) / 4) * (H - PAD * 2);

export default function Prioritize() {
  const { prioritized, togglePrioritized, challengeId, setChallengeId, myVotes, toggleVote } = useDemo();
  const [hover, setHover] = useState<string | null>(null);
  const ranked = [...CHALLENGES].sort((a, b) => priorityScore(b) - priorityScore(a));
  const active = hover ?? challengeId;

  return (
    <>
      <PageHeader
        stage="discover"
        title={<>2 · Plantilla de votación: <span className="text-magenta">identificar, clasificar y priorizar</span></>}
        lead="Los departamentos votan los retos diagnosticados. El equipo de innovación de LABORAL Kutxa los clasifica por ámbito y los prioriza por impacto, urgencia y alineación; los prioritarios se publican."
        aside={<DemoBadge />}
      />

      <div className="grid grid-cols-12 gap-6">
        <section className="card col-span-5 p-6 max-lg:col-span-12" aria-label="Matriz de priorización">
          <p className="font-semibold text-navy">Matriz impacto × urgencia</p>
          <p className="text-sm text-ink-muted">El tamaño del círculo indica la alineación estratégica.</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" role="img" aria-label="Retos situados por impacto y urgencia">
            <rect x={px(3)} y={py(5)} width={px(5) - px(3)} height={py(3) - py(5)} fill="rgb(var(--green-50))" rx={10} />
            <text x={px(5) - 8} y={py(5) + 18} textAnchor="end" fontSize={11} fontWeight={700} fill="rgb(var(--green-600))">PRIORIZAR</text>
            {[1, 2, 3, 4, 5].map((v) => (
              <g key={v}>
                <line x1={px(v)} x2={px(v)} y1={PAD} y2={H - PAD} stroke="rgb(var(--line))" strokeDasharray="3 5" />
                <line y1={py(v)} y2={py(v)} x1={PAD} x2={W - PAD} stroke="rgb(var(--line))" strokeDasharray="3 5" />
              </g>
            ))}
            <text x={W / 2} y={H - 12} textAnchor="middle" fontSize={12} fill="rgb(var(--ink-muted))">Impacto →</text>
            <text x={14} y={H / 2} textAnchor="middle" fontSize={12} fill="rgb(var(--ink-muted))" transform={`rotate(-90 14 ${H / 2})`}>Urgencia →</text>
            {CHALLENGES.map((c) => {
              // Separar retos con la misma posición para que no se solapen
              const same = CHALLENGES.filter((o) => o.scores.impacto === c.scores.impacto && o.scores.urgencia === c.scores.urgencia);
              const dx = (same.indexOf(c) - (same.length - 1) / 2) * 46;
              const cx = px(c.scores.impacto) + dx, cy = py(c.scores.urgencia);
              const on = prioritized.includes(c.id);
              const hi = active === c.id;
              return (
                <g key={c.id} onMouseEnter={() => setHover(c.id)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }} onClick={() => togglePrioritized(c.id)}>
                  <circle cx={cx} cy={cy} r={8 + c.scores.alineacion * 4}
                    fill={on ? 'rgb(var(--magenta))' : 'rgb(var(--navy-300))'} fillOpacity={hi ? 0.95 : 0.7}
                    stroke={hi ? 'rgb(var(--navy))' : 'white'} strokeWidth={hi ? 3 : 2} style={{ transition: 'all .2s' }} />
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill="white">{c.code.slice(3)}</text>
                </g>
              );
            })}
          </svg>
        </section>

        <section className="col-span-7 max-lg:col-span-12" aria-labelledby="rank">
          <div className="mb-3 flex items-end justify-between">
            <h2 id="rank" className="text-lg font-semibold">Ranking de retos</h2>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-magenta"><Megaphone size={15} aria-hidden />{prioritized.length} a la próxima convocatoria</p>
          </div>
          <ol className="grid gap-2.5">
            {ranked.map((c, i) => {
              const on = prioritized.includes(c.id);
              const score = priorityScore(c);
              return (
                <li key={c.id} onMouseEnter={() => setHover(c.id)} onMouseLeave={() => setHover(null)}
                  className={`flex flex-wrap items-center gap-x-3 gap-y-3 rounded-2xl border bg-paper-raised p-4 transition ${active === c.id ? 'border-navy shadow-lift' : 'border-line'}`}>
                  <span className="w-6 font-mono text-sm font-bold text-ink-muted">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-snug text-navy">{c.title}</p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-ink-muted"><span className="chip bg-navy-50 px-2 py-0.5 text-navy">{SECTOR[c.id]}</span>{c.code}</p>
                  </div>
                  <div className="flex items-center gap-3 max-sm:w-full max-sm:justify-between">
                    <button type="button" aria-pressed={myVotes.includes(c.id)} onClick={() => toggleVote(c.id)} title="Voto del equipo de innovación"
                      className={`flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-sm font-semibold transition ${myVotes.includes(c.id) ? 'bg-impact text-white' : 'bg-paper-sunk text-navy hover:bg-navy-50'}`}>
                      <ThumbsUp size={14} aria-hidden />{DEPT_VOTES[c.id] + (myVotes.includes(c.id) ? 1 : 0)}<span className="sr-only"> votos</span>
                    </button>
                    <div className="w-12 shrink-0 text-center">
                      <span className="block font-display text-2xl font-semibold leading-none text-navy" aria-label={`Puntuación ${score}`}>{score}</span>
                      <span className="mt-0.5 block font-mono text-[0.58rem] uppercase tracking-wide text-ink-muted">prioridad</span>
                    </div>
                    <button type="button" aria-pressed={on} onClick={() => togglePrioritized(c.id)}
                      className={`btn min-h-[40px] w-[9.5rem] px-3 text-sm ${on ? 'bg-magenta text-white' : 'border border-line bg-paper-raised text-navy hover:bg-navy-50'}`}>
                      {on ? <><Check size={15} strokeWidth={3} aria-hidden />Priorizado</> : 'Priorizar'}
                    </button>
                    <button type="button" onClick={() => setChallengeId(c.id)} aria-pressed={challengeId === c.id}
                      className={`text-xs font-semibold underline-offset-2 hover:underline ${challengeId === c.id ? 'text-magenta' : 'text-ink-muted'}`}>
                      {challengeId === c.id ? 'En demo' : 'Seguir'}
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      <FlowNav step="priorizar" nextLabel="Preparar convocatoria"
        nextDisabled={!prioritized.includes(challengeId)} disabledHint="Prioriza el reto que sigue la demo." />
    </>
  );
}
