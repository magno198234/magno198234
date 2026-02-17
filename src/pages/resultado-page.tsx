import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

export function ResultadoPage() {
  const { id } = useParams()
  const imagemOriginal = 'https://images.unsplash.com/photo-1594824388853-d0c0f16f0a1f?w=500'
  const imagemResultado = 'https://images.unsplash.com/photo-1573496799515-eebbb63814f2?w=500'

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Resultado #{id}</h1>
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <img src={imagemOriginal} alt="original" className="h-64 w-full rounded-lg object-cover" />
          <img src={imagemResultado} alt="resultado" className="h-64 w-full rounded-lg object-cover" />
        </div>
        <div className="mt-5 space-y-1 text-sm text-gray-700">
          <p><strong>Procedimento:</strong> Preenchimento Labial</p>
          <p><strong>Quantidade:</strong> 2.0 ml</p>
          <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        <div className="mt-4 flex gap-2">
          <Button>Gerar PDF</Button>
          <Button variant="outline">Compartilhar com clínica</Button>
        </div>
      </Card>
    </div>
  )
}
