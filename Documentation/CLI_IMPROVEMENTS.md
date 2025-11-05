# CLI Improvements - Enhanced Ollama Integration & Prompt Templates

## Overview

Significant improvements to the CLI to make Ollama integration more robust and create a centralized prompt template system that works optimally across all LLM providers (OpenAI, Claude, and Ollama).

## Key Improvements

### 1. Ollama Installation Detection

The CLI now intelligently detects whether Ollama is installed and running:

**Before:**
- Ollama configuration option always available
- Could configure non-existent Ollama installation
- Confusing errors when Ollama not available

**After:**
- Automatic detection via `ollama list` command
- Menu option disabled if Ollama not installed
- Clear visual indicators of installation status
- Helpful installation instructions when needed

#### Implementation

```typescript
async isOllamaInstalled(): Promise<boolean>
  // Attempts to connect to Ollama
  // Returns true if `ollama list` succeeds
  // Returns false if ECONNREFUSED or other connection errors
```

#### User Experience

**When Ollama IS Installed:**
```
⚙️  Settings
🔧 Select LLM Provider
────────────────────────────────────────
✓ OpenAI API Key
✓ Claude API Key
✓ Ollama Configuration (active)
← Back
```

**When Ollama is NOT Installed:**
```
⚙️  Settings
🔧 Select LLM Provider
────────────────────────────────────────
✓ OpenAI API Key
✓ Claude API Key
○ Ollama Configuration (not installed)  [DISABLED]
← Back
```

### 2. Dynamic Model Selection from Local Installation

**Workflow:**
1. User selects "Ollama Configuration"
2. CLI runs `ollama list` to get locally available models
3. Shows all detected models in a selection list
4. User picks from their installed models
5. Option to enter custom model name

**Example:**
```bash
Checking for available Ollama models... ✓ Found 3 Ollama model(s)

Available models:
  • granite4:latest
  • granite-embedding:latest
  • nomic-embed-text:latest

Select or enter Ollama model:
> granite4:latest
  granite-embedding:latest
  nomic-embed-text:latest
  Enter custom model name
```

**Benefits:**
- No typos in model names
- Only shows what's actually available
- Validates model exists before use
- Clear feedback on model status

### 3. Centralized Prompt Template System

Created `cli/prompt-templates.ts` with optimized prompts that work across all providers.

#### Architecture

```
prompt-templates.ts
├── BASE_SYSTEM_PROMPT
│   └── Core expertise and guidelines
├── getCopywritingPrompt()
│   └── Rewriting marketing copy
├── getHookStoryOfferPrompt()
│   └── Russell Brunson HSO framework
├── getIdeaGenerationPrompt()
│   └── Headline/feature/testimonial ideas
└── formatPromptForProvider()
    └── Provider-specific formatting
```

#### Base System Prompt

```typescript
const BASE_SYSTEM_PROMPT = `You are an expert copywriter and marketing strategist specializing in high-converting landing pages.

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
```

This base prompt is prepended to all specific prompts, ensuring consistent quality across all LLM interactions.

#### Copywriting Prompt Template

Optimized for all three providers with:
- Clear task definition
- Explicit output format (JSON array)
- Specific requirements
- Tone and keyword guidance
- Benefit-focused direction

#### Hook-Story-Offer Prompt Template

Comprehensive prompt that:
- Explains HSO framework principles
- Provides clear structure for each component
- Requests specific JSON format
- Optimized for Ollama's understanding
- Works equally well with OpenAI and Claude

#### Idea Generation Prompt Template

Separate templates for:
- Headlines (5 variations)
- Features (5 variations)
- Testimonials (3 variations)

Each with specific formatting and quality guidelines.

### 4. Provider-Specific Formatting

Different LLMs expect different prompt formats:

**OpenAI (GPT-5 Turbo):**
```typescript
{
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ]
}
```

**Claude (Sonnet 4):**
```typescript
{
  system: systemPrompt,
  messages: [
    { role: 'user', content: userPrompt }
  ]
}
```

**Ollama:**
```typescript
{
  prompt: `${systemPrompt}\n\n${userPrompt}`
}
```

The template system handles these differences automatically.

## Benefits

### For Users

1. **Better Ollama Experience**
   - Clear installation status
   - No confusion about availability
   - See exactly what models are installed
   - Pick from dropdown instead of typing

2. **Consistent Quality**
   - Same high-quality prompts across all providers
   - Optimized for each provider's strengths
   - Better results from Ollama (local models)

3. **Error Prevention**
   - Can't configure non-existent Ollama
   - Can't select non-existent models
   - Clear error messages
   - Helpful guidance

### For Developers

1. **Maintainability**
   - Single source of truth for prompts
   - Easy to update and improve
   - Provider-agnostic design
   - Well-documented templates

2. **Extensibility**
   - Easy to add new prompt types
   - Easy to add new providers
   - Modular architecture
   - Reusable components

3. **Testing**
   - Prompts can be tested independently
   - Provider formatting tested separately
   - Clear separation of concerns

## Technical Details

### Files Modified

**`cli/ai-assistant.ts`:**
- Added `isOllamaInstalled()` method
- Updated `rewriteCopy()` to use templates
- Updated `generateIdeas()` to use templates
- Updated `generateHookStoryOffer()` to use templates
- Improved error handling

**`cli/index.ts`:**
- Enhanced `settingsFlow()` with Ollama detection
- Updated provider selection with status indicators
- Improved Ollama configuration flow
- Added model validation

**`cli/prompt-templates.ts` (NEW):**
- Centralized prompt definitions
- Provider-specific formatting
- Reusable template functions
- Comprehensive documentation

### Model Detection Logic

```typescript
// Check if Ollama is installed
const ollamaInstalled = await ai.isOllamaInstalled();

