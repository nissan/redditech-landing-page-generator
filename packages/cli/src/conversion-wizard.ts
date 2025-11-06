import chalk from 'chalk';
import inquirer from 'inquirer';
import boxen from 'boxen';
import { createSpinner } from 'nanospinner';
import { ConfigManager } from './config-manager.js';
import { AIAssistant } from './ai-assistant.js';

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

interface FoundationData {
  targetAudience: string;
  painPoint: string;
  dreamOutcome: string;
  productDescription: string;
  differentiation: string;
  specificResult: string;
  customerCount?: string;
  notableClients?: string;
  mediaMentions?: string;
}

export async function conversionWizardFlow() {
  console.clear();

  // Introduction
  console.log(
    boxen(
      chalk.white.bold('🎯 Conversion-Optimized Landing Page Builder\n\n') +
      chalk.gray('Based on "Sell Like Crazy" methodology\n') +
      chalk.yellow('Formula: Purchase Rate = Desire - (Labor + Confusion)\n\n') +
      chalk.cyan('This wizard will guide you through creating a high-converting\n') +
      chalk.cyan('landing page using proven conversion optimization principles.'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'double',
        borderColor: 'magenta',
      }
    )
  );

  await sleep(1000);

  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Ready to build your conversion-optimized landing page?',
      default: true,
    },
  ]);

  if (!proceed) {
    return;
  }

  const config = new ConfigManager();
  const ai = new AIAssistant();

  // Section 1: Foundation (Desire)
  const foundation = await collectFoundation();

  // Section 2: Hero Section
  await buildHeroSection(config, ai, foundation);

  // Section 3: How It Works
  await buildHowItWorksSection(config, ai, foundation);

  // Section 4: Benefits & Features
  await buildBenefitsSection(config, ai, foundation);

  // Section 5: Social Proof
  await buildSocialProofSection(config, foundation);

  // Section 6: Objection Handling (FAQ + Guarantee)
  await buildFAQSection(config, ai, foundation);
  await buildGuaranteeSection(config, ai);

  // Section 7: CTA Strategy
  await buildCTAStrategy(config, foundation);

  // Final Summary
  await showSummary(config);
}

async function collectFoundation(): Promise<FoundationData> {
  console.log(chalk.cyan.bold('\n📊 Section 1: Foundation (Maximize Desire)\n'));
  console.log(chalk.gray('Understanding your audience and value proposition\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'targetAudience',
      message: 'Who is your ideal customer? (persona)',
      validate: (input) => input.length > 0 || 'Please describe your target audience',
    },
    {
      type: 'input',
      name: 'painPoint',
      message: 'What is their biggest pain point/problem?',
      validate: (input) => input.length > 0 || 'Please describe the main problem',
    },
    {
      type: 'input',
      name: 'dreamOutcome',
      message: 'What is their dream outcome?',
      validate: (input) => input.length > 0 || 'Please describe the desired outcome',
    },
    {
      type: 'input',
      name: 'productDescription',
      message: 'What does your product/service do in one sentence?',
      validate: (input) => input.length > 0 || 'Please describe your product',
    },
    {
      type: 'input',
      name: 'differentiation',
      message: 'What makes you different from competitors?',
      validate: (input) => input.length > 0 || 'Please describe your differentiation',
    },
    {
      type: 'input',
      name: 'specificResult',
      message: 'What specific result/benefit does it provide?',
      validate: (input) => input.length > 0 || 'Please describe the specific result',
    },
    {
      type: 'input',
      name: 'customerCount',
      message: 'Number of customers (optional, e.g., "10,000+"):',
    },
    {
      type: 'input',
      name: 'notableClients',
      message: 'Notable clients or brands (optional, comma-separated):',
    },
    {
      type: 'input',
      name: 'mediaMentions',
      message: 'Media mentions or awards (optional, comma-separated):',
    },
  ]);

  console.log(chalk.green('✓ Foundation collected!\n'));
  return answers;
}

