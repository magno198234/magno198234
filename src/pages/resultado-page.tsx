import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { getSimulacaoById } from '../lib/storage'

export function ResultadoPage() {
  const { id } = useParams()
  const simulacao = id ? getSimulacaoById(id) : null

  if (!simulacao) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Card>
          <h1 className="text-2xl font-bold">Resultado não encontrado</h1>
          <p className="mt-2 text-gray-600">A simulação informada não existe ou foi removida.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Resultado #{simulacao.id.slice(0, 8)}</h1>
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <img src={simulacao.foto_original_url} alt="original" className="h-64 w-full rounded-lg object-cover" />
          <img src={simulacao.foto_resultado_url} alt="resultado" className="h-64 w-full rounded-lg object-cover" />
        </div>
        <div className="mt-5 space-y-1 text-sm text-gray-700">
          <p><strong>Procedimento:</strong> {simulacao.procedimento}</p>
          <p><strong>Quantidade:</strong> {simulacao.quantidade_ml.toFixed(1)} ml</p>
          <p><strong>Intensidade:</strong> {simulacao.intensidade}</p>
          <p><strong>Data:</strong> {new Date(simulacao.created_at).toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button disabled>Gerar PDF</Button>
          <Button variant="outline" disabled>Compartilhar com clínica</Button>
        </div>
      </Card>
    </div>
  )
}
