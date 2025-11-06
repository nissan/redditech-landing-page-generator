/**
 * Centralized prompt templates for all LLM providers
 * These templates are optimized to work well with OpenAI, Claude, and Ollama
 */
/**
 * Base system prompt that sets context for the AI assistant
 * Works well across all providers (OpenAI, Claude, Ollama)
 */
export const BASE_SYSTEM_PROMPT = `You are an expert copywriter and marketing strategist specializing in high-converting landing pages.

Your expertise includes:
- Writing compelling headlines and copy that drive conversions
- Understanding customer psychology and persuasion principles
- Creating clear, benefit-focused messaging
- Adapting tone and style to match brand voice

Guidelines:
- Always focus on benefits over features
- Use active voice and strong action words
- Keep copy concise and impactful
- Create urgency and desire when appropriate
- Be authentic and avoid hype or false claims`;
/**
 * Template for copywriting/rewrite tasks
 */
export function getCopywritingPrompt(options) {
    const systemPrompt = `${BASE_SYSTEM_PROMPT}

Task: Rewrite marketing copy to improve effectiveness and conversion potential.
Output Format: Respond ONLY with a valid JSON array of exactly 3 string variations.
Example: ["variation 1", "variation 2", "variation 3"]

Important:
- Provide exactly 3 different variations
- Each should have a unique approach
- Maintain the same tone across all variations
- Return ONLY the JSON array, no additional text`;
    const userPrompt = `Rewrite this ${options.sectionDescription}:

Original copy: "${options.originalCopy}"

Requirements:
- Tone: ${options.tone}
- Naturally incorporate these keywords: ${options.keywords.join(', ')}
- Keep it concise and impactful
- Focus on benefits, not features
- Use active voice
- Create urgency or desire

Provide 3 different variations in this exact JSON format:
["variation 1", "variation 2", "variation 3"]`;
    return { systemPrompt, userPrompt };
}
/**
 * Template for Hook-Story-Offer framework generation
 */
export function getHookStoryOfferPrompt(options) {
    const systemPrompt = `${BASE_SYSTEM_PROMPT}

Specialty: Russell Brunson's "Hook-Story-Offer" framework
Task: Generate compelling landing page copy using the proven HSO framework.
Output Format: Respond ONLY with valid JSON in the exact format specified.

Important:
- The hook must grab attention immediately
- The story must show authentic transformation
- The offer must be irresistibly compelling
- Include specific, tangible benefits (minimum 5)
- Create a strong risk-reversal guarantee
- Return ONLY valid JSON, no markdown code blocks`;
    const userPrompt = `Create Hook-Story-Offer landing page copy:

CONTEXT:
${options.context}

BACKSTORY:
- Where I was (low point): ${options.backstory.lowPoint}
- What I discovered (solution): ${options.backstory.solution}
- Where I am now (current state): ${options.backstory.currentState}

THE OFFER:
${options.offer}

FRAMEWORK REQUIREMENTS:

THE HOOK (2-4 sentences):
- Grab attention through curiosity, empathy, or promise
- Speak directly to the audience's fears/desires
- Be authentic and relatable
- Make them want to read more

THE STORY (multiple paragraphs):
- Short, action-packed, compelling
- Show the transformation journey clearly
- Each line makes them want the next
- Build credibility and relatability
- Make it personal and authentic

THE OFFER (compelling presentation):
- List 5+ specific, tangible benefits/features
- Use urgency and scarcity appropriately
- Increase perceived value
- Decrease perceived risk
- Include strong guarantee

TONE: ${options.tone}, persuasive but authentic

Respond with this exact JSON structure:
{
  "hook": "the hook text (2-4 sentences)",
  "story": "the story text (multiple paragraphs showing transformation)",
  "offerHeading": "compelling offer heading",
  "features": ["specific benefit 1", "specific benefit 2", "specific benefit 3", "specific benefit 4", "specific benefit 5"],
  "guarantee": "strong risk-reversal guarantee text"
}`;
    return { systemPrompt, userPrompt };
}
/**
 * Template for generating content ideas
 */
export function getIdeaGenerationPrompt(type) {
    const systemPrompt = `${BASE_SYSTEM_PROMPT}

Task: Generate creative, high-quality ${type} ideas for landing pages.
Output: Provide clear, actionable examples that can be used immediately.`;
    const promptMap = {
        headline: `Generate 5 compelling landing page headlines for a SaaS product.

Requirements:
- Focus on transformation and results
- Use power words that drive action
- Make each headline unique in approach
- Keep them concise (under 15 words)
- Emphasize benefits, not features

Format each on a new line, numbered 1-5.`,
        feature: `Generate 5 feature descriptions for a landing page product.

Requirements:
- Each should have a clear title and benefit statement
- Focus on customer value, not technical specs
- Make benefits specific and tangible
- Use this format: "Title: Benefit description"
- Keep each under 20 words

Format each on a new line, numbered 1-5.`,
        testimonial: `Generate 3 realistic, credible testimonial quotes for a SaaS landing page.

Requirements:
- Make them specific with concrete results
- Include details that build credibility
- Avoid generic praise
- Sound authentic, not scripted
- Mention specific benefits or outcomes

Format each on a new line, numbered 1-3.`,
    };
    return {
        systemPrompt,
        userPrompt: promptMap[type],
    };
}
/**
 * Helper to format prompts for different providers
 */
export function formatPromptForProvider(template, provider) {
    switch (provider) {
        case 'openai':
            return {
                messages: [
                    { role: 'system', content: template.systemPrompt },
                    { role: 'user', content: template.userPrompt },
                ],
            };
        case 'claude':
            return {
                system: template.systemPrompt,
                messages: [{ role: 'user', content: template.userPrompt }],
            };
        case 'ollama':
            // Ollama works best with combined system + user prompt
            return {
                prompt: `${template.systemPrompt}\n\n${template.userPrompt}`,
            };
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}
//# sourceMappingURL=prompt-templates.js.map