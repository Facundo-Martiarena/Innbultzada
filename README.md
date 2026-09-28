# INNBULTZADA · Prototipo navegable

> **De retos a nuevas empresas.** Prototipo conceptual para presentación. No es un producto de producción.

```bash
npm install
npm run dev      # http://localhost:5173
```

`npm run build` genera `dist/`: una versión estática que funciona sin conexión (fuentes incluidas, sin CDNs) y se puede abrir desde cualquier servidor estático.

---

## 1. Arquitectura

| Decisión | Motivo |
|---|---|
| **Vite + React 18 + TypeScript** | Arranque inmediato y sin servidor; más simple que Next.js para una demo. |
| **Tailwind CSS 3** + **design tokens** en CSS variables | Colores editables en un único archivo (`src/styles/tokens.css`). |
| **HashRouter** (react-router) | Funciona abierto desde cualquier ruta o servidor estático, sin configuración. |
| **Estado en React Context** (`DemoContext`) | Reto activo, retos priorizados y publicados, postulación, shortlist, seleccionadas, Venture Team, decisión GO/PIVOT/STOP, Cliente 0, vehículo y etapa alcanzada. Sin persistencia. |
| **Datos mock en TypeScript** (`src/data`) | Tipados, fáciles de editar, sin backend. |
| **lucide-react** | Un único set de iconos SVG con trazo consistente (1.75). |
| **Fuentes self-hosted** (@fontsource) | La demo funciona sin internet en la sala. |

```
src/
├─ data/            modelo de datos + mocks
│  ├─ types.ts        tipos (Stage, Challenge, Actor, Evidence, Milestone…)
│  ├─ model.ts        etapas, capacidades, hitos del pasaporte, vehículos, Cliente 0, escalado, impactos
│  ├─ actors.ts       actores del ecosistema (conceptuales y ficticios)
│  └─ challenges.ts   Banco de Retos (Retos Demo) + recorrido detallado del reto principal
├─ lib/             lógica sin UI: match y compatibilidad, recorrido (flow), iconos, hook de ruta
├─ state/           DemoContext (estado de la demo + modo presentación)
├─ components/      componentes reutilizables
├─ pages/           una pantalla por ruta
└─ styles/          tokens.css + index.css
```

## 2. Flujo y rutas: dos perfiles

Una idea puede nacer en una **startup** o en una **necesidad de LABORAL Kutxa**. Las startups llegan recomendadas por la **red de aceleradoras e incubadoras** del ecosistema I&E Bizkaia, siempre que su solución resuelva problemas de servicios financieros (banca, seguros, pagos…). LABORAL Kutxa aporta sus problemáticas priorizadas. INNBULTZADA es la herramienta de matching entre ambos lados.

| # | Ruta | Pantalla | Perfil | Etapa |
|---|---|---|---|---|
| 1 | `/#/` | Inicio: elegir perfil (startup o LABORAL Kutxa) | — | — |
| — | `/#/ecosistema` | Mapa interactivo del ecosistema I&E Bizkaia | — | — |
| 2 | `/#/laboral-kutxa/diagnostico` | 12 departamentos y su plantilla de diagnóstico | LABORAL Kutxa | DISCOVER |
| 3 | `/#/laboral-kutxa/votacion` | Plantilla de votación: identificar, clasificar y priorizar | LABORAL Kutxa | DISCOVER |
| 4 | `/#/reto/:id/convocatoria` | Publicar el reto: bases, lanzamiento y comunicación | LABORAL Kutxa | DISCOVER |
| 5 | `/#/startup/acceso` | Acceso vía aceleradora + filtro (servicios financieros, MVP) | Startup | MATCH |
| 6 | `/#/startup/retos` | Retos de LABORAL Kutxa por prioridad (tarjetas deslizables) | Startup | MATCH |
| — | `/#/startup/idea` | «Tengo una idea»: propuesta cuando no hay reto | Startup | MATCH |
| 7 | `/#/reto/:id/postular` | Postulación al reto | Startup | MATCH |
| 8 | `/#/startup/seguimiento` | Seguimiento de candidatura e idea | Startup | MATCH |
| 9 | `/#/reto/:id/candidaturas` | Equipo de innovación: primer filtro, 5 preseleccionadas e ideas abiertas | LABORAL Kutxa | MATCH |
| 10 | `/#/reto/:id/evaluacion` | Pitch final tipo «Shark Tank» → 1–2 elegidas, 3 al pool | LABORAL Kutxa | MATCH |
| 11 | `/#/reto/:id/proyecto` | Mes 1: alta como proveedor y revisión de seguridad | — | MATCH |
| 12 | `/#/reto/:id/validar` | Hipótesis del piloto (GO / PIVOT / STOP) | — | VALIDATE |
| 13 | `/#/reto/:id/piloto` | Meses 2–5: piloto pagado | — | PILOT |
| 14 | `/#/reto/:id/decision` | Mes 6: ¿LABORAL Kutxa firma como cliente? | — | VENTURE |
| 15 | `/#/reto/:id/escalar` | KPIs y acuerdos posventa | — | SCALE |
| — | `/#/programa` | Ficha del programa | — | — |
| — | `/#/como-funciona` | Preguntas frecuentes y comparativa | — | — |

El orden vive en `src/lib/flow.ts`; los datos del ecosistema (aceleradoras, departamentos, plantilla de diagnóstico, ideas) en `src/data/ecosystem.ts`.

