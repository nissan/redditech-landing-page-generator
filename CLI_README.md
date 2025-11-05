# 🎨 Interactive CLI Configurator

## Quick Start

Launch the beautiful, interactive configurator:

```bash
pnpm configure
```

## What You Get

### ✨ Visual Interface
- Colorful, gradient ASCII art header
- Clean, boxed menus
- Progress spinners
- Success/error indicators
- Emoji-enhanced options

### 🎯 Main Features

**1. Configure Landing Page**
```
Step-by-step wizard for:
├── Site metadata (title, description)
├── Brand colors (primary, accent)
├── Hero section (headline, subheadline, image)
├── Call-to-action (form or link)
└── Optional sections (features, testimonials)
```

**2. AI-Powered Copywriting** 🤖
```
Write compelling copy with AI:
├── Choose section (headline, CTA, etc.)
├── Enter draft copy
├── Select tone (Professional, Casual, Urgent...)
├── Add keywords
├── Get 3 AI-generated variations
└── Save your favorite
```

**3. Live Preview** 👁️
```
One-click preview:
├── Launches dev server
├── Hot reload on YAML changes
└── Visual feedback
```

**4. Settings** ⚙️
```
Manage configuration:
└── OpenAI API key (secure storage)
```

## Visual Preview

When you run `pnpm configure`:

