import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { TipoUsuario, Usuario } from '../types'

type AuthValue = {
  user: Usuario | null
  loading: boolean
  login: (email: string) => Promise<void>
  cadastro: (nome: string, email: string, tipo: TipoUsuario) => Promise<void>
  loginGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthValue>({
  user: null,
  loading: false,
  login: async () => undefined,
  cadastro: async () => undefined,
  loginGoogle: async () => undefined,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(false)

  const login = async (email: string) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setUser({ id: crypto.randomUUID(), nome: email.split('@')[0], email, tipo: 'paciente' })
    setLoading(false)
  }

  const cadastro = async (nome: string, email: string, tipo: TipoUsuario) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setUser({ id: crypto.randomUUID(), nome, email, tipo })
    setLoading(false)
  }

  const loginGoogle = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({ provider: 'google' })
    setLoading(false)
  }

  const value = useMemo(() => ({ user, loading, login, cadastro, loginGoogle }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
