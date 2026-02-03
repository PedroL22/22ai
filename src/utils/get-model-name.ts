import type { ModelsIds, ModelsNames } from '~/types/models'

export const getModelName = (modelId: ModelsIds): ModelsNames => {
  const modelNames: Record<ModelsIds, ModelsNames> = {
    // Free models
    'openai/gpt-oss-120b:free': 'GPT-OSS 120B',
    'openai/gpt-oss-20b:free': 'GPT-OSS 20B',
    'google/gemma-3-27b-it:free': 'Gemma 3 27B',
    'google/gemma-3-12b-it:free': 'Gemma 3 12B',
    'meta-llama/llama-3.3-70b-instruct:free': 'Llama 3.3 70B Instruct',
    'meta-llama/llama-3.2-3b-instruct:free': 'Llama 3.2 3B Instruct',
    'deepseek/deepseek-r1-0528:free': 'DeepSeek R1 0528',
    'qwen/qwen3-next-80b-a3b-instruct:free': 'Qwen3 Next 80B A3B Instruct',
    'qwen/qwen3-coder:free': 'Qwen3 Coder',
    'z-ai/glm-4.5-air:free': 'GLM 4.5 Air',
    // BYOK models
    'openai/gpt-5.2:byok': 'GPT 5.2',
    'openai/gpt-5-mini:byok': 'GPT 5 Mini',
    'openai/o4-mini:byok': 'o4 mini',
    'anthropic/claude-4-sonnet:byok': 'Claude 4 Sonnet',
    'anthropic/claude-4-opus:byok': 'Claude 4 Opus',
    'anthropic/claude-3.7-sonnet:byok': 'Claude 3.7 Sonnet',
    'google/gemini-3-flash-preview:byok': 'Gemini 3 Flash Preview',
    'google/gemini-2.5-flash:byok': 'Gemini 2.5 Flash',
    'google/gemini-2.5-pro:byok': 'Gemini 2.5 Pro',
    'google/gemini-2.5-flash-lite:byok': 'Gemini 2.5 Flash Lite',
    'google/gemini-2.0-flash:byok': 'Gemini 2.0 Flash',
    'grok/grok-4:byok': 'Grok 4',
  }

  return modelNames[modelId] || modelId
}
