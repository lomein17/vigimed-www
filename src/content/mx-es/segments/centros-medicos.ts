// Centros Médicos MX segment fill (mx-es).
// VM-441 (Hero) locked content, D-S51-2 lock dated 2026-05-07. This file
// is the SINGLE source of truth for that locked spec in the repo; no
// other file duplicates this copy. Future evolution per Chassis Brief
// §10.3 governance updates this file directly.
//
// Locale handling: Centros Médicos MX is mx-es-only by design per Site
// Architecture parity rule (D-S36-2). The us-en side of locked Paired
// fields uses '[us-en pending]' markers and is never rendered (the
// route guard at src/app/[locale]/(chrome)/centros-medicos/page.tsx
// returns notFound() for non-mx-es requests). VM-441 fills the
// placeholder strings (S2/S3/S4/S5 bodies, FAQ Zone A, Sticky prompts)
// with the live Centros Médicos MX content lock as each section locks
// downstream; this file ships §A Hero verbatim and §B-§I as structural
// stubs so the chassis compiles and renders end-to-end.
//
// Section 3 uses tabCount: 4 per VM-441 D-S39-1 (Director Médico,
// Subdirector de Calidad y Seguridad del Paciente, Jefe de UVEH /
// Coordinador de Vigilancia Epidemiológica Hospitalaria, Director
// General).

import type { ChassisFill } from '@/lib/chassis/slots';
import { EM_DASH_GLYPH } from '@/lib/chassis/constants';

