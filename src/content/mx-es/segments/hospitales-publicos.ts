// Hospitales Públicos mx-es segment fill.
// Locked content authored under VM-468 in Linear doc slug 81650e3174b5
// (Session 58, 2026-05-13). Engineering fill landed under VM-472
// (2026-05-13): pure mechanical replacement against the locked SSOT.
// §F (section5.heading + reassurance) and sticky prompts stay
// chassis-constant / placeholder per ticket non-goals.
//
// Locale handling: mx-es-only per D-S36-2. us-en values stay at
// '[us-en pending]' and never render (route guard returns notFound()
// for non-mx-es requests).
//
// D-VM468-eng-1: §C headshot filenames stay at the CM-pattern files
// already on disk (uveh.png / calidad.webp / medica.png / general.png
// under /public/headshots/hospitales-publicos/). The authoring doc
// cites HP-specific filenames (epidemiologia.webp, medica.webp,
// general.webp) that have not yet been produced; rename deferred
// until those assets land.
//
// D-VM468-eng-2: §B and §C Tab 4 carry asymmetric role labels
// intentionally. §B Tab 4 displays `Dirección de Coordinación de
// Hospitales` (network-layer buyer); §C Tab 4 displays `Dirección
// General del Hospital` (single-incident chain anchor at hospital
// scope). The TS shape allows different role labels at §B and §C
// because they live in separate fixture sections.
//
// Persona-matrix mapping (D-VM468-4): chassis PERSONA_ORDER is fixed
// at jefeUveh → calidad → medica → general. HP content maps by
// functional analog: jefeUveh ← Jefe de Epidemiología Hospitalaria,
// calidad ← Subdirección de Calidad, medica ← Dirección Médica,
// general ← Dirección de Coordinación de Hospitales. defaultPersona
// = 'jefeUveh' so the chain-origin role is the leftmost-rendered
// load-active default.

import type { ChassisFill } from '@/lib/chassis/slots';

