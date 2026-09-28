import type { StageId } from '../data/types';

export type Role = 'lk' | 'startup' | null;

/* Recorrido narrativo de la demo: cada paso tiene su etapa INNBULTZADA y quién actúa. */
export interface FlowStep {
  key: string;
  label: string;
  narrative: string;
  stage: StageId | null;
  role: Role;
  path: (id: string) => string;
  /** El paso trabaja sobre un reto concreto (se muestra en la barra superior) */
  scoped?: boolean;
}

export const FLOW: FlowStep[] = [
  { key: 'home', label: 'Inicio', narrative: 'Concepto', stage: null, role: null, path: () => '/' },
  { key: 'diagnostico', label: 'Diagnóstico', narrative: '12 departamentos diagnostican', stage: 'discover', role: 'lk', path: () => '/laboral-kutxa/diagnostico' },
  { key: 'priorizar', label: 'Votación', narrative: 'Votación y priorización', stage: 'discover', role: 'lk', path: () => '/laboral-kutxa/votacion' },
  { key: 'convocatoria', label: 'Publicar reto', narrative: 'LABORAL Kutxa publica el reto', stage: 'discover', role: 'lk', path: (id) => `/reto/${id}/convocatoria`, scoped: true },
  { key: 'entrada', label: 'Acceso vía aceleradora', narrative: 'La startup llega por su aceleradora', stage: 'match', role: 'startup', path: () => '/startup/acceso' },
  { key: 'explorar', label: 'Explorar retos', narrative: 'La startup explora retos', stage: 'match', role: 'startup', path: () => '/startup/retos' },
  { key: 'postular', label: 'Postulación', narrative: 'La startup se postula', stage: 'match', role: 'startup', path: (id) => `/reto/${id}/postular`, scoped: true },
  { key: 'seguimiento', label: 'Seguimiento', narrative: 'La startup sigue su candidatura', stage: 'match', role: 'startup', path: () => '/startup/seguimiento' },
  { key: 'candidaturas', label: 'Primer filtro', narrative: 'Equipo de innovación · 5 preseleccionadas', stage: 'match', role: 'lk', path: (id) => `/reto/${id}/candidaturas`, scoped: true },
  { key: 'evaluacion', label: 'Pitch final', narrative: 'Pitch final · 1–2 elegidas', stage: 'match', role: 'lk', path: (id) => `/reto/${id}/evaluacion`, scoped: true },
  { key: 'proyecto', label: 'Mes 1 · Alta', narrative: 'Alta y revisión de seguridad', stage: 'match', role: null, path: (id) => `/reto/${id}/proyecto`, scoped: true },
  { key: 'validar', label: 'Hipótesis', narrative: 'Hipótesis del piloto', stage: 'validate', role: null, path: (id) => `/reto/${id}/validar`, scoped: true },
  { key: 'piloto', label: 'Piloto pagado', narrative: 'Piloto pagado · meses 2–5', stage: 'pilot', role: null, path: (id) => `/reto/${id}/piloto`, scoped: true },
  { key: 'decision', label: 'Mes 6 · Decisión', narrative: '¿LABORAL Kutxa firma como cliente?', stage: 'venture', role: null, path: (id) => `/reto/${id}/decision`, scoped: true },
  { key: 'escalar', label: 'KPIs y posventa', narrative: 'KPIs y acuerdos posventa', stage: 'scale', role: null, path: (id) => `/reto/${id}/escalar`, scoped: true },
];

export const flowIndex = (key: string) => FLOW.findIndex((s) => s.key === key);
