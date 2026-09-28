import {
  ClipboardList, Vote, Lightbulb, Network, Rocket, Waypoints, Users, Gift, Building2, Target,
  FileText, Check, Scale, Landmark, RefreshCw, TrendingUp, type LucideIcon,
} from 'lucide-react';

/*
 * Deck principal de la presentación = el flujo del ecosistema.
 * Slide 1 = overview (el diagrama completo); luego una slide por cada ítem, en orden.
 * Cada slug de ítem coincide con el id del nodo del diagrama (para poder saltar desde el overview).
 * Contenido: BORRADOR para refinar.
 */
export interface SectionBeat {
  Icon: LucideIcon;
  title: string;
  text: string;
  stat?: string;
}

export interface Section {
  n: number;
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  beats: SectionBeat[];
  cta?: { label: string; to: string };
  loop?: boolean;
  diagram?: boolean;
}

export const SECTIONS: Section[] = [
  {
    n: 1, slug: 'flujo', eyebrow: 'El ecosistema', title: 'El flujo completo',
    lead: 'Así se conecta todo: de la necesidad y la idea, a nuevas empresas arraigadas. Tocá cada bloque para recorrerlo.',
    beats: [], diagram: true,
  },
  {
    n: 2, slug: 'deps', eyebrow: '01 · La necesidad', title: '12 departamentos diagnostican',
    lead: 'La necesidad nace adentro: cada área describe su problema.',
    beats: [
      { Icon: ClipboardList, title: 'Plantilla común', text: 'Mismo formato para todos, así se pueden comparar.', stat: '12 áreas' },
      { Icon: FileText, title: 'Qué describe', text: 'Problema, a quién afecta, impacto, urgencia y criterio de éxito.' },
    ],
    cta: { label: 'Ver el diagnóstico', to: '/laboral-kutxa/diagnostico' },
  },
  {
    n: 3, slug: 'votacion', eyebrow: '02 · Priorizar', title: 'Plantilla de votación',
    lead: 'De muchos problemas, se elige cuál vale la pena resolver.',
    beats: [
      { Icon: Vote, title: 'Identificar y clasificar', text: 'Los problemas con más apoyo, ordenados por ámbito.' },
      { Icon: Target, title: 'Priorizar', text: 'Por impacto, urgencia y alineación estratégica.' },
    ],
    cta: { label: 'Ver la votación', to: '/laboral-kutxa/votacion' },
  },
  {
    n: 4, slug: 'ideas', eyebrow: '03 · La chispa', title: 'Todo empieza con una idea',
    lead: 'La otra puerta de entrada al sistema.',
    beats: [
      { Icon: Lightbulb, title: 'Desde una startup', text: 'Que ya tiene una solución para probar.' },
      { Icon: Building2, title: 'Desde un departamento', text: 'Una necesidad interna que busca respuesta.' },
    ],
  },
  {
    n: 5, slug: 'acc', eyebrow: '04 · La puerta', title: 'Red de aceleradoras e incubadoras',
    lead: 'Las startups llegan recomendadas por el ecosistema I&E Bizkaia.',
    beats: [
      { Icon: Network, title: 'Recomiendan INNBULTZADA', text: 'Aceleradoras e incubadoras de la red.' },
      { Icon: Check, title: 'Primer filtro', text: 'Servicios financieros + MVP; los tempranos, a Gaztenpresa.' },
    ],
    cta: { label: 'Ver el acceso', to: '/startup/acceso' },
  },
  {
    n: 6, slug: 'startups', eyebrow: '05 · La oferta', title: 'Startups con MVP',
    lead: 'La oferta: soluciones listas para pilotar.',
    beats: [
      { Icon: Rocket, title: 'Con MVP', text: 'Constituidas, con producto y hasta 8 años.' },
      { Icon: Landmark, title: 'En servicios financieros', text: 'Banca, seguros, pagos…' },
    ],
    cta: { label: 'Ver los retos', to: '/startup/retos' },
  },
  {
    n: 7, slug: 'match', eyebrow: '06 · El corazón', title: 'INNBULTZADA · el matching',
    lead: 'La herramienta que conecta problemas con soluciones.',
    beats: [
      { Icon: Waypoints, title: 'Conecta capacidades', text: 'Lo que busca el reto ↔ lo que aporta la startup.' },
      { Icon: Scale, title: 'Con una rúbrica', text: 'Encaje 30 % · técnica 20 % · equipo 20 % · escala 15 % · regulatoria 15 %.' },
    ],
    cta: { label: 'Ver el prototipo navegable', to: '/capitulo/reto' },
  },
  {
    n: 8, slug: 'innov', eyebrow: '07 · Quién opera', title: 'Equipo de innovación',
    lead: 'El lado del banco que hace funcionar el sistema.',
    beats: [
      { Icon: Users, title: 'Publica y filtra', text: 'Abre retos, revisa candidaturas, preselecciona 5.' },
      { Icon: Check, title: 'Acompaña y mide', text: 'Organiza el pitch, sigue el programa y los KPIs.' },
    ],
  },
  {
    n: 9, slug: 'impulso', eyebrow: '08 · El programa', title: 'Estrategia impulsadora',
    lead: 'Qué ofrece el programa y cuánto dura.',
    beats: [
      { Icon: Gift, title: 'Piloto pagado', text: '30.000 € por startup, sin equity, más mentoría y sandbox.', stat: 'sin equity' },
      { Icon: RefreshCw, title: 'Duración', text: '6 meses (1 alta · 4 piloto · 1 decisión) + 12 de KPIs.' },
    ],
    cta: { label: 'Ver la ficha del programa', to: '/programa' },
  },
  {
    n: 10, slug: 'empresas', eyebrow: '09 · El resultado', title: 'Empresas establecidas',
    lead: 'Soluciones que se quedan y cierran el ciclo.',
    beats: [
      { Icon: Building2, title: 'Cliente o integración', text: 'Proveedores de LABORAL Kutxa o solución integrada.' },
      { Icon: RefreshCw, title: 'Cierra el ciclo', text: 'Cubren las necesidades de los departamentos.' },
    ],
    loop: true,
  },
  {
    n: 11, slug: 'kpis', eyebrow: '10 · La medida', title: 'KPIs y acuerdos posventa',
    lead: 'Se mide el impacto durante 12 meses.',
    beats: [
      { Icon: Target, title: 'Conversión y adopción', text: 'Pilotos que llegan a contrato y uso real.' },
      { Icon: TrendingUp, title: 'Impacto territorial', text: 'Empleo y empresas arraigadas en la región.' },
    ],
  },
];

export const sectionBySlug = (slug?: string) => SECTIONS.find((s) => s.slug === slug);
