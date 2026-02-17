import { Link } from 'react-router-dom'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useAuth } from '../contexts/auth-context'

const historico = [
  { id: '1', procedimento: 'Preenchimento Labial', data: '2026-02-10', imagem: 'https://images.unsplash.com/photo-1594824388853-d0c0f16f0a1f?w=300' },
  { id: '2', procedimento: 'Botox - Testa', data: '2026-02-14', imagem: 'https://images.unsplash.com/photo-1573496799515-eebbb63814f2?w=300' },
]

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Olá, {user?.nome ?? 'Paciente'} 👋</h1>
      <div className="my-8 text-center">
        <Link to="/simulacao">
          <Button variant="gradient" className="px-10 py-4 text-lg">Nova Simulação</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {historico.map((item) => (
          <Card key={item.id}>
            <img src={item.imagem} alt={item.procedimento} className="h-40 w-full rounded-lg object-cover" />
            <p className="mt-3 font-semibold">{item.procedimento}</p>
            <p className="text-sm text-gray-500">{new Date(item.data).toLocaleDateString('pt-BR')}</p>
            <Link to={`/resultado/${item.id}`}>
              <Button variant="outline" className="mt-3">Ver resultado</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