async function buildHeroSection(
  config: ConfigManager,
  ai: AIAssistant,
  foundation: FoundationData
) {
  console.log(chalk.cyan.bold('\n🎯 Section 2: Hero Section (Above the Fold)\n'));
  console.log(chalk.gray('Creating a compelling headline using proven formulas\n'));

  const { formula } = await inquirer.prompt([
    {
      type: 'list',
      name: 'formula',
      message: 'Choose headline formula:',
      choices: [
        {
          name: '[Who] + [Problem] + [Solution] + [Timeframe]',
          value: 'who-problem-solution-time',
        },
        {
          name: '[Outcome] + [Without] + [Pain]',
          value: 'outcome-without-pain',
        },
        {
          name: '[Number] + [Benefit] + [Timeframe]',
          value: 'number-benefit-time',
        },
        {
          name: 'Let AI suggest the best formula',
          value: 'ai-suggest',
        },
      ],
    },
  ]);

  const { useAI } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useAI',
      message: 'Use AI to generate headline variations?',
      default: true,
    },
  ]);

  let headline = '';

  if (useAI) {
    const spinner = createSpinner('Generating headline variations...').start();
    await sleep(500);

    try {
      const variations = await ai.generateConversionHeadline(
        foundation.targetAudience,
        foundation.painPoint,
        foundation.specificResult,
        formula
      );

      spinner.success({ text: 'Generated 3 headline variations!' });

      // Show variations
      variations.forEach((variation, index) => {
        console.log(
          boxen(chalk.white(`Option ${index + 1}:\n\n${chalk.bold(variation)}`), {
            padding: 1,
            margin: { top: 1, bottom: 0, left: 2, right: 2 },
            borderColor: 'cyan',
          })
        );
      });

      const { selectedIndex } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedIndex',
          message: 'Choose your favorite headline:',
          choices: [
            ...variations.map((v, i) => ({ name: `Option ${i + 1}`, value: i })),
            { name: 'Enter my own', value: -1 },
          ],
        },
      ]);

      if (selectedIndex === -1) {
        const { customHeadline } = await inquirer.prompt([
          {
            type: 'input',
            name: 'customHeadline',
            message: 'Enter your headline:',
            validate: (input) => input.length > 0 || 'Headline is required',
          },
        ]);
        headline = customHeadline;
      } else {
        headline = variations[selectedIndex];
      }
    } catch (error) {
      spinner.error({ text: 'AI generation failed. Please enter manually.' });
      const { manualHeadline } = await inquirer.prompt([
        {
          type: 'input',
          name: 'manualHeadline',
          message: 'Enter your headline:',
          validate: (input) => input.length > 0 || 'Headline is required',
        },
      ]);
      headline = manualHeadline;
    }
  } else {
    const { manualHeadline } = await inquirer.prompt([
      {
        type: 'input',
        name: 'manualHeadline',
        message: 'Enter your headline:',
        validate: (input) => input.length > 0 || 'Headline is required',
      },
    ]);
    headline = manualHeadline;
  }

  // Subheadline
  const { subheadline } = await inquirer.prompt([
    {
      type: 'input',
      name: 'subheadline',
      message: 'Enter subheadline (3 key benefits):',
      validate: (input) => input.length > 0 || 'Subheadline is required',
    },
  ]);

  // Save to config
  config.set('hero.headline', headline);
  config.set('hero.subheadline', subheadline);
  await config.save();

  console.log(chalk.green('✓ Hero section configured!\n'));
}

async function buildHowItWorksSection(
  config: ConfigManager,
  ai: AIAssistant,
  foundation: FoundationData
) {
  console.log(chalk.cyan.bold('\n⚙️  Section 3: How It Works (Reduce Labor)\n'));
  console.log(chalk.gray('Simplify understanding with a 3-step process\n'));

  const { enableHowItWorks } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'enableHowItWorks',
      message: 'Add "How It Works" section?',
      default: true,
    },
  ]);

  if (!enableHowItWorks) {
    config.set('howItWorks.enabled', false);
    await config.save();
    return;
  }

  const { useAI } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useAI',
      message: 'Use AI to generate 3-step process?',
      default: true,
    },
  ]);

  let steps = [];

  if (useAI) {
    const spinner = createSpinner('Generating step-by-step process...').start();
    await sleep(500);

    try {
      steps = await ai.generateHowItWorksSteps(foundation.productDescription);
      spinner.success({ text: 'Generated 3-step process!' });

      // Show generated steps
      steps.forEach((step: any, index: number) => {
        console.log(chalk.cyan(`\nStep ${index + 1}: ${chalk.bold(step.title)}`));
        console.log(chalk.gray(step.description));
      });

      const { acceptSteps } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'acceptSteps',
          message: 'Use these steps?',
          default: true,
        },
      ]);

      if (!acceptSteps) {
        steps = await collectStepsManually();
      }
    } catch (error) {
      spinner.error({ text: 'AI generation failed. Entering manually.' });
      steps = await collectStepsManually();
    }
  } else {
    steps = await collectStepsManually();
  }

  // Save to config
  config.set('howItWorks.enabled', true);
  config.set('howItWorks.heading', 'How It Works');
  config.set('howItWorks.steps', steps);
  await config.save();

  console.log(chalk.green('✓ How It Works section configured!\n'));
}

