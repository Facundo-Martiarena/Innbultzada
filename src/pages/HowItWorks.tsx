import { ArrowRight, Check, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/primitives';
import { STAGES } from '../data/model';
import { STAGE_ICON } from '../lib/icons';

const COMPARE = [
  ['Punto de partida', 'Ideas o startups que se presentan a una convocatoria genérica', 'Retos reales priorizados por LABORAL Kutxa, con Challenge Owner y bases propias'],
  ['Financiación', 'A cambio de equity', 'Piloto pagado de 30.000 € por startup, sin equity'],
  ['Ritmo', 'Calendario fijo por cohortes', '6 meses: 1 alta · 4 piloto · 1 decisión; avance por evidencias'],
  ['Cómo se conecta', 'Selección por cohortes', 'Match entre retos y startups: las startups eligen retos; primer filtro → 5 → pitch final → 1–2'],
  ['Qué pasa con las no elegidas', 'Se pierden', 'Pool de empresas solución para futuros retos'],
  ['Primer cliente', 'Hay que buscarlo', 'Cliente 0 del propio ecosistema'],
  ['Resultado', 'Startup acelerada', 'LABORAL Kutxa firma como cliente (venture client), integra, colabora o se para'],
  ['Rol de la entidad', 'Patrocinador o inversor', 'Orquestador del ecosistema y posible Cliente 0'],
];

const FAQ = [
  ['¿Qué es INNBULTZADA?', 'Un mecanismo sistemático que transforma retos reales del entorno financiero, asegurador, empresarial y cooperativo en oportunidades, proyectos y, cuando tiene sentido, nuevas empresas.'],
  ['¿De dónde salen los retos?', 'De los 12 departamentos de LABORAL Kutxa: cada uno rellena una plantilla de diagnóstico y después se votan, clasifican y priorizan. También de ideas que proponen las startups cuando no encuentran un reto.'],
  ['¿De dónde salen las capacidades?', 'De startups con MVP en servicios financieros (banca, seguros, pagos…) que llegan recomendadas por la red de aceleradoras e incubadoras del ecosistema I&E Bizkaia.'],
  ['¿Cómo se conectan?', 'Las startups deslizan las tarjetas de retos y se postulan a los que encajan; el equipo evaluador preselecciona 5; tras un pitch final tipo «Shark Tank» se eligen 1–2 y las otras 3 quedan en el pool.'],
  ['¿Cómo avanza un proyecto?', 'Superando hitos con evidencias (el Pasaporte INNBULTZADA), no por calendario. En cada gate: GO, PIVOT o STOP.'],
  ['¿Qué significa Cliente 0?', 'La primera organización del ecosistema que ofrece un entorno real y controlado para pilotar la solución. No implica compromiso de compra.'],
  ['¿Y si el proyecto aún no es empresa?', 'INNBULTZADA acelera startups ya constituidas: si el piloto funciona, LABORAL Kutxa firma como cliente. Los proyectos tempranos se derivan a Gaztenpresa y, si buscan inversión, a Mondragon Promoción.'],
  ['¿Qué papel juega LABORAL Kutxa?', 'Orquesta el ecosistema: identifica retos, conecta capacidades, gobierna los hitos y, en determinados proyectos, puede actuar como Cliente 0.'],
  ['¿Qué la diferencia de una aceleradora?', 'Parte de necesidades reales, suma actores diversos, avanza por evidencias, ofrece un primer cliente y admite varios resultados, no solo startups.'],
];

export default function HowItWorks() {
  const nav = useNavigate();
  return (
    <>
      <PageHeader title="Cómo funciona INNBULTZADA" lead="Seis etapas, un pasaporte de hitos y un principio: se avanza con evidencias, no por calendario." />

      <ol className="grid gap-3">
        {STAGES.map((s, i) => {
          const Icon = STAGE_ICON[s.id];
          return (
            <li key={s.id} className="card grid grid-cols-[auto_12rem_1fr_1fr] items-start gap-6 p-5 animate-rise max-lg:grid-cols-[auto_1fr]" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white"><Icon size={22} strokeWidth={1.75} aria-hidden /></span>
              <div>
                <p className="font-mono text-sm font-semibold tracking-wider text-navy">0{i + 1} · {s.en}</p>
                <p className="text-ink-muted">{s.es}</p>
              </div>
              <div>
                <p className="font-semibold text-navy">{s.question}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.description}</p>
              </div>
              <div className="rounded-xl bg-impact-50 p-3">
                <p className="eyebrow !text-impact-600">Hito para avanzar</p>
                <p className="mt-1 text-sm text-ink">{s.gate}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <section className="mt-12" aria-labelledby="cmp">
        <h2 id="cmp" className="text-2xl font-semibold">No es una aceleradora tradicional</h2>
        <div className="card mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-paper-sunk text-sm">
              <tr>
                <th scope="col" className="w-1/5 px-5 py-3 font-semibold text-ink-muted">Dimensión</th>
                <th scope="col" className="px-5 py-3 font-semibold text-ink-muted"><Minus size={14} className="mr-1 inline" aria-hidden />Aceleradora tradicional</th>
                <th scope="col" className="px-5 py-3 font-semibold text-magenta"><Check size={14} className="mr-1 inline" aria-hidden />INNBULTZADA</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([d, a, b]) => (
                <tr key={d} className="border-t border-line">
                  <th scope="row" className="px-5 py-3.5 font-semibold text-navy">{d}</th>
                  <td className="px-5 py-3.5 text-ink-muted">{a}</td>
                  <td className="px-5 py-3.5 font-medium text-ink">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="faq">
        <h2 id="faq" className="text-2xl font-semibold">Nueve preguntas, nueve respuestas</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 max-lg:grid-cols-1">
          {FAQ.map(([q, a], i) => (
            <Reveal key={q} summary={<span className="flex items-center gap-2.5"><span className="font-mono text-xs text-magenta">0{i + 1}</span>{q}</span>}>
              <p className="text-[0.94rem] leading-relaxed text-ink-soft">{a}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="my-12 flex items-center justify-between rounded-[1.75rem] bg-navy p-8 text-white">
        <p className="font-display text-2xl font-semibold">Veámoslo con un Reto Demo.</p>
        <button type="button" className="btn-primary min-h-[52px] px-7 text-lg" onClick={() => nav('/laboral-kutxa/diagnostico')}>Empezar la demo <ArrowRight size={20} aria-hidden /></button>
      </div>
    </>
  );
}
