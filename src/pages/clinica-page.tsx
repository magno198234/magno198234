import { Card } from '../components/ui/card'
import { getSimulacoes } from '../lib/storage'

export function ClinicaPage() {
  const simulacoes = getSimulacoes()
  const pacientes = Object.values(
    simulacoes.reduce<Record<string, { nome: string; simulacoes: number }>>((acc, item) => {
      const nome = item.user_id.slice(0, 8)
      const atual = acc[item.user_id] ?? { nome: `Paciente ${nome}`, simulacoes: 0 }
      acc[item.user_id] = { ...atual, simulacoes: atual.simulacoes + 1 }
      return acc
    }, {}),
  )

  const procedimentoMaisSolicitado =
    Object.entries(
      simulacoes.reduce<Record<string, number>>((acc, item) => {
        acc[item.procedimento] = (acc[item.procedimento] ?? 0) + 1
        return acc
      }, {}),
    ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'Sem dados'

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Dashboard da Clínica</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-gray-500">Total de simulações</p>
          <p className="text-3xl font-bold">{simulacoes.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Procedimento mais solicitado</p>
          <p className="text-xl font-bold">{procedimentoMaisSolicitado}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Pacientes vinculados</p>
          <p className="text-3xl font-bold">{pacientes.length}</p>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="mb-3 text-xl font-semibold">Pacientes vinculados</h2>
        {pacientes.length === 0 ? (
          <p className="text-sm text-gray-600">Nenhum paciente vinculado ainda.</p>
        ) : (
          <ul className="space-y-2">
            {pacientes.map((paciente) => (
              <li key={paciente.nome} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <span>{paciente.nome}</span>
                <span className="text-sm text-gray-500">{paciente.simulacoes} simulações</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
