import { CalendarDays, Check, CircleCheckBig, FileText, Gift, Megaphone, Rocket, Users } from 'lucide-react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CapabilityCard } from '../components/CapabilityCard';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/primitives';
import { CRITERIA } from '../lib/match';
import { PROGRAM } from '../data/program';
import { useRouteChallenge } from '../lib/useRouteChallenge';

const CHANNELS = [
  { id: 'app', label: 'App INNBULTZADA · Radar de Retos', note: 'Tarjeta del reto visible para todas las startups registradas' },
  { id: 'alumni', label: 'Redes alumni', note: 'Startups y equipos de ediciones anteriores' },
  { id: 'uni', label: 'Universidades e IKERLAN', note: 'Spin-offs y equipos de transferencia' },
  { id: 'boot', label: 'Bootcamps y ecosistema', note: 'BIND, BAT y comunidad emprendedora' },
  { id: 'evento', label: 'Evento de lanzamiento', note: 'Presentación del reto por el área dueña' },
];

const WHO = [...PROGRAM.eligibility];
const OFFER = ['Contrato de piloto pagado de 30.000 € (sin equity)', 'Co-creación con el área dueña del reto', 'Mentoría de expertos de LABORAL Kutxa y apoyo legal', 'Entorno de pruebas con datos anonimizados', 'Financiación en especie y Demo Day'];