```
 _                    _ _               ____
| |    __ _ _ __   __| (_)_ __   __ _  |  _ \ __ _  __ _  ___
| |   / _` | '_ \ / _` | | '_ \ / _` | | |_) / _` |/ _` |/ _ \
| |__| (_| | | | | (_| | | | | | (_| | |  __/ (_| | (_| |  __/
|_____\__,_|_| |_|\__,_|_|_| |_|\__, | |_|   \__,_|\__, |\___|
 / ___|___  _ __  / _(_) __ _ _ |___/ __ __ _| |_ _|___/ __
| |   / _ \| '_ \| |_| |/ _` | | | | '__/ _` | __/ _ \| '__|
| |__| (_) | | | |  _| | (_| | |_| | | | (_| | || (_) | |
 \____\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__\___/|_|
                        |___/

   ╭─────────────────────────────────────────────────────────╮
   │                                                         │
   │   ✨ Configure your landing page with ease!             │
   │   AI-powered copywriting • Live preview • YAML export   │
   │                                                         │
   ╰─────────────────────────────────────────────────────────╯

? What would you like to do?
❯ 🎨 Configure landing page
  🤖 AI-powered copywriting
  👁️  Preview site (live reload)
  ⚙️  Settings (OpenAI API key)
  ❌ Exit
```

## AI Copywriting Demo

### Example Session

```
🤖 AI Copywriting Assistant

? What would you like to write/improve?
❯ 📰 Hero headline

? Enter your current copy: Build AI apps fast

? What tone should the copy have?
❯ Urgent & Compelling

? Keywords to include: production, hours, easy

🤖 AI is crafting your copy... ✔

── AI Suggestions ──

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ Option 1:                                    │
   │                                              │
   │ Launch Production AI Apps in Hours, Not     │
   │ Months                                       │
   │                                              │
   ╰──────────────────────────────────────────────╯

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ Option 2:                                    │
   │                                              │
   │ Build Production-Ready AI Applications With  │
   │ Ease                                         │
   │                                              │
   ╰──────────────────────────────────────────────╯

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ Option 3:                                    │
   │                                              │
   │ Easy AI Development - Production Ready in    │
   │ Hours                                        │
   │                                              │
   ╰──────────────────────────────────────────────╯

? Choose a version:
  Option 1: Launch Production AI Apps in Hours...
❯ Option 2: Build Production-Ready AI Applications...
  Option 3: Easy AI Development - Production Ready...
  Skip (don't save)

✅ Copy saved to configuration!
```

## Configuration Flow

### Site Metadata
```
── Site Metadata ──

? Page title (for SEO): Master AI Engineering
? Meta description: Learn to build production-ready AI apps
```

### Brand Colors
```
── Brand Colors ──

? Primary brand color (hex): #1677be
? Accent color (hex): #0f5a8a
```

### Hero Section
```
── Hero Section ──

? Main headline: Master Full-Stack AI Engineering
? Subheadline: Join 150,000+ professionals
? Hero image path: /guidebook-cover.png
? Animation style: scale
```

### Call-to-Action
```
── Call-to-Action ──

? CTA heading: Get Your Free Guidebook
? CTA description: Start your journey today
? CTA type: Email form

? Submit button text: Get Free Access
? Email input placeholder: Enter your email
? Privacy notice: We respect your privacy
```

### Optional Sections
```
── Optional Sections ──

? Enable features section? Yes
? Enable testimonials section? No

⠋ Saving configuration...
✔ Configuration saved successfully!

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ ✅ Your landing page has been configured!    │
   │                                              │
   │ Run pnpm dev to see your changes             │
   │                                              │
   ╰──────────────────────────────────────────────╯
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
- **OpenAI** - AI copywriting

## File Output

All changes saved to `content/landing.yaml`:

```yaml
metadata:
  title: "Master AI Engineering"
  description: "Learn to build production-ready AI apps"

theme:
  primaryColor: "#1677be"
  accentColor: "#0f5a8a"

hero:
  headline: "Master Full-Stack AI Engineering"
  subheadline: "Join 150,000+ professionals"
  image:
    src: "/guidebook-cover.png"
  animation:
    type: "scale"

# ... rest of configuration
```

## Commands Reference

```bash
# Interactive CLI
pnpm configure

# Build CLI (if modifying)
pnpm cli:build

# Run site
pnpm dev
```

## AI Setup (Optional)

For AI copywriting features:

1. Get OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Run `pnpm configure`
3. Select "Settings"
4. Enter API key
5. Start using AI copywriting!

**Cost:** ~$0.0001-0.0002 per rewrite (very affordable)

## Benefits Over Manual YAML Editing

| Feature | Manual | CLI |
|---------|--------|-----|
| **Learning curve** | Learn YAML syntax | Guided prompts |
| **Validation** | Manual checking | Built-in validation |
| **Speed** | Type everything | Select from menus |
| **AI assistance** | None | 3 options per section |
| **Preview** | Switch windows | One menu option |
| **UX** | Plain text | Colorful, interactive |

## Screenshots (Text-Based)

### Welcome Screen
- Gradient ASCII art banner
- Boxed feature list
- Clean menu layout

### Configuration Wizard
- Section headers with color coding
- Input validation
- Default suggestions
- Progress indicators

### AI Copywriting
- Tone selection menu
- Keyword input
- Spinner while generating
- Boxed AI suggestions
- Easy selection

### Success Messages
- Green checkmarks
- Boxed confirmations
- Next step suggestions

## Tips for Best Experience

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

4. **Dark or light theme**
   - Works with both
   - Gradient colors adapt

## Customization

Modify the CLI in `cli/`:

- `index.ts` - Main interface and flows
- `config-manager.ts` - YAML operations
- `ai-assistant.ts` - OpenAI integration
- `preview.ts` - Dev server launcher

## Error Handling

Graceful error messages for:
- Invalid hex colors → "Please enter valid hex color"
- Missing API key → "OpenAI API key not configured"
- YAML errors → Specific parsing errors
- Network issues → "Failed to generate suggestions"

## Future Enhancements

Planned features:
- [ ] Batch AI generation (all sections)
- [ ] Template library (presets)
- [ ] Image suggestions
- [ ] Multi-language prompts
- [ ] Export to different formats
- [ ] Undo/redo functionality

## Demo Video (Coming Soon)

We'll create a screen recording showing:
1. CLI launch
2. Full configuration flow
3. AI copywriting session
4. Live preview
5. Final result

---

**The fastest, most beautiful way to configure your landing page! 🚀**
