# Multi-LLM Provider Guide

## Overview

The Redditech Landing Page Generator now supports **three different LLM providers**, giving you flexibility to choose based on your needs, budget, and preferences:

1. **OpenAI (GPT-5)** - Cloud-based, state-of-the-art performance
2. **Claude (Sonnet 4)** - Cloud-based, exceptional quality and reasoning
3. **Ollama (Local LLM)** - **Free**, runs on your machine, private, no API costs

## Quick Start

### 1. Configure Your LLM Provider

```bash
pnpm configure
```

Select **"Settings"** → **"Select LLM Provider"**

Choose your preferred provider:
- OpenAI (GPT-5 Turbo) - Requires API key
- Claude (Sonnet 4) - Requires API key
- Ollama (Local LLM) - Free, runs locally

### 2. Configure API Keys/Settings

After selecting a provider, configure it:

**For OpenAI:**
- Get API key from: https://platform.openai.com/
- Select "OpenAI API Key" in settings
- Enter your key

**For Claude:**
- Get API key from: https://console.anthropic.com/
- Select "Claude API Key" in settings
- Enter your key

**For Ollama:**
- Install Ollama from: https://ollama.com
- Pull a model: `ollama pull granite4:latest`
- Select "Ollama Configuration" in settings
- Choose from available local models or enter custom
- Set base URL (default: `http://localhost:11434`)

### 3. Use AI Features

All AI-powered features will now use your selected provider:
- AI Copywriting (`pnpm configure` → "AI-powered copywriting")
- Hook-Story-Offer Generation (`pnpm configure` → "Generate Hook-Story-Offer")

## Provider Comparison

| Feature | OpenAI | Claude | Ollama |
|---------|--------|--------|--------|
| **Cost** | Premium pricing | Premium pricing | **FREE** |
| **Speed** | Very Fast (~2-3s) | Very Fast (~2-3s) | Fast (~5-10s) |
| **Quality** | State-of-the-art | Exceptional | Good-Very Good |
| **Privacy** | Cloud (data sent to OpenAI) | Cloud (data sent to Anthropic) | **100% Local** |
| **Setup** | API key required | API key required | Install + download model |
| **Internet** | Required | Required | **Not required** |
| **Model** | gpt-5-turbo | claude-sonnet-4-20250514 | granite4:latest (configurable) |

## Detailed Setup Instructions

### OpenAI Setup

1. **Get API Key:**
   - Visit https://platform.openai.com/api-keys
   - Sign up or log in
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)

2. **Add to CLI:**
   ```bash
   pnpm configure → Settings → OpenAI API Key
   ```

3. **Environment Variables:**
   The key is saved to `.env.local`:
   ```bash
   OPENAI_API_KEY=sk-...your-key...
   LLM_PROVIDER=openai
   ```

4. **Cost:**
   - GPT-5 Turbo: Check OpenAI pricing page for current rates
   - State-of-the-art performance with advanced reasoning capabilities

### Claude Setup

1. **Get API Key:**
   - Visit https://console.anthropic.com/
   - Sign up or log in
   - Go to "API Keys"
   - Click "Create Key"
   - Copy the key (starts with `sk-ant-`)

2. **Add to CLI:**
   ```bash
   pnpm configure → Settings → Claude API Key
   ```

