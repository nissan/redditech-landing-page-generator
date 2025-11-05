"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LandingPageConfig } from "@/lib/config";

interface CTASectionProps {
  config: LandingPageConfig["cta"];
  theme: LandingPageConfig["theme"];
}

export function CTASection({ config, theme }: CTASectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!config.form?.enabled) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch(config.form.action, {
        method: config.form.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Thank you! Check your email for the guidebook." });
        setEmail("");
      } else {
        setMessage({ type: "error", text: "Something went wrong. Please try again." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: theme.textColor }}
        >
          {config.heading}
        </h2>
        <p className="text-base md:text-lg text-muted-foreground mb-8">
          {config.description}
        </p>

        {config.form?.enabled ? (
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder={config.form.fields[0]?.placeholder || "Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={config.form.fields[0]?.required}
                className="flex-1"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                style={{
                  backgroundColor: theme.primaryColor,
                  color: "#ffffff",
                }}
                className="whitespace-nowrap"
              >
                {isSubmitting ? "Submitting..." : config.form.button.text}
              </Button>
            </form>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </motion.div>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              {config.form.privacyText}
            </p>
          </div>
        ) : config.link ? (
          <a
            href={config.link.url}
            target={config.link.openInNewTab ? "_blank" : "_self"}
            rel={config.link.openInNewTab ? "noopener noreferrer" : undefined}
          >
            <Button
              size="lg"
              style={{
                backgroundColor: theme.primaryColor,
                color: "#ffffff",
              }}
            >
              {config.link.text}
            </Button>
          </a>
        ) : null}
      </motion.div>
    </section>
  );
}
