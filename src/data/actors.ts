import type { Actor } from './types';
import { APPLICANTS } from './applicants';

/*
 * Actores del ecosistema.
 * - conceptual: true  → institución real usada SOLO como actor conceptual.
 *   No se les atribuyen decisiones, compromisos, presupuestos ni estrategias.
 * - conceptual: false → perfil ficticio (Ejemplo ficticio).
 */
export const ACTORS: Actor[] = [
  {
    id: 'lk', name: 'LABORAL Kutxa', type: 'orquestador', typeLabel: 'Orquestador',
    capabilities: ['finanzas', 'mercado', 'regulacion'],
    role: 'Orquesta el ecosistema, aporta conocimiento financiero y puede actuar como Cliente 0.',
    conceptual: true, teamRole: 'Orquestador · posible Cliente 0',
  },
  {
    id: 'lk-open', name: 'Innovación y Open Business', type: 'unidad', typeLabel: 'Unidad LABORAL Kutxa',
    capabilities: ['emprendimiento', 'mercado'],
    role: 'Gestiona el banco de retos y acompaña el paso por los hitos.',
    conceptual: true, teamRole: 'Venture builder',
  },
  {
    id: 'lagunaro', name: 'Seguros Lagun Aro', type: 'empresa', typeLabel: 'Aseguradora',
    capabilities: ['seguros', 'regulacion', 'datos'],
    role: 'Conocimiento asegurador y posible entorno de piloto en retos de riesgo.',
    conceptual: true, teamRole: 'Experto sectorial seguros',
  },
  {
    id: 'ikerlan', name: 'IKERLAN', type: 'centro', typeLabel: 'Centro tecnológico',
    capabilities: ['ia', 'datos', 'tecnologia'],
    role: 'Investigación aplicada y factibilidad tecnológica.',
    conceptual: true, teamRole: 'Factibilidad tecnológica',
  },
  {
    id: 'uni', name: 'Universidad del ecosistema', type: 'universidad', typeLabel: 'Universidad',
    capabilities: ['ia', 'ux', 'sostenibilidad', 'emprendimiento'],
    role: 'Talento, investigación y proyectos con estudiantes.',
    conceptual: true, teamRole: 'Talento e investigación',
  },
  {
    id: 'bat', name: 'BAT · B Accelerator Tower', type: 'aceleradora', typeLabel: 'Aceleradora',
    capabilities: ['emprendimiento', 'mercado'],
    role: 'Acceso a startups y metodología de aceleración.',
    conceptual: true, teamRole: 'Scouting de startups',
  },
  {
    id: 'gaztenpresa', name: 'Gaztenpresa', type: 'aceleradora', typeLabel: 'Apoyo al emprendimiento',
    capabilities: ['emprendimiento', 'finanzas'],
    role: 'Acompañamiento a personas emprendedoras en la creación de empresas.',
    conceptual: true, teamRole: 'Acompañamiento emprendedor',
  },
  {
    id: 'mondragon', name: 'Cooperativas MONDRAGON', type: 'cooperativa', typeLabel: 'Red cooperativa',
    capabilities: ['mercado', 'tecnologia', 'sostenibilidad'],
    role: 'Usuarios reales, conocimiento industrial y canal de intercooperación.',
    conceptual: true, teamRole: 'Usuarios y canal cooperativo',
  },
  {
    id: 'exp-reg', name: 'Experta en regulación', type: 'experto', typeLabel: 'Experta · Perfil demo',
    capabilities: ['regulacion', 'finanzas'],
    role: 'Perfil ficticio: normativa financiera, protección de datos y uso de IA.',
    conceptual: false, teamRole: 'Compliance',
  },
  {
    id: 'intra', name: 'Intraemprendedora LABORAL Kutxa', type: 'intra', typeLabel: 'Intraemprendedora · Perfil demo',
    capabilities: ['finanzas', 'ux', 'emprendimiento'],
    role: 'Perfil ficticio: persona de banca de empresas que impulsa el proyecto desde dentro.',
    conceptual: false, teamRole: 'Venture lead',
  },
];

export const ALL_ACTORS: Actor[] = [...ACTORS, ...APPLICANTS];
export const actorById = (id: string) => ALL_ACTORS.find((a) => a.id === id)!;
