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
  // Section 3 -- Per-Buyer-Chain Proof (VM-448 D-S49-3 chain variant; v2
  // incident-walkthrough framing per VM-448 corrective patch 2026-05-08).
  // tabCount: 4 (Jefe de UVEH, Subdirección de Calidad, Dirección
  // Médica, Dirección General); tabDefault: 1 (Jefe de UVEH = chain
  // origin under incident-walkthrough framing).
  // ---------------------------------------------------------------------------
  section3: {
    eyebrow: {
      'mx-es':
        'VIGIMED EN LA PRÁCTICA: EL CAMINO DE RESOLUCIÓN DE UN INCIDENTE',
      'us-en': '[us-en pending]',
    },
    heading: {
      'mx-es':
        'Un paciente regresa con infección de sitio quirúrgico. La causa: un quiebre de campo estéril hace siete días.',
      'us-en': '[us-en pending]',
    },
    headingFrame: {
      'mx-es': [
        { text: 'Cada rol institucional opera en un punto distinto de la cadena ' },
        {
          text: 'señal → patrón → tendencia → criterio → estándar',
          emphasis: 'bold-amber',
        },
        { text: '.\nVea cómo VigiMed se acopla al suyo.' },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    tabCount: 4,
    tabDefault: 1,
    tabs: [
      {
        label: { 'mx-es': 'Jefe de UVEH', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Vigilancia epidemiológica',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/centros-medicos/uveh.png',
        chainTiers: ['senal', 'patron'],
        result: {
          'mx-es':
            'El reingreso confirmó la infección. La señal del quiebre de campo estéril ya estaba en VigiMed desde el día de la cirugía, y el patrón por sala cardiotorácica se consolidó sin reconstrucción.',
          'us-en': '[us-en pending]',
        },
        step: {
          'mx-es':
            'Antes: la jefatura abría dos semanas de revisión retrospectiva de expedientes para reconstruir si había habido más casos similares por sala. Con VigiMed: la señal del quiebre quedó registrada en tiempo real, el patrón por sala se consolidó automáticamente, y la jefatura empieza su trabajo donde antes terminaba.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Antes pasaba dos semanas armando si había más casos. Ahora el patrón ya está. Mi trabajo empieza donde antes terminaba."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-045-SSA2-2005, §3.1: "Vigilancia Epidemiológica de Infecciones Nosocomiales: a la observación y análisis sistemáticos, continuos y activos de la ocurrencia y distribución de las infecciones nosocomiales, así como de los factores de riesgo asociados a éstas."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'RHOVE · NOM-045 · NOM-016',
          'us-en': '[us-en pending]',
        },
      },
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
        result: {
          'mx-es':
            'La trayectoria del patrón quedó visible antes de que el caso se volviera hallazgo. La revisión institucional consultó una sola tendencia documentada, no tres reportes paralelos en formatos distintos.',
          'us-en': '[us-en pending]',
        },
        step: {
          'mx-es':
            'Antes: tres documentos paralelos para tres marcos de revisión, cada uno con su propio formato y su propia ventana de tiempo. Con VigiMed: una sola tendencia institucional, leída por todos los marcos concurrentes desde la misma evidencia. El Plan de Mejora Continua se redactó leyendo, no reconstruyendo.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Llegué a la junta con una tendencia firmada. Antes llegaba con tres documentos y los explicaba uno por uno."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-004-SSA3-2012, §1: "Esta norma, establece los criterios científicos, éticos, tecnológicos y administrativos obligatorios en la elaboración, integración, uso, manejo, archivo, conservación, propiedad, titularidad y confidencialidad del expediente clínico."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'NOM-004 · CONAMED · CSG',
          'us-en': '[us-en pending]',
        },
      },
      {
        label: { 'mx-es': 'Dirección Médica', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Decisión clínica institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/centros-medicos/medica.png',
        chainTiers: ['tendencia', 'criterio'],
        result: {
          'mx-es':
            'El comité clínico decidió la intervención sobre la sala cardiotorácica con tendencia documentada por servicio. El criterio institucional se firmó en una sesión, no en tres.',
          'us-en': '[us-en pending]',
        },
        step: {
          'mx-es':
            'Antes: el comité abría sesión con cifras desconectadas de su contexto operativo, y dedicaba la primera hora a alinear interpretación. Con VigiMed: la tendencia llegó al comité ya cruzada con resultados de paciente y causa raíz documentada. La sesión arrancó en decisión, no en reconstrucción.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"El comité me pregunta por qué pasó. Antes daba cifras y las defendía. Ahora doy criterio y lo sostengo."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-004-SSA3-2012, §1: "Esta norma, establece los criterios científicos, éticos, tecnológicos y administrativos obligatorios en la elaboración, integración, uso, manejo, archivo, conservación, propiedad, titularidad y confidencialidad del expediente clínico."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'CONAMED · NOM-004 · CSG',
          'us-en': '[us-en pending]',
        },
      },
      {
        label: { 'mx-es': 'Dirección General', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Posición institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/centros-medicos/general.png',
        chainTiers: ['criterio', 'estandar'],
        result: {
          'mx-es':
            'El consejo recibió el caso como evidencia de respuesta institucional, no como crisis reputacional. La posición ante aseguradora y CONAMED se sostuvo con el criterio firmado, ya elevado a estándar reportable.',
          'us-en': '[us-en pending]',
        },
        step: {
          'mx-es':
            'Antes: una infección con reingreso disparaba reuniones extraordinarias del consejo, defensa reactiva ante aseguradora, y exposición individual de la dirección general. Con VigiMed: el criterio clínico ya firmado por el comité subió al consejo como estándar institucional. La posición ante reguladores se construyó antes de que la llamada llegara.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Al consejo no le importa el evento. Le importa cómo respondió la institución. Esta vez tenía la respuesta antes de la pregunta."',
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
  // Section 4 -- Proof + Legitimacy (placeholder; VM-441 fills)
  // ---------------------------------------------------------------------------
  section4: {
    zoneAEyebrow: {
      'mx-es': '[S4 eyebrow pending]',
      'us-en': '[S4 eyebrow pending]',
    },
    zoneAMetrics: [
      {
        'mx-es': { value: '[pending]', label: '[pending]' },
        'us-en': { value: '[pending]', label: '[pending]' },
      },
      {
        'mx-es': { value: '[pending]', label: '[pending]' },
        'us-en': { value: '[pending]', label: '[pending]' },
      },
      {
        'mx-es': { value: '[pending]', label: '[pending]' },
        'us-en': { value: '[pending]', label: '[pending]' },
      },
      {
        'mx-es': { value: '[pending]', label: '[pending]' },
        'us-en': { value: '[pending]', label: '[pending]' },
      },
    ],
    zoneBEyebrow: {
      'mx-es': '[S4.B eyebrow pending]',
      'us-en': '[S4.B eyebrow pending]',
    },
    zoneBVideo: { desktop: '', mobile: '', poster: '' },
    zoneBFrame: {
      'mx-es': '[S4.B frame pending]',
      'us-en': '[S4.B frame pending]',
    },
    zoneBUcAnchor: '[uc anchor pending]',
    zoneCEyebrow: {
      'mx-es': '[S4.C eyebrow pending]',
      'us-en': '[S4.C eyebrow pending]',
    },
    zoneCChips: {
      'mx-es': ['[chip 1]', '[chip 2]', '[chip 3]', '[chip 4]'],
      'us-en': ['[chip 1]', '[chip 2]', '[chip 3]', '[chip 4]'],
    },
  },

  // ---------------------------------------------------------------------------
  // Section 5 -- Final CTA (placeholder; VM-441 fills)
  // ---------------------------------------------------------------------------
  section5: {
    faqEyebrow: {
      'mx-es': '[FAQ eyebrow pending]',
      'us-en': '[FAQ eyebrow pending]',
    },
    faqItems: [
      {
        question: {
          'mx-es': '[pregunta 1 pendiente]',
          'us-en': '[question 1 pending]',
        },
        answer: {
          'mx-es': '[respuesta 1 pendiente]',
          'us-en': '[answer 1 pending]',
        },
      },
      {
        question: {
          'mx-es': '[pregunta 2 pendiente]',
          'us-en': '[question 2 pending]',
        },
        answer: {
          'mx-es': '[respuesta 2 pendiente]',
          'us-en': '[answer 2 pending]',
        },
      },
      {
        question: {
          'mx-es': '[pregunta 3 pendiente]',
          'us-en': '[question 3 pending]',
        },
        answer: {
          'mx-es': '[respuesta 3 pendiente]',
          'us-en': '[answer 3 pending]',
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
