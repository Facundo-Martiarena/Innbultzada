import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { Passport } from '../components/Passport';
import { ProgramTimeline } from '../components/ProgramTimeline';
import { StageGate } from '../components/StageGate';
import { VentureTeam } from '../components/VentureTeam';
import { DemoBadge } from '../components/primitives';
import { useRouteChallenge } from '../lib/useRouteChallenge';

/* Mes 1: alta como proveedor y revisión de seguridad y cumplimiento (ficha del programa). */
const ONBOARDING = [
  { id: 'proveedor', label: 'Alta como proveedor de LABORAL Kutxa', note: 'Contrato de piloto pagado de 30.000 € · sin equity' },
  { id: 'dora', label: 'Revisión de seguridad · externalización y DORA', note: 'Proveedor tecnológico de una entidad financiera' },
  { id: 'rgpd', label: 'RGPD: datos anonimizados o sintéticos', note: 'Acceso al entorno de pruebas' },
  { id: 'pi', label: 'Acuerdo previo de propiedad intelectual', note: 'Sobre lo que se co-cree en el piloto' },
  { id: 'licencia', label: 'Licencia Banco de España / CNMV', note: 'Solo si presta un servicio financiero regulado · vía sandbox' },
];

export default function Project() {
  const { challenge: c, journey: j, team, reached } = useRouteChallenge(2);
  const [done, setDone] = useState<string[]>(['proveedor', 'dora', 'rgpd', 'pi']);
  if (!c || !j) return <Navigate to="/startup/retos" replace />;
  const required = ONBOARDING.filter((o) => o.id !== 'licencia');
  const ok = required.every((o) => done.includes(o.id));

  return (
    <>
      <PageHeader
        stage="match"
        title={<>Arranca el programa: <span className="text-magenta">{j.ventureName}</span></>}
        lead={<>“{j.valueProp}”</>}
        aside={<div className="flex flex-col items-end gap-2"><DemoBadge label="Ejemplo ficticio" /><span className="text-xs text-ink-muted">Nombre de la solución ilustrativo</span></div>}
      />

      <div className="mb-6"><ProgramTimeline current="alta" /></div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 grid content-start gap-5 max-lg:col-span-12">
          <VentureTeam team={team} ownerRole={c.owner.role} />
        </div>

        <div className="col-span-8 grid content-start gap-5 max-lg:col-span-12">
          <section className="card p-6" aria-labelledby="onb">
            <h2 id="onb" className="flex items-center gap-2 text-lg font-semibold"><ShieldCheck size={19} className="text-magenta" aria-hidden />Mes 1 · Alta como proveedor y revisión de seguridad</h2>
            <p className="text-sm text-ink-muted">Viabilidad legal <strong className="text-impact-600">alta</strong>, a revisar con Cumplimiento.</p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {ONBOARDING.map((o) => {
                const on = done.includes(o.id);
                const optional = o.id === 'licencia';
                return (
                  <li key={o.id}>
                    <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${on ? 'border-impact/40 bg-impact-50' : optional ? 'border-dashed border-line' : 'border-line'}`}>
                      <input type="checkbox" className="mt-1 h-4 w-4 accent-[rgb(var(--green))]" checked={on}
                        onChange={() => setDone((d) => (on ? d.filter((x) => x !== o.id) : [...d, o.id]))} />
                      <span>
                        <span className="block text-sm font-semibold text-navy">{o.label}</span>
                        <span className="block text-xs text-ink-muted">{optional && !on ? 'No aplica en este reto · ' : ''}{o.note}</span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>

          <StageGate
            from="ALTA" to="PILOTO"
            criteria={[
              { label: 'Startup elegida en el pitch final', met: team.length > 2 },
              ...required.map((o) => ({ label: o.label, met: done.includes(o.id) })),
            ]}
            note="Completa el alta y la revisión de seguridad para empezar el piloto."
          />
        </div>

        <div className="col-span-12">
          <Passport reached={reached} ventureName={j.ventureName} />
        </div>
      </div>

      <FlowNav step="proyecto" nextLabel="Definir hipótesis del piloto" nextDisabled={!ok} disabledHint="Completa el mes 1." />
    </>
  );
}