3. **Environment Variables:**
   The key is saved to `.env.local`:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-...your-key...
   LLM_PROVIDER=claude
   ```

4. **Cost:**
   - Claude Sonnet 4: Check Anthropic pricing page for current rates
   - Exceptional quality with advanced reasoning and creativity

### Ollama Setup (Recommended for Free Usage)

1. **Install Ollama:**

   **macOS:**
   ```bash
   brew install ollama
   # OR download from https://ollama.com
   ```

   **Linux:**
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

   **Windows:**
   Download from https://ollama.com

2. **Start Ollama:**
   ```bash
   ollama serve
   ```
   (This runs in the background on most systems)

3. **Download a Model:**
   ```bash
   # Recommended: Granite 4 (lightweight, ~2GB)
   ollama pull granite4:latest

   # Alternative: Llama 3.2 (3B parameters, ~2GB)
   ollama pull llama3.2

   # Alternative: Mistral (7B parameters, ~4GB, higher quality)
   ollama pull mistral

   # Alternative: Llama 3.1 (8B parameters, ~4.7GB, best quality)
   ollama pull llama3.1:8b

   # See all available models: ollama list
   ```

4. **Configure in CLI:**
   ```bash
   pnpm configure → Settings → Ollama Configuration
   # CLI will show all locally available models from `ollama list`
   # Select from the list or enter a custom model name
   # Default: granite4:latest
   Base URL: http://localhost:11434
   ```

5. **Environment Variables:**
   Saved to `.env.local`:
   ```bash
   OLLAMA_MODEL=granite4:latest
   OLLAMA_BASE_URL=http://localhost:11434
   LLM_PROVIDER=ollama
   ```

6. **Verify Ollama is Working:**
   ```bash
   ollama list  # Should show installed models
   ollama run granite4:latest "Hello"  # Test generation
   ```

## Switching Between Providers

You can switch providers at any time:

```bash
pnpm configure → Settings → Select LLM Provider
```

The CLI remembers your API keys for all providers, so you can switch freely without re-entering credentials.

## Configuration Files

All LLM settings are stored in `.env.local` (not committed to git):

```bash
# Current active provider
LLM_PROVIDER=ollama

# OpenAI (if configured)
OPENAI_API_KEY=sk-...

# Claude (if configured)
ANTHROPIC_API_KEY=sk-ant-...

# Ollama (if configured)
OLLAMA_MODEL=llama3.2
OLLAMA_BASE_URL=http://localhost:11434
```

## Recommended Models for Ollama

| Model | Size | Quality | Speed | Use Case |
|-------|------|---------|-------|----------|
| `granite4:latest` | ~2GB | Good | Fast | **Recommended - lightweight default** |
| `llama3.2` | ~2GB | Good | Fast | Alternative lightweight option |
| `mistral` | ~4GB | Very Good | Medium | Better quality, needs more RAM |
| `llama3.1:8b` | ~4.7GB | Excellent | Slower | Best quality, needs 8GB+ RAM |
| `gemma2:2b` | ~1.6GB | Decent | Very Fast | Low-resource machines |

**Note:** The CLI will automatically detect and show you all locally installed models when configuring Ollama.

To use a different model:
```bash
ollama pull mistral
pnpm configure → Settings → Ollama Configuration → Model: mistral
```

## Usage Examples

### Example 1: Hook-Story-Offer with Ollama (Free)

```bash
# Setup
ollama pull granite4:latest
pnpm configure → Settings → Select LLM Provider → Ollama
pnpm configure → Settings → Ollama Configuration
# CLI shows: granite4:latest (select it)

# Generate
pnpm configure → Generate Hook-Story-Offer (AI)
# Follow prompts...
# Generated copy saved to landing.yaml
# Cost: $0 (100% free!)
```

### Example 2: Quick Copywriting with Claude

```bash
# Setup (one-time)
pnpm configure → Settings → Claude API Key → [enter key]
pnpm configure → Settings → Select LLM Provider → Claude

# Generate
pnpm configure → AI-powered copywriting
# Select section, tone, keywords...
# Cost: ~$0.0008 per rewrite
```

### Example 3: OpenAI for Consistent Results

```bash
# Setup (one-time)
pnpm configure → Settings → OpenAI API Key → [enter key]
pnpm configure → Settings → Select LLM Provider → OpenAI

