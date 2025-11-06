/**
 * Template for copywriting/rewrite tasks
 */
export function getCopywritingPrompt(options: any): {
    systemPrompt: string;
    userPrompt: string;
};
/**
 * Template for Hook-Story-Offer framework generation
 */
export function getHookStoryOfferPrompt(options: any): {
    systemPrompt: string;
    userPrompt: string;
};
/**
 * Template for generating content ideas
 */
export function getIdeaGenerationPrompt(type: any): {
    systemPrompt: string;
    userPrompt: any;
};
/**
 * Helper to format prompts for different providers
 */
export function formatPromptForProvider(template: any, provider: any): {
    messages: {
        role: string;
        content: any;
    }[];
    system?: undefined;
    prompt?: undefined;
} | {
    system: any;
    messages: {
        role: string;
        content: any;
    }[];
    prompt?: undefined;
} | {
    prompt: string;
    messages?: undefined;
    system?: undefined;
};
/**
 * Centralized prompt templates for all LLM providers
 * These templates are optimized to work well with OpenAI, Claude, and Ollama
 */
/**
 * Base system prompt that sets context for the AI assistant
 * Works well across all providers (OpenAI, Claude, Ollama)
 */
export const BASE_SYSTEM_PROMPT: "You are an expert copywriter and marketing strategist specializing in high-converting landing pages.\n\nYour expertise includes:\n- Writing compelling headlines and copy that drive conversions\n- Understanding customer psychology and persuasion principles\n- Creating clear, benefit-focused messaging\n- Adapting tone and style to match brand voice\n\nGuidelines:\n- Always focus on benefits over features\n- Use active voice and strong action words\n- Keep copy concise and impactful\n- Create urgency and desire when appropriate\n- Be authentic and avoid hype or false claims";
//# sourceMappingURL=prompt-templates.d.ts.map