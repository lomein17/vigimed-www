// Laboratorios Clínicos mx-es segment fill.
// Locked content authored under VM-470 in Linear doc slug a82cd7777a33
// (Done 2026-05-14). Engineering fill landed under VM-474
// (2026-05-14): pure mechanical replacement against the locked SSOT.
// §F (section5.heading + reassurance) and sticky prompts stay
// chassis-constant / placeholder per ticket non-goals.
//
// Locale handling: mx-es-only per D-S36-2. us-en values stay at
// '[us-en pending]' and never render (route guard returns notFound()
// for non-mx-es requests).
//
// D-VM474-1: §B PersonaKey mapping. Chassis PERSONA_ORDER is fixed at
// jefeUveh → calidad → medica → general. Labs content maps by visual
// tab order per VM-470 doc §B:
//   - jefeUveh ← Director Técnico (Tab 1, default-active)
//   - calidad  ← Jefe de Calidad ISO 15189 (Tab 2, chain-origin in §C)
//   - medica   ← Director de Operaciones (Tab 3)
//   - general  ← Director General (Tab 4)
// defaultPersona = 'jefeUveh' so Director Técnico is the leftmost-
// rendered cold-load default.
//
// D-VM474-2: §B/§C tab default asymmetry is intentional, mirroring
// the VM-469 D-VM469-10 precedent. §B default = Director Técnico
// (institutional-authority frame for the matrix); §C default = Jefe
// de Calidad ISO 15189 (chain-origin role for the §C campana de
// bioseguridad walkthrough).
//
// §B matrix shape is 4×4 (four personas × four UCs). UC scope inside
// this matrix is the eight-UC Labs set: UC4 Llenado de Punzocortantes,
// UC5 Segregación RPBI, UC7 Salidas de Emergencia, UC11 Control de
// Accesos, UC14 EPP Laboratorios, UC15 Campana de Bioseguridad,
// UC16 Custodia de Muestras, UC17 Higiene Flebotomía. Each persona's
// four-card subset is curated against the buyer-chain priority for
// the role.
//
// D-VM474-3: §D Acta establecimientoLabel ships as `[Laboratorio
// Clínico]`. marcoNormativo anchors on Ley General de Salud, Art. 200
// (federal statute, not norma), parallel to CdM's LGS Art. 64 anchor.
//
// §B ucSupplement is segment-specific (`Ocho puntos de control
// sostenidos en tiempo real, más la inteligencia documentada que
// emerge de VigiMed Insights.`). The CM catalog-supplement lineage
// drops here because the eight-UC scope is the entire Labs offering,
// not a subset of a larger catalog.
//
// §C chain-anchor `estandar` tier description substitutes Labs-
// specific four-surface institutional accountability (COFEPRIS, EMA,
// cliente referente, responsable sanitario), replacing the
// private-sector consejo-and-reguladores lineage carried by CM/HP/SH.
//
// §F section5.heading + reassurance and sticky prompts stay chassis-
// constant / placeholder per VM-474 non-goal.
//
// sealLabel: ships in slash form (`EVIDENCIA / SOSTENIDA`) per
// cross-segment visual precedent (CM/SH/HP/CdM). The VM-470 doc
// renders the badge space-separated; the slash separator is a
// chassis-render convention preserved for visual consistency across
// the v1 slate.

import type { ChassisFill } from '@/lib/chassis/slots';

