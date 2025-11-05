# Customization Guide

This guide will help you customize the landing page template for your specific project.

## Step-by-Step Customization

### 1. Update Site Metadata

Open `content/landing.yaml` and update the metadata section:

```yaml
metadata:
  title: "Your Product Name - Tagline"
  description: "Clear description of what you offer (for SEO)"
  favicon: "/favicon.ico"
  ogImage: "/og-image.png"  # Image for social media shares (1200x630px recommended)
```

**Tips:**
- Keep title under 60 characters for SEO
- Keep description under 160 characters
- Create an OG image at 1200x630px for best social media appearance

### 2. Customize Brand Colors

Update the theme section to match your brand:

```yaml
theme:
  primaryColor: "#1677be"    # Your main brand color (buttons, links, accents)
  backgroundColor: "#ffffff"  # Background color (light mode)
  textColor: "#1a1a1a"       # Main text color
  accentColor: "#0f5a8a"     # Darker shade for hover effects
```

**Color Selection Tips:**
- Use a color picker to extract colors from your logo
- Ensure sufficient contrast between text and background (WCAG AA: 4.5:1)
- Test colors in both light and dark mode
- Use tools like [Coolors](https://coolors.co) for color palette generation

### 3. Configure the Hero Section

This is the first thing visitors see:

```yaml
hero:
  headline: "Compelling Value Proposition in 10 Words or Less"
  subheadline: "Expand on the value, mention social proof or key benefits"
  image:
    src: "/guidebook-cover.png"  # Replace with your hero image
    alt: "Descriptive alt text for accessibility"
    width: 1000   # Actual image width
    height: 1200  # Actual image height
  animation:
    enabled: true
    type: "scale"      # Options: "scale", "fade", "slide"
    hoverEffect: true  # Adds zoom effect on hover
```

**Writing Tips:**
- Headline: Focus on the main benefit, not features
- Subheadline: Add urgency, social proof, or key differentiator
- Good: "Build AI Apps in Days, Not Months"
- Bad: "AI Development Tool with Many Features"

### 4. Set Up Call-to-Action

Choose between a form or a direct link:

#### Option A: Email Capture Form

```yaml
cta:
  heading: "Get Your Free [Thing]"
  description: "One line about what they'll receive"
  form:
    enabled: true
    action: "/api/subscribe"
    method: "POST"
    fields:
      - name: "email"
        type: "email"
        placeholder: "Enter your email address"
        required: true
        validation: "email"
    button:
      text: "Get Free Access"
      style: "primary"
    privacyText: "We respect your privacy. Unsubscribe at any time."
```

#### Option B: Direct Link

```yaml
cta:
  heading: "Ready to Get Started?"
  description: "Download now and start building"
  link:
    url: "https://example.com/download"
    text: "Download Now"
    openInNewTab: true
```

### 5. Add Features Section (Optional)

Showcase 3-6 key features:

```yaml
features:
  enabled: true
  heading: "What You'll Get"
  items:
    - title: "Feature Name"
      description: "Brief description of the benefit (not just what it does)"
      icon: "code"  # Available icons: code, rocket, star, zap, shield, users

    - title: "Another Feature"
      description: "Focus on outcomes and benefits"
      icon: "rocket"

    - title: "Third Feature"
      description: "Keep descriptions under 100 characters"
      icon: "star"
```

**Best Practices:**
- 3 features for simple products, 6 for comprehensive offerings
- Use benefit-focused language ("Save Time" vs "Automation Feature")
- Keep descriptions scannable and concise

### 6. Add Testimonials (Optional)

Build trust with social proof:

```yaml
testimonials:
  enabled: true
  heading: "What Developers Say"
  items:
    - quote: "Specific, authentic feedback with concrete results"
      author: "Full Name"
      role: "Job Title, Company"
      avatar: "/avatars/person1.jpg"  # Optional

    - quote: "Another testimonial highlighting different benefit"
      author: "Another Person"
      role: "Their Credentials"
      avatar: "/avatars/person2.jpg"
```

**Testimonial Tips:**
- Use real testimonials (ask customers/users)
- Include specific results or metrics when possible
- Add role/company for credibility
- 2-4 testimonials work best

### 7. Configure Footer

```yaml
footer:
  copyright: "© 2025 Your Company Name. All rights reserved."
  links:
    - text: "Privacy Policy"
      url: "/privacy"
    - text: "Terms of Service"
      url: "/terms"
    - text: "Contact"
      url: "/contact"
  social:
    - platform: "twitter"
      url: "https://twitter.com/yourhandle"
    - platform: "github"
      url: "https://github.com/yourusername"
    - platform: "linkedin"
      url: "https://linkedin.com/company/yourcompany"
```

## Advanced Customization

### Changing Animation Types

Each section can have different animations. Edit component files:

**Hero Section** (`components/hero-section.tsx`):
```typescript
// Change animation duration
transition={{ duration: 0.8 }}  // Default: 0.6

// Change delay
transition={{ duration: 0.6, delay: 0.3 }}  // Default: 0.1
```

**CTA Section** (`components/cta-section.tsx`):
```typescript
// Disable viewport detection (always animate)
viewport={{ once: false }}  // Default: { once: true }

// Change animation threshold
viewport={{ once: true, amount: 0.5 }}  // Trigger at 50% visible
```

### Custom Color Schemes

Beyond the YAML theme colors, you can modify the design system in `app/globals.css`:

```css
:root {
  --primary: 204 70% 40%;  /* HSL format: Hue Saturation Lightness */
  --radius: 0.5rem;        /* Border radius for components */
}

.dark {
  --primary: 204 70% 50%;  /* Adjust for dark mode */
}
```

### Adding New Sections

1. Create a new component in `components/`:

```typescript
// components/pricing-section.tsx
"use client";

import { LandingPageConfig } from "@/lib/config";

interface PricingSectionProps {
  config: any;
  theme: LandingPageConfig["theme"];
}

export function PricingSection({ config, theme }: PricingSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Your pricing content */}
    </section>
  );
}
```

2. Add configuration to `content/landing.yaml`:

```yaml
pricing:
  enabled: true
  heading: "Simple Pricing"
  plans:
    - name: "Free"
      price: "$0"
      features:
        - "Feature 1"
        - "Feature 2"
```

3. Update `lib/config.ts` types:

```typescript
export interface LandingPageConfig {
  // ... existing fields
  pricing?: {
    enabled: boolean;
    heading: string;
    plans: Array<{
      name: string;
      price: string;
      features: string[];
    }>;
  };
}
```

4. Add to `app/page.tsx`:

```typescript
import { PricingSection } from "@/components/pricing-section";

export default function LandingPage() {
  return (
    <main>
      {/* ... existing sections */}
      {config.pricing?.enabled && (
        <PricingSection config={config.pricing} theme={config.theme} />
      )}
    </main>
  );
}
```

### Email Service Integration

#### Mailchimp

```typescript
// app/api/subscribe/route.ts
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us1"
});

const response = await mailchimp.lists.addListMember(
  process.env.MAILCHIMP_LIST_ID!,
  {
    email_address: email,
    status: "subscribed",
  }
);
```

#### ConvertKit

```typescript
const response = await fetch(
  `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      email: email,
    }),
  }
);
```

#### SendGrid

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

await sgMail.send({
  to: email,
  from: 'your-verified-email@domain.com',
  subject: 'Welcome!',
  text: 'Thanks for subscribing',
  html: '<strong>Thanks for subscribing</strong>',
});
```

