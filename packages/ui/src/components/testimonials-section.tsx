"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LandingPageConfig } from "@/lib/config";
import { Quote } from "lucide-react";

interface TestimonialsSectionProps {
  config: LandingPageConfig["testimonials"];
  theme: LandingPageConfig["theme"];
}

export function TestimonialsSection({ config, theme }: TestimonialsSectionProps) {
  if (!config?.enabled) return null;

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {config.items.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-muted/30 p-6 md:p-8 rounded-lg relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Quote
                className="absolute top-4 right-4 w-8 h-8 opacity-20"
                style={{ color: theme.primaryColor }}
              />
              <p className="text-lg mb-4 italic" style={{ color: theme.textColor }}>
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                {testimonial.avatar && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold" style={{ color: theme.textColor }}>
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
