export type HeaderSubsegment = {
  name: string;
  slug: string;
  valueProp?: string;
  image?: { src: string; alt: string };
};

export type HeaderParent = {
  label: string;
  drawerName: string;
  drawerQuestion: string;
  subsegments: readonly HeaderSubsegment[];
};

export type HeaderParentKey = 'hospitals' | 'labs' | 'hospitales' | 'clinicas' | 'laboratorios';

export interface HeaderContent {
  nav: Record<string, HeaderParent>;
  utility: {
    login: string;
  };
  cta: {
    demo: string;
    demoMobile: string;
  };
  cardCta: string;
  loginUrl: string;
}

export const header: HeaderContent = {
  nav: {
    hospitals: {
      label: 'HOSPITALS',
      drawerName: 'Hospitals',
      drawerQuestion:
        'What if every critical event closed with the same rigor as your best case?',
      subsegments: [
        {
          name: 'Health Systems',
          slug: '/us-en/health-systems',
          valueProp:
            'What works at your flagship facility, now running identically at every hospital in your network.',
          image: {
            src: '/subsegments/us_systems.jpeg',
            alt: 'Health Systems',
          },
        },
        {
          name: 'Community Hospitals',
          slug: '/us-en/community-hospitals',
          valueProp:
            'Critical-event response that fits inside your current staff load, not on top of it.',
          image: {
            src: '/subsegments/us_community.jpeg',
            alt: 'Community Hospitals',
          },
        },
        {
          name: 'Academic Medical Centers',
          slug: '/us-en/academic-medical-centers',
          valueProp:
            'The rigor your residents are trained to expect, built into the operation around them.',
          image: {
            src: '/subsegments/us_academic.jpeg',
            alt: 'Academic Medical Centers',
          },
        },
      ],
    },
    labs: {
      label: 'LABS',
      drawerName: 'Labs',
      drawerQuestion:
        'Do your preanalytical errors reach the right\nowner before they become complaints?',
      subsegments: [
        {
          name: 'Clinical Labs',
          slug: '/us-en/clinical-labs',
          valueProp:
            'Preanalytical errors stay hidden in the LIS until they cost a result. VigiMed surfaces them earlier.',
          image: {
            src: '/subsegments/us_labs.jpeg',
            alt: 'Clinical Labs',
          },
        },
      ],
    },
  },
  utility: {
    login: 'Log in',
  },
  cta: {
    demo: 'Book a demo',
    demoMobile: 'Demo',
  },
  cardCta: 'Find out more',
  loginUrl: 'https://app.vigimed.ai/login',
};