async function collectStepsManually() {
  const steps = [];

  for (let i = 1; i <= 3; i++) {
    console.log(chalk.yellow(`\n── Step ${i} ──`));
    const step = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: `Step ${i} title:`,
        validate: (input) => input.length > 0 || 'Title is required',
      },
      {
        type: 'input',
        name: 'description',
        message: `Step ${i} description:`,
        validate: (input) => input.length > 0 || 'Description is required',
      },
      {
        type: 'input',
        name: 'timeframe',
        message: `Timeframe (optional, e.g., "2 minutes"):`,
      },
    ]);

    steps.push({
      number: i,
      title: step.title,
      description: step.description,
      icon: `number-${i}`,
      timeframe: step.timeframe || undefined,
    });
  }

  return steps;
}

async function buildBenefitsSection(
  config: ConfigManager,
  ai: AIAssistant,
  foundation: FoundationData
) {
  console.log(chalk.cyan.bold('\n✨ Section 4: Benefits & Features\n'));
  console.log(chalk.gray('Focus on outcomes, not just capabilities\n'));

  const { enableFeatures } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'enableFeatures',
      message: 'Add features/benefits section?',
      default: true,
    },
  ]);

  if (!enableFeatures) {
    config.set('features.enabled', false);
    await config.save();
    return;
  }

  const { featureCount } = await inquirer.prompt([
    {
      type: 'number',
      name: 'featureCount',
      message: 'How many features/benefits to include?',
      default: 3,
      validate: (input) => (input >= 1 && input <= 6) || 'Enter 1-6 features',
    },
  ]);

  const features = [];

  for (let i = 1; i <= featureCount; i++) {
    console.log(chalk.yellow(`\n── Feature ${i} ──`));
    const feature = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: `Feature ${i} title:`,
        validate: (input) => input.length > 0 || 'Title is required',
      },
      {
        type: 'input',
        name: 'description',
        message: `Benefit (what outcome does this provide?):`,
        validate: (input) => input.length > 0 || 'Description is required',
      },
      {
        type: 'list',
        name: 'icon',
        message: 'Choose icon:',
        choices: ['rocket', 'star', 'zap', 'shield', 'code', 'users'],
      },
    ]);

    features.push(feature);
  }

  config.set('features.enabled', true);
  config.set('features.heading', 'Why Choose Us');
  config.set('features.items', features);
  await config.save();

  console.log(chalk.green('✓ Benefits section configured!\n'));
}

async function buildSocialProofSection(config: ConfigManager, foundation: FoundationData) {
  console.log(chalk.cyan.bold('\n⭐ Section 5: Social Proof (Build Trust)\n'));
  console.log(chalk.gray('Add testimonials, metrics, and trust badges\n'));

  // Social Metrics
  if (foundation.customerCount) {
    const metrics = [
      {
        type: 'customers',
        value: foundation.customerCount,
        label: 'Happy Customers',
      },
    ];

    config.set('socialProof.enabled', true);
    config.set('socialProof.metrics', metrics);
  }

  // Trust Badges
  const { addTrustBadges } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'addTrustBadges',
      message: 'Add trust badges (certifications, media mentions, security)?',
      default: true,
    },
  ]);

  if (addTrustBadges) {
    const badges = [];

    if (foundation.mediaMentions) {
      const mentions = foundation.mediaMentions.split(',').map((m) => m.trim());
      mentions.forEach((mention) => {
        badges.push({
          type: 'media',
          text: mention,
        });
      });
    }

    // Add SSL/Security badge
    badges.push({
      type: 'security',
      text: 'Secure & Encrypted',
    });

    if (badges.length > 0) {
      config.set('socialProof.trustBadges.enabled', true);
      config.set('socialProof.trustBadges.heading', 'Trusted By');
      config.set('socialProof.trustBadges.badges', badges);
    }
  }

  await config.save();
  console.log(chalk.green('✓ Social proof configured!\n'));
}

