/*
 * Plantilla de diagnóstico real (fuente: Comparación aceleradoras.xlsx › PLANTILLA DIAGNOSTICO).
 * Cada sector la completa para obtener su Impact Score (0–100) y su cuadrante de decisión.
 */
export interface DiagOption { label: string; points: number }
export interface DiagQuestion {
  id: string;
  q: string;
  weight: number;      // puntos máximos de la pregunta
  multi?: boolean;     // permite varias respuestas (suma acotada al peso)
  options: DiagOption[];
}

/* Preguntas de contexto — NO puntúan (solo identifican la iniciativa). */
export const CONTEXT_QUESTIONS = [
  'Área / equipo',
  'Nombre del proceso o actividad',
];

/* Impact Score — 100 puntos (20 + 10 + 15 + 20 + 15 + 20). */
export const DIAG_QUESTIONS: DiagQuestion[] = [
  {
    id: 'afecta', q: '¿A quién afecta principalmente?', weight: 20,
    options: [
      { label: 'Mi equipo', points: 5 },
      { label: 'Empleados', points: 8 },
      { label: 'Otro equipo', points: 10 },
      { label: 'Varios equipos', points: 15 },
      { label: 'Clientes', points: 20 },
      { label: 'Otro', points: 5 },
    ],
  },
  {
    id: 'frecuencia', q: '¿Con qué frecuencia ocurre?', weight: 10,
    options: [
      { label: 'Puntualmente', points: 2 },
      { label: 'Mensualmente', points: 4 },
      { label: 'Semanalmente', points: 6 },
      { label: 'Diariamente', points: 8 },
      { label: 'Varias veces al día', points: 10 },
      { label: 'No lo sabemos', points: 0 },
    ],
  },
  {
    id: 'impacto', q: '¿Qué impacto genera actualmente?', weight: 15, multi: true,
    options: [
      { label: 'Consume mucho tiempo', points: 4 },
      { label: 'Genera costes', points: 5 },
      { label: 'Genera errores / retrabajo', points: 5 },
      { label: 'Afecta a la experiencia del empleado', points: 3 },
      { label: 'Afecta a la experiencia del cliente', points: 6 },
      { label: 'Genera riesgo', points: 6 },
      { label: 'Impacto regulatorio / compliance', points: 8 },
      { label: 'Genera dependencias con otros equipos', points: 3 },
      { label: 'Otro', points: 2 },
    ],
  },
  {
    id: 'inaccion', q: '¿Qué pasaría si no hacemos nada?', weight: 20,
    options: [
      { label: 'Impacto menor / molestia', points: 5 },
      { label: 'Impacto limitado', points: 8 },
      { label: 'Impacto significativo', points: 12 },
      { label: 'Impacto alto', points: 15 },
      { label: 'Impacto crítico', points: 20 },
    ],
  },
  {
    id: 'actual', q: '¿Cómo resuelves actualmente este problema?', weight: 15,
    options: [
      { label: 'Proceso completamente manual', points: 15 },
      { label: 'Excel / hojas de cálculo', points: 12 },
      { label: 'Emails / aprobaciones manuales', points: 10 },
      { label: 'Varias herramientas desconectadas', points: 8 },
      { label: 'Herramienta existente con limitaciones', points: 6 },
      { label: 'Proceso parcialmente automatizado', points: 4 },
      { label: 'Ya existe una solución adecuada', points: 0 },
      { label: 'No lo sabemos', points: 2 },
    ],
  },
  {
    id: 'resultado', q: '¿Qué resultado te gustaría conseguir?', weight: 20,
    options: [
      { label: 'Muy genérico / no definido', points: 5 },
      { label: 'Objetivo parcialmente definido', points: 10 },
      { label: 'Objetivo claro', points: 15 },
      { label: 'Objetivo claro y medible', points: 20 },
    ],
  },
];

export type DiagAnswers = Record<string, number[]>; // id -> índices elegidos

/* Impact Score 0–100: suma de puntos elegidos; en multi, acotado al peso de la pregunta. */
export function impactScore(answers: DiagAnswers): number {
  let total = 0;
  for (const q of DIAG_QUESTIONS) {
    const idxs = answers[q.id] ?? [];
    const sum = idxs.reduce((acc, i) => acc + (q.options[i]?.points ?? 0), 0);
    total += Math.min(sum, q.weight);
  }
  return Math.round(total);
}

export type Quadrant = 'Descartar' | 'Quick win' | 'Investigar' | 'Prioridad';

/* Diagnóstico enviado por un área: viaja al estado y aparece en Votación. */
export interface Diagnosis {
  name: string;
  area: string;
  impact: number;
  viability: number;
}

/* Matriz de decisión: Impacto × Viabilidad (umbral 50). */
export function quadrant(impact: number, viability: number): Quadrant {
  const hiI = impact >= 50, hiV = viability >= 50;
  if (hiI && hiV) return 'Prioridad';
  if (hiI && !hiV) return 'Investigar';
  if (!hiI && hiV) return 'Quick win';
  return 'Descartar';
}
