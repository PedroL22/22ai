export type ModelsIds =
  // Free models
  | 'openai/gpt-oss-120b:free'
  | 'openai/gpt-oss-20b:free'
  | 'google/gemma-3-27b-it:free'
  | 'google/gemma-3-12b-it:free'
  | 'meta-llama/llama-3.3-70b-instruct:free'
  | 'meta-llama/llama-3.2-3b-instruct:free'
  | 'deepseek/deepseek-r1-0528:free'
  | 'qwen/qwen3-next-80b-a3b-instruct:free'
  | 'qwen/qwen3-coder:free'
  | 'z-ai/glm-4.5-air:free'
  // BYOK models
  | 'openai/gpt-5.2:byok'
  | 'openai/gpt-5-mini:byok'
  | 'openai/o4-mini:byok'
  | 'anthropic/claude-4-sonnet:byok'
  | 'anthropic/claude-4-opus:byok'
  | 'anthropic/claude-3.7-sonnet:byok'
  | 'google/gemini-3-flash-preview:byok'
  | 'google/gemini-2.5-flash:byok'
  | 'google/gemini-2.5-pro:byok'
  | 'google/gemini-2.5-flash-lite:byok'
  | 'google/gemini-2.0-flash:byok'
  | 'grok/grok-4:byok'

export type ModelsNames =
  // Free models
  | 'GPT-OSS 120B'
  | 'GPT-OSS 20B'
  | 'Gemma 3 27B'
  | 'Gemma 3 12B'
  | 'Llama 3.3 70B Instruct'
  | 'Llama 3.2 3B Instruct'
  | 'DeepSeek R1 0528'
  | 'Qwen3 Next 80B A3B Instruct'
  | 'Qwen3 Coder'
  | 'GLM 4.5 Air'
  // BYOK models
  | 'GPT 5.2'
  | 'GPT 5 Mini'
  | 'o4 mini'
  | 'Claude 4 Sonnet'
  | 'Claude 4 Opus'
  | 'Claude 3.7 Sonnet'
  | 'Gemini 3 Flash Preview'
  | 'Gemini 2.5 Flash'
  | 'Gemini 2.5 Pro'
  | 'Gemini 2.5 Flash Lite'
  | 'Gemini 2.0 Flash'
  | 'Grok 4'

export type ModelsDevelopers = 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'DeepSeek' | 'xAi' | 'Alibaba' | 'Z.ai'

export type Model = {
  id: ModelsIds
  name: ModelsNames
  developer: ModelsDevelopers
  description: string
  isFree: boolean
}

