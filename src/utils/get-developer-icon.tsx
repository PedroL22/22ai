import { Sparkles } from 'lucide-react'

import type { ModelsDevelopers } from '~/types/models'

export const getDeveloperIcon = (developer: ModelsDevelopers) => {
  switch (developer) {
    case 'OpenAI':
      return <img src='/images/icons/openai.svg' alt='OpenAI Logo' width={16} height={16} className='size-4' />
    case 'Anthropic':
      return <img src='/images/icons/anthropic.svg' alt='Anthropic Logo' width={16} height={16} className='size-4' />
    case 'Google':
      return <img src='/images/icons/gemini.svg' alt='Gemini Logo' width={16} height={16} className='size-4' />
    case 'Meta':
      return <img src='/images/icons/meta.svg' alt='Meta Logo' width={16} height={16} className='size-4' />
    case 'DeepSeek':
      return <img src='/images/icons/deepseek.svg' alt='DeepSeek Logo' width={16} height={16} className='size-4' />
    case 'xAi':
      return <img src='/images/icons/xai.svg' alt='xAi Logo' width={16} height={16} className='size-4' />
    case 'Alibaba':
      return <img src='/images/icons/alibaba.svg' alt='Alibaba Logo' width={16} height={16} className='size-4' />
    case 'Z.ai':
      return <img src='/images/icons/zai.svg' alt='Z.ai Logo' width={16} height={16} className='size-4' />

    default:
      return <Sparkles className='size-4 text-zinc-400' />
  }
}
