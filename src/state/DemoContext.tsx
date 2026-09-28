import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CHALLENGES } from '../data/challenges';
import type { OutcomeId } from '../data/types';
import type { OpenIdea } from '../data/ecosystem';

export type GateDecision = 'go' | 'pivot' | 'stop' | null;

interface DemoState {
  presentation: boolean;
  togglePresentation: (v?: boolean) => void;
  challengeId: string;
  setChallengeId: (id: string) => void;
  /** Retos priorizados para la convocatoria */
  prioritized: string[];
  togglePrioritized: (id: string) => void;
  /** Retos con convocatoria publicada */
  published: string[];
  publish: (id: string) => void;
  /** Aceleradora/incubadora que recomienda la plataforma a la startup */
  accelerator: string | null;
  setAccelerator: (id: string | null) => void;
  /** Filtro de acceso: sector de servicios financieros y MVP */
  eligibility: { sector: string | null; mvp: boolean | null };
  setEligibility: (e: { sector: string | null; mvp: boolean | null }) => void;
  /** Idea abierta enviada por la startup (cuando no encuentra reto) */
  idea: OpenIdea | null;
  setIdea: (i: OpenIdea | null) => void;
  /** Votos del equipo de innovación en la plantilla de votación */
  myVotes: string[];
  toggleVote: (id: string) => void;
  /** Startup (demo) ha enviado su candidatura */
  applied: boolean;
  setApplied: (v: boolean) => void;
  /** Finalistas elegidos por LABORAL Kutxa (máx. 5) */
  shortlist: string[];
  setShortlist: (ids: string[]) => void;
  /** Finalistas que pasan a evaluación en profundidad (1–2); el resto va al backlog */
  selected: string[];
  toggleSelected: (id: string) => void;
  team: string[];
  setTeam: (ids: string[]) => void;
  decision: GateDecision;
  setDecision: (d: GateDecision) => void;
  client0: string;
  setClient0: (id: string) => void;
  outcome: OutcomeId | null;
  setOutcome: (o: OutcomeId | null) => void;
  reached: number; // índice de etapa alcanzada (0 = discover … 5 = scale)
  reach: (i: number) => void;
}

const Ctx = createContext<DemoState | null>(null);
const DEFAULT = CHALLENGES.find((c) => c.featured)!.id;
export const MAX_SHORTLIST = 5;
export const MAX_SELECTED = 2;

export function DemoProvider({ children }: { children: ReactNode }) {
  const [presentation, setPresentation] = useState(false);
  const [challengeId, setId] = useState(DEFAULT);
  const [prioritized, setPrioritized] = useState<string[]>(['tesoreria-pymes', 'relevo-generacional', 'mayores-digital']);
  const [published, setPublished] = useState<string[]>([]);
  const [applied, setApplied] = useState(false);
  const [accelerator, setAccelerator] = useState<string | null>(null);
  const [eligibility, setEligibility] = useState<{ sector: string | null; mvp: boolean | null }>({ sector: null, mvp: null });
  const [idea, setIdea] = useState<OpenIdea | null>(null);
  const [myVotes, setMyVotes] = useState<string[]>([]);
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [team, setTeam] = useState<string[]>(['lk', 'intra']);
  const [decision, setDecision] = useState<GateDecision>(null);
  const [client0, setClient0] = useState('lk');
  const [outcome, setOutcome] = useState<OutcomeId | null>(null);
  const [reached, setReached] = useState(0);

  const setChallengeId = useCallback((id: string) => {
    setId((prev) => {
      if (prev !== id) {
        setApplied(false);
        setShortlist([]);
        setSelected([]);
        setTeam(['lk', 'intra']);
        setDecision(null);
        setOutcome(null);
        setReached(0);
      }
      return id;
    });
  }, []);

  const togglePresentation = useCallback((v?: boolean) => setPresentation((p) => (v === undefined ? !p : v)), []);

  useEffect(() => {
    document.documentElement.classList.toggle('present', presentation);
  }, [presentation]);

  const value = useMemo<DemoState>(() => ({
    presentation, togglePresentation,
    challengeId, setChallengeId,
    prioritized,
    togglePrioritized: (id) => setPrioritized((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
    published,
    publish: (id) => setPublished((p) => (p.includes(id) ? p : [...p, id])),
    applied, setApplied,
    accelerator, setAccelerator,
    eligibility, setEligibility,
    idea, setIdea,
    myVotes, toggleVote: (id) => setMyVotes((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id])),
    shortlist, setShortlist: (ids) => { setShortlist(ids.slice(0, MAX_SHORTLIST)); setSelected([]); },
    selected,
    toggleSelected: (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= MAX_SELECTED ? [...s.slice(1), id] : [...s, id])),
    team, setTeam,
    decision, setDecision,
    client0, setClient0,
    outcome, setOutcome,
    reached, reach: (i) => setReached((r) => Math.max(r, i)),
  }), [presentation, togglePresentation, challengeId, setChallengeId, prioritized, published, applied, accelerator, eligibility, idea, myVotes, shortlist, selected, team, decision, client0, outcome, reached]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useDemo fuera de DemoProvider');
  return ctx;
}
