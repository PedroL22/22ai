---
alwaysApply: false
description: Coding standards and prompt for converting designs into React 19 components using Tailwind CSS v4, Base UI, and Tailwind Variants.
globs: "**/*.tsx"
---

# Design to React Component Conversion

Analyze the attached design (screenshot or Figma frame) and convert it into React components following the standards below.

---

## Stack

- **React 19** (no `forwardRef`)
- **TypeScript** strict
- **Tailwind CSS v4** with `@theme` and CSS variables
- **Base UI React** (`@base-ui/react`) for headless components
- **Tailwind Variants** (`tailwind-variants`) for variants
- **Tailwind Merge** (`tailwind-merge`) for class merging
- **Lucide React** or **Phosphor Icons** for icons

---

## Naming Conventions

- Files: **lowercase with hyphens** → `user-card.tsx`, `use-modal.ts`
- **Always use named exports**, never default export
- Do not create barrel files (`index.ts`) for internal folders

---

## Component Structure

```tsx
import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

export const buttonVariants = tv({
	base: [
		'inline-flex cursor-pointer items-center justify-center font-medium rounded-lg border transition-colors',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
		'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
	],
	variants: {
		variant: {
			primary: 'border-primary bg-primary text-primary-foreground hover:bg-primary-hover',
			secondary: 'border-border bg-secondary text-secondary-foreground hover:bg-muted',
			ghost: 'border-transparent bg-transparent text-muted-foreground hover:text-foreground',
			destructive: 'border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90',
		},
		size: {
			sm: 'h-6 px-2 gap-1.5 text-xs [&_svg]:size-3',
			md: 'h-7 px-3 gap-2 text-sm [&_svg]:size-3.5',
			lg: 'h-9 px-4 gap-2.5 text-base [&_svg]:size-4',
		},
	},
	defaultVariants: { variant: 'primary', size: 'md' },
})

export interface ButtonProps
	extends ComponentProps<'button'>,
		VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, disabled, children, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			data-slot="button"
			data-disabled={disabled ? '' : undefined}
			className={twMerge(buttonVariants({ variant, size }), className)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	)
}
```

---

## Compound Components

```tsx
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export interface CardProps extends ComponentProps<'div'> {}

export function Card({ className, ...props }: CardProps) {
	return (
		<div
			data-slot="card"
			className={twMerge('bg-surface flex flex-col gap-6 rounded-xl border border-border p-6 shadow-sm', className)}
			{...props}
		/>
	)
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
	return <div data-slot="card-header" className={twMerge('flex flex-col gap-1.5', className)} {...props} />
}

export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
	return <h3 data-slot="card-title" className={twMerge('text-lg font-semibold', className)} {...props} />
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
	return <div data-slot="card-content" className={className} {...props} />
}
```

---

## Colors (CSS Variables)

```
bg-surface, bg-surface-raised       → backgrounds
bg-primary, bg-secondary, bg-muted  → actions/states
bg-destructive                      → errors/danger

text-foreground                     → main text
text-foreground-subtle              → secondary text
text-muted-foreground               → disabled text
text-primary-foreground             → text on primary bg

border-border, border-input         → default borders
border-primary, border-destructive  → highlight borders

ring-ring                           → focus ring
```

---

## TypeScript

```tsx
// ✅ Extend ComponentProps + VariantProps
export interface ButtonProps
	extends ComponentProps<'button'>,
		VariantProps<typeof buttonVariants> {}

// ✅ Import type for types
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'

// ❌ Do not use React.FC or any
```

---

## Important Patterns

```tsx
// Always use twMerge
className={twMerge('base-classes', className)}

// Always use data-slot
<div data-slot="card">

// States with data-attributes
data-disabled={disabled ? '' : undefined}
className="data-disabled:opacity-50 data-selected:bg-primary"

// Focus visible
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

// Icons with size
<Check className="size-4" />
'[&_svg]:size-3.5' // in variants

// Icon buttons need aria-label
<button aria-label="Close"><X className="size-4" /></button>

// Props spread at the end
{...props}
```

---

## Base UI (headless components)

```tsx
// Dialog
import * as Dialog from '@base-ui/react/dialog'
<Dialog.Root><Dialog.Portal><Dialog.Backdrop /><Dialog.Popup /></Dialog.Portal></Dialog.Root>

// Tabs
import * as Tabs from '@base-ui/react/tabs'
<Tabs.Root><Tabs.List><Tabs.Tab /></Tabs.List><Tabs.Panel /></Tabs.Root>

// Select
import * as Select from '@base-ui/react/select'
<Select.Root><Select.Trigger /><Select.Portal><Select.Popup><Select.Item /></Select.Popup></Select.Portal></Select.Root>

// Menu
import * as Menu from '@base-ui/react/menu'
<Menu.Root><Menu.Trigger /><Menu.Portal><Menu.Popup><Menu.Item /></Menu.Popup></Menu.Portal></Menu.Root>
```

---

## Checklist

- [ ] Lowercase file name with hyphens
- [ ] Named export
- [ ] `ComponentProps<'element'>` + `VariantProps`
- [ ] Variants with `tv()`, classes with `twMerge()`
- [ ] `data-slot` for identification
- [ ] States via `data-[state]:`
- [ ] Theme colors (not hardcoded)
- [ ] Focus visible on interactive elements
- [ ] `aria-label` on icon buttons
- [ ] `{...props}` at the end

---

Now analyze the attached design and generate the component code.
