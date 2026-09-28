import { Bell, Check, CircleDashed, Lightbulb, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { DemoBadge } from '../components/primitives';
import { challengeById } from '../data/challenges';
import { ACCELERATORS } from '../data/ecosystem';
import { useDemo } from '../state/DemoContext';
import { DEMO_STARTUP } from './Explore';

/* Seguimiento de la startup: estado de su candidatura y de su idea. */
export default function Tracking() {
  const { challengeId, applied, shortlist, selected, idea, accelerator } = useDemo();
  const nav = useNavigate();
  const c = challengeById(challengeId)!;
  const acc = ACCELERATORS.find((a) => a.id === accelerator);

  const stageIdx = !applied ? -1 : selected.includes(DEMO_STARTUP) ? 5 : shortlist.includes(DEMO_STARTUP) ? 3 : 1;
  const STEPS = ['Recibida', 'Primer filtro', 'Preseleccionada (5)', 'Pitch final', 'Elegida (1–2)', 'Programa de 6 meses'];

  return (
    <>
      <PageHeader
        stage="match"
        title={<>6 · La startup <span className="text-magenta">sigue su candidatura</span></>}
        lead="Cada startup ve en qué punto está su candidatura y su idea, y recibe avisos del equipo de innovación de LABORAL Kutxa."
        aside={<DemoBadge label="Ejemplo ficticio" />}
      />

      <div className="grid grid-cols-12 gap-6">
        <section className="card col-span-8 p-6 max-lg:col-span-12" aria-labelledby="cand">
          <p className="eyebrow">Mi candidatura</p>
          <h2 id="cand" className="mt-1 text-xl font-semibold">{c.title}</h2>
          <p className="text-sm text-ink-muted">{c.code} · Piloto pagado de 30.000 € · sin equity{acc ? ` · recomendada por ${acc.name}` : ''}</p>
          <ol className="mt-6 grid grid-cols-6 gap-2">
            {STEPS.map((s, i) => {
              const st = i < stageIdx ? 'done' : i === stageIdx ? 'current' : 'pending';
              return (
                <li key={s} aria-current={st === 'current' ? 'step' : undefined}
                  className={`rounded-xl p-3 text-sm ${st === 'done' ? 'bg-impact-50 text-impact-600' : st === 'current' ? 'bg-magenta text-white shadow-lift' : 'border border-dashed border-line text-ink-muted'}`}>
                  <span className="flex items-center gap-1 text-xs font-semibold">
                    {st === 'done' ? <Check size={13} strokeWidth={3} aria-hidden /> : st === 'current' ? <LoaderCircle size={13} aria-hidden /> : <CircleDashed size={13} aria-hidden />}
                    {st === 'done' ? 'Hecho' : st === 'current' ? 'En curso' : 'Pendiente'}
                  </span>
                  <span className="mt-1 block font-semibold leading-tight">{s}</span>
                </li>
              );
            })}
          </ol>
          {!applied && <p className="mt-4 text-sm text-ink-muted">Todavía no has enviado ninguna candidatura.</p>}
        </section>

        <aside className="col-span-4 grid content-start gap-4 max-lg:col-span-12">
          <div className="card p-5">
            <p className="flex items-center gap-2 font-semibold text-navy"><Bell size={17} className="text-magenta" aria-hidden />Avisos</p>
            <ul className="mt-2 grid gap-2 text-sm text-ink-soft">
              {applied && <li className="rounded-lg bg-paper-sunk/70 p-2.5">Candidatura recibida por el equipo de innovación.</li>}
              <li className="rounded-lg bg-paper-sunk/70 p-2.5">El primer filtro se resuelve al cierre ({c.deadline}).</li>
              <li className="rounded-lg bg-paper-sunk/70 p-2.5">Las 5 preseleccionadas serán convocadas al pitch final.</li>
            </ul>
          </div>
          <div className={`rounded-xl2 p-5 ${idea ? 'bg-magenta-50 ring-1 ring-magenta/30' : 'border-2 border-dashed border-line'}`}>
            <p className="flex items-center gap-2 font-semibold text-navy"><Lightbulb size={17} className="text-magenta" aria-hidden />Mi idea</p>
            {idea ? (
              <>
                <p className="mt-1 text-sm font-semibold text-navy">{idea.title}</p>
                <p className="text-xs text-ink-muted">{idea.sector} · {idea.area}</p>
                <span className="chip mt-2 bg-magenta text-white">{idea.status} · en bandeja de innovación</span>
              </>
            ) : (
              <button type="button" className="mt-2 text-sm font-semibold text-magenta hover:underline" onClick={() => nav('/startup/idea')}>Proponer una idea sin reto</button>
            )}
          </div>
        </aside>
      </div>

      <FlowNav step="seguimiento" nextLabel="Bandeja del equipo de innovación" />
    </>
  );
}
