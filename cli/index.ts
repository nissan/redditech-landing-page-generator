#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import boxen from 'boxen';
import { ConfigManager } from './config-manager.js';
import { AIAssistant } from './ai-assistant.js';
import { previewServer } from './preview.js';

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
  console.clear();

  const title = figlet.textSync('Landing Page\nConfigurator', {
    font: 'Standard',
    horizontalLayout: 'default',
  });

  console.log(gradient.pastel.multiline(title));
  console.log();
  console.log(
    boxen(
      chalk.white.bold('✨ Configure your landing page with ease!\n') +
      chalk.gray('AI-powered copywriting • Live preview • YAML export'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
      }
    )
  );

  await sleep(500);
}

async function mainMenu() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.cyan('What would you like to do?'),
      choices: [
        {
          name: chalk.green('🎨 Configure landing page'),
          value: 'configure',
        },
        {
          name: chalk.blue('🤖 AI-powered copywriting'),
          value: 'ai-copy',
        },
        {
          name: chalk.yellow('👁️  Preview site (live reload)'),
          value: 'preview',
        },
        {
          name: chalk.magenta('⚙️  Settings (OpenAI API key)'),
          value: 'settings',
        },
        {
          name: chalk.gray('❌ Exit'),
          value: 'exit',
        },
      ],
    },
  ]);

  return answers.action;
}

