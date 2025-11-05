# Landing Page CLI Configuration Tool

A beautiful, interactive command-line interface for configuring your landing page with AI-powered copywriting assistance.

## Features

✨ **Interactive Configuration**
- Step-by-step prompts for all landing page settings
- Color-coded, user-friendly interface
- Input validation and defaults
- Instant YAML updates

🤖 **AI-Powered Copywriting**
- Rewrite headlines, subheadlines, and CTAs
- Multiple tone options (Professional, Casual, Urgent, etc.)
- Keyword integration
- 3 AI-generated variations per request
- Uses OpenAI GPT-4o-mini

👁️ **Live Preview**
- Start development server from CLI
- Hot reload on YAML changes
- Visual feedback for all actions

⚙️ **Settings Management**
- LLM provider configuration (OpenAI, Claude, or Ollama)
- Secure API key storage for cloud providers
- Environment variable management

## Installation

Already installed! The CLI dependencies are included in the project.

## Quick Start

Run the configurator:

```bash
pnpm configure
```

This launches the interactive CLI where you can:
1. Configure your landing page
2. Use AI to write compelling copy
3. Preview changes live
4. Manage settings

## Main Menu

When you run `pnpm configure`, you'll see:

```
✨ Configure your landing page with ease!
   AI-powered copywriting • Live preview • YAML export

What would you like to do?
  🎨 Configure landing page
  🤖 AI-powered copywriting
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

### Example Usage

**Input:**
- Section: Hero headline
- Current copy: "Build apps with AI"
- Tone: Urgent & Compelling
- Keywords: fast, production, easy

**AI Output:**
```
Option 1: "Launch Production-Ready AI Apps in Days, Not Months"
Option 2: "Build Fast, Deploy Faster - Your AI App Toolkit"
Option 3: "Easy AI Integration for Production Apps"
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

**Cost:** GPT-4o-mini is very affordable (~$0.15 per 1M tokens)

**Security:** API key is stored in `.env.local` (gitignored, never committed)

## Command Reference

### Main Commands

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
landing-page-template/
├── cli/
│   ├── index.ts           # Main CLI interface
│   ├── config-manager.ts  # YAML read/write
│   ├── ai-assistant.ts    # OpenAI integration
│   ├── preview.ts         # Dev server launcher
│   ├── tsconfig.json      # CLI TypeScript config
│   └── package.json       # CLI package info
├── content/
│   └── landing.yaml       # Your configuration
└── .env.local             # API keys (created by CLI)
```

## Configuration Output

All settings are saved to `content/landing.yaml`:

```yaml
metadata:
  title: "Your Page Title"
  description: "Your description"

theme:
  primaryColor: "#1677be"
  accentColor: "#0f5a8a"

hero:
  headline: "Your Headline"
  subheadline: "Your Subheadline"
  image:
    src: "/your-image.png"
  animation:
    enabled: true
    type: "scale"

cta:
  heading: "Your CTA"
  description: "CTA description"
  form:
    enabled: true
    # ... form config

features:
  enabled: false

testimonials:
  enabled: false
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
- Check API key is set in Settings
- Verify API key is valid on [platform.openai.com](https://platform.openai.com)
- Check internet connection
- Ensure you have API credits

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

## Tips & Tricks

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

### Keyboard Shortcuts

- **Arrow keys** - Navigate menu options
- **Enter** - Select option
- **Ctrl+C** - Exit CLI or stop server
- **Tab** - Auto-complete (where available)

## Advanced Usage

### Batch Configuration

Edit `content/landing.yaml` directly for bulk changes:

```bash
# Open in your editor
code content/landing.yaml

# Then use CLI to refine specific sections with AI
pnpm configure
```

### Custom Prompts

Modify `cli/ai-assistant.ts` to customize AI prompts:

```typescript
const prompt = `Your custom prompt template...`;
```

### Multiple Configurations

Manage multiple landing pages:

```bash
# Copy template
cp content/landing.yaml content/product-a.yaml

# Edit config-manager.ts to load different file
# Or create multiple CLI instances
```

## Security Notes

- ✅ API keys stored in `.env.local` (gitignored)
- ✅ Never committed to version control
- ✅ Masked input when entering keys
- ⚠️ Don't share `.env.local` file
- ⚠️ Don't commit API keys to git

## Cost Estimation

OpenAI API usage (GPT-4o-mini):

- **Per rewrite**: ~200-500 tokens (~$0.0001-0.0002)
- **100 rewrites**: ~$0.01-0.02
- **Very affordable** for landing page copywriting

## Comparison: CLI vs Manual

| Task | Manual (YAML) | CLI |
|------|--------------|-----|
| Update headline | Find YAML, edit, save | 3 clicks in menu |
| Change colors | Remember format, type hex | Guided prompts |
| Write compelling copy | Research, draft, revise | AI generates 3 options |
| Preview changes | Switch to terminal, run dev | One menu option |
| Multiple sections | Edit YAML 10+ times | Step-by-step wizard |

## Future Enhancements

Planned features:
- [ ] Bulk AI generation (all sections at once)
- [ ] Template library (pre-made configs)
- [ ] Image suggestions (AI-powered)
- [ ] A/B testing variants
- [ ] Analytics integration setup
- [ ] Multi-language support
- [ ] Export to different formats

## Support

Need help?
- Check this guide
- Review [README.md](README.md)
- Check [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- Open an issue on GitHub

---

**Happy configuring! 🚀**

The CLI makes landing page customization fast, fun, and AI-powered.
