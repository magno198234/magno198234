import { Simulacao, Usuario } from '../types'

const STORAGE_KEYS = {
  user: 'faceai:user',
  simulacoes: 'faceai:simulacoes',
} as const

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback

  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

export function getStoredUser(): Usuario | null {
  return safeParse<Usuario | null>(localStorage.getItem(STORAGE_KEYS.user), null)
}

export function setStoredUser(user: Usuario | null) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.user)
    return
  }

  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
}

export function getSimulacoes(): Simulacao[] {
  return safeParse<Simulacao[]>(localStorage.getItem(STORAGE_KEYS.simulacoes), [])
}

export function addSimulacao(simulacao: Simulacao) {
  const simulacoes = getSimulacoes()
  localStorage.setItem(STORAGE_KEYS.simulacoes, JSON.stringify([simulacao, ...simulacoes]))
}

export function getSimulacaoById(id: string): Simulacao | null {
  return getSimulacoes().find((item) => item.id === id) ?? null
}

export function getSimulacoesByUser(userId?: string): Simulacao[] {
  if (!userId) return []
  return getSimulacoes().filter((item) => item.user_id === userId)
}
