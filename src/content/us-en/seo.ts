import { SITE_URL, type PageKey } from '@/lib/seo/constants';

export interface PageSeo {
  title: string;
  description: string;
}

export interface SeoContent {
  siteName: string;
  organization: { name: string; url: string; logo: string };
  pages: Record<PageKey, PageSeo>;
}

export const seoContent: SeoContent = {
  siteName: 'VigiMed',
  organization: {
    name: 'VigiMed',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/vigimed-wordmark-on-dark.png`,
  },
  pages: {
    home: {
      title: 'VigiMed: The Critical-Event Response Platform for Hospitals',
      description:
        'VigiMed detects life-safety and quality-of-care events in hospitals in under 60 seconds, confirms each one with a human analyst, and drives the response.',
    },
    platform: {
      title: 'VigiMed Platform: Computer Vision for Hospital Compliance',
      description:
        'Passive observation, automatic verification, and audit-ready reporting. Built to align with Joint Commission standards without adding clinical burden.',
    },
    comingSoon: {
      title: 'VigiMed: Coming Soon',
      description:
        'This section will be available soon. In the meantime, visit Platform or request a demo to start planning compliance coverage at your hospital.',
    },
  },
};
