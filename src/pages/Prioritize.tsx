import { Check, Gauge, Megaphone, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { DemoBadge } from '../components/primitives';
import { CHALLENGES } from '../data/challenges';
import { quadrant, type Quadrant } from '../data/diagnostic';
import type { Challenge } from '../data/types';
import { useDemo } from '../state/DemoContext';

/** Puntuación de prioridad (0–100): impacto 40%, urgencia 30%, alineación 30%. Dato demostrativo. */
export const priorityScore = (c: Challenge) =>
  Math.round(((c.scores.impacto * 0.4 + c.scores.urgencia * 0.3 + c.scores.alineacion * 0.3) / 5) * 100);

/** Impacto y viabilidad del reto (0–100), derivados de sus scores 1–5. */
const impactOf = (c: Challenge) => c.scores.impacto * 20;
const viabilityOf = (c: Challenge) => c.scores.alineacion * 20;

export const DEPT_VOTES: Record<string, number> = {
  'tesoreria-pymes': 9, 'relevo-generacional': 7, 'mayores-digital': 7, 'huella-carbono': 5, 'seguro-clima': 4, 'prevencion-riesgos': 3,
};
export const SECTOR: Record<string, string> = {
  'tesoreria-pymes': 'Banca · Financiación', 'relevo-generacional': 'Banca · Empresas', 'mayores-digital': 'Banca · Canales',
  'huella-carbono': 'Sostenibilidad', 'seguro-clima': 'Seguros', 'prevencion-riesgos': 'Seguros · Riesgos',
};

const QUAD_TONE: Record<Quadrant, string> = {
  'Prioridad': 'bg-magenta text-white', 'Investigar': 'bg-navy text-white', 'Quick win': 'bg-impact text-white', 'Descartar': 'bg-paper-sunk text-ink-muted',
};

// Geometría: x = Viabilidad, y = Impacto (0–100)
const W = 440, H = 400, PAD = 48;
const px = (v: number) => PAD + (v / 100) * (W - PAD * 2);
const py = (v: number) => H - PAD - (v / 100) * (H - PAD * 2);
const midX = px(50), midY = py(50);

export default function Prioritize() {
  const { prioritized, togglePrioritized, challengeId, setChallengeId, myVotes, toggleVote, myDiagnosis } = useDemo();
  const [hover, setHover] = useState<string | null>(null);
  const ranked = [...CHALLENGES].sort((a, b) => priorityScore(b) - priorityScore(a));
  const active = hover ?? challengeId;

  return (
    <>
      <PageHeader
        stage="discover"
        title={<>2 · Plantilla de votación: <span className="text-magenta">identificar, clasificar y priorizar</span></>}
        lead="Cada necesidad diagnosticada se ubica en la matriz Impacto × Viabilidad. Los departamentos votan y el equipo de innovación prioriza lo que va a la convocatoria."
        aside={<DemoBadge />}
      />

      <div className="grid grid-cols-12 gap-6">
        <section className="card col-span-5 p-6 max-lg:col-span-12" aria-label="Matriz de decisión">
          <p className="font-semibold text-navy">Matriz de decisión · Impacto × Viabilidad</p>
          <p className="text-sm text-ink-muted">Cada punto es una necesidad. Tu diagnóstico aparece en magenta.</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" role="img" aria-label="Necesidades por impacto y viabilidad">
            {/* Cuadrantes */}
            <rect x={midX} y={PAD} width={W - PAD - midX} height={midY - PAD} fill="rgb(var(--green-50))" />
            <rect x={PAD} y={PAD} width={midX - PAD} height={midY - PAD} fill="rgb(var(--navy-50))" />
            <rect x={midX} y={midY} width={W - PAD - midX} height={H - PAD - midY} fill="rgb(var(--yellow-100))" />
            <rect x={PAD} y={midY} width={midX - PAD} height={H - PAD - midY} fill="rgb(var(--paper-sunk))" />
            <text x={W - PAD - 6} y={PAD + 15} textAnchor="end" fontSize={10} fontWeight={700} fill="rgb(var(--green-600))">PRIORIDAD</text>
            <text x={PAD + 6} y={PAD + 15} textAnchor="start" fontSize={10} fontWeight={700} fill="rgb(var(--navy))">INVESTIGAR</text>
            <text x={W - PAD - 6} y={H - PAD - 6} textAnchor="end" fontSize={10} fontWeight={700} fill="rgb(var(--yellow-600))">QUICK WIN</text>
            <text x={PAD + 6} y={H - PAD - 6} textAnchor="start" fontSize={10} fontWeight={700} fill="rgb(var(--ink-muted))">DESCARTAR</text>
            {/* Ejes */}
            <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="rgb(var(--line))" />
            <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="rgb(var(--line))" />
            <text x={W / 2} y={H - 12} textAnchor="middle" fontSize={12} fill="rgb(var(--ink-muted))">Viabilidad →</text>
            <text x={14} y={H / 2} textAnchor="middle" fontSize={12} fill="rgb(var(--ink-muted))" transform={`rotate(-90 14 ${H / 2})`}>Impacto →</text>
            {/* Retos */}
            {CHALLENGES.map((c) => {
              const cx = px(viabilityOf(c)), cy = py(impactOf(c));
              const on = prioritized.includes(c.id), hi = active === c.id;
              return (
                <g key={c.id} onMouseEnter={() => setHover(c.id)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }} onClick={() => togglePrioritized(c.id)}>
                  <circle cx={cx} cy={cy} r={13} fill={on ? 'rgb(var(--magenta))' : 'rgb(var(--navy-300))'} fillOpacity={hi ? 0.95 : 0.7} stroke={hi ? 'rgb(var(--navy))' : 'white'} strokeWidth={hi ? 3 : 2} style={{ transition: 'all .2s' }} />
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="white">{c.code.slice(3)}</text>
                </g>
              );
            })}
            {/* Tu diagnóstico */}
            {myDiagnosis && (
              <g>
                <circle cx={px(myDiagnosis.viability)} cy={py(myDiagnosis.impact)} r={11} fill="rgb(var(--magenta))" stroke="white" strokeWidth={3} />
                <circle cx={px(myDiagnosis.viability)} cy={py(myDiagnosis.impact)} r={18} fill="none" stroke="rgb(var(--magenta))" strokeWidth={1.5} opacity={0.5} />
                <text x={px(myDiagnosis.viability)} y={py(myDiagnosis.impact) - 22} textAnchor="middle" fontSize={10} fontWeight={700} fill="rgb(var(--magenta))">Tu diagnóstico</text>
              </g>
            )}
          </svg>
        </section>

        <section className="col-span-7 max-lg:col-span-12" aria-labelledby="rank">
          <div className="mb-3 flex items-end justify-between">
            <h2 id="rank" className="text-lg font-semibold">Ranking de necesidades</h2>
            <p className="flex items-center gap-1.5 text-sm font-semibold text-magenta"><Megaphone size={15} aria-hidden />{prioritized.length} a la próxima convocatoria</p>
          </div>
          <ol className="grid gap-2.5">
            {/* Tu diagnóstico recién enviado */}
            {myDiagnosis && (
              <li className="flex flex-wrap items-center gap-x-3 gap-y-3 rounded-2xl border-2 border-magenta bg-magenta-50 p-4">
                <span className="w-6"><Gauge size={18} className="text-magenta" aria-hidden /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-snug text-navy">{myDiagnosis.name} <span className="chip ml-1 bg-magenta text-white">Tu diagnóstico</span></p>
                  <p className="mt-1 text-xs text-ink-muted">{myDiagnosis.area} · Impacto {myDiagnosis.impact} · Viabilidad {myDiagnosis.viability}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 shrink-0 text-center">
                    <span className="block font-display text-2xl font-semibold leading-none text-magenta">{myDiagnosis.impact}</span>
                    <span className="mt-0.5 block font-mono text-[0.58rem] uppercase tracking-wide text-ink-muted">impact score</span>
                  </div>
                  <span className={`chip ${QUAD_TONE[quadrant(myDiagnosis.impact, myDiagnosis.viability)]}`}>{quadrant(myDiagnosis.impact, myDiagnosis.viability)}</span>
                </div>
              </li>
            )}
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
