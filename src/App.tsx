import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/landing-page'
import { LoginPage } from './pages/login-page'
import { CadastroPage } from './pages/cadastro-page'
import { DashboardPage } from './pages/dashboard-page'
import { SimulacaoPage } from './pages/simulacao-page'
import { ResultadoPage } from './pages/resultado-page'
import { ClinicaPage } from './pages/clinica-page'
import { ToastProvider } from './components/ui/toast'
import { AuthProvider } from './contexts/auth-context'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/simulacao" element={<SimulacaoPage />} />
            <Route path="/resultado/:id" element={<ResultadoPage />} />
            <Route path="/clinica" element={<ClinicaPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
