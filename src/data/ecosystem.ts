/*
 * Ecosistema I&E Bizkaia: red de aceleradoras, departamentos de LABORAL Kutxa e ideas abiertas.
 * Instituciones reales = actores conceptuales (sin partnerships confirmados).
 * Departamentos e ideas = ejemplos demostrativos.
 */

export type AcceleratorKind =
  | 'Aceleradora corporativa'
  | 'Incubadora y aceleradora'
  | 'Red de incubadoras'
  | 'Venture builder'
  | 'Aceleradora universitaria'
  | 'Agencia pública de emprendimiento';

export interface Accelerator {
  id: string;
  name: string;
  pais: string;              // ubicación real
  kind: AcceleratorKind;     // tipo de actor
  tipo: 'AC' | 'INC/AC';     // incubación / aceleración (columna del benchmark)
  enfoque: string;           // a qué apunta (resumen del benchmark real)
  link: string;              // web oficial del programa
}

/*
 * Benchmark real del ecosistema de aceleración e incubación de Euskadi / España
 * (fuente: sources/Comparación aceleradoras.xlsx › Hoja 1). Actores conceptuales
 * de referencia: sin partnerships confirmados con INNBULTZADA.
 */
export const ACCELERATORS: Accelerator[] = [
  { id: 'bind', name: 'BIND (BIND 4.0)', pais: 'España · Euskadi', kind: 'Aceleradora corporativa', tipo: 'AC', enfoque: 'Open Innovation y Venture Client: conecta startups con corporaciones y sector público para pilotos reales.', link: 'https://bind.spri.eus/es/startup-programmes/' },
  { id: 'redbics', name: 'Red BICs de Euskadi', pais: 'España · Euskadi', kind: 'Red de incubadoras', tipo: 'INC/AC', enfoque: 'Incubación y maduración de proyectos de base tecnológica (programa Ekintzaile).', link: 'https://www.spri.eus/es/ayudas/ekintzaile/' },
  { id: 'berriup', name: 'BerriUp', pais: 'España · Euskadi', kind: 'Incubadora y aceleradora', tipo: 'INC/AC', enfoque: 'Aceleración de startups early-stage innovadoras y escalables.', link: 'https://berriup.com/programa-de-aceleracion/' },
  { id: 'batbacc', name: 'BAT BACC (Torre BAT)', pais: 'España · Bilbao', kind: 'Aceleradora corporativa', tipo: 'AC', enfoque: 'Open Innovation, corporate challenges y aterrizaje internacional en el ecosistema BAT.', link: 'https://bacceleratortower.com/programas/' },
  { id: 'mondragon', name: 'Mondragon Promoción Empresarial', pais: 'España · Euskadi', kind: 'Venture builder', tipo: 'INC/AC', enfoque: 'Venture building + Corporate VC + socio industrial y de mercado del Grupo Mondragon.', link: 'https://www.mondragon-corporation.com/ventures/' },
  { id: 'ceia', name: 'CEIA (Centro de Empresas e Innovación de Álava)', pais: 'España · Álava', kind: 'Incubadora y aceleradora', tipo: 'INC/AC', enfoque: 'Incubación y apoyo integral al emprendimiento innovador y tecnológico en Álava.', link: 'https://bicaraba.eus/' },
  { id: 'ieteam', name: 'IE Team Acceleration', pais: 'España · Madrid', kind: 'Aceleradora universitaria', tipo: 'INC/AC', enfoque: 'Aceleración universitaria: validación, prototipado, product-market fit y preparación para inversión.', link: 'https://ieconnects.ie.edu/ieeic/venture-lab/' },
  { id: 'mta', name: 'MTA · Mondragon Team Academy', pais: 'España · Euskadi', kind: 'Aceleradora universitaria', tipo: 'INC/AC', enfoque: 'Emprendimiento en equipo y learning by doing: formación de teampreneurs con proyectos reales.', link: 'https://mondragonteamacademy.com/es' },
  { id: 'bilbaoekintza', name: 'Bilbao Ekintza', pais: 'España · Bilbao', kind: 'Agencia pública de emprendimiento', tipo: 'INC/AC', enfoque: 'Incubadoras municipales, creación de empresas y desarrollo económico local.', link: 'https://www.bilbaoekintza.eus/emprende' },
  { id: 'fomentoss', name: 'Fomento de San Sebastián', pais: 'España · Donostia', kind: 'Agencia pública de emprendimiento', tipo: 'INC/AC', enfoque: 'Ecosistema municipal para crear, acelerar y consolidar proyectos innovadores.', link: 'https://www.fomentosansebastian.eus/es/oportunidades-para-emprender/' },
  { id: 'zitek', name: 'ZITEK (UPV/EHU)', pais: 'España · Bizkaia', kind: 'Aceleradora universitaria', tipo: 'INC/AC', enfoque: 'Emprendimiento universitario y transferencia de conocimiento de la comunidad UPV/EHU.', link: 'https://www.ehu.eus/es/web/enpresa/emprendimiento' },
  { id: 'ekinn', name: 'EKINN+ (Fomento San Sebastián)', pais: 'España · Donostia', kind: 'Agencia pública de emprendimiento', tipo: 'INC/AC', enfoque: 'Impulso a nuevas iniciativas innovadoras: ayudas para aceleración y puesta en marcha.', link: 'https://ayudas.fomentosansebastian.eus/es/apoyo-a-empresas/ayudas-economicas/' },
  { id: 'lanzadera', name: 'LANZADERA', pais: 'España · Valencia', kind: 'Incubadora y aceleradora', tipo: 'INC/AC', enfoque: 'Incubación/aceleración orientada a objetivos, basada en el modelo de gestión de Calidad Total.', link: 'https://lanzadera.es/aceleradora-e-incubadora-empresas/' },
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
