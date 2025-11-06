# Migration Guide: Multi-Project Architecture

## Overview

Version 2.0.0 introduces a **multi-project architecture** that allows you to manage multiple landing page projects within a single workspace. This is a breaking change from the previous single-project structure.

## What Changed

### Before (v1.x)
```
landing-page-template/
├── app/                    # Single Next.js app
├── components/             # Components
├── lib/                    # Utilities
├── cli/                    # CLI tools
├── content/                # Config
│   └── landing.yaml
└── public/                 # Assets
```

### After (v2.0)
```
landing-page-template/
├── packages/
│   ├── ui/                 # @lpg/ui - Shared components
│   └── cli/                # @lpg/cli - CLI with project management
├── projects/
│   └── demo/               # Your landing page project
│       ├── app/
│       ├── content/
│       │   └── landing.yaml
│       └── public/
└── scripts/
    └── dev.js              # Smart dev launcher
```

## Migration Steps

### For Existing Users

If you were using v1.x, your files are now in `projects/demo/`:

1. **Check Your Config**
   ```bash
   # Your landing.yaml is now at:
   projects/demo/content/landing.yaml
   ```

2. **Run the CLI**
   ```bash
   pnpm lpg
   # Will auto-select "demo" project if it's the only one
   ```

3. **Start Dev Server**
   ```bash
   # Interactive selection (if multiple projects)
   pnpm dev

   # Direct launch
   pnpm dev demo
   ```

### Creating New Projects

Create additional landing pages:

```bash
pnpm lpg
# Choose "Create new project" OR select existing project from list
```

Or use the CLI menu:
1. Run `pnpm lpg`
2. Select "List Projects" to see all projects
3. Select "Switch Project" to change active project

## New Workflow

### 1. Project Selection

When you run `pnpm lpg`, you'll first select which project to work on:

- **1 project**: Auto-selected automatically
- **Multiple projects**: Interactive menu to choose
- **No projects**: Prompted to create one

### 2. Configure Your Project

All wizards now work within the selected project:

- 🎨 Configure landing page
- 🤖 AI-powered copywriting
- 📖 Generate Hook-Story-Offer (AI)
- 🚀 Build Conversion-Optimized Landing Page

### 3. Dev & Build

```bash
# Dev server - interactive or direct
pnpm dev              # Select from list
pnpm dev my-project   # Launch specific project

# Build (inside project directory)
cd projects/my-project
pnpm build
```

## Key Changes

### CLI Commands

| Command | Description |
|---------|-------------|
| `pnpm lpg` | Launch CLI with project selection |
| `pnpm dev` | Interactive project dev server |
| `pnpm dev [name]` | Launch specific project |

### File Locations

| File Type | Old Location | New Location |
|-----------|--------------|--------------|
| YAML Config | `content/landing.yaml` | `projects/[name]/content/landing.yaml` |
| Components | `components/` | `packages/ui/src/components/` |
| Next.js App | `app/` | `projects/[name]/app/` |
| Assets | `public/` | `projects/[name]/public/` |

### Import Statements

Projects now import from `@lpg/ui`:

```typescript
// Old (v1.x)
import { HeroSection } from '@/components/hero-section';
import { loadConfig } from '@/lib/config';

// New (v2.0)
import { HeroSection, loadConfig } from '@lpg/ui';
```

## Component Library

All components are now in `@lpg/ui` package:

**Components:**
- `HeroSection`
- `CTASection`
- `FeaturesSection`
- `TestimonialsSection`
- `HowItWorksSection`
- `TrustBadgesSection`
- `FAQSection`
- `GuaranteeSection`
- `HookStoryOfferSection`
- `Footer`
- `ThemeToggle`
- `ThemeProvider`

**Utilities:**
- `loadConfig(path?)` - Load YAML configuration
- `cn(...)` - Class name utility
- `LandingPageConfig` - TypeScript type

## Project Structure

Each project is a standalone Next.js app:

```
projects/my-project/
├── app/
│   ├── layout.tsx          # Uses ThemeProvider from @lpg/ui
│   ├── page.tsx            # Imports all components from @lpg/ui
│   └── globals.css
├── content/
│   └── landing.yaml        # Project-specific config
├── public/
│   └── *.png               # Project-specific assets
├── package.json            # Depends on @lpg/ui
├── tsconfig.json
├── next.config.js
└── postcss.config.mjs
```

## Troubleshooting

### "No projects found"
```bash
# Create your first project
pnpm lpg
# Select "Create new project"
```

### "Module not found: @lpg/ui"
```bash
# Install workspace dependencies
pnpm install
```

### Dev server won't start
```bash
# Ensure you're in the root directory
pwd  # Should be: .../landing-page-template

# Try direct launch
pnpm dev demo
```

### TypeScript errors
```bash
# Run from root to rebuild workspace
pnpm install
pnpm --filter @lpg/ui type-check
pnpm --filter @lpg/cli build
```

## Benefits of Multi-Project Architecture

1. **Multiple Landing Pages**: Create unlimited projects, each with unique configs
2. **Shared Components**: All projects use the same battle-tested UI library
3. **Isolated Configs**: Each project has its own `landing.yaml`
4. **Independent Deploys**: Deploy each project separately to different domains
5. **A/B Testing**: Create variants as separate projects
6. **Client Management**: One project per client, all in one repo

## Need Help?

- Check the [README.md](README.md) for updated documentation
- Review [Documentation/CLI_COMPLETE.md](Documentation/CLI_COMPLETE.md) for CLI commands
- Open an issue at [GitHub Issues](https://github.com/nissan/redditech-landing-page-generator/issues)
