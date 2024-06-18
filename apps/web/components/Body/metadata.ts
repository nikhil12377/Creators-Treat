import type { Metadata, Viewport } from 'next';

const APP_NAME = 'Creators Treat';
const APP_DEFAULT_TITLE = 'Creators Treat - Empower Your Social Media';
const APP_TITLE_TEMPLATE = '%s | Creators Treat';
const APP_DESCRIPTION =
  'Discover top-tier social media management solutions designed for creators. Elevate your online presence with Creators Treat.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: APP_DEFAULT_TITLE,
    // startUpImage: 'path/to/startup-image.png',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: 'https://www.creatorstreat.com', // Example URL
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};