export const centrosMedicosFillMxEs: ChassisFill = {
  // ---------------------------------------------------------------------------
  // Section 1 -- Hero (VM-441 D-S51-2 locked mx-es content, 2026-05-07)
  // ---------------------------------------------------------------------------
  hero: {
    contextBar: {
      'mx-es':
        'Hospitales privados de alta especialidad · Tercer nivel · Un solo gobierno',
      'us-en': '[us-en pending]',
    },
    eyebrow: {
      'mx-es': 'Centros Médicos',
      'us-en': '[us-en pending]',
    },
    h1Line1: {
      'mx-es': [{ text: 'Un incidente, una decisión' }],
      'us-en': [{ text: '[us-en pending]' }],
    },
    h1Line2: {
      'mx-es': [
        { text: 'que su institución toma ' },
        { text: 'una vez.', emphasis: 'brand-cyan' },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    subhead: {
      'mx-es': [
        {
          text: 'Detección continua, confirmación humana, y análisis de\ncada evento crítico en sus áreas de mayor riesgo.\n',
        },
        {
          text: 'Inteligencia operativa requerida para mejorar, no para vigilar.',
          emphasis: 'bold-amber',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    ctaSecondaryTarget: 'none',
    metrics: [
      {
        'mx-es': { value: EM_DASH_GLYPH, label: 'Eventos detectados' },
        'us-en': { value: EM_DASH_GLYPH, label: '[us-en pending]' },
      },
      {
        'mx-es': { value: EM_DASH_GLYPH, label: 'Patrones documentados' },
        'us-en': { value: EM_DASH_GLYPH, label: '[us-en pending]' },
      },
      {
        'mx-es': { value: EM_DASH_GLYPH, label: 'Criterio institucional' },
        'us-en': { value: EM_DASH_GLYPH, label: '[us-en pending]' },
      },
    ],
    video: { desktop: '', mobile: '', poster: '' },
  },

  // ---------------------------------------------------------------------------
  // Section 2 -- Operational Reality (VM-447 D-S52-2 locked mx-es content)
  // Persona x domain matrix: four buyer-chain personas, four UCs each.
  // ---------------------------------------------------------------------------
  section2: {
    eyebrow: {
      'mx-es': 'LA REALIDAD OPERATIVA',
      'us-en': '[us-en pending]',
    },
    heading: {
      'mx-es':
        'Cuatro responsabilidades.\nUna solución que coordina la respuesta.',
      'us-en': '[us-en pending]',
    },
    pressures: [],
    ucByPersona: {
      jefeUveh: {
        roleLabel: { 'mx-es': 'Jefe UVEH', 'us-en': '[us-en pending]' },
        tierLabel: {
          'mx-es': 'Vigilancia epidemiológica',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Campo Estéril',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed detecta cada infección de sitio quirúrgico, la confirma contra el criterio vigente, y consolida el patrón por servicio antes del reporte mensual.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Puerta de Aislamiento',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed registra cada apertura fuera de protocolo, la confirma contra el caso activo, y construye el patrón de quiebres por turno antes de que escale a brote.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Limpieza Ambiental',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed verifica la cobertura de limpieza terminal en áreas críticas, confirma cada hallazgo contra el ciclo del paciente, y deja documentada la cadena de evidencia ante auditoría.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Segregación RPBI',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed detecta segregación incorrecta en el punto de generación, confirma cada evento contra el criterio normativo, y consolida el patrón por servicio antes de que se vuelva hallazgo.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      calidad: {
        roleLabel: {
          'mx-es': 'Subdirección de Calidad',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Calidad y acreditación',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Proporción Personal-Paciente',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed registra el ratio enfermería-paciente turno a turno, lo confirma contra el umbral institucional, y consolida la tendencia que el Plan de Mejora sintetiza en un cierre.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Puerta de Aislamiento',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed mapea cada quiebre de aislamiento contra el estándar institucional, lo cruza con los marcos acreditadores concurrentes, y produce un solo plan de acción en lugar de tres.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Tiempo Fuera',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed documenta la adherencia al tiempo fuera por sala y procedimiento, confirma el cumplimiento del protocolo, y consolida la tendencia que sustenta la firma del Plan ante junta directiva.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Limpieza Ambiental',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed valida cada ciclo de limpieza terminal contra el estándar institucional, lo mapea contra los marcos acreditadores en una sola lectura, y produce una sola tendencia institucional.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      medica: {
        roleLabel: {
          'mx-es': 'Dirección Médica',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Decisión clínica institucional',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Campo Estéril',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed cierra el ciclo mensual de la junta médica con la tendencia de infecciones de sitio quirúrgico ya consolidada por servicio y campus, lo que convierte la decisión clínica en lectura, no reconstrucción.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Proporción Personal-Paciente',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed traduce la tendencia turno a turno en una decisión de asignación clínica, con la evidencia ya cruzada contra resultados de paciente, y permite fijar criterio sin esperar al cierre.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Carro Rojo',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed verifica disposición y caducidad de cada carro rojo turno a turno, consolida la tendencia institucional de eventos centinela, y entrega un criterio de readiness clínico documentado, no inferido.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Tiempo Fuera',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed documenta cada cirugía de sitio incorrecto evitada en el tiempo fuera, consolida la tendencia por sala y equipo quirúrgico, y entrega criterio sobre cuál servicio requiere intervención.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      general: {
        roleLabel: {
          'mx-es': 'Dirección General',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Posición institucional',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Campo Estéril',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed convierte la tasa institucional de infección de sitio quirúrgico en estándar reportable ante consejo, ya consolidada y firmada, y permite llegar a la conferencia de apertura con un Plan leído.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Proporción Personal-Paciente',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed eleva el ratio enfermería-paciente a indicador institucional reportable trimestre a trimestre, ya cruzado con resultados clínicos, y sostiene la decisión de asignación de capital ante consejo.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Carro Rojo',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed convierte el readiness de carros rojos en evidencia institucional documentada por campus, lo que protege la firma de la dirección general ante eventos centinela y aseguradora.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Segregación RPBI',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed produce evidencia institucional de cumplimiento RPBI lista para reporte externo, consolidada y firmada, lo que protege a la dirección general ante hallazgo regulatorio o exposición pública.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
    },
    defaultPersona: 'jefeUveh',
    ucSupplement: {
      'mx-es':
        'Además de 13 casos de uso adicionales en el catálogo VigiMed, más la inteligencia documentada que emerge de VigiMed Insights.',
      'us-en': '[us-en pending]',
    },
  },

  // ---------------------------------------------------------------------------
  // Section 3 -- Per-Buyer-Chain Proof (VM-448 D-S49-3 chain variant;
  // S55 prevention-frame rewrite per VM-448 punch-list 2026-05-08).
  // Tab 1 catches a real breach in real time and prevents that
  // patient's infection. Tabs 2-4 work the recurring breach pattern
  // across multiple OR sessions, feed Insights, and produce governance
  // change. Word-cap discipline (50w body / 30w quote / 50w citation)
  // is fixture-only: chassis enforces no runtime caps.
  // tabCount: 4 (Jefe de UVEH, Subdirección de Calidad, Dirección
  // Médica, Dirección General); tabDefault: 1.
  // ---------------------------------------------------------------------------
  section3: {
    eyebrow: {
      'mx-es':
        'VIGIMED EN LA PRÁCTICA: EL CAMINO DE RESOLUCIÓN DE UN INCIDENTE',
      'us-en': '[us-en pending]',
    },
    // S57 FIX 2: heading rewritten on the same prevention-frame as S55
    // but tightened: "brecha" (feminine) replaces "quiebre"; "evitada"
    // replaces "que no ocurrió"; trailing clause restated as "lo que
    // impidió que volviera a ocurrir." Adjective concord follows
    // "brecha" (feminine), so "detectada".
    heading: {
      'mx-es':
        'Brecha de campo estéril detectada en el momento.\nLa infección evitada, y lo que impidió se repitiera.',
      'us-en': '[us-en pending]',
    },
    // S56 FIX 3 + 4: trailing period moves into the bold-amber span so it
    // renders amber alongside the rest of the chain.
    // S59 FIX 1: explicit \n line breaks dropped so wrap is governed by
    // CSS, not string literals. At >=1440px the entire frame line
    // renders single-line via white-space: nowrap on .vm-section-3-
    // heading-frame; below that, segments wrap naturally based on
    // container width while the bold-amber span stays unbroken at
    // >=1280px (S55 FIX 1).
    headingFrame: {
      'mx-es': [
        { text: 'Cada rol institucional opera en un punto distinto de la cadena ' },
        {
          text: 'señal → patrón → tendencia → criterio → estándar.',
          emphasis: 'bold-amber',
        },
        { text: ' Vea cómo VigiMed se acopla al suyo.' },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    tabCount: 4,
    tabDefault: 1,
    tabs: [
      // Tab 1 -- Jefe de UVEH. Chain origin: signal detected in real
      // time, escalated, infection prevented. body 48w / quote 28w /
      // citation 28w (NOM-045 §3.1 trimmed verbatim to fit 50w cap).
      {
        label: { 'mx-es': 'Jefe de UVEH', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Vigilancia epidemiológica',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/centros-medicos/uveh.png',
        chainTiers: ['senal', 'patron'],
        body: {
          'mx-es':
            'VigiMed detectó el ingreso de personal sin vestimenta estéril al quirófano cardiotorácico en tiempo real. La señal escaló a la jefatura antes del cierre del campo. La infección que ese paciente habría desarrollado en siete días no ocurrió, y el evento entró al registro institucional como señal documentada.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Sin la alerta en tiempo real, ese paciente regresa a los siete días con infección de sitio quirúrgico, y nosotros abrimos dos semanas reconstruyendo si hubo más casos."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-045-SSA2-2005, §3.1: "Vigilancia Epidemiológica de Infecciones Nosocomiales: a la observación y análisis sistemáticos, continuos y activos de la ocurrencia y distribución de las infecciones nosocomiales."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'RHOVE · NOM-045 · NOM-016',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 2 -- Subdirección de Calidad. Pattern consolidation from
      // recurring sterile-field breaches; one tendency read by all
      // concurrent regulatory frames. body 45w / quote 25w / citation
      // 28w (NOM-004 §1 trimmed verbatim; same trim point as Tab 3,
      // duplication acknowledged per S54-1 lock).
      {
        label: {
          'mx-es': 'Subdirección de Calidad',
          'us-en': '[us-en pending]',
        },
        labelMobile: {
          'mx-es': 'Subdir. Calidad',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Calidad y acreditación',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/centros-medicos/calidad.png',
        chainTiers: ['patron', 'tendencia'],
        body: {
          'mx-es':
            'La señal del primer evento no quedó aislada. VigiMed consolidó el patrón de quiebres de campo estéril en quirófano cardiotorácico a lo largo del trimestre, y la tendencia ya estaba documentada cuando la revisión institucional la pidió. Una sola evidencia, leída por todos los marcos concurrentes.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Sin tendencia documentada, llego a junta con tres reportes en tres formatos distintos y dedico la primera hora a explicar de dónde sale cada cifra."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-004-SSA3-2012, §1: "Esta norma establece los criterios científicos, éticos, tecnológicos y administrativos obligatorios en la elaboración, integración, uso, manejo, archivo, conservación, propiedad, titularidad y confidencialidad del expediente clínico."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'NOM-004 · CONAMED · CSG',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 3 -- Dirección Médica. Tendency arrives at clinical
      // committee already crossed with patient outcomes and root
      // cause; institutional criterion (double-verify protocol) signed
      // in one session. body 43w / quote 24w / citation 28w (same
      // NOM-004 §1 trim as Tab 2).
      {
        label: { 'mx-es': 'Dirección Médica', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Decisión clínica institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/centros-medicos/medica.png',
        chainTiers: ['tendencia', 'criterio'],
        body: {
          'mx-es':
            'La tendencia llegó al comité clínico ya cruzada con resultados de paciente y causa raíz. El criterio institucional sobre acceso al quirófano cardiotorácico se firmó en una sola sesión: protocolo de doble verificación al cierre de campo, vinculante para todo el servicio.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Sin criterio derivado de tendencia documentada, el comité abre la sesión alineando interpretación. Salimos con acuerdos individuales que el siguiente caso vuelve a discutir."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-004-SSA3-2012, §1: "Esta norma establece los criterios científicos, éticos, tecnológicos y administrativos obligatorios en la elaboración, integración, uso, manejo, archivo, conservación, propiedad, titularidad y confidencialidad del expediente clínico."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'CONAMED · NOM-004 · CSG',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 4 -- Dirección General. Signed criterion elevated to
      // institutional standard with full chain (signal -> operational
      // change) documented as evidence-of-response in VigiMed
      // Insights. body 46w / quote 23w / citation 19w.
      {
        label: { 'mx-es': 'Dirección General', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Posición institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/centros-medicos/general.png',
        chainTiers: ['criterio', 'estandar'],
        body: {
          'mx-es':
            'El criterio firmado por el comité subió al consejo como estándar institucional con respaldo en VigiMed Insights: la cadena completa, desde la señal de quiebre hasta el cambio operativo, documentada como evidencia de respuesta. La posición ante aseguradora y CONAMED se sostuvo antes de cualquier llamada.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Sin evidencia de respuesta institucional documentada, una infección con reingreso es crisis reputacional. Defiendes operación, no decisión. Llegas a aseguradora explicando, no respondiendo."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'Reglamento de Procedimientos CONAMED: "el criterio institucional, pues no se trata de la mera apreciación de perito persona física."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'CONAMED · CSG · COFEPRIS',
          'us-en': '[us-en pending]',
        },
      },
    ],
    chain: {
      tiers: {
        senal: {
          label: { 'mx-es': 'Señal', 'us-en': '[us-en pending]' },
          description: {
            'mx-es': 'Evento crítico detectado en el momento en que ocurre',
            'us-en': '[us-en pending]',
          },
        },
        patron: {
          label: { 'mx-es': 'Patrón', 'us-en': '[us-en pending]' },
          description: {
            'mx-es': 'Recurrencia confirmada del mismo evento en un servicio',
            'us-en': '[us-en pending]',
          },
        },
        tendencia: {
          label: { 'mx-es': 'Tendencia', 'us-en': '[us-en pending]' },
          description: {
            'mx-es': 'Trayectoria del patrón a lo largo del tiempo',
            'us-en': '[us-en pending]',
          },
        },
        criterio: {
          label: { 'mx-es': 'Criterio', 'us-en': '[us-en pending]' },
          description: {
            'mx-es':
              'Regla institucional derivada de la tendencia acumulada',
            'us-en': '[us-en pending]',
          },
        },
        estandar: {
          label: { 'mx-es': 'Estándar', 'us-en': '[us-en pending]' },
          description: {
            'mx-es':
              'Compromiso institucional firmado ante consejo y reguladores',
            'us-en': '[us-en pending]',
          },
        },
      },
      frame: {
        'mx-es': 'Cada rol opera en un punto. La cadena los conecta.',
        'us-en': '[us-en pending]',
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Section 4 -- Proof + Legitimacy (VM-450 D-S56-2 §D Acta de
  // Cumplimiento lock). regulatoryDocument theme, navy background.
  // Content per issue Scope §2 table (Carro Rojo anchor, NOM-019-
  // SSA3-2013). Zone A is the 4-card obligation grid; Zone B is the
  // Acta itself; Zone C is the chip rail on navy.
  // ---------------------------------------------------------------------------
  section4: {
    theme: 'offwhite',
    header: {
      eyebrow: {
        'mx-es': 'EL ESTÁNDAR YA EXISTE',
        'us-en': '[us-en pending]',
      },
      headingLine1: {
        'mx-es': [{ text: 'Su evidencia es documentable.' }],
        'us-en': [{ text: '[us-en pending]' }],
      },
      headingLine2: {
        'mx-es': [
          {
            text: 'La pregunta es si llega antes que el auditor.',
            emphasis: 'brand-cyan',
          },
        ],
        'us-en': [{ text: '[us-en pending]' }],
      },
      frame: {
        'mx-es': [
          { text: 'Su hospital ya opera bajo obligaciones regulatorias medibles. ' },
          {
            text: 'VigiMed las cumple en tiempo real, no en reconstrucción.',
            emphasis: 'bold-amber',
          },
        ],
        'us-en': [{ text: '[us-en pending]' }],
      },
    },
    zoneA: {
      kind: 'obligationGrid',
      cards: [
        {
          articleAnchor: {
            'mx-es': 'NOM-019-SSA3-2013',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es': 'Práctica de enfermería en respuesta de emergencia',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'POR TURNO', 'us-en': '[us-en pending]' },
        },
        {
          articleAnchor: {
            'mx-es': 'NOM-004-SSA3-2012 §1',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es': 'Expediente clínico íntegro y trazable',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'POR EVENTO', 'us-en': '[us-en pending]' },
        },
        {
          articleAnchor: {
            'mx-es': 'NOM-016-SSA3-2012',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es': 'Atención médica hospitalaria',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'CONTINUA', 'us-en': '[us-en pending]' },
        },
        {
          articleAnchor: { 'mx-es': 'CSG', 'us-en': '[us-en pending]' },
          label: {
            'mx-es': 'Acreditación institucional',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'TRIENAL', 'us-en': '[us-en pending]' },
        },
      ],
    },
    zoneB: {
      kind: 'regulatoryDocument',
      actaHeader: {
        'mx-es': 'VIGIMED · ACTA DE CUMPLIMIENTO REGULATORIO',
        'us-en': '[us-en pending]',
      },
      folio: { 'mx-es': 'FOLIO VM-MX-04127', 'us-en': '[us-en pending]' },
      establecimientoLabel: {
        'mx-es': '[Centro Médico, tercer nivel]',
        'us-en': '[us-en pending]',
      },
      marcoNormativo: {
        'mx-es': 'NOM-019-SSA3-2013, §6',
        'us-en': '[us-en pending]',
      },
      obligationClauses: [
        {
          text: {
            'mx-es':
              'Preparación, verificación y reposición del carro rojo conforme a estándar institucional, con responsable identificado por turno y trazabilidad de contenido.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Verificación documentada por turno, contenido y caducidades registradas en tiempo real, alerta automática ante inconformidad.',
            'us-en': '[us-en pending]',
          },
        },
        {
          text: {
            'mx-es':
              'Verificación funcional del desfibrilador y equipo de vía aérea por turno, con prueba documentada por dispositivo y escalamiento inmediato ante hallazgo de falla.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Prueba funcional registrada por turno y por dispositivo, hallazgo escalado en tiempo real, último mantenimiento verificable al día.',
            'us-en': '[us-en pending]',
          },
        },
        {
          text: {
            'mx-es':
              'Activación oportuna de la respuesta de emergencia, con tiempo de respuesta medible y cadena de decisión documentada por participante.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Tiempo de activación registrado al segundo, equipo respondiente identificado, cadena de decisión trazable por turno y por servicio.',
            'us-en': '[us-en pending]',
          },
        },
        {
          text: {
            'mx-es':
              'Análisis posterior del evento que sustente revisión institucional, aprendizaje organizacional y defensa ante reclamación.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Reconstrucción minuto a minuto disponible para junta clínica al cierre del evento, sin reconstrucción retrospectiva.',
            'us-en': '[us-en pending]',
          },
        },
      ],
      closingLine: {
        'mx-es':
          'CADENA DE EVIDENCIA SOSTENIDA EN TIEMPO REAL POR VIGIMED · NO REQUIERE RECONSTRUCCIÓN RETROSPECTIVA',
        'us-en': '[us-en pending]',
      },
      sealLabel: {
        'mx-es': 'EVIDENCIA / SOSTENIDA',
        'us-en': '[us-en pending]',
      },
    },
    zoneCEyebrow: { 'mx-es': 'OPERAMOS BAJO', 'us-en': '[us-en pending]' },
    zoneCChips: {
      'mx-es': ['NOM-019', 'NOM-004', 'CONAMED', 'CSG'],
      'us-en': ['[us-en pending]'],
    },
  },

  // ---------------------------------------------------------------------------
  // Section 5 -- Final CTA (placeholder; VM-441 fills)
  // ---------------------------------------------------------------------------
  section5: {
    // VM-453 D-S62-2: opt §E out of the shared chassis-fill flex-center
    // invariant. The 6-card withStep fixture below naturally fills (and
    // overflows) the chassis content-box at 1440x900, so anchor the
    // heading at section-top + padding-top via `.vm-segment-natural-height`
    // rather than absorbing flex slack. hospitales-publicos basic-variant
    // §E keeps this slot omitted, falling back to 'centered'.
    chassisFillBehavior: 'naturalHeight',
    faqHeading: {
      'mx-es': 'El detalle, en seis preguntas.',
      'us-en': '[us-en pending]',
    },
    faqCount: 6,
    faqDefaultOpen: 'none',
    faqClosingLine: {
      'mx-es': 'Lo demás vive en la conversación.',
      'us-en': '[us-en pending]',
    },
    faqItems: [
      {
        kind: 'withStep',
        step: 2,
        question: {
          'mx-es':
            '¿Qué ven exactamente las cámaras de VigiMed, y qué no ven?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'VigiMed instala cámaras dedicadas en áreas críticas: quirófanos, salas de procedimientos, recuperación, neonatología, otras áreas de mayor riesgo según el perfil de su institución.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed instala cámaras dedicadas en áreas críticas: quirófanos, salas de procedimientos, recuperación, neonatología, otras áreas de mayor riesgo según el perfil de su institución. La detección cubre eventos de seguridad del paciente y de calidad de la atención que ocurren dentro del campo de visión configurado, no consultas, no áreas administrativas, no espacios privados del paciente. La selección de áreas se hace con su institución durante la configuración inicial, no con un catálogo fijo.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 3,
        question: {
          'mx-es':
            '¿Cómo funciona la confirmación humana? ¿Hay alguien revisando todo lo que detectan las cámaras?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'Cada detección pasa por un analista entrenado en el Compliance Review Center de VigiMed antes de que llegue una alerta a su institución.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'Cada detección pasa por un analista entrenado en el Compliance Review Center de VigiMed antes de que llegue una alerta a su institución. El CRC opera 24/7 y existe precisamente para eliminar falsos positivos: el equipo clínico recibe eventos verificados, no señales crudas. La confirmación humana es lo que convierte la detección en evidencia accionable, no un paso opcional ni un proceso automatizado.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 4,
        question: {
          'mx-es':
            'Si VigiMed notifica a la persona equivocada en el momento equivocado, nuestros cirujanos no toleran un segundo más de interrupción. ¿Quién decide cómo se coordina la respuesta?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'La matriz de coordinación, quién es notificado, en qué canal, en qué momento, se configura con su institución por área crítica y por tipo de evento; no es una regla global ni un protocolo del vendor.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'La matriz de coordinación, quién es notificado, en qué canal, en qué momento, se configura con su institución por área crítica y por tipo de evento; no es una regla global ni un protocolo del vendor. Cada coordinación queda registrada con tiempo de respuesta y persona que actuó, de manera que su institución puede ajustar la matriz cuando el patrón muestre que está mal calibrada. La coordinación no interrumpe el flujo clínico; lo documenta.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 1,
        question: {
          'mx-es':
            'El equipo está saturado entre MAPEVE, MOCEBPASS, y el cambio de subdirección. ¿Es este el momento?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'Es el momento, justamente porque su institución está saturada.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'Es el momento, justamente porque su institución está saturada. VigiMed es un servicio gestionado: la instalación, la red, las cámaras, y la operación del Compliance Review Center los opera VigiMed, no su área de sistemas ni su equipo de calidad. La evidencia documentada empieza a producirse desde la primera semana, sin retirar a ningún equipo de sus transiciones actuales. El equipo nuevo de calidad llega a un sistema que ya está produciendo tendencia, no a uno que está empezando.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 6,
        question: {
          'mx-es':
            '¿Qué pasa si ocurre un evento adverso grave teniendo VigiMed implementado?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'La institución llega a la conversación regulatoria con criterio firmado y respuesta documentada, no con reconstrucción retrospectiva.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'La institución llega a la conversación regulatoria con criterio firmado y respuesta documentada, no con reconstrucción retrospectiva. Los datos son de su institución; VigiMed los procesa bajo contrato de tratamiento, no los reutiliza, no los comparte con terceros, ni los hace disponibles a procesos jurídicos sin instrucción de su institución. Ante aseguradora, CONAMED, o consejo, la pregunta deja de ser qué ocurrió y se vuelve cómo respondió la institución.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 6,
        question: {
          'mx-es':
            'Estamos en ciclo de re-acreditación. ¿Adoptar VigiMed nos arriesga la auditoría?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'La auditoría revisa el expediente clínico. VigiMed deposita su evidencia ahí, no en un sistema paralelo.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'La auditoría revisa el expediente clínico. VigiMed deposita su evidencia ahí, no en un sistema paralelo. Cada evento crítico queda confirmado por un humano, documentado en el formato que su institución usa, y disponible como tendencia institucional cuando el evaluador la pida. El equipo de calidad llega a la auditoría leyendo, no reconstruyendo.',
          'us-en': '[us-en pending]',
        },
      },
    ],
    ctaEyebrow: {
      'mx-es': '[S5 cta eyebrow pending]',
      'us-en': '[us-en pending]',
    },
    ctaHeadingLine1: {
      'mx-es': [{ text: '[S5 cta heading line 1 pending]' }],
      'us-en': [{ text: '[us-en pending]' }],
    },
    ctaHeadingLine2: {
      'mx-es': [{ text: '[S5 cta heading line 2 pending]' }],
      'us-en': [{ text: '[us-en pending]' }],
    },
    ctaFrame: {
      'mx-es': '[S5 cta frame pending]',
      'us-en': '[S5 cta frame pending]',
    },
    ctaReassurance: {
      'mx-es': '[S5 cta reassurance pending]',
      'us-en': '[S5 cta reassurance pending]',
    },
  },

  // ---------------------------------------------------------------------------
  // Sticky CTA (placeholder; VM-441 fills)
  // ---------------------------------------------------------------------------
  sticky: {
    promptMobile: {
      'mx-es': '[sticky mobile prompt pending]',
      'us-en': '[us-en pending]',
    },
    promptDesktop: {
      'mx-es': '[sticky desktop prompt pending]',
      'us-en': '[us-en pending]',
    },
  },
};
