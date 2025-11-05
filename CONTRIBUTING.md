# Contributing to Landing Page Template

Thank you for your interest in contributing! This project is open source and we welcome contributions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/landing-page-template/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, etc.)

### Suggesting Features

1. Check existing [Issues](https://github.com/yourusername/landing-page-template/issues) for similar suggestions
2. Create a new issue with:
   - Clear use case description
   - Expected behavior
   - Why this would be valuable
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly:
   ```bash
   pnpm type-check
   pnpm build
   pnpm configure  # Test CLI
   ```
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/landing-page-template.git
cd landing-page-template

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Test CLI
pnpm configure
```

### Code Style

- Use TypeScript
- Follow existing code patterns
- Add comments for complex logic
- Update documentation if needed

### CLI Development

When modifying CLI:

1. Edit files in `cli/` directory
2. Test with `pnpm configure`
3. Ensure all flows work
4. Update `CLI_GUIDE.md` if adding features

### Documentation

- Update relevant `.md` files
- Add examples where helpful
- Keep language clear and concise
- Test all code examples

## Areas for Contribution

### High Priority

- [ ] Additional animation presets
- [ ] More section templates (pricing, FAQ, blog)
- [ ] Enhanced AI prompts
- [ ] Image optimization helpers
- [ ] Additional email service integrations

### Medium Priority

- [ ] Multi-language support
- [ ] Template library/presets
- [ ] A/B testing helpers
- [ ] Analytics integration guides
- [ ] SEO optimization tools

### Nice to Have

- [ ] Visual theme editor
- [ ] Component playground
- [ ] Video background support
- [ ] Advanced form builders
- [ ] CMS integration examples

## Community

- Be respectful and constructive
- Help others in issues/discussions
- Share your landing pages built with this template
- Provide feedback on PRs

## Questions?

Open an issue with the `question` label or reach out to maintainers.

Thank you for contributing! 🚀
