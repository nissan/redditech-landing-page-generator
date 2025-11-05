# Demo Configuration

This folder contains a demo configuration showcasing the capabilities of the Redditech Landing Page Generator.

## What's Included

- **`landing-demo.yaml`**: A complete example configuration showing all available features
  - Identity and Access Management theme
  - Professional hero section with guidebook cover
  - Features section highlighting key learning areas
  - Testimonials from developers
  - Email capture CTA form
  - Social media links in footer

## Running the Demo

### Option 1: Use the Default Configuration (Quickest)

The main project is already configured with this demo. Simply run:

```bash
# From the root of the project
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the demo in action.

### Option 2: Apply Demo Configuration Manually

If you've modified your configuration and want to restore the demo:

```bash
# From the root of the project
cp demo/landing-demo.yaml content/landing.yaml
pnpm dev
```

### Option 3: Use the Interactive CLI

Start fresh with the CLI configurator:

```bash
pnpm configure
```

Then follow the prompts to create your own landing page or select options to recreate something similar to the demo.

## Demo Features Showcase

This demo configuration demonstrates:

### Theme & Styling
- **Primary Color**: Blue (#1677be)
- **Accent Color**: Dark blue (#0f5a8a)
- **Professional color scheme**: Suitable for technical/educational products
- **Dark mode support**: Toggle between light and dark themes

### Hero Section
- **Compelling headline**: "Master Identity and Access Management like a Pro"
- **Clear value proposition**: Join a community of professional developers
- **Hero image**: Guidebook cover (replace with your own)
- **Fade animation**: Smooth entrance effect

### Features Section
- **3 key benefits** with icons:
  - Full-Stack Development (code icon)
  - Production Ready (rocket icon)
  - Best Practices (star icon)
- **Concise descriptions**: Each feature explained in one line

### Testimonials
- **2 developer testimonials** with:
  - Authentic quotes
  - Name and role attribution
  - Avatar images (placeholders included)

### Call-to-Action
- **Email capture form** with:
  - Clear heading: "Get Early Access Today!"
  - Motivating description
  - Email validation
  - Privacy notice
  - Styled submit button

### Footer
- **Copyright notice**: © 2025 Daily Dose of Data Science
- **Policy links**: Privacy and Terms pages
- **Social media**: Twitter, GitHub, LinkedIn icons

## Customizing the Demo

### Quick Customizations

1. **Change Colors**:
   ```yaml
   theme:
     primaryColor: '#your-color'
     accentColor: '#your-accent'
   ```

2. **Update Hero Text**:
   ```yaml
   hero:
     headline: Your Headline
     subheadline: Your Subheadline
   ```

3. **Replace Image**:
   - Add your image to `public/` folder
   - Update in YAML: `hero.image.src: /your-image.png`

4. **Toggle Sections**:
   ```yaml
   features:
     enabled: false  # Hide features
   testimonials:
     enabled: false  # Hide testimonials
   ```

### Use AI to Improve Copy

If you have an OpenAI API key configured:

```bash
pnpm configure
# Select "AI-powered copywriting"
# Choose section to improve
# Get 3 AI-generated variations
```

## What to Modify for Your Product

Replace these placeholder values with your own:

- [ ] `metadata.title` - Your product/page title
- [ ] `metadata.description` - SEO description
- [ ] `hero.headline` - Your main headline
- [ ] `hero.subheadline` - Your value proposition
- [ ] `hero.image.src` - Your hero image path
- [ ] `features.items` - Your product features
- [ ] `testimonials.items` - Real customer testimonials
- [ ] `cta.heading` - Your call-to-action
- [ ] `cta.form.fields[0].placeholder` - Your email example
- [ ] `footer.copyright` - Your company name
- [ ] `footer.links` - Your policy pages
- [ ] `footer.social` - Your social media URLs

## Tips for Best Results

1. **Keep Headlines Short**: 5-10 words work best
2. **Focus on Benefits**: Tell users what they'll gain
3. **Use Action Words**: "Master", "Learn", "Build", etc.
4. **Social Proof**: Real testimonials perform better than fake ones
5. **Clear CTA**: Make it obvious what action to take
6. **Consistent Branding**: Use your brand colors throughout

## Need Help?

- Check the [main documentation](../Documentation/) for detailed guides
- Run `pnpm configure` for the interactive setup wizard
- See [CLI_EXAMPLES.md](../Documentation/CLI_EXAMPLES.md) for more configuration examples

## Deploy Your Version

Once you've customized the demo:

1. **Test locally**: `pnpm build && pnpm start`
2. **Commit changes**: `git add . && git commit -m "Customize landing page"`
3. **Push to GitHub**: `git push origin main`
4. **Deploy to Vercel**: Follow instructions in [README.md](../README.md#deployment-to-vercel)

Your landing page will be live in under 2 minutes!
