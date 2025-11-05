# Quick Start Guide

Get your landing page up and running in 5 minutes!

## Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see your landing page.

## Customization in 3 Steps

### Step 1: Update Your Content

Edit `content/landing.yaml`:

```yaml
hero:
  headline: "Your Amazing Product Title"
  subheadline: "Why it's awesome in one sentence"

cta:
  heading: "Get Started Today"
  form:
    button:
      text: "Sign Up Free"
```

### Step 2: Add Your Image

Replace `public/guidebook-cover.png` with your product image, or update the path in `content/landing.yaml`:

```yaml
hero:
  image:
    src: "/your-image.png"
```

### Step 3: Customize Colors

Update your brand colors in `content/landing.yaml`:

```yaml
theme:
  primaryColor: "#your-brand-color"
  accentColor: "#your-accent-color"
```

## Deploy to Vercel

```bash
# Build for production
pnpm build

# Or deploy to Vercel
vercel deploy
```

## What's Included

- ✅ Responsive landing page
- ✅ Dark/light mode with system detection
- ✅ Email capture form
- ✅ Smooth animations
- ✅ SEO optimized
- ✅ TypeScript support
- ✅ Easy YAML configuration

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) for advanced customization
- Configure email service in `app/api/subscribe/route.ts`
- Add your logo and favicon
- Set up analytics (Google Analytics, Plausible, etc.)

## Need Help?

- Review the example YAML configuration in `content/landing.yaml`
- Check component files in `components/` for implementation details
- Open an issue on GitHub

---

Happy building! 🚀
