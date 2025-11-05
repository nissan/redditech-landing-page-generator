# Publishing to GitHub - Step-by-Step Guide

This guide will help you publish your Landing Page Template to GitHub.

## Prerequisites

- [x] Git installed on your system
- [x] GitHub account created ([Sign up](https://github.com/join))
- [x] Project files ready (you're here!)

## Step 1: Create a GitHub Repository

1. **Go to GitHub** and sign in
2. **Click the "+" icon** in the top-right corner
3. **Select "New repository"**

### Repository Settings

- **Repository name**: `landing-page-template` (or your preferred name)
- **Description**: "A modern Next.js landing page template with YAML-driven content and AI-powered CLI configurator"
- **Visibility**:
  - ✅ **Public** - Recommended for open source
  - ⬜ Private - If you want to keep it private
- **Initialize repository**:
  - ⬜ Do NOT add README (we already have one)
  - ⬜ Do NOT add .gitignore (we already have one)
  - ⬜ Do NOT add license (we already have one)

4. **Click "Create repository"**

## Step 2: Prepare Your Local Repository

Open your terminal in the project directory:

```bash
cd /path/to/landing-page-template
```

### Check Git Status

```bash
git status
```

If you see "fatal: not a git repository", run:

```bash
git init
```

## Step 3: Stage and Commit Files

### Add All Files

```bash
git add .
```

### Create Initial Commit

```bash
git commit -m "Initial commit: Landing page template with CLI configurator

Features:
- Next.js 15 with TypeScript and Tailwind CSS v4
- Interactive CLI configurator with AI copywriting
- YAML-driven content configuration
- Dark mode support
- Email capture form
- Comprehensive documentation"
```

## Step 4: Connect to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/landing-page-template.git
```

### Verify Remote

```bash
git remote -v
```

You should see:
```
origin  https://github.com/YOUR_USERNAME/landing-page-template.git (fetch)
origin  https://github.com/YOUR_USERNAME/landing-page-template.git (push)
```

## Step 5: Push to GitHub

### Set Main Branch

```bash
git branch -M main
```

### Push Code

```bash
git push -u origin main
```

### Authentication

GitHub will prompt for authentication:

**Option 1: Personal Access Token (Recommended)**
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Landing Page Template"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token and use it as your password

**Option 2: SSH Key**
- Follow [GitHub's SSH guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

## Step 6: Update README

After pushing, update the README with your actual repository URL:

1. Open `README.md`
2. Find and replace all instances of:
   - `yourusername` → Your GitHub username
   - `https://github.com/yourusername/landing-page-template` → Your repository URL

3. Commit and push the changes:

```bash
git add README.md
git commit -m "docs: Update README with actual repository URL"
git push
```

## Step 7: Configure Repository Settings

### Enable GitHub Actions

1. Go to your repository on GitHub
2. Click "Actions" tab
3. Enable workflows if prompted
4. The CI workflow will run automatically on pushes

### Add Topics (Optional)

1. Go to repository homepage
2. Click the gear icon next to "About"
3. Add topics (tags):
   - `nextjs`
   - `typescript`
   - `tailwindcss`
   - `landing-page`
   - `template`
   - `cli`
   - `ai`
   - `yaml-driven`
   - `dark-mode`

### Update Repository Description

Add this as the description:
> A modern Next.js landing page template with YAML-driven content and AI-powered CLI configurator. Built with TypeScript, Tailwind CSS v4, and Framer Motion.

### Add Website (Optional)

If you deploy to Vercel/Netlify, add the URL in repository settings.

## Step 8: Create Releases (Optional)

### Tag Your First Release

```bash
git tag -a v1.0.0 -m "Release v1.0.0: Initial public release"
git push origin v1.0.0
```

### Create Release on GitHub

1. Go to repository → Releases → "Create a new release"
2. Choose tag: `v1.0.0`
3. Release title: "v1.0.0 - Initial Release"
4. Description:

```markdown
## 🎉 Initial Release

First public release of the Landing Page Template!

### ✨ Features

- 🎨 Interactive CLI configurator
- 🤖 AI-powered copywriting (OpenAI, Claude, or Ollama)
- 📝 YAML-driven content configuration
- 🌓 Dark mode support
- 📱 Fully responsive design
- ⚡ Next.js 15 with App Router
- 🎭 TypeScript and Tailwind CSS v4
- 📚 Comprehensive documentation

### 🚀 Quick Start

\`\`\`bash
pnpm install
pnpm configure
pnpm dev
\`\`\`

### 📖 Documentation

See [README.md](README.md) for full documentation.

### 🙏 Thanks

Thank you to all early adopters and contributors!
```

5. Click "Publish release"

## Step 9: Add Shields/Badges (Optional)

Badges are already in the README, but you can add more:

```markdown
[![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/landing-page-template)](https://github.com/YOUR_USERNAME/landing-page-template/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/landing-page-template)](https://github.com/YOUR_USERNAME/landing-page-template/network)
[![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/landing-page-template)](https://github.com/YOUR_USERNAME/landing-page-template/issues)
```

## Step 10: Share Your Repository

### Add to GitHub Collections

- [Awesome Next.js](https://github.com/unicodeveloper/awesome-nextjs)
- [Awesome TypeScript](https://github.com/dzharii/awesome-typescript)
- [Awesome Tailwind CSS](https://github.com/aniftyco/awesome-tailwindcss)

### Share on Social Media

**Twitter/X**:
```
🚀 Just published my Next.js landing page template!

✨ Features:
• AI-powered copywriting
• Interactive CLI configurator
• YAML-driven content
• Dark mode
• Full TypeScript

Check it out: https://github.com/YOUR_USERNAME/landing-page-template

#NextJS #TypeScript #OpenSource
```

**LinkedIn**:
```
I'm excited to share my latest open-source project: A modern landing page template for Next.js!

What makes it special:
• Interactive CLI with AI copywriting
• YAML-driven configuration (no code editing needed)
• Dark mode out of the box
• Full TypeScript & Tailwind CSS v4
• Comprehensive documentation

Perfect for product launches, lead generation, and quick prototyping.

GitHub: https://github.com/YOUR_USERNAME/landing-page-template

#OpenSource #NextJS #WebDevelopment #AI
```

## Maintenance Tips

### Keep Dependencies Updated

```bash
# Check for updates
pnpm outdated

# Update all dependencies
pnpm update --latest
```

### Monitor Issues

- Enable email notifications for new issues
- Respond to issues promptly
- Label issues appropriately (bug, feature, question)

### Welcome Contributors

- Thank first-time contributors
- Provide clear feedback on PRs
- Update CONTRIBUTING.md as needed

### Create Milestones

Plan future releases with GitHub Milestones:
- v1.1.0 - Additional sections
- v1.2.0 - Template library
- v2.0.0 - Major features

## Troubleshooting

### Push Rejected

If push is rejected:

```bash
git pull origin main --rebase
git push origin main
```

### Authentication Failed

Generate a new Personal Access Token:
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token with `repo` scope

### Large Files

If you have files > 100MB:

```bash
# Remove from git
git rm --cached large-file
echo "large-file" >> .gitignore
git commit -m "Remove large file"
git push
```

## Next Steps

1. ✅ Repository created and pushed
2. ⬜ Add collaborators (if team project)
3. ⬜ Set up branch protection rules
4. ⬜ Enable GitHub Discussions
5. ⬜ Add GitHub Sponsors (if accepting donations)
6. ⬜ Create a project website with GitHub Pages
7. ⬜ Deploy demo to Vercel/Netlify

## Resources

- [GitHub Docs](https://docs.github.com)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

---

**Congratulations! Your repository is now public! 🎉**

People can now:
- ⭐ Star your repository
- 🍴 Fork and customize it
- 🐛 Report issues
- 🔀 Submit pull requests
- 📚 Use your template for their projects

Thank you for contributing to the open-source community! 🚀
