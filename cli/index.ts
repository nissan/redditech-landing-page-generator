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
import { conversionWizardFlow } from './conversion-wizard.js';

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
  console.clear();

  const title = figlet.textSync('Redditech LPG', {
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
          name: chalk.magenta('📖 Generate Hook-Story-Offer (AI)'),
          value: 'hook-story-offer',
        },
        {
          name: chalk.cyan('🚀 Build Conversion-Optimized Landing Page (NEW)'),
          value: 'conversion-wizard',
        },
        {
          name: chalk.yellow('👁️  Preview site (live reload)'),
          value: 'preview',
        },
        {
          name: chalk.magenta('⚙️  Settings'),
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
    const provider = ai.getCurrentProvider();
    console.log(
      boxen(
        chalk.yellow(`⚠️  ${provider} is not configured\n\n`) +
        chalk.gray('Please configure your LLM provider in Settings first'),
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

  const currentProvider = ai.getCurrentProvider();
  console.log(chalk.cyan.bold('\n🤖 AI Copywriting Assistant\n'));
  console.log(chalk.gray(`Using: ${currentProvider}\n`));

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
  const currentProvider = ai.getCurrentProvider();
  const providerStatus = ai.getProviderStatus();

  // Check if Ollama is installed
  const checkingSpinner = createSpinner('Checking Ollama installation...').start();
  const ollamaInstalled = await ai.isOllamaInstalled();
  checkingSpinner.stop();

  // Build choices with status indicators
  const choices = [
    {
      name: chalk.magenta('🔧 Select LLM Provider'),
      value: 'select-provider',
    },
    { name: chalk.gray('─'.repeat(40)), disabled: true },
  ];

  providerStatus.forEach((status) => {
    const icon = status.configured ? chalk.green('✓') : chalk.yellow('○');
    const current = status.provider === currentProvider ? chalk.cyan(' (active)') : '';
    let label = '';
    let disabled = false;

    if (status.provider === 'openai') {
      label = 'OpenAI API Key';
    } else if (status.provider === 'claude') {
      label = 'Claude API Key';
    } else if (status.provider === 'ollama') {
      if (ollamaInstalled) {
        label = 'Ollama Configuration';
      } else {
        label = 'Ollama Configuration ' + chalk.red('(not installed)');
        disabled = true;
      }
    }

    choices.push({
      name: `${icon} ${label}${current}`,
      value: `config-${status.provider}`,
      disabled: disabled ? 'Ollama is not installed or not running' : false,
    } as any);
  });

  choices.push({ name: chalk.gray('← Back'), value: 'back' });

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to configure?',
      choices,
    },
  ]);

  if (action === 'back') return;

  if (action === 'select-provider') {
    // Build provider choices
    const providerChoices: any[] = [
      {
        name: chalk.blue('OpenAI (GPT-4o-mini)') + chalk.gray(' - Requires API key'),
        value: 'openai',
      },
      {
        name: chalk.magenta('Claude (Haiku 3.5)') + chalk.gray(' - Requires API key'),
        value: 'claude',
      },
    ];

    if (ollamaInstalled) {
      providerChoices.push({
        name: chalk.green('Ollama (Local LLM)') + chalk.gray(' - Free, runs locally'),
        value: 'ollama',
      });
    } else {
      providerChoices.push({
        name: chalk.gray('Ollama (Local LLM)') + chalk.red(' - Not installed'),
        value: 'ollama',
        disabled: 'Install Ollama from https://ollama.com',
      });
    }

    const { provider } = await inquirer.prompt([
      {
        type: 'list',
        name: 'provider',
        message: 'Select your preferred LLM provider:',
        choices: providerChoices,
        default: currentProvider,
      },
    ]);

    ai.setProvider(provider);
    console.log(chalk.green(`\n✓ LLM provider set to: ${provider}`));

    // Check if the selected provider is configured
    const isConfigured = ai.isConfigured();
    if (!isConfigured) {
      console.log(
        boxen(
          chalk.yellow(`⚠️  ${provider} is not configured yet\n\n`) +
          chalk.gray('Please configure it from the settings menu'),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'yellow',
          }
        )
      );
    }
  }

  if (action === 'config-openai') {
    const { apiKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: 'Enter your OpenAI API key:',
        mask: '*',
      },
    ]);

    if (apiKey) {
      const spinner = createSpinner('Saving OpenAI API key...').start();
      await sleep(500);

      try {
        ai.setApiKey('openai', apiKey);
        spinner.success({ text: chalk.green('OpenAI API key saved!') });
      } catch (error) {
        spinner.error({ text: chalk.red('Failed to save API key') });
      }
    }
  }

  if (action === 'config-claude') {
    const { apiKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'apiKey',
        message: 'Enter your Anthropic Claude API key:',
        mask: '*',
      },
    ]);

    if (apiKey) {
      const spinner = createSpinner('Saving Claude API key...').start();
      await sleep(500);

      try {
        ai.setApiKey('claude', apiKey);
        spinner.success({ text: chalk.green('Claude API key saved!') });
      } catch (error) {
        spinner.error({ text: chalk.red('Failed to save API key') });
      }
    }
  }

  if (action === 'config-ollama') {
    console.log(chalk.gray('\nOllama runs locally on your machine'));
    console.log(chalk.gray('Make sure Ollama is installed and running\n'));

    // Check if Ollama is available and get models
    const checkSpinner = createSpinner('Checking for available Ollama models...').start();
    const availableModels = await ai.getOllamaModels();

    if (availableModels.length === 0) {
      checkSpinner.warn({ text: chalk.yellow('No Ollama models found') });
      console.log(
        boxen(
          chalk.yellow('⚠️  Ollama is not running or no models installed\n\n') +
          chalk.white('1. Install Ollama from https://ollama.com\n') +
          chalk.white('2. Start Ollama: ') + chalk.cyan('ollama serve\n') +
          chalk.white('3. Pull a model: ') + chalk.cyan('ollama pull granite4:latest'),
          {
            padding: 1,
            margin: 1,
            borderStyle: 'round',
            borderColor: 'yellow',
          }
        )
      );

      // Still allow manual configuration
      const { continueManual } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'continueManual',
          message: 'Configure manually anyway?',
          default: false,
        },
      ]);

      if (!continueManual) return;
    } else {
      checkSpinner.success({ text: chalk.green(`Found ${availableModels.length} Ollama model(s)`) });

      // Show available models
      console.log(chalk.gray('\nAvailable models:'));
      availableModels.forEach((model) => {
        console.log(chalk.cyan(`  • ${model}`));
      });
      console.log();
    }

    // Prompt for model selection
    const modelPrompt: any = {
      name: 'model',
      message: 'Select or enter Ollama model:',
    };

    if (availableModels.length > 0) {
      // Use list selection if models available
      modelPrompt.type = 'list';
      modelPrompt.choices = [
        ...availableModels.map((model) => ({ name: model, value: model })),
        { name: chalk.gray('Enter custom model name'), value: '__custom__' },
      ];
      modelPrompt.default = ai.getApiKey('ollama') || availableModels[0];
    } else {
      // Use text input if no models found
      modelPrompt.type = 'input';
      modelPrompt.default = ai.getApiKey('ollama') || 'granite4:latest';
    }

    let selectedModel = (await inquirer.prompt([modelPrompt])).model;

    // If custom option selected, prompt for model name
    if (selectedModel === '__custom__') {
      const { customModel } = await inquirer.prompt([
        {
          type: 'input',
          name: 'customModel',
          message: 'Enter model name:',
          default: 'granite4:latest',
          validate: (input) => input.trim().length > 0 || 'Model name is required',
        },
      ]);
      selectedModel = customModel;
    }

    const { baseUrl } = await inquirer.prompt([
      {
        type: 'input',
        name: 'baseUrl',
        message: 'Ollama base URL:',
        default: 'http://localhost:11434',
      },
    ]);

    const spinner = createSpinner('Configuring Ollama...').start();
    await sleep(500);

    try {
      ai.setOllamaConfig(selectedModel, baseUrl);
      spinner.success({ text: chalk.green('Ollama configured!') });

      // Check if selected model is available
      if (availableModels.length > 0 && !availableModels.includes(selectedModel)) {
        console.log(
          boxen(
            chalk.yellow(`⚠️  Model "${selectedModel}" not found locally\n\n`) +
            chalk.white('Pull the model: ') + chalk.cyan(`ollama pull ${selectedModel}`),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: 'yellow',
            }
          )
        );
      } else {
        console.log(
          boxen(
            chalk.green('✓ Ollama configured successfully!\n\n') +
            chalk.white('Model: ') + chalk.cyan(selectedModel) + '\n' +
            chalk.gray('Ready to use for AI features'),
            {
              padding: 1,
              margin: 1,
              borderStyle: 'round',
              borderColor: 'green',
            }
          )
        );
      }
    } catch (error) {
      spinner.error({ text: chalk.red('Failed to configure Ollama') });
    }
  }
}

