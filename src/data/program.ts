/*
 * Ficha del programa INNBULTZADA (en diseño).
 * Fuente: ficha de benchmarking facilitada por el equipo del proyecto.
 * Son decisiones de diseño del programa, pendientes de validación interna.
 */

export const PROGRAM = {
  status: 'En diseño',
  country: 'España · Euskadi',
  scope: 'Opera en la zona de actuación de LABORAL Kutxa y está abierta a startups de toda España y la UE.',
  focus: 'Open innovation con modelo venture client para banca: fintech, insurtech, regtech y tecnología aplicada a la operativa del banco (IA, ciberseguridad, sostenibilidad). Parte de retos reales de LABORAL Kutxa, no de ideas libres.',
  focusTags: ['Fintech', 'Insurtech', 'Regtech', 'IA', 'Ciberseguridad', 'Sostenibilidad'],
  type: 'Aceleración',
  typeNote: 'La incubación de proyectos tempranos se deriva a Gaztenpresa (esquema «tipo ascensor»).',
  funding: {
    headline: '30.000 €',
    label: 'Contrato de piloto pagado por startup',
    equity: 'Sin equity: LABORAL Kutxa no se queda con % de la empresa',
    inKind: ['Licencias', 'Créditos cloud', 'Certificaciones', 'Acceso preferente a productos financieros de LABORAL Kutxa'],
  },
  eligibility: [
    'Startups y scaleups constituidas',
    'Con MVP',
    'Hasta 8 años de antigüedad',
    'Solución que encaje con un reto de LABORAL Kutxa',
    'Prioridad Euskadi y Navarra',
  ],
  channels: ['Redes alumni', 'Universidades', 'IKERLAN', 'Bootcamps', 'Radar de Retos'],
  selection: [
    { n: 1, label: 'Publicación del reto', note: 'Bases del llamado' },
    { n: 2, label: 'Postulación', note: 'Abierta a España y la UE' },
    { n: 3, label: 'Primer filtro', note: 'Equipo evaluador: Innovación + área de LABORAL Kutxa dueña del reto' },
    { n: 4, label: '5 preseleccionadas', note: 'Según la rúbrica' },
    { n: 5, label: 'Pitch final', note: 'Formato tipo «Shark Tank»' },
    { n: 6, label: '1–2 elegidas', note: 'Para impulsar con piloto pagado' },
  ],
  rubric: [
    { id: 'encaje', label: 'Encaje con el reto', weight: 30 },
    { id: 'tecnica', label: 'Madurez técnica y seguridad', weight: 20 },
    { id: 'equipo', label: 'Equipo', weight: 20 },
    { id: 'escalabilidad', label: 'Escalabilidad', weight: 15 },
    { id: 'regulatoria', label: 'Viabilidad regulatoria', weight: 15 },
  ],
  kpis: [
    { label: 'Pilotos convertidos en contrato', target: 'Objetivo > 70 %' },
    { label: 'Tiempo del reto al inicio del piloto', target: 'A medir' },
    { label: 'Ahorro o ingresos para LABORAL Kutxa', target: 'A medir' },
    { label: 'Empleo creado', target: 'A medir' },
    { label: 'Financiación levantada por la startup', target: 'A medir' },
  ],
  duration: {
    total: '6 meses, prorrogables',
    phases: [
      { months: 1, label: 'Alta como proveedor y revisión de seguridad' },
      { months: 4, label: 'Piloto' },
      { months: 1, label: 'Evaluación y decisión' },
    ],
  },
  offers: [
    'Co-creación con el área dueña del reto',
    'Mentoría de expertos de LABORAL Kutxa: riesgos, cumplimiento, tecnología y negocio',
    'Entorno de pruebas con datos anonimizados',
    'Apoyo legal',
    'Financiación en especie',
    'Conexión con el ecosistema de innovación: BIND, BAT, MONDRAGON',
    'Demo Day',
  ],
  post: [
    'Si el piloto funciona, LABORAL Kutxa firma como cliente: la solución se integra en LABORAL Kutxa o queda como proveedor',
    'Acompañamiento posventa',
    'Medición de KPIs durante 12 meses',
    'Entrada en el pool de empresas solución y en la red alumni',
    'Conexión con Mondragon Promoción si buscan inversión',
  ],
  lkGains: [
    'Resolver necesidades reales más rápido y barato que desarrollándolas internamente',
    'Acceso temprano a tecnología',
    'Proveedores locales',
    'Imagen de banca innovadora',
    'Cumplimiento de la misión cooperativa: empleo y desarrollo del territorio',
  ],
  legal: {
    viability: 'Alta',
    note: 'A revisar con Cumplimiento',
    items: [
      { title: 'Externalización y DORA', text: 'Normativa de externalización y reglamento DORA (aplicable desde enero de 2025) para contratar proveedores tecnológicos.' },
      { title: 'RGPD', text: 'Pilotos con datos anonimizados o sintéticos.' },
      { title: 'Propiedad intelectual', text: 'Acuerdo previo sobre lo co-creado.' },
      { title: 'Servicios regulados', text: 'Si la startup presta un servicio financiero regulado: licencia del Banco de España o la CNMV. El sandbox financiero español es una vía.' },
    ],
  },
  links: 'Pendiente (en diseño)',
} as const;