async function buildFAQSection(
  config: ConfigManager,
  ai: AIAssistant,
  foundation: FoundationData
) {
  console.log(chalk.cyan.bold('\n❓ Section 6: FAQ (Address Objections)\n'));
  console.log(chalk.gray('Reduce confusion by answering common questions\n'));

  const { addFAQ } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'addFAQ',
      message: 'Add FAQ section?',
      default: true,
    },
  ]);

  if (!addFAQ) {
    config.set('faq.enabled', false);
    await config.save();
    return;
  }

  const { useAI } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useAI',
      message: 'Use AI to generate common FAQs?',
      default: true,
    },
  ]);

  let faqItems = [];

  if (useAI) {
    const spinner = createSpinner('Generating FAQs...').start();
    await sleep(500);

    try {
      faqItems = await ai.generateFAQ(foundation.productDescription, foundation.targetAudience);
      spinner.success({ text: `Generated ${faqItems.length} FAQs!` });

      // Show FAQs
      faqItems.forEach((faq: any, index: number) => {
        console.log(chalk.cyan(`\n${index + 1}. ${chalk.bold(faq.question)}`));
        console.log(chalk.gray(faq.answer));
      });

      const { acceptFAQs } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'acceptFAQs',
          message: 'Use these FAQs?',
          default: true,
        },
      ]);

      if (!acceptFAQs) {
        faqItems = await collectFAQsManually();
      }
    } catch (error) {
      spinner.error({ text: 'AI generation failed. Entering manually.' });
      faqItems = await collectFAQsManually();
    }
  } else {
    faqItems = await collectFAQsManually();
  }

  config.set('faq.enabled', true);
  config.set('faq.heading', 'Frequently Asked Questions');
  config.set('faq.items', faqItems);
  await config.save();

  console.log(chalk.green('✓ FAQ section configured!\n'));
}

async function collectFAQsManually() {
  const { faqCount } = await inquirer.prompt([
    {
      type: 'number',
      name: 'faqCount',
      message: 'How many FAQs to add?',
      default: 5,
      validate: (input) => (input >= 1 && input <= 15) || 'Enter 1-15 FAQs',
    },
  ]);

  const faqs = [];

  for (let i = 1; i <= faqCount; i++) {
    console.log(chalk.yellow(`\n── FAQ ${i} ──`));
    const faq = await inquirer.prompt([
      {
        type: 'input',
        name: 'question',
        message: 'Question:',
        validate: (input) => input.length > 0 || 'Question is required',
      },
      {
        type: 'input',
        name: 'answer',
        message: 'Answer:',
        validate: (input) => input.length > 0 || 'Answer is required',
      },
    ]);

    faqs.push(faq);
  }

  return faqs;
}

async function buildGuaranteeSection(config: ConfigManager, ai: AIAssistant) {
  console.log(chalk.cyan.bold('\n🛡️  Section 6b: Money-Back Guarantee\n'));
  console.log(chalk.gray('Risk reversal to remove purchase anxiety\n'));

  const { addGuarantee } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'addGuarantee',
      message: 'Add money-back guarantee?',
      default: true,
    },
  ]);

  if (!addGuarantee) {
    config.set('guarantee.enabled', false);
    await config.save();
    return;
  }

  const { guaranteeType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'guaranteeType',
      message: 'Guarantee duration:',
      choices: ['30-day', '60-day', '90-day', 'lifetime', 'custom'],
    },
  ]);

  let duration = guaranteeType;
  if (guaranteeType === 'custom') {
    const { customDuration } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customDuration',
        message: 'Enter custom duration:',
        validate: (input) => input.length > 0 || 'Duration is required',
      },
    ]);
    duration = customDuration;
  }

  const { useAI } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useAI',
      message: 'Use AI to write guarantee copy?',
      default: true,
    },
  ]);

  let description = '';

  if (useAI) {
    const spinner = createSpinner('Generating guarantee copy...').start();
    await sleep(500);

    try {
      description = await ai.generateGuaranteeCopy(guaranteeType);
      spinner.success({ text: 'Generated guarantee copy!' });

      console.log(
        boxen(chalk.white(description), {
          padding: 1,
          margin: 1,
          borderColor: 'green',
        })
      );

      const { accept } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'accept',
          message: 'Use this copy?',
          default: true,
        },
      ]);

      if (!accept) {
        const { customDescription } = await inquirer.prompt([
          {
            type: 'input',
            name: 'customDescription',
            message: 'Enter guarantee description:',
            validate: (input) => input.length > 0 || 'Description is required',
          },
        ]);
        description = customDescription;
      }
    } catch (error) {
      spinner.error({ text: 'AI generation failed. Please enter manually.' });
      const { manualDescription } = await inquirer.prompt([
        {
          type: 'input',
          name: 'manualDescription',
          message: 'Enter guarantee description:',
          validate: (input) => input.length > 0 || 'Description is required',
        },
      ]);
      description = manualDescription;
    }
  } else {
    const { manualDescription } = await inquirer.prompt([
      {
        type: 'input',
        name: 'manualDescription',
        message: 'Enter guarantee description:',
        validate: (input) => input.length > 0 || 'Description is required',
      },
    ]);
    description = manualDescription;
  }

  config.set('guarantee.enabled', true);
  config.set('guarantee.heading', 'Our Guarantee');
  config.set('guarantee.type', guaranteeType);
  config.set('guarantee.duration', duration);
  config.set('guarantee.description', description);
  await config.save();

  console.log(chalk.green('✓ Guarantee section configured!\n'));
}

