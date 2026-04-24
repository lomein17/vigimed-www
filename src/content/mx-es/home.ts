import type { HomeContent } from '@/content/us-en/home';

export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'LA PLATAFORMA DE RESPUESTA A EVENTOS CRÍTICOS',
    headlineLine1: 'Vea cada evento cuando ocurre.',
    headlineLine2: 'Responda en menos de 60 segundos.',
    subhead:
      'Cámaras dedicadas en sus áreas críticas detectan eventos adversos de seguridad del paciente y calidad de la atención en el momento en que ocurren. Cada detección es confirmada por un analista humano antes de emitir una alerta, para que usted actúe sobre eventos verificados, no sobre falsas alarmas. Después, identificamos los patrones para que el siguiente evento no ocurra.',
    ctaLabel: 'Solicite una consulta',
  },
  capabilities: {
    eyebrow: 'DE LA DETECCIÓN A LA PREVENCIÓN',
    heading: 'Cinco capacidades, un ciclo completo.',
    subhead:
      'Cada evento crítico recorre el mismo ciclo: detectado en tiempo real, confirmado por un humano, respondido en menos de 60 segundos, documentado de forma defensible, y analizado para prevenir su repetición.',
    cards: [
      {
        title: 'Detecta.',
        reveal:
          'Analítica de video identifica eventos críticos conforme ocurren, cuadro por cuadro.',
        icon: 'Eye',
      },
      {
        title: 'Confirma.',
        reveal:
          'Un analista capacitado en nuestro Centro de Revisión verifica cada detección antes de emitir una alerta.',
        icon: 'CheckCircle2',
      },
      {
        title: 'Responde.',
        reveal:
          'La persona indicada recibe la alerta en el canal correcto, su respuesta se rastrea hasta confirmarse, y se escala si se detiene.',
        icon: 'Zap',
      },
      {
        title: 'Documenta.',
        reveal:
          'Cada evento, respuesta y resultado queda registrado de forma legalmente defensible, aprobado por un humano antes de finalizarse.',
        icon: 'FileText',
      },
      {
        title: 'Analiza.',
        reveal:
          'Los patrones entre eventos llegan a quien puede actuar, antes de que ocurra el siguiente evento crítico.',
        icon: 'TrendingUp',
      },
    ],
  },
  problemInMotion: {
    eyebrow: 'LO QUE OCURRE CUANDO NADIE VE',
    headlineLine1: 'La ruptura de un campo estéril dura tres segundos.',
    headlineLine2: 'El daño, meses.',
    frame:
      'Ocurre en quirófanos bien gestionados, sin que nadie se entere a tiempo.',
    sceneCaption:
      'Cámara dedicada en Quirófano 1. Detección continua del campo estéril.',
    banners: {
      green: 'Q1 · Campo estéril · OK',
      amber:
        'Q1 · Riesgo de contaminación detectado · Personal no estéril en zona',
      red: 'Q1 · Ruptura de campo estéril',
    },
    timeline: [
      { timestamp: '00:02', event: 'Ruptura detectada' },
      { timestamp: '00:08', event: 'Confirmada por analista del CRC' },
      { timestamp: '00:14', event: 'Cirujano y equipo notificados' },
      {
        timestamp: '00:42',
        event: 'Campo reestablecido, acción documentada',
      },
    ],
  },
  placeholderLabel: '[asset pendiente]',
};
