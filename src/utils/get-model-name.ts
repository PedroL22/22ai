import type { ModelsIds, ModelsNames } from '~/types/models'

export const getModelName = (modelId: ModelsIds): ModelsNames => {
  const modelNames: Record<ModelsIds, ModelsNames> = {
    // Free models
    'google/gemma-3-27b-it:free': 'Gemma 3 27B',
    'google/gemma-3-12b-it:free': 'Gemma 3 12B',
    'openai/gpt-oss-120b:free': 'GPT-OSS 120B',
    'meta-llama/llama-3.3-70b-instruct:free': 'Llama 3.3 70B Instruct',
    'meta-llama/llama-3.1-405b-instruct:free': 'Llama 3.1 405B Instruct',
    'deepseek/deepseek-r1-0528:free': 'DeepSeek R1 0528',
    'qwen/qwen3-coder:free': 'Qwen3 Coder',
    'qwen/qwen-2.5-vl-7b-instruct:free': 'Qwen2.5 VL 7B',
    // BYOK models
    'openai/gpt-5.2:byok': 'GPT 5.2',
    'openai/gpt-5-mini:byok': 'GPT 5 Mini',
    'openai/o4-mini:byok': 'o4 mini',
    'anthropic/claude-4-sonnet:byok': 'Claude 4 Sonnet',
    'anthropic/claude-4-opus:byok': 'Claude 4 Opus',
    'anthropic/claude-3.7-sonnet:byok': 'Claude 3.7 Sonnet',
    'google/gemini-3-pro:byok': 'Gemini 3 Pro',
    'google/gemini-3-flash:byok': 'Gemini 3 Flash',
    'grok/grok-4:byok': 'Grok 4',
    'deepseek/deepseek-v3.2:byok': 'DeepSeek V3.2',
  }

  return modelNames[modelId] || modelId
}
