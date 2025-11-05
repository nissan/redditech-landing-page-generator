"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { CheckCircle2 } from "lucide-react";

interface HookStoryOfferSectionProps {
  config: {
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
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  };
}

export function HookStoryOfferSection({ config, theme }: HookStoryOfferSectionProps) {
  if (!config.enabled) return null;

  const handleCTA = () => {
    if (config.offer?.cta.url) {
      window.location.href = config.offer.cta.url;
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hook Section */}
        {config.hook && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-center">
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{ color: theme.primaryColor }}
              >
                The Hook
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed whitespace-pre-line">
                {config.hook.text}
              </p>
            </div>
          </motion.div>
        )}

        {/* Story Section */}
        {config.story && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-8 md:p-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: theme.primaryColor }}
              >
                My Story
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {config.story.text}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Offer Section */}
        {config.offer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div
              className="border-4 rounded-xl p-8 md:p-12 shadow-2xl"
              style={{ borderColor: theme.primaryColor }}
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-6 text-center"
                style={{ color: theme.primaryColor }}
              >
                {config.offer.heading}
              </h2>

              {/* Features */}
              {config.offer.features && config.offer.features.length > 0 && (
                <div className="mb-8">
                  <ul className="space-y-4">
                    {config.offer.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          className="w-6 h-6 mt-0.5 flex-shrink-0"
                          style={{ color: theme.primaryColor }}
                        />
                        <span className="text-lg">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing */}
              {config.offer.pricing && (
                <div className="text-center mb-8">
                  {config.offer.pricing.originalPrice && (
                    <p className="text-2xl text-muted-foreground line-through mb-2">
                      {config.offer.pricing.originalPrice}
                    </p>
                  )}
                  {config.offer.pricing.discountedPrice && (
                    <p
                      className="text-5xl md:text-6xl font-bold mb-4"
                      style={{ color: theme.primaryColor }}
                    >
                      {config.offer.pricing.discountedPrice}
                    </p>
                  )}
                  {config.offer.pricing.urgencyText && (
                    <p
                      className="text-lg font-semibold mb-6 uppercase tracking-wide"
                      style={{ color: theme.accentColor }}
                    >
                      {config.offer.pricing.urgencyText}
                    </p>
                  )}
                </div>
              )}

              {/* CTA Button */}
              <div className="text-center mb-6">
                <Button
                  size="lg"
                  onClick={handleCTA}
                  className="text-lg px-8 py-6 h-auto font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  style={{
                    backgroundColor: theme.primaryColor,
                    color: '#ffffff',
                  }}
                >
                  {config.offer.cta.text}
                </Button>
              </div>

              {/* Guarantee */}
              {config.offer.guarantee && (
                <p className="text-center text-sm text-muted-foreground italic">
                  {config.offer.guarantee}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
