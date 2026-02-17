import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/landing-page'
import { LoginPage } from './pages/login-page'
import { CadastroPage } from './pages/cadastro-page'
import { DashboardPage } from './pages/dashboard-page'
import { SimulacaoPage } from './pages/simulacao-page'
import { ResultadoPage } from './pages/resultado-page'
import { ClinicaPage } from './pages/clinica-page'
import { ToastProvider } from './components/ui/toast'
import { AuthProvider, useAuth } from './contexts/auth-context'
import { ReactNode } from 'react'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route
              path="/dashboard"
              element={(
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/simulacao"
              element={(
                <ProtectedRoute>
                  <SimulacaoPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/resultado/:id"
              element={(
                <ProtectedRoute>
                  <ResultadoPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/clinica"
              element={(
                <ProtectedRoute>
                  <ClinicaPage />
                </ProtectedRoute>
              )}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