async function configureFlow() {
  const config = new ConfigManager();

  console.log(chalk.cyan.bold('\n📝 Landing Page Configuration\n'));

  // Site Metadata
  console.log(chalk.yellow('── Site Metadata ──\n'));
  const metadata = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Page title (for SEO):',
      default: config.get('metadata.title'),
    },
    {
      type: 'input',
      name: 'description',
      message: 'Meta description:',
      default: config.get('metadata.description'),
    },
  ]);

  // Theme Colors
  console.log(chalk.yellow('\n── Brand Colors ──\n'));
  const theme = await inquirer.prompt([
    {
      type: 'input',
      name: 'primaryColor',
      message: 'Primary brand color (hex):',
      default: config.get('theme.primaryColor') || '#1677be',
      validate: (input) => /^#[0-9A-F]{6}$/i.test(input) || 'Please enter a valid hex color (e.g., #1677be)',
    },
    {
      type: 'input',
      name: 'accentColor',
      message: 'Accent color (hex):',
      default: config.get('theme.accentColor') || '#0f5a8a',
      validate: (input) => /^#[0-9A-F]{6}$/i.test(input) || 'Please enter a valid hex color',
    },
  ]);

  // Hero Section
  console.log(chalk.yellow('\n── Hero Section ──\n'));
  const hero = await inquirer.prompt([
    {
      type: 'input',
      name: 'headline',
      message: 'Main headline:',
      default: config.get('hero.headline'),
    },
    {
      type: 'input',
      name: 'subheadline',
      message: 'Subheadline:',
      default: config.get('hero.subheadline'),
    },
    {
      type: 'input',
      name: 'imageSrc',
      message: 'Hero image path (e.g., /hero.png):',
      default: config.get('hero.image.src') || '/guidebook-cover.png',
    },
    {
      type: 'list',
      name: 'animationType',
      message: 'Animation style:',
      choices: ['scale', 'fade', 'slide'],
      default: config.get('hero.animation.type') || 'scale',
    },
  ]);

  // CTA Section
  console.log(chalk.yellow('\n── Call-to-Action ──\n'));
  const cta = await inquirer.prompt([
    {
      type: 'input',
      name: 'heading',
      message: 'CTA heading:',
      default: config.get('cta.heading'),
    },
    {
      type: 'input',
      name: 'description',
      message: 'CTA description:',
      default: config.get('cta.description'),
    },
    {
      type: 'list',
      name: 'type',
      message: 'CTA type:',
      choices: [
        { name: 'Email form', value: 'form' },
        { name: 'Direct link', value: 'link' },
      ],
      default: config.get('cta.form.enabled') ? 'form' : 'link',
    },
  ]);

  let ctaDetails;
  if (cta.type === 'form') {
    ctaDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'buttonText',
        message: 'Submit button text:',
        default: config.get('cta.form.button.text') || 'Get Free Access',
      },
      {
        type: 'input',
        name: 'placeholder',
        message: 'Email input placeholder:',
        default: config.get('cta.form.fields.0.placeholder') || 'Enter your email address',
      },
      {
        type: 'input',
        name: 'privacyText',
        message: 'Privacy notice:',
        default: config.get('cta.form.privacyText') || 'We respect your privacy. Unsubscribe at any time.',
      },
    ]);
  } else {
    ctaDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Link URL:',
        default: config.get('cta.link.url') || 'https://example.com',
      },
      {
        type: 'input',
        name: 'linkText',
        message: 'Link text:',
        default: config.get('cta.link.text') || 'Download Now',
      },
      {
        type: 'confirm',
        name: 'openInNewTab',
        message: 'Open in new tab?',
        default: config.get('cta.link.openInNewTab') ?? true,
      },
    ]);
  }

  // Optional Sections
  console.log(chalk.yellow('\n── Optional Sections ──\n'));
  const optional = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'enableFeatures',
      message: 'Enable features section?',
      default: config.get('features.enabled') ?? false,
    },
    {
      type: 'confirm',
      name: 'enableTestimonials',
      message: 'Enable testimonials section?',
      default: config.get('testimonials.enabled') ?? false,
    },
  ]);

  // Save configuration
  const spinner = createSpinner('Saving configuration...').start();
  await sleep(500);

  config.set('metadata.title', metadata.title);
  config.set('metadata.description', metadata.description);
  config.set('theme.primaryColor', theme.primaryColor);
  config.set('theme.accentColor', theme.accentColor);
  config.set('hero.headline', hero.headline);
  config.set('hero.subheadline', hero.subheadline);
  config.set('hero.image.src', hero.imageSrc);
  config.set('hero.animation.type', hero.animationType);
  config.set('cta.heading', cta.heading);
  config.set('cta.description', cta.description);

  if (cta.type === 'form') {
    config.set('cta.form.enabled', true);
    config.set('cta.form.button.text', ctaDetails.buttonText);
    config.set('cta.form.fields.0.placeholder', ctaDetails.placeholder);
    config.set('cta.form.privacyText', ctaDetails.privacyText);
    config.delete('cta.link');
  } else {
    config.set('cta.form.enabled', false);
    config.set('cta.link.url', ctaDetails.url);
    config.set('cta.link.text', ctaDetails.linkText);
    config.set('cta.link.openInNewTab', ctaDetails.openInNewTab);
  }

  config.set('features.enabled', optional.enableFeatures);
  config.set('testimonials.enabled', optional.enableTestimonials);

  config.save();
  spinner.success({ text: chalk.green('Configuration saved successfully!') });

  console.log(
    boxen(
      chalk.white('✅ Your landing page has been configured!\n\n') +
      chalk.gray('Run ') + chalk.cyan('pnpm dev') + chalk.gray(' to see your changes'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
      }
    )
  );
}

