import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface LandingPageConfig {
  metadata: {
    title: string;
    description: string;
    favicon?: string;
    ogImage?: string;
  };
  theme: {
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    animation?: {
      enabled: boolean;
      type: 'scale' | 'fade' | 'slide';
      hoverEffect: boolean;
    };
  };
  cta: {
    heading: string;
    description: string;
    form?: {
      enabled: boolean;
      action: string;
      method: string;
      fields: Array<{
        name: string;
        type: string;
        placeholder: string;
        required: boolean;
        validation: string;
      }>;
      button: {
        text: string;
        style: string;
      };
      privacyText: string;
    };
    link?: {
      url: string;
      text: string;
      openInNewTab: boolean;
    };
  };
  features?: {
    enabled: boolean;
    heading: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
  testimonials?: {
    enabled: boolean;
    heading: string;
    items: Array<{
      quote: string;
      author: string;
      role: string;
      avatar?: string;
    }>;
  };
  footer: {
    copyright: string;
    links?: Array<{
      text: string;
      url: string;
    }>;
    social?: Array<{
      platform: string;
      url: string;
    }>;
  };
  analytics?: {
    googleAnalytics?: string;
    plausible?: string;
  };
  email?: {
    provider: string;
  };
  hookStoryOffer?: {
    enabled: boolean;
    hook?: {
      text: string;
    };
    story?: {
      text: string;
    };
    offer?: {
      heading: string;
      features: string[];
      pricing?: {
        originalPrice?: string;
        discountedPrice?: string;
        urgencyText?: string;
      };
      cta: {
        text: string;
        url?: string;
      };
      guarantee?: string;
    };
  };
}

export function loadConfig(configPath = 'content/landing.yaml'): LandingPageConfig {
  const filePath = path.join(process.cwd(), configPath);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const config = yaml.load(fileContents) as LandingPageConfig;
  return config;
}
