import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Select } from '../components/ui/select'
import { Button } from '../components/ui/button'
import { useAuth } from '../contexts/auth-context'
import { useToast } from '../components/ui/toast'
import { Header } from '../components/header'

export function CadastroPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState<'paciente' | 'clinica'>('paciente')
  const navigate = useNavigate()
  const { cadastro, loading } = useAuth()
  const { addToast } = useToast()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await cadastro(nome, email, tipo)
      addToast('Cadastro concluído com sucesso.', 'success')
      navigate(tipo === 'clinica' ? '/clinica' : '/dashboard')
    } catch {
      addToast('Erro ao concluir cadastro.', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Cadastrar</h2>
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
          <Input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
          <Select value={tipo} onChange={(e) => setTipo(e.target.value as 'paciente' | 'clinica')}>
            <option value="paciente">Paciente</option>
            <option value="clinica">Clínica/Profissional</option>
          </Select>
          <Button className="w-full" loading={loading}>Criar Conta</Button>
        </form>
      </div>
    </div>
  )
}
