export type ModelsIds =
  // Free models
  | 'google/gemini-2.0-flash-exp:free'
  | 'google/gemini-2.0-flash:free'
  | 'google/gemma-3-27b:free'
  | 'openai/gpt-oss-120b:free'
  | 'meta-llama/llama-3.3-70b-instruct:free'
  | 'meta-llama/llama-3.1-405b-instruct:free'
  | 'deepseek/deepseek-chat-v3-0324:free'
  | 'deepseek/deepseek-r1-0528:free'
  | 'qwen/qwen3-coder-480b-instruct:free'
  | 'qwen/qwen2.5-vl-72b-instruct:free'
  // BYOK models
  | 'openai/gpt-5.2:byok'
  | 'openai/gpt-5-mini:byok'
  | 'openai/o4-mini:byok'
  | 'anthropic/claude-4-sonnet:byok'
  | 'anthropic/claude-4-opus:byok'
  | 'anthropic/claude-3.7-sonnet:byok'
  | 'google/gemini-3-pro:byok'
  | 'google/gemini-3-flash:byok'
  | 'grok/grok-4:byok'
  | 'deepseek/deepseek-v3.2:byok'

export type ModelsNames =
  // Free models
  | 'Gemini 2.0 Flash Experimental'
  | 'Gemini 2.0 Flash (Free)'
  | 'Gemma 3 27B'
  | 'GPT-OSS 120B'
  | 'Llama 3.3 70B Instruct'
  | 'Llama 3.1 405B Instruct'
  | 'DeepSeek V3 0324'
  | 'DeepSeek R1 0528'
  | 'Qwen3 Coder 480B'
  | 'Qwen2.5 VL 72B'
  // BYOK models
  | 'GPT 5.2'
  | 'GPT 5 Mini'
  | 'o4 mini'
  | 'Claude 4 Sonnet'
  | 'Claude 4 Opus'
  | 'Claude 3.7 Sonnet'
  | 'Gemini 3 Pro'
  | 'Gemini 3 Flash'
  | 'Grok 4'
  | 'DeepSeek V3.2'

export type ModelsDevelopers = 'OpenAI' | 'Anthropic' | 'Google' | 'Meta' | 'Grok' | 'DeepSeek' | 'Qwen'

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
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash Experimental',
    developer: 'Google',
    description:
      "Google's speed-optimized experimental model featuring rapid response times and a 1 million token context window for high-frequency tasks.",
    isFree: true,
  },
  {
    id: 'google/gemini-2.0-flash:free',
    name: 'Gemini 2.0 Flash (Free)',
    developer: 'Google',
    description:
      'A versatile multimodal model with native support for text, images, and video, offering high performance across a variety of general tasks.',
    isFree: true,
  },
  {
    id: 'google/gemma-3-27b:free',
    name: 'Gemma 3 27B',
    developer: 'Google',
    description:
      "Google's flagship open-weight multimodal model, delivering strong visual understanding and logical reasoning in an efficient package.",
    isFree: true,
  },
  {
    id: 'openai/gpt-oss-120b:free',
    name: 'GPT-OSS 120B',
    developer: 'OpenAI',
    description:
      "OpenAI's historic open-weight model. This 117B MoE model is designed for high-reasoning and agentic workflows without API costs.",
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
    id: 'meta-llama/llama-3.1-405b-instruct:free',
    name: 'Llama 3.1 405B Instruct',
    developer: 'Meta',
    description:
      "Meta's largest open-weights model, built for the most complex reasoning tasks, research applications, and high-quality data generation.",
    isFree: true,
  },
  {
    id: 'deepseek/deepseek-chat-v3-0324:free',
    name: 'DeepSeek V3 0324',
    developer: 'DeepSeek',
    description:
      'A massive 671B Mixture-of-Experts model optimized for extreme efficiency and performance in complex coding, logic, and mathematics.',
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
    id: 'qwen/qwen3-coder-480b-instruct:free',
    name: 'Qwen3 Coder 480B',
    developer: 'Qwen',
    description:
      "Alibaba's premier coding model, optimized for repository-level reasoning, function calling, and complex agentic software development.",
    isFree: true,
  },
  {
    id: 'qwen/qwen2.5-vl-72b-instruct:free',
    name: 'Qwen2.5 VL 72B',
    developer: 'Qwen',
    description:
      'A flagship vision-language model proficient at analyzing documents, charts, and acting as a visual agent for interactive tasks.',
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
    id: 'google/gemini-3-pro:byok',
    name: 'Gemini 3 Pro',
    developer: 'Google',
    description:
      "Google's flagship reasoning model with a 1M token context window and native multimodal understanding across text, video, and audio.",
    isFree: false,
  },
  {
    id: 'google/gemini-3-flash:byok',
    name: 'Gemini 3 Flash',
    developer: 'Google',
    description:
      'A speed-optimized variant of Gemini 3, delivering near-Pro levels of intelligence with rapid response times for everyday tasks.',
    isFree: false,
  },
  {
    id: 'grok/grok-4:byok',
    name: 'Grok 4',
    developer: 'Grok',
    description:
      'The latest flagship model from xAI, blending deep expertise in science and finance with massive knowledge and advanced logic.',
    isFree: false,
  },
  {
    id: 'deepseek/deepseek-v3.2:byok',
    name: 'DeepSeek V3.2',
    developer: 'DeepSeek',
    description:
      "DeepSeek's 2026 value leader, matching the performance of much larger frontier models at a fraction of the cost.",
    isFree: false,
  },
]
