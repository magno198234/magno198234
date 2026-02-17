import { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none')} {...props} />
}
