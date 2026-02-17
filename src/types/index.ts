export type TipoUsuario = 'paciente' | 'clinica'

export type Usuario = {
  id: string
  nome: string
  email: string
  tipo: TipoUsuario
}

export type Simulacao = {
  id: string
  user_id: string
  procedimento: string
  quantidade_ml: number
  intensidade: 'Sutil' | 'Moderado' | 'Intenso'
  foto_original_url: string
  foto_resultado_url: string
  created_at: string
}
