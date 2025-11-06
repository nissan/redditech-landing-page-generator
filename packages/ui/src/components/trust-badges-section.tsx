'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Award, Lock, Star } from 'lucide-react';
import { LandingPageConfig } from '@/lib/config';

interface TrustBadgesSectionProps {
  config: LandingPageConfig['socialProof'];
  theme: LandingPageConfig['theme'];
}

// Icon mapping for badge types
const iconMap: Record<string, any> = {
  security: Lock,
  certification: Award,
  media: Star,
  custom: Shield,
};

export function TrustBadgesSection({ config, theme }: TrustBadgesSectionProps) {
  if (!config?.trustBadges?.enabled || !config.trustBadges.badges || config.trustBadges.badges.length === 0) {
    return null;
  }

  const { trustBadges } = config;

  return (
    <section className="py-16 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        {trustBadges.heading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-muted-foreground/60">
              {trustBadges.heading}
            </h3>
          </motion.div>
        )}

        {/* Badges Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center justify-items-center"
        >
          {trustBadges.badges.map((badge, index) => {
            const IconComponent = iconMap[badge.type] || Shield;
            const isLink = !!badge.url;
            const BadgeWrapper = isLink ? 'a' : 'div';
            const wrapperProps = isLink
              ? {
                  href: badge.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'group cursor-pointer',
                }
              : { className: 'group' };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <BadgeWrapper {...wrapperProps}>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg transition-all hover:bg-muted/50 hover:shadow-md">
                    {/* Badge Image or Icon */}
                    {badge.image ? (
                      <div className="relative w-full h-16 grayscale group-hover:grayscale-0 transition-all">
                        <Image
                          src={badge.image}
                          alt={badge.text}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                        style={{
                          backgroundColor: `${theme.primaryColor}15`,
                          border: `2px solid ${theme.primaryColor}40`,
                        }}
                      >
                        <IconComponent
                          className="w-8 h-8"
                          style={{ color: theme.primaryColor }}
                        />
                      </div>
                    )}

                    {/* Badge Text */}
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {badge.text}
                      </p>
                    </div>
                  </div>
                </BadgeWrapper>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Social Proof Metrics */}
        {config.metrics && config.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {config.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: theme.primaryColor }}
                >
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
