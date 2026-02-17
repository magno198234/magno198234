import { Link, useNavigate } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

export function Header() {
  const [dark, setDark] = useState(false)
  const navigate = useNavigate()

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setDark((value) => !value)
  }

  return (
    <header className="border-b border-gray-200 bg-white/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-extrabold text-primary">FaceAI Studio</Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={toggleDark}>{dark ? <Sun size={16} /> : <Moon size={16} />}</Button>
          <Button variant="outline" onClick={() => navigate('/login')}>Entrar</Button>
          <Button variant="gradient" onClick={() => navigate('/cadastro')}>Cadastrar</Button>
        </div>
      </div>
    </header>
  )
}
