import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EcosystemDiagram } from '../components/EcosystemDiagram';
import { PageHeader } from '../components/PageHeader';
import { ACCELERATORS } from '../data/ecosystem';
import type { NodeId } from '../data/ecosystemGraph';
import { PROGRAM } from '../data/program';
import { useDemo } from '../state/DemoContext';

const DETAIL: Record<NodeId, { title: string; qa: { q: string; a: string | string[] }[]; go?: { label: string; to: string } }> = {
  ideas: { title: 'Todo empieza con una idea', qa: [{ q: '¿De dónde sale?', a: ['De una startup que tiene una solución', 'De una necesidad de un departamento de LABORAL Kutxa'] }] },
  acc: {
    title: 'Entorno de cooperación',
    qa: [
      { q: '¿Con cuáles trabajaremos?', a: ACCELERATORS.map((a) => `${a.name} · ${a.kind.toLowerCase()}`) },
      { q: '¿Qué implica la cooperación?', a: ['Recomiendan INNBULTZADA a startups de servicios financieros', 'Aplican un primer filtro: servicios financieros + MVP', 'Derivan los proyectos tempranos a Gaztenpresa (incubación «tipo ascensor»)', 'Reciben recursos y herramientas de la estrategia impulsadora'] },
    ],
    go: { label: 'Ver el acceso de una startup', to: '/startup/acceso' },
  },
  startups: { title: 'Startups con MVP en servicios financieros', qa: [{ q: 'Requisitos', a: [...PROGRAM.eligibility] }], go: { label: 'Ver los retos como startup', to: '/startup/retos' } },
  match: {
    title: 'Herramienta de matching de problemas con soluciones',
    qa: [
      { q: '¿Quién la manipula de cada lado?', a: ['Startups: exploran retos, se postulan, proponen ideas y siguen su candidatura', 'Equipo de innovación de LABORAL Kutxa: publica retos, filtra, evalúa y hace seguimiento', 'Departamentos: aportan su diagnóstico y votan'] },
      { q: '¿Qué información registra?', a: ['Retos: diagnóstico, votos, prioridad y bases', 'Startups: aceleradora, especialidad, capacidades, MVP, TRL y antigüedad', 'Candidaturas, ideas abiertas, puntuaciones de la rúbrica y estado'] },
      { q: '¿En base a qué hace el match?', a: ['Capacidades que busca el reto frente a las que aporta la startup', 'Ámbito de servicios financieros y requisitos (MVP, ≤ 8 años)', 'Rúbrica: encaje 30 %, técnica 20 %, equipo 20 %, escalabilidad 15 %, regulatoria 15 %'] },
      { q: '¿Quién le da mantenimiento?', a: 'Propuesta: el equipo de Innovación y Open Business de LABORAL Kutxa (a validar).' },
      { q: '¿Cómo se ve el seguimiento?', a: ['La startup ve el estado de su candidatura y de su idea', 'El proyecto lleva un Pasaporte de hitos', 'KPIs durante 12 meses tras el programa'] },
    ],
    go: { label: 'Ver el seguimiento de la startup', to: '/startup/seguimiento' },
  },
  impulso: {
    title: 'Estrategia impulsadora',
    qa: [
      { q: '¿Qué ofrecemos?', a: [`Piloto pagado de ${PROGRAM.funding.headline}, sin equity`, ...PROGRAM.offers.slice(0, 5)] },
      { q: '¿Cuánto dura?', a: ['6 meses prorrogables: 1 mes alta, 4 de piloto, 1 de decisión', '12 meses de seguimiento de KPIs'] },
    ],
    go: { label: 'Ver la ficha del programa', to: '/programa' },
  },
  empresas: { title: 'Empresas establecidas', qa: [{ q: '¿Qué son?', a: ['Startups que tras el piloto quedan como proveedores de LABORAL Kutxa o se integran', 'Entran en el pool de empresas solución y en la red alumni', 'Cubren las necesidades de los departamentos: se cierra el ciclo'] }] },
  deps: { title: '12 departamentos de LABORAL Kutxa', qa: [{ q: '¿Cómo se ven las plantillas de diagnóstico?', a: 'Cada departamento describe su problema, a quién afecta, el impacto, la urgencia, los datos implicados y cómo sabría que está resuelto.' }], go: { label: 'Ver las plantillas de diagnóstico', to: '/laboral-kutxa/diagnostico' } },
  votacion: { title: 'Plantilla de votación', qa: [{ q: '¿Para qué sirve?', a: ['Identificar los problemas con más apoyo', 'Clasificarlos por ámbito', 'Priorizar el proyecto a desarrollar'] }], go: { label: 'Ver la votación', to: '/laboral-kutxa/votacion' } },
  innov: { title: 'Equipo de innovación de LABORAL Kutxa', qa: [{ q: '¿Qué hace?', a: ['Publica los retos priorizados', 'Revisa candidaturas e ideas abiertas', 'Preselecciona 5 y organiza el pitch final', 'Acompaña el programa y mide los KPIs'] }] },
  kpis: { title: 'KPIs y acuerdos posventa', qa: [{ q: '¿Qué se mide?', a: PROGRAM.kpis.map((k) => `${k.label} · ${k.target}`) }] },
};

export default function Ecosystem() {
  const [sel, setSel] = useState<NodeId>('match');
  const nav = useNavigate();
  const { challengeId } = useDemo();
  const d = DETAIL[sel];

  return (
    <>
      <PageHeader title="Ecosistema I&E Bizkaia" lead="Dos perfiles, un mismo punto de encuentro: las startups llegan por la red de aceleradoras y LABORAL Kutxa aporta sus problemáticas priorizadas. Pulsa cada bloque para ver cómo funciona." />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 max-lg:col-span-12">
          <EcosystemDiagram sel={sel} onSelect={setSel} />
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="btn-primary" onClick={() => nav('/startup/acceso')}>Entrar como startup <ArrowRight size={17} aria-hidden /></button>
            <button type="button" className="btn-navy" onClick={() => nav('/laboral-kutxa/diagnostico')}>Entrar como LABORAL Kutxa <ArrowRight size={17} aria-hidden /></button>
            <button type="button" className="btn-ghost" onClick={() => nav(`/reto/${challengeId}/evaluacion`)}>Ver el pitch final</button>
          </div>
        </div>

        <aside className="card col-span-4 self-start p-6 max-lg:col-span-12" aria-live="polite" aria-labelledby="det">
          <h2 id="det" className="text-xl font-semibold">{d.title}</h2>
          <div className="mt-3 grid gap-4">
            {d.qa.map((x) => (
              <div key={x.q}>
                <p className="text-sm font-semibold text-magenta-600">{x.q}</p>
                {Array.isArray(x.a) ? (
                  <ul className="mt-1 grid gap-1 text-sm leading-snug text-ink-soft">{x.a.map((t) => <li key={t} className="flex gap-2"><span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-300" />{t}</li>)}</ul>
                ) : <p className="mt-1 text-sm leading-snug text-ink-soft">{x.a}</p>}
              </div>
            ))}
          </div>
          {d.go && <button type="button" className="btn-ghost mt-5 w-full text-sm" onClick={() => nav(d.go!.to)}>{d.go.label} <ArrowRight size={16} aria-hidden /></button>}
        </aside>
      </div>
    </>
  );
}
