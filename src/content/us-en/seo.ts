import { SITE_URL, type PageKey } from '@/lib/seo/constants';

export interface PageSeo {
  title: string;
  description: string;
}

export interface SeoContent {
  siteName: string;
  tagline: string;
  organization: { name: string; url: string; logo: string };
  pages: Record<PageKey, PageSeo>;
}

export const seoContent: SeoContent = {
  siteName: 'VigiMed',
  tagline: 'Compliance you can see.',
  organization: {
    name: 'VigiMed',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/vigimed-wordmark-on-dark.png`,
  },
  pages: {
    home: {
      title: 'VigiMed: Continuous Monitoring for Hospitals',
      description:
        'Computer vision that detects, verifies, and reports hospital compliance in real time. Aligned with Joint Commission and CMS Conditions of Participation.',
    },
    platform: {
      title: 'VigiMed Platform: Computer Vision for Hospital Compliance',
      description:
        'Passive observation, automatic verification, and audit-ready reporting. Built to align with Joint Commission standards without adding clinical burden.',
    },
    contact: {
      title: 'Contact VigiMed: Request a Hospital Demo',
      description:
        'Book a walkthrough with the VigiMed team. Coverage for US hospitals aligning with Joint Commission, CMS Conditions of Participation, and state surveys.',
    },
    comingSoon: {
      title: 'VigiMed: Coming Soon',
      description:
        'This section will be available soon. In the meantime, visit Platform or request a demo to start planning compliance coverage at your hospital.',
    },
  },
};
