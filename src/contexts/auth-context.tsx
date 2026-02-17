import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { TipoUsuario, Usuario } from '../types'
import { getStoredUser, setStoredUser } from '../lib/storage'

type AuthValue = {
  user: Usuario | null
  loading: boolean
  login: (email: string, senha: string) => Promise<void>
  cadastro: (nome: string, email: string, senha: string, tipo: TipoUsuario) => Promise<void>
  loginGoogle: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthValue>({
  user: null,
  loading: false,
  login: async () => undefined,
  cadastro: async () => undefined,
  loginGoogle: async () => undefined,
  logout: () => undefined,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(() => getStoredUser())
  const [loading, setLoading] = useState(false)

  const login = async (email: string, senha: string) => {
    setLoading(true)

    if (!senha.trim()) {
      setLoading(false)
      throw new Error('Senha obrigatória')
    }

    await new Promise((r) => setTimeout(r, 700))
    const sessionUser = { id: crypto.randomUUID(), nome: email.split('@')[0], email, tipo: 'paciente' as const }
    setUser(sessionUser)
    setStoredUser(sessionUser)
    setLoading(false)
  }

  const cadastro = async (nome: string, email: string, senha: string, tipo: TipoUsuario) => {
    setLoading(true)

    if (!senha.trim()) {
      setLoading(false)
      throw new Error('Senha obrigatória')
    }

    await new Promise((r) => setTimeout(r, 700))
    const sessionUser = { id: crypto.randomUUID(), nome, email, tipo }
    setUser(sessionUser)
    setStoredUser(sessionUser)
    setLoading(false)
  }

  const loginGoogle = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({ provider: 'google' })
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    setStoredUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, cadastro, loginGoogle, logout }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
