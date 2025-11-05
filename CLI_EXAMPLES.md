# CLI Usage Examples

Real-world examples of using the Landing Page Configurator CLI.

## Starting the CLI

```bash
$ pnpm configure

> landing-page-template@1.0.0 configure
> tsx cli/index.ts
```

Output:
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


? What would you like to do? (Use arrow keys)
❯ 🎨 Configure landing page
  🤖 AI-powered copywriting
  👁️  Preview site (live reload)
  ⚙️  Settings (OpenAI API key)
  ❌ Exit
```

## Example 1: Full Configuration Wizard

### Starting Configuration

```
? What would you like to do? 🎨 Configure landing page

📝 Landing Page Configuration

── Site Metadata ──

? Page title (for SEO): TaskFlow - Project Management Made Simple
? Meta description: Streamline your team's workflow with TaskFlow's intuitive project management platform.

── Brand Colors ──

? Primary brand color (hex): #6366f1
? Accent color (hex): #4f46e5

── Hero Section ──

? Main headline: Ship Projects Faster with TaskFlow
? Subheadline: Join 50,000+ teams managing projects with confidence
? Hero image path (e.g., /hero.png): /taskflow-hero.png
? Animation style: (Use arrow keys)
❯ scale
  fade
  slide
```

### CTA Configuration

```
── Call-to-Action ──

? CTA heading: Start Your Free Trial
? CTA description: No credit card required. 14-day free trial.
? CTA type: (Use arrow keys)
❯ Email form
  Direct link

? Submit button text: Get Started Free
? Email input placeholder: Enter your work email
? Privacy notice: We'll never share your email. Cancel anytime.

── Optional Sections ──

? Enable features section? Yes
? Enable testimonials section? Yes

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

### Generated YAML

The CLI automatically creates this in `content/landing.yaml`:

```yaml
metadata:
  title: "TaskFlow - Project Management Made Simple"
  description: "Streamline your team's workflow with TaskFlow's intuitive project management platform."

theme:
  primaryColor: "#6366f1"
  accentColor: "#4f46e5"

hero:
  headline: "Ship Projects Faster with TaskFlow"
  subheadline: "Join 50,000+ teams managing projects with confidence"
  image:
    src: "/taskflow-hero.png"
  animation:
    type: "scale"

cta:
  heading: "Start Your Free Trial"
  description: "No credit card required. 14-day free trial."
  form:
    enabled: true
    button:
      text: "Get Started Free"
    fields:
      - placeholder: "Enter your work email"
    privacyText: "We'll never share your email. Cancel anytime."

features:
  enabled: true

testimonials:
  enabled: true
```

## Example 2: AI Copywriting Session

### Selecting AI Copywriting

```
? What would you like to do? 🤖 AI-powered copywriting

🤖 AI Copywriting Assistant

? What would you like to write/improve? (Use arrow keys)
❯ 📰 Hero headline
  📝 Hero subheadline
  🎯 CTA heading
  💬 CTA description
  🔙 Back to main menu
```

### Writing a Headline

```
? What would you like to write/improve? 📰 Hero headline

? Enter your current copy (or draft):
Build better software faster

? What tone should the copy have? (Use arrow keys)
  Professional
  Casual & Friendly
❯ Urgent & Compelling
  Technical & Precise
  Playful & Fun
  Inspirational

? Keywords to include (comma-separated):
teams, productivity, streamline

🤖 AI is crafting your copy... ✔ Generated suggestions!

── AI Suggestions ──

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ Option 1:                                    │
   │                                              │
   │ Streamline Your Team's Productivity and      │
   │ Build Software 10x Faster                    │
   │                                              │
   ╰──────────────────────────────────────────────╯

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ Option 2:                                    │
   │                                              │
   │ Teams Build Better Software, Faster -        │
   │ Streamline Your Development Today            │
   │                                              │
   ╰──────────────────────────────────────────────╯

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ Option 3:                                    │
   │                                              │
   │ Stop Wasting Time - Streamline Your Team     │
   │ and Ship Quality Software Faster             │
   │                                              │
   ╰──────────────────────────────────────────────╯

? Choose a version (or skip): (Use arrow keys)
❯ Option 1: Streamline Your Team's Productivity and Build Software 10x Faster
  Option 2: Teams Build Better Software, Faster - Streamline Your Development Today
  Option 3: Stop Wasting Time - Streamline Your Team and Ship Quality Software Faster
  Skip (don't save)
```

### Saving Choice

```
? Choose a version: Option 1: Streamline Your Team's Productivity...

✅ Copy saved to configuration!

? What would you like to do? (Back to main menu)
```

## Example 3: Settings Configuration

