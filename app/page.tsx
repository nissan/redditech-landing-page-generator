import { loadConfig } from "@/lib/config";
import { HeroSection } from "@/components/hero-section";
import { CTASection } from "@/components/cta-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
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

      <CTASection config={config.cta} theme={config.theme} />

      {config.features?.enabled && (
        <FeaturesSection config={config.features} theme={config.theme} />
      )}

      {config.testimonials?.enabled && (
        <TestimonialsSection config={config.testimonials} theme={config.theme} />
      )}

      <Footer config={config.footer} theme={config.theme} />
    </main>
  );
}
