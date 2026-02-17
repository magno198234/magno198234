import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useAuth } from '../contexts/auth-context'
import { useToast } from '../components/ui/toast'
import { Header } from '../components/header'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()
  const { login, loginGoogle, loading } = useAuth()
  const { addToast } = useToast()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login(email)
      addToast('Login realizado com sucesso.', 'success')
      navigate('/dashboard')
    } catch {
      addToast('Erro ao realizar login.', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Entrar</h2>
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Senha" required value={senha} onChange={(e) => setSenha(e.target.value)} />
          <Button className="w-full" loading={loading}>Entrar</Button>
          <Button type="button" variant="outline" className="w-full" loading={loading} onClick={async () => {
            try {
              await loginGoogle()
              addToast('Redirecionando para login com Google.', 'success')
            } catch {
              addToast('Erro no login Google.', 'error')
            }
          }}>
            Entrar com Google
          </Button>
        </form>
      </div>
    </div>
  )
}
