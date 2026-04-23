import type { HomeContent } from '@/content/us-en/home';

export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'MONITOREO DE CUMPLIMIENTO HOSPITALARIO',
    headline: 'Cumplimiento que se ve.',
    subhead:
      'Monitoreo continuo con video e IA, verificado por humanos, mapeado a sus obligaciones regulatorias. Sin rondas. Sin checklists. Sin puntos ciegos.',
    cta: 'Solicitar demostración',
  },
  problem: {
    cards: [
      { stat: '5%', label: 'de los eventos capturados por auditorías manuales', icon: 'ClipboardList' },
      { stat: '44%', label: 'efecto Hawthorne en observación manual', icon: 'Eye' },
      { stat: '0', label: 'segundos de cobertura entre rondas', icon: 'Clock' },
    ],
  },
  solution: {
    cards: [
      { title: 'Monitoreo 24/7', body: 'Observación continua de cumplimiento basada en cámaras.', icon: 'Video' },
      { title: '17 Casos de Uso', body: 'Desde brechas en campo estéril hasta proporciones de personal.', icon: 'LayoutGrid' },
      { title: 'Centro de Revisión', body: 'Alertas verificadas por analistas humanos antes de escalar.', icon: 'ShieldCheck' },
      { title: 'Reportes con Evidencia', body: 'Documentación ligada a video para auditorías e investigaciones.', icon: 'FileText' },
    ],
  },
};
