import type { HomeContent } from '@/content/us-en/home';

export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'LA PLATAFORMA DE RESPUESTA A EVENTOS CRÍTICOS',
    headlineLine1: 'Incidentes, detectados en vivo.',
    headlineLine2: 'Soluciones, coordinadas al cierre.',
    subhead: [
      { text: 'Cámaras dedicadas en sus áreas críticas detectan eventos que comprometen la ' },
      { text: 'seguridad del paciente', emphasis: 'bold-amber' },
      { text: ' y la ' },
      { text: 'calidad de la atención', emphasis: 'bold-amber' },
      { text: ' en el momento en que ocurren. Cada detección es confirmada por un analista humano en nuestro Centro de Revisión, para que usted actúe sobre eventos verificados. Cada incidente se documenta a detalle, y los patrones que emergen entre eventos llegan a su equipo para mejorar procesos y la operación.' },
    ],
    ctaLabel: 'Solicite una evaluación',
    heroVideo: {
      desktop: '/videos/hero-mx-es-desktop.mp4',
      mobile: '/videos/hero-mx-es-mobile.mp4',
      poster: '/images/hero/hero-mx-es-poster.jpg',
    },
  },
  capabilities: {
    eyebrow: 'DE LA DETECCIÓN A LA PREVENCIÓN',
    heading: 'Cinco capacidades, un ciclo completo.',
    subhead:
      'Cada evento crítico recorre el mismo ciclo: detectado en el momento en que ocurre, confirmado por un humano, coordinado hasta la respuesta, documentado de forma defensible, y analizado para mejorar el siguiente.',
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
          'Un analista de nuestro Centro de Revisión verifica en segundos la detección y la alerta.',
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
          'Cada evento, respuesta y resultado queda registrado de forma legalmente defensible, y el proceso de notificaciones y aprobaciones internas es automatizado.',
        icon: 'FileText',
      },
      {
        title: 'Analiza.',
        reveal:
          'Las tendencias entre eventos son detectadas y se presentan al responsable para mejorar la seguridad del paciente y reducir ineficiencias clínicas.',
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
    videoAriaLabel:
      'Equipo quirúrgico operando en un quirófano mientras una enfermera no estéril se acerca a la mesa de instrumentos estériles, toma un instrumento y sale del cuadro.',
  },
  moat: {
    eyebrow: 'POR QUÉ SOLO VIGIMED',
    h2Line1: 'Precisión en la capa de detección.',
    h2Line2: 'Una arquitectura en la capa de plataforma.',
    claims: [
      {
        subEyebrow: 'LA CAPA DE PRECISIÓN',
        heading: 'Cada detección es confirmada por un humano.',
        body: 'Un analista capacitado en nuestro Centro de Revisión revisa cada detección antes de que se emita una alerta. Los falsos positivos se detienen ahí. Cuando su equipo recibe una notificación, el evento ya está verificado. Usted nunca actúa sobre ruido.',
      },
      {
        subEyebrow: 'LA CAPA DE ARQUITECTURA',
        heading: 'Una plataforma, no un conjunto',
        headingLine2: 'de herramientas por integrar.',
        body: 'Detección, confirmación, coordinación, documentación y análisis operan sobre una sola arquitectura. VigiMed instala y opera las cámaras, la analítica, el Centro de Revisión y la capa de reportes. Sin integración con el área de TI del hospital para comenzar.',
      },
    ],
  },
  integrations: {
    h2: 'Diseñado para integrarse con su sistema actual.',
    tiles: [
      { name: 'Microsoft', src: '/integrations/microsoft.svg', width: 604, height: 129, alt: 'Microsoft logo' },
      { name: 'Epic', src: '/integrations/epic.svg', width: 248, height: 97, alt: 'Epic logo' },
      { name: 'Google', src: '/integrations/google.svg', width: 140, height: 44, alt: 'Google logo' },
      { name: 'Oracle', src: '/integrations/oracle.svg', width: 462, height: 60, alt: 'Oracle logo' },
      { name: 'MEDITECH', src: '/integrations/meditech.svg', width: 442, height: 64, alt: 'MEDITECH logo' },
      { name: 'WhatsApp', src: '/integrations/whatsapp.svg', width: 674, height: 435, alt: 'WhatsApp logo' },
      { name: 'Slack', src: '/integrations/slack.png', width: 1600, height: 572, alt: 'Slack logo' },
      { name: 'ServiceNow', src: '/integrations/servicenow.svg', width: 685, height: 100, alt: 'ServiceNow logo' },
    ],
  },
  finalCta: {
    eyebrow: 'COMENCEMOS',
    h2: '¿Listo para mejorar la calidad de la atención?',
    frame:
      'Hable con nuestro equipo para entender alcance, costo, integraciones, y cómo funciona realmente una implementación.',
    steps: [
      {
        heading: 'Contáctenos',
        body: 'Una persona del equipo de VigiMed responderá por correo en un día hábil para confirmar la recepción y proponer horarios de llamada.',
      },
      {
        heading: 'Evaluemos Compatibilidad',
        body: 'Una conversación sobre su operación, sus áreas críticas y sus áreas de oportunidad, junto con un recorrido de la plataforma.',
      },
      {
        heading: 'Solución a la Medida',
        body: 'Le entregaremos una propuesta integral adaptada a su operación, incluyendo una hoja de ruta.',
      },
    ],
    form: {
      labels: {
        name: 'Nombre',
        jobTitle: 'Cargo',
        organizationName: 'Nombre de la Organización',
        organizationType: 'Tipo de Organización',
        workEmail: 'Correo Corporativo',
        phone: 'Teléfono',
        phoneOptional: '(opcional)',
      },
      placeholders: {
        organizationType: 'Seleccione una opción',
      },
      options: [
        { value: 'hospital_200_plus', label: 'Hospital, más de 200 camas' },
        { value: 'hospital_100_199', label: 'Hospital, 100 a 199 camas' },
        { value: 'hospital_50_99', label: 'Hospital, 50 a 99 camas' },
        { value: 'hospital_under_50', label: 'Hospital, menos de 50 camas' },
        { value: 'maternity_clinic', label: 'Clínica de Maternidad' },
        { value: 'system_or_group', label: 'Grupo u operador hospitalario' },
        { value: 'clinical_lab', label: 'Laboratorio clínico' },
        { value: 'public_government', label: 'Institución pública o gubernamental' },
        { value: 'other', label: 'Otra' },
      ],
      submit: 'Solicite una demo',
      submitting: 'Enviando...',
      consentNote:
        'Al enviar este formulario con mis datos de contacto, acepto que dicha información pueda utilizarse para recibir comunicaciones ocasionales de VigiMed sobre sus productos y servicios. Puedo darme de baja en cualquier momento.',
      errors: {
        required: 'Campo obligatorio',
        invalidEmail: 'Ingrese un correo electrónico válido',
      },
    },
    confirmation:
      'Gracias. Una persona del equipo le responderá por correo en un día hábil.',
  },
  placeholderLabel: '[asset pendiente]',
};
