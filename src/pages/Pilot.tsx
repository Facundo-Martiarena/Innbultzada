import { Activity, Box, ChevronRight, FlaskRound, Lightbulb, ShieldCheck, Users } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { FlowNav } from '../components/FlowNav';
import { ProgramTimeline } from '../components/ProgramTimeline';
import { PageHeader } from '../components/PageHeader';
import { DemoBadge, MetricCard } from '../components/primitives';
import { CLIENT0_CANDIDATES } from '../data/model';
import { useRouteChallenge } from '../lib/useRouteChallenge';

const PIPE = [
  { Icon: Box, label: 'Proyecto', text: 'MVP del Venture Team' },
  { Icon: ShieldCheck, label: 'Entorno controlado', text: 'Sandbox con datos anonimizados' },
  { Icon: FlaskRound, label: 'Piloto', text: '4 meses · co-creación con el área' },
  { Icon: Users, label: 'Usuarios', text: 'Personas y empresas reales' },
  { Icon: Activity, label: 'Métricas', text: 'Criterios de éxito del brief' },
  { Icon: Lightbulb, label: 'Aprendizaje', text: 'Evidencia para decidir' },
];

export default function Pilot() {
  const { challenge: c, journey: j, client0, setClient0 } = useRouteChallenge(3);
  if (!c || !j) return <Navigate to="/laboral-kutxa/votacion" replace />;
  const chosen = CLIENT0_CANDIDATES.find((x) => x.id === client0)!;

  return (
    <>
      <PageHeader
        stage="pilot"
        title={<>Meses 2–5 · <span className="text-magenta">piloto pagado con Cliente 0</span></>}
        lead="El área de LABORAL Kutxa dueña del reto actúa como primer cliente: contrato de piloto de 30.000 €, co-creación, mentoría de expertos y un entorno de pruebas con datos anonimizados."
      />

      <div className="mb-6"><ProgramTimeline current="piloto" /></div>

      <div className="grid grid-cols-12 gap-5">
        <section className="col-span-5 rounded-xl2 bg-navy p-7 text-white max-lg:col-span-12" aria-labelledby="c0">
          <h2 id="c0" className="text-2xl font-semibold text-white">¿Qué es Cliente 0?</h2>
          <ul className="mt-4 grid gap-3 text-[0.98rem] leading-relaxed text-navy-50">
            <li><strong className="text-opportunity">Es</strong> un primer usuario real que aporta contexto, usuarios, datos y feedback.</li>
            <li><strong className="text-opportunity">Es</strong> un entorno controlado: alcance, duración y riesgos acotados.</li>
            <li><strong className="text-opportunity">Es</strong> un piloto pagado: 30.000 € por startup, sin equity.</li>
            <li><strong className="text-magenta-100">No es</strong> un compromiso de compra: LABORAL Kutxa decide en el mes 6.</li>
            <li><strong className="text-magenta-100">No es</strong> exclusivo: el objetivo es llegar después a clientes externos.</li>
          </ul>
        </section>

        <section className="col-span-7 max-lg:col-span-12" aria-labelledby="c0-cands">
          <h2 id="c0-cands" className="text-lg font-semibold">Posibles Cliente 0 para este reto</h2>
          <p className="text-sm text-ink-muted">Actores conceptuales. Selección ilustrativa, sin compromisos atribuidos.</p>
          <div role="radiogroup" aria-label="Cliente 0" className="mt-3 grid grid-cols-2 gap-3">
            {CLIENT0_CANDIDATES.map((x) => {
              const on = x.id === client0;
              return (
                <label key={x.id} className={`card cursor-pointer p-4 transition hover:shadow-lift has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-magenta ${on ? '!border-magenta ring-2 ring-magenta' : ''}`}>
                  <input type="radio" name="client0" className="sr-only" checked={on} onChange={() => setClient0(x.id)} />
                  <span className="flex items-center justify-between">
                    <span className="font-semibold text-navy">{x.name}</span>
                    <span className={`h-5 w-5 rounded-full border-2 ${on ? 'border-magenta bg-magenta shadow-[inset_0_0_0_3px_white]' : 'border-line'}`} aria-hidden />
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold text-ink-muted">{x.kind}</span>
                </label>
              );
            })}
          </div>
        </section>
      </div>

      {/* Pipeline del piloto */}
      <section className="card mt-6 p-6" aria-label="Cómo funciona un piloto">
        <ol className="flex items-stretch gap-2 max-lg:flex-wrap">
          {PIPE.map(({ Icon, label, text }, i) => (
            <li key={label} className="flex flex-1 items-center gap-2 animate-rise" style={{ animationDelay: `${i * 90}ms` }}>
              <div className={`flex h-full flex-1 flex-col rounded-2xl p-4 ${i === 1 ? 'bg-opportunity-100' : i === 5 ? 'bg-impact-50' : 'bg-navy-50'}`}>
                <Icon size={20} strokeWidth={1.75} className={i === 5 ? 'text-impact-600' : 'text-navy'} aria-hidden />
                <p className="mt-2 font-semibold leading-tight text-navy">{label}</p>
                <p className="mt-0.5 text-xs leading-snug text-ink-soft">{i === 1 ? `${chosen.name}: ${text.toLowerCase()}` : i === 3 ? j.pilot.users : text}</p>
              </div>
              {i < PIPE.length - 1 && <ChevronRight size={18} className="shrink-0 text-navy-300 max-lg:hidden" aria-hidden />}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6" aria-labelledby="metrics">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="metrics" className="text-lg font-semibold">Resultados del piloto · {j.pilot.duration} · {j.pilot.users}</h2>
          <DemoBadge />
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8 grid grid-cols-4 gap-4 max-lg:col-span-12 max-lg:grid-cols-2">
            {j.pilot.metrics.map((m, i) => <MetricCard key={m.label} label={m.label} value={m.value} hint={m.hint} tone={i < 3 ? 'green' : 'navy'} />)}
          </div>
          <div className="card col-span-4 p-5 max-lg:col-span-12">
            <p className="flex items-center gap-2 font-semibold text-navy"><Lightbulb size={17} className="text-impact-600" aria-hidden />Aprendizajes</p>
            <ul className="mt-2 grid gap-2 text-sm leading-snug text-ink-soft">
              {j.pilot.learnings.map((l) => <li key={l} className="flex gap-2"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-impact" />{l}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <FlowNav step="piloto" nextLabel="Evaluar y decidir" />
    </>
  );
}
