'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { LandingPageConfig } from '@/lib/config';

interface HowItWorksSectionProps {
  config: LandingPageConfig['howItWorks'];
  theme: LandingPageConfig['theme'];
}

// Icon mapping for steps
const iconMap: Record<string, any> = {
  'number-1': () => <span className="text-4xl font-bold">1</span>,
  'number-2': () => <span className="text-4xl font-bold">2</span>,
  'number-3': () => <span className="text-4xl font-bold">3</span>,
  'rocket': () => <span className="text-4xl">🚀</span>,
  'check': () => <span className="text-4xl">✓</span>,
  'star': () => <span className="text-4xl">⭐</span>,
  'lightning': () => <span className="text-4xl">⚡</span>,
  'target': () => <span className="text-4xl">🎯</span>,
  'gear': () => <span className="text-4xl">⚙️</span>,
};

export function HowItWorksSection({ config, theme }: HowItWorksSectionProps) {
  if (!config?.enabled) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative"
        >
          {config.steps.map((step, index) => {
            const IconComponent = iconMap[step.icon || `number-${step.number}`] || iconMap['number-1'];
            const isLast = index === config.steps.length - 1;

            return (
              <div key={step.number} className="relative">
                <motion.div variants={itemVariants} className="relative">
                  {/* Arrow Connector (desktop only) */}
                  {!isLast && (
                    <div className="hidden md:block absolute top-16 -right-6 lg:-right-8 z-0">
                      <ArrowRight
                        className="w-8 h-8 text-muted-foreground/30"
                        strokeWidth={2}
                      />
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="text-center relative z-10">
                    {/* Icon Circle */}
                    <div
                      className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{
                        backgroundColor: `${theme.primaryColor}20`,
                        border: `3px solid ${theme.primaryColor}`
                      }}
                    >
                      <div style={{ color: theme.primaryColor }}>
                        <IconComponent />
                      </div>
                    </div>

                    {/* Step Number Badge */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                        style={{ backgroundColor: theme.accentColor }}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>

                    {/* Timeframe */}
                    {step.timeframe && (
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
                        style={{ color: theme.primaryColor }}
                      >
                        <Clock className="w-4 h-4" />
                        <span>{step.timeframe}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 h-1 w-32 mx-auto rounded-full"
          style={{ backgroundColor: theme.primaryColor }}
        />
      </div>
    </section>
  );
}