async function aiCopywritingFlow() {
  const ai = new AIAssistant();

  if (!ai.isConfigured()) {
    console.log(
      boxen(
        chalk.yellow('⚠️  OpenAI API key not configured\n\n') +
        chalk.gray('Please set your API key in Settings first'),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'yellow',
        }
      )
    );
    return;
  }

  console.log(chalk.cyan.bold('\n🤖 AI Copywriting Assistant\n'));

  const { section } = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: 'What would you like to write/improve?',
      choices: [
        { name: '📰 Hero headline', value: 'headline' },
        { name: '📝 Hero subheadline', value: 'subheadline' },
        { name: '🎯 CTA heading', value: 'cta-heading' },
        { name: '💬 CTA description', value: 'cta-description' },
        { name: '🔙 Back to main menu', value: 'back' },
      ],
    },
  ]);

  if (section === 'back') return;

  const { currentCopy } = await inquirer.prompt([
    {
      type: 'input',
      name: 'currentCopy',
      message: 'Enter your current copy (or draft):',
    },
  ]);

  const { tone } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tone',
      message: 'What tone should the copy have?',
      choices: [
        'Professional',
        'Casual & Friendly',
        'Urgent & Compelling',
        'Technical & Precise',
        'Playful & Fun',
        'Inspirational',
      ],
    },
  ]);

  const { keywords } = await inquirer.prompt([
    {
      type: 'input',
      name: 'keywords',
      message: 'Keywords to include (comma-separated):',
    },
  ]);

  const spinner = createSpinner('🤖 AI is crafting your copy...').start();

  try {
    const suggestions = await ai.rewriteCopy(currentCopy, {
      section,
      tone,
      keywords: keywords.split(',').map((k: string) => k.trim()),
    });

    spinner.success({ text: chalk.green('Generated suggestions!') });

    console.log(chalk.yellow('\n── AI Suggestions ──\n'));
    suggestions.forEach((suggestion, index) => {
      console.log(
        boxen(
          chalk.white.bold(`Option ${index + 1}:\n\n`) + chalk.cyan(suggestion),
          {
            padding: 1,
            margin: 0.5,
            borderStyle: 'round',
            borderColor: 'cyan',
          }
        )
      );
    });

    const { selectedIndex } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedIndex',
        message: 'Choose a version (or skip):',
        choices: [
          ...suggestions.map((s, i) => ({
            name: `Option ${i + 1}: ${s.substring(0, 50)}...`,
            value: i,
          })),
          { name: chalk.gray('Skip (don\'t save)'), value: -1 },
        ],
      },
    ]);

    if (selectedIndex !== -1) {
      const config = new ConfigManager();
      const selected = suggestions[selectedIndex];

      // Map section to config path
      const configPath: Record<string, string> = {
        headline: 'hero.headline',
        subheadline: 'hero.subheadline',
        'cta-heading': 'cta.heading',
        'cta-description': 'cta.description',
      };

      config.set(configPath[section], selected);
      config.save();

      console.log(chalk.green('\n✅ Copy saved to configuration!'));
    }
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to generate suggestions') });
    console.error(chalk.red('\nError:'), error instanceof Error ? error.message : 'Unknown error');
  }
}

async function settingsFlow() {
  console.log(chalk.cyan.bold('\n⚙️  Settings\n'));

  const ai = new AIAssistant();
  const currentKey = ai.getApiKey();

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to configure?',
      choices: [
        {
          name: currentKey
            ? chalk.green('✓ OpenAI API key (configured)')
            : chalk.yellow('○ OpenAI API key (not set)'),
          value: 'openai-key',
        },
        { name: chalk.gray('← Back'), value: 'back' },
      ],
    },
  ]);

  if (action === 'back') return;

  if (action === 'openai-key') {
    const { apiKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: 'Enter your OpenAI API key:',
        mask: '*',
      },
    ]);

    if (apiKey) {
      const spinner = createSpinner('Verifying API key...').start();
      await sleep(500);

      try {
        ai.setApiKey(apiKey);
        spinner.success({ text: chalk.green('API key saved!') });
      } catch (error) {
        spinner.error({ text: chalk.red('Failed to save API key') });
      }
    }
  }
}

async function previewFlow() {
  console.log(
    boxen(
      chalk.cyan.bold('👁️  Live Preview Mode\n\n') +
      chalk.white('Starting development server...\n') +
      chalk.gray('Changes to YAML will automatically reload the page'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
      }
    )
  );

  await previewServer();
}

async function main() {
  await welcome();

  let running = true;

  while (running) {
    const action = await mainMenu();

    switch (action) {
      case 'configure':
        await configureFlow();
        break;
      case 'ai-copy':
        await aiCopywritingFlow();
        break;
      case 'preview':
        await previewFlow();
        break;
      case 'settings':
        await settingsFlow();
        break;
      case 'exit':
        console.log(
          gradient.pastel('\n✨ Thanks for using Landing Page Configurator!\n')
        );
        running = false;
        break;
    }

    if (running && action !== 'preview') {
      await sleep(500);
    }
  }
}

main().catch(console.error);
