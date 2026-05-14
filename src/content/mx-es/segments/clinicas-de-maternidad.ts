// Clínicas de Maternidad mx-es segment fill.
// Locked content authored under VM-469 in Linear doc slug efd4b4af79ae
// (Session 59, 2026-05-13). Engineering fill landed under VM-473
// (2026-05-13): pure mechanical replacement against the locked SSOT.
// §F (section5.heading + reassurance) and sticky prompts stay
// chassis-constant / placeholder per ticket non-goals.
//
// Locale handling: mx-es-only per D-S36-2. us-en values stay at
// '[us-en pending]' and never render (route guard returns notFound()
// for non-mx-es requests).
//
// D-VM473-1: §B PersonaKey mapping. Chassis PERSONA_ORDER is fixed at
// jefeUveh → calidad → medica → general. CdM content maps by visual
// tab order per VM-469 doc §B (D-VM469-5):
//   - jefeUveh ← Director Médico (Tab 1, default-active per D-VM469-8)
//   - calidad  ← Jefa de Enfermería Obstétrica (Tab 2, chain-origin in §C)
//   - medica   ← Coordinación de Calidad y Seguridad del Paciente (Tab 3)
//   - general  ← Dirección General (Tab 4)
// defaultPersona = 'jefeUveh' so Director Médico is the leftmost-
// rendered cold-load default. §B/§C tab default asymmetry is
// intentional per D-VM469-10 (§B default = Director Médico for the
// institutional-decision frame; §C default = Jefa de Enfermería
// Obstétrica as chain-origin for the UC12 walkthrough).
//
// D-VM469-4: §B matrix shape is 4×3 (four personas × three UCs),
// divergent from CM/SH/HP 4×4. Bounded by the three-UC product
// offering for this segment (UC6 Puerta de Aislamiento, UC7 Salidas
// de Emergencia, UC12 Código Rosa); not a register choice.
//
// VM-473 Decision 6: hero.image key omitted entirely so the chassis
// renders its navy-gradient fallback. No `image` slot ships for this
// fixture until the maternity asset workstream produces a final hero
// frame.
//
// D-VM469-15: §D Acta establecimientoLabel ships as `[Clínica de
// Maternidad]` per the maternity-context placeholder shape.
// marcoNormativo anchors on Ley General de Salud, Art. 64 (federal
// statute, not norma) per D-VM469-14.
//
// D-VM469-7: §B ucSupplement substituted to `Tres perímetros
// institucionales sostenidos en tiempo real, más la inteligencia
// documentada que emerge de VigiMed Insights.` The chassis catalog-
// supplement lineage is dropped because the three-UC scope is the
// entire offering for this segment, not a subset.
//
// D-VM469-11: §C chain-anchor `estandar` tier description substituted
// for owner-clinician institutional accountability surface (`familia,
// autoridad sanitaria y responsable sanitario`), replacing the
// private-sector and public-system lineages carried by sister
// segments.
//
// sealLabel: ships in slash form (`EVIDENCIA / SOSTENIDA`) per cross-
// segment visual precedent (CM/SH/HP). The VM-469 doc renders the
// badge space-separated; the slash separator is a chassis-render
// convention preserved for visual consistency across the v1 slate.

import type { ChassisFill } from '@/lib/chassis/slots';

