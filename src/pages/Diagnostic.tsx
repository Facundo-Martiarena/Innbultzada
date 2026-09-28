import { CircleCheck, CircleDashed, ClipboardList, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { DemoBadge } from '../components/primitives';
import { challengeById } from '../data/challenges';
import { DEPARTMENTS, DIAGNOSTIC_TEMPLATE, type Department } from '../data/ecosystem';
import { useDemo } from '../state/DemoContext';

const STATUS_ICON = { 'Diagnóstico enviado': CircleCheck, 'En revisión': LoaderCircle, Pendiente: CircleDashed } as const;
const STATUS_TONE = { 'Diagnóstico enviado': 'text-impact-600', 'En revisión': 'text-magenta-600', Pendiente: 'text-ink-muted' } as const;

/** Respuestas de la plantilla a partir del reto que salió del diagnóstico (demo). */
function answersFor(d: Department): Record<string, string> | null {
  const c = d.challengeId ? challengeById(d.challengeId) : null;
  if (!c) return null;
  return {
    problema: c.problem,
    afectados: c.affectedUser,
    impacto: c.impact.join(' · '),
    urgencia: `${c.scores.urgencia} / 5`,
    datos: c.constraints.join(' · '),
    exito: c.successCriteria.join(' · '),
  };
}

export default function Diagnostic() {
  const { reach } = useDemo();
  const [sel, setSel] = useState(DEPARTMENTS[0].id);
  useEffect(() => { reach(0); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const dept = DEPARTMENTS.find((d) => d.id === sel)!;
  const answers = answersFor(dept);
  const sent = DEPARTMENTS.filter((d) => d.status === 'Diagnóstico enviado').length;

  return (
    <>
      <PageHeader
        stage="discover"
        title={<>1 · Los 12 departamentos de LABORAL Kutxa <span className="text-magenta">diagnostican sus problemas</span></>}
        lead="Cada departamento rellena una plantilla de diagnóstico. Así las necesidades llegan descritas igual y se pueden comparar, clasificar y votar."
        aside={<DemoBadge />}
      />

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-7 max-lg:col-span-12" aria-labelledby="deps">
          <div className="mb-1 flex items-end justify-between">
            <h2 id="deps" className="text-lg font-semibold">Departamentos</h2>
            <p className="text-sm text-ink-muted"><strong className="text-navy">{sent}/12</strong> enviados</p>
          </div>
          <p className="mb-3 text-xs text-ink-muted">Elige uno para ver su plantilla.</p>
          <ul className="grid grid-cols-2 gap-2">
            {DEPARTMENTS.map((d, i) => {
              const Icon = STATUS_ICON[d.status];
              const on = d.id === sel;
              return (
                <li key={d.id} className="animate-rise" style={{ animationDelay: `${i * 25}ms` }}>
                  <button type="button" aria-pressed={on} onClick={() => setSel(d.id)}
                    className={`flex w-full items-center gap-2.5 rounded-xl border bg-paper-raised p-3 text-left transition hover:border-navy-300 ${on ? '!border-magenta ring-2 ring-magenta' : 'border-line'}`}>
                    <Icon size={15} className={`shrink-0 ${STATUS_TONE[d.status]}`} aria-hidden />
                    <span className="min-w-0 flex-1 text-sm font-semibold leading-tight text-navy">{d.name}</span>
                    {d.challengeId && <span className="shrink-0 rounded bg-magenta-50 px-1.5 py-0.5 font-mono text-[0.56rem] font-semibold text-magenta">reto</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="card col-span-5 overflow-hidden max-lg:col-span-12" aria-labelledby="tpl" aria-live="polite">
          <header className="bg-navy px-6 py-4 text-white">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-navy-100"><ClipboardList size={14} aria-hidden />Plantilla de diagnóstico</p>
            <h2 id="tpl" className="font-display text-xl font-semibold text-white">{dept.name}</h2>
          </header>
          <dl className="divide-y divide-line/70 px-6 pb-3 pt-1">
            {DIAGNOSTIC_TEMPLATE.map((f) => (
              <div key={f.id} className="py-2.5">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-wide text-magenta-600">{f.label}</dt>
                <dd className={`mt-0.5 text-sm leading-snug ${answers ? 'text-ink-soft' : 'italic text-ink-muted'}`}>
                  {answers ? answers[f.id] : dept.status === 'Pendiente' ? 'Pendiente de rellenar' : f.hint}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <FlowNav step="diagnostico" nextLabel="Votar y priorizar" />
    </>
  );
}
