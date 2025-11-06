"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LandingPageConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  config: LandingPageConfig["hero"];
  theme: LandingPageConfig["theme"];
}

export function HeroSection({ config, theme }: HeroSectionProps) {
  const animationVariants = {
    scale: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.5, ease: "easeOut" },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 },
    },
    slide: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.5 },
    },
  };

  const animation = config.animation?.enabled
    ? animationVariants[config.animation.type || "fade"]
    : {};

  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Headline */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          style={{ color: theme.textColor }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {config.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {config.subheadline}
        </motion.p>

        {/* Hero Image */}
        <motion.div
          className={cn(
            "relative w-full max-w-3xl mx-auto transition-transform duration-300",
            config.animation?.hoverEffect && "hover:scale-105"
          )}
          {...animation}
        >
          <div className="relative w-full" style={{ aspectRatio: `${config.image.width}/${config.image.height}` }}>
            <Image
              src={config.image.src}
              alt={config.image.alt}
              fill
              className="object-contain rounded-lg shadow-2xl"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