async function buildCTAStrategy(config: ConfigManager, foundation: FoundationData) {
  console.log(chalk.cyan.bold('\n🎯 Section 7: Call-to-Action Strategy\n'));
  console.log(chalk.gray('Optimize conversion with strategic CTA placement\n'));

  const { ctaType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'ctaType',
      message: 'What type of CTA?',
      choices: [
        { name: 'Email form (lead capture)', value: 'form' },
        { name: 'Direct link (external page)', value: 'link' },
      ],
    },
  ]);

  const { ctaHeading } = await inquirer.prompt([
    {
      type: 'input',
      name: 'ctaHeading',
      message: 'CTA heading:',
      default: 'Ready to Get Started?',
      validate: (input) => input.length > 0 || 'Heading is required',
    },
  ]);

  const { ctaDescription } = await inquirer.prompt([
    {
      type: 'input',
      name: 'ctaDescription',
      message: 'CTA description:',
      default: 'Join thousands of satisfied customers today.',
      validate: (input) => input.length > 0 || 'Description is required',
    },
  ]);

  config.set('cta.heading', ctaHeading);
  config.set('cta.description', ctaDescription);

  if (ctaType === 'form') {
    const { buttonText, placeholder, privacy } = await inquirer.prompt([
      {
        type: 'input',
        name: 'buttonText',
        message: 'Button text:',
        default: 'Get Started Free',
        validate: (input) => input.length > 0 || 'Button text is required',
      },
      {
        type: 'input',
        name: 'placeholder',
        message: 'Email placeholder:',
        default: 'Enter your email',
      },
      {
        type: 'input',
        name: 'privacy',
        message: 'Privacy notice:',
        default: 'We respect your privacy. Unsubscribe anytime.',
      },
    ]);

    config.set('cta.form.enabled', true);
    config.set('cta.form.button.text', buttonText);
    config.set('cta.form.fields.0.placeholder', placeholder);
    config.set('cta.form.privacyText', privacy);
  } else {
    const { url, linkText, newTab } = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Link URL:',
        validate: (input) => input.length > 0 || 'URL is required',
      },
      {
        type: 'input',
        name: 'linkText',
        message: 'Link text:',
        default: 'Get Started Now',
        validate: (input) => input.length > 0 || 'Link text is required',
      },
      {
        type: 'confirm',
        name: 'newTab',
        message: 'Open in new tab?',
        default: true,
      },
    ]);

    config.set('cta.link.url', url);
    config.set('cta.link.text', linkText);
    config.set('cta.link.openInNewTab', newTab);
  }

  await config.save();
  console.log(chalk.green('✓ CTA strategy configured!\n'));
}

async function showSummary(config: ConfigManager) {
  console.log();
  console.log(
    boxen(
      chalk.green.bold('✅ Conversion Landing Page Complete!\n\n') +
      chalk.white('Your landing page has been configured with:\n\n') +
      chalk.cyan('• Hero section with conversion-focused headline\n') +
      chalk.cyan('• How It Works (3-step process)\n') +
      chalk.cyan('• Benefits/Features section\n') +
      chalk.cyan('• Social proof (metrics & trust badges)\n') +
      chalk.cyan('• FAQ (objection handling)\n') +
      chalk.cyan('• Money-back guarantee\n') +
      chalk.cyan('• Strategic CTA placement\n\n') +
      chalk.yellow('Formula: Purchase Rate = Desire - (Labor + Confusion)\n') +
      chalk.gray('✓ Maximized desire with compelling benefits\n') +
      chalk.gray('✓ Reduced labor with clear 3-step process\n') +
      chalk.gray('✓ Eliminated confusion with FAQ & guarantee\n\n') +
      chalk.white.bold('Next steps:\n') +
      chalk.white('1. Run ') +
      chalk.cyan.bold('pnpm dev') +
      chalk.white(' to preview\n') +
      chalk.white('2. Customize in ') +
      chalk.cyan('content/landing.yaml') +
      chalk.white('\n3. Deploy when ready!'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'double',
        borderColor: 'green',
      }
    )
  );
}
