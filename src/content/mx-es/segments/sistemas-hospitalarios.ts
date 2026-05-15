// Sistemas Hospitalarios mx-es segment fill.
// Locked content authored under VM-467 in Linear doc slug 29bc9e92d2b8
// (Sessions 58-61, 2026-05-13). Engineering fill landed under VM-471
// (2026-05-13): pure mechanical replacement against the locked SSOT.
// §F (section5.heading + reassurance) and sticky prompts stay
// chassis-constant / placeholder per ticket non-goals.
//
// Locale handling: mx-es-only per D-S36-2. us-en values stay at
// '[us-en pending]' and never render (route guard returns notFound()
// for non-mx-es requests).
//
// Persona-matrix mapping (D-VM471-1): chassis PERSONA_ORDER is fixed
// at jefeUveh → calidad → medica → general. Sistemas content maps
// by functional analog: jefeUveh ← Vigilancia Epidemiológica de Red,
// calidad ← Calidad y Acreditación Corporativa, medica ← Dirección
// Médica Corporativa, general ← Operaciones de Red. defaultPersona
// = 'medica' so the Dirección Médica tab is the load-active default.

import type { ChassisFill } from '@/lib/chassis/slots';

export const sistemasHospitalariosFillMxEs: ChassisFill = {
  // ---------------------------------------------------------------------------
  // Section 1 -- Hero (VM-457 Palantir two-column restructure, 2026-05-12).
  // 3-slot composition: pageTitle (left ~60%) + claim (right ~40%) +
  // asset bed below. Migrated §A H1 and subhead moved to §2 per
  // D-S57-4 (see section2.heading and section2.framing below).
  // ---------------------------------------------------------------------------
  hero: {
    pageTitle: {
      'mx-es': [
        { text: 'VigiMed para ' },
        { text: 'Sistemas Hospitalarios', emphasis: 'amber' },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    claim: {
      'mx-es': [
        {
          text: 'La evidencia que cada hospital produce, mejorando el criterio clínico de su red, el servicio y la seguridad del paciente.',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    video: { desktop: '', mobile: '', poster: '' },
    // VM-459 v1.13: optional S1.image takes precedence over video in
    // the asset bed render branch. WebP variants optimized from a
    // 8192x4608 source at quality 80 (Slot Map v1.13 §4.2).
    image: {
      desktop: '/images/segments/sistemas-hospitalarios/hero.webp',
      mobile: '/images/segments/sistemas-hospitalarios/hero-mobile.webp',
    },
  },

  // ---------------------------------------------------------------------------
  // Section 2 -- Operational Reality (VM-471 mx-es content fill 2026-05-13).
  // Persona x domain matrix: four buyer-chain personas, four UCs each.
  // Persona keys map by functional analog per D-VM471-1; chassis
  // PERSONA_ORDER is fixed (jefeUveh → calidad → medica → general),
  // so tabs render visually as Vigilancia → Calidad → Médica (default
  // active) → Operaciones.
  // ---------------------------------------------------------------------------
  section2: {
    eyebrow: {
      'mx-es': 'LA REALIDAD OPERATIVA',
      'us-en': '[us-en pending]',
    },
    // VM-457 D-S57-4: heading absorbs the migrated §A H1 semantic.
    heading: {
      'mx-es':
        'La consistencia clínica de su red no se sostiene en un solo hospital, se sostiene en cada uno.',
      'us-en': '[us-en pending]',
    },
    // VM-457 D-S57-4: framing slot is RichParagraph for inline emphasis.
    // SH authors two-sentence prose without literal \n; chassis applies
    // `whiteSpace: 'pre-line'` so any author-side \n would render as
    // a hard break.
    framing: {
      'mx-es': [
        {
          text: 'Detección continua en cada hospital, confirmación humana en cada turno, y análisis consolidado a nivel red. ',
        },
        {
          text: 'Inteligencia de red requerida para estandarizar, no para vigilar.',
          emphasis: 'bold-amber',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    pressures: [],
    ucByPersona: {
      // jefeUveh ← Vigilancia Epidemiológica de Red (D-VM471-1).
      jefeUveh: {
        roleLabel: {
          'mx-es': 'Coordinación de Vigilancia Epidemiológica de Red',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Vigilancia consolidada',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Brote Multi-Hospital',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed correlaciona casos sospechosos entre hospitales de la red, confirma el cluster contra los criterios MAPEVE 2024, y consolida el patrón epidemiológico antes de que el segundo hospital alcance el umbral de notificación.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Consolidación RHOVE Corporativa',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed integra la notificación SEVEIAAS de cada hospital de la red, la confirma contra el criterio MAPEVE, y deja documentada la trazabilidad consolidada antes del cierre jurisdiccional de los diez días.',
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
                'VigiMed registra cada apertura fuera de protocolo en cada hospital, la confirma contra el caso activo, y construye el patrón de quiebres por turno comparado entre unidades antes de que escale a brote.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Resistencia Antimicrobiana de Red',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed consolida los antibiogramas de cada hospital de la red, confirma la tendencia de resistencia contra el criterio nacional, y deja documentado el patrón institucional antes de la revisión semestral del comité de farmacia corporativo.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // calidad ← Calidad y Acreditación Corporativa (D-VM471-1).
      calidad: {
        roleLabel: {
          'mx-es': 'Dirección de Calidad y Acreditación Corporativa',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Acreditación coordinada',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Sincronización MOCEBPASS de Red',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed mapea cada estándar MOCEBPASS contra la evidencia operativa de cada hospital, confirma cada hallazgo contra el ciclo de certificación vigente, y deja consolidada la cadena de evidencia ante la conferencia de apertura del auditor.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Mantenimiento JCI Multi-Hospital',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed verifica la adherencia a IPSG en cada hospital acreditado de la red, confirma cada hallazgo contra el ciclo trienal de reacreditación, y consolida la trazabilidad institucional antes de la visita del auditor.',
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
                'VigiMed verifica la cobertura de limpieza terminal en áreas críticas de cada hospital, confirma cada hallazgo contra el ciclo del paciente, y deja documentada la cadena de evidencia comparable entre unidades ante auditoría.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Cédula de Autoevaluación de Red',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed integra los resultados de autoevaluación de cada hospital, confirma cada brecha contra el estándar institucional, y consolida el Plan o Programa de Mejora corporativo antes del cierre del ciclo de certificación.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // medica ← Dirección Médica Corporativa (D-VM471-1).
      medica: {
        roleLabel: {
          'mx-es': 'Dirección Médica Corporativa',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Estándar clínico de red',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Variación de Práctica Clínica entre Hospitales',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed compara la decisión clínica en cada hospital de su red contra el mismo evento crítico, confirma cada divergencia contra el criterio institucional, y consolida el patrón de variación por servicio antes de la sesión de comité corporativo.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Campo Estéril',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed detecta cada infección de sitio quirúrgico en cualquier hospital de la red, la confirma contra el criterio vigente, y consolida el patrón comparado entre hospitales antes del reporte corporativo mensual.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Adherencia a Guía Clínica de Red',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed verifica la adherencia al protocolo corporativo en cada hospital, confirma cada desviación contra el criterio aprobado por el comité médico de red, y deja documentada la cadena de evidencia ante el siguiente ciclo de acreditación.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Evento Centinela Cross-Hospital',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed escala cada evento centinela en el hospital de origen, lo confirma contra los antecedentes de toda la red, y construye el patrón institucional antes de que se repita en una segunda unidad.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // general ← Operaciones de Red (D-VM471-1).
      general: {
        roleLabel: {
          'mx-es': 'Dirección de Operaciones de Red',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Desempeño operativo comparable',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Benchmarking Operativo entre Hospitales',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed compara indicadores operativos clave entre hospitales de la red, confirma cada brecha contra el promedio institucional, y consolida el patrón de desempeño por servicio antes del comité de operaciones corporativo.',
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
                'VigiMed detecta segregación incorrecta en el punto de generación en cada hospital, confirma cada evento contra el criterio normativo, y consolida el patrón por servicio comparado entre unidades antes de que se vuelva hallazgo de auditoría.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Rollout de Protocolo Operativo',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed verifica la adopción de un protocolo operativo nuevo en cada hospital de la red, confirma cada hallazgo de implementación contra el criterio corporativo, y deja documentada la curva de adopción antes del cierre del trimestre.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Mantenimiento de Infraestructura Crítica',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed registra cada incidente de infraestructura crítica en cada hospital, lo confirma contra el ciclo de mantenimiento preventivo, y consolida el patrón de fallas comparado entre unidades antes de la revisión presupuestal.',
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
  // Section 3 -- Per-Buyer-Chain Proof (VM-448 D-S49-3 chain variant
  // shape; VM-471 mx-es content fill 2026-05-13). Tab 1 catches the
  // second-hospital bacteremia signal correlated to the first and
  // prevents the third infection. Tabs 2-4 consolidate the cross-
  // hospital pattern, feed Insights, and produce corporate-level
  // governance change. Word-cap discipline is fixture-only; chassis
  // enforces no runtime caps. tabCount: 4 (Vigilancia Epi. de Red,
  // Subdir. de Calidad Corp., Dirección Médica Corp., Dirección
  // General Corp.); tabDefault: 1.
  // ---------------------------------------------------------------------------
  section3: {
    eyebrow: {
      'mx-es':
        'VIGIMED EN LA PRÁCTICA: UN BROTE QUE SE DETUVO EN EL SEGUNDO HOSPITAL',
      'us-en': '[us-en pending]',
    },
    // VM-471 mx-es heading: two-sentence prose, no inline \n; chassis
    // CSS governs wrap.
    heading: {
      'mx-es':
        'Dos bacteriemias en hospitales distintos.\nBrote contenido antes del tercer paciente.',
      'us-en': '[us-en pending]',
    },
    // VM-471 headingFrame: chain noun phrase rendered in bold-amber with
    // trailing period inside the span. No \n; CSS wraps the surrounding
    // segments while .vm-section-3-heading-frame keeps the bold-amber
    // span unbroken at >=1280px.
    headingFrame: {
      'mx-es': [
        { text: 'Cada rol corporativo opera en un punto distinto de la cadena ' },
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
      // Tab 1 -- Jefe de Vigilancia Epidemiológica de Red. Chain origin:
      // second-hospital signal correlated to first, escalated to red
      // surveillance, third infection prevented. Doc label is 37 chars;
      // labelMobile shortens for the accordion trigger.
      {
        label: {
          'mx-es': 'Jefe de Vigilancia Epidemiológica',
          'us-en': '[us-en pending]',
        },
        labelMobile: {
          'mx-es': 'Jefe Vig. Epi.',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Vigilancia epidemiológica',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/sistemas-hospitalarios/uveh.webp',
        chainTiers: ['senal', 'patron'],
        body: {
          'mx-es':
            'VigiMed detectó la primera bacteriemia asociada a catéter venoso central en el Hospital y la registró como señal con cepa y antibiograma confirmados. Tres semanas después, una segunda bacteriemia en otro Hospital coincidió en tiempo, lugar y persona con la primera. La señal escaló a vigilancia de red antes de que un tercer paciente se infectara, y el evento entró al registro corporativo como patrón de bacteriemia documentado entre hospitales.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Sin la correlación entre hospitales, ese segundo caso queda como evento aislado. Para cuando aparece el tercero en otro hospital, ya tenemos un brote nacional sin trazabilidad."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-045-SSA2-2005, §3.1.5: "Brote epidemiológico de infección nosocomial, a la ocurrencia de dos o más casos de infección adquirida por el paciente o por el personal de salud en la unidad hospitalaria representando una incidencia mayor de la esperada y en los que existe asociación epidemiológica."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'RHOVE · NOM-045 · NOM-017',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 2 -- Subdirección de Calidad Corporativa. Cross-hospital
      // pattern consolidated into a single MOCEBPASS evidence chain;
      // labelMobile shortens for the accordion trigger.
      {
        label: {
          'mx-es': 'Subdirección de Calidad Corporativa',
          'us-en': '[us-en pending]',
        },
        labelMobile: {
          'mx-es': 'Subdir. Calidad Corp.',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Calidad y acreditación',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/sistemas-hospitalarios/calidad.webp',
        chainTiers: ['patron', 'tendencia'],
        body: {
          'mx-es':
            'VigiMed mapeó la cadena de evidencia del brote contra los estándares MOCEBPASS aplicables a la red. El patrón documentado en dos hospitales se consolidó como hallazgo institucional con trazabilidad por cada unidad, y la Subdirección presentó el Plan de Mejora corporativo en la conferencia de apertura del auditor sin reconstruir evidencia entre hospitales.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Sin la consolidación, llegamos al auditor con dos expedientes que no se hablan entre sí. Con la cadena documentada por red, el hallazgo se presenta como un solo evento institucional ya resuelto."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'Acuerdo MOCEBPASS, DOF 25-IX-2025: el Modelo de Certificación y Estandarización de Buenas Prácticas en Atención de Servicios de Salud establece 273 estándares aplicables a establecimientos hospitalarios para la certificación institucional ante el Consejo de Salubridad General.',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'MOCEBPASS · CSG · JCI',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 3 -- Dirección Médica Corporativa. Tendency consolidated
      // across hospitals; corporate criterion on CVC insertion and
      // maintenance signed in one session.
      {
        label: {
          'mx-es': 'Dirección Médica Corporativa',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Decisión clínica de red',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/sistemas-hospitalarios/medica.webp',
        chainTiers: ['tendencia', 'criterio'],
        body: {
          'mx-es':
            'VigiMed comparó el manejo del catéter venoso central en cada hospital de la red contra el patrón documentado del brote. La Dirección Médica identificó la variación de práctica clínica que explicó la asociación epidemiológica, emitió el criterio corporativo actualizado para inserción y mantenimiento de catéter, y dejó documentada la tendencia de bacteriemias por trimestre antes del siguiente comité médico de red.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"El brote no fue un accidente. Fue una variación de práctica clínica que ya estaba ocurriendo en otros hospitales sin que nadie la viera como tendencia hasta que VigiMed la trazó."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-017-SSA2-2012, §1: "El Sistema Nacional de Vigilancia Epidemiológica (SINAVE) recolecta de manera sistemática, continua, oportuna y confiable información esencial para conocer las condiciones de salud de la población. El análisis e interpretación de esa información permite la toma de decisiones."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'SINAVE · NOM-017 · MAPEVE',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 4 -- Dirección General Corporativa. Signed criterion elevated
      // to red-wide standard with full chain documented as evidence-of-
      // response in VigiMed Insights.
      {
        label: {
          'mx-es': 'Dirección General Corporativa',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Posición institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/sistemas-hospitalarios/general.webp',
        chainTiers: ['criterio', 'estandar'],
        body: {
          'mx-es':
            'VigiMed elevó el patrón de bacteriemias al consejo corporativo con la cadena de evidencia ya consolidada por hospital, por servicio y por trimestre. La Dirección General firmó el criterio institucional actualizado como estándar de red ante consejo y reguladores, sin que el segundo hospital quedara expuesto como caso aislado ni que el tercer paciente entrara al expediente.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Cuando el evento llega al consejo como tendencia consolidada, no como dos incidentes que el corporativo apenas está reconstruyendo, la conversación con el regulador y con los hospitales cambia por completo."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-045-SSA2-2005, §3.1.3: "Asociación epidemiológica, a la situación en que dos o más casos comparten las características de tiempo, lugar y persona."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'CSG · CONAMED · NOM-045',
          'us-en': '[us-en pending]',
        },
      },
    ],
    chain: {
      tiers: {
        senal: {
          label: { 'mx-es': 'Señal', 'us-en': '[us-en pending]' },
          description: {
            'mx-es': 'Evento crítico detectado en el hospital donde ocurre',
            'us-en': '[us-en pending]',
          },
        },
        patron: {
          label: { 'mx-es': 'Patrón', 'us-en': '[us-en pending]' },
          description: {
            'mx-es':
              'Recurrencia confirmada del mismo evento en distintos hospitales',
            'us-en': '[us-en pending]',
          },
        },
        tendencia: {
          label: { 'mx-es': 'Tendencia', 'us-en': '[us-en pending]' },
          description: {
            'mx-es': 'Trayectoria del patrón a lo largo de la red',
            'us-en': '[us-en pending]',
          },
        },
        criterio: {
          label: { 'mx-es': 'Criterio', 'us-en': '[us-en pending]' },
          description: {
            'mx-es':
              'Regla corporativa derivada de la tendencia consolidada',
            'us-en': '[us-en pending]',
          },
        },
        estandar: {
          label: { 'mx-es': 'Estándar', 'us-en': '[us-en pending]' },
          description: {
            'mx-es':
              'Compromiso de red firmado ante consejo corporativo y reguladores',
            'us-en': '[us-en pending]',
          },
        },
      },
      frame: {
        'mx-es':
          'Cada rol corporativo opera en un punto. La cadena los conecta.',
        'us-en': '[us-en pending]',
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Section 4 -- Proof + Legitimacy (VM-450 D-S56-2 shipped the
  // regulatoryDocument theme; VM-471 mx-es content fill 2026-05-13).
  // Anchor: cross-hospital surveillance and corporate accreditation
  // chain (NOM-017, MOCEBPASS, NOM-004, NOM-016). Zone A is the
  // 4-card obligation grid; Zone B is the Acta itself; Zone C is
  // the chip rail. D-VM471-2: zoneB sealLabel keeps the slash-form
  // 'EVIDENCIA / SOSTENIDA'. D-VM471-3: zoneB marcoNormativo is
  // NOM-017-SSA2-2012 (not 2013 as the authoring doc shows); 2012
  // is the in-force revision and matches Tile 1.
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
          { text: 'Su red ya opera bajo obligaciones regulatorias medibles. ' },
          {
            text: 'VigiMed las verifica en tiempo real, no en reconstrucción.',
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
            'mx-es': 'NOM-017-SSA2-2012',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es':
              'Vigilancia epidemiológica obligatoria en hospitales del sector privado',
            'us-en': '[us-en pending]',
          },
          frequency: {
            'mx-es': 'CONTINUA Y MULTI-SITIO',
            'us-en': '[us-en pending]',
          },
        },
        {
          articleAnchor: {
            'mx-es': 'MOCEBPASS · DOF 25-IX-2025',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es': 'Certificación CSG de hospitales bajo estándares.',
            'us-en': '[us-en pending]',
          },
          frequency: {
            'mx-es': 'CICLO QUINQUENAL',
            'us-en': '[us-en pending]',
          },
        },
        {
          articleAnchor: {
            'mx-es': 'NOM-004-SSA3-2012 §1',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es':
              'Expediente clínico íntegro y trazable en cada hospital de la red',
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
            'mx-es':
              'Atención médica hospitalaria con calidad equivalente entre unidades',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'CONTINUA', 'us-en': '[us-en pending]' },
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
        'mx-es': '[Sistema Hospitalario, red multi-sitio]',
        'us-en': '[us-en pending]',
      },
      marcoNormativo: {
        'mx-es': 'NOM-017-SSA2-2012, §1.2',
        'us-en': '[us-en pending]',
      },
      obligationClauses: [
        {
          text: {
            'mx-es':
              'Notificación inmediata de brotes al SINAVE desde cada hospital, con evidencia trazable por unidad y por turno conforme al criterio MAPEVE.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Notificación SEVEIAAS consolidada por red, trazabilidad por hospital y por turno registrada en tiempo real, alerta automática ante umbral de brote cruzado entre unidades.',
            'us-en': '[us-en pending]',
          },
        },
        {
          text: {
            'mx-es':
              'Expediente clínico íntegro y trazable por paciente, con cadena de decisión documentada en cualquier hospital donde reciba atención.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Expediente trazable entre hospitales en tiempo real, cadena de decisión registrada por unidad y por servicio, integración verificable al cierre de cada evento clínico.',
            'us-en': '[us-en pending]',
          },
        },
        {
          text: {
            'mx-es':
              'Atención médica hospitalaria con calidad equivalente en cada unidad, con evidencia que sustente el criterio ante consejo y reguladores.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Variación de práctica clínica medida por hospital en tiempo real, criterio corporativo verificable contra evidencia por unidad, desviaciones consolidadas antes del comité médico de red.',
            'us-en': '[us-en pending]',
          },
        },
        {
          text: {
            'mx-es':
              'Análisis posterior de eventos críticos que sustente revisión consolidada, aprendizaje organizacional y defensa ante reclamación.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Reconstrucción consolidada por red disponible al cierre del evento, patrón documentado entre hospitales, sin reconstrucción retrospectiva entre unidades.',
            'us-en': '[us-en pending]',
          },
        },
      ],
      sealLabel: {
        'mx-es': 'EVIDENCIA / SOSTENIDA',
        'us-en': '[us-en pending]',
      },
    },
    zoneCEyebrow: { 'mx-es': 'OPERAMOS BAJO', 'us-en': '[us-en pending]' },
    zoneCChips: {
      'mx-es': ['NOM-017', 'NOM-004', 'MOCEBPASS', 'CSG'],
      'us-en': ['[us-en pending]'],
    },
  },

  // ---------------------------------------------------------------------------
  // Section 5 -- FAQ + final CTA (VM-471 mx-es content fill 2026-05-13).
  // §F (heading + reassurance) stays chassis-constant per ticket
  // non-goal.
  // ---------------------------------------------------------------------------
  section5: {
    faqHeading: {
      'mx-es': 'El detalle, en seis preguntas.',
      'us-en': '[us-en pending]',
    },
    faqCount: 6,
    faqDefaultOpen: 'none',
    faqClosingLine: {
      'mx-es': 'Resolvamos cualquier duda sobre su red en una conversación.',
      'us-en': '[us-en pending]',
    },
    faqItems: [
      {
        kind: 'withStep',
        step: 2,
        question: {
          'mx-es':
            '¿Qué ven exactamente las cámaras de VigiMed en cada hospital, y qué no ven?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'VigiMed instala cámaras dedicadas en áreas críticas de cada hospital de la red: quirófanos, salas de procedimientos, recuperación, neonatología, otras áreas de mayor riesgo según el perfil de cada unidad.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed instala cámaras dedicadas en áreas críticas de cada hospital de la red: quirófanos, salas de procedimientos, recuperación, neonatología, otras áreas de mayor riesgo según el perfil de cada unidad. La cobertura se configura por hospital, no como plantilla corporativa rígida, porque el riesgo varía entre unidades. Las cámaras no observan zonas de atención ambulatoria, áreas administrativas, ni espacios de descanso del personal. La consolidación cross-hospital opera sobre eventos detectados, no sobre video continuo entre unidades.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 3,
        question: {
          'mx-es':
            '¿Cómo funciona la confirmación humana cuando el evento ocurre en un hospital y la decisión corporativa la toma otro equipo?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'Cada detección pasa por un analista entrenado en el Compliance Review Center de VigiMed antes de que llegue una alerta a su red.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'Cada detección pasa por un analista entrenado en el Compliance Review Center de VigiMed antes de que llegue una alerta a su red. El analista confirma el evento contra el criterio corporativo, no contra reglas globales del vendor, y enruta la alerta al equipo del hospital donde ocurrió más al equipo de red según la matriz de coordinación configurada con su institución. La confirmación humana cierra el ciclo antes de que el corporativo reciba el dato como señal accionable.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 4,
        question: {
          'mx-es':
            'Si VigiMed notifica a la persona equivocada en el momento equivocado, los equipos de la red no toleran un segundo más de interrupción. ¿Quién decide cómo se coordina la respuesta?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'La matriz de coordinación, quién es notificado, en qué canal, en qué momento, se configura con cada hospital de su red por área crítica y por tipo de evento; no es una regla global ni un protocolo del vendor.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'La matriz de coordinación, quién es notificado, en qué canal, en qué momento, se configura con cada hospital de su red por área crítica y por tipo de evento; no es una regla global ni un protocolo del vendor. El corporativo establece el marco; cada hospital ajusta dentro del marco según su realidad operativa. La coordinación cross-hospital opera solo cuando el evento escala a patrón de red, no en cada detección individual.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 1,
        question: {
          'mx-es':
            'El equipo de red está saturado entre MAPEVE, MOCEBPASS, y el rollout corporativo. ¿Es este el momento?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es': 'Es el momento, justamente porque su red está saturada.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'Es el momento, justamente porque su red está saturada. VigiMed opera como servicio gestionado por hospital, no como plataforma que su equipo corporativo tiene que implementar y mantener unidad por unidad. La activación inicia por el hospital piloto que su institución elija; el rollout corporativo escala según la cadencia que su Dirección de Operaciones de Red defina, no la nuestra.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 6,
        question: {
          'mx-es':
            '¿Qué pasa si ocurre un evento adverso grave en un hospital de la red teniendo VigiMed implementado?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'La red llega a la conversación regulatoria con criterio corporativo firmado y respuesta documentada por hospital, no con reconstrucción retrospectiva entre unidades.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'La red llega a la conversación regulatoria con criterio corporativo firmado y respuesta documentada por hospital, no con reconstrucción retrospectiva entre unidades. La evidencia que VigiMed deposita es propiedad de su institución y vive en su expediente clínico por hospital, integrada al expediente corporativo de red. La conversación con CSG, CONAMED, o el regulador estatal sucede sobre evidencia consolidada por su red, no sobre reconstrucción que el corporativo apenas está armando.',
          'us-en': '[us-en pending]',
        },
      },
      {
        kind: 'withStep',
        step: 6,
        question: {
          'mx-es':
            'Estamos en ciclo de re-acreditación MOCEBPASS y JCI en varios hospitales de la red. ¿Adoptar VigiMed nos arriesga la auditoría?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'La auditoría revisa el expediente clínico de cada hospital y la cadena de evidencia consolidada por red.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'La auditoría revisa el expediente clínico de cada hospital y la cadena de evidencia consolidada por red. VigiMed deposita su evidencia ahí, no en un sistema paralelo, y mapea cada hallazgo contra los estándares MOCEBPASS aplicables al hospital y al alcance de red. La Subdirección de Calidad Corporativa llega al auditor con la cadena de evidencia ya consolidada entre unidades; el ciclo de re-acreditación no se interrumpe.',
          'us-en': '[us-en pending]',
        },
      },
    ],
    heading: {
      'mx-es': 'Hablemos del caso de su institución.',
      'us-en': '[us-en pending]',
    },
    reassurance: {
      'mx-es': 'Treinta minutos con el equipo que diseña VigiMed.',
      'us-en': '[us-en pending]',
    },
  },

  // ---------------------------------------------------------------------------
  // Sticky CTA (placeholder; ticket non-goal at V1).
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
