import { Archive, Gavel, Microscope } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { ActorBadge } from '../components/ActorBadge';
import { CapabilityMatch } from '../components/CapabilityMatch';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { DemoBadge, Reveal } from '../components/primitives';
import { applicantById } from '../data/applicants';
import { CRITERIA, applicationsFor, coverage, evaluate } from '../lib/match';
import { useRouteChallenge } from '../lib/useRouteChallenge';
import { MAX_SELECTED, MAX_SHORTLIST } from '../state/DemoContext';

const JURY = ['Innovación y Open Business', 'Área dueña del reto', 'Riesgos y Cumplimiento', 'Tecnología y Seguridad'];

export default function Evaluation() {
  const { challenge: c, shortlist, setShortlist, selected, toggleSelected, setTeam } = useRouteChallenge(1);

  // Si se entra directamente, se completa la shortlist con las 5 más compatibles.
  useEffect(() => {
    if (c && shortlist.length < MAX_SHORTLIST) {
      const best = applicationsFor(c).sort((a, b) => b.score - a.score).map((a) => a.actor.id);
      setShortlist([...shortlist, ...best.filter((id) => !shortlist.includes(id))].slice(0, MAX_SHORTLIST));
    }
  }, [c?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const rows = useMemo(() => (c ? shortlist.map((id) => ({ a: applicantById(id)!, ...evaluate(c, applicantById(id)!) }))
    .sort((x, y) => y.total - x.total) : []), [c, shortlist]);
  const matches = useMemo(() => rows.map((r) => r.match), [rows]);
  if (!c) return <Navigate to="/startup/retos" replace />;

  const cov = coverage(c, selected);
  const backlog = rows.filter((r) => !selected.includes(r.a.id));
  const chosen = rows.filter((r) => selected.includes(r.a.id));

  return (
    <>
      <PageHeader
        stage="match"
        title={<>8 · Pitch final tipo «Shark Tank»: <span className="text-magenta">se eligen 1–2</span></>}
        lead="Las 5 preseleccionadas presentan ante el jurado, que puntúa la rúbrica de las bases. Se eligen 1 o 2 para impulsar con un piloto pagado; las otras 3 pasan al pool de empresas solución."
        aside={<DemoBadge />}
      />

      <section className="mb-6 flex flex-wrap items-center gap-3 rounded-xl2 bg-navy px-6 py-4 text-white" aria-label="Jurado del pitch final">
        <Gavel size={20} className="text-opportunity" aria-hidden />
        <span className="font-semibold">Jurado</span>
        {JURY.map((j) => <span key={j} className="chip bg-white/10 text-white ring-1 ring-white/20">{j}</span>)}
        <span className="ml-auto text-sm text-navy-100">Cada startup: pitch + preguntas</span>
      </section>

      <div className="card p-8">
        <CapabilityMatch challenge={c} matches={matches} team={selected} covered={cov.covered} onToggle={toggleSelected}
          labels={{ on: 'Elegida', off: 'Elegir', right: `5 preseleccionadas · elige hasta ${MAX_SELECTED}` }} />
      </div>

      <Reveal className="mt-6" summary="Rúbrica completa · puntuación por criterio de cada finalista">
        <div className="-mx-5 -my-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-paper-sunk text-xs text-ink-muted">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">Finalista</th>
              {CRITERIA.map((k) => <th key={k.id} scope="col" className="px-3 py-3 font-semibold">{k.label} <span className="font-mono">{k.weight}%</span></th>)}
              <th scope="col" className="px-3 py-3 font-semibold">Total</th>
              <th scope="col" className="px-5 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const sel = selected.includes(r.a.id);
              return (
                <tr key={r.a.id} className={`border-t border-line ${sel ? 'bg-magenta-50/60' : ''}`}>
                  <th scope="row" className="px-5 py-3 font-semibold text-navy">{r.a.name}</th>
                  {CRITERIA.map((k) => (
                    <td key={k.id} className="px-3 py-3">
                      <span className="flex items-center gap-1" aria-label={`${r.scores[k.id]} de 5`}>
                        {[1, 2, 3, 4, 5].map((d) => <span key={d} aria-hidden className={`h-2 w-4 rounded-full ${d <= r.scores[k.id] ? 'bg-navy' : 'bg-paper-sunk'}`} />)}
                      </span>
                    </td>
                  ))}
                  <td className="px-3 py-3 font-display text-lg font-semibold text-navy">{r.total}</td>
                  <td className="px-5 py-3">
                    <span className={`chip ${sel ? 'bg-magenta text-white' : 'bg-paper-sunk text-ink-soft'}`}>
                      {sel ? <><Microscope size={12} aria-hidden />Elegida · piloto</> : <><Archive size={12} aria-hidden />Pool</>}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </Reveal>

      <div className="mt-6 grid grid-cols-2 gap-5" aria-live="polite">
        <section className="rounded-xl2 border-2 border-magenta bg-paper-raised p-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><Microscope size={18} className="text-magenta" aria-hidden />Elegidas para impulsar <span className="font-mono text-sm text-ink-muted">{chosen.length}/{MAX_SELECTED}</span></h3>
          <p className="text-sm text-ink-muted">Contrato de piloto pagado de 30.000 € cada una, sin equity. Programa de 6 meses.</p>
          <ul className="mt-3 grid gap-2">
            {chosen.length === 0 && <li className="rounded-xl border-2 border-dashed border-line p-4 text-sm text-ink-muted">Elige 1 o 2 finalistas arriba.</li>}
            {chosen.map((r) => <li key={r.a.id} className="rounded-xl bg-magenta-50 p-3"><ActorBadge actor={r.a} size="sm" /></li>)}
          </ul>
        </section>
        <section className="rounded-xl2 border-2 border-dashed border-navy-300 bg-paper-raised p-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold"><Archive size={18} className="text-navy" aria-hidden />Pool de empresas solución <span className="font-mono text-sm text-ink-muted">{backlog.length}</span></h3>
          <p className="text-sm text-ink-muted">No avanzan en este reto, pero quedan en el backlog para futuros retos o como alternativa si el piloto no funciona.</p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {backlog.map((r) => <li key={r.a.id} className="rounded-xl bg-paper-sunk p-3"><ActorBadge actor={r.a} size="sm" /></li>)}
          </ul>
        </section>
      </div>

      <FlowNav step="evaluacion" nextLabel="Arrancar el programa" nextDisabled={selected.length === 0}
        disabledHint="Elige 1 o 2 startups."
        onNext={() => setTeam(['lk', ...selected, 'intra'])} />
    </>
  );
}
