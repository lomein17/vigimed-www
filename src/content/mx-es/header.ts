import type { HeaderContent } from '@/content/us-en/header';

export const header: HeaderContent = {
  nav: {
    hospitales: {
      label: 'HOSPITALES',
      drawerName: 'Hospitales',
      drawerQuestion:
        '¿Y si cada evento crítico se resolviera con la misma rigurosidad que su mejor caso?',
      subsegments: [
        { name: 'Hospitales Privados', slug: '/mx-es/hospitales-privados/' },
        { name: 'Hospitales Públicos', slug: '/mx-es/hospitales-publicos/' },
        {
          name: 'Sistemas Hospitalarios',
          slug: '/mx-es/sistemas-hospitalarios/',
        },
      ],
    },
    clinicas: {
      label: 'CLÍNICAS',
      drawerName: 'Clínicas',
      drawerQuestion:
        '¿Cuántos eventos críticos pasan sin documentar en su clínica esta semana?',
      subsegments: [
        {
          name: 'Clínicas de Maternidad',
          slug: '/mx-es/clinicas-de-maternidad/',
        },
      ],
    },
    laboratorios: {
      label: 'LABORATORIOS',
      drawerName: 'Laboratorios',
      drawerQuestion:
        '¿Sus errores preanalíticos llegan al responsable antes de que se conviertan en quejas?',
      subsegments: [
        {
          name: 'Laboratorios Clínicos',
          slug: '/mx-es/laboratorios-clinicos/',
        },
      ],
    },
  },
  utility: {
    login: 'Iniciar sesión',
    contact: 'Contáctenos',
    contactMobile: 'Contacto',
  },
  cta: {
    demo: 'Agende una demo',
    demoMobile: 'Demo',
  },
  cardCta: 'Conozca más',
  loginUrl: 'https://app.vigimed.ai/login',
};
