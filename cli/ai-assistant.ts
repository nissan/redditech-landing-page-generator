import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

interface RewriteOptions {
  section: string;
  tone: string;
  keywords: string[];
}

export class AIAssistant {
  private openai: OpenAI | null = null;
  private envPath: string;

  constructor() {
    this.envPath = path.join(process.cwd(), '.env.local');
    this.loadEnv();
  }

  private loadEnv(): void {
    try {
      if (fs.existsSync(this.envPath)) {
        const envConfig = dotenv.parse(fs.readFileSync(this.envPath));
        if (envConfig.OPENAI_API_KEY) {
          this.openai = new OpenAI({
            apiKey: envConfig.OPENAI_API_KEY,
          });
        }
      }
    } catch (error) {
      // Silently fail if .env.local doesn't exist
    }
  }

  isConfigured(): boolean {
    return this.openai !== null;
  }

  getApiKey(): string | null {
    if (!fs.existsSync(this.envPath)) {
      return null;
    }

    try {
      const envConfig = dotenv.parse(fs.readFileSync(this.envPath));
      const key = envConfig.OPENAI_API_KEY;
      return key ? `${key.substring(0, 8)}...${key.substring(key.length - 4)}` : null;
    } catch {
      return null;
    }
  }

  setApiKey(apiKey: string): void {
    let envContent = '';

    if (fs.existsSync(this.envPath)) {
      envContent = fs.readFileSync(this.envPath, 'utf8');
    }

    // Update or add OPENAI_API_KEY
    const lines = envContent.split('\n');
    let found = false;

    const updatedLines = lines.map((line) => {
      if (line.startsWith('OPENAI_API_KEY=')) {
        found = true;
        return `OPENAI_API_KEY=${apiKey}`;
      }
      return line;
    });

    if (!found) {
      updatedLines.push(`OPENAI_API_KEY=${apiKey}`);
    }

    fs.writeFileSync(this.envPath, updatedLines.join('\n'), 'utf8');

    // Reinitialize OpenAI client
    this.openai = new OpenAI({ apiKey });
  }

  async rewriteCopy(
    originalCopy: string,
    options: RewriteOptions
  ): Promise<string[]> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const { section, tone, keywords } = options;

    const sectionDescriptions: Record<string, string> = {
      headline: 'main headline that captures attention and communicates value',
      subheadline: 'supporting subheadline that expands on the value proposition',
      'cta-heading': 'call-to-action heading that motivates users to take action',
      'cta-description': 'call-to-action description that provides context',
    };

    const prompt = `You are an expert copywriter specializing in landing pages.

Task: Rewrite the following copy for a ${sectionDescriptions[section]}.

Original copy: "${originalCopy}"

Requirements:
- Tone: ${tone}
- Include these keywords naturally: ${keywords.join(', ')}
- Keep it concise and impactful
- Focus on benefits, not features
- Use active voice
- Create urgency or desire

Please provide 3 different variations, each with a unique approach but maintaining the same tone.
Format your response as JSON array of strings: ["variation 1", "variation 2", "variation 3"]`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert landing page copywriter. Always respond with valid JSON arrays of strings.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 500,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Try to parse as JSON
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // If not valid JSON, split by newlines and filter
        return content
          .split('\n')
          .filter((line) => line.trim().length > 0)
          .slice(0, 3);
      }

      return [content];
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }

  async generateIdeas(type: 'headline' | 'feature' | 'testimonial'): Promise<string[]> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const prompts: Record<string, string> = {
      headline: 'Generate 5 compelling landing page headlines for a SaaS product. Focus on transformation and results.',
      feature: 'Generate 5 feature descriptions for a landing page. Each should be a title and short benefit statement.',
      testimonial: 'Generate 3 realistic testimonial quotes for a SaaS landing page. Make them specific and credible.',
    };

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompts[type],
          },
        ],
        temperature: 0.9,
      });

      const content = completion.choices[0]?.message?.content || '';
      return content.split('\n').filter((line) => line.trim().length > 0);
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
}
