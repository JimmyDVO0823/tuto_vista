import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import TutorsExplorer from './pages/TutorsExplorer'
import DashboardSwitcher from './pages/DashboardSwitcher'
import LoginForm from './components/features/auth/LoginForm/LoginForm'
import RegisterForm from './components/features/auth/RegisterForm/RegisterForm'
import SubjectsManagement from './pages/SubjectsManagement'
import DispoManagement from './pages/DispoManagement'
import ProtectedRoute from './components/features/auth/ProtectedRoute/ProtectedRoute'

import { AuthProvider } from './context/AuthContext'

/**
 * Root Application Component.
 *
 * Route Classification:
 *  PUBLIC  → Accessible without authentication (/,  /loginform, /registerform, /tutors)
 *  PRIVATE → Require valid session + JWT       (/dashboard, /subjects, /dispo)
 *
 * ProtectedRoute acts as the client-side auth middleware for all PRIVATE routes.
 * It verifies both the Supabase session (via AuthContext) and the custom JWT
 * stored in localStorage ('tuto_jwt') before rendering the protected content.
 */
function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* ── PUBLIC ROUTES ───────────────────────────────────────────── */}
          <Route path="/" element={<Home />} />
          <Route
            path="/loginform"
            element={
              <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-xl shadow-lg">
                  <LoginForm />
                </div>
              </div>
            }
          />
          <Route
            path="/registerform"
            element={
              <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-xl shadow-lg">
                  <RegisterForm />
                </div>
              </div>
            }
          />
          <Route path="/tutors" element={<TutorsExplorer />} />

          {/* ── PRIVATE ROUTES (JWT + Session required) ─────────────────── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardSwitcher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subjects"
            element={
              <ProtectedRoute>
                <SubjectsManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dispo"
            element={
              <ProtectedRoute>
                <DispoManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
