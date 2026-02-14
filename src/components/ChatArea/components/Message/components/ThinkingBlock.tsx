import { Brain, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { cn } from '~/lib/utils'

type ThinkingBlockProps = {
  reasoning: string
  isStreaming?: boolean
}

export const ThinkingBlock = ({ reasoning, isStreaming }: ThinkingBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasContent = reasoning.trim().length > 0

  if (!hasContent && !isStreaming) return null

  return (
    <div className='mb-3 overflow-hidden rounded-lg border border-primary/20 bg-primary/5'>
      <button
        type='button'
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex w-full items-center gap-2 px-3 py-2 text-left text-primary/80 text-xs transition-colors hover:bg-primary/10'
      >
        <Brain className='size-3.5 shrink-0' />

        <span className='font-medium'>{isStreaming ? 'Thinking...' : 'Thought process'}</span>

        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className='size-3.5' />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='overflow-hidden'
          >
            <div className='border-primary/10 border-t px-3 py-2'>
              <p
                className={cn(
                  'whitespace-pre-wrap text-muted-foreground text-xs leading-relaxed',
                  isStreaming && 'animate-pulse'
                )}
              >
                {reasoning || 'Processing thoughts...'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