### Setting API Key

```
? What would you like to do? ⚙️ Settings (OpenAI API key)

⚙️  Settings

? What would you like to configure? (Use arrow keys)
❯ ○ OpenAI API key (not set)
  ← Back

? Enter your OpenAI API key: ********************************

⠋ Verifying API key...
✔ API key saved!

? What would you like to do? (Back to main menu)
```

### After API Key is Set

```
⚙️  Settings

? What would you like to configure?
❯ ✓ OpenAI API key (configured)
  ← Back
```

## Example 4: Live Preview

### Starting Preview

```
? What would you like to do? 👁️  Preview site (live reload)

   ╭──────────────────────────────────────────────╮
   │                                              │
   │      👁️  Live Preview Mode                   │
   │                                              │
   │      Starting development server...          │
   │      Changes to YAML will automatically      │
   │      reload the page                         │
   │                                              │
   ╰──────────────────────────────────────────────╯

🚀 Starting development server...

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ ✓ Server running!                            │
   │                                              │
   │   Local: http://localhost:3000               │
   │   (If port 3000 is busy, check terminal      │
   │   for actual port)                           │
   │                                              │
   │   💡 Edit content/landing.yaml to see live   │
   │   changes                                    │
   │   Press Ctrl+C to stop the server            │
   │                                              │
   ╰──────────────────────────────────────────────╯

> next dev

   ▲ Next.js 16.0.1
   - Local:        http://localhost:3000
   - Network:      http://192.168.1.8:3000

 ✓ Ready in 1.2s
```

## Example 5: Quick Edits with Direct Link CTA

### Configuring Direct Link

```
── Call-to-Action ──

? CTA heading: Download the Whitepaper
? CTA description: Learn the 10 strategies that top-performing teams use
? CTA type: (Use arrow keys)
  Email form
❯ Direct link

? Link URL: https://example.com/whitepaper.pdf
? Link text: Download Free PDF
? Open in new tab? Yes

── Optional Sections ──

? Enable features section? No
? Enable testimonials section? No

⠋ Saving configuration...
✔ Configuration saved successfully!
```

## Example 6: Error Handling

### Invalid Hex Color

```
? Primary brand color (hex): blue
✖ Please enter a valid hex color (e.g., #1677be)

? Primary brand color (hex): #1677be
✔
```

### Missing API Key

```
? What would you like to do? 🤖 AI-powered copywriting

   ╭──────────────────────────────────────────────╮
   │                                              │
   │ ⚠️  OpenAI API key not configured             │
   │                                              │
   │ Please set your API key in Settings first    │
   │                                              │
   ╰──────────────────────────────────────────────╯

? What would you like to do? (Back to main menu)
```

## Example 7: Multiple AI Rewrites

### Iterating on Copy

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

## Example 8: Complete Session

### From Start to Finish

```bash
$ pnpm configure

[Gradient ASCII Art Header]

? What would you like to do? ⚙️ Settings
? Configure: OpenAI API key
? Enter key: [enters key]
✔ API key saved!

? What would you like to do? 🎨 Configure landing page
[Goes through all prompts]
✔ Configuration saved!

? What would you like to do? 🤖 AI-powered copywriting
? Section: Hero headline
? Draft: Build apps faster
? Tone: Urgent & Compelling
? Keywords: fast, production, easy
[Selects AI suggestion]
✅ Copy saved!

? What would you like to do? 👁️ Preview
[Server starts]

[In another terminal: edits landing.yaml]
[Browser auto-refreshes]

[Back in CLI, presses Ctrl+C]
👋 Server stopped

? What would you like to do? ❌ Exit

✨ Thanks for using Landing Page Configurator!

$
```

## Tips from Examples

### 1. Start with Settings
Set up API key first if you plan to use AI features

### 2. Configure, Then Polish
Use wizard for basic setup, then AI for copy refinement

### 3. Preview Often
Check your changes in real-time

### 4. Iterate with AI
Don't accept first AI suggestion - try different tones

### 5. Use Validation
Let the CLI catch format errors (like invalid hex codes)

## Common Workflows

### Workflow A: New Project
1. Settings → Add API key
2. Configure → Complete wizard
3. AI Copywriting → Polish headlines
4. Preview → Verify
5. Deploy

### Workflow B: Quick Edit
1. Configure → Just change what you need
2. Skip through unchanged sections
3. Save
4. Preview

### Workflow C: Copy Experimentation
1. AI Copywriting → Generate 3 versions
2. Save favorite
3. Preview
4. Repeat for other sections
5. A/B test variations

---

These examples show the **actual CLI experience** - colorful, guided, and efficient! 🎨