## Image Guidelines

### Hero Image
- **Dimensions**: 1000x1200px (or maintain this aspect ratio)
- **Format**: PNG or WebP for quality, JPG for smaller file size
- **File Size**: Keep under 500KB
- **Content**: Product screenshot, book cover, device mockup

### Testimonial Avatars
- **Dimensions**: 200x200px (square)
- **Format**: JPG or WebP
- **File Size**: Keep under 50KB each

### Social Media Image (OG Image)
- **Dimensions**: 1200x630px
- **Format**: JPG or PNG
- **File Size**: Keep under 1MB
- **Content**: Include your headline and visual element

## Typography Customization

The template uses system fonts by default. To use custom fonts:

1. Add to `app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      {children}
    </html>
  );
}
```

2. Or use a custom font file:

```css
/* app/globals.css */
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/your-font.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}

body {
  font-family: 'YourFont', sans-serif;
}
```

## Performance Optimization

1. **Optimize Images**: Use WebP format and next/image component
2. **Minimize YAML**: Remove unused sections (features, testimonials)
3. **Lazy Loading**: Components below fold load on scroll automatically
4. **Analytics**: Add only if needed, impacts load time

## Common Issues

### Images Not Loading
- Ensure images are in `public/` folder
- Check file extensions match YAML config exactly
- Use absolute paths starting with `/`

### Form Not Submitting
- Check `/api/subscribe/route.ts` is configured
- Verify API endpoint in YAML matches: `/api/subscribe`
- Check browser console for errors

### Dark Mode Not Working
- Ensure `ThemeProvider` is in `app/layout.tsx`
- Check `suppressHydrationWarning` is on `<html>` tag
- Verify CSS variables in `globals.css` include `.dark` variants

### TypeScript Errors
- Run `pnpm type-check` to see all errors
- Ensure `lib/config.ts` types match YAML structure
- Add optional `?` to non-required fields in interface

## Need Help?

1. Check the main README.md
2. Review example YAML configuration
3. Inspect component files for implementation details
4. Open an issue on GitHub with:
   - What you're trying to achieve
   - What's happening instead
   - Relevant code snippets
