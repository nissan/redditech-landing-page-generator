# Project Structure

This document explains the organization and architecture of the landing page template.

## Directory Structure

```
landing-page-template/
│
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── subscribe/            # Email subscription endpoint
│   │       └── route.ts          # Form submission handler
│   ├── globals.css               # Global styles & Tailwind config
│   ├── layout.tsx                # Root layout with theme provider
│   └── page.tsx                  # Main landing page
│
├── components/                   # React components
│   ├── ui/                       # Base UI components
│   │   ├── button.tsx            # Button component
│   │   └── input.tsx             # Input field component
│   ├── hero-section.tsx          # Hero section with headline & image
│   ├── cta-section.tsx           # Call-to-action with form
│   ├── features-section.tsx      # Features grid (optional)
│   ├── testimonials-section.tsx  # Testimonials (optional)
│   ├── footer.tsx                # Footer with links
│   ├── theme-provider.tsx        # Dark mode context provider
│   └── theme-toggle.tsx          # Theme switch button
│
├── content/                      # Content configuration
│   └── landing.yaml              # YAML config for all page content
│
├── lib/                          # Utility functions
│   ├── config.ts                 # YAML loader & TypeScript types
│   └── utils.ts                  # Utility functions (cn, etc.)
│
├── public/                       # Static assets
│   └── guidebook-cover.png       # Hero image (replace with yours)
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Project dependencies
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
│
├── README.md                     # Main documentation
├── CUSTOMIZATION_GUIDE.md        # Detailed customization guide
├── QUICKSTART.md                 # Quick start guide
└── PROJECT_STRUCTURE.md          # This file
```

## Key Files Explained

### Content Configuration

**`content/landing.yaml`**
- Single source of truth for all page content
- Controls all text, links, images, and settings
- No code changes needed for content updates
- Supports optional sections (features, testimonials)

### Page Components

**`app/page.tsx`**
- Main landing page assembly
- Loads YAML configuration
- Conditionally renders sections
- Generates SEO metadata

**`app/layout.tsx`**
- Root layout wrapper
- Includes theme provider for dark mode
- Sets up HTML structure

### Section Components

**`components/hero-section.tsx`**
- Hero section with headline and image
- Configurable animations (scale, fade, slide)
- Responsive design with mobile optimization

**`components/cta-section.tsx`**
- Call-to-action with email form OR direct link
- Form submission with loading states
- Success/error message handling

**`components/features-section.tsx`**
- 3 or 6 feature cards in grid layout
- Icon support (code, rocket, star, zap, shield, users)
- Staggered animations on scroll

**`components/testimonials-section.tsx`**
- Testimonial cards with quotes
- Optional avatar images
- Author name and role

**`components/footer.tsx`**
- Copyright notice
- Footer navigation links
- Social media icons

### UI Components

**`components/ui/button.tsx`**
- Reusable button component
- Three variants: default, outline, ghost
- Three sizes: sm, default, lg
- Hover and active states

**`components/ui/input.tsx`**
- Form input field
- Focus states with primary color
- Validation support

### Theme System

**`components/theme-provider.tsx`**
- Wraps app in theme context
- Enables system preference detection
- Manages dark/light mode state

**`components/theme-toggle.tsx`**
- Toggle button for theme switching
- Sun/moon icons with animations
- Fixed position in top-right

**`app/globals.css`**
- Tailwind CSS v4 configuration
- CSS custom properties for theming
- Light and dark mode color definitions
- Animations and keyframes

### Configuration & Types

**`lib/config.ts`**
- Loads YAML file at build time
- TypeScript interfaces for type safety
- Exports `LandingPageConfig` type
- `loadConfig()` function

**`lib/utils.ts`**
- `cn()` function for className merging
- Combines clsx and tailwind-merge
- Used throughout components

### API Routes

**`app/api/subscribe/route.ts`**
- POST endpoint for form submissions
- Email validation
- Ready for email service integration
- Error handling

## Data Flow

1. **Build Time**: YAML file is loaded via `loadConfig()` in `lib/config.ts`
2. **Page Render**: `app/page.tsx` receives config and passes to components
3. **Component Render**: Each section receives its config slice and theme
4. **User Interaction**: Form submissions POST to `/api/subscribe`
5. **Theme Toggle**: Changes saved to localStorage, applied via CSS variables

