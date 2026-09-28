import { ArrowRight, Bookmark, BookmarkCheck, CalendarDays, ChevronDown, Lightbulb, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlowNav } from '../components/FlowNav';
import { PageHeader } from '../components/PageHeader';
import { CompatibilityRing, DemoBadge, PriorityPill } from '../components/primitives';
import { applicantById } from '../data/applicants';
import { CHALLENGES } from '../data/challenges';
import { capabilityById } from '../data/model';
import type { Category, Challenge } from '../data/types';
import { CAPABILITY_ICON } from '../lib/icons';
import { scoreActor } from '../lib/match';
import { useDemo } from '../state/DemoContext';
import { priorityScore } from './Prioritize';

const FILTERS: Category[] = ['Digital', 'Verde', 'Social', 'Financiero', 'Seguros', 'Tecnología'];
export const DEMO_STARTUP = 'st-flux';

export default function Explore() {
  const { challengeId, setChallengeId, published, reach } = useDemo();
  const nav = useNavigate();
  const me = applicantById(DEMO_STARTUP)!;
  const [filter, setFilter] = useState<Category | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [discarded, setDiscarded] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  useEffect(() => { reach(1); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // El reto de la demo aparece primero; después, el resto ordenado por prioridad.
  const deck = useMemo(() => {
    const list = CHALLENGES.filter((c) => !filter || c.categories.includes(filter));
    return [...list].sort((a, b) => (a.id === challengeId ? -1 : b.id === challengeId ? 1 : priorityScore(b) - priorityScore(a)));
  }, [filter, challengeId]);

  const visible = deck.filter((c) => !discarded.includes(c.id));
  const savedChallenges = CHALLENGES.filter((c) => saved.includes(c.id));
  const demoSaved = saved.includes(challengeId);

  const toggleSave = (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const discard = (id: string) => { setDiscarded((d) => [...d, id]); setSaved((s) => s.filter((x) => x !== id)); };
  const goApply = (id: string) => { setChallengeId(id); nav(`/reto/${id}/postular`); };

  const card = (c: Challenge) => {
    const m = scoreActor(c, me);
    const open = published.includes(c.id) || c.id !== challengeId;
    const isSaved = saved.includes(c.id);
    return (
      <li key={c.id} className="card flex flex-col overflow-hidden animate-rise">
        <div className="relative bg-navy px-6 pb-5 pt-6 text-white">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-navy-100">{c.code} · Reto Demo</span>
            <span className={`chip ${open ? 'bg-impact text-white' : 'bg-opportunity text-navy'}`}>{open ? 'Convocatoria abierta' : 'Próximamente'}</span>
          </div>
          <h3 className="mt-3 font-display text-[1.5rem] font-semibold leading-tight text-white">{c.title}</h3>
          <p className="mt-1 text-sm text-navy-100">{c.origin}</p>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="leading-relaxed text-ink-soft">{c.summary}</p>
          <p className="mt-3 inline-flex w-fit items-center gap-2 rounded-lg bg-opportunity-100 px-3 py-1.5 text-sm font-semibold text-navy">Piloto pagado 30.000 € · sin equity · 6 meses</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">Capacidades que busca <span className="font-normal normal-case text-impact-600">· en verde, las tuyas</span></p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {c.needs.map((n) => {
              const Icon = CAPABILITY_ICON[n];
              const mine = me.capabilities.includes(n);
              return (
                <span key={n} className={`chip ${mine ? 'bg-impact-50 text-impact-600 ring-1 ring-impact/30' : 'bg-paper-sunk text-ink-soft'}`}>
                  <Icon size={12} aria-hidden />{capabilityById(n).name}
                </span>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
            <CompatibilityRing value={m.score} size={58} label="encaje con tu startup" />
            <div className="flex-1 text-sm">
              <p className="font-semibold text-navy">Encaje con tu startup</p>
              <p className="text-xs text-ink-muted">Cubre {m.covers.length} de {c.needs.length} capacidades</p>
              <p className="mt-0.5 flex items-center gap-1 text-ink-muted"><CalendarDays size={13} aria-hidden />Cierre {c.deadline}</p>
            </div>
            <PriorityPill p={c.priority} />
          </div>
          {/* Decisión evaluada: acciones explícitas, sin gesto ni corazón. */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button type="button" className="btn-navy min-h-[42px] flex-1 justify-center gap-2 px-4" onClick={() => goApply(c.id)}>
              Postular <ArrowRight size={16} aria-hidden />
            </button>
            <button type="button" aria-pressed={isSaved} onClick={() => toggleSave(c.id)}
              className={`btn min-h-[42px] gap-2 px-4 ${isSaved ? 'bg-impact-50 text-impact-600 ring-1 ring-impact/30' : 'border border-line bg-paper-raised text-navy hover:border-navy-300'}`}>
              {isSaved ? <><BookmarkCheck size={16} aria-hidden />Guardado</> : <><Bookmark size={16} aria-hidden />Me interesa</>}
            </button>
            <button type="button" className="btn-ghost min-h-[42px] gap-2 px-3 text-sm text-ink-muted" onClick={() => discard(c.id)}>
              <X size={16} aria-hidden />Pasar
            </button>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <PageHeader
        stage="match"
        title={<>5 · La startup evalúa <span className="text-magenta">los retos de LABORAL Kutxa</span></>}
        lead="No es deslizar por deslizar: revisá la lista, compará el encaje de cada reto con tu startup, las capacidades que busca y el plazo. Postulate al que te convenza, guardá los que quieras evaluar y pasá el resto."
        aside={<DemoBadge label="Ejemplo ficticio" />}
      />

      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="chip bg-navy-50 py-1.5 text-navy">Viendo como <strong className="font-semibold">{me.name}</strong></span>
          <button type="button" onClick={() => setShowSaved((s) => !s)} aria-expanded={showSaved} aria-controls="saved-panel"
            className={`btn min-h-[40px] gap-2 px-4 text-sm ${savedChallenges.length ? 'bg-navy text-white hover:bg-navy-700' : 'border border-line bg-paper-raised text-navy hover:border-navy-300'}`}>
            <Bookmark size={16} className={savedChallenges.length ? 'fill-white' : 'text-navy'} aria-hidden />
            Me interesan <span className="font-mono">{savedChallenges.length}</span>
            <ChevronDown size={15} className={`transition ${showSaved ? 'rotate-180' : ''}`} aria-hidden />
          </button>
        </div>

        {/* Filtros como barra desplazable */}
        <div className="mb-5 flex gap-1.5 overflow-x-auto pb-1" role="group" aria-label="Filtrar retos por ámbito">
          <button type="button" aria-pressed={!filter} onClick={() => setFilter(null)} className={`chip min-h-[34px] shrink-0 px-3.5 ${!filter ? 'bg-navy text-white' : 'bg-paper-sunk text-navy'}`}>Todos</button>
          {FILTERS.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(filter === f ? null : f)}
              className={`chip min-h-[34px] shrink-0 px-3.5 ${filter === f ? 'bg-navy text-white' : 'bg-paper-sunk text-navy'}`}>{f}</button>
          ))}
        </div>

        {/* Panel de retos guardados, plegable */}
        {showSaved && (
          <div id="saved-panel" className="card mb-5 p-4 animate-rise" aria-live="polite">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-navy"><Bookmark size={16} className="text-navy" aria-hidden />Retos que te interesan <span className="font-mono text-ink-muted">{savedChallenges.length}</span></h2>
            {savedChallenges.length === 0 ? (
              <p className="mt-2 text-sm text-ink-muted">Guardá con «Me interesa» los retos cuyo encaje te convenza para compararlos acá.</p>
            ) : (
              <ul className="mt-3 grid gap-2">
                {savedChallenges.map((c) => (
                  <li key={c.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
                    <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-navy">{c.title}</span>
                    <button type="button" className="btn-navy min-h-[36px] px-3 text-xs" onClick={() => goApply(c.id)}>Postular</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Lista evaluable: comparás lado a lado y decidís. */}
        {visible.length > 0 ? (
          <ul className="grid gap-4 lg:grid-cols-2">{visible.map(card)}</ul>
        ) : (
          <p className="card p-8 text-center text-ink-muted">No quedan más retos con este filtro.</p>
        )}

        <p className="mt-6 text-center text-sm text-ink-muted present:hidden">
          <Lightbulb size={15} className="mr-1 inline text-magenta" aria-hidden />
          ¿Ningún reto encaja con tu solución?{' '}
          <button type="button" className="font-semibold text-magenta hover:underline" onClick={() => nav('/startup/idea')}>Cuéntanos tu idea</button>
        </p>
      </div>

      <FlowNav step="explorar" nextLabel="Postularme al reto" nextDisabled={!demoSaved} disabledHint="Marcá «Me interesa» en un reto que encaje para continuar." />
    </>
  );
}