# Generate
pnpm configure → Generate Hook-Story-Offer (AI)
# Follow prompts...
# Cost: ~$0.001-0.002 per generation
```

## Troubleshooting

### "Ollama not available" Error

**Solutions:**
1. Make sure Ollama is installed: `ollama --version`
2. Start Ollama service: `ollama serve`
3. Verify it's running: `curl http://localhost:11434`
4. Check the base URL in settings matches where Ollama is running

### "API key not configured" Error

**Solutions:**
1. Go to Settings in the CLI
2. Select the provider (OpenAI/Claude)
3. Enter your API key
4. Make sure the provider is selected as active

### Slow Generation with Ollama

**Solutions:**
1. Use a smaller model: `llama3.2` instead of `llama3.1:8b`
2. Close other applications to free up RAM
3. Ensure you have enough disk space
4. Update to latest Ollama version

### Quality Issues with Ollama

**Solutions:**
1. Try a larger model: `mistral` or `llama3.1:8b`
2. Regenerate the prompt (LLMs have randomness)
3. Switch to Claude or OpenAI for higher quality (costs apply)

## Privacy Considerations

### Ollama (Most Private)
- ✅ All data stays on your machine
- ✅ No internet connection required
- ✅ No data sent to third parties
- ✅ Complete privacy

### OpenAI/Claude (Cloud-based)
- ⚠️ Your prompts are sent to OpenAI/Anthropic servers
- ⚠️ Subject to their privacy policies
- ✅ Not used for training by default (check their policies)
- ⚠️ Consider data sensitivity when using

**Recommendation:** Use Ollama if you're working with sensitive business information or prefer complete privacy.

## Cost Optimization

### Free Option
- Use **Ollama** with `llama3.2` model
- Zero cost, unlimited generations
- Trade-off: Slightly lower quality, slower

### Budget Option
- Use **Claude Haiku 3.5**
- ~$0.0008 per generation
- Best cost-to-quality ratio among cloud providers

### Premium Option
- Use **OpenAI GPT-4o-mini**
- ~$0.001-0.002 per generation
- Excellent, consistent quality

## Advanced Configuration

### Custom Ollama Port

If Ollama is running on a different port:
```bash
pnpm configure → Settings → Ollama Configuration
Base URL: http://localhost:8080  # Your custom port
```

### Using Remote Ollama

You can use Ollama running on another machine:
```bash
pnpm configure → Settings → Ollama Configuration
Base URL: http://192.168.1.100:11434  # Remote machine IP
```

### Environment Variable Override

You can also set providers via environment variables:
```bash
export LLM_PROVIDER=claude
export ANTHROPIC_API_KEY=sk-ant-...
pnpm configure
```

## FAQ

**Q: Which provider should I use?**
A: If cost is a concern, use **Ollama** (free). If you want the best quality and speed, use **Claude** (most cost-effective cloud option) or **OpenAI**.

**Q: Can I switch providers mid-project?**
A: Yes! Switch anytime in Settings. Your content remains the same.

**Q: Does Ollama work offline?**
A: Yes! After downloading the model, Ollama works completely offline.

**Q: How much RAM does Ollama need?**
A:
- `llama3.2` (2GB model): ~4GB RAM
- `mistral` (4GB model): ~8GB RAM
- `llama3.1:8b` (4.7GB model): ~10GB RAM

**Q: Can I use GPT-4 instead of GPT-4o-mini?**
A: Currently no, but you can modify `cli/ai-assistant.ts` and change the model name. Note: GPT-4 is much more expensive.

**Q: Is my API key secure?**
A: Yes, it's stored in `.env.local` which is gitignored and never committed. Only you have access to it.

## Related Documentation

- [CLI Guide](CLI_GUIDE.md) - Complete CLI documentation
- [Hook-Story-Offer Guide](HOOK_STORY_OFFER.md) - HSO framework details
- [AI Copywriting](CLI_GUIDE.md#ai-powered-copywriting) - Copywriting features

---

**Need Help?** Open an issue at: https://github.com/nissan/redditech-landing-page-generator/issues
