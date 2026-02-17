import { Card } from '../components/ui/card'

const pacientes = [
  { nome: 'Ana Lima', simulacoes: 4 },
  { nome: 'Juliana Rocha', simulacoes: 2 },
  { nome: 'Camila Prado', simulacoes: 6 },
]

export function ClinicaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Dashboard da Clínica</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-gray-500">Total de simulações</p>
          <p className="text-3xl font-bold">48</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Procedimento mais solicitado</p>
          <p className="text-xl font-bold">Preenchimento Labial</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Pacientes vinculados</p>
          <p className="text-3xl font-bold">{pacientes.length}</p>
        </Card>
      </div>

      <Card className="mt-6">
        <h2 className="mb-3 text-xl font-semibold">Pacientes vinculados</h2>
        <ul className="space-y-2">
          {pacientes.map((paciente) => (
            <li key={paciente.nome} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
              <span>{paciente.nome}</span>
              <span className="text-sm text-gray-500">{paciente.simulacoes} simulações</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