export const clinicasDeMaternidadFillMxEs: ChassisFill = {
  // ---------------------------------------------------------------------------
  // Section 1 -- Hero (VM-457 Palantir two-column restructure, 2026-05-12).
  // 3-slot composition: pageTitle (left ~60%) + claim (right ~40%) +
  // asset bed below. Migrated §A H1 and subhead moved to §2 per
  // D-S57-4 (see section2.heading and section2.framing below).
  //
  // VM-473 Decision 6: `image` slot omitted entirely. Chassis falls
  // back to the navy-gradient asset bed until maternity-segment hero
  // imagery is produced.
  // ---------------------------------------------------------------------------
  hero: {
    pageTitle: {
      'mx-es': [
        { text: 'VigiMed para ' },
        { text: 'Clínicas de Maternidad', emphasis: 'amber' },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    claim: {
      'mx-es': [
        {
          text: 'Tres puertas. Una salida. Un recién nacido. La evidencia continua de que cada perímetro se sostuvo cuando la institución no podía fallar.',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    video: { desktop: '', mobile: '', poster: '' },
  },

  // ---------------------------------------------------------------------------
  // Section 2 -- Operational Reality (VM-473 mx-es content fill 2026-05-13).
  // 4×3 persona x UC matrix per D-VM469-4: four buyer-chain personas,
  // three UCs each (UC6 Puerta de Aislamiento, UC7 Salidas de
  // Emergencia, UC12 Código Rosa). Persona keys map by D-VM473-1;
  // chassis PERSONA_ORDER is fixed (jefeUveh → calidad → medica →
  // general), so tabs render visually as Director Médico (default
  // active) → Jefa de Enfermería Obstétrica → Coordinación de Calidad
  // y Seguridad del Paciente → Dirección General.
  // ---------------------------------------------------------------------------
  section2: {
    eyebrow: {
      'mx-es': 'LA REALIDAD OPERATIVA',
      'us-en': '[us-en pending]',
    },
    // VM-457 D-S57-4: heading absorbs the migrated §A H1 semantic.
    // Inherited verbatim from CM/SH/HP per doc §B.2.
    heading: {
      'mx-es': 'Un incidente, una decisión que su institución toma una vez.',
      'us-en': '[us-en pending]',
    },
    // VM-457 D-S57-4: framing slot is RichParagraph for inline emphasis.
    // Plain sentence 1 inherited verbatim from CM/SH/HP; bold-amber
    // sentence 2 carries the segment perimeter-integrity spine per
    // D-VM469-6. Trailing \n on sentence 1 preserved so
    // `whiteSpace: 'pre-line'` renders a hard break before the amber
    // line, matching CM precedent.
    framing: {
      'mx-es': [
        {
          text: 'Detección continua, confirmación humana, y análisis de cada evento crítico en sus áreas de mayor riesgo.\n',
        },
        {
          text: 'Inteligencia operativa para sostener cada perímetro, no para reconstruir lo ocurrido.',
          emphasis: 'bold-amber',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    pressures: [],
    ucByPersona: {
      // jefeUveh ← Director Médico (D-VM473-1). Tab 1, default-active
      // per D-VM469-8.
      jefeUveh: {
        roleLabel: {
          'mx-es': 'Director Médico',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Decisión clínica institucional',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Puerta de Aislamiento',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed registra cada apertura de la puerta de aislamiento fuera de protocolo, la confirma contra el caso clínico activo, y deja documentada la cadena de decisión médica institucional antes del siguiente cambio de turno.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Salidas de Emergencia',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed verifica la integridad de cada ruta de evacuación obstétrica y neonatal en tiempo real, confirma cada obstrucción contra el protocolo institucional, y sostiene la evidencia médica para la junta antes del siguiente simulacro.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Código Rosa',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed sostiene la trazabilidad de cada activación de Código Rosa desde el primer punto de control, confirma la decisión médica institucional adoptada, y deja constancia del criterio aplicado antes del cierre del evento.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // calidad ← Jefa de Enfermería Obstétrica (D-VM473-1). Tab 2.
      calidad: {
        roleLabel: {
          'mx-es': 'Jefa de Enfermería Obstétrica',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Operación clínica de piso',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Puerta de Aislamiento',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed detecta cada apertura de la puerta de aislamiento en el momento que ocurre, confirma el cumplimiento del protocolo de cohorte, y consolida el patrón de quiebres por turno antes de que escale a hallazgo clínico.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Salidas de Emergencia',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed verifica que cada ruta de evacuación esté despejada al inicio de cada turno, confirma cada hallazgo contra el protocolo de protección civil institucional, y deja documentada la evidencia operativa antes de la siguiente entrega.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Código Rosa',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed registra cada paso del recién nacido por los puntos de control del cunero, confirma la identidad y el acompañamiento autorizado, y consolida la trazabilidad operativa antes del egreso documentado.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // medica ← Coordinación de Calidad y Seguridad del Paciente
      // (D-VM473-1). Tab 3.
      medica: {
        roleLabel: {
          'mx-es': 'Coordinación de Calidad y Seguridad del Paciente',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Calidad y acreditación',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Puerta de Aislamiento',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed produce la evidencia continua de cumplimiento del protocolo de aislamiento, la consolida por turno y por área, y la deja lista para la cédula de acreditación antes de la visita de auditoría.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Salidas de Emergencia',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed convierte cada verificación de ruta en evidencia sostenida, alineada al Programa Interno de Protección Civil, y disponible para acreditación institucional sin reconstrucción del expediente operativo.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Código Rosa',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed deja constancia documentada de cada activación y cada simulacro de Código Rosa, lo vincula al expediente institucional de seguridad del recién nacido, y sostiene el patrón para el seguimiento de mejora continua del comité.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // general ← Dirección General (D-VM473-1). Tab 4.
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
              'mx-es': 'Puerta de Aislamiento',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed consolida el reporte institucional de cumplimiento del protocolo de aislamiento, lo confirma contra el criterio normativo aplicable, y produce la posición defendible ante la autoridad sanitaria al momento del requerimiento.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Salidas de Emergencia',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed entrega la evidencia agregada de integridad de rutas de evacuación, alineada al Programa Interno de Protección Civil, y disponible para la rendición de cuentas institucional ante Protección Civil y autoridad sanitaria.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Código Rosa',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed sostiene el reporte institucional de cada activación de Código Rosa, con cadena de decisión documentada y respuesta verificable, lista para sostener la posición institucional ante familia, autoridad sanitaria y reclamación legal.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
    },
    defaultPersona: 'jefeUveh',
    // D-VM469-7: footer substituted for the bounded three-UC scope.
    // The chassis catalog-supplement lineage does not apply to this
    // segment because the three-UC perimeter set is the entire
    // product offering for Clínicas de Maternidad.
    ucSupplement: {
      'mx-es':
        'Tres perímetros institucionales sostenidos en tiempo real, más la inteligencia documentada que emerge de VigiMed Insights.',
      'us-en': '[us-en pending]',
    },
  },

  // ---------------------------------------------------------------------------
  // Section 3 -- Per-Buyer-Chain Proof (VM-448 D-S49-3 chain variant
  // shape; VM-473 mx-es content fill 2026-05-13). Single-incident
  // walkthrough per D-VM469-9: intento de sustracción de recién
  // nacido detectado en el punto de control del cunero (UC12 Código
  // Rosa). Tab 1 detects the index event in real time at the cunero
  // control point and prevents the second perimeter from being
  // crossed; Tabs 2-4 consolidate the response into institutional
  // evidence and the position ante familia / autoridad sanitaria.
  // tabCount: 4; tabDefault: 1. D-VM469-10: §C default = chain-origin
  // role (Jefa de Enfermería Obstétrica), intentionally asymmetric
  // with §B default (Director Médico).
  // ---------------------------------------------------------------------------
  section3: {
    eyebrow: {
      'mx-es':
        'VIGIMED EN LA PRÁCTICA: EL CAMINO DE RESOLUCIÓN DE UN INCIDENTE',
      'us-en': '[us-en pending]',
    },
    // VM-473 mx-es heading per VM-469 doc §C.title. Two-sentence prose
    // with no `\n`; chassis applies whiteSpace: 'pre-line' and CSS
    // governs the break point.
    heading: {
      'mx-es':
        'Un intento de sustracción detectado en el punto de control. El recién nacido en brazos de su madre antes del segundo perímetro.',
      'us-en': '[us-en pending]',
    },
    // headingFrame inherited verbatim from CM/HP per doc §C.2; chain
    // noun phrase rendered in bold-amber with trailing period inside
    // the span (S56 FIX 3+4). No `\n`; CSS wraps surrounding segments
    // while .vm-section-3-heading-frame keeps the bold-amber span
    // unbroken at >=1280px (S55 FIX 1).
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
      // Tab 1 -- Jefa de Enfermería Obstétrica. Chain origin: signal
      // detected at the cunero control point when the recién nacido is
      // attempted to be moved without the validated brazalete and
      // authorized acompañamiento. Cohort verified intact at close,
      // event registered as Código Rosa activation. Doc label is 29
      // chars; labelMobile shortens for the accordion trigger.
      {
        label: {
          'mx-es': 'Jefa de Enfermería Obstétrica',
          'us-en': '[us-en pending]',
        },
        labelMobile: {
          'mx-es': 'Jefa Enf. Obstétrica',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Operación clínica de piso',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/clinicas-de-maternidad/enfermeria-obstetrica.webp',
        chainTiers: ['senal', 'patron'],
        body: {
          'mx-es':
            'VigiMed detectó el paso del recién nacido por el punto de control del cunero sin pulsera materno-neonatal validada ni acompañamiento autorizado. La señal escaló a seguridad antes del segundo perímetro. El recién nacido regresó con su madre, la cohorte materno-neonatal verificada intacta, y el evento entró al registro como Código Rosa con cadena trazable por turno.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Sin el control en el momento, el bebé sale por el acceso lateral, y nosotros nos enteramos cuando la madre pregunta dónde está."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-007-SSA2-2016, §5.5.10: "Identificación de la persona recién nacida: se debe colocar al recién nacido un brazalete de identificación con los datos de la madre, en presencia de ésta, antes de salir de la sala de expulsión o quirófano, conservándolo durante toda la estancia hospitalaria."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'NOM-007 · Hospital Seguro · Código Rosa',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 2 -- Director Médico. Chain consolidated into institutional
      // decision recorded in the expediente: validated identification,
      // Código Rosa activation, perimeter closure, cohort verification.
      // Doc label is 15 chars; no labelMobile needed.
      {
        label: { 'mx-es': 'Director Médico', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Decisión clínica institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/clinicas-de-maternidad/medico.webp',
        chainTiers: ['patron', 'tendencia'],
        body: {
          'mx-es':
            'VigiMed entregó al Director Médico la cadena completa del evento al cierre del intento: identificación del recién nacido validada en el punto de control, decisión institucional de activación de Código Rosa adoptada y documentada, protocolo de cierre de accesos institucionales aplicado, cohorte materno-neonatal verificada al cierre. La decisión clínica institucional quedó firmada al expediente, lista para la junta clínica y para la comunicación a la familia sin reconstrucción retrospectiva.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"La decisión institucional ante un intento de sustracción no se discute después: se documenta en el momento, o no se documenta nunca."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'Ley General de Salud, Art. 64, fracción II: "Establecer acciones contra los padecimientos prevenibles y curables, en favor de los menores con discapacidad y de quienes la atienden, así como acciones para la atención de la mujer durante el embarazo, parto y puerperio y del recién nacido, con énfasis en la atención del riesgo perinatal."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'LGS Art. 64 · NOM-007 · Expediente Clínico',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 3 -- Coordinación de Calidad y Seguridad del Paciente.
      // Trazabilidad from first signal through institutional close;
      // evidence consolidated for the Comité Hospitalario de
      // Emergencias y Desastres and the next acreditación visit. Doc
      // label is 50 chars; labelMobile shortens for the accordion
      // trigger.
      {
        label: {
          'mx-es': 'Coordinación de Calidad y Seguridad del Paciente',
          'us-en': '[us-en pending]',
        },
        labelMobile: {
          'mx-es': 'Coord. Calidad',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Calidad y acreditación',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/clinicas-de-maternidad/calidad.webp',
        chainTiers: ['tendencia', 'criterio'],
        body: {
          'mx-es':
            'VigiMed sostuvo la trazabilidad de la activación de Código Rosa desde la primera señal en el punto de control hasta el cierre institucional del evento. Cada decisión quedó documentada contra el criterio del Programa Hospital Seguro y alineada a las Acciones Esenciales para la Seguridad del Paciente. El Comité Hospitalario de Emergencias y Desastres recibió la evidencia consolidada antes de la siguiente reunión, disponible para la próxima visita de acreditación institucional sin reconstrucción del expediente operativo.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"La acreditación se gana o se pierde por lo que se puede demostrar el día que llega la visita, no por lo que recordamos haber hecho."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'Programa Hospital Seguro (CSG/SSA): "El Comité Hospitalario de Emergencias y Desastres es la instancia institucional responsable de la planeación, capacitación, simulacro y operación de los protocolos de respuesta ante emergencias hospitalarias, incluyendo la activación de códigos de seguridad como el Código Rosa."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'Hospital Seguro · AESP · CSG',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 4 -- Dirección General. Institutional position sostenida
      // ante familia (cronología verificable al segundo), autoridad
      // sanitaria (expediente íntegro al requerimiento), and any
      // posterior reclamación (criterio institucional firmado). Doc
      // label is 17 chars; no labelMobile needed.
      {
        label: { 'mx-es': 'Dirección General', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Posición institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/clinicas-de-maternidad/general.webp',
        chainTiers: ['criterio', 'estandar'],
        body: {
          'mx-es':
            'VigiMed entregó a la Dirección General el reporte institucional consolidado del evento: punto de detección, cadena de decisión documentada, protocolo aplicado, cohorte materno-neonatal verificada al cierre. La institución sostuvo la posición ante la familia con cronología verificable al segundo, ante la autoridad sanitaria con expediente íntegro al momento del requerimiento, y ante cualquier reclamación posterior con criterio institucional firmado, sin reconstrucción retrospectiva.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Cuando la familia pregunta, el reloj corre. La diferencia entre defender la institución y reconstruir lo ocurrido se mide en horas."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'Reglamento de Procedimientos para la Atención de Quejas Médicas y Gestión Pericial de la CONAMED, Art. 49: "En la valoración pericial debe prevalecer el criterio institucional, pues no se trata de la mera apreciación de perito persona física, sino del análisis técnico-científico que la institución sostiene."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'LGS Art. 64 · CONAMED · Responsable Sanitario',
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
        // D-VM469-11: estándar tier description adapted to the owner-
        // clinician institutional accountability surface for maternity
        // (familia, autoridad sanitaria y responsable sanitario),
        // replacing the private-sector and public-system lineages
        // carried by sister segments.
        estandar: {
          label: { 'mx-es': 'Estándar', 'us-en': '[us-en pending]' },
          description: {
            'mx-es':
              'Compromiso institucional firmado ante familia, autoridad sanitaria y responsable sanitario',
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
  // regulatoryDocument theme; VM-473 mx-es content fill 2026-05-13).
  // Top-row tile set per D-VM469-13: NOM-007 / LGS Art. 64 / Programa
  // Hospital Seguro / NOM-016. Acta panel anchored on Ley General de
  // Salud Art. 64 per D-VM469-14 (federal statute, not norma).
  // establecimientoLabel ships as `[Clínica de Maternidad]` per
  // D-VM469-15. Amber lead-in per D-VM469-16: `Su hospital` → `Su
  // clínica`, preserves `sin reconstrucción`. sealLabel preserves the
  // slash form (`EVIDENCIA / SOSTENIDA`) for cross-segment visual
  // consistency.
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
          { text: 'Su clínica opera bajo obligaciones regulatorias medibles. ' },
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
            'mx-es': 'NOM-007-SSA2-2016',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es':
              'Atención materno-perinatal e identificación del recién nacido',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'POR EVENTO', 'us-en': '[us-en pending]' },
        },
        {
          articleAnchor: {
            'mx-es': 'LGS Art. 64',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es': 'Atención materno-infantil y seguridad institucional',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'CONTINUA', 'us-en': '[us-en pending]' },
        },
        {
          articleAnchor: {
            'mx-es': 'Programa Hospital Seguro',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es':
              'Protocolos de respuesta y simulacro institucional',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'OPERATIVA', 'us-en': '[us-en pending]' },
        },
        {
          articleAnchor: {
            'mx-es': 'NOM-016-SSA3-2012',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es': 'Atención médica hospitalaria y aislamiento',
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
      folio: { 'mx-es': 'FOLIO VM-MX-04129', 'us-en': '[us-en pending]' },
      establecimientoLabel: {
        'mx-es': '[Clínica de Maternidad]',
        'us-en': '[us-en pending]',
      },
      marcoNormativo: {
        'mx-es': 'Ley General de Salud, Art. 64',
        'us-en': '[us-en pending]',
      },
      obligationClauses: [
        // Cuadrant 1 -- UC12 Identificación del recién nacido.
        {
          text: {
            'mx-es':
              'Identificación inequívoca del recién nacido desde el nacimiento, con brazalete con datos de la madre colocado en presencia de ésta antes de salir de la sala de expulsión y conservado durante toda la estancia.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Cadena de identificación trazable por turno y por punto de control, con cohorte materno-neonatal verificada al cierre de cada cambio de servicio, sin reconstrucción del expediente operativo.',
            'us-en': '[us-en pending]',
          },
        },
        // Cuadrant 2 -- UC12 Código Rosa simulacro y activación.
        {
          text: {
            'mx-es':
              'Activación, capacitación y simulacro periódico del Código Rosa bajo el Comité Hospitalario de Emergencias y Desastres, conforme al Programa Hospital Seguro y a las Acciones Esenciales para la Seguridad del Paciente.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Registro institucional de cada activación y cada simulacro con cadena de decisión documentada al segundo, vinculado al expediente del comité y disponible para revisión institucional al cierre del evento.',
            'us-en': '[us-en pending]',
          },
        },
        // Cuadrant 3 -- UC7 Rutas de evacuación / salidas de emergencia.
        {
          text: {
            'mx-es':
              'Integridad y verificación continua de rutas de evacuación y salidas de emergencia en áreas obstétrica y neonatal, conforme al Programa Interno de Protección Civil y a la normativa de infraestructura aplicable.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Verificación documentada al inicio de cada turno y ante cada simulacro institucional, con hallazgo escalado en tiempo real y evidencia agregada lista para autoridad sanitaria y Protección Civil al momento del requerimiento.',
            'us-en': '[us-en pending]',
          },
        },
        // Cuadrant 4 -- UC6 Puerta de aislamiento.
        {
          text: {
            'mx-es':
              'Control de apertura y cierre de la puerta de aislamiento conforme al protocolo de cohorte para pacientes con infección asociada a la atención, con trazabilidad de cada quiebre y vinculación al expediente.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Registro de cada apertura en el momento que ocurre, confirmado contra el caso clínico activo, con patrón de quiebres por turno y por área disponible para junta clínica y para acreditación institucional sin reconstrucción retrospectiva.',
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
      'mx-es': ['NOM-007', 'LGS Art. 64', 'Hospital Seguro', 'NOM-016'],
      'us-en': ['[us-en pending]'],
    },
  },

  // ---------------------------------------------------------------------------
  // Section 5 -- FAQ + final CTA (VM-473 mx-es content fill 2026-05-13).
  // §F (heading + reassurance) stays chassis-constant per ticket
  // non-goal. faqItems render in doc-literal order with steps
  // [1, 2, 3, 4, 6, 7] per D-VM469-17. Step 5 folded into Item 4
  // (decision-chain integration); Step 8 implicit in Item 6 (surface).
  // D-VM469-18: Q4 confrontational phrasing from CM/HP precedent
  // dropped for maternity-context register discipline.
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
      // Item 1 -- Step 1 DESPLEGAR. Installation question without
      // interrupting obstetric care.
      {
        kind: 'withStep',
        step: 1,
        question: {
          'mx-es':
            '¿Cómo se instala VigiMed en una clínica de maternidad sin interrumpir la atención obstétrica?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'VigiMed se despliega sobre la infraestructura física que su clínica ya opera: cunero, salas de aislamiento, accesos institucionales, y rutas de evacuación.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed se despliega sobre la infraestructura física que su clínica ya opera: cunero, salas de aislamiento, accesos institucionales, y rutas de evacuación. La instalación es no intrusiva, no requiere obra civil, y no interrumpe la atención obstétrica ni neonatal. El equipo institucional trabaja con su responsable sanitario y su Comité Hospitalario de Emergencias y Desastres para alinear el despliegue al protocolo de cohorte y al Programa Interno de Protección Civil vigentes.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 2 -- Step 2 DETECTAR. Three-UC scope question.
      {
        kind: 'withStep',
        step: 2,
        question: {
          'mx-es':
            '¿Qué eventos críticos detecta VigiMed dentro del alcance de tres casos de uso?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'VigiMed detecta tres clases de evento institucional en tiempo real bajo tres casos de uso: aislamiento (UC6), evacuación (UC7), control del cunero (UC12).',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed detecta tres clases de evento institucional en tiempo real bajo tres casos de uso: aislamiento (UC6), evacuación (UC7), control del cunero (UC12). Cubre aperturas de la puerta de aislamiento fuera de protocolo de cohorte, obstrucciones o quiebres de integridad en rutas de evacuación obstétrica y neonatal, y pasos del recién nacido por los puntos de control del cunero sin identificación validada ni acompañamiento autorizado. Cada detección es continua, opera al segundo, y no depende de reporte manual posterior.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 3 -- Step 3 CONFIRMAR. Real-event confirmation question.
      {
        kind: 'withStep',
        step: 3,
        question: {
          'mx-es':
            '¿Cómo confirma VigiMed que una detección es un evento real y no un falso positivo?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'Cada señal pasa por confirmación humana antes de escalar a registro institucional.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'Cada señal pasa por confirmación humana antes de escalar a registro institucional. El personal clínico de piso recibe la señal en el momento que ocurre, valida contra el contexto operativo del turno (cohorte activa, paciente identificado, acompañamiento autorizado), y la decisión institucional queda documentada con la cadena de identificación trazable. La detección continua y la confirmación humana operan en paralelo: VigiMed no decide en lugar del equipo clínico; entrega evidencia para que la decisión institucional se tome en el momento.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 4 -- Step 4 DECIDIR. Integration with the existing
      // institutional decision chain (D-VM469-18: maternity-context
      // register discipline drops the CM/HP confrontational phrasing).
      // Chain spine rendered as plain text (the doc source uses
      // markdown backticks; fixture stores plain prose since the slot
      // is `Paired<string>`, not RichParagraph).
      {
        kind: 'withStep',
        step: 4,
        question: {
          'mx-es':
            '¿Cómo se integra VigiMed a la cadena de decisión institucional existente?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'VigiMed se acopla a la cadena de decisión institucional que su clínica ya tiene; no agrega un nuevo rol, entrega la evidencia continua que cada rol necesita.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed se acopla a la cadena de decisión institucional que su clínica ya tiene; no agrega un nuevo rol, entrega la evidencia continua que cada rol necesita. El Director Médico mantiene la autoridad clínica institucional; la Jefa de Enfermería Obstétrica, la operación clínica de piso; la Coordinación de Calidad y Seguridad del Paciente, el ciclo de acreditación; y la Dirección General, la posición institucional ante familia y autoridad sanitaria. Cada rol opera en su punto de la cadena señal → patrón → tendencia → criterio → estándar, de modo que la decisión institucional se documenta en el momento, no se reconstruye después.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 5 -- Step 6 DOCUMENTAR. Institutional evidence for
      // acreditación and defense ante autoridad sanitaria.
      {
        kind: 'withStep',
        step: 6,
        question: {
          'mx-es':
            '¿Qué evidencia institucional produce VigiMed para acreditación y para defensa ante autoridad sanitaria?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'VigiMed produce el Acta de Cumplimiento Regulatorio institucional, con obligación verificada contra cuatro anclas regulatorias del segmento.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed produce el Acta de Cumplimiento Regulatorio institucional, con obligación verificada contra cuatro anclas regulatorias del segmento. Las anclas son NOM-007-SSA2-2016 (atención materno-perinatal e identificación del recién nacido), Ley General de Salud Art. 64 (atención materno-infantil y seguridad institucional), Programa Hospital Seguro (protocolos de respuesta y simulacro institucional), y NOM-016-SSA3-2012 (atención médica hospitalaria y aislamiento). La evidencia queda disponible al cierre del evento, sin reconstrucción del expediente operativo, lista para la próxima visita de acreditación, para requerimiento de autoridad sanitaria, y para CONAMED en su caso.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 6 -- Step 7 EMERGER. Institutional intelligence from
      // sustained operation (VigiMed Insights).
      {
        kind: 'withStep',
        step: 7,
        question: {
          'mx-es':
            '¿Qué inteligencia institucional emerge cuando VigiMed opera de forma sostenida?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'VigiMed Insights consolida el patrón institucional de los tres perímetros a lo largo del tiempo.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed Insights consolida el patrón institucional de los tres perímetros a lo largo del tiempo. Quiebres recurrentes de protocolo de aislamiento por turno y por área, hallazgos repetidos en rutas de evacuación, y patrón de activaciones y simulacros de Código Rosa. La inteligencia documentada que emerge alimenta el criterio institucional aplicado y el estándar que la clínica firma ante familia, autoridad sanitaria y responsable sanitario. La operación sostenida no entrega más eventos; entrega menos eventos, con evidencia mejor.',
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
