/**
 * Centralized prompt templates for all LLM providers
 * These templates are optimized to work well with OpenAI, Claude, and Ollama
 */
export interface PromptTemplate {
    systemPrompt: string;
    userPrompt: string;
}
/**
 * Base system prompt that sets context for the AI assistant
 * Works well across all providers (OpenAI, Claude, Ollama)
 */
export declare const BASE_SYSTEM_PROMPT = "You are an expert copywriter and marketing strategist specializing in high-converting landing pages.\n\nYour expertise includes:\n- Writing compelling headlines and copy that drive conversions\n- Understanding customer psychology and persuasion principles\n- Creating clear, benefit-focused messaging\n- Adapting tone and style to match brand voice\n\nGuidelines:\n- Always focus on benefits over features\n- Use active voice and strong action words\n- Keep copy concise and impactful\n- Create urgency and desire when appropriate\n- Be authentic and avoid hype or false claims";
/**
 * Template for copywriting/rewrite tasks
 */
export declare function getCopywritingPrompt(options: {
    originalCopy: string;
    section: string;
    tone: string;
    keywords: string[];
    sectionDescription: string;
}): PromptTemplate;
/**
 * Template for Hook-Story-Offer framework generation
 */
export declare function getHookStoryOfferPrompt(options: {
    context: string;
    backstory: {
        lowPoint: string;
        solution: string;
        currentState: string;
    };
    offer: string;
    tone: string;
}): PromptTemplate;
/**
 * Template for generating content ideas
 */
export declare function getIdeaGenerationPrompt(type: 'headline' | 'feature' | 'testimonial'): PromptTemplate;
/**
 * Helper to format prompts for different providers
 */
export declare function formatPromptForProvider(template: PromptTemplate, provider: 'openai' | 'claude' | 'ollama'): {
    messages?: any;
    prompt?: string;
    system?: string;
};
//# sourceMappingURL=prompt-templates.d.ts.map