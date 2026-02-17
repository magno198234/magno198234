import { createContext, ReactNode, useContext, useState } from 'react'
import { cn } from '../../lib/utils'

type ToastItem = { id: number; message: string; type: 'success' | 'error' }

const ToastContext = createContext<{ addToast: (message: string, type: ToastItem['type']) => void }>({
  addToast: () => undefined,
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = (message: string, type: ToastItem['type']) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 3000)
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg',
              toast.type === 'success' ? 'bg-green-600' : 'bg-red-600',
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
