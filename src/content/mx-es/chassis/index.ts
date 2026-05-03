// VM-403 (Hero) and VM-407 (Final CTA) locked mx-es content for the
// Public Hospitals MX segment page. This file is the SINGLE source of
// truth for those locked specs in the repo; no other file duplicates
// this copy. Future evolution per Chassis Brief §10.3 governance
// updates this file directly.
//
// Locale handling: Public Hospitals MX is mx-es-only by design per Site
// Architecture parity rule. The us-en side of locked Paired fields uses
// '[us-en pending]' markers. TODO(VM-437): downstream segments fill
// the us-en side when us-en locks exist.
//
// Section 3 uses tabCount: 4 (Public Hospitals MX buyer chain has four
// meaningful roles per Worksheet v2.1).

import type { ChassisFill } from '@/lib/chassis/slots';
import { EM_DASH_GLYPH } from '@/lib/chassis/constants';

export const chassisFixtureMxEs: ChassisFill = {
  // ---------------------------------------------------------------------------
  // Section 1 -- Hero (VM-403 locked mx-es content)
  // ---------------------------------------------------------------------------
  hero: {
    contextBar: {
      'mx-es':
        'Hospitales públicos federales · Institutos Nacionales · UMAEs',
      'us-en': '[us-en pending]',
    },
    eyebrow: {
      'mx-es': 'Atención de calidad. En el momento.',
      'us-en': '[us-en pending]',
    },
    h1Line1: {
      'mx-es': [
        {
          text: 'El Servicio Universal de Salud nombra la seguridad del paciente como criterio operativo.',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    h1Line2: {
      'mx-es': [
        { text: 'Coordinamos la respuesta', emphasis: 'brand-cyan' },
        { text: ' en el momento.' },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    subhead: {
      'mx-es': [
        {
          text: 'Servicio gestionado de respuesta a eventos críticos para hospitales del IMSS, ISSSTE, IMSS-Bienestar e Institutos Nacionales. ',
        },
        {
          text: 'Detectamos cada evento en el momento',
          emphasis: 'bold-amber',
        },
        {
          text: ', lo confirmamos con un analista entrenado y coordinamos la respuesta institucional. Cada paso queda en constancia contemporánea ante SiNaCEAM y CONAMED.',
        },
      ],
      'us-en': [{ text: '[us-en pending]' }],
    },
    ctaSecondaryLabel: {
      'mx-es': 'Conocer el modelo operativo',
      'us-en': '[us-en pending]',
    },
    ctaSecondaryTarget: 'section4.zoneB',
    metrics: [
      {
        'mx-es': { value: '24/7', label: 'Centro de Revisión' },
        'us-en': { value: '24/7', label: '[us-en pending]' },
      },
      {
        'mx-es': { value: '17', label: 'Casos de uso' },
        'us-en': { value: '17', label: '[us-en pending]' },
      },
      {
        'mx-es': { value: '0', label: 'Integración requerida' },
        'us-en': { value: '0', label: '[us-en pending]' },
      },
    ],
    video: { desktop: '', mobile: '', poster: '' },
  },

  // ---------------------------------------------------------------------------
  // Section 2 -- Operational Reality (placeholder)
  // ---------------------------------------------------------------------------
  section2: {
    eyebrow: {
      'mx-es': '[S2 eyebrow pending]',
      'us-en': '[S2 eyebrow pending]',
    },
    heading: {
      'mx-es': '[S2 heading pending]',
      'us-en': '[S2 heading pending]',
    },
    pressures: [
      { 'mx-es': '[presión 1 pendiente]', 'us-en': '[pressure 1 pending]' },
      { 'mx-es': '[presión 2 pendiente]', 'us-en': '[pressure 2 pending]' },
      { 'mx-es': '[presión 3 pendiente]', 'us-en': '[pressure 3 pending]' },
      { 'mx-es': '[presión 4 pendiente]', 'us-en': '[pressure 4 pending]' },
    ],
    ucEyebrow: {
      'mx-es': '[UC strip eyebrow pending]',
      'us-en': '[UC strip eyebrow pending]',
    },
    ucHeading: {
      'mx-es': '[UC strip heading pending]',
      'us-en': '[UC strip heading pending]',
    },
    ucCards: [
      {
        name: { 'mx-es': '[UC1 pendiente]', 'us-en': '[UC1 pending]' },
        framing: {
          'mx-es': '[framing 1 pendiente]',
          'us-en': '[framing 1 pending]',
        },
      },
      {
        name: { 'mx-es': '[UC2 pendiente]', 'us-en': '[UC2 pending]' },
        framing: {
          'mx-es': '[framing 2 pendiente]',
          'us-en': '[framing 2 pending]',
        },
      },
      {
        name: { 'mx-es': '[UC3 pendiente]', 'us-en': '[UC3 pending]' },
        framing: {
          'mx-es': '[framing 3 pendiente]',
          'us-en': '[framing 3 pending]',
        },
      },
      {
        name: { 'mx-es': '[UC4 pendiente]', 'us-en': '[UC4 pending]' },
        framing: {
          'mx-es': '[framing 4 pendiente]',
          'us-en': '[framing 4 pending]',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Section 3 -- Per-Buyer-Chain Proof (placeholder, tabCount: 4)
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
  // Section 4 -- Proof + Legitimacy (placeholder)
  // Metric 2 (Camas activas) uses the em-dash glyph to exercise the
  // carve-out infrastructure end-to-end (AC#5).
  // ---------------------------------------------------------------------------
  section4: {
    zoneAEyebrow: {
      'mx-es': 'OPERAMOS ASÍ',
      'us-en': '[S4 eyebrow pending]',
    },
    zoneAMetrics: [
      {
        'mx-es': { value: 'Pilotos 2026', label: 'Despliegue' },
        'us-en': { value: '[pending]', label: '[pending]' },
      },
      {
        'mx-es': { value: EM_DASH_GLYPH, label: 'Camas activas' },
        'us-en': { value: EM_DASH_GLYPH, label: '[pending]' },
      },
      {
        'mx-es': {
          value: 'CSG · CONAMED · ASF',
          label: 'Marco regulatorio',
        },
        'us-en': { value: '[pending]', label: '[pending]' },
      },
      {
        'mx-es': { value: 'Servicio digital', label: 'Modalidad' },
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
    zoneBUcAnchor: 'UC1 Campo Estéril',
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
  // Section 5 -- Final CTA (VM-407 locked mx-es content for Zone B;
  // FAQ Zone A is placeholder)
  // ---------------------------------------------------------------------------
  section5: {
    faqEyebrow: {
      'mx-es': 'ANTES DE SOLICITAR LA REUNIÓN',
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
      'mx-es': 'EL CICLO COMPLETO, EN SU HOSPITAL',
      'us-en': '[us-en pending]',
    },
    ctaHeadingLine1: {
      'mx-es': [{ text: 'Detectar, confirmar, coordinar.' }],
      'us-en': [{ text: '[us-en pending]' }],
    },
    ctaHeadingLine2: {
      'mx-es': [{ text: 'En el momento en que ocurre.' }],
      'us-en': [{ text: '[us-en pending]' }],
    },
    ctaFrame: {
      'mx-es':
        'Cada evento crítico recorre el mismo ciclo, confirmado por un analista en nuestro Centro de Revisión y coordinado hasta el cierre. Solicite una evaluación institucional para activar el ciclo en su hospital.',
      'us-en': '[us-en pending]',
    },
    ctaReassurance: {
      'mx-es': 'Respuesta en menos de 24 horas hábiles',
      'us-en': '[us-en pending]',
    },
  },

  // ---------------------------------------------------------------------------
  // Sticky CTA (placeholder)
  // ---------------------------------------------------------------------------
  sticky: {
    promptMobile: {
      'mx-es': '¿Listo para una reunión?',
      'us-en': '[us-en pending]',
    },
    promptDesktop: {
      'mx-es': '¿Listo para agendar una reunión con nuestro equipo?',
      'us-en': '[us-en pending]',
    },
  },
};
