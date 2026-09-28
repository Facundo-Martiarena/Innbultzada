/*
 * Ecosistema I&E Bizkaia: red de aceleradoras, departamentos de LABORAL Kutxa e ideas abiertas.
 * Instituciones reales = actores conceptuales (sin partnerships confirmados).
 * Departamentos e ideas = ejemplos demostrativos.
 */

export interface Accelerator {
  id: string;
  name: string;
  kind: 'Aceleradora' | 'Incubadora' | 'Universidad' | 'Centro tecnológico';
  note: string;
  partnership: string;
}

export const ACCELERATORS: Accelerator[] = [
  { id: 'bat', name: 'BAT · B Accelerator Tower', kind: 'Aceleradora', note: 'Startups en fase de aceleración', partnership: 'Partnership a definir' },
  { id: 'bind', name: 'BIND 4.0', kind: 'Aceleradora', note: 'Programa de aceleración con grandes empresas', partnership: 'Partnership a definir' },
  { id: 'gaztenpresa', name: 'Gaztenpresa', kind: 'Incubadora', note: 'Proyectos tempranos: incubación «tipo ascensor»', partnership: 'Derivación de proyectos sin MVP' },
  { id: 'uni', name: 'Incubadora universitaria', kind: 'Universidad', note: 'Spin-offs y equipos de estudiantes', partnership: 'Ejemplo ficticio' },
  { id: 'ikerlan', name: 'IKERLAN', kind: 'Centro tecnológico', note: 'Spin-offs tecnológicas', partnership: 'Partnership a definir' },
];

export const FINANCIAL_SECTORS = ['Banca', 'Seguros', 'Pagos', 'Financiación', 'Ahorro e inversión', 'Cumplimiento normativo', 'Otro sector'] as const;

export interface Department {
  id: string;
  name: string;
  challengeId?: string;   // reto que ha salido de su diagnóstico
  status: 'Diagnóstico enviado' | 'En revisión' | 'Pendiente';
  pains: number;          // problemas detectados en la plantilla (demo)
}

/* 12 departamentos de LABORAL Kutxa (nombres genéricos, demostrativos). */
export const DEPARTMENTS: Department[] = [
  { id: 'empresas', name: 'Banca de Empresas', challengeId: 'tesoreria-pymes', status: 'Diagnóstico enviado', pains: 4 },
  { id: 'particulares', name: 'Banca de Particulares', challengeId: 'mayores-digital', status: 'Diagnóstico enviado', pains: 3 },
  { id: 'autonomos', name: 'Autónomos y Comercios', challengeId: 'relevo-generacional', status: 'Diagnóstico enviado', pains: 3 },
  { id: 'seguros', name: 'Seguros', challengeId: 'seguro-clima', status: 'Diagnóstico enviado', pains: 2 },
  { id: 'riesgos', name: 'Riesgos', status: 'Diagnóstico enviado', pains: 2 },
  { id: 'cumplimiento', name: 'Cumplimiento Normativo', status: 'En revisión', pains: 2 },
  { id: 'tecnologia', name: 'Tecnología y Sistemas', status: 'Diagnóstico enviado', pains: 5 },
  { id: 'operaciones', name: 'Operaciones', status: 'En revisión', pains: 3 },
  { id: 'personas', name: 'Personas', challengeId: 'prevencion-riesgos', status: 'Diagnóstico enviado', pains: 1 },
  { id: 'cliente', name: 'Experiencia de Cliente', status: 'Diagnóstico enviado', pains: 3 },
  { id: 'sostenibilidad', name: 'Sostenibilidad', challengeId: 'huella-carbono', status: 'Diagnóstico enviado', pains: 2 },
  { id: 'innovacion', name: 'Innovación y Open Business', status: 'Pendiente', pains: 0 },
];

/* Plantilla de diagnóstico que rellena cada departamento. */
export const DIAGNOSTIC_TEMPLATE = [
  { id: 'problema', label: '¿Qué problema tenéis hoy?', hint: 'Describe el dolor, no la solución' },
  { id: 'afectados', label: '¿A quién afecta?', hint: 'Clientes, equipos, procesos' },
  { id: 'impacto', label: '¿Qué impacto tiene?', hint: 'Coste, tiempo, riesgo, ingresos' },
  { id: 'urgencia', label: '¿Cuánta urgencia hay?', hint: 'Escala 1–5' },
  { id: 'datos', label: '¿Qué datos o sistemas implica?', hint: 'Para valorar el piloto y el cumplimiento' },
  { id: 'exito', label: '¿Cómo sabríamos que está resuelto?', hint: 'Criterio de éxito medible' },
];

/* Ideas abiertas: startups que no encontraron un reto publicado (demo). */
export interface OpenIdea {
  id: string;
  startup: string;
  sector: string;
  title: string;
  summary: string;
  area: string;
  status: 'Nueva' | 'En revisión' | 'Convertida en reto';
}

export const OPEN_IDEAS: OpenIdea[] = [
  { id: 'i1', startup: 'Ondo AI', sector: 'Banca', title: 'Asistente que explica comisiones y recibos', summary: 'IA conversacional para resolver dudas frecuentes sin ir a la oficina.', area: 'Experiencia de Cliente', status: 'En revisión' },
  { id: 'i2', startup: 'Sare Security', sector: 'Cumplimiento normativo', title: 'Detección temprana de fraude en pagos', summary: 'Modelo de señales de fraude para pagos instantáneos.', area: 'Riesgos', status: 'Nueva' },
];
