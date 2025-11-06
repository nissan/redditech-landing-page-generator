'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { LandingPageConfig } from '@/lib/config';

interface FAQSectionProps {
  config: LandingPageConfig['faq'];
  theme: LandingPageConfig['theme'];
}

export function FAQSection({ config, theme }: FAQSectionProps) {
  if (!config?.enabled || !config.items || config.items.length === 0) return null;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: theme.primaryColor }}
          >
            {config.heading}
          </h2>
          {config.subheading && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {config.subheading}
            </p>
          )}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {config.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold pr-8 flex-1">
                    {item.question}
                  </h3>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform"
                    style={{
                      backgroundColor: isOpen ? theme.primaryColor : 'transparent',
                      border: `2px solid ${theme.primaryColor}`,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus
                        className="w-4 h-4"
                        style={{ color: theme.primaryColor }}
                      />
                    )}
                  </div>
                </button>

                {/* Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div
                          className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Schema.org Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: config.items.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer.replace(/<[^>]*>/g, ''), // Strip HTML for schema
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
