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
  // Section 2 -- Operational Reality (VM-446 D-S52-1 locked mx-es content, 2026-05-07)
  // ---------------------------------------------------------------------------
  section2: {
    eyebrow: {
      'mx-es': 'LA REALIDAD OPERATIVA',
      'us-en': '[S2 eyebrow pending]',
    },
    heading: {
      'mx-es': 'Tres modelos en transición. Una sola institución que responde.',
      'us-en': '[S2 heading pending]',
    },
    pressures: [
      {
        'mx-es':
          'MAPEVE recalibró las definiciones de IAAS contra estándares NHSN/CDC en junio 2024. Cada caso se revalida.',
        'us-en': '[pressure 1 pending]',
      },
      {
        'mx-es':
          'MOCEBPASS sustituyó al MUEC en septiembre 2025 con 273 estándares más una plataforma digital nueva.',
        'us-en': '[pressure 2 pending]',
      },
      {
        'mx-es':
          'El Plan de Mejora Continua sintetiza MOCEBPASS, JCI o ISO en un solo documento de cierre de ciclo.',
        'us-en': '[pressure 3 pending]',
      },
      {
        'mx-es':
          'La continuidad de la acreditación se concentra en una sola firma. Sin red que diluya.',
        'us-en': '[pressure 4 pending]',
      },
    ],
    ucEyebrow: {
      'mx-es': 'LO QUE VIGIMED HACE POR CADA ROL',
      'us-en': '[UC strip eyebrow pending]',
    },
    ucHeading: {
      'mx-es': 'Cuatro cargos. Cuatro vistas. Una sola operación.',
      'us-en': '[UC strip heading pending]',
    },
    ucCards: [
      {
        name: {
          'mx-es': 'UVEH · Señal a patrón',
          'us-en': '[UC1 pending]',
        },
        framing: {
          'mx-es':
            'Valida cada caso del archivo semanal contra MAPEVE 2024 y notifica a Plataforma RHOVE sin reescribir.',
          'us-en': '[framing 1 pending]',
        },
      },
      {
        name: {
          'mx-es': 'Subdirección de Calidad · Patrón a tendencia',
          'us-en': '[UC2 pending]',
        },
        framing: {
          'mx-es':
            'Mapea cada hallazgo contra MOCEBPASS, JCI e ISO al mismo tiempo. Un solo Plan, no tres.',
          'us-en': '[framing 2 pending]',
        },
      },
      {
        name: {
          'mx-es': 'Dirección Médica · Tendencia a criterio',
          'us-en': '[UC3 pending]',
        },
        framing: {
          'mx-es':
            'Cierra el ciclo mensual de CODECIN con evidencia ya consolidada por servicio y por campus.',
          'us-en': '[framing 3 pending]',
        },
      },
      {
        name: {
          'mx-es': 'Dirección General · Criterio a estándar',
          'us-en': '[UC4 pending]',
        },
        framing: {
          'mx-es':
            'Llega a la conferencia de apertura con un Plan ya leído, no uno firmado a ciegas.',
          'us-en': '[framing 4 pending]',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Section 3 -- Per-Buyer-Chain Proof (placeholder, tabCount: 4 per
  // VM-441 D-S39-1; VM-441 fills downstream)
  // ---------------------------------------------------------------------------
  section3: {
    eyebrow: {
      'mx-es': '[S3 eyebrow pending]',
      'us-en': '[S3 eyebrow pending]',
    },
    heading: {
      'mx-es': '[S3 heading pending]',
      'us-en': '[S3 heading pending]',
    },
    tabCount: 4,
    tabDefault: 1,
    tabs: [
      {
        label: { 'mx-es': '[Rol 1]', 'us-en': '[Role 1]' },
        result: {
          'mx-es': '[resultado 1 pendiente]',
          'us-en': '[result 1 pending]',
        },
        step: { 'mx-es': '[paso 1 pendiente]', 'us-en': '[step 1 pending]' },
        quote: {
          'mx-es': '[cita 1 pendiente]',
          'us-en': '[quote 1 pending]',
        },
        regulatory: {
          'mx-es': '[regulatorio 1 pendiente]',
          'us-en': '[regulatory 1 pending]',
        },
      },
      {
        label: { 'mx-es': '[Rol 2]', 'us-en': '[Role 2]' },
        result: {
          'mx-es': '[resultado 2 pendiente]',
          'us-en': '[result 2 pending]',
        },
        step: { 'mx-es': '[paso 2 pendiente]', 'us-en': '[step 2 pending]' },
        quote: {
          'mx-es': '[cita 2 pendiente]',
          'us-en': '[quote 2 pending]',
        },
        regulatory: {
          'mx-es': '[regulatorio 2 pendiente]',
          'us-en': '[regulatory 2 pending]',
        },
      },
      {
        label: { 'mx-es': '[Rol 3]', 'us-en': '[Role 3]' },
        result: {
          'mx-es': '[resultado 3 pendiente]',
          'us-en': '[result 3 pending]',
        },
        step: { 'mx-es': '[paso 3 pendiente]', 'us-en': '[step 3 pending]' },
        quote: {
          'mx-es': '[cita 3 pendiente]',
          'us-en': '[quote 3 pending]',
        },
        regulatory: {
          'mx-es': '[regulatorio 3 pendiente]',
          'us-en': '[regulatory 3 pending]',
        },
      },
      {
        label: { 'mx-es': '[Rol 4]', 'us-en': '[Role 4]' },
        result: {
          'mx-es': '[resultado 4 pendiente]',
          'us-en': '[result 4 pending]',
        },
        step: { 'mx-es': '[paso 4 pendiente]', 'us-en': '[step 4 pending]' },
        quote: {
          'mx-es': '[cita 4 pendiente]',
          'us-en': '[quote 4 pending]',
        },
        regulatory: {
          'mx-es': '[regulatorio 4 pendiente]',
          'us-en': '[regulatory 4 pending]',
        },
      },
    ],
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
