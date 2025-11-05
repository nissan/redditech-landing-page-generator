# Interactive CLI Configurator - Complete Guide

A beautiful, interactive command-line interface for configuring your landing page with AI-powered copywriting assistance.

## Quick Start

Launch the interactive configurator:

```bash
pnpm configure
```

This opens a colorful, gradient-styled menu where you can configure your landing page, use AI to write compelling copy, preview changes live, and manage settings.

## Table of Contents

- [Features](#features)
- [Main Menu](#main-menu)
- [1. Configure Landing Page](#1-configure-landing-page)
- [2. AI-Powered Copywriting](#2-ai-powered-copywriting)
- [3. Live Preview](#3-live-preview)
- [4. Settings](#4-settings)
- [5. Hook-Story-Offer Framework](#5-hook-story-offer-framework)
- [Examples](#real-world-examples)
- [Troubleshooting](#troubleshooting)
- [Tips & Best Practices](#tips--best-practices)

## Features

✨ **Interactive Configuration**
- Step-by-step prompts for all landing page settings
- Color-coded, user-friendly interface
- Input validation and smart defaults
- Instant YAML updates

🤖 **AI-Powered Copywriting**
- Rewrite headlines, subheadlines, and CTAs
- Multiple tone options (Professional, Casual, Urgent, etc.)
- Keyword integration
- 3 AI-generated variations per request
- Works with OpenAI, Claude, or Ollama (free local option)

👁️ **Live Preview**
- Start development server from CLI
- Hot reload on YAML changes
- Visual feedback for all actions

⚙️ **Settings Management**
- LLM provider configuration (OpenAI, Claude, or Ollama)
- Secure API key storage for cloud providers
- Environment variable management

## Main Menu

When you run `pnpm configure`, you'll see this colorful interface:

```
 ____          _     _ _ _            _       _     ____   ____
|  _ \ ___  __| | __| (_) |_ ___  ___| |__   | |   |  _ \ / ___|
| |_) / _ \/ _` |/ _` | | __/ _ \/ __| '_ \  | |   | |_) | |  _
|  _ <  __/ (_| | (_| | | ||  __/ (__| | | | | |___|  __/| |_| |
|_| \_\___|\__,_|\__,_|_|\__\___\___|_| |_| |_____|_|    \____|


   ╭─────────────────────────────────────────────────────────╮
   │                                                         │
   │   ✨ Configure your landing page with ease!             │
   │   AI-powered copywriting • Live preview • YAML export   │
   │                                                         │
   ╰─────────────────────────────────────────────────────────╯


? What would you like to do?
❯ 🎨 Configure landing page
  🤖 AI-powered copywriting
  🎯 Generate Hook-Story-Offer (AI)
  👁️  Preview site (live reload)
  ⚙️  Settings
  ❌ Exit
```

## 1. Configure Landing Page

Step-by-step configuration wizard that updates `content/landing.yaml`:

### Site Metadata
- **Page title** - For SEO and browser tabs
- **Meta description** - For search engines and social media

### Brand Colors
- **Primary color** - Main brand color (buttons, links, accents)
- **Accent color** - Darker shade for hover states
- Validates hex format (#1677be)

### Hero Section
- **Headline** - Main attention-grabbing text
- **Subheadline** - Supporting value proposition
- **Image path** - Path to hero image in `/public`
- **Animation style** - Choose from scale, fade, or slide

### Call-to-Action
- **Heading** - CTA section title
- **Description** - Supporting text
- **Type** - Email form or direct link

**If Form:**
- Button text
- Email placeholder
- Privacy notice

**If Link:**
- URL destination
- Link text
- Open in new tab option

### Optional Sections
- Toggle features section on/off
- Toggle testimonials section on/off

All changes are saved to `content/landing.yaml` automatically!

## 2. AI-Powered Copywriting

Requires an LLM provider configured (OpenAI, Claude, or Ollama) - configure in Settings first.

### How It Works

1. **Select section** to write:
   - Hero headline
   - Hero subheadline
   - CTA heading
   - CTA description

2. **Enter your draft** or current copy

3. **Choose tone**:
   - Professional
   - Casual & Friendly
   - Urgent & Compelling
   - Technical & Precise
   - Playful & Fun
   - Inspirational

4. **Add keywords** (comma-separated)

5. **AI generates 3 variations** in seconds

6. **Choose and save** your favorite

### Example AI Session

**Input:**
- Section: Hero headline
- Current copy: "Build apps with AI"
- Tone: Urgent & Compelling
- Keywords: fast, production, easy

**AI Output:**
```
   ╭──────────────────────────────────────────────╮
   │                                              │
   │ Option 1:                                    │
   │                                              │
   │ Launch Production-Ready AI Apps in Days,     │
   │ Not Months                                   │
   │                                              │
   ╰──────────────────────────────────────────────╯

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ Option 2:                                    │
   │                                              │
   │ Build Fast, Deploy Faster - Your AI App     │
   │ Toolkit                                      │
   │                                              │
   ╰──────────────────────────────────────────────╯

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ Option 3:                                    │
   │                                              │
   │ Easy AI Integration for Production Apps     │
   │                                              │
   ╰──────────────────────────────────────────────╯
```

Select one, and it's automatically saved to your YAML config!

### Best Practices

- **Start with a draft** - Give AI something to work with
- **Be specific with keywords** - Include your unique value props
- **Try different tones** - Find what resonates with your audience
- **Iterate** - Run it multiple times with different inputs
- **Edit after** - AI suggestions are starting points, refine as needed

## 3. Live Preview

Launches the Next.js development server with hot reload:

```bash
👁️  Live Preview Mode

Starting development server...

✓ Server running!

  Local: http://localhost:3000

  💡 Edit content/landing.yaml to see live changes
  Press Ctrl+C to stop the server
```

Any changes to `content/landing.yaml` will automatically reload the page!

## 4. Settings

### LLM Provider Configuration

The CLI supports three LLM providers for AI-powered features:

**1. OpenAI (GPT-5 Turbo)**
1. Go to Settings → "Select LLM Provider" → "OpenAI"
2. Select "OpenAI API Key"
3. Enter your API key (get from [platform.openai.com](https://platform.openai.com))
4. Key is saved to `.env.local` as `OPENAI_API_KEY`

**2. Claude (Sonnet 4)**
1. Go to Settings → "Select LLM Provider" → "Claude"
2. Select "Claude API Key"
3. Enter your API key (get from [console.anthropic.com](https://console.anthropic.com))
4. Key is saved to `.env.local` as `ANTHROPIC_API_KEY`

**3. Ollama (Local, Free)**
1. Install Ollama from [ollama.com](https://ollama.com)
2. Pull a model: `ollama pull granite4:latest`
3. Go to Settings → "Select LLM Provider" → "Ollama Configuration"
4. Select from available local models or enter custom model name
5. Model preference is saved to `.env.local` as `OLLAMA_MODEL`

**Security:** API keys are stored in `.env.local` (gitignored, never committed)

## 5. Hook-Story-Offer Framework

Generate complete landing page narratives using Russell Brunson's proven conversion framework.

### How to Use

1. Select "Generate Hook-Story-Offer (AI)" from main menu
2. Provide context about your business/product
3. Answer backstory prompts:
   - Where you were (low point)
   - What you discovered (solution)
   - Where you are now (current state)
4. Describe your offer
5. Choose tone
6. AI generates complete HSO framework
7. Preview and save to configuration

See [HOOK_STORY_OFFER.md](HOOK_STORY_OFFER.md) for detailed guide.

## Real-World Examples

### Example 1: Full Configuration

```
? What would you like to do? 🎨 Configure landing page

📝 Landing Page Configuration

── Site Metadata ──

? Page title (for SEO): TaskFlow - Project Management Made Simple
? Meta description: Streamline your team's workflow with TaskFlow.

── Brand Colors ──

? Primary brand color (hex): #6366f1
? Accent color (hex): #4f46e5

── Hero Section ──

? Main headline: Ship Projects Faster with TaskFlow
? Subheadline: Join 50,000+ teams managing projects with confidence
? Hero image path: /taskflow-hero.png
? Animation style: scale

── Call-to-Action ──

? CTA heading: Start Your Free Trial
? CTA description: No credit card required. 14-day free trial.
? CTA type: Email form
? Submit button text: Get Started Free
? Email input placeholder: Enter your work email
? Privacy notice: We'll never share your email. Cancel anytime.

── Optional Sections ──

? Enable features section? Yes
? Enable testimonials section? Yes

⠋ Saving configuration...
✔ Configuration saved successfully!
```

### Example 2: AI Copywriting Iteration

**First Attempt:**
```
? Enter your current copy: Manage projects efficiently
? Tone: Professional
? Keywords: teams, collaboration

AI Option 1: "Efficient Project Management for Professional Teams"
AI Option 2: "Streamline Team Collaboration and Project Efficiency"
AI Option 3: "Professional Project Management Built for Teams"

? Choose: Skip (try again with different tone)
```

**Second Attempt:**
```
? Enter your current copy: Manage projects efficiently
? Tone: Urgent & Compelling
? Keywords: teams, collaboration, now

AI Option 1: "Start Managing Projects Efficiently Today"
AI Option 2: "Transform Team Collaboration Right Now"
AI Option 3: "Efficient Project Management Your Team Needs Now"

? Choose: Option 2
✅ Copy saved!
```

### Example 3: Ollama Model Selection

```
? What would you like to do? ⚙️ Settings
? What would you like to configure? Select LLM Provider
? Select provider: Ollama

⠋ Checking for available Ollama models...
✔ Found 3 Ollama model(s)

Available models:
  • granite4:latest
  • llama3.2
  • mistral

? Select or enter Ollama model:
❯ granite4:latest
  llama3.2
  mistral
  Enter custom model name
```

## Troubleshooting

### CLI won't start
```bash
# Reinstall dependencies
pnpm install

# Check Node.js version (needs 18+)
node --version
```

### AI copywriting fails
- Check LLM provider is configured in Settings
- Verify API key is valid (for OpenAI/Claude)
- Check internet connection (for cloud providers)
- Ensure you have API credits (for OpenAI/Claude)
- Check Ollama is running: `ollama list` (for Ollama)

### YAML parsing errors
- Check YAML syntax is valid
- Look for special characters that need escaping
- Verify indentation (use spaces, not tabs)

### Preview won't start
- Check port 3000 isn't already in use
- Try killing existing Node processes
- Check for TypeScript compilation errors

### Colors not updating
- Ensure hex format: `#1677be` (6 characters)
- Include the `#` symbol
- Use uppercase or lowercase A-F

## Tips & Best Practices

### Workflow Recommendations

1. **Start with configuration** - Set up basic content
2. **Use AI for polish** - Let AI improve your headlines
3. **Preview frequently** - See changes in real-time
4. **Iterate quickly** - CLI makes changes instant

### AI Copywriting Tips

- **Headline formula**: Value + Outcome + Timeframe
  - "Build AI Apps in Days"
  - "10x Your Productivity Today"

- **CTA formulas**: Action + Benefit
  - "Get Free Access"
  - "Start Building Now"

- **Keywords to try**:
  - Urgency: fast, now, today, instantly
  - Value: free, proven, guaranteed
  - Exclusivity: limited, exclusive, invite-only
  - Social proof: trusted by X, join X users

### Terminal Recommendations

1. **Use a modern terminal**
   - iTerm2 (macOS)
   - Windows Terminal
   - Hyper
   - Alacritty

2. **Enable colors**
   - Most terminals support by default
   - Check `$TERM` supports 256 colors

3. **Full-width window**
   - ASCII art looks best in wide terminals
   - Minimum 80 characters wide

## Command Reference

```bash
# Launch interactive CLI
pnpm configure

# Run development server (alternative to CLI preview)
pnpm dev

# Build for production
pnpm build

# Build CLI (if modifying CLI code)
pnpm cli:build
```

## File Structure

```
redditech-landing-page-generator/
├── cli/
│   ├── index.ts             # Main CLI interface
│   ├── config-manager.ts    # YAML read/write
│   ├── ai-assistant.ts      # Multi-LLM integration
│   ├── prompt-templates.ts  # Centralized prompts
│   ├── preview.ts           # Dev server launcher
│   ├── tsconfig.json        # CLI TypeScript config
│   └── package.json         # CLI package info
├── content/
│   └── landing.yaml         # Your configuration
└── .env.local               # API keys (created by CLI)
```

## Technology Stack

Built with beautiful CLI libraries:

- **chalk** - Terminal string styling
- **inquirer** - Interactive prompts
- **figlet** - ASCII art text
- **gradient-string** - Gradient colors
- **ora** - Elegant spinners
- **nanospinner** - Minimal spinners
- **boxen** - Boxed messages
- **OpenAI, Claude, Ollama** - AI providers

## Security Notes

- ✅ API keys stored in `.env.local` (gitignored)
- ✅ Never committed to version control
- ✅ Masked input when entering keys
- ⚠️ Don't share `.env.local` file
- ⚠️ Don't commit API keys to git

## Cost Estimation

**Ollama (Local):**
- FREE - Runs on your machine
- No API costs
- 100% private

**Cloud Providers (OpenAI/Claude):**
- Per rewrite: ~200-500 tokens (~$0.0001-0.0002)
- 100 rewrites: ~$0.01-0.02
- Very affordable for landing page copywriting

## Future Enhancements

Planned features:
- [ ] Batch AI generation (all sections at once)
- [ ] Template library (pre-made configs)
- [ ] Image suggestions (AI-powered)
- [ ] A/B testing variants
- [ ] Analytics integration setup
- [ ] Multi-language support
- [ ] Export to different formats

---

**The fastest, most beautiful way to configure your landing page! 🚀**