export const MODELS: Model[] = [
  // Free models
  {
    id: 'openai/gpt-oss-120b:free',
    name: 'GPT-OSS 120B',
    developer: 'OpenAI',
    description:
      "OpenAI's historic open-weight model. This 117B MoE model is designed for high-reasoning and agentic workflows without API costs.",
    isFree: true,
  },
  {
    id: 'openai/gpt-oss-20b:free',
    name: 'GPT-OSS 20B',
    developer: 'OpenAI',
    description:
      "OpenAI's compact open-weight model optimized for fast responses and efficient reasoning on everyday tasks.",
    isFree: true,
  },
  {
    id: 'google/gemma-3-27b-it:free',
    name: 'Gemma 3 27B',
    developer: 'Google',
    description:
      "Google's flagship open-weight multimodal model, delivering strong visual understanding and logical reasoning in an efficient package.",
    isFree: true,
  },
  {
    id: 'google/gemma-3-12b-it:free',
    name: 'Gemma 3 12B',
    developer: 'Google',
    description:
      'A balanced open-weight model from Google, offering strong performance in reasoning and instruction-following tasks with efficient resource usage.',
    isFree: true,
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Llama 3.3 70B Instruct',
    developer: 'Meta',
    description:
      'A powerful instruction-tuned model from Meta, offering GPT-4 level performance with excellent multilingual dialogue and reasoning capabilities.',
    isFree: true,
  },
  {
    id: 'meta-llama/llama-3.2-3b-instruct:free',
    name: 'Llama 3.2 3B Instruct',
    developer: 'Meta',
    description:
      "Meta's lightweight instruction model tuned for fast, efficient chats and low-latency reasoning on smaller workloads.",
    isFree: true,
  },
  {
    id: 'deepseek/deepseek-r1-0528:free',
    name: 'DeepSeek R1 0528',
    developer: 'DeepSeek',
    description:
      'A frontier reasoning model from DeepSeek that uses reinforcement learning to solve complex problems with step-by-step thinking processes.',
    isFree: true,
  },
  {
    id: 'qwen/qwen3-next-80b-a3b-instruct:free',
    name: 'Qwen3 Next 80B A3B Instruct',
    developer: 'Alibaba',
    description:
      'A next-gen instruction model from Qwen focused on strong reasoning and long-form responses at high capacity.',
    isFree: true,
  },
  {
    id: 'qwen/qwen3-coder:free',
    name: 'Qwen3 Coder',
    developer: 'Alibaba',
    description:
      "Alibaba's premier coding model, optimized for repository-level reasoning, function calling, and complex agentic software development.",
    isFree: true,
  },
  {
    id: 'z-ai/glm-4.5-air:free',
    name: 'GLM 4.5 Air',
    developer: 'Z.ai',
    description: 'Z.ai lightweight flagship tuned for fast chat, tool use, and reliable instruction following.',
    isFree: true,
  },
  // BYOK models
  {
    id: 'openai/gpt-5.2:byok',
    name: 'GPT 5.2',
    developer: 'OpenAI',
    description:
      "OpenAI's latest frontier model featuring a 400K context window and adaptive reasoning that scales based on task complexity.",
    isFree: false,
  },
  {
    id: 'openai/gpt-5-mini:byok',
    name: 'GPT 5 Mini',
    developer: 'OpenAI',
    description:
      'A cost-efficient, high-speed variant of GPT-5, offering advanced reasoning and multimodal capabilities for production-scale apps.',
    isFree: false,
  },
  {
    id: 'openai/o4-mini:byok',
    name: 'o4 mini',
    developer: 'OpenAI',
    description:
      "OpenAI's efficient reasoning model optimized for tool use, coding, and autonomous workflow execution with internal thinking tokens.",
    isFree: false,
  },
  {
    id: 'anthropic/claude-4-sonnet:byok',
    name: 'Claude 4 Sonnet',
    developer: 'Anthropic',
    description:
      "Anthropic's latest high-capacity model, delivering superior performance in coding and research with state-of-the-art instruction following.",
    isFree: false,
  },
  {
    id: 'anthropic/claude-4-opus:byok',
    name: 'Claude 4 Opus',
    developer: 'Anthropic',
    description:
      "Anthropic's most intelligent model, designed for complex agentic workflows, long-running tasks, and frontier-level logic.",
    isFree: false,
  },
  {
    id: 'anthropic/claude-3.7-sonnet:byok',
    name: 'Claude 3.7 Sonnet',
    developer: 'Anthropic',
    description:
      'A highly reliable reasoning model from the Claude 3.5 series with enhanced "thinking" capabilities for accurate problem solving.',
    isFree: false,
  },
  {
    id: 'google/gemini-3-flash-preview:byok',
    name: 'Gemini 3 Flash Preview',
    developer: 'Google',
    description:
      "Google's newest recommended Gemini preview, optimized for fast, capable responses across everyday tasks.",
    isFree: false,
  },
  {
    id: 'google/gemini-2.5-flash:byok',
    name: 'Gemini 2.5 Flash',
    developer: 'Google',
    description: 'A fast, general-purpose Gemini model tuned for responsive chat and routine work.',
    isFree: false,
  },
  {
    id: 'google/gemini-2.5-pro:byok',
    name: 'Gemini 2.5 Pro',
    developer: 'Google',
    description: "Google's high-capability reasoning model for complex problem solving and deep analysis.",
    isFree: false,
  },
  {
    id: 'google/gemini-2.5-flash-lite:byok',
    name: 'Gemini 2.5 Flash Lite',
    developer: 'Google',
    description: 'A lightweight, high-throughput Gemini model for high-volume chat and low-latency workflows.',
    isFree: false,
  },
  {
    id: 'google/gemini-2.0-flash:byok',
    name: 'Gemini 2.0 Flash',
    developer: 'Google',
    description: 'A legacy Gemini Flash model maintained for compatibility and migration support.',
    isFree: false,
  },
  {
    id: 'grok/grok-4:byok',
    name: 'Grok 4',
    developer: 'xAi',
    description:
      'The latest flagship model from xAI, blending deep expertise in science and finance with massive knowledge and advanced logic.',
    isFree: false,
  },
]
