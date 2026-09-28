import { ALL_ACTORS } from '../data/actors';
import { APPLICANTS, type Applicant } from '../data/applicants';
import type { Actor, Challenge, CapabilityId } from '../data/types';
import { PROGRAM } from '../data/program';

export interface ActorMatch {
  actor: Actor;
  covers: CapabilityId[];
  score: number; // 0–100 compatibilidad (cálculo demostrativo)
}

const hash = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);

/** Compatibilidad demostrativa: solapamiento entre capacidades del actor y necesidades del reto. */
export function scoreActor(ch: Challenge, actor: Actor): ActorMatch {
  const covers = actor.capabilities.filter((c) => ch.needs.includes(c));
  const ratio = covers.length / Math.min(ch.needs.length, actor.capabilities.length);
  const score = covers.length === 0
    ? 12 + (hash(actor.id + ch.id) % 15)
    : Math.min(97, Math.round(38 + 60 * ratio - (hash(actor.id + ch.id) % 9)));
  return { actor, covers, score };
}

/** Candidaturas al reto, en orden de llegada (mezcla determinista). */
export function applicationsFor(ch: Challenge): (ActorMatch & { actor: Applicant })[] {
  return APPLICANTS
    .map((a) => scoreActor(ch, a) as ActorMatch & { actor: Applicant })
    .sort((a, b) => (hash(a.actor.id + ch.code) % 13) - (hash(b.actor.id + ch.code) % 13));
}

/** Rúbrica de selección del programa (pesos de la ficha INNBULTZADA; puntuaciones 1–5 demostrativas). */
export const CRITERIA = PROGRAM.rubric;
export type CriterionId = (typeof PROGRAM.rubric)[number]['id'];

/** Requisitos de la convocatoria: constituida, con MVP y hasta 8 años de antigüedad. */
export function eligibility(a: Applicant) {
  const age = CURRENT_YEAR - a.founded;
  const checks = [
    { label: 'Constituida', ok: true },
    { label: 'Con MVP', ok: a.mvp },
    { label: `≤ 8 años (${age})`, ok: age <= 8 },
  ];
  return { checks, ok: checks.every((c) => c.ok) };
}
const CURRENT_YEAR = 2026;

export function evaluate(ch: Challenge, a: Applicant) {
  const m = scoreActor(ch, a);
  const h = hash(a.id + ch.id);
  const scores: Record<CriterionId, number> = {
    encaje: Math.max(1, Math.min(5, Math.round(m.score / 20))),
    tecnica: Math.max(1, Math.min(5, Math.round(a.trl / 1.8) + (a.capabilities.includes('regulacion') || a.capabilities.includes('tecnologia') ? 1 : 0))),
    equipo: Math.max(2, Math.min(5, 2 + ((h + a.teamSize) % 4))),
    escalabilidad: Math.max(2, Math.min(5, 3 + (h % 3) - (a.trl < 5 ? 1 : 0))),
    regulatoria: a.capabilities.includes('regulacion') ? 5 : 3 + (h % 2),
    ...a.evalHint,
  };
  const total = Math.round(CRITERIA.reduce((acc, c) => acc + (scores[c.id] / 5) * c.weight, 0));
  return { scores, total, match: m };
}

export function coverage(ch: Challenge, team: string[]) {
  const covered = new Set<CapabilityId>();
  ALL_ACTORS.filter((a) => team.includes(a.id)).forEach((a) =>
    a.capabilities.forEach((c) => ch.needs.includes(c) && covered.add(c)),
  );
  return { covered, pct: Math.round((covered.size / ch.needs.length) * 100) };
}
