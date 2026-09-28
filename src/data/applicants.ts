import type { Actor, CapabilityId } from './types';

/*
 * Startups que se postulan a las convocatorias.
 * TODAS son ejemplos ficticios (nombres, datos y propuestas inventados).
 */
export interface Applicant extends Actor {
  specialty: string;   // cómo describen su especialidad
  pitch: string;       // propuesta para el reto
  trl: number;         // madurez tecnológica (1–9)
  teamSize: number;
  city: string;
  traction: string;
  /** Ajustes de evaluación del ejemplo (1–5), dato demostrativo */
  founded: number;     // año de constitución
  mvp: boolean;        // tiene MVP
  evalHint?: Partial<Record<'encaje' | 'tecnica' | 'equipo' | 'escalabilidad' | 'regulatoria', number>>;
}

const s = (
  id: string, name: string, capabilities: CapabilityId[], specialty: string, pitch: string,
  trl: number, teamSize: number, city: string, traction: string, teamRole = 'Startup seleccionada', founded = 2021, mvp = true,
): Applicant => ({
  id, name, type: 'startup', typeLabel: 'Startup · Ejemplo ficticio', capabilities,
  role: specialty, conceptual: false, teamRole, specialty, pitch, trl, teamSize, city, traction, founded, mvp,
});

export const APPLICANTS: Applicant[] = [
  s('st-flux', 'Fluxia Analytics', ['ia', 'datos', 'finanzas'],
    'Modelos predictivos de flujo de caja sobre datos transaccionales.',
    'Alertas semanales de tesorería con explicación de causas y acciones sugeridas.',
    6, 9, 'Donostia', '3 pilotos con gestorías', 'Tech lead · IA y datos', 2021),
  s('st-kide', 'Kide Studio', ['ux', 'tecnologia'],
    'Diseño de servicios digitales centrados en personas.',
    'Diseñar la experiencia de alerta con gerentes de PYME y gestorías.',
    7, 6, 'Bilbao', 'Clientes en banca y utilities', 'Diseño de servicio', 2019),
  s('st-arau', 'Araudia RegTech', ['regulacion', 'datos', 'ia'],
    'Cumplimiento normativo automatizado para productos financieros con IA.',
    'Marco de explicabilidad y consentimiento para alertas basadas en datos.',
    6, 5, 'Vitoria-Gasteiz', 'Producto en 2 entidades', 'Compliance by design', 2022),
  s('st-lan', 'Lanbide Data', ['datos', 'tecnologia'],
    'Ingeniería de datos y conectores con ERPs de pequeñas empresas.',
    'Conectar contabilidad de la PYME para enriquecer la predicción.',
    7, 12, 'Arrasate', '40 integraciones ERP', 'Integración de datos', 2015),
  s('st-kont', 'Kontua', ['finanzas', 'ux', 'mercado'],
    'App de gestión financiera para autónomos y micropymes.',
    'Integrar la alerta en una app que ya usan miles de autónomos.',
    8, 15, 'Pamplona', '12.000 usuarios activos', 'Canal y producto', 2020),
  s('st-verda', 'Verda Labs', ['sostenibilidad', 'datos', 'tecnologia'],
    'Medición de huella de carbono para cadenas de suministro.',
    'Añadir indicadores de riesgo climático a la salud financiera.',
    6, 7, 'Bilbao', 'Plataforma en 30 PYMEs', 'Tech lead sostenibilidad', 2021),
  s('st-ondo', 'Ondo AI', ['ia', 'tecnologia'],
    'IA generativa para atención al cliente.',
    'Asistente conversacional que explica las alertas al gerente.',
    5, 4, 'Madrid', 'Piloto en retail', 'IA conversacional', 2023),
  s('st-bide', 'Bidea Ventures Lab', ['emprendimiento', 'mercado'],
    'Estudio de venture building y go-to-market B2B.',
    'Diseñar el modelo de negocio y el canal a gestorías.',
    4, 5, 'Barcelona', '5 ventures lanzadas', 'Modelo de negocio', 2024, false),
  s('st-sare', 'Sare Security', ['tecnologia', 'regulacion'],
    'Ciberseguridad y privacidad para servicios financieros.',
    'Arquitectura segura y privada para el tratamiento de datos.',
    7, 10, 'Donostia', 'Certificaciones de seguridad', 'Seguridad y privacidad', 2018),
  s('st-gela', 'Gela Insights', ['datos', 'ux', 'ia'],
    'Analítica de comportamiento y segmentación de clientes.',
    'Detectar qué PYMEs se benefician más de la alerta.',
    6, 8, 'Lisboa', 'Clientes en seguros', 'Analítica de clientes', 2022),
  s('st-euri', 'Euria Climate', ['sostenibilidad', 'seguros', 'datos'],
    'Datos climáticos para seguros paramétricos.',
    'Aportar datos climáticos para anticipar riesgos del cliente.',
    6, 6, 'Vitoria-Gasteiz', '2 aseguradoras piloto', 'Startup seleccionada', 2022),
  s('st-hurr', 'Hurrengo', ['ux', 'emprendimiento'],
    'Programas de alfabetización digital para personas mayores.',
    'Acompañamiento humano para adoptar la nueva herramienta.',
    5, 4, 'Bilbao', '1.500 personas formadas', 'Startup seleccionada', 2023),
];

APPLICANTS[0].evalHint = { tecnica: 4, equipo: 5, escalabilidad: 5, regulatoria: 4 };

export const applicantById = (id: string) => APPLICANTS.find((a) => a.id === id);