export default function Call() {
  const { challenge: c, published, publish } = useRouteChallenge(0);
  const [channels, setChannels] = useState<string[]>(CHANNELS.map((x) => x.id));
  if (!c) return <Navigate to="/priorizar" replace />;
  const isPub = published.includes(c.id);
  const timeline = [
    { label: 'Publicación', note: 'Bases y lanzamiento' },
    { label: 'Postulación', note: `4 semanas · cierre ${c.deadline}` },
    { label: 'Primer filtro', note: 'Innovación + área dueña → 5 preseleccionadas' },
    { label: 'Pitch final', note: 'Tipo «Shark Tank» → 1–2 elegidas' },
    { label: 'Programa', note: '6 meses: 1 alta · 4 piloto · 1 decisión' },
  ];

  return (
    <>
      <PageHeader
        stage="discover"
        title={<>3 · LABORAL Kutxa <span className="text-magenta">publica el reto</span></>}
        lead="Bases del llamado, lanzamiento y comunicación. El reto se abre en la app a startups de toda España y la UE."
        aside={<span className="chip border border-dashed border-navy-300 text-navy-500">Programa en diseño</span>}
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Bases del llamado */}
        <div className="col-span-8 grid content-start gap-5 max-lg:col-span-12">
          <article className="card overflow-hidden" aria-labelledby="bases">
            <header className="flex items-start justify-between gap-4 bg-navy px-7 py-6 text-white">
              <div>
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-navy-100"><FileText size={14} aria-hidden />Bases del llamado · {c.code}</p>
                <h2 id="bases" className="mt-1 font-display text-2xl font-semibold leading-snug text-white">{c.title}</h2>
                <p className="mt-2 max-w-2xl text-navy-100">{c.hmw}</p>
              </div>
              <span className={`chip shrink-0 ${isPub ? 'bg-impact text-white' : 'bg-opportunity text-navy'}`}>
                {isPub ? <><CircleCheckBig size={13} aria-hidden />Publicada</> : 'Borrador'}
              </span>
            </header>

            <div className="flex items-center gap-5 border-b border-line bg-opportunity-100 px-7 py-4">
              <p className="font-display text-3xl font-bold text-navy">{PROGRAM.funding.headline}</p>
              <p className="text-sm leading-snug text-ink-soft"><strong className="text-navy">{PROGRAM.funding.label}</strong><br />{PROGRAM.funding.equity} · más financiación en especie</p>
              <p className="ml-auto text-right text-xs text-ink-muted">Programa de {PROGRAM.duration.total}<br />Abierto a España y la UE · prioridad Euskadi y Navarra</p>
            </div>
            <section className="p-7">
              <h3 className="text-base font-semibold">Capacidades buscadas</h3>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">{c.needs.map((n) => <CapabilityCard key={n} id={n} compact />)}</div>
            </section>
          </article>

          <Reveal summary={<span className="flex items-center gap-2"><Users size={16} className="text-magenta" aria-hidden />Requisitos y qué ofrece el programa</span>}>
            <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
              <section>
                <h3 className="flex items-center gap-2 text-base font-semibold"><Users size={17} className="text-magenta" aria-hidden />Requisitos</h3>
                <ul className="mt-2 grid gap-1.5 text-sm text-ink-soft">{WHO.map((w) => <li key={w} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-impact" aria-hidden />{w}</li>)}</ul>
              </section>
              <section>
                <h3 className="flex items-center gap-2 text-base font-semibold"><Gift size={17} className="text-magenta" aria-hidden />Qué ofrece</h3>
                <ul className="mt-2 grid gap-1.5 text-sm text-ink-soft">{OFFER.map((w) => <li key={w} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-impact" aria-hidden />{w}</li>)}</ul>
              </section>
            </div>
          </Reveal>

          <Reveal summary={<span className="flex items-center gap-2"><CalendarDays size={16} className="text-magenta" aria-hidden />Rúbrica de selección y calendario</span>}>
            <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
              <section>
                <h3 className="text-base font-semibold">Rúbrica de selección</h3>
                <ul className="mt-2 grid gap-2">
                  {CRITERIA.map((k) => (
                    <li key={k.id} className="text-sm">
                      <div className="flex justify-between"><span className="text-ink-soft">{k.label}</span><span className="font-mono text-xs font-semibold text-navy">{k.weight}%</span></div>
                      <div className="mt-1 h-1.5 rounded-full bg-paper-sunk" aria-hidden><div className="h-full rounded-full bg-magenta" style={{ width: `${k.weight * 3}%` }} /></div>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="flex items-center gap-2 text-base font-semibold"><CalendarDays size={17} className="text-magenta" aria-hidden />Calendario</h3>
                <ol className="relative mt-2 grid gap-2.5 border-l-2 border-navy-100 pl-4">
                  {timeline.map((t, i) => (
                    <li key={t.label} className="relative text-sm">
                      <span aria-hidden className={`absolute -left-[23px] top-1 h-3 w-3 rounded-full border-2 border-paper-raised ${i === 0 && isPub ? 'bg-impact' : i === 0 ? 'bg-magenta' : 'bg-navy-300'}`} />
                      <span className="font-semibold text-navy">{t.label}</span> <span className="text-ink-muted">· {t.note}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </Reveal>
        </div>

        {/* Lanzamiento y comunicación */}
        <aside className="col-span-4 grid content-start gap-5 max-lg:col-span-12" aria-labelledby="launch">
          <section className="card p-6">
            <h2 id="launch" className="flex items-center gap-2 text-lg font-semibold"><Megaphone size={18} className="text-magenta" aria-hidden />Lanzamiento y comunicación</h2>
            <fieldset className="mt-3 grid gap-2" disabled={isPub}>
              <legend className="sr-only">Canales de difusión</legend>
              {CHANNELS.map((ch) => {
                const on = channels.includes(ch.id);
                return (
                  <label key={ch.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${on ? 'border-navy-300 bg-navy-50' : 'border-line'}`}>
                    <input type="checkbox" className="mt-1 h-4 w-4 accent-[rgb(var(--magenta))]" checked={on}
                      onChange={() => setChannels((s) => (on ? s.filter((x) => x !== ch.id) : [...s, ch.id]))} />
                    <span>
                      <span className="block text-sm font-semibold text-navy">{ch.label}</span>
                      <span className="block text-xs text-ink-muted">{ch.note}</span>
                    </span>
                  </label>
                );
              })}
            </fieldset>
          </section>

          <section className={`rounded-xl2 p-6 transition ${isPub ? 'bg-impact text-white' : 'bg-magenta-50'}`} aria-live="polite">
            {isPub ? (
              <>
                <p className="flex items-center gap-2 font-display text-xl font-semibold"><Rocket size={20} aria-hidden />¡Convocatoria publicada!</p>
                <p className="mt-1 text-sm text-impact-50">Abierta a postulaciones en {channels.length} canales hasta el {c.deadline}.</p>
              </>
            ) : (
              <>
                <p className="font-semibold text-navy">Listo para lanzar</p>
                <p className="mt-1 text-sm text-ink-soft">Al publicar, el reto aparece en el mazo de retos de las startups.</p>
                <button type="button" className="btn-primary mt-4 w-full min-h-[52px] text-lg" onClick={() => publish(c.id)} disabled={channels.length === 0}>
                  <Megaphone size={20} aria-hidden />Publicar convocatoria
                </button>
              </>
            )}
          </section>
        </aside>
      </div>

      <FlowNav step="convocatoria" nextLabel="Pasar a la vista startup" nextDisabled={!isPub} disabledHint="Publica la convocatoria para continuar." />
    </>
  );
}
