import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'default' | 'outline' | 'gradient' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  loading?: boolean
  children: ReactNode
}

const variantMap: Record<Variant, string> = {
  default: 'bg-primary text-white hover:bg-primary/90',
  outline: 'border border-gray-300 bg-white hover:bg-gray-50',
  gradient: 'bg-brand-gradient text-white hover:opacity-95',
  ghost: 'hover:bg-gray-100',
}

export function Button({ variant = 'default', loading, className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variantMap[variant],
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}