export const laboratoriosClinicosFillMxEs: ChassisFill = {
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
        { text: 'Laboratorios Clínicos', emphasis: 'amber' },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    claim: {
      'mx-es': [
        {
          text: 'Cada protocolo de bioseguridad que su laboratorio ya implementa, ahora con un par de ojos que no parpadea durante el turno.',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    video: { desktop: '', mobile: '', poster: '' },
    // VM-459 v1.13: optional S1.image takes precedence over video in
    // the asset bed render branch. WebP variants optimized from a
    // 8192x4608 source at quality 80 (Slot Map v1.13 §4.2).
    image: {
      desktop: '/images/segments/laboratorios-clinicos/hero.webp',
      mobile: '/images/segments/laboratorios-clinicos/hero-mobile.webp',
    },
  },

  // ---------------------------------------------------------------------------
  // Section 2 -- Operational Reality (VM-474 mx-es content fill 2026-05-14).
  // 4×4 persona x UC matrix: four buyer-chain personas, four UCs each
  // drawn from the eight-UC Labs set. Persona keys map by D-VM474-1;
  // chassis PERSONA_ORDER is fixed (jefeUveh → calidad → medica →
  // general), so tabs render visually as Director Técnico (default
  // active) → Jefe de Calidad ISO 15189 → Director de Operaciones →
  // Director General.
  // ---------------------------------------------------------------------------
  section2: {
    eyebrow: {
      'mx-es': 'LA REALIDAD OPERATIVA',
      'us-en': '[us-en pending]',
    },
    // VM-457 D-S57-4: heading absorbs the migrated §A H1 verbatim.
    heading: {
      'mx-es': 'Un incidente, una decisión que su institución toma una vez.',
      'us-en': '[us-en pending]',
    },
    // VM-457 D-S57-4: framing carries the migrated §A subhead. The `\n`
    // literals are preserved verbatim; Section2OperationalReality.tsx
    // applies `whiteSpace: 'pre-line'` so they render as hard breaks.
    // Bold-amber sentence 2 carries the segment biosafety spine per
    // VM-470 doc §B.
    framing: {
      'mx-es': [
        {
          text: 'Detección continua, confirmación humana, y análisis de\ncada evento crítico en sus áreas de mayor riesgo.\n',
        },
        {
          text: 'Bioseguridad sostenida en el turno, no recordada en la capacitación.',
          emphasis: 'bold-amber',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    pressures: [],
    ucByPersona: {
      // jefeUveh ← Director Técnico (D-VM474-1). Tab 1, default-active.
      jefeUveh: {
        roleLabel: {
          'mx-es': 'Director Técnico',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Autoridad técnica institucional',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Llenado de Punzocortantes',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed detecta cada contenedor de punzocortantes que rebasa la línea de llenado en el momento que ocurre, lo confirma contra la posición del bench y el turno activo, y deja documentada la cadena de responsabilidad técnica antes del siguiente cambio de turno.',
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
                'VigiMed detecta cada segregación incorrecta en el punto de generación, la confirma contra el criterio NOM-087, y consolida el patrón por bench y por turno antes de que el hallazgo escale a auditoría sanitaria.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Campana de Bioseguridad',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed registra cada operación de la campana fuera de protocolo (posición de la ventana frontal, flujo de aire interrumpido, manipulación sin EPP completo), la confirma contra el caso técnico activo, y sostiene la evidencia institucional antes del cierre del lote.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Custodia de Muestras',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed sostiene la trazabilidad de cada muestra desde recepción hasta destino final, confirma cada quiebre de custodia en tiempo real, y deja constancia de la decisión técnica institucional antes del cierre del expediente analítico.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // calidad ← Jefe de Calidad ISO 15189 (D-VM474-1). Tab 2.
      calidad: {
        roleLabel: {
          'mx-es': 'Jefe de Calidad ISO 15189',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Calidad y acreditación',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Segregación RPBI',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed produce la evidencia continua de cumplimiento del protocolo NOM-087 en cada punto de generación, la consolida por bench y por turno, y la deja lista para la cédula de acreditación antes de la visita de COFEPRIS.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'EPP Laboratorios',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed convierte cada hallazgo de uso incorrecto o ausencia de EPP en evidencia sostenida, alineada al programa institucional de bioseguridad ISO 15189, y disponible para acreditación sin reconstrucción del expediente operativo.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Campana de Bioseguridad',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed deja constancia documentada de cada operación de la campana, vinculada al ciclo de calibración y al expediente institucional de bioseguridad, y sostiene el patrón para el seguimiento de mejora continua del comité de bioseguridad.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Higiene Flebotomía',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed verifica el cumplimiento del protocolo de higiene en cada acto de flebotomía, la confirma contra el criterio institucional aplicable, y sostiene la evidencia continua para acreditación ISO 15189 sin reconstrucción retrospectiva.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // medica ← Director de Operaciones (D-VM474-1). Tab 3.
      medica: {
        roleLabel: {
          'mx-es': 'Director de Operaciones',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Operación clínica de piso',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Salidas de Emergencia',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed verifica la integridad de cada ruta de evacuación al inicio de cada turno, confirma cada obstrucción contra el Programa Interno de Protección Civil, y deja documentada la evidencia operativa antes de la siguiente entrega.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Control de Accesos',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed registra cada paso por los accesos institucionales fuera de horario o sin credencial validada, confirma el contexto operativo del turno, y consolida el patrón por acceso y por banda horaria antes de que escale a hallazgo de seguridad.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'EPP Laboratorios',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed detecta cada bench operado sin EPP completo en el momento que ocurre, lo confirma contra el protocolo institucional vigente, y consolida el patrón por área y por turno antes de la junta operativa semanal.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Higiene Flebotomía',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed registra cada acto de flebotomía contra el protocolo de higiene institucional, confirma el cumplimiento operativo del turno, y deja documentada la evidencia para la trazabilidad de cada paciente atendido.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
      // general ← Director General (D-VM474-1). Tab 4.
      general: {
        roleLabel: {
          'mx-es': 'Director General',
          'us-en': '[us-en pending]',
        },
        tierLabel: {
          'mx-es': 'Posición institucional',
          'us-en': '[us-en pending]',
        },
        cards: [
          {
            name: {
              'mx-es': 'Llenado de Punzocortantes',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed consolida el reporte institucional de cumplimiento del protocolo de punzocortantes, lo confirma contra el criterio NOM-087 aplicable, y produce la posición defendible ante COFEPRIS al momento del requerimiento.',
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
              'mx-es': 'Control de Accesos',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed sostiene el reporte institucional de cada quiebre de control de accesos, con cadena de decisión documentada y respuesta verificable, lista para sostener la posición institucional ante COFEPRIS, cliente referente y reclamación legal.',
              'us-en': '[us-en pending]',
            },
          },
          {
            name: {
              'mx-es': 'Custodia de Muestras',
              'us-en': '[us-en pending]',
            },
            framing: {
              'mx-es':
                'VigiMed produce la posición institucional ante cada quiebre de cadena de custodia, con cohorte de muestras verificada al cierre y evidencia continua disponible para el hospital referente y la autoridad sanitaria sin reconstrucción retrospectiva.',
              'us-en': '[us-en pending]',
            },
          },
        ],
      },
    },
    defaultPersona: 'jefeUveh',
    // ucSupplement: segment-specific footer for the eight-UC Labs
    // scope. The CM catalog-supplement lineage does not apply because
    // the eight-UC set is the entire Labs offering, not a subset.
    ucSupplement: {
      'mx-es':
        'Ocho puntos de control sostenidos en tiempo real, más la inteligencia documentada que emerge de VigiMed Insights.',
      'us-en': '[us-en pending]',
    },
  },

  // ---------------------------------------------------------------------------
  // Section 3 -- Per-Buyer-Chain Proof (VM-448 D-S49-3 chain variant
  // shape; VM-474 mx-es content fill 2026-05-14). Single-incident
  // walkthrough: quiebre de protocolo en campana de bioseguridad
  // detectado durante turno nocturno; cohorte de personal sin
  // exposición y muestra procesada sin contaminación cruzada. Tab 1
  // detects the index event in real time at the campana de
  // bioseguridad and prevents propagation across the bench adjacent;
  // Tabs 2-4 consolidate the response into institutional evidence and
  // the position ante COFEPRIS, EMA, cliente referente y responsable
  // sanitario. tabCount: 4; tabDefault: 1. D-VM474-2: §C default =
  // chain-origin role (Jefe de Calidad ISO 15189), intentionally
  // asymmetric with §B default (Director Técnico).
  // ---------------------------------------------------------------------------
  section3: {
    eyebrow: {
      'mx-es':
        'VIGIMED EN LA PRÁCTICA: EL CAMINO DE RESOLUCIÓN DE UN INCIDENTE',
      'us-en': '[us-en pending]',
    },
    // VM-474 mx-es heading per VM-470 doc §C.title. Two-sentence prose
    // with literal `\n` mid-string; chassis applies
    // `whiteSpace: 'pre-line'` to render as hard line break.
    heading: {
      'mx-es':
        'Quiebre de protocolo en campana, turno nocturno.\nCohorte sin exposición. Sin contaminación cruzada.',
      'us-en': '[us-en pending]',
    },
    // headingFrame inherited verbatim from CM/HP/CdM; chain noun phrase
    // rendered in bold-amber with trailing period inside the span
    // (S56 FIX 3+4).
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
    // VM-513 mobile-fork: shortened eyebrow + heading for the <lg
    // composition. Desktop strings (eyebrow, heading, headingFrame) stay
    // authoritative at >=lg and continue rendering unchanged.
    mobileEyebrow: {
      'mx-es': 'VIGIMED EN LA PRÁCTICA',
      'us-en': '[us-en pending]',
    },
    mobileHeading: {
      'mx-es':
        'Quiebre de protocolo en campana, turno nocturno.\nCohorte sin exposición.',
      'us-en': '[us-en pending]',
    },
    tabCount: 4,
    tabDefault: 1,
    tabs: [
      // Tab 1 -- Jefe de Calidad ISO 15189. Chain origin: VigiMed
      // detects posición de la ventana frontal fuera del límite protocolizado
      // durante la manipulación de muestra infectocontagiosa en turno
      // nocturno; escalation routed to Calidad ISO before the next
      // sampling; cohort of personnel verified intact. Doc label is 25
      // chars; labelMobile shortens for the accordion trigger.
      {
        label: {
          'mx-es': 'Jefe de Calidad ISO 15189',
          'us-en': '[us-en pending]',
        },
        labelMobile: {
          'mx-es': 'Jefe Calidad ISO',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Calidad y acreditación',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/laboratorios-clinicos/calidad.webp',
        chainTiers: ['senal', 'patron'],
        body: {
          'mx-es':
            'VigiMed detectó la posición de la ventana frontal fuera de protocolo en turno nocturno y escaló al Jefe de Calidad antes del siguiente muestreo del lote. La cohorte del turno quedó sin exposición y el evento entró al expediente institucional de bioseguridad con cadena de decisión técnica trazable, lista para la próxima cédula de acreditación ISO 15189.',
          'us-en': '[us-en pending]',
        },
        // VM-513 mobile-fork.
        mobileBody: {
          'mx-es':
            'Posición de la ventana frontal fuera de protocolo detectada en turno nocturno. Escaló al Jefe de Calidad antes del siguiente muestreo. Cohorte del turno sin exposición.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"La ventana frontal en la posición incorrecta a las tres de la mañana, sin nadie supervisando, es exactamente el evento que el programa de bioseguridad no puede atrapar por sí solo."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'ISO 15189:2022, §6.3.4 Instalaciones y condiciones ambientales: "El laboratorio deberá disponer de instalaciones que permitan la correcta ejecución de los procedimientos analíticos, incluyendo equipos de protección colectiva como campanas de bioseguridad operados conforme a sus especificaciones técnicas y protocolos institucionales documentados."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'ISO 15189 · NOM-087 · Bioseguridad',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 2 -- Director Técnico. Chain consolidated into the
      // technical-authority institutional decision recorded at lot
      // close: posición de la ventana frontal, técnico identificado, muestra trazada,
      // cohorte verificada, contaminación cruzada confirmada evitada.
      // Doc label is 16 chars; no labelMobile needed.
      {
        label: { 'mx-es': 'Director Técnico', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Autoridad técnica institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/laboratorios-clinicos/tecnico.webp',
        chainTiers: ['patron', 'tendencia'],
        body: {
          'mx-es':
            'VigiMed entregó al Director Técnico la cadena del evento al cierre del lote: posición de la ventana frontal al segundo, técnico identificado, muestra trazada de recepción a procesamiento, cohorte sin exposición, contaminación al bench adjacente evitada. La decisión sobre la liberación del lote quedó documentada sin reconstrucción retrospectiva.',
          'us-en': '[us-en pending]',
        },
        // VM-513 mobile-fork.
        mobileBody: {
          'mx-es':
            'Cadena entregada al cierre del lote: ventana frontal al segundo, técnico identificado, muestra trazada, cohorte sin exposición, contaminación al bench adjacente evitada. Decisión técnica documentada.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"La decisión técnica sobre liberar un lote después de un quiebre de bioseguridad no se sostiene en la memoria del turno; se sostiene en lo que quedó documentado al segundo."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-087-ECOL-SSA1-2002, §6.3: "El manejo de los residuos peligrosos biológico-infecciosos deberá realizarse conforme a los procedimientos establecidos institucionalmente, garantizando la trazabilidad desde el punto de generación hasta su disposición final, con responsable identificado por turno y por área de generación."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'NOM-087 · ISO 15189 · COFEPRIS',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 3 -- Director de Operaciones. Trazabilidad operativa del
      // turno nocturno sin interrupción del lote; cadena consolidada
      // disponible para la posición ante el cliente referente sin
      // reconstrucción del expediente. Doc label is 23 chars.
      {
        label: {
          'mx-es': 'Director de Operaciones',
          'us-en': '[us-en pending]',
        },
        tier: {
          'mx-es': 'Operación clínica de piso',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/laboratorios-clinicos/operaciones.webp',
        chainTiers: ['tendencia', 'criterio'],
        body: {
          'mx-es':
            'VigiMed sostuvo la continuidad operativa del turno nocturno sin interrupción del lote. El Director de Operaciones recibió la cadena consolidada al cierre del turno: evento detectado, escalación documentada, decisión técnica adoptada, lote procesado dentro del compromiso institucional. La evidencia operativa quedó alineada al programa de bioseguridad institucional y disponible para la posición ante el cliente referente sin reconstrucción del expediente del lote.',
          'us-en': '[us-en pending]',
        },
        // VM-513 mobile-fork.
        mobileBody: {
          'mx-es':
            'Continuidad operativa del turno nocturno sostenida sin interrupción del lote. Cadena consolidada al cierre del turno, alineada al programa de bioseguridad, disponible ante el cliente referente.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"El cliente referente no pregunta si tuvimos un evento; pregunta si lo manejamos en el momento o si nos enteramos al día siguiente."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'NOM-007-SSA3-2011, §10: "El responsable sanitario del laboratorio clínico es el profesional responsable de la operación técnica del establecimiento, debiendo garantizar el cumplimiento de los procedimientos institucionales en todos los turnos de operación, así como la continuidad y trazabilidad de los procesos analíticos."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'NOM-007 · Responsable Sanitario · Continuidad',
          'us-en': '[us-en pending]',
        },
      },
      // Tab 4 -- Director General. Institutional position sostenida
      // ante COFEPRIS (expediente íntegro al requerimiento), EMA
      // (evidencia continua para el ciclo de acreditación ISO 15189),
      // cliente referente (cronología verificable al segundo), y
      // responsable sanitario (criterio institucional firmado). Doc
      // label is 16 chars; no labelMobile needed.
      {
        label: { 'mx-es': 'Director General', 'us-en': '[us-en pending]' },
        tier: {
          'mx-es': 'Posición institucional',
          'us-en': '[us-en pending]',
        },
        headshot: '/headshots/laboratorios-clinicos/general.webp',
        chainTiers: ['criterio', 'estandar'],
        body: {
          'mx-es':
            'VigiMed entregó a la Dirección General el reporte consolidado del evento: detección, cadena técnica documentada, cohorte sin exposición, contaminación cruzada evitada. La institución sostuvo la posición ante COFEPRIS, EMA, cliente referente y responsable sanitario con expediente íntegro, sin reconstrucción retrospectiva.',
          'us-en': '[us-en pending]',
        },
        // VM-513 mobile-fork.
        mobileBody: {
          'mx-es':
            'Reporte consolidado entregado a Dirección General: detección, cadena técnica, cohorte sin exposición, contaminación cruzada evitada. Posición ante COFEPRIS, EMA y cliente referente sostenida sin reconstrucción.',
          'us-en': '[us-en pending]',
        },
        quote: {
          'mx-es':
            '"Cuando COFEPRIS o el cliente referente preguntan qué pasó esa noche, la diferencia entre defender la institución y reconstruir el lote se mide en horas de archivo."',
          'us-en': '[us-en pending]',
        },
        regulatoryCitation: {
          'mx-es':
            'Ley General de Salud, Art. 200: "Para los efectos de esta Ley, se entiende por establecimientos los locales y sus instalaciones, dependencias y anexos, sean fijos o móviles, en donde se desarrollen los procesos a que ella se refiere, los cuales deberán cumplir con las disposiciones que la Secretaría de Salud establezca para garantizar la protección de la salud."',
          'us-en': '[us-en pending]',
        },
        regulatory: {
          'mx-es': 'LGS Art. 200 · COFEPRIS · EMA',
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
        // VM-474: estándar tier description adapted to the Labs four-
        // surface institutional accountability set (COFEPRIS, EMA,
        // cliente referente, responsable sanitario), replacing the
        // private-sector consejo-and-reguladores lineage from CM/HP/SH
        // and the maternity surface from CdM.
        estandar: {
          label: { 'mx-es': 'Estándar', 'us-en': '[us-en pending]' },
          description: {
            'mx-es':
              'Compromiso institucional firmado ante COFEPRIS, EMA, cliente referente y responsable sanitario',
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
  // regulatoryDocument theme; VM-474 mx-es content fill 2026-05-14).
  // Top-row tile set: NOM-087 / NOM-007 / ISO 15189 / LGS Art. 200.
  // Acta panel anchored on Ley General de Salud Art. 200 per D-VM474-3
  // (federal statute, not norma). establecimientoLabel ships as
  // `[Laboratorio Clínico]`. Header frame uses Labs noun-swap variant
  // (`Su laboratorio` → `VigiMed las verifica en tiempo real, sin
  // reconstrucción.`). sealLabel preserves the slash form
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
          { text: 'Su laboratorio opera bajo obligaciones regulatorias medibles. ' },
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
            'mx-es': 'NOM-087-ECOL-SSA1-2002',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es':
              'Manejo de residuos peligrosos biológico-infecciosos',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'CONTINUA', 'us-en': '[us-en pending]' },
        },
        {
          articleAnchor: {
            'mx-es': 'NOM-007-SSA3-2011',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es':
              'Organización y funcionamiento de laboratorios clínicos',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'CONTINUA', 'us-en': '[us-en pending]' },
        },
        {
          articleAnchor: {
            'mx-es': 'ISO 15189:2022',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es':
              'Calidad y competencia de laboratorios clínicos',
            'us-en': '[us-en pending]',
          },
          frequency: { 'mx-es': 'TRIENAL', 'us-en': '[us-en pending]' },
        },
        {
          articleAnchor: {
            'mx-es': 'LGS Art. 200',
            'us-en': '[us-en pending]',
          },
          label: {
            'mx-es': 'Regulación de establecimientos de atención médica',
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
      folio: { 'mx-es': 'FOLIO VM-MX-04130', 'us-en': '[us-en pending]' },
      establecimientoLabel: {
        'mx-es': '[Laboratorio Clínico]',
        'us-en': '[us-en pending]',
      },
      marcoNormativo: {
        'mx-es': 'Ley General de Salud, Art. 200',
        'us-en': '[us-en pending]',
      },
      obligationClauses: [
        // Cuadrant 1 -- UC15 Campana de Bioseguridad.
        {
          text: {
            'mx-es':
              'Operación de campanas conforme al protocolo institucional, con protección colectiva del personal durante la manipulación de muestras y responsable por turno y bench.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Posición de la ventana frontal y estado de la campana registrados por bench y turno, quiebre escalado en tiempo real y cohorte sin exposición, lista para acreditación ISO 15189.',
            'us-en': '[us-en pending]',
          },
        },
        // Cuadrant 2 -- UC5 Segregación RPBI.
        {
          text: {
            'mx-es':
              'Segregación correcta de RPBI en el punto de generación conforme a NOM-087, con trazabilidad de bench a disposición final y responsable por área y turno.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Detección de segregación incorrecta en el momento, confirmada contra NOM-087 y consolidada por bench y turno, lista para la cédula antes de COFEPRIS.',
            'us-en': '[us-en pending]',
          },
        },
        // Cuadrant 3 -- UC16 Custodia de Muestras.
        {
          text: {
            'mx-es':
              'Trazabilidad de la cadena de custodia de cada muestra desde recepción hasta destino final, bajo las obligaciones del responsable sanitario y los procesos analíticos.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Quiebre de cadena registrado en el momento, cohorte verificada al cierre del turno y decisión técnica documentada por bench, lista para cliente referente y autoridad.',
            'us-en': '[us-en pending]',
          },
        },
        // Cuadrant 4 -- UC11 Control de Accesos.
        {
          text: {
            'mx-es':
              'Control y registro del paso por los accesos institucionales del laboratorio, garantizando la integridad operativa ante COFEPRIS y la protección de la cadena de custodia.',
            'us-en': '[us-en pending]',
          },
          evidence: {
            'mx-es':
              'Paso por accesos con credencial y banda horaria, quiebre escalado en tiempo real y patrón consolidado por acceso y turno, listo ante COFEPRIS y reclamación legal.',
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
      'mx-es': ['NOM-087', 'NOM-007', 'ISO 15189', 'LGS Art. 200'],
      'us-en': ['[us-en pending]'],
    },
  },

  // ---------------------------------------------------------------------------
  // Section 5 -- FAQ + final CTA (VM-474 mx-es content fill 2026-05-14).
  // §F (heading + reassurance) stays chassis-constant per ticket
  // non-goal. faqItems render in doc-literal order with steps
  // [1, 2, 3, 4, 6, 7]. AC-F6: preview = first sentence of answer
  // verbatim.
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
      // interrupting analytical processing.
      {
        kind: 'withStep',
        step: 1,
        question: {
          'mx-es':
            '¿Cómo se instala VigiMed en un laboratorio clínico sin interrumpir el procesamiento de muestras?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'VigiMed se despliega sobre la infraestructura física de su laboratorio: bench de procesamiento, campanas de bioseguridad, flebotomía, accesos y rutas de evacuación.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed se despliega sobre la infraestructura física de su laboratorio: bench de procesamiento, campanas de bioseguridad, flebotomía, accesos y rutas de evacuación. La instalación es no intrusiva, no requiere obra civil, y no interrumpe el procesamiento analítico ni la operación por turno. El equipo institucional trabaja con su responsable sanitario y su comité de bioseguridad para alinear el despliegue al protocolo de bioseguridad institucional, al ciclo de acreditación ISO 15189 y al Programa Interno de Protección Civil vigentes. La cobertura opera de forma continua en todos los turnos sin depender de supervisión adicional.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 2 -- Step 2 DETECTAR. Eight-UC scope question.
      {
        kind: 'withStep',
        step: 2,
        question: {
          'mx-es':
            '¿Qué eventos críticos detecta VigiMed dentro del alcance de los ocho casos de uso?',
          'us-en': '[us-en pending]',
        },
        preview: {
          'mx-es':
            'VigiMed detecta ocho clases de evento institucional en tiempo real bajo los ocho casos de uso Labs (UC4, UC5, UC7, UC11, UC14, UC15, UC16, UC17).',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed detecta ocho clases de evento institucional en tiempo real bajo los ocho casos de uso Labs (UC4, UC5, UC7, UC11, UC14, UC15, UC16, UC17). Cubre contenedores de punzocortantes que rebasan la línea de llenado (UC4), segregación incorrecta de RPBI contra NOM-087 (UC5), obstrucciones en rutas de evacuación (UC7), pasos por accesos fuera de horario o sin credencial validada (UC11), bench operado sin EPP completo (UC14), operación de campana fuera de protocolo (UC15), quiebres de cadena de custodia (UC16) y actos de flebotomía fuera del protocolo de higiene (UC17). Cada detección es continua, opera al segundo, y no depende de reporte manual posterior.',
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
            'Cada señal pasa por confirmación humana antes de escalar a registro institucional. El personal técnico del turno recibe la señal en el momento que ocurre, valida contra el contexto operativo (bench activo, muestra en procesamiento, técnico identificado, protocolo institucional vigente), y la decisión técnica institucional queda documentada con la cadena de responsabilidad trazable por bench y por turno. La detección continua y la confirmación humana operan en paralelo: VigiMed no decide en lugar del equipo técnico; entrega evidencia para que la decisión institucional se tome en el momento, sin interrumpir el procesamiento del lote.',
          'us-en': '[us-en pending]',
        },
      },
      // Item 4 -- Step 4 DECIDIR. Integration with the existing
      // institutional decision chain.
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
            'VigiMed se acopla a la cadena de decisión institucional existente: Director Técnico, Jefe de Calidad ISO 15189, Director de Operaciones y Director General mantienen sus puntos.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed se acopla a la cadena de decisión institucional existente: Director Técnico, Jefe de Calidad ISO 15189, Director de Operaciones y Director General mantienen sus puntos. El Director Técnico mantiene la autoridad técnica sobre la liberación del lote, el Jefe de Calidad ISO 15189 el ciclo de acreditación y el programa de bioseguridad, el Director de Operaciones la continuidad operativa del turno y la posición ante el cliente referente, y el Director General la posición institucional ante COFEPRIS, EMA, cliente referente y responsable sanitario. VigiMed no agrega un nuevo rol institucional; entrega la evidencia continua que cada rol necesita en su punto de la cadena señal → patrón → tendencia → criterio → estándar, de modo que la decisión institucional se documenta en el momento, no se reconstruye después.',
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
            'VigiMed produce el Acta de Cumplimiento Regulatorio institucional, con cadena de decisión técnica documentada al segundo y obligación verificada contra cuatro anclas regulatorias.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed produce el Acta de Cumplimiento Regulatorio institucional, con cadena de decisión técnica documentada al segundo y obligación verificada contra cuatro anclas regulatorias. Las anclas son NOM-087-ECOL-SSA1-2002 (manejo de residuos peligrosos biológico-infecciosos), NOM-007-SSA3-2011 (organización y funcionamiento de laboratorios clínicos), ISO 15189:2022 (calidad y competencia de laboratorios clínicos), y Ley General de Salud Art. 200 (regulación de establecimientos de atención médica). La evidencia queda disponible al cierre del lote, sin reconstrucción del expediente operativo, lista para la próxima visita de COFEPRIS, para el ciclo de acreditación ante EMA, y para el requerimiento del cliente referente o de la reclamación legal en su caso.',
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
            'VigiMed Insights consolida el patrón institucional de cada uno de los ocho puntos de control a lo largo del tiempo, con la trayectoria de cumplimiento documentada por bench y por turno.',
          'us-en': '[us-en pending]',
        },
        answer: {
          'mx-es':
            'VigiMed Insights consolida el patrón institucional de cada uno de los ocho puntos de control a lo largo del tiempo, con la trayectoria de cumplimiento documentada por bench y por turno. Cubre quiebres recurrentes de protocolo de bioseguridad por bench y por turno, hallazgos repetidos en rutas de evacuación, patrón de quiebres de cadena de custodia, recurrencia de EPP incompleto por área, y trayectoria de cumplimiento del protocolo de higiene en flebotomía. La inteligencia documentada que emerge alimenta el criterio institucional aplicado y el estándar que el laboratorio firma ante COFEPRIS, EMA, cliente referente y responsable sanitario. La operación sostenida no entrega más eventos; entrega menos eventos, con evidencia mejor.',
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
