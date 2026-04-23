import { SITE_URL } from '@/lib/seo/constants';
import type { SeoContent } from '@/content/us-en/seo';

export const seoContent: SeoContent = {
  siteName: 'VigiMed',
  organization: {
    name: 'VigiMed',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/vigimed-wordmark-on-dark.png`,
  },
  pages: {
    home: {
      title: 'VigiMed: Vigilancia continua para hospitales',
      description:
        'Sistema de visión por computadora que detecta, verifica y reporta cumplimiento NOM en hospitales mexicanos, sin interrumpir el flujo clínico ni agregar papeleo.',
    },
    platform: {
      title: 'Plataforma VigiMed: Visión por computadora para hospitales',
      description:
        'Observación pasiva, verificación automática y reportes auditables. Una plataforma diseñada para cumplir NOM sin sumar carga al personal clínico.',
    },
    contact: {
      title: 'Contacto VigiMed: Solicita una demostración',
      description:
        'Agenda una demostración con el equipo VigiMed. Cobertura para hospitales en México y alineación con NOM aplicables al área quirúrgica y terapia intensiva.',
    },
    comingSoon: {
      title: 'VigiMed: Próximamente',
      description:
        'Esta sección estará disponible pronto. Mientras tanto, visita Plataforma o solicita una demostración para adelantarte en la planeación de cumplimiento.',
    },
  },
};
