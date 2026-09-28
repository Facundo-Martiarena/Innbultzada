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
  /* Catálogo de beneficios de la Impulsadora, en 5 pilares (fuente: benchmarking del proyecto). */
  benefits: {
    totalValue: '+150.000 €',
    totalNote: 'Valor estimado del paquete de beneficios en especie y servicios, según el catálogo (en diseño).',
    pillars: [
      {
        id: 'financiacion', name: 'Financiación y acceso a clientes reales',
        items: [
          { name: 'Trabajar con tu primer cliente · co-crear', value: '15.000 – 25.000 €', duration: '4 meses', gives: 'Primera venta comercial real y carta de presentación bancaria.', ref: 'BIND 4.0 · Startupbootcamp' },
          { name: 'Financiar tus primeros errores', value: '10.000 €', duration: 'Semanas 1–10', gives: 'Margen para experimentar sin arriesgar la supervivencia.', ref: 'Fomento SS · EKINN+' },
          { name: 'Inversión inicial', value: '25.000 – 35.000 €', duration: 'Cierre + 1 año', gives: 'Capital para operar sin ceder el control (equity opcional 3–5 %).', ref: 'BerriUp · Fondo Mondragón' },
          { name: 'Anticipo de subvenciones y avales (Elkargi)', value: '3.000 – 5.000 €', duration: 'Programa + crecimiento', gives: 'Liquidez inmediata sin esperar a la administración pública.', ref: 'Convenio LK · Elkargi · FEI' },
        ],
      },
      {
        id: 'infra', name: 'Infraestructura y herramientas operativas',
        items: [
          { name: 'Espacio físico', value: '3.200 €', duration: '4 meses (+1 prórroga)', gives: 'Ahorro en alquiler y suministros, y convivencia con otros equipos.', ref: 'Lanzadera · BIC Euskadi' },
          { name: 'Licencias y créditos cloud', value: '60.000 – 80.000 €', duration: '12–24 meses', gives: 'Tecnología punta sin gastar el dinero de la empresa en software básico.', ref: 'Startupbootcamp · Station F' },
          { name: 'Cuenta profesional y pasarela de cobro a coste cero', value: '1.500 – 2.000 €/año', duration: '12–24 meses', gives: 'Cobrar y vender online desde el día 1, separando finanzas personales del negocio.', ref: 'Cuenta Negocios LK' },
        ],
      },
      {
        id: 'formacion', name: 'Formación, asesoría legal y técnica',
        items: [
          { name: 'Asesoría jurídica y legal', value: '6.000 €', duration: '4 meses', gives: 'Protección legal y preparación para los supervisores financieros.', ref: 'TechQuartier · ZITEK' },
          { name: 'Entrenamiento sectorial', value: '4.500 €', duration: 'Quincenal · 16 semanas', gives: 'Ajustar el producto a lo que el sector financiero necesita de verdad.', ref: 'Tenity · Munich Re' },
          { name: 'Certificaciones y homologación', value: '5.000 €', duration: 'Meses 3–4', gives: 'Superar los filtros que las grandes corporaciones exigen a un proveedor.', ref: 'Mondragón Promoción' },
          { name: 'Estudio comparativo de mercado', value: '2.500 €', duration: '4 informes', gives: 'Datos fiables para defender el precio y negociar con inversores.', ref: 'Finance Innovation' },
          { name: 'Conocimiento y formación', value: '3.000 €', duration: 'Semanal · ~40 h', gives: 'Profesionalizar al equipo fundador más allá del producto.', ref: 'MTA · Lanzadera' },
          { name: 'Gestor dedicado y fiscalidad foral / economía social', value: '1.500 €', duration: 'Permanente', gives: 'Trato directo y tranquilidad en el cumplimiento tributario foral.', ref: 'Empresas y Economía Social LK' },
        ],
      },
      {
        id: 'comercial', name: 'Relaciones comerciales y salida al mercado',
        items: [
          { name: 'Red de contactos directos', value: '3.000 €', duration: 'Meses 3–4', gives: 'Reuniones con responsables de compras e innovación sin puerta fría.', ref: 'Plug and Play · Torre BAT' },
          { name: 'Encuentros por sectores', value: '1.500 €', duration: '3 jornadas', gives: 'Oportunidades comerciales fuera del banco y socios de innovación.', ref: 'Clústeres de Euskadi' },
          { name: 'Asegurar despegue · Demo Day', value: '4.000 €', duration: 'Últimas 4 semanas', gives: 'Preparación para captar financiación privada tras la aceleración.', ref: 'IE Team · BerriUp' },
        ],
      },
      {
        id: 'marca', name: 'Respaldo de marca y apoyo continuo',
        items: [
          { name: 'Sello de confianza cooperativo (Sello Mondragón / LK)', value: '5.000 €', duration: 'Indefinida', gives: 'Credibilidad y prestigio instantáneo ante clientes e inversores.', ref: 'Mondragón Corporación' },
          { name: 'Acompañamiento antes y después', value: '4.000 €/año', duration: 'Continuo', gives: 'No quedarse aislado al terminar: red alumni, seguimiento y más inversión.', ref: 'Founders Factory · Tenity' },
        ],
      },
    ],
  },
  /* Beneficios de la cuenta de empresa en LABORAL Kutxa, fuera de la Impulsadora. */
  businessAccount: {
    note: 'Ventajas de abrir una cuenta para empresas en LABORAL Kutxa, disponibles también fuera del programa.',
    categories: [
      { id: 'gaztenpresa', name: 'Apoyo al emprendedor · Fundación Gaztenpresa', items: ['Revisión del plan de negocio por expertos del banco', 'Microcréditos sin aval tradicional (respaldo FEI)', 'Acompañamiento con personas expertas voluntarias'] },
      { id: 'operativa', name: 'Operativa bancaria diaria · Cuenta Profesional', items: ['Exención de comisiones de cuenta', 'Operaciones digitales sin coste (transferencias y nóminas)', 'Tarjetas profesionales bonificadas'] },
      { id: 'cobro', name: 'Herramientas de cobro', items: ['Pasarela de cobro por internet (datáfono virtual)', 'Datáfonos físicos adaptados sin permanencia abusiva'] },
      { id: 'garantia', name: 'Financiación y convenios de garantía', items: ['Convenio con Elkargi (avales)', 'Anticipo de subvenciones públicas concedidas', 'Líneas oficiales (ICO / Instituto Vasco de Finanzas)'] },
      { id: 'gestion', name: 'Gestión y relación con el banco', items: ['Gestor de empresas con nombre y apellido', 'Conexión con las Haciendas Forales'] },
      { id: 'social', name: 'Economía social · Programa Transforma', items: ['Apoyo a la constitución como cooperativa o sociedad laboral'] },
    ],
  },
  /* Comparativa con Mondragon Ventures (Promoción Empresarial). */
  vsMondragon: {
    essence: 'Mondragon Ventures es un vehículo de inversión y socio industrial (CVC / venture builder); INNBULTZADA es un mecanismo ágil de cliente de prueba (venture client) verticalizado en banca y seguros.',
    rows: [
      { dim: 'Rol principal', mondragon: 'Inversor financiero e industrial: entra en el capital para crear o diversificar negocios cooperativos.', innbultzada: 'Primer cliente real (venture client): contrata una solución para resolver un problema operativo del banco.' },
      { dim: '¿Toma capital?', mondragon: 'Sí, siempre. Participaciones societarias vía fondos de capital riesgo.', innbultzada: 'No de entrada: contrato de prueba de 30.000 € y 0 % de acciones en la aceleración.' },
      { dim: 'Foco sectorial', mondragon: 'Industria avanzada, manufactura, automoción, salud y energía.', innbultzada: 'Servicios financieros, seguros, pagos, solvencia y ciberseguridad.' },
      { dim: 'Fase de la empresa', mondragon: 'Tecnología madura, lista para industrializar o escalar (Seed a Serie A/B).', innbultzada: 'Empresas jóvenes con una primera versión de producto lista para probar.' },
      { dim: 'Tiempos y proceso', mondragon: 'Auditoría de inversión larga (6–12 meses) y pacto de socios.', innbultzada: 'Proceso ágil y cerrado (4 meses) enfocado en una prueba funcional.' },
      { dim: 'Riesgo asumido', mondragon: 'Riesgo de balance e inversión patrimonial.', innbultzada: 'Riesgo operativo controlado: compra un servicio por 30.000 € para validar.' },
    ],
  },
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
