/* ─────────────────────────────────────────────────────────────
 * Modelo de datos del prototipo INNBULTZADA.
 * Todo es mock local: no hay backend ni persistencia.
 * ───────────────────────────────────────────────────────────── */

export type StageId = 'discover' | 'match' | 'validate' | 'pilot' | 'venture' | 'scale';

export interface Stage {
  id: StageId;
  en: string;           // DISCOVER
  es: string;           // DESCUBRIR
  question: string;     // pregunta que responde la etapa
  description: string;
  gate: string;         // evidencia necesaria para superar el hito
}

export type Category = 'Digital' | 'Verde' | 'Social' | 'Financiero' | 'Seguros' | 'Tecnología';

export type Priority = 'Alta' | 'Media' | 'Baja';
export type ChallengeStatus = 'Abierto' | 'En match' | 'En validación' | 'En piloto';

export type CapabilityId =
  | 'tecnologia' | 'ia' | 'datos' | 'ux' | 'regulacion'
  | 'finanzas' | 'emprendimiento' | 'mercado' | 'seguros' | 'sostenibilidad';

export interface Capability {
  id: CapabilityId;
  name: string;
  short: string;
}

export type ActorType =
  | 'orquestador' | 'unidad' | 'startup' | 'centro' | 'universidad'
  | 'aceleradora' | 'experto' | 'intra' | 'empresa' | 'cooperativa';

export interface Actor {
  id: string;
  name: string;
  type: ActorType;
  typeLabel: string;
  capabilities: CapabilityId[];
  /** Descripción del rol conceptual. Nunca atribuye compromisos reales. */
  role: string;
  /** true = institución real usada como actor conceptual; false = ejemplo ficticio */
  conceptual: boolean;
  /** Rol que asumiría dentro del Venture Team */
  teamRole: string;
}

export interface Challenge {
  id: string;
  code: string;                 // RD-01 (Reto Demo)
  title: string;
  summary: string;
  categories: Category[];
  origin: string;               // de dónde sale el reto
  owner: { role: string; unit: string };
  priority: Priority;
  status: ChallengeStatus;
  stage: StageId;
  featured?: boolean;           // recorrido completo de demo
  /** Priorización (1–5, dato demostrativo) */
  scores: { impacto: number; urgencia: number; alineacion: number };
  deadline: string;             // cierre de postulaciones (demo)
  problem: string;
  hmw: string;                  // pregunta "¿Cómo podríamos…?"
  affectedUser: string;
  impact: string[];
  alignment: string[];
  needs: CapabilityId[];
  constraints: string[];
  successCriteria: string[];
}

export type Lens = 'deseabilidad' | 'factibilidad' | 'viabilidad';

export interface Evidence {
  lens: Lens;
  hypothesis: string;
  experiment: string;
  evidence: string;
  metric: { label: string; value: string };
  learning: string;
  confidence: number; // 0–100
}

export interface Journey {
  ventureName: string;
  valueProp: string;
  evidences: Evidence[];
  pilot: {
    environment: string;
    users: string;
    duration: string;
    metrics: { label: string; value: string; hint: string }[];
    learnings: string[];
  };
}

export type MilestoneStatus = 'done' | 'progress' | 'pending';

export interface Milestone {
  id: string;
  label: string;
  stage: StageId;
  evidence: string;
}

export type OutcomeId = 'integrate' | 'buy' | 'partner' | 'venture';
