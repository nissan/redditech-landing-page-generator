'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle2 } from 'lucide-react';
import { LandingPageConfig } from '@/lib/config';

interface GuaranteeSectionProps {
  config: LandingPageConfig['guarantee'];
  theme: LandingPageConfig['theme'];
}

export function GuaranteeSection({ config, theme }: GuaranteeSectionProps) {
  if (!config?.enabled) return null;

  // Map guarantee type to duration display
  const getDurationDisplay = () => {
    if (config.duration) return config.duration;

    switch (config.type) {
      case '30-day':
        return '30 Days';
      case '60-day':
        return '60 Days';
      case '90-day':
        return '90 Days';
      case 'lifetime':
        return 'Lifetime';
      default:
        return config.type;
    }
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Main Card */}
          <div
            className="rounded-2xl shadow-xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${theme.primaryColor}15 0%, ${theme.accentColor}10 100%)`,
              border: `3px solid ${theme.primaryColor}`,
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              {/* Left: Badge/Icon */}
              <div className="flex justify-center md:justify-start">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  {/* Guarantee Badge Circle */}
                  <div
                    className="w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primaryColor} 0%, ${theme.accentColor} 100%)`,
                    }}
                  >
                    <Shield className="w-16 h-16 text-white mb-2" strokeWidth={2} />
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold leading-tight">
                        {getDurationDisplay()}
                      </div>
                      <div className="text-sm font-medium uppercase tracking-wide">
                        Money-Back
                      </div>
                      <div className="text-sm font-medium uppercase tracking-wide">
                        Guarantee
                      </div>
                    </div>
                  </div>

                  {/* Decorative Check Badge */}
                  <div
                    className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: '#10b981' }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Right: Content */}
              <div className="text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: theme.primaryColor }}
                >
                  {config.heading}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg leading-relaxed mb-6"
                >
                  {config.description}
                </motion.p>

                {/* Conditions */}
                {config.conditions && (
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-sm text-muted-foreground italic"
                  >
                    {config.conditions}
                  </motion.p>
                )}

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-6 flex flex-col sm:flex-row gap-4 items-center md:items-start md:justify-start"
                >
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#10b981' }} />
                    <span>No Questions Asked</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#10b981' }} />
                    <span>100% Risk-Free</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-3 -left-3 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full opacity-20 blur-xl" />
          <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-20 blur-xl" />
        </motion.div>
      </div>
    </section>
  );
}
