# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Redditech Landing Page Generator (LPG) is a Next.js-based landing page generator with an AI-powered CLI configurator. The project uses YAML for content management, allowing users to configure landing pages without touching code.

## Essential Commands

### Development
```bash
pnpm dev              # Start Next.js dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm type-check       # TypeScript type checking
pnpm lint             # ESLint checks
```

### CLI Tools
```bash
pnpm configure        # Interactive CLI configurator
pnpm cli:build        # Build CLI TypeScript (outputs to cli/dist/)
```

### Testing the Complete Workflow
When making changes, test the full flow:
```bash
pnpm configure        # Test CLI configuration changes
pnpm dev              # Preview the landing page
pnpm build            # Verify production build works
```

## Architecture

### YAML-Driven Configuration
- **Single source of truth**: `content/landing.yaml`
- Configuration loaded at build time via `lib/config.ts:loadConfig()`
- TypeScript interface `LandingPageConfig` in `lib/config.ts` defines schema
- Changes to YAML require rebuild (no hot reload for content)

### Dual TypeScript Compilation
The project has **two separate TypeScript configurations**:

1. **Next.js app** (`tsconfig.json`):
   - Module: `esnext` with bundler resolution
   - Target: ES2017
   - Uses Next.js App Router
   - Path alias: `@/*` maps to `./*`

2. **CLI** (`cli/tsconfig.json`):
   - Module: `ESNext` with node resolution
   - Target: ES2020
   - Compiled to `cli/dist/`
   - Uses `.js` extensions in imports (ESM)

### Component Architecture

**Page Assembly** (`app/page.tsx`):
- Loads config once at module level
- Conditionally renders sections based on `enabled` flags
- Generates SEO metadata from config

**Section Components**:
- Each receives config slice + theme colors
- Self-contained with own animations
- Optional sections: `features`, `testimonials`
- Required sections: `hero`, `cta`, `footer`

**Theme System**:
- CSS custom properties in `app/globals.css`
- `next-themes` for dark/light mode
- Theme colors injected via inline styles from YAML
- Tailwind CSS v4 with PostCSS architecture

### CLI Structure
- **Entry**: `cli/index.ts` (main menu loop)
- **Config Manager**: `cli/config-manager.ts` (YAML read/write)
- **AI Assistant**: `cli/ai-assistant.ts` (OpenAI integration)
- **Preview**: `cli/preview.ts` (dev server launcher)

Key CLI patterns:
- Uses `inquirer` for prompts
- Stores OpenAI API key in `.cli-settings.json`
- Modifies `content/landing.yaml` directly
- Can launch `next dev` from within CLI

## Development Patterns

### Adding New Config Fields
1. Update `LandingPageConfig` interface in `lib/config.ts`
2. Add field to `content/landing.yaml`
3. Update component prop types
4. Add CLI prompts in `cli/index.ts` if needed
5. Run `pnpm type-check` to verify

### Modifying Section Components
- Components are in `components/`
- Use `config` and `theme` props
- Apply theme colors via inline styles: `style={{ color: theme.primaryColor }}`
- Use Tailwind for layout/spacing
- Use `cn()` from `lib/utils.ts` for conditional classes

### CLI Development
- Edit `.ts` files in `cli/`
- Test immediately with `pnpm configure` (uses `tsx` runtime)
- No build step needed for testing
- For production: `pnpm cli:build` compiles to `cli/dist/`

### API Routes
- Email form submits to `/app/api/subscribe/route.ts`
- Currently placeholder - implement email service integration
- Validate email before processing
- Return JSON responses with proper status codes

## Code Conventions

### Import Paths
- Use `@/` alias for app imports: `import { loadConfig } from "@/lib/config"`
- CLI uses relative paths: `import { ConfigManager } from './config-manager.js'`
- **Critical**: CLI imports must include `.js` extension (ESM requirement)

### TypeScript
- Strict mode enabled
- All components/functions fully typed
- Optional chaining for optional config: `config.features?.enabled`
- Nullish coalescing for defaults: `config.get('cta.link.openInNewTab') ?? true`

### Styling
- Tailwind utility-first approach
- CSS custom properties for theming: `var(--primary)`, `var(--background)`
- Responsive: mobile-first breakpoints
- Dark mode: `.dark` class applied by `next-themes`

## Critical Implementation Details

### YAML Config Loading
```typescript
// Build-time loading (SSG)
const config = loadConfig(); // in app/page.tsx module scope

// Runtime loading (CLI)
const config = new ConfigManager(); // reads/writes content/landing.yaml
```

### Animation System
- Uses Framer Motion
- Three presets: `scale`, `fade`, `slide`
- Configured in `hero.animation.type`
- Lazy-loaded on scroll

### Form Handling
- Client-side submission to `/api/subscribe`
- Loading/error/success states
- Email validation on both client and server
- Privacy text configurable via YAML

### Multi-LLM Support
- Supports three LLM providers: OpenAI (GPT-5 Turbo), Claude (Sonnet 4), and Ollama (local)
- Provider selection and configuration in CLI Settings
- Each provider has separate API key/config storage
- Abstracted LLM calls via `callLLM()` method routes to appropriate provider
- Config stored in `.env.local`: `LLM_PROVIDER`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `OLLAMA_MODEL`

### AI Copywriting
- Works with any configured LLM provider
- Generates 3 variations per request
- Cost depends on provider: Ollama (free), Claude (premium), OpenAI (premium)
- Saves to YAML when user selects option
- Shows current provider in CLI interface

### Hook-Story-Offer Framework
- AI-powered landing page copy generation
- Based on Russell Brunson's proven framework
- Works with any configured LLM provider (OpenAI, Claude, or Ollama)
- Generates hook, story, and offer sections
- Accessible via CLI: `pnpm configure` → "Generate Hook-Story-Offer (AI)"
- Saves to `content/landing.yaml` under `hookStoryOffer`
- Component: `components/hook-story-offer-section.tsx`
- AI function: `ai-assistant.ts:generateHookStoryOffer()`

## Testing Changes

### Before Committing
```bash
pnpm type-check       # Catch TypeScript errors
pnpm build            # Ensure production build works
pnpm configure        # Test CLI if modified
```

### Common Issues
- **Build fails**: Check YAML syntax in `content/landing.yaml`
- **CLI errors**: Verify `.js` extensions in imports
- **Type errors**: Run `pnpm type-check` for details
- **Images missing**: Files must be in `public/`, paths start with `/`

## Important Files

- `lib/config.ts` - TypeScript schema and YAML loader
- `app/page.tsx` - Main page assembly
- `content/landing.yaml` - Content configuration
- `cli/index.ts` - CLI entry point with Hook-Story-Offer flow
- `cli/ai-assistant.ts` - AI copywriting and HSO generation
- `components/hook-story-offer-section.tsx` - HSO framework component
- `app/globals.css` - Theme CSS variables
- `app/api/subscribe/route.ts` - Email submission endpoint

## Deployment Notes

- Vercel is the recommended platform (zero-config)
- Static generation (SSG) at build time
- Environment variables: `OPENAI_API_KEY` (optional)
- Replace `public/guidebook-cover.png` before deploying
- Configure custom domain in Vercel dashboard
