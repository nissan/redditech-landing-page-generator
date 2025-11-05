# Hook-Story-Offer Framework Guide

## Overview

The Hook-Story-Offer (HSO) framework is a proven copywriting structure popularized by Russell Brunson. This feature uses AI to generate compelling landing page copy following this framework.

## What is Hook-Story-Offer?

### The Hook
Catches the reader's attention through:
- **Curiosity**: Stand out from the crowd
- **Empathy**: Address inner fears and desires
- **Promise**: Make a compelling promise your offer fulfills

### The Story
A short, action-packed narrative showing:
- Your low point (where you were)
- The solution you found (your transformation)
- Your current state (where you are now)
- How you help others achieve the same

### The Offer
A ridiculously compelling offer that uses:
- Urgency and scarcity
- Risk reversal (guarantees)
- High perceived value
- Clear, specific benefits

## How to Use

### Prerequisites

1. **OpenAI API Key Required**: This feature requires an OpenAI API key
2. Configure your key: `pnpm configure` → Settings → Enter OpenAI API Key

### Generate Hook-Story-Offer Copy

1. Run the configurator:
   ```bash
   pnpm configure
   ```

2. Select **"Generate Hook-Story-Offer (AI)"** from the main menu

3. Follow the prompts to provide:
   - **Context**: Describe your business/product
   - **Low Point**: Your struggle before finding the solution
   - **Solution**: What you discovered that changed everything
   - **Current State**: Where you are now and how you help others
   - **Offer**: Details about your product/service

4. Choose your tone:
   - Professional
   - Casual & Friendly
   - Urgent & Compelling
   - Inspirational
   - Empathetic & Authentic (recommended)

5. Optionally add pricing:
   - Original price
   - Discounted price
   - Urgency text (e.g., "Limited Time Only")

6. Review the AI-generated copy

7. Save to your configuration

### Example Input

**Context:**
"I teach developers how to build AI-powered applications using modern frameworks"

**Low Point:**
"a struggling developer who couldn't keep up with the AI revolution"

**Solution:**
"a systematic approach to integrating AI into web applications"

**Current State:**
"I help developers ship AI features confidently and quickly"

**Offer:**
"A comprehensive video course with 50+ lessons, code examples, and live support. Includes access to our private Discord community and lifetime updates."

## YAML Configuration

The generated content is saved to `content/landing.yaml`:

```yaml
hookStoryOffer:
  enabled: true
  hook:
    text: "Your compelling hook text..."
  story:
    text: "Your transformation story..."
  offer:
    heading: "Here's What I Want to Give You"
    features:
      - "50+ video lessons covering AI integration"
      - "Production-ready code examples"
      - "Private Discord community access"
      - "Lifetime updates and new content"
      - "30-day money-back guarantee"
    pricing:
      originalPrice: "$299"
      discountedPrice: "$99"
      urgencyText: "Early Bird Pricing - Ends Soon"
    cta:
      text: "Get Started Now"
      url: "/subscribe"
    guarantee: "30-day money-back guarantee, no questions asked"
```

## Component Features

The Hook-Story-Offer section includes:

### Visual Design
- **Hook**: Displayed prominently with brand colors
- **Story**: Gray background box with prose formatting
- **Offer**: Bold border matching brand colors, shadow effects

### Animations
- Smooth fade-in as you scroll
- Staggered feature list animations
- Hover effects on CTA button

### Responsive Design
- Mobile-optimized layouts
- Readable typography at all sizes
- Touch-friendly buttons

## Customization

### Manual Editing

You can manually edit the generated content in `content/landing.yaml`:

```yaml
hookStoryOffer:
  enabled: true
  hook:
    text: "Edit your hook here..."
  story:
    text: "Edit your story here..."
  offer:
    heading: "Custom offer heading"
    features:
      - "Custom feature 1"
      - "Custom feature 2"
    # ... etc
```

### Positioning

The Hook-Story-Offer section appears after:
- Hero
- CTA
- Features (if enabled)
- Testimonials (if enabled)

And before the Footer.

To change the position, edit `app/page.tsx` and reorder the sections.

### Styling

Colors are automatically pulled from your theme configuration:
- `primaryColor`: Used for headings and borders
- `accentColor`: Used for urgency text
- Background uses theme-aware muted colors

## Best Practices

### Writing Your Inputs

1. **Be Specific**: "struggling freelancer making $2k/month" beats "unsuccessful freelancer"
2. **Show Transformation**: Make the before/after contrast clear
3. **Be Authentic**: Real stories resonate more than fabricated ones
4. **Focus on Benefits**: What does the user get, not what you do

### Tone Selection

- **Professional**: B2B SaaS, enterprise products
- **Casual & Friendly**: Consumer apps, community products
- **Urgent & Compelling**: Limited offers, launches
- **Inspirational**: Life-changing products, courses
- **Empathetic & Authentic**: Personal transformation, coaching

### Pricing Strategy

- Show original price crossed out for contrast
- Use urgency text sparingly (must be genuine)
- Include strong guarantee to reduce risk
- Price should match perceived value from features

## AI Costs

- Uses GPT-4o-mini model
- Approximately $0.001-0.002 per generation
- Much cheaper than hiring a copywriter
- Can regenerate as many times as needed

## Troubleshooting

### "OpenAI API key not configured"
1. Run `pnpm configure`
2. Select "Settings"
3. Enter your OpenAI API key
4. Try again

### Generated text is too long/short
- Regenerate with different inputs
- Manually edit in `content/landing.yaml`
- Adjust your context to be more/less detailed

### Section not showing on page
1. Check `hookStoryOffer.enabled: true` in YAML
2. Run `pnpm build` to rebuild
3. Check browser console for errors

## Examples

See the examples in `demo/` folder for complete Hook-Story-Offer implementations.

## Related Documentation

- [CLI Guide](CLI_GUIDE.md) - Complete CLI documentation
- [Customization Guide](CUSTOMIZATION_GUIDE.md) - Advanced customization
- [AI Copywriting](CLI_GUIDE.md#ai-powered-copywriting) - Other AI features

---

**Note**: This feature is optional and requires an OpenAI API key. The framework is based on proven copywriting principles from Russell Brunson's "Expert Secrets" and "DotCom Secrets" books.
