export type HeaderSubsegment = {
  name: string;
  slug: string;
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
    contact: string;
    contactMobile: string;
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
        { name: 'Health Systems', slug: '/us-en/health-systems/' },
        { name: 'Community Hospitals', slug: '/us-en/community-hospitals/' },
        {
          name: 'Academic Medical Centers',
          slug: '/us-en/academic-medical-centers/',
        },
      ],
    },
    labs: {
      label: 'LABS',
      drawerName: 'Labs',
      drawerQuestion:
        'Do your preanalytical errors reach the right owner before they become complaints?',
      subsegments: [
        { name: 'Clinical Labs', slug: '/us-en/clinical-labs/' },
      ],
    },
  },
  utility: {
    login: 'Log in',
    contact: 'Contact us',
    contactMobile: 'Contact',
  },
  cta: {
    demo: 'Book a demo',
    demoMobile: 'Demo',
  },
  cardCta: 'Find out more',
  loginUrl: 'https://app.vigimed.ai/login',
};
