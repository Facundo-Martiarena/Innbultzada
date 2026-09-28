import {
  BrainCircuit, Briefcase, Building2, Cpu, Database, FastForward, FlaskConical, Gauge, GraduationCap,
  Handshake, Landmark, Leaf, Microscope, Network, PencilRuler, Rocket, Search, ShieldCheck, Sprout,
  Store, TrendingUp, Umbrella, UserRound, UserRoundCheck, Waypoints, type LucideIcon,
} from 'lucide-react';
import type { ActorType, CapabilityId, StageId } from '../data/types';

/* Iconografía única del prototipo (lucide, trazo 1.75). */
export const STROKE = 1.75;

export const STAGE_ICON: Record<StageId, LucideIcon> = {
  discover: Search, match: Waypoints, validate: FlaskConical, pilot: Gauge, venture: Sprout, scale: TrendingUp,
};

export const CAPABILITY_ICON: Record<CapabilityId, LucideIcon> = {
  tecnologia: Cpu, ia: BrainCircuit, datos: Database, ux: PencilRuler, regulacion: ShieldCheck,
  finanzas: Landmark, seguros: Umbrella, sostenibilidad: Leaf, emprendimiento: Rocket, mercado: Store,
};

export const ACTOR_ICON: Record<ActorType, LucideIcon> = {
  orquestador: Network, unidad: Building2, startup: Rocket, centro: Microscope, universidad: GraduationCap,
  aceleradora: FastForward, experto: UserRoundCheck, intra: UserRound, empresa: Briefcase, cooperativa: Handshake,
};
