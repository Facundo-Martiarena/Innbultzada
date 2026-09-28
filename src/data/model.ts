import type { Capability, Milestone, OutcomeId, Stage, StageId } from './types';

/* El modelo INNBULTZADA: seis etapas. Se avanza por evidencias, no por calendario. */
export const STAGES: Stage[] = [
  {
    id: 'discover', en: 'DISCOVER', es: 'Descubrir',
    question: '¿Qué necesidad real merece resolverse?',
    description: 'Los 12 departamentos de LABORAL Kutxa diagnostican sus problemas con una plantilla; se votan, clasifican y priorizan, y los prioritarios se publican como retos.',
    gate: 'Reto priorizado, Challenge Owner asignado y convocatoria publicada.',
  },
  {
    id: 'match', en: 'MATCH', es: 'Conectar',
    question: '¿Quién en el ecosistema puede resolverlo?',
    description: 'Las startups llegan recomendadas por su aceleradora, se postulan a los retos o proponen su idea. El equipo de innovación preselecciona 5 y, tras el pitch final, elige 1–2.',
    gate: '1–2 finalistas evaluadas y Venture Team formado.',
  },
  {
    id: 'validate', en: 'VALIDATE', es: 'Validar',
    question: '¿Es deseable, factible y viable?',
    description: 'El equipo convierte supuestos en hipótesis y las contrasta con experimentos rápidos y baratos.',
    gate: 'Evidencia suficiente en deseabilidad, factibilidad y viabilidad. Decisión GO / PIVOT / STOP.',
  },
  {
    id: 'pilot', en: 'PILOT', es: 'Pilotar',
    question: '¿Funciona en un entorno real?',
    description: 'Piloto pagado de 4 meses con el área de LABORAL Kutxa dueña del reto como Cliente 0, en un entorno de pruebas con datos anonimizados.',
    gate: 'Métricas del piloto dentro de los criterios de éxito acordados con el Challenge Owner.',
  },
  {
    id: 'venture', en: 'VENTURE', es: 'Crear',
    question: '¿Cuál es el mejor vehículo para capturar el valor?',
    description: 'Mes 6: evaluación y decisión. Si el piloto funciona, LABORAL Kutxa firma como cliente: la solución se integra en LABORAL Kutxa o queda como proveedor. LABORAL Kutxa no toma equity.',
    gate: 'Decisión tomada con los KPIs del piloto.',
  },
  {
    id: 'scale', en: 'SCALE', es: 'Escalar',
    question: '¿Cómo llega a más clientes y genera impacto?',
    description: 'Post-programa: acompañamiento posventa, KPIs durante 12 meses, pool de empresas solución, red alumni y conexión con Mondragon Promoción si buscan inversión.',
    gate: 'KPIs a 12 meses y primer cliente externo.',
  },
];

export const stageIndex = (id: StageId) => STAGES.findIndex((s) => s.id === id);
export const stageById = (id: StageId) => STAGES[stageIndex(id)];

export const CAPABILITIES: Capability[] = [
  { id: 'tecnologia', name: 'Tecnología', short: 'Desarrollo e integración de software' },
  { id: 'ia', name: 'Inteligencia artificial', short: 'Modelos predictivos y generativos' },
  { id: 'datos', name: 'Datos', short: 'Ingeniería, calidad y gobierno del dato' },
  { id: 'ux', name: 'UX y diseño de servicio', short: 'Investigación con usuarios y prototipado' },
  { id: 'regulacion', name: 'Regulación y compliance', short: 'Encaje normativo y riesgos' },
  { id: 'finanzas', name: 'Conocimiento financiero', short: 'Producto, riesgo y negocio bancario' },
  { id: 'seguros', name: 'Conocimiento asegurador', short: 'Riesgos, producto y siniestralidad' },
  { id: 'sostenibilidad', name: 'Sostenibilidad', short: 'Medición de impacto ambiental' },
  { id: 'emprendimiento', name: 'Emprendimiento', short: 'Modelo de negocio y creación de empresas' },
  { id: 'mercado', name: 'Acceso a mercado', short: 'Canal, clientes y primeras ventas' },
];

export const capabilityById = (id: string) => CAPABILITIES.find((c) => c.id === id)!;

/* Pasaporte INNBULTZADA: hitos que un proyecto acredita con evidencias. */
export const MILESTONES: Milestone[] = [
  { id: 'owner', label: 'Challenge Owner', stage: 'discover', evidence: 'Área de LABORAL Kutxa dueña del reto asignada' },
  { id: 'call', label: 'Reto publicado', stage: 'discover', evidence: 'Bases del llamado publicadas' },
  { id: 'shortlist', label: '5 preseleccionadas', stage: 'match', evidence: 'Primer filtro del equipo evaluador' },
  { id: 'pitch', label: 'Elegida en el pitch final', stage: 'match', evidence: 'Rúbrica del jurado tipo «Shark Tank»' },
  { id: 'onboarding', label: 'Alta y revisión de seguridad', stage: 'validate', evidence: 'Proveedor dado de alta · DORA · RGPD · PI' },
  { id: 'hypothesis', label: 'Hipótesis validadas', stage: 'validate', evidence: 'Deseable, factible y viable' },
  { id: 'pilot', label: 'Piloto pagado en marcha', stage: 'pilot', evidence: '30.000 € · sandbox con datos anonimizados' },
  { id: 'kpis', label: 'KPIs del piloto', stage: 'pilot', evidence: 'Criterios de éxito del reto alcanzados' },
  { id: 'decision', label: 'LABORAL Kutxa firma como cliente', stage: 'venture', evidence: 'Se integra en LABORAL Kutxa o queda como proveedor' },
  { id: 'demoday', label: 'Demo Day', stage: 'venture', evidence: 'Presentación de resultados al ecosistema' },
  { id: 'followup', label: 'KPIs a 12 meses', stage: 'scale', evidence: 'Acompañamiento posventa y medición' },
  { id: 'external', label: 'Primer cliente externo', stage: 'scale', evidence: 'Escala fuera de LABORAL Kutxa · pool y alumni' },
];