// Get available models
const availableModels = await ai.getOllamaModels();

// Build dynamic menu
if (ollamaInstalled) {
  choices.push({
    name: chalk.green('Ollama (Local LLM)'),
    value: 'ollama',
  });
} else {
  choices.push({
    name: chalk.gray('Ollama (Local LLM)') + chalk.red(' - Not installed'),
    value: 'ollama',
    disabled: 'Install Ollama from https://ollama.com',
  });
}
```

### Prompt Template Usage

```typescript
// Old way (duplicated across functions)
const systemPrompt = 'You are an expert copywriter...';
const prompt = `Rewrite this copy...`;
await this.callLLM(prompt, systemPrompt);

// New way (centralized templates)
const promptTemplate = getCopywritingPrompt({
  originalCopy,
  section,
  tone,
  keywords,
  sectionDescription,
});
await this.callLLM(promptTemplate.userPrompt, promptTemplate.systemPrompt);
```

## Default Model

Changed from `llama3.2` to **`granite4:latest`** based on:
- Lightweight (~2GB)
- Good quality for copywriting
- Fast inference
- Specifically verified via `ollama list`

## User Workflows

### First-Time Ollama Setup

```bash
# 1. User opens settings, sees Ollama not installed
pnpm configure → Settings
> ○ Ollama Configuration (not installed) [GRAYED OUT]

# 2. User installs Ollama
brew install ollama
ollama pull granite4:latest

# 3. User returns to CLI, now sees Ollama available
pnpm configure → Settings
> ✓ Ollama Configuration

# 4. User configures Ollama
> Select from list:
  - granite4:latest ← Selected

# 5. Ready to use!
pnpm configure → Generate Hook-Story-Offer (AI)
> Using: ollama (granite4:latest)
```

### Switching Models

```bash
# User has multiple models
ollama list
> granite4:latest
> llama3.2
> mistral

# Configure to use different model
pnpm configure → Settings → Ollama Configuration
> Select model:
  - granite4:latest
  - llama3.2  ← Select this
  - mistral

# Now using llama3.2
pnpm configure → AI-powered copywriting
> Using: ollama (llama3.2)
```

## Error Handling

### Ollama Not Running

```
⚠️ Ollama is not running or no models installed

1. Install Ollama from https://ollama.com
2. Start Ollama: ollama serve
3. Pull a model: ollama pull granite4:latest

Configure manually anyway? (y/N)
```

### Model Not Found

```
⚠️  Model "llama3.2" not found locally

Pull the model: ollama pull llama3.2
```

### Connection Errors

```
✗ Failed to connect to Ollama

Make sure Ollama is running:
  ollama serve
```

## Testing

All improvements tested with:
- ✅ Ollama installed and running
- ✅ Ollama installed but not running
- ✅ Ollama not installed
- ✅ Multiple models available
- ✅ No models available
- ✅ TypeScript compilation
- ✅ CLI build process

## Future Enhancements

Potential additions:
- Model size/performance indicators in selection
- Download prompts for missing models
- Auto-start Ollama if not running
- Model comparison/recommendations
- Performance benchmarking
- Custom prompt template override

## Migration Notes

**No Breaking Changes:**
- Existing configurations continue to work
- API-based providers unchanged
- Default model updated (better choice)
- All existing features preserved

**Improvements Are Automatic:**
- Ollama detection happens automatically
- No user action required
- Better experience out of the box

## Conclusion

These improvements make the Ollama integration:
- **More Robust**: Detects installation status
- **More User-Friendly**: Visual feedback and guidance
- **More Reliable**: Validates model availability
- **Better Quality**: Optimized prompts for all providers
- **More Maintainable**: Centralized template system

The CLI now provides a professional, error-resistant experience across all LLM providers.