Nombre de la entidad: siempre **LABORAL Kutxa**, nunca abreviado.

## Logo

El nuevo logo se coloca en `public/brand/` (ver `LEEME.txt`):

- `logo.png`: versión estática, en la cabecera.
- `logo.gif`: versión animada, en la portada.

Si no existen, se muestra el logotipo provisional. No hay que tocar código.

## Ficha del programa

`src/data/program.ts` recoge la ficha de INNBULTZADA (programa en diseño): piloto pagado de 30.000 € sin equity, 6 meses (1 + 4 + 1), rúbrica de selección (30/20/20/15/15), KPIs, servicios, post-programa, qué gana LABORAL Kutxa y requisitos legales (DORA, RGPD, PI, licencias). Toda la app lee de ahí.

## 3. Modelo de datos

- **Stage**: `discover · match · validate · pilot · venture · scale`, con pregunta, descripción e *hito para avanzar* (gate).
- **Challenge**: código, título, resumen, categorías, origen, Challenge Owner, prioridad, estado, etapa, problema, pregunta del reto, usuario afectado, impacto, alineación, capacidades necesarias, restricciones y criterios de éxito.
- **Capability**: 10 capacidades (tecnología, IA, datos, UX, regulación, finanzas, seguros, sostenibilidad, emprendimiento, acceso a mercado).
- **Actor**: tipo, capacidades, rol conceptual, rol en el equipo y `conceptual` (institución real usada solo como actor conceptual) frente a *ejemplo ficticio*.
- **Applicant**: startup postulante (ficticia) con especialidad, capacidades, propuesta, TRL, equipo y tracción. La evaluación (`lib/match.ts → evaluate`) puntúa 5 criterios ponderados, los mismos que aparecen en las bases.
- **Journey**: nombre del venture, propuesta de valor, evidencias por lente (hipótesis → experimento → evidencia → aprendizaje) y piloto (entorno, usuarios, métricas, aprendizajes). El reto RD‑01 tiene un recorrido detallado; el resto usa uno genérico.
- **Milestone**: 12 hitos del Pasaporte, cada uno asociado a una etapa. Su estado (completado / en progreso / pendiente) se deriva de la etapa alcanzada.
- **Outcome**: `integrate · buy · partner · venture`. Además, un STOP es posible en cualquier gate.

La **compatibilidad** del Match (`lib/match.ts`) es un cálculo demostrativo basado en el solapamiento entre capacidades del reto y del actor. Las startups se ordenan por encaje en las tarjetas; «Completar con las más compatibles» rellena la shortlist con las de mayor encaje.

## 4. Componentes

`SwipeDeck` (mazo de tarjetas deslizables: arrastre, botones accesibles y deshacer), `StageStepper` (hero · compact · workspace), `CapabilityCard`, `CapabilityMatch` (conexiones SVG medidas sobre el DOM), `ActorBadge`, `VentureTeam`, `StageGate`, `EvidenceCard`, `Passport`, `DecisionCard` (radio accesible), `ImpactCard`, `EcosystemMap`, `MetricCard`, además de `AppShell`, `FlowNav`, `PageHeader` y primitivas (`DemoBadge`, `CompatibilityRing`, `PriorityPill`).

## 5. Modo presentación

- Botón **Modo presentación** en la cabecera o tecla **P**. **Esc** para salir.
- Aumenta la escala tipográfica, oculta la navegación secundaria, textos de ayuda y pie de página.
- **→ / PageDown** avanza y **← / PageUp** retrocede (compatible con mandos de presentación).
- Los pasos con decisión (GO en Validate, vehículo en Decision) piden elegir antes de avanzar.

### Guion sugerido (≈ 5 min)

1. **Inicio → Ecosistema**: los dos perfiles y cómo encaja cada bloque.
2. **LABORAL Kutxa · Diagnóstico**: los 12 departamentos y su plantilla.
3. **Votación**: votar, clasificar y priorizar → **Publicar el reto**.
4. **Startup · Acceso**: llega por su aceleradora; filtro de servicios financieros y MVP.
5. **Retos**: desliza el primero (❤). Muestra también «Tengo una idea».
6. **Postulación → Seguimiento**.
7. **Equipo de innovación**: primer filtro (5) e ideas abiertas → **Pitch final** (1–2).
8. **Programa**: alta y seguridad → hipótesis → piloto pagado → decisión → KPIs y posventa.

## 6. Accesibilidad

HTML semántico, botones y radios reales, `aria-pressed` / `aria-current`, enlace para saltar al contenido, foco visible en magenta y estados que muestran también texto e icono, no solo color. Respeta `prefers-reduced-motion`. Optimizado para 1440×900 y utilizable en tablet (≥ 1024 px).

## 7. Datos y marca

- Todos los retos son **Reto Demo**; métricas y nombres de venture son **Dato demostrativo** o **Ejemplo ficticio**.
- LABORAL Kutxa, Seguros Lagun Aro, Gaztenpresa, BAT, IKERLAN y MONDRAGON aparecen solo como **actores conceptuales**, sin atribuirles decisiones, compromisos, presupuestos ni estrategias.
- La paleta es una **propuesta** del prototipo, no el manual de marca de LABORAL Kutxa. Se cambia en `src/styles/tokens.css`.
