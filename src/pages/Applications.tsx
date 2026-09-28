import { Check, Inbox, Star, Wand2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { SwipeDeck } from '../components/SwipeDeck';
import { CompatibilityRing, DemoBadge, Reveal } from '../components/primitives';
import { capabilityById } from '../data/model';
import { CAPABILITY_ICON, ACTOR_ICON } from '../lib/icons';
import { applicationsFor, eligibility } from '../lib/match';
import { useRouteChallenge } from '../lib/useRouteChallenge';
import { MAX_SHORTLIST, useDemo } from '../state/DemoContext';
import { OPEN_IDEAS } from '../data/ecosystem';
import { Lightbulb } from 'lucide-react';
import { DEMO_STARTUP } from './Explore';

export default function Applications() {
  const { challenge: c, shortlist, setShortlist } = useRouteChallenge(1);
  const [discarded, setDiscarded] = useState<string[]>([]);
  const [deckKey, setDeckKey] = useState(0);
  const apps = useMemo(() => (c ? applicationsFor(c) : []), [c]);
  // Mazo estable: se recalcula solo al montar o al autocompletar (no en cada decisión).
  const pending = useMemo(
    () => apps.filter((a) => !shortlist.includes(a.actor.id) && !discarded.includes(a.actor.id)),
    [apps, deckKey], // eslint-disable-line react-hooks/exhaustive-deps
  );
  if (!c) return <Navigate to="/startup/retos" replace />;
  const full = shortlist.length >= MAX_SHORTLIST;

  const autofill = () => {
    const best = [...apps].filter((a) => eligibility(a.actor).ok).sort((a, b) => b.score - a.score).map((a) => a.actor.id);
    const next = [...shortlist, ...best.filter((id) => !shortlist.includes(id))].slice(0, MAX_SHORTLIST);
    setShortlist(next);
    setDeckKey((k) => k + 1);
  };

  return (
    <>
      <PageHeader
        stage="match"
        title={<>7 · Equipo de innovación: <span className="text-magenta">primer filtro y 5 preseleccionadas</span></>}
        lead={`Han llegado ${apps.length} candidaturas. El equipo evaluador (Innovación + área dueña del reto) evalúa cada una —encaje, capacidades y requisitos— y decide: derecha para preseleccionar, izquierda para descartar.`}
        aside={<DemoBadge label="Ejemplo ficticio" />}
      />

      {/* Shortlist: 5 huecos */}
      <section className="card mb-6 flex items-center gap-4 p-4" aria-label={`Shortlist: ${shortlist.length} de ${MAX_SHORTLIST}`} aria-live="polite">
        <p className="w-44 shrink-0 font-semibold text-navy">Preseleccionadas <span className="font-mono text-magenta">{shortlist.length}/{MAX_SHORTLIST}</span></p>
        <ol className="grid flex-1 grid-cols-5 gap-2">
          {Array.from({ length: MAX_SHORTLIST }).map((_, i) => {
            const a = apps.find((x) => x.actor.id === shortlist[i]);
            return (
              <li key={i} className={`flex h-14 items-center gap-2 rounded-xl px-3 text-sm ${a ? 'bg-impact-50 font-semibold text-navy ring-1 ring-impact/30 animate-rise' : 'border-2 border-dashed border-line text-ink-muted'}`}>
                {a ? <><Star size={15} className="shrink-0 fill-opportunity text-opportunity-600" aria-hidden /><span className="truncate text-[0.82rem]" title={a.actor.name}>{a.actor.name}</span></> : `Plaza ${i + 1}`}
              </li>
            );
          })}
        </ol>
        <button type="button" className="btn-ghost shrink-0 text-sm" onClick={autofill} disabled={full}>
          <Wand2 size={16} aria-hidden />Completar con las más compatibles
        </button>
      </section>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-7 max-lg:col-span-12">
          <SwipeDeck
            key={deckKey}
            items={pending}
            getKey={(a) => a.actor.id}
            rightDisabled={full}
            onDecide={(a, dir) => (dir === 'right'
              ? setShortlist([...shortlist, a.actor.id])
              : setDiscarded((d) => [...d, a.actor.id]))}
            onUndo={(a) => {
              setShortlist(shortlist.filter((x) => x !== a.actor.id));
              setDiscarded((d) => d.filter((x) => x !== a.actor.id));
            }}
            left={{ label: 'Descartar', Icon: X, stamp: 'NO' }}
            right={{ label: 'Preseleccionar', Icon: Star, stamp: 'SÍ' }}
            empty={<p className="text-ink-muted">{full ? '5 preseleccionadas: pasan al pitch final.' : 'No quedan candidaturas por revisar.'}</p>}
            height={500}
            renderCard={(a) => {
              const Icon = ACTOR_ICON.startup;
              return (
                <div className="flex h-full flex-col p-7">
                  <div className="flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-opportunity-100 text-navy"><Icon size={26} strokeWidth={1.75} aria-hidden /></span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-2xl font-semibold leading-tight text-navy">{a.actor.name}</p>
                      <p className="text-sm text-ink-muted">{a.actor.city} · TRL {a.actor.trl} · {a.actor.teamSize} personas</p>
                      {a.actor.id === DEMO_STARTUP && <span className="chip mt-1 bg-magenta-50 text-magenta">Postulación de la demo</span>}
                    </div>
                    <CompatibilityRing value={a.score} size={64} label="encaje con el reto" />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5" aria-label="Requisitos">
                    {eligibility(a.actor).checks.map((k) => (
                      <span key={k.label} className={`chip ${k.ok ? 'bg-impact-50 text-impact-600' : 'bg-magenta-50 text-magenta-600 ring-1 ring-magenta/40'}`}>
                        {k.ok ? <Check size={12} strokeWidth={3} aria-hidden /> : <X size={12} strokeWidth={3} aria-hidden />}{k.label}
                      </span>
                    ))}
                    {!eligibility(a.actor).ok && <span className="text-xs font-semibold text-magenta-600">No cumple requisitos → Gaztenpresa / pool</span>}
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">Especialidad</p>
                  <p className="mt-1 leading-snug text-ink">{a.actor.specialty}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">Propuesta para el reto</p>
                  <p className="mt-1 leading-snug text-ink-soft">{a.actor.pitch}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-4">
                    {a.actor.capabilities.map((cap) => {
                      const CapIcon = CAPABILITY_ICON[cap];
                      const hit = c.needs.includes(cap);
                      return <span key={cap} className={`chip ${hit ? 'bg-impact-50 text-impact-600 ring-1 ring-impact/30' : 'bg-paper-sunk text-ink-muted'}`}><CapIcon size={12} aria-hidden />{capabilityById(cap).name}</span>;
                    })}
                    <span className="ml-auto self-center text-xs text-ink-muted">{a.actor.traction}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>

        <aside className="col-span-5 grid content-start gap-4 max-lg:col-span-12">
          <div className="card flex items-stretch divide-x divide-line">
            {[
              { l: 'Recibidas', v: apps.length, t: 'text-navy' },
              { l: 'Preseleccionadas', v: shortlist.length, t: 'text-impact-600' },
              { l: 'Descartadas', v: discarded.length, t: 'text-magenta' },
            ].map((m) => (
              <div key={m.l} className="flex-1 px-4 py-3">
                <p className="text-xs font-medium text-ink-muted">{m.l}</p>
                <p className={`font-display text-2xl font-semibold ${m.t}`}>{m.v}</p>
              </div>
            ))}
          </div>
          <IdeasInbox />
          <Reveal summary={<span className="flex items-center gap-2"><Inbox size={16} className="text-magenta" aria-hidden />Cómo filtra el equipo evaluador</span>}>
            <ul className="grid gap-1.5 text-sm text-ink-soft">
              <li><strong>Requisitos:</strong> constituida, con MVP y hasta 8 años de antigüedad.</li>
              <li>El anillo muestra el <strong>encaje con el reto</strong>, el criterio con más peso (30 %).</li>
              <li>En verde, las capacidades que el reto necesita.</li>
              <li>Los proyectos tempranos se derivan a <strong>Gaztenpresa</strong> (incubación «tipo ascensor»).</li>
            </ul>
          </Reveal>
        </aside>
      </div>

      <FlowNav step="candidaturas" nextLabel="Ir al pitch final" nextDisabled={!full} disabledHint="Preselecciona 5 (o usa «Completar»)." />
    </>
  );
}

/* Bandeja de ideas abiertas: startups que no encontraron un reto publicado. */
function IdeasInbox() {
  const { idea } = useDemo();
  const [converted, setConverted] = useState<string[]>([]);
  const ideas = [...(idea ? [idea] : []), ...OPEN_IDEAS];
  return (
    <section className="card p-5" aria-labelledby="ideas">
      <h2 id="ideas" className="flex items-center gap-2 font-semibold text-navy"><Lightbulb size={17} className="text-magenta" aria-hidden />Ideas abiertas recibidas <span className="font-mono text-sm text-ink-muted">{ideas.length}</span></h2>
      <p className="text-xs text-ink-muted">De startups que no encontraron un reto publicado.</p>
      <ul className="mt-3 grid gap-2">
        {ideas.map((i) => {
          const done = converted.includes(i.id);
          return (
            <li key={i.id} className={`rounded-xl border p-3 ${i.id === 'mine' ? 'border-magenta/50 bg-magenta-50' : 'border-line'}`}>
              <p className="text-sm font-semibold leading-snug text-navy">{i.title}</p>
              <p className="text-xs text-ink-muted">{i.startup} · {i.sector} · para {i.area}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className={`chip ${done ? 'bg-impact text-white' : 'bg-paper-sunk text-ink-soft'}`}>{done ? 'Convertida en reto' : i.status}</span>
                {!done && <button type="button" className="text-xs font-semibold text-magenta hover:underline" onClick={() => setConverted((c) => [...c, i.id])}>Convertir en reto</button>}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
