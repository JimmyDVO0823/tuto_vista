import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import TutorsExplorer from './pages/TutorsExplorer'
import DashboardStudent from './pages/DashboardStudent'
import LoginForm from './components/features/auth/LoginForm/LoginForm'
import RegisterForm from './components/features/auth/RegisterForm/RegisterForm'
import SubjectsManagement from './pages/SubjectsManagement'
import DispoManagement from './pages/DispoManagement'

import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
      <Routes>
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
        <Route path="/dashboard/student" element={<DashboardStudent />} />
        <Route path="/subjects" element={<SubjectsManagement />} />
        <Route path="/dispo" element={<DispoManagement />} />
      </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
