/* Grafo del ecosistema I&E Bizkaia: nodos, conexiones y geometría. Reutilizado por
 * la pantalla Ecosistema y por el deck de presentación (overview del flujo). */
export const VW = 1200, VH = 760;

export type NodeId = 'ideas' | 'acc' | 'startups' | 'match' | 'impulso' | 'empresas' | 'deps' | 'votacion' | 'innov' | 'kpis';

export const NODES: Record<NodeId, { x: number; y: number; w: number; h: number; label: string; sub?: string; tone: string; shape?: 'circle' | 'cloud' | 'tri' }> = {
  ideas: { x: 40, y: 60, w: 130, h: 64, label: 'Ideas', tone: 'bg-navy-50 text-navy', shape: 'cloud' },
  acc: { x: 430, y: 40, w: 250, h: 100, label: 'Entorno de cooperación', sub: 'Aceleradoras e incubadoras recomiendan INNBULTZADA', tone: 'bg-magenta-100 text-magenta-600' },
  startups: { x: 450, y: 190, w: 210, h: 84, label: 'Startups con MVP en servicios financieros', tone: 'bg-opportunity-100 text-navy' },
  match: { x: 410, y: 320, w: 290, h: 190, label: 'INNBULTZADA', sub: 'Herramienta de matching: problemas ↔ soluciones', tone: 'bg-navy text-white', shape: 'circle' },
  impulso: { x: 830, y: 340, w: 260, h: 140, label: 'Estrategia impulsadora', sub: 'Programa: qué ofrecemos y cuánto dura', tone: 'bg-impact-100 text-impact-600' },
  empresas: { x: 890, y: 610, w: 150, h: 120, label: 'Empresas establecidas', tone: 'bg-impact text-white', shape: 'tri' },
  deps: { x: 60, y: 320, w: 220, h: 110, label: '12 departamentos de LABORAL Kutxa', sub: 'Plantilla de diagnóstico', tone: 'bg-[#e9e3fb] text-[#4b3aa6]' },
  votacion: { x: 60, y: 490, w: 220, h: 84, label: 'Plantilla de votación', sub: 'Identificar, clasificar y priorizar', tone: 'bg-[#fbe8d3] text-[#7a4a12]' },
  innov: { x: 410, y: 560, w: 290, h: 84, label: 'Equipo de innovación de LABORAL Kutxa', tone: 'bg-[#eceafd] text-navy' },
  kpis: { x: 445, y: 676, w: 220, h: 64, label: 'KPIs y acuerdos posventa', tone: 'bg-magenta text-white' },
};

export const c = (id: NodeId, side: 'l' | 'r' | 't' | 'b') => {
  const n = NODES[id];
  return side === 'l' ? [n.x, n.y + n.h / 2] : side === 'r' ? [n.x + n.w, n.y + n.h / 2] : side === 't' ? [n.x + n.w / 2, n.y] : [n.x + n.w / 2, n.y + n.h];
};

export const EDGES: { from: [NodeId, 'l' | 'r' | 't' | 'b']; to: [NodeId, 'l' | 'r' | 't' | 'b'] }[] = [
  { from: ['ideas', 'r'], to: ['acc', 'l'] },
  { from: ['acc', 'b'], to: ['startups', 't'] },
  { from: ['startups', 'b'], to: ['match', 't'] },
  { from: ['match', 'r'], to: ['impulso', 'l'] },
  { from: ['impulso', 'b'], to: ['empresas', 't'] },
  { from: ['deps', 'b'], to: ['votacion', 't'] },
  { from: ['votacion', 'r'], to: ['innov', 'l'] },
  { from: ['innov', 't'], to: ['match', 'b'] },
  { from: ['innov', 'b'], to: ['kpis', 't'] },
];

/* Conexiones de apoyo (discontinuas), con trazado explícito. */
export const DASHED = [
  'M960,340 C960,150 820,90 680,90',
  'M900,480 C880,560 780,602 700,602',
  'M905,720 C600,770 60,760 30,560 C20,440 40,390 60,375',
];
