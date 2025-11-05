import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { Ollama } from 'ollama';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import {
  getCopywritingPrompt,
  getHookStoryOfferPrompt,
  getIdeaGenerationPrompt,
} from './prompt-templates.js';

dotenv.config();

interface RewriteOptions {
  section: string;
  tone: string;
  keywords: string[];
}

interface HSOOptions {
  context: string;
  backstory: {
    lowPoint: string;
    solution: string;
    currentState: string;
  };
  offer: string;
  tone?: string;
}

export type LLMProvider = 'openai' | 'claude' | 'ollama';

interface LLMConfig {
  provider: LLMProvider;
  openaiApiKey?: string;
  claudeApiKey?: string;
  ollamaModel?: string;
  ollamaBaseUrl?: string;
}

export class AIAssistant {
  private openai: OpenAI | null = null;
  private claude: Anthropic | null = null;
  private ollama: Ollama | null = null;
  private envPath: string;
  private config: LLMConfig;

  constructor() {
    this.envPath = path.join(process.cwd(), '.env.local');
    this.config = this.loadConfig();
    this.initializeClients();
  }

  private loadConfig(): LLMConfig {
    const defaultConfig: LLMConfig = {
      provider: 'openai',
      ollamaModel: 'granite4:latest',
      ollamaBaseUrl: 'http://localhost:11434',
    };

    try {
      if (fs.existsSync(this.envPath)) {
        const envConfig = dotenv.parse(fs.readFileSync(this.envPath));

        return {
          provider: (envConfig.LLM_PROVIDER as LLMProvider) || defaultConfig.provider,
          openaiApiKey: envConfig.OPENAI_API_KEY,
          claudeApiKey: envConfig.ANTHROPIC_API_KEY,
          ollamaModel: envConfig.OLLAMA_MODEL || defaultConfig.ollamaModel,
          ollamaBaseUrl: envConfig.OLLAMA_BASE_URL || defaultConfig.ollamaBaseUrl,
        };
      }
    } catch (error) {
      // Silently fail if .env.local doesn't exist
    }

    return defaultConfig;
  }

