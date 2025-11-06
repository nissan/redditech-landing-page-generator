"use client";

import React from "react";
import { LandingPageConfig } from "@/lib/config";
import { Twitter, Github, Linkedin } from "lucide-react";

interface FooterProps {
  config: LandingPageConfig["footer"];
  theme: LandingPageConfig["theme"];
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
};

export function Footer({ config, theme }: FooterProps) {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {config.copyright}
          </p>

          {/* Links */}
          {config.links && config.links.length > 0 && (
            <div className="flex gap-6">
              {config.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}

          {/* Social Links */}
          {config.social && config.social.length > 0 && (
            <div className="flex gap-4">
              {config.social.map((social, index) => {
                const Icon = socialIconMap[social.platform];
                if (!Icon) return null;

                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