## Styling Approach

### Tailwind CSS v4
- Utility-first CSS framework
- PostCSS plugin architecture
- Custom color system via CSS variables
- Responsive design breakpoints

### CSS Custom Properties
- `--background`, `--foreground` for light/dark modes
- `--primary`, `--accent` for brand colors
- `--muted-foreground` for secondary text
- `--border`, `--ring` for UI elements

### Component Styling
- Inline `style` props for theme colors (e.g., `primaryColor`)
- Tailwind classes for layout and spacing
- `cn()` utility for conditional classes

## State Management

### Theme State
- Managed by `next-themes`
- Persisted to localStorage
- System preference detection
- No manual state needed

### Form State
- Local component state with `useState`
- Loading, error, success states
- Email validation

### Configuration State
- Static at build time
- No runtime state needed
- Changes require rebuild

## Performance Optimizations

1. **Static Generation**: Page pre-rendered at build time
2. **Image Optimization**: Next.js Image component
3. **Code Splitting**: Automatic by Next.js
4. **CSS Purging**: Tailwind removes unused styles
5. **Lazy Loading**: Framer Motion animations load on scroll

## Type Safety

- Full TypeScript support
- Strict mode enabled
- Interface for YAML configuration
- Component prop types
- API route types

## Extension Points

### Adding New Sections
1. Create component in `components/`
2. Add configuration to `lib/config.ts` interface
3. Add YAML structure to `content/landing.yaml`
4. Import and render in `app/page.tsx`

### Adding Email Services
1. Install service SDK
2. Add API keys to `.env.local`
3. Update `app/api/subscribe/route.ts`
4. Add integration code

### Customizing Theme
1. Update CSS variables in `app/globals.css`
2. Or use YAML `theme` section for quick changes
3. Modify Tailwind classes in components for layout

### Adding Analytics
1. Add script to `app/layout.tsx`
2. Or use Next.js Script component
3. Add tracking ID to `.env.local`

## Build Process

```bash
pnpm dev      # Development server (hot reload)
pnpm build    # Production build (static generation)
pnpm start    # Production server
pnpm lint     # Run Next.js linter
```

### Build Output
- Static HTML pages in `.next/`
- Optimized CSS bundle
- JavaScript chunks
- Image assets

## Deployment

### Vercel (Recommended)
- Zero-config deployment
- Automatic builds on git push
- Edge network CDN
- Environment variables in dashboard

### Other Platforms
- Build with `pnpm build`
- Serve `.next/` directory
- Set Node.js version to 18+
- Configure environment variables

## Dependencies

### Core
- **next**: React framework
- **react**: UI library
- **typescript**: Type safety

### Styling
- **tailwindcss**: Utility CSS
- **@tailwindcss/postcss**: Tailwind v4 plugin
- **tailwindcss-animate**: Animation utilities
- **framer-motion**: Animation library

### UI
- **lucide-react**: Icon library
- **next-themes**: Dark mode
- **clsx**: Class name utility
- **tailwind-merge**: Class merging

### Utilities
- **js-yaml**: YAML parsing
- **@types/js-yaml**: YAML types

## Best Practices

1. **Always update YAML first** before changing code
2. **Test both light and dark modes** when customizing
3. **Optimize images** before adding to `public/`
4. **Use TypeScript types** from `lib/config.ts`
5. **Keep sections optional** for flexibility
6. **Test form submission** after email service integration
7. **Run build** before deployment to catch errors

## Troubleshooting

### Common Issues

**Build fails**:
- Run `pnpm type-check` to see TypeScript errors
- Ensure YAML syntax is valid
- Check all required config fields are present

**Images not showing**:
- Verify file exists in `public/`
- Check file path starts with `/`
- Ensure correct file extension

**Theme not working**:
- Check `ThemeProvider` wraps app
- Verify CSS variables in `globals.css`
- Clear browser cache

**Form not submitting**:
- Check `/api/subscribe` endpoint exists
- Verify fetch URL matches config
- Check browser console for errors

## Support

For detailed guides, see:
- [README.md](README.md) - Overview and features
- [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) - Detailed customization
- [QUICKSTART.md](QUICKSTART.md) - Quick setup

---

Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4