  private initializeClients(): void {
    // Initialize OpenAI
    if (this.config.openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: this.config.openaiApiKey,
      });
    }

    // Initialize Claude
    if (this.config.claudeApiKey) {
      this.claude = new Anthropic({
        apiKey: this.config.claudeApiKey,
      });
    }

    // Initialize Ollama (always available if running locally)
    try {
      this.ollama = new Ollama({
        host: this.config.ollamaBaseUrl,
      });
    } catch (error) {
      // Ollama not available
    }
  }

  isConfigured(): boolean {
    switch (this.config.provider) {
      case 'openai':
        return this.openai !== null;
      case 'claude':
        return this.claude !== null;
      case 'ollama':
        return this.ollama !== null;
      default:
        return false;
    }
  }

  getCurrentProvider(): LLMProvider {
    return this.config.provider;
  }

  getProviderStatus(): { provider: LLMProvider; configured: boolean }[] {
    return [
      { provider: 'openai', configured: this.openai !== null },
      { provider: 'claude', configured: this.claude !== null },
      { provider: 'ollama', configured: this.ollama !== null },
    ];
  }

  getApiKey(provider: LLMProvider): string | null {
    if (!fs.existsSync(this.envPath)) {
      return null;
    }

    try {
      const envConfig = dotenv.parse(fs.readFileSync(this.envPath));
      let key: string | undefined;

      switch (provider) {
        case 'openai':
          key = envConfig.OPENAI_API_KEY;
          break;
        case 'claude':
          key = envConfig.ANTHROPIC_API_KEY;
          break;
        case 'ollama':
          return this.config.ollamaModel || 'granite4:latest';
      }

      return key ? `${key.substring(0, 8)}...${key.substring(key.length - 4)}` : null;
    } catch {
      return null;
    }
  }

  setProvider(provider: LLMProvider): void {
    this.updateEnv('LLM_PROVIDER', provider);
    this.config.provider = provider;
  }

  setApiKey(provider: LLMProvider, apiKey: string): void {
    switch (provider) {
      case 'openai':
        this.updateEnv('OPENAI_API_KEY', apiKey);
        this.openai = new OpenAI({ apiKey });
        break;
      case 'claude':
        this.updateEnv('ANTHROPIC_API_KEY', apiKey);
        this.claude = new Anthropic({ apiKey });
        break;
      case 'ollama':
        // For Ollama, apiKey is actually the model name
        this.updateEnv('OLLAMA_MODEL', apiKey);
        this.config.ollamaModel = apiKey;
        break;
    }
  }

  setOllamaConfig(model: string, baseUrl?: string): void {
    this.updateEnv('OLLAMA_MODEL', model);
    if (baseUrl) {
      this.updateEnv('OLLAMA_BASE_URL', baseUrl);
    }
    this.config.ollamaModel = model;
    this.config.ollamaBaseUrl = baseUrl || this.config.ollamaBaseUrl;
    this.ollama = new Ollama({ host: this.config.ollamaBaseUrl });
  }

  async getOllamaModels(): Promise<string[]> {
    try {
      if (!this.ollama) {
        this.ollama = new Ollama({ host: this.config.ollamaBaseUrl });
      }

      const response = await this.ollama.list();
      return response.models.map((model: any) => model.name);
    } catch (error) {
      // Ollama not running or not installed
      return [];
    }
  }

  async isOllamaInstalled(): Promise<boolean> {
    try {
      // Try to connect to Ollama
      if (!this.ollama) {
        this.ollama = new Ollama({ host: this.config.ollamaBaseUrl });
      }

      // Attempt to list models - if this succeeds, Ollama is installed and running
      await this.ollama.list();
      return true;
    } catch (error: any) {
      // Check if it's a connection error (Ollama not running/installed)
      // vs other errors
      if (error.cause?.code === 'ECONNREFUSED' || error.message?.includes('ECONNREFUSED')) {
        return false;
      }
      // If we get here, Ollama might be installed but having other issues
      return false;
    }
  }

  async isOllamaAvailable(): Promise<boolean> {
    try {
      const models = await this.getOllamaModels();
      return models.length > 0;
    } catch {
      return false;
    }
  }

  private updateEnv(key: string, value: string): void {
    let envContent = '';

    if (fs.existsSync(this.envPath)) {
      envContent = fs.readFileSync(this.envPath, 'utf8');
    }

    const lines = envContent.split('\n');
    let found = false;

    const updatedLines = lines.map((line) => {
      if (line.startsWith(`${key}=`)) {
        found = true;
        return `${key}=${value}`;
      }
      return line;
    });

    if (!found) {
      updatedLines.push(`${key}=${value}`);
    }

    fs.writeFileSync(this.envPath, updatedLines.join('\n'), 'utf8');
  }

  private async callLLM(prompt: string, systemPrompt?: string): Promise<string> {
    switch (this.config.provider) {
      case 'openai':
        return this.callOpenAI(prompt, systemPrompt);
      case 'claude':
        return this.callClaude(prompt, systemPrompt);
      case 'ollama':
        return this.callOllama(prompt, systemPrompt);
      default:
        throw new Error(`Unsupported LLM provider: ${this.config.provider}`);
    }
  }

  private async callOpenAI(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }

    messages.push({ role: 'user', content: prompt });

    const completion = await this.openai.chat.completions.create({
      model: 'gpt-5-turbo',
      messages,
      temperature: 0.8,
      max_tokens: 2000,
    });

    return completion.choices[0]?.message?.content || '';
  }

  private async callClaude(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.claude) {
      throw new Error('Claude API key not configured');
    }

    const response = await this.claude.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      temperature: 0.8,
      system: systemPrompt || 'You are a helpful assistant.',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type === 'text') {
      return content.text;
    }

    throw new Error('Unexpected response format from Claude');
  }

  private async callOllama(prompt: string, systemPrompt?: string): Promise<string> {
    if (!this.ollama) {
      throw new Error('Ollama not available. Make sure Ollama is running locally.');
    }

    const fullPrompt = systemPrompt
      ? `${systemPrompt}\n\n${prompt}`
      : prompt;

    const response = await this.ollama.generate({
      model: this.config.ollamaModel || 'granite4:latest',
      prompt: fullPrompt,
      stream: false,
    });

    return response.response;
  }

  async rewriteCopy(
    originalCopy: string,
    options: RewriteOptions
  ): Promise<string[]> {
    if (!this.isConfigured()) {
      throw new Error(`${this.config.provider} not configured`);
    }

    const { section, tone, keywords } = options;

    const sectionDescriptions: Record<string, string> = {
      headline: 'main headline that captures attention and communicates value',
      subheadline: 'supporting subheadline that expands on the value proposition',
      'cta-heading': 'call-to-action heading that motivates users to take action',
      'cta-description': 'call-to-action description that provides context',
    };

    // Use centralized prompt template
    const promptTemplate = getCopywritingPrompt({
      originalCopy,
      section,
      tone,
      keywords,
      sectionDescription: sectionDescriptions[section],
    });

    try {
      const content = await this.callLLM(promptTemplate.userPrompt, promptTemplate.systemPrompt);

      // Try to parse as JSON
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // If not valid JSON, try to extract from markdown code blocks
        const jsonMatch = content.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        }

        // Fallback: split by newlines and filter
        return content
          .split('\n')
          .filter((line) => line.trim().length > 0)
          .slice(0, 3);
      }

      return [content];
    } catch (error) {
      console.error(`${this.config.provider} API Error:`, error);
      throw error;
    }
  }

  async generateIdeas(type: 'headline' | 'feature' | 'testimonial'): Promise<string[]> {
    if (!this.isConfigured()) {
      throw new Error(`${this.config.provider} not configured`);
    }

    // Use centralized prompt template
    const promptTemplate = getIdeaGenerationPrompt(type);

    try {
      const content = await this.callLLM(promptTemplate.userPrompt, promptTemplate.systemPrompt);
      return content.split('\n').filter((line) => line.trim().length > 0);
    } catch (error) {
      console.error(`${this.config.provider} API Error:`, error);
      throw error;
    }
  }

  async generateHookStoryOffer(options: HSOOptions): Promise<{
    hook: string;
    story: string;
    offerHeading: string;
    features: string[];
    guarantee: string;
  }> {
    if (!this.isConfigured()) {
      throw new Error(`${this.config.provider} not configured`);
    }

    const tone = options.tone || 'Professional';

    // Use centralized prompt template
    const promptTemplate = getHookStoryOfferPrompt({
      context: options.context,
      backstory: options.backstory,
      offer: options.offer,
      tone,
    });

    try {
      const content = await this.callLLM(promptTemplate.userPrompt, promptTemplate.systemPrompt);

      // Try to parse JSON directly
      try {
        const parsed = JSON.parse(content);
        return {
          hook: parsed.hook || '',
          story: parsed.story || '',
          offerHeading: parsed.offerHeading || '',
          features: parsed.features || [],
          guarantee: parsed.guarantee || '',
        };
      } catch {
        // Try to extract JSON from markdown code blocks
        const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          return {
            hook: parsed.hook || '',
            story: parsed.story || '',
            offerHeading: parsed.offerHeading || '',
            features: parsed.features || [],
            guarantee: parsed.guarantee || '',
          };
        }

        throw new Error('Could not parse JSON response from LLM');
      }
    } catch (error) {
      console.error(`${this.config.provider} API Error:`, error);
      throw error;
    }
  }
}
