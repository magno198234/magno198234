import { Link } from 'react-router-dom'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useAuth } from '../contexts/auth-context'
import { getSimulacoesByUser } from '../lib/storage'

export function DashboardPage() {
  const { user } = useAuth()
  const historico = getSimulacoesByUser(user?.id)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Olá, {user?.nome ?? 'Paciente'} 👋</h1>
      <div className="my-8 text-center">
        <Link to="/simulacao">
          <Button variant="gradient" className="px-10 py-4 text-lg">Nova Simulação</Button>
        </Link>
      </div>

      {historico.length === 0 ? (
        <Card>
          <p className="text-gray-600">Você ainda não possui simulações salvas. Clique em <strong>Nova Simulação</strong> para começar.</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {historico.map((item) => (
            <Card key={item.id}>
              <img src={item.foto_resultado_url || item.foto_original_url} alt={item.procedimento} className="h-40 w-full rounded-lg object-cover" />
              <p className="mt-3 font-semibold">{item.procedimento}</p>
              <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString('pt-BR')}</p>
              <Link to={`/resultado/${item.id}`}>
                <Button variant="outline" className="mt-3">Ver resultado</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