export const hospitalesPublicosFillMxEs: ChassisFill = {
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
        { text: 'Hospitales Públicos', emphasis: 'amber' },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    claim: {
      'mx-es': [
        {
          text: 'Su equipo humano sostiene la atención segura cada minuto. La analítica de VigiMed la convierte en mejora continua demostrable.',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    video: { desktop: '', mobile: '', poster: '' },
    // VM-459 v1.13: optional S1.image takes precedence over video in
    // the asset bed render branch. WebP variants optimized from a
    // 8192x4608 source at quality 80 (Slot Map v1.13 §4.2).
    image: {
      desktop: '/images/segments/hospitales-publicos/hero.webp',
      mobile: '/images/segments/hospitales-publicos/hero-mobile.webp',
    },
  },

  // ---------------------------------------------------------------------------
  // Section 2 -- Operational Reality (VM-472 mx-es content fill 2026-05-13).
  // Persona x domain matrix: four buyer-chain personas, four UCs each.
  // Persona keys map by functional analog per D-VM468-4; chassis
  // PERSONA_ORDER is fixed (jefeUveh → calidad → medica → general),
  // so tabs render visually as Epidemiología (default active) →
  // Calidad → Médica → Coordinación de Hospitales.
  // ---------------------------------------------------------------------------
  section2: {
    eyebrow: {
      'mx-es': 'LA REALIDAD OPERATIVA',
      'us-en': '[us-en pending]',
    },
    // VM-457 D-S57-4: heading absorbs the migrated §A H1 semantic.
    // Inherited verbatim from CM per doc §B.2.
    heading: {
      'mx-es': 'Un incidente, una decisión que su institución toma una vez.',
      'us-en': '[us-en pending]',
    },
    // VM-457 D-S57-4: framing slot is RichParagraph for inline emphasis.
    // HP authors two-sentence prose without literal \n; chassis applies
    // `whiteSpace: 'pre-line'` so any author-side \n would render as
    // a hard break.
    framing: {
      'mx-es': [
        {
          text: 'Detección continua, confirmación humana, y análisis de cada evento crítico en sus áreas de mayor riesgo.\n',
        },
        {
          text: 'Inteligencia operativa para sostener la atención segura, no para reconstruirla.',
          emphasis: 'bold-amber',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    pressures: [],
    ucByPersona: {
      // jefeUveh ← Jefe de Epidemiología Hospitalaria (D-VM468-4).
      jefeUveh: {
        roleLabel: {
          'mx-es': 'Jefe de Epidemiología Hospitalaria',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Vigilancia epidemiológica',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Brote Intrahospitalario',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed detecta cada caso sospechoso en el momento, lo confirma contra el criterio epidemiológico vigente, y consolida el patrón por servicio antes de que escale a brote declarable.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'IAAS Notificación RHOVE',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed registra cada infección asociada a la atención de la salud al cierre del evento, la confirma contra el criterio NOM-045, y consolida el reporte mensual RHOVE sin reconstrucción retrospectiva.',
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
                'VigiMed verifica la cobertura de limpieza terminal en áreas críticas, confirma cada hallazgo contra el ciclo del paciente, y deja documentada la cadena de evidencia antes de la siguiente alta.',
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
                'VigiMed detecta segregación incorrecta en el punto de generación, confirma cada evento contra el criterio normativo, y consolida el patrón por servicio antes de que se vuelva hallazgo de auditoría sanitaria.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // calidad ← Subdirección de Calidad (D-VM468-4).
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
              'mx-es': 'Brote Intrahospitalario',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed sostiene la trazabilidad del brote desde la primera señal, documenta cada decisión institucional contra el criterio de calidad, y entrega evidencia continua para el comité antes de la siguiente reunión.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'IAAS Notificación RHOVE',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed convierte cada notificación en evidencia sostenida, alineada al Modelo de Gestión de Calidad en Salud, y disponible para acreditación CSG sin reconstrucción del expediente.',
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
                'VigiMed produce la evidencia continua de cumplimiento de limpieza terminal, la consolida por servicio y por turno, y la deja lista para la cédula de acreditación antes de la visita.',
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
                'VigiMed deja constancia documentada de cada evento de segregación, lo vincula al expediente del servicio responsable, y sostiene el patrón para el seguimiento de mejora continua del comité.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // medica ← Dirección Médica (D-VM468-4).
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
              'mx-es': 'Brote Intrahospitalario',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed entrega el patrón confirmado al cierre del turno, documenta la decisión médica institucional adoptada, y deja constancia del criterio aplicado antes de la siguiente comunicación a coordinación.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'IAAS Notificación RHOVE',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed sostiene la trazabilidad clínica de cada IAAS, la liga al expediente del paciente, y produce el criterio médico institucional que respalda la decisión registrada en RHOVE.',
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
                'VigiMed conecta cada hallazgo de limpieza al ciclo clínico del paciente, documenta la decisión médica asociada, y sostiene la evidencia para la junta clínica antes del cierre del caso.',
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
                'VigiMed liga cada evento de segregación al expediente del servicio que lo generó, documenta la decisión médica de contención, y sostiene la evidencia para revisión institucional.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // general ← Dirección de Coordinación de Hospitales (D-VM468-4).
      // D-VM468-eng-2: §B Tab 4 label is the network-layer buyer
      // (`Dirección de Coordinación de Hospitales`); §C Tab 4 label
      // is the single-incident chain anchor at hospital scope
      // (`Dirección General del Hospital`). Asymmetry is intentional.
      general: {
        roleLabel: {
          'mx-es': 'Dirección de Coordinación de Hospitales',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Posición institucional',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Brote Intrahospitalario',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed consolida el reporte agregado de cada brote por unidad, lo confirma contra el criterio institucional de la coordinación, y produce la posición defendible antes de la siguiente comunicación federal.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'IAAS Notificación RHOVE',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed entrega el reporte RHOVE por unidad de la red, consolidado y verificable contra el criterio nacional, listo para sostener la posición institucional ante la Dirección General de Epidemiología.',
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
                'VigiMed produce la evidencia agregada de cumplimiento de limpieza por unidad, alineada al criterio de la coordinación, y disponible para la rendición de cuentas ante el órgano de control correspondiente.',
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
                'VigiMed consolida el patrón de segregación por unidad de la red, lo confirma contra el criterio normativo aplicable, y sostiene la posición institucional ante la autoridad sanitaria al momento del requerimiento.',
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
  // shape; VM-472 mx-es content fill 2026-05-13). Single-incident
  // walkthrough per D-VM468-7: brote intrahospitalario por bacteria
  // multirresistente en UCI, contenido antes de cruzar el umbral de
  // brote declarable bajo NOM-045. Tab 1 detects the index case in
  // real time and prevents the second infection; Tabs 2-4 consolidate
  // the response into institutional evidence and supra-institutional
  // position. tabCount: 4; tabDefault: 1. D-VM468-eng-2: §C Tab 4
  // role is `Dirección General del Hospital`, NOT the §B `Dirección
  // de Coordinación de Hospitales` (asymmetry preserved per the
  // single-incident chain-anchor reading at hospital scope).
  // ---------------------------------------------------------------------------
  section3: {
    eyebrow: {
      'mx-es':
        'VIGIMED EN LA PRÁCTICA: EL CAMINO DE RESOLUCIÓN DE UN INCIDENTE',
      'us-en': '[us-en pending]',
    },
    // VM-472 mx-es heading per doc §C.2: two-sentence prose with
    // explicit \n preserved between sentences (matches CM precedent
    // pattern). Section3PerBuyerChainProof.tsx applies
    // whiteSpace: 'pre-line'.
    heading: {
      'mx-es':
        'Un caso índice detectado en el momento.\nEl brote contenido antes de declararse, y la cadena de decisión documentada.',
      'us-en': '[us-en pending]',
    },
    // headingFrame inherited verbatim from CM per doc §C.2; chain noun
    // phrase rendered in bold-amber with trailing period inside the
    // span. No \n; CSS wraps the surrounding segments while
    // .vm-section-3-heading-frame keeps the bold-amber span unbroken
    // at >=1280px.
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
      // Tab 1 -- Jefe de Epidemiología Hospitalaria. Chain origin:
      // first index case detected at culture confirmation, escalated
      // to hospital surveillance, cohort isolated, second case
      // prevented. Doc label is 35 chars; labelMobile shortens for
      // the accordion trigger.
      {
        label: {
          'mx-es': 'Jefe de Epidemiología Hospitalaria',
          'us-en': '[us-en pending]',
        },
        labelMobile: {
          'mx-es': 'Jefe Epi. Hosp.',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Vigilancia epidemiológica',
          'us-en': '[us-en pending]',
        },
        // D-VM468-eng-1: CM-pattern filename retained until HP-
        // specific headshot asset (epidemiologia.webp) lands.
        headshot: '/headshots/hospitales-publicos/uveh.png',
        chainTiers: ['senal', 'patron'],
        body: {
          'mx-es':
            'VigiMed detectó el primer caso sospechoso de infección por bacteria multirresistente en UCI al cierre del turno, en el momento del cultivo confirmatorio. La señal escaló a vigilancia hospitalaria antes del siguiente ingreso al servicio. La cohorte se aisló, el segundo caso no apareció, y el evento entró al registro institucional como señal documentada lista para notificación RHOVE.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Sin la alerta en tiempo real, el segundo caso aparece la siguiente semana, y nosotros declarando brote contra reloj sin saber dónde empezó."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-045-SSA2-2005, §3.1: "Vigilancia Epidemiológica de Infecciones Nosocomiales: a la observación y análisis sistemáticos, continuos y activos de la ocurrencia y distribución de las infecciones nosocomiales."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'RHOVE · NOM-045 · SINAVE',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 2 -- Subdirección de Calidad. Pattern consolidated into a
      // single trazabilidad chain, evidence ready for committee and
      // for next CSG accreditation visit. Doc label fits desktop tab
      // budget; no labelMobile needed.
      {
        label: {
          'mx-es': 'Subdirección de Calidad',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Calidad y acreditación',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/hospitales-publicos/calidad.webp',
        chainTiers: ['patron', 'tendencia'],
        body: {
          'mx-es':
            'VigiMed sostuvo la trazabilidad de la cohorte desde la primera señal hasta el cierre del caso. Cada decisión institucional quedó documentada contra el criterio de calidad institucional. El comité de Calidad y Seguridad del Paciente recibió la evidencia consolidada antes de la siguiente reunión, alineada al Modelo de Gestión de Calidad en Salud y disponible para la siguiente visita de acreditación CSG.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"La acreditación se gana o se pierde por lo que se puede demostrar el día que llega la visita, no por lo que recordamos haber hecho."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'DGCES, Modelo de Gestión de Calidad en Salud: "atención médica segura" como uno de los cinco resultados de valor del Sistema Nacional de Salud, alineado a las acciones esenciales para la seguridad del paciente.',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'DGCES · MGCS · CSG',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 3 -- Dirección Médica. Tendency arrives at clinical
      // leadership with confirmed pattern; institutional clinical
      // decision (isolation + antibiotic protocol review) signed and
      // documented in the expediente. Doc label fits desktop tab
      // budget; no labelMobile needed.
      {
        label: { 'mx-es': 'Dirección Médica', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Decisión clínica institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/hospitales-publicos/medica.png',
        chainTiers: ['tendencia', 'criterio'],
        body: {
          'mx-es':
            'VigiMed entregó el patrón confirmado al cierre del turno de UCI. La Dirección Médica adoptó la decisión clínica institucional de aislamiento y revisión de protocolo antibiótico, con criterio aplicado documentado y firmado al expediente. La cadena de decisión quedó trazable por turno y por servicio, lista para la junta clínica y para la comunicación a la coordinación correspondiente sin reconstrucción retrospectiva.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"La decisión médica institucional ante un brote no se discute después: se documenta en el momento, o no se documenta nunca."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-016-SSA3-2012: "Esta norma es de observancia obligatoria para todos los establecimientos hospitalarios de los sectores público, social y privado... que tengan como finalidad la atención de pacientes que se internen para su diagnóstico, tratamiento médico, quirúrgico o rehabilitación."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'NOM-016 · NOM-004 · Expediente Clínico',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 4 -- Dirección General del Hospital. Consolidated
      // institutional report on the contained event; institutional
      // position sustained ante coordinación federal y autoridad
      // sanitaria. D-VM468-eng-2: §C Tab 4 substitutes the
      // single-incident hospital-scope role for the §B
      // network-layer role label. Doc label is 31 chars;
      // labelMobile shortens for the accordion trigger.
      {
        label: {
          'mx-es': 'Dirección General del Hospital',
          'us-en': '[us-en pending]',
        },
        labelMobile: {
          'mx-es': 'Dir. Gen. Hosp.',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Posición institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/hospitales-publicos/general.png',
        chainTiers: ['criterio', 'estandar'],
        body: {
          'mx-es':
            'VigiMed entregó el reporte institucional consolidado del evento: caso índice, cohorte, decisiones documentadas y patrón confirmado. La Dirección General sostuvo la posición institucional ante la coordinación federal en la siguiente comunicación, con evidencia verificable lista para la autoridad sanitaria al momento del requerimiento, sin reconstrucción del expediente.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Cuando la autoridad sanitaria pregunta, el reloj corre. La diferencia entre defender la institución y reconstruir lo ocurrido se mide en horas."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'Ley General de Salud, Art. 393: "Corresponde a la Secretaría de Salud y a los gobiernos de las entidades federativas, en el ámbito de sus respectivas competencias, la vigilancia del cumplimiento de esta Ley y demás disposiciones que se dicten con base en ella."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'LGS Art. 393 · Coordinación Federal · OIC',
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
        // D-VM468-9: estándar tier definition adapted for public-system
        // scope. Public-sector accountability surface is coordinación
        // federal + órgano de control, not patronato + private
        // regulators (the CM-inherit definition).
        estandar: {
          label: { 'mx-es': 'Estándar', 'us-en': '[us-en pending]' },
          description: {
            'mx-es':
              'Compromiso institucional firmado ante coordinación federal y órgano de control',
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
  // Section 4 -- Proof + Legitimacy (VM-450 D-S56-2 shipped the
  // regulatoryDocument theme; VM-472 mx-es content fill 2026-05-13).
  // Anchor: NOM-045 §5 vigilance-and-notification obligation per
  // D-VM468-12. Top-row tile set per D-VM468-11 (vigilancia-anchor
  // mix: NOM-045 / NOM-016 / NOM-004 / DGCES). Acta panel anchored
  // on NOM-045 §5 with `[Establecimiento hospitalario del Sistema
  // Nacional de Salud]` per D-VM468-13 (maximum-addressability frame
  // across federal-tertiary / HG-regional / IMSS-Bienestar /
  // Secretarías Estatales). Amber lead-in per D-VM468-14 drops `más`
  // and flips `no en` → `sin`. sealLabel preserves the slash form
  // (`EVIDENCIA / SOSTENIDA`) for cross-segment visual consistency.
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
          { text: 'Su hospital opera bajo obligaciones regulatorias medibles. ' },
          {
            text: 'VigiMed las verifica en tiempo real, sin reconstrucción.',
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
            'mx-es': 'NOM-045-SSA2-2005',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es': 'Vigilancia epidemiológica y notificación de IAAS',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'MENSUAL', 'us-en': '[us-en pending]' },
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
          articleAnchor: { 'mx-es': 'DGCES', 'us-en': '[us-en pending]' },
          label: {
            'mx-es': 'Acciones Esenciales para la Seguridad del Paciente',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'OPERATIVA', 'us-en': '[us-en pending]' },
        },
      ],
    },
    zoneB: {
      kind: 'regulatoryDocument',
      actaHeader: {
        'mx-es': 'VIGIMED · ACTA DE CUMPLIMIENTO REGULATORIO',
        'us-en': '[us-en pending]',
      },
      folio: { 'mx-es': 'FOLIO VM-MX-04128', 'us-en': '[us-en pending]' },
      establecimientoLabel: {
        'mx-es': '[Establecimiento hospitalario del Sistema Nacional de Salud]',
        'us-en': '[us-en pending]',
      },
      marcoNormativo: {
        'mx-es': 'NOM-045-SSA2-2005, §5',
        'us-en': '[us-en pending]',
      },
      obligationClauses: [
        {
          text: {
            'mx-es':
              'Notificación inmediata de casos sospechosos de IAAS y eventos centinela a la UVEH, conforme a los criterios de los manuales de vigilancia epidemiológica de infecciones nosocomiales vigentes.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Notificación generada al cierre del evento con criterio confirmado, escalada automáticamente a la UVEH antes del siguiente turno, sin recompilación de expediente.',
            'us-en': '[us-en pending]',
          },
        },
        {
          text: {
            'mx-es':
              'Notificación mensual de casos de infección nosocomial vía RHOVE conforme a los formatos institucionales vigentes, validada por la UVEH y disponible para la Dirección General de Epidemiología.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Reporte mensual RHOVE consolidado por servicio y por turno, validado contra registro institucional, listo para envío sin reconstrucción del periodo.',
            'us-en': '[us-en pending]',
          },
        },
        {
          text: {
            'mx-es':
              'Estudio epidemiológico de brote ante situaciones que así lo requieran, con cadena de decisión documentada y evidencia disponible para revisión institucional y para la autoridad sanitaria competente.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Cadena de decisión registrada en el momento de cada acción, trazable por turno y por servicio, con expediente del brote disponible para junta clínica y para coordinación al cierre del evento.',
            'us-en': '[us-en pending]',
          },
        },
        {
          text: {
            'mx-es':
              'Acceso, disponibilidad y conservación de las fuentes de información para el estudio de infecciones nosocomiales, el uso de antimicrobianos y la evolución de la resistencia antimicrobiana.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Repositorio institucional sostenido en tiempo real, con acceso por rol y por servicio, verificable ante autoridad sanitaria al momento del requerimiento sin reconstrucción retrospectiva.',
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
      'mx-es': ['NOM-045', 'NOM-016', 'NOM-004', 'DGCES'],
      'us-en': ['[us-en pending]'],
    },
  },

  // ---------------------------------------------------------------------------
  // Section 5 -- FAQ + final CTA (VM-472 mx-es content fill 2026-05-13).
  // §F (heading + reassurance) stays chassis-constant per ticket
  // non-goal. faqItems render in doc-literal order with steps
  // [1, 2, 3, 4, 6, 6]; Step 6 appears twice (Items 5 + 6) per
  // WF-VM468-10. Item 5 addresses adverse-event audit audience
  // (coordinación federal + OIC), Item 6 addresses continuous
  // notification + acreditación cycle (RHOVE).
  // ---------------------------------------------------------------------------
  section5: {
    faqHeading: {
      'mx-es': 'El detalle, en seis preguntas.',
      'us-en': '[us-en pending]',
    },
    faqCount: 6,
    faqDefaultOpen: 'none',
    faqClosingLine: {
      'mx-es': 'Resolvamos cualquier duda en una conversación.',
      'us-en': '[us-en pending]',
    },
    faqItems: [
      // Item 1 -- Step 1 DESPLEGAR. Budget / PEF / saturación
      // adoption-precondition question (D-VM468-16).
      {
        kind: 'withStep',
        step: 1,
        question: {
          'mx-es':
            'Estamos en presión de presupuesto con recortes recientes al sector. ¿Es este el momento?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'Es el momento, justamente porque su hospital opera bajo más presión que nunca con la misma estructura.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'Es el momento, justamente porque su hospital opera bajo más presión que nunca con la misma estructura. VigiMed no agrega plazas ni reemplaza personal: convierte el trabajo que su equipo ya hace en evidencia continua y defendible, sin reconstrucción retrospectiva.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 2 -- Step 2 DETECTAR. Camera scope question.
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
            'VigiMed instala cámaras dedicadas en áreas críticas: UCI, quirófanos, salas de procedimientos, urgencias, otras áreas de mayor riesgo según el perfil de su institución.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed instala cámaras dedicadas en áreas críticas: UCI, quirófanos, salas de procedimientos, urgencias, otras áreas de mayor riesgo según el perfil de su institución. Las cámaras detectan eventos de proceso institucional: ingreso, vestimenta, cumplimiento de protocolo, segregación. No reemplazan vigilancia clínica ni reconocen pacientes.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 3 -- Step 3 CONFIRMAR. Compliance Review Center human
      // confirmation question.
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
            'Cada detección pasa por un analista entrenado en el Compliance Review Center de VigiMed antes de que llegue una alerta a su institución. La señal viaja con criterio aplicado, no sin filtrar. Los falsos positivos no llegan a su equipo, y los eventos confirmados llegan con expediente listo.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 4 -- Step 4 COORDINAR. Notification-matrix configurability
      // question with public-sector saturation tail (D-VM468-17).
      {
        kind: 'withStep',
        step: 4,
        question: {
          'mx-es':
            'Si VigiMed notifica a la persona equivocada en el momento equivocado, nuestros equipos en UCI y urgencias no toleran un segundo más de interrupción bajo saturación. ¿Quién decide cómo se coordina la respuesta?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'La matriz de coordinación, quién es notificado, en qué canal, en qué momento, se configura con su institución por área crítica y por tipo de evento; no es una regla global ni un protocolo del vendor.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'La matriz de coordinación, quién es notificado, en qué canal, en qué momento, se configura con su institución por área crítica y por tipo de evento; no es una regla global ni un protocolo del vendor. La saturación se respeta como condición operativa, no como excusa para silenciar la señal.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 5 -- Step 6 DOCUMENTAR. Evento adverso grave audit
      // audience: coordinación federal + OIC (D-VM468-18).
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
            'La institución llega a la coordinación federal y al órgano de control con criterio firmado y respuesta documentada, no con reconstrucción retrospectiva.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'La institución llega a la coordinación federal y al órgano de control con criterio firmado y respuesta documentada, no con reconstrucción retrospectiva. La autoridad sanitaria revisa el expediente clínico; VigiMed deposita su evidencia ahí, no en un sistema paralelo.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 6 -- Step 6 DOCUMENTAR. RHOVE notification + acreditación
      // cycle continuity (D-VM468-19). Same step indicator as Item 5
      // per WF-VM468-10; distinct institutional fear (continuous
      // reporting cycle vs adverse-event audit).
      {
        kind: 'withStep',
        step: 6,
        question: {
          'mx-es':
            'Estamos en ciclo de actualización RHOVE y de acreditación. ¿Adoptar VigiMed nos arriesga la notificación en curso?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'La notificación RHOVE y la acreditación revisan el expediente clínico institucional, no un sistema paralelo.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'La notificación RHOVE y la acreditación revisan el expediente clínico institucional, no un sistema paralelo. VigiMed deposita su evidencia ahí, leyendo lo que ya existe en lugar de reconstruirlo, lo que mantiene la continuidad del reporte sin abrir un frente paralelo durante el ciclo.',
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
