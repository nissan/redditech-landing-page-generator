export class AIAssistant {
    openai: OpenAI;
    claude: Anthropic;
    ollama: Ollama;
    envPath: string;
    config: {
        provider: string;
        ollamaModel: string;
        ollamaBaseUrl: string;
    };
    loadConfig(): {
        provider: string;
        ollamaModel: string;
        ollamaBaseUrl: string;
    };
    initializeClients(): void;
    isConfigured(): boolean;
    getCurrentProvider(): string;
    getProviderStatus(): {
        provider: string;
        configured: boolean;
    }[];
    getApiKey(provider: any): string;
    setProvider(provider: any): void;
    setApiKey(provider: any, apiKey: any): void;
    setOllamaConfig(model: any, baseUrl: any): void;
    getOllamaModels(): Promise<string[]>;
    isOllamaInstalled(): Promise<boolean>;
    isOllamaAvailable(): Promise<boolean>;
    updateEnv(key: any, value: any): void;
    callLLM(prompt: any, systemPrompt: any): Promise<string>;
    callOpenAI(prompt: any, systemPrompt: any): Promise<string>;
    callClaude(prompt: any, systemPrompt: any): Promise<string>;
    callOllama(prompt: any, systemPrompt: any): Promise<string>;
    rewriteCopy(originalCopy: any, options: any): Promise<any[]>;
    generateIdeas(type: any): Promise<string[]>;
    generateHookStoryOffer(options: any): Promise<{
        hook: any;
        story: any;
        offerHeading: any;
        features: any;
        guarantee: any;
    }>;
    generateConversionHeadline(audience: any, painPoint: any, solution: any, formula: any): Promise<any[]>;
    generateHowItWorksSteps(productDescription: any): Promise<any[]>;
    generateFAQ(productDescription: any, targetAudience: any): Promise<any[]>;
    generateGuaranteeCopy(guaranteeType: any): Promise<string>;
}
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { Ollama } from 'ollama';
//# sourceMappingURL=ai-assistant.d.ts.map