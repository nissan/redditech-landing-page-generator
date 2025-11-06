import fs from 'fs';
import path from 'path';
// Package.json template
export function generatePackageJson(projectName) {
    return JSON.stringify({
        name: projectName,
        version: '1.0.0',
        private: true,
        description: `Landing page project: ${projectName}`,
        scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
            lint: 'next lint',
            'type-check': 'tsc --noEmit',
        },
        dependencies: {
            '@lpg/ui': 'workspace:*',
            next: '^16.0.1',
            react: '^19.2.0',
            'react-dom': '^19.2.0',
            'framer-motion': '^12.23.24',
            'lucide-react': '^0.552.0',
            'next-themes': '^0.4.6',
            clsx: '^2.1.1',
            'tailwind-merge': '^3.3.1',
            'js-yaml': '^4.1.0',
        },
        devDependencies: {
            '@types/node': '^24.10.0',
            '@types/react': '^19.2.2',
            '@types/js-yaml': '^4.0.9',
            '@tailwindcss/postcss': '^4.1.16',
            autoprefixer: '^10.4.21',
            postcss: '^8.5.6',
            tailwindcss: '^4.1.16',
            'tailwindcss-animate': '^1.0.7',
            typescript: '^5.9.3',
        },
    }, null, 2);
}
// tsconfig.json template
export const tsConfigTemplate = `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@lpg/ui": ["../../packages/ui/src/index.ts"],
      "@lpg/ui/*": ["../../packages/ui/src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
`;
// next.config.js template
export const nextConfigTemplate = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
`;
// postcss.config.mjs template
export const postcssConfigTemplate = `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
`;
// .env.example template
export const envExampleTemplate = `# AI Configuration
# Choose your preferred AI provider: openai, anthropic, or ollama
AI_PROVIDER=openai

# OpenAI Configuration (if using openai)
OPENAI_API_KEY=your-api-key-here
OPENAI_MODEL=gpt-4o

# Anthropic Configuration (if using anthropic)
ANTHROPIC_API_KEY=your-api-key-here
ANTHROPIC_MODEL=claude-sonnet-4-20250514

# Ollama Configuration (if using ollama - runs locally, no API key needed)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3.2:3b
`;
// app/layout.tsx template
export const layoutTemplate = `import type { Metadata } from "next";
import { ThemeProvider } from "@lpg/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "A professional landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
`;
// app/page.tsx template
export const pageTemplate = `import {
  loadConfig,
  HeroSection,
  CTASection,
  FeaturesSection,
  TestimonialsSection,
  HookStoryOfferSection,
  HowItWorksSection,
  TrustBadgesSection,
  FAQSection,
  GuaranteeSection,
  Footer,
  ThemeToggle,
  type LandingPageConfig,
} from "@lpg/ui";
import type { Metadata } from "next";

// Load configuration
const config = loadConfig();

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  openGraph: {
    title: config.metadata.title,
    description: config.metadata.description,
    images: config.metadata.ogImage ? [config.metadata.ogImage] : [],
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <ThemeToggle />

      <HeroSection config={config.hero} theme={config.theme} />

      {config.howItWorks?.enabled && (
        <HowItWorksSection config={config.howItWorks} theme={config.theme} />
      )}

      <CTASection config={config.cta} theme={config.theme} />

      {config.features?.enabled && (
        <FeaturesSection config={config.features} theme={config.theme} />
      )}

      {config.socialProof?.enabled && (
        <TrustBadgesSection config={config.socialProof} theme={config.theme} />
      )}

      {config.testimonials?.enabled && (
        <TestimonialsSection config={config.testimonials} theme={config.theme} />
      )}

      {config.guarantee?.enabled && (
        <GuaranteeSection config={config.guarantee} theme={config.theme} />
      )}

      {config.faq?.enabled && (
        <FAQSection config={config.faq} theme={config.theme} />
      )}

      {config.hookStoryOffer?.enabled && (
        <HookStoryOfferSection config={config.hookStoryOffer} theme={config.theme} />
      )}

      <Footer config={config.footer} theme={config.theme} />
    </main>
  );
}
`;
// app/globals.css template
export const globalsCssTemplate = `@import "tailwindcss";

@theme {
  --color-background: 0 0% 100%;
  --color-foreground: 0 0% 3.9%;
  --color-card: 0 0% 100%;
  --color-card-foreground: 0 0% 3.9%;
  --color-popover: 0 0% 100%;
  --color-popover-foreground: 0 0% 3.9%;
  --color-primary: 0 0% 9%;
  --color-primary-foreground: 0 0% 98%;
  --color-secondary: 0 0% 96.1%;
  --color-secondary-foreground: 0 0% 9%;
  --color-muted: 0 0% 96.1%;
  --color-muted-foreground: 0 0% 45.1%;
  --color-accent: 0 0% 96.1%;
  --color-accent-foreground: 0 0% 9%;
  --color-destructive: 0 84.2% 60.2%;
  --color-destructive-foreground: 0 0% 98%;
  --color-border: 0 0% 89.8%;
  --color-input: 0 0% 89.8%;
  --color-ring: 0 0% 3.9%;
  --radius: 0.5rem;
}

.dark {
  --color-background: 0 0% 3.9%;
  --color-foreground: 0 0% 98%;
  --color-card: 0 0% 3.9%;
  --color-card-foreground: 0 0% 98%;
  --color-popover: 0 0% 3.9%;
  --color-popover-foreground: 0 0% 98%;
  --color-primary: 0 0% 98%;
  --color-primary-foreground: 0 0% 9%;
  --color-secondary: 0 0% 14.9%;
  --color-secondary-foreground: 0 0% 98%;
  --color-muted: 0 0% 14.9%;
  --color-muted-foreground: 0 0% 63.9%;
  --color-accent: 0 0% 14.9%;
  --color-accent-foreground: 0 0% 98%;
  --color-destructive: 0 62.8% 30.6%;
  --color-destructive-foreground: 0 0% 98%;
  --color-border: 0 0% 14.9%;
  --color-input: 0 0% 14.9%;
  --color-ring: 0 0% 83.1%;
}

* {
  @apply border-border;
}

body {
  @apply bg-background text-foreground;
}
`;
// Create project scaffold
export async function createProjectScaffold(options) {
    const { projectName, projectPath } = options;
    // Create directory structure
    const dirs = [
        projectPath,
        path.join(projectPath, 'app'),
        path.join(projectPath, 'public'),
        path.join(projectPath, 'content'),
    ];
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
    // Write files
    fs.writeFileSync(path.join(projectPath, 'package.json'), generatePackageJson(projectName));
    fs.writeFileSync(path.join(projectPath, 'tsconfig.json'), tsConfigTemplate);
    fs.writeFileSync(path.join(projectPath, 'next.config.js'), nextConfigTemplate);
    fs.writeFileSync(path.join(projectPath, 'postcss.config.mjs'), postcssConfigTemplate);
    fs.writeFileSync(path.join(projectPath, '.env.example'), envExampleTemplate);
    fs.writeFileSync(path.join(projectPath, 'app', 'layout.tsx'), layoutTemplate);
    fs.writeFileSync(path.join(projectPath, 'app', 'page.tsx'), pageTemplate);
    fs.writeFileSync(path.join(projectPath, 'app', 'globals.css'), globalsCssTemplate);
    // Create .gitignore
    fs.writeFileSync(path.join(projectPath, '.gitignore'), `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`);
}
//# sourceMappingURL=project-scaffold.js.map