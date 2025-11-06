"use client";

import React from "react";
import { motion } from "framer-motion";
import { LandingPageConfig } from "@/lib/config";
import { Code, Rocket, Star, Zap, Shield, Users } from "lucide-react";

interface FeaturesSectionProps {
  config: LandingPageConfig["features"];
  theme: LandingPageConfig["theme"];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  rocket: Rocket,
  star: Star,
  zap: Zap,
  shield: Shield,
  users: Users,
};

export function FeaturesSection({ config, theme }: FeaturesSectionProps) {
  if (!config?.enabled) return null;

  return (
    <section className="container mx-auto px-4 py-12 md:py-20 bg-muted/30">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ color: theme.textColor }}
        >
          {config.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {config.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Star;

            return (
              <motion.div
                key={index}
                className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${theme.primaryColor}20`, color: theme.primaryColor }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
