import { Camera, ImagePlus } from 'lucide-react'
import ReactCompareImage from 'react-compare-image'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Select } from '../components/ui/select'
import { gerarSimulacaoIA } from '../lib/ia'
import { useToast } from '../components/ui/toast'

const procedimentos = [
  'Botox - Testa',
  'Botox - Pés de galinha',
  'Botox - Glabela (entre sobrancelhas)',
  'Botox - Lábios',
  'Preenchimento Labial',
  'Preenchimento de Malar (maçã do rosto)',
  'Preenchimento de Olheiras',
  'Rinomodelação',
  'Lifting sem cirurgia',
] as const

export function SimulacaoPage() {
  const [foto, setFoto] = useState<File | null>(null)
  const [procedimento, setProcedimento] = useState(procedimentos[0])
  const [ml, setMl] = useState(2)
  const [intensidade, setIntensidade] = useState<'Sutil' | 'Moderado' | 'Intenso'>('Moderado')
  const [resultadoUrl, setResultadoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const preview = foto ? URL.createObjectURL(foto) : ''

  const gerar = async () => {
    if (!foto) {
      addToast('Envie uma foto antes de simular.', 'error')
      return
    }

    setLoading(true)
    try {
      const url = await gerarSimulacaoIA(foto, procedimento, ml, intensidade)
      setResultadoUrl(url)
      addToast('Simulação gerada com sucesso.', 'success')
    } catch {
      addToast('Erro ao gerar simulação.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-2">
      <Card>
        <h2 className="mb-4 text-xl font-bold">Controles</h2>
        <div className="space-y-4">
          <div>
            <p className="mb-2 font-semibold">Foto</p>
            <label className="flex cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 p-5 text-sm text-gray-500">
              <ImagePlus className="mb-2" size={20} />
              Arraste uma imagem ou clique para enviar
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setFoto(e.target.files?.[0] ?? null)} />
            </label>
            <Button variant="outline" className="mt-2 w-full"><Camera size={16} className="mr-2" />Usar câmera</Button>
            {preview && <img src={preview} alt="preview" className="mt-3 h-[150px] w-[150px] rounded-full object-cover" />}
          </div>

          <div>
            <p className="mb-2 font-semibold">Procedimento</p>
            <Select value={procedimento} onChange={(e) => setProcedimento(e.target.value as typeof procedimentos[number])}>
              {procedimentos.map((item) => <option key={item}>{item}</option>)}
            </Select>
          </div>

          <div>
            <p className="mb-2 font-semibold">Quantidade (ml)</p>
            <input type="range" min="0.5" max="10" step="0.5" value={ml} onChange={(e) => setMl(Number(e.target.value))} className="w-full" />
            <p className="mt-2 text-lg font-bold text-primary">{ml.toFixed(1)} ml</p>
          </div>

          <div>
            <p className="mb-2 font-semibold">Intensidade do resultado</p>
            <div className="flex gap-2">
              {(['Sutil', 'Moderado', 'Intenso'] as const).map((option) => (
                <Button key={option} variant={option === intensidade ? 'gradient' : 'outline'} onClick={() => setIntensidade(option)}>
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <Button variant="gradient" className="w-full py-3 text-base" loading={loading} onClick={gerar}>Gerar Simulação</Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 text-xl font-bold">Resultado</h2>
        {!resultadoUrl || !preview ? (
          <div className="flex h-[420px] flex-col items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <ImagePlus size={28} />
            <p className="mt-2">Sua simulação aparecerá aqui</p>
          </div>
        ) : (
          <div>
            <ReactCompareImage leftImage={preview} rightImage={resultadoUrl} />
            <div className="mt-4 flex flex-wrap gap-2">
              <Button>Salvar</Button>
              <Button variant="outline">Compartilhar</Button>
              <Button variant="outline" onClick={() => setResultadoUrl('')}>Novo Procedimento</Button>
            </div>
          </div>
        )}
        <p className="mt-4 inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-900">⚠️ Simulação ilustrativa. Não substitui avaliação médica.</p>
      </Card>
    </div>
  )
}
