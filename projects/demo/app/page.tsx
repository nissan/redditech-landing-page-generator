import {
  loadConfig,
  HeroSection,
  CTASection,
  FeaturesSection,
  TestimonialsSection,
  HookStoryOfferSection,
  HowItWorksSection,
  TrustBadgesSection,
  FAQSection,
  GuaranteeSection,
  Footer,
  ThemeToggle,
  type LandingPageConfig,
} from "@lpg/ui";
import type { Metadata } from "next";

// Load configuration
const config = loadConfig();

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  openGraph: {
    title: config.metadata.title,
    description: config.metadata.description,
    images: config.metadata.ogImage ? [config.metadata.ogImage] : [],
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <ThemeToggle />

      <HeroSection config={config.hero} theme={config.theme} />

      {config.howItWorks?.enabled && (
        <HowItWorksSection config={config.howItWorks} theme={config.theme} />
      )}

      <CTASection config={config.cta} theme={config.theme} />

      {config.features?.enabled && (
        <FeaturesSection config={config.features} theme={config.theme} />
      )}

      {config.socialProof?.enabled && (
        <TrustBadgesSection config={config.socialProof} theme={config.theme} />
      )}

      {config.testimonials?.enabled && (
        <TestimonialsSection config={config.testimonials} theme={config.theme} />
      )}

      {config.guarantee?.enabled && (
        <GuaranteeSection config={config.guarantee} theme={config.theme} />
      )}

      {config.faq?.enabled && (
        <FAQSection config={config.faq} theme={config.theme} />
      )}

      {config.hookStoryOffer?.enabled && (
        <HookStoryOfferSection config={config.hookStoryOffer} theme={config.theme} />
      )}

      <Footer config={config.footer} theme={config.theme} />
    </main>
  );
}
