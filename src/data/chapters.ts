import {
  ClipboardList, Vote, Megaphone, Rocket, Bookmark, Star,
  ShieldCheck, FlaskConical, Gauge, FileSignature, TrendingUp, Sprout, type LucideIcon,
} from 'lucide-react';
import type { StageId } from './types';

/*
 * Presentación en 4 capítulos: resumen del flujo para mostrar en móvil.
 * Cada "beat" es una idea clave con enlace opcional a la pantalla de detalle (ya existente).
 */
export interface Beat {
  Icon: LucideIcon;
  title: string;
  text: string;
  stat?: string;
  detail?: { label: string; path: (id: string) => string };
  /** Mini-visual de la decisión evaluada (solo capítulo del match) */
  evalCard?: { eyebrow: string; cardTitle: string; cardSub: string; encaje: number; action: string; ActionIcon: LucideIcon };
}

export interface Chapter {
  n: number;
  slug: string;
  stage: StageId;
  eyebrow: string;      // etapa(s) del modelo
  title: string;
  lead: string;
  beats: Beat[];
}

export const CHAPTERS: Chapter[] = [
  {
    n: 1, slug: 'reto', stage: 'discover', eyebrow: 'Descubrir · LABORAL Kutxa',
    title: 'El reto',
    lead: 'LABORAL Kutxa detecta sus problemas reales y elige cuáles resolver.',
    beats: [
      { Icon: ClipboardList, title: '12 departamentos diagnostican', text: 'Cada área describe su problema en una plantilla común.', stat: '12 diagnósticos', detail: { label: 'Ver el diagnóstico', path: () => '/laboral-kutxa/diagnostico' } },
      { Icon: Vote, title: 'Se vota y se prioriza', text: 'Se ordenan por impacto, urgencia y alineación.', stat: 'impacto × urgencia', detail: { label: 'Ver la votación', path: () => '/laboral-kutxa/votacion' } },
      { Icon: Megaphone, title: 'Se publica el reto', text: 'Bases y difusión a startups de la UE.', stat: '30.000 € · sin equity', detail: { label: 'Ver la convocatoria', path: (id) => `/reto/${id}/convocatoria` } },
    ],
  },
  {
    n: 2, slug: 'match', stage: 'match', eyebrow: 'Conectar · evaluar y decidir',
    title: 'El match',
    lead: 'Las dos partes se encuentran, pero cada lado evalúa el encaje antes de decidir. No es deslizar: se compara y se elige con criterio.',
    beats: [
      {
        Icon: Rocket, title: 'Lado startup · evalúan los retos',
        text: 'Miran el encaje, las capacidades y el plazo de cada reto antes de postularse.',
        stat: 'encaje → postulación',
        evalCard: { eyebrow: 'RD-01 · Reto', cardTitle: 'Tesorería en PYMEs', cardSub: 'Piloto · 30.000 €', encaje: 93, action: 'Me interesa', ActionIcon: Bookmark },
        detail: { label: 'Probar la experiencia', path: () => '/startup/retos' },
      },
      {
        Icon: Star, title: 'Lado LABORAL Kutxa · evalúan candidaturas',
        text: 'El equipo aplica la rúbrica a cada candidatura: 5 preseleccionadas → pitch → 1–2.',
        stat: '5 → 1–2',
        evalCard: { eyebrow: 'Startup · candidatura', cardTitle: 'Fluxia Analytics', cardSub: 'IA · datos · finanzas', encaje: 88, action: 'Preseleccionar', ActionIcon: Star },
        detail: { label: 'Ver el pitch final', path: (id) => `/reto/${id}/evaluacion` },
      },
    ],
  },
  {
    n: 3, slug: 'piloto', stage: 'pilot', eyebrow: 'Validar · Pilotar',
    title: 'El piloto',
    lead: 'La startup entra como proveedor, valida y hace un piloto pagado real.',
    beats: [
      { Icon: ShieldCheck, title: 'Alta y revisión de seguridad', text: 'Mes 1: proveedor de un banco (DORA, RGPD).', detail: { label: 'Ver el alta', path: (id) => `/reto/${id}/proyecto` } },
      { Icon: FlaskConical, title: '¿Deseable, factible y viable?', text: 'Se contrasta con evidencia: GO, PIVOT o STOP.', stat: 'GO · PIVOT · STOP', detail: { label: 'Ver la validación', path: (id) => `/reto/${id}/validar` } },
      { Icon: Gauge, title: 'Piloto pagado con Cliente 0', text: 'Meses 2–5: el área dueña es el primer cliente.', stat: '30.000 € · 4 meses', detail: { label: 'Ver el piloto', path: (id) => `/reto/${id}/piloto` } },
    ],
  },
  {
    n: 4, slug: 'desenlace', stage: 'scale', eyebrow: 'Crear · Escalar',
    title: 'El desenlace',
    lead: 'Si el piloto funciona, LABORAL Kutxa firma como cliente y la solución escala.',
    beats: [
      { Icon: FileSignature, title: 'Mes 6: ¿venture client?', text: 'LABORAL Kutxa contrata la solución, sin quedarse equity.', stat: '0 % equity', detail: { label: 'Ver la decisión', path: (id) => `/reto/${id}/decision` } },
      { Icon: TrendingUp, title: 'KPIs y acuerdos posventa', text: 'Acompañamiento y métricas durante 12 meses.', detail: { label: 'Ver el escalado', path: (id) => `/reto/${id}/escalar` } },
      { Icon: Sprout, title: 'De un reto a una nueva empresa', text: 'Crece del banco al mercado, con impacto local.' },
    ],
  },
];

export const chapterBySlug = (slug?: string) => CHAPTERS.find((c) => c.slug === slug);
