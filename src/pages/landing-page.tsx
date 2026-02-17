import { Link } from 'react-router-dom'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Header } from '../components/header'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold md:text-5xl">Veja o resultado antes de fazer</h1>
          <p className="mt-4 text-lg text-gray-600">Simule procedimentos estéticos com inteligência artificial</p>
          <Link to="/cadastro" className="mt-8 inline-block">
            <Button variant="gradient" className="px-8 py-3 text-base">Experimentar Grátis</Button>
          </Link>
        </section>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {['Simulação por IA', 'Comparação antes/depois', 'Relatório para clínica'].map((item) => (
            <Card key={item} className="text-center">
              <h3 className="text-lg font-semibold">{item}</h3>
              <p className="mt-2 text-sm text-gray-600">Tecnologia premium para apoiar a decisão estética com visual profissional.</p>
            </Card>
          ))}
        </section>
      </main>
      <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} FaceAI Studio</footer>
    </div>
  )
}
