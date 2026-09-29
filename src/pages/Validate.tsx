import { CircleStop, CornerUpLeft, Rocket } from 'lucide-react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { DecisionCard } from '../components/DecisionCard';
import { EvidenceCard } from '../components/EvidenceCard';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { StageGate } from '../components/StageGate';
import { DemoBadge } from '../components/primitives';
import { useRouteChallenge } from '../lib/useRouteChallenge';

const OPTIONS = [
  { id: 'go', code: 'GO', title: 'Avanzar a piloto', Icon: Rocket, tone: 'green', summary: 'La evidencia supera los criterios en las tres lentes.' },
  { id: 'pivot', code: 'PIVOT', title: 'Reformular', Icon: CornerUpLeft, tone: 'yellow', summary: 'Hay aprendizaje valioso, pero una hipótesis clave no se sostiene: se reformula y se vuelve a validar.' },
  { id: 'stop', code: 'STOP', title: 'Parar', Icon: CircleStop, tone: 'magenta', summary: 'Las hipótesis no se validan. Se documenta el aprendizaje y el reto vuelve al banco.' },
] as const;

export default function Validate() {
  const { challenge: c, journey: j, decision, setDecision, reach } = useRouteChallenge(2);
  useEffect(() => { if (decision === 'go') reach(3); }, [decision]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!c || !j) return <Navigate to="/laboral-kutxa/votacion" replace />;

  return (
    <>
      <PageHeader
        stage="validate"
        title="¿Es deseable, factible y viable?"
        lead="Antes de lanzar el piloto, el equipo convierte los supuestos en hipótesis y las contrasta en el entorno de pruebas. Solo la evidencia permite avanzar."
        aside={<DemoBadge />}
      />

      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
        {j.evidences.map((e, i) => <EvidenceCard key={e.lens} e={e} index={i} />)}
      </div>

      <section className="mt-10" aria-labelledby="decision-title">
        <div className="mb-4 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Decisión del comité del reto</p>
            <h2 id="decision-title" className="text-2xl font-semibold">GO · PIVOT · STOP</h2>
          </div>
          <p className="max-w-md text-right text-sm text-ink-muted present:hidden">La decisión la toman Challenge Owner y Venture Team a partir de la evidencia, no del calendario.</p>
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div role="radiogroup" aria-label="Decisión de validación" className="col-span-8 grid grid-cols-1 gap-4 max-lg:col-span-12 sm:grid-cols-3">
            {OPTIONS.map((o) => (
              <DecisionCard key={o.id} name="gate" code={o.code} title={o.title} summary={o.summary} Icon={o.Icon} tone={o.tone}
                selected={decision === o.id} onSelect={() => setDecision(o.id)} />
            ))}
          </div>
          <div className="col-span-4 max-lg:col-span-12">
            <StageGate
              from="VALIDATE" to="PILOT"
              criteria={[
                { label: 'Problema validado con usuarios', met: true },
                { label: 'Prueba de concepto técnica superada', met: true },
                { label: 'Modelo con aceptación suficiente', met: true },
                { label: 'Decisión GO registrada', met: decision === 'go' },
              ]}
              note={decision === 'pivot' ? 'PIVOT: el proyecto vuelve a experimentar con una hipótesis reformulada.' : decision === 'stop' ? 'STOP: el aprendizaje se registra y el reto vuelve al banco. No es un fracaso: evita invertir sin evidencia.' : 'Elige una decisión.'}
            />
          </div>
        </div>
      </section>

      <FlowNav step="validar" nextLabel="Lanzar el piloto pagado" nextDisabled={decision !== 'go'} disabledHint="Para seguir la demo, elige GO." />
    </>
  );
}
