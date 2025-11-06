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
export declare class AIAssistant {
    private openai;
    private claude;
    private ollama;
    private envPath;
    private config;
    constructor();
    private loadConfig;
    private initializeClients;
    isConfigured(): boolean;
    getCurrentProvider(): LLMProvider;
    getProviderStatus(): {
        provider: LLMProvider;
        configured: boolean;
    }[];
    getApiKey(provider: LLMProvider): string | null;
    setProvider(provider: LLMProvider): void;
    setApiKey(provider: LLMProvider, apiKey: string): void;
    setOllamaConfig(model: string, baseUrl?: string): void;
    getOllamaModels(): Promise<string[]>;
    isOllamaInstalled(): Promise<boolean>;
    isOllamaAvailable(): Promise<boolean>;
    private updateEnv;
    private callLLM;
    private callOpenAI;
    private callClaude;
    private callOllama;
    rewriteCopy(originalCopy: string, options: RewriteOptions): Promise<string[]>;
    generateIdeas(type: 'headline' | 'feature' | 'testimonial'): Promise<string[]>;
    generateHookStoryOffer(options: HSOOptions): Promise<{
        hook: string;
        story: string;
        offerHeading: string;
        features: string[];
        guarantee: string;
    }>;
    generateConversionHeadline(audience: string, painPoint: string, solution: string, formula: string): Promise<string[]>;
    generateHowItWorksSteps(productDescription: string): Promise<any[]>;
    generateFAQ(productDescription: string, targetAudience: string): Promise<any[]>;
    generateGuaranteeCopy(guaranteeType: string): Promise<string>;
}
export {};
//# sourceMappingURL=ai-assistant.d.ts.map