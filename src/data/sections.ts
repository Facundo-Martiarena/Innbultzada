import type { LucideIcon } from 'lucide-react';

/*
 * Deck principal = las 9 slides oficiales (imágenes), en el orden del documento.
 * Cada slide es una imagen full-bleed (public/brand/slide-N.png) con la misma dinámica
 * (flecha, swipe, pantalla completa, progreso). La slide "La herramienta" enlaza al prototipo.
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
  cover?: string;
  video?: string;   // si está, la slide reproduce este video (cover = poster)
  lkLogo?: boolean; // si está, se superpone el logo de LABORAL Kutxa arriba-izquierda
}

export const SECTIONS: Section[] = [
  { n: 1, slug: 'portada', eyebrow: '', title: 'Portada', lead: '', beats: [], cover: 'slide-1.png' },
  { n: 2, slug: 'oportunidad', eyebrow: '', title: 'La oportunidad', lead: '', beats: [], cover: 'slide-2.png', lkLogo: true },
  { n: 3, slug: 'pregunta', eyebrow: '', title: 'La pregunta', lead: '', beats: [], cover: 'slide-3.png', lkLogo: true },
  { n: 4, slug: 'actores', eyebrow: '', title: 'Actores claves', lead: '', beats: [], cover: 'slide-4.png', lkLogo: true },
  { n: 5, slug: 'diagnostico', eyebrow: '', title: 'Diagnóstico', lead: '', beats: [], cover: 'slide-5.png', lkLogo: true },
  { n: 6, slug: 'entorno', eyebrow: '', title: 'Entorno de cooperación', lead: '', beats: [], cover: 'slide-6.png', video: 'Duvan_aceleradoras.mp4', lkLogo: true },
  { n: 7, slug: 'proposito', eyebrow: '', title: 'Innovación con propósito', lead: '', beats: [], cover: 'slide-7.png', lkLogo: true },
  { n: 8, slug: 'herramienta', eyebrow: '', title: 'La herramienta', lead: '', beats: [], cover: 'slide-7.1.png', cta: { label: 'Ver el prototipo navegable', to: '/capitulo/reto' }, lkLogo: true },
  { n: 9, slug: 'modelo', eyebrow: '', title: 'El modelo', lead: '', beats: [], cover: 'slide-8.png', lkLogo: true },
  { n: 10, slug: 'conclusiones', eyebrow: '', title: 'Conclusiones', lead: '', beats: [], cover: 'slide-9.png', lkLogo: true },
  { n: 11, slug: 'cierre', eyebrow: '', title: 'Cierre', lead: '', beats: [], cover: 'slide-10.png' },
];

export const sectionBySlug = (slug?: string) => SECTIONS.find((s) => s.slug === slug);
