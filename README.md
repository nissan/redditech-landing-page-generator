# 🚀 Redditech LPG (Landing Page Generator)

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.18.3-orange.svg)](https://pnpm.io/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)

**The modern landing page generator with AI-powered copywriting built right in.** Create beautiful, production-ready landing pages in minutes, not hours.

## ✨ Why LPG?

- **🤖 AI-Powered CLI**: Built-in multi-LLM copywriting (OpenAI GPT-5, Claude Sonnet 4, or FREE local Ollama)
- **🎯 Hook-Story-Offer Framework**: AI-powered conversion copywriting based on Russell Brunson's proven framework
- **⚡ 5-Minute Setup**: From zero to deployed landing page in under 5 minutes
- **🎨 Modern Tech Stack**: Built on Next.js 16, React 19, and Tailwind CSS v4
- **🏗️ Production-Ready**: Fully typed with TypeScript, validated inputs, and comprehensive error handling
- **📝 YAML-Driven**: Edit your content without touching code - no coding required
- **🎭 Beautiful CLI**: Interactive terminal interface with gradient text, animations, and real-time previews
- **🌙 Dark Mode**: Built-in theme toggle with system detection
- **📱 Responsive**: Looks perfect on all devices
- **🔧 No Database Required**: Static generation with optional API routes
- **☁️ Deploy Anywhere**: Vercel, Netlify, Cloudflare Pages, or any static host

## 🎬 Quick Demo

Run the included demo to see what's possible:

```bash
# Clone and install
git clone https://github.com/nissan/redditech-landing-page-generator.git
cd redditech-landing-page-generator
pnpm install

# See it in action
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the demo landing page.

For more demo options, check out the [`demo/`](demo/) folder.

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- pnpm (install via `npm install -g pnpm`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/nissan/redditech-landing-page-generator.git
cd redditech-landing-page-generator

# 2. Install dependencies
pnpm install

# 3. Start the interactive configurator
pnpm configure

# 4. Launch preview
pnpm dev
```

That's it! Your landing page is now running at [http://localhost:3000](http://localhost:3000).

## 🎯 Features

### Interactive CLI Configurator

The heart of this project is the beautiful CLI that makes configuration effortless:

- **Visual Wizard**: Step-by-step prompts guide you through every option
- **AI Copywriting**: Get help writing headlines, descriptions, and CTAs with GPT-5, Claude Sonnet 4, or local Ollama
- **Hook-Story-Offer Generator**: AI-powered conversion framework for complete landing page narratives
- **Live Preview**: Launch a dev server directly from the CLI
- **Color Validation**: Hex color picker with real-time validation
- **Settings Management**: Store your LLM provider API keys securely
- **YAML Export**: All changes saved to `content/landing.yaml`

```bash
pnpm configure
```

### Landing Page Components

- **Hero Section**: Eye-catching headline with image and animations
- **Hook-Story-Offer Section**: Conversion-optimized storytelling framework (optional)
- **Features Grid**: Icon-based feature cards with descriptions
- **Testimonials**: Customer quotes with avatars (optional)
- **CTA Section**: Email capture form or direct link
- **Footer**: Copyright, links, and social media icons
- **Theme Toggle**: Light/dark mode with smooth transitions

### Hook-Story-Offer Framework

Generate complete landing page narratives using Russell Brunson's proven conversion framework:

- **Hook**: Catch attention through curiosity, empathy, and compelling promises
- **Story**: Share your transformation journey (low point → solution → current state)
- **Offer**: Present an irresistible offer with urgency, value, and guarantees

**Generate with AI:**
```bash
pnpm configure → "Generate Hook-Story-Offer (AI)"
```

The CLI will guide you through creating compelling copy based on your business story. Works with all three LLM providers (OpenAI, Claude, or Ollama).

See [Hook-Story-Offer Guide](Documentation/HOOK_STORY_OFFER.md) for detailed instructions.

### Built-in Animations

Choose from multiple animation presets:
- `scale`: Zoom effect on hover
- `fade`: Smooth fade-in transitions
- `slide`: Slide animations from any direction

### Email Integration Ready

Pre-wired API endpoint (`/app/api/subscribe/route.ts`) ready for:
- Mailchimp
- ConvertKit
- SendGrid
- Custom email services

## 📖 Configuration

### Option 1: Interactive CLI (Recommended)

```bash
pnpm configure
```

Follow the interactive prompts to configure:
- Metadata (title, description, favicon)
- Theme colors (primary, accent, background, text)
- Hero section (headline, subheadline, image)
- Features section (toggle on/off, add features)
- Testimonials (toggle on/off, add quotes)
- CTA section (form or link)
- Footer (copyright, links, social media)
- Analytics (Google Analytics, Plausible)

### Option 2: Edit YAML Directly

Edit `content/landing.yaml`:

```yaml
metadata:
  title: Your Landing Page
  description: Your description

theme:
  primaryColor: '#1677be'
  accentColor: '#0f5a8a'

hero:
  headline: Your Compelling Headline
  subheadline: Your supporting text

# ... see content/landing-example-full.yaml for all options
```

### AI Copywriting Setup (Optional)

The CLI supports **three LLM providers** for AI-powered features:

**1. Ollama (FREE, Local)**
- Install from [ollama.com](https://ollama.com)
- Run: `ollama pull granite4:latest`
- Configure in Settings (CLI auto-detects local models)
- 100% free, runs on your machine

**2. Claude Sonnet 4 (Cloud, Premium)**
- Get API key from [Anthropic Console](https://console.anthropic.com/)
- Latest Claude Sonnet 4 model
- Exceptional quality and reasoning

**3. OpenAI GPT-5 (Cloud, Premium)**
- Get API key from [OpenAI Platform](https://platform.openai.com/)
- Latest GPT-5 Turbo model
- State-of-the-art performance

**Setup:**
```bash
pnpm configure → Settings → Select LLM Provider
```

See [Multi-LLM Guide](Documentation/MULTI_LLM_GUIDE.md) for detailed setup.

## 🏗️ Project Structure

```
redditech-landing-page-generator/
├── app/                   # Next.js App Router
├── cli/                   # Interactive CLI tool
├── components/            # React components
├── content/               # YAML configuration
├── lib/                   # Utilities
├── public/                # Static assets
├── Documentation/         # Comprehensive guides
└── demo/                  # Demo configurations
```

For detailed architecture, see [PROJECT_STRUCTURE.md](Documentation/PROJECT_STRUCTURE.md).

## 🎨 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.0.1 with App Router |
| **UI Library** | React 19.2.0 |
| **Styling** | Tailwind CSS v4.1.16 |
| **Animations** | Framer Motion 12.23.24 |
| **Language** | TypeScript 5.9.3 |
| **CLI Tools** | Inquirer, Chalk, Figlet, Boxen |
| **AI Integration** | OpenAI GPT-5, Claude Sonnet 4, Ollama |
| **Theme** | next-themes 0.4.6 |
| **Icons** | Lucide React 0.552.0 |
| **Package Manager** | pnpm 10.18.3 |

## 📦 Deployment to Vercel

Vercel is the recommended platform for deploying your landing page (it's made by the Next.js team).

### Method 1: GitHub Integration (Easiest)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Configure landing page"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables** (if needed):
   - In Vercel dashboard → Settings → Environment Variables
   - Add your LLM provider credentials (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `OLLAMA_MODEL`)
   - Add email service credentials if using forms

4. **Deploy**:
   - Click "Deploy"
   - Your site will be live at `your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to link your project
# Your site will be deployed automatically
```

### Custom Domain

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. SSL certificates are automatically provisioned

### Environment Variables

Add these in Vercel dashboard (if applicable):

```bash
# Optional - for AI copywriting (choose one or more)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
OLLAMA_MODEL=granite4:latest
LLM_PROVIDER=openai  # or 'claude' or 'ollama'

# Optional - Email service
MAILCHIMP_API_KEY=...
# OR
CONVERTKIT_API_KEY=...
# OR
SENDGRID_API_KEY=...

# Optional - Analytics
NEXT_PUBLIC_GA_ID=G-...
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=...

# Production URL
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Deployment Checklist

- [ ] Replace `public/guidebook-cover.png` with your hero image
- [ ] Update all content in `content/landing.yaml`
- [ ] Test email form submission
- [ ] Add environment variables in Vercel
- [ ] Configure custom domain (optional)
- [ ] Enable Web Analytics in Vercel (free)
- [ ] Test dark mode toggle
- [ ] Run Lighthouse audit (should score 95+)

## 🔧 Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run interactive configurator
pnpm configure

# Type checking
pnpm type-check

# Linting
pnpm lint

# Build CLI TypeScript
pnpm cli:build
```

## 📚 Documentation

Comprehensive documentation is available in the [`Documentation/`](Documentation/) folder:

### Getting Started
- [**QUICKSTART.md**](Documentation/QUICKSTART.md) - 5-minute getting started guide
- [**CLI_COMPLETE.md**](Documentation/CLI_COMPLETE.md) - Complete CLI documentation with examples

### Features & Customization
- [**HOOK_STORY_OFFER.md**](Documentation/HOOK_STORY_OFFER.md) - AI-powered conversion copywriting guide
- [**CUSTOMIZATION_GUIDE.md**](Documentation/CUSTOMIZATION_GUIDE.md) - Advanced customization options
- [**TEMPLATE_OVERVIEW.md**](Documentation/TEMPLATE_OVERVIEW.md) - Features and use cases overview

### Technical
- [**PROJECT_STRUCTURE.md**](Documentation/PROJECT_STRUCTURE.md) - Architecture and file organization
- [**CONTRIBUTING.md**](CONTRIBUTING.md) - Contribution guidelines

### Publishing & Deployment
- [**GITHUB_PUBLISHING.md**](Documentation/GITHUB_PUBLISHING.md) - Complete guide to publishing your project

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](Documentation/CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests: `pnpm type-check && pnpm lint`
5. Commit with conventional commits (`feat:`, `fix:`, `docs:`)
6. Push to your fork
7. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- CLI styling with [Chalk](https://github.com/chalk/chalk) and [Figlet](https://github.com/patorjk/figlet.js)
- AI powered by [OpenAI](https://openai.com/)

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/nissan/redditech-landing-page-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/nissan/redditech-landing-page-generator/discussions)
- **Documentation**: [Full Docs](Documentation/)

## 🌟 Show Your Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code
- 📢 Sharing with others

---

**Made with ❤️ for developers who value speed and quality**