export const OUTCOMES: {
  id: OutcomeId; en: string; es: string; summary: string; when: string[]; result: string;
}[] = [
  {
    id: 'buy', en: 'VENTURE CLIENT', es: 'LABORAL Kutxa firma como cliente',
    summary: 'El piloto funciona y LABORAL Kutxa contrata la solución: la startup queda como proveedor.',
    when: ['KPIs del piloto alcanzados', 'Encaje con la operativa del área', 'Revisión de seguridad superada'],
    result: 'Contrato de proveedor y acompañamiento posventa.',
  },
  {
    id: 'integrate', en: 'INTEGRATE', es: 'Integrar en LABORAL Kutxa',
    summary: 'La solución se incorpora dentro de LABORAL Kutxa (licencia, co-desarrollo o integración).',
    when: ['El valor es sobre todo interno', 'Encaja en procesos y sistemas', 'Conviene operarlo dentro'],
    result: 'Nueva capacidad o servicio dentro de LABORAL Kutxa.',
  },
  {
    id: 'partner', en: 'PARTNER', es: 'Colaborar',
    summary: 'Se sigue desarrollando junto a un partner del ecosistema (MONDRAGON, BIND, BAT…).',
    when: ['Capacidades complementarias', 'Riesgo o inversión a compartir', 'Canal conjunto hacia clientes'],
    result: 'Alianza o co-desarrollo.',
  },
  {
    id: 'venture', en: 'SCALE-UP', es: 'Impulsar la empresa',
    summary: 'La startup escala con apoyo del ecosistema; si busca inversión, conexión con Mondragon Promoción.',
    when: ['Mercado más allá de LABORAL Kutxa', 'Equipo comprometido', 'Modelo escalable'],
    result: 'Crecimiento con apoyos del ecosistema. LABORAL Kutxa no toma equity.',
  },
];

export const VENTURE_SUPPORTS = [
  { id: 'equipo', label: 'Co-creación', text: 'Trabajo conjunto con el área dueña del reto', from: 'Venture Team' },
  { id: 'financiacion', label: 'Inversión', text: 'Si buscan inversión', from: 'Mondragon Promoción' },
  { id: 'pi', label: 'Propiedad intelectual', text: 'Acuerdo previo sobre lo co-creado', from: 'Apoyo legal del programa' },
  { id: 'mercado', label: 'Mercado', text: 'Pool de empresas solución y red alumni', from: 'LABORAL Kutxa, BIND, BAT y MONDRAGON' },
  { id: 'mentoring', label: 'Mentoría', text: 'Riesgos, cumplimiento, tecnología y negocio', from: 'Expertos de LABORAL Kutxa' },
  { id: 'tecnologia', label: 'Tecnología', text: 'Transferencia y evolución del MVP', from: 'Centros tecnológicos y universidades' },
  { id: 'ventas', label: 'Primeras ventas', text: 'Contrato con LABORAL Kutxa tras el piloto', from: 'LABORAL Kutxa como venture client · Demo Day' },
];

export const CLIENT0_CANDIDATES = [
  { id: 'lk', name: 'LABORAL Kutxa', kind: 'Área dueña del reto · venture client', note: 'Pilota la solución en su operativa con datos anonimizados y decide si firma como cliente.' },
  { id: 'lagunaro', name: 'Seguros Lagun Aro', kind: 'Aseguradora', note: 'Entorno para soluciones de riesgo, prevención y seguros.' },
  { id: 'coop', name: 'Cooperativa MONDRAGON', kind: 'Cooperativa industrial', note: 'Entorno real de operación, personas socias y procesos.' },
  { id: 'pyme', name: 'PYMEs clientes', kind: 'Empresas clientes', note: 'Usuarios finales con necesidades reales y medibles.' },
];

export const SCALE_RINGS = [
  { id: 'c0', label: 'Cliente 0', text: 'Piloto controlado' },
  { id: 'mondragon', label: 'MONDRAGON', text: 'Red cooperativa e intercooperación' },
  { id: 'clientes', label: 'Empresas clientes', text: 'PYMEs y empresas de la red' },
  { id: 'euskadi', label: 'Euskadi', text: 'Ecosistema territorial' },
  { id: 'global', label: 'Nacional / internacional', text: 'Nuevos mercados' },
];

export const IMPACTS = [
  { id: 'empresas', label: 'Nuevas empresas', kpi: 'Nº de ventures creadas' },
  { id: 'negocios', label: 'Nuevos negocios', kpi: 'Ingresos de nuevas líneas' },
  { id: 'empleo', label: 'Empleo de calidad', kpi: 'Puestos cualificados creados' },
  { id: 'arraigo', label: 'Arraigo', kpi: 'Actividad y talento que se quedan en el territorio' },
  { id: 'intercoop', label: 'Intercooperación', kpi: 'Proyectos entre cooperativas' },
  { id: 'innovacion', label: 'Innovación', kpi: 'Soluciones validadas y adoptadas' },
  { id: 'territorio', label: 'Impacto territorial', kpi: 'Empresas y personas beneficiadas' },
];
