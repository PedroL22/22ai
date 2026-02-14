import { Brain, Check } from 'lucide-react'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

import { cn } from '~/lib/utils'

import type { ReasoningLevel } from '~/types/models'

type ReasoningLevelSelectorProps = {
  reasoningLevel: ReasoningLevel
  onReasoningLevelChange: (level: ReasoningLevel) => void
  disabled?: boolean
}

const LEVELS: { value: ReasoningLevel; label: string; description: string }[] = [
  { value: 'low', label: 'Low', description: 'Quick responses' },
  { value: 'medium', label: 'Medium', description: 'Balanced' },
  { value: 'high', label: 'High', description: 'Deep reasoning' },
]

export const ReasoningLevelSelector = ({
  reasoningLevel,
  onReasoningLevelChange,
  disabled,
}: ReasoningLevelSelectorProps) => {
  const [open, setOpen] = useState(false)

  const currentLevel = LEVELS.find((l) => l.value === reasoningLevel)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          disabled={disabled}
          className={cn(
            'mx-1 justify-between self-start rounded-sm border-0 bg-transparent px-2 py-1 text-muted-foreground text-sm shadow-none transition-all ease-in hover:bg-muted/50 hover:text-muted-foreground',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <Brain className='size-3.5 text-muted-foreground' />
          <span className='text-muted-foreground'>{currentLevel?.label}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side='top'
        align='end'
        sideOffset={8}
        className='w-40 rounded-xl border-border bg-popover p-1 shadow-lg'
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className='flex flex-col gap-0.5'>
          {LEVELS.map((level) => (
            <button
              key={level.value}
              type='button'
              title={level.description}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors',
                reasoningLevel === level.value
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-foreground hover:bg-muted'
              )}
              onClick={() => {
                onReasoningLevelChange(level.value)
                setOpen(false)
              }}
            >
              <div className='flex items-center gap-2'>
                <Brain
                  className={cn('size-4', reasoningLevel === level.value ? 'text-primary' : 'text-muted-foreground')}
                />

                <span>{level.label}</span>
              </div>

              {reasoningLevel === level.value && <Check className='size-4 text-primary' />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
