import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TutorsExplorer from "./pages/TutorsExplorer";
import DashboardSwitcher from "./pages/DashboardSwitcher";
import LoginForm from "./features/auth/LoginForm/LoginForm";
import RegisterForm from "./features/auth/RegisterForm/RegisterForm";
import SubjectsManagement from "./pages/SubjectsManagement";
import DispoManagement from "./pages/DispoManagement";
import ProtectedRoute from "./features/auth/ProtectedRoute/ProtectedRoute";
import TutorAgendaDetail from "./pages/TutorAgendaDetail";
import GestionTutorias from "./pages/GestionTutorias";
import AcademicChat from "./pages/AcademicChat";
import MyTutorsHistory from "./pages/MyTutorsHistory";
import Settings from "./pages/Settings";
import Support from "./pages/Support";

import { AuthProvider } from "./context/AuthContext";
import SessionRenewalModal from "./components/ui/SessionRenewalModal";

/**
 * Root Application Component with HashRouter configuration.
 */
function App() {
  return (
    <AuthProvider>
      <SessionRenewalModal />
      {/* Usamos Router (HashRouter) sin la propiedad basename */}
      <Router>
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
          <Route path="/tutors/:id" element={<TutorAgendaDetail />} />

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
          <Route
            path="/tutor-agenda"
            element={
              <ProtectedRoute>
                <GestionTutorias />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-sesiones"
            element={
              <ProtectedRoute>
                <MyTutorsHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <AcademicChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;