async function hookStoryOfferFlow() {
  const ai = new AIAssistant();

  if (!ai.isConfigured()) {
    const provider = ai.getCurrentProvider();
    console.log(
      boxen(
        chalk.yellow(`⚠️  ${provider} is not configured\n\n`) +
        chalk.gray('Please configure your LLM provider in Settings first'),
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

  const currentProvider = ai.getCurrentProvider();
  console.log(chalk.cyan.bold('\n📖 Hook-Story-Offer Framework Generator\n'));
  console.log(chalk.gray(`Based on Russell Brunson's proven framework`));
  console.log(chalk.gray(`Using: ${currentProvider}\n`));

  // Context
  console.log(chalk.yellow('── Context ──\n'));
  const { context } = await inquirer.prompt([
    {
      type: 'input',
      name: 'context',
      message: 'Describe your business/product context:',
      validate: (input) => input.trim().length > 0 || 'Context is required',
    },
  ]);

  // Backstory
  console.log(chalk.yellow('\n── Your Backstory ──\n'));
  const backstory = await inquirer.prompt([
    {
      type: 'input',
      name: 'lowPoint',
      message: 'What was your low point? (I used to be a...):',
      validate: (input) => input.trim().length > 0 || 'Low point is required',
    },
    {
      type: 'input',
      name: 'solution',
      message: 'What solution did you find? (then I found...):',
      validate: (input) => input.trim().length > 0 || 'Solution is required',
    },
    {
      type: 'input',
      name: 'currentState',
      message: 'Where are you now? (and now I help others...):',
      validate: (input) => input.trim().length > 0 || 'Current state is required',
    },
  ]);

  // Offer
  console.log(chalk.yellow('\n── Your Offer ──\n'));
  const { offer } = await inquirer.prompt([
    {
      type: 'input',
      name: 'offer',
      message: 'Describe your offer (product/service details):',
      validate: (input) => input.trim().length > 0 || 'Offer is required',
    },
  ]);

  // Tone
  const { tone } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tone',
      message: 'What tone should the copy have?',
      choices: [
        'Professional',
        'Casual & Friendly',
        'Urgent & Compelling',
        'Inspirational',
        'Empathetic & Authentic',
      ],
      default: 'Empathetic & Authentic',
    },
  ]);

  // Optional pricing
  console.log(chalk.yellow('\n── Pricing (Optional) ──\n'));
  const pricing = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'hasPricing',
      message: 'Do you want to include pricing?',
      default: false,
    },
  ]);

  let pricingDetails = null;
  if (pricing.hasPricing) {
    pricingDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'originalPrice',
        message: 'Original price (e.g., $99):',
      },
      {
        type: 'input',
        name: 'discountedPrice',
        message: 'Discounted price (e.g., $49):',
      },
      {
        type: 'input',
        name: 'urgencyText',
        message: 'Urgency text (e.g., "Limited Time Only"):',
        default: 'Limited Time Offer',
      },
    ]);
  }

  // Generate with AI
  const spinner = createSpinner('🤖 AI is crafting your Hook-Story-Offer...').start();

  try {
    const result = await ai.generateHookStoryOffer({
      context,
      backstory,
      offer,
      tone,
    });

    spinner.success({ text: chalk.green('Generated Hook-Story-Offer!') });

    // Display results
    console.log(chalk.yellow('\n── The Hook ──\n'));
    console.log(
      boxen(chalk.cyan(result.hook), {
        padding: 1,
        margin: 0.5,
        borderStyle: 'round',
        borderColor: 'cyan',
      })
    );

    console.log(chalk.yellow('\n── The Story ──\n'));
    console.log(
      boxen(chalk.white(result.story), {
        padding: 1,
        margin: 0.5,
        borderStyle: 'round',
        borderColor: 'blue',
      })
    );

    console.log(chalk.yellow('\n── The Offer ──\n'));
    console.log(chalk.white.bold(result.offerHeading));
    console.log();
    result.features.forEach((feature, i) => {
      console.log(chalk.green(`  ✓ ${feature}`));
    });
    console.log();
    console.log(chalk.gray('Guarantee: ' + result.guarantee));

    // Ask to save
    const { save } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'save',
        message: 'Save this to your landing page configuration?',
        default: true,
      },
    ]);

    if (save) {
      const config = new ConfigManager();

      config.set('hookStoryOffer.enabled', true);
      config.set('hookStoryOffer.hook.text', result.hook);
      config.set('hookStoryOffer.story.text', result.story);
      config.set('hookStoryOffer.offer.heading', result.offerHeading);
      config.set('hookStoryOffer.offer.features', result.features);
      config.set('hookStoryOffer.offer.guarantee', result.guarantee);
      config.set('hookStoryOffer.offer.cta.text', 'Get Started Now');

      if (pricingDetails) {
        config.set('hookStoryOffer.offer.pricing.originalPrice', pricingDetails.originalPrice);
        config.set('hookStoryOffer.offer.pricing.discountedPrice', pricingDetails.discountedPrice);
        config.set('hookStoryOffer.offer.pricing.urgencyText', pricingDetails.urgencyText);
      }

      config.save();

      console.log(
        boxen(
          chalk.white('✅ Hook-Story-Offer saved to configuration!\n\n') +
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
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to generate Hook-Story-Offer') });
    console.error(chalk.red('\nError:'), error instanceof Error ? error.message : 'Unknown error');
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
      case 'hook-story-offer':
        await hookStoryOfferFlow();
        break;
      case 'conversion-wizard':
        await conversionWizardFlow();
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
