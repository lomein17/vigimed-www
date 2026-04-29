import type { HeaderContent } from '@/content/us-en/header';

export const header: HeaderContent = {
  nav: {
    hospitales: {
      label: 'HOSPITALES',
      drawerName: 'Hospitales',
      drawerQuestion:
        '¿Y si cada evento crítico se resolviera con la misma rigurosidad que su mejor caso?',
      subsegments: [
        {
          name: 'Hospitales Privados',
          slug: '/mx-es/hospitales-privados/',
          valueProp:
            'Cuando un incidente llega a redes sociales o a una demanda, ya es tarde. VigiMed lo captura cuando ocurre.',
        },
        {
          name: 'Hospitales Públicos',
          slug: '/mx-es/hospitales-publicos/',
          valueProp:
            'Documentación lista para auditoría desde el momento en que se genera el evento.',
        },
        {
          name: 'Sistemas Hospitalarios',
          slug: '/mx-es/sistemas-hospitalarios/',
          valueProp:
            'Lo que funciona en su hospital insignia, replicado con la misma rigurosidad en cada unidad de su red.',
        },
      ],
    },
    clinicas: {
      label: 'CLÍNICAS',
      drawerName: 'Clínicas',
      drawerQuestion:
        '¿Cuántos eventos críticos pasan sin\ndocumentar en su clínica esta semana?',
      subsegments: [
        {
          name: 'Clínicas de Maternidad',
          slug: '/mx-es/clinicas-de-maternidad/',
          valueProp:
            'El reporte voluntario no captura lo que pasa en sala de partos. VigiMed sí.',
        },
      ],
    },
    laboratorios: {
      label: 'LABORATORIOS',
      drawerName: 'Laboratorios',
      drawerQuestion:
        '¿Sus errores preanalíticos llegan al responsable\nantes de que se conviertan en quejas?',
      subsegments: [
        {
          name: 'Laboratorios Clínicos',
          slug: '/mx-es/laboratorios-clinicos/',
          valueProp:
            'Los errores preanalíticos no aparecen en el LIS. VigiMed los hace visibles antes del resultado.',
          image: {
            src: '/subsegments/mx_labs.jpeg',
            alt: 'Laboratorios Clínicos',
          },
        },
      ],
    },
  },
  utility: {
    login: 'Iniciar sesión',
  },
  cta: {
    demo: 'Agende una demo',
    demoMobile: 'Demo',
  },
  cardCta: 'Conozca más',
  loginUrl: 'https://app.vigimed.ai/login',
};
