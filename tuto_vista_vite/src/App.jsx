import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Auth components loaded eagerly (needed immediately)
import LoginForm from "./features/auth/LoginForm/LoginForm";
import RegisterForm from "./features/auth/RegisterForm/RegisterForm";
import ProtectedRoute from "./features/auth/ProtectedRoute/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import SessionRenewalModal from "./components/ui/SessionRenewalModal";

// Lazy-loaded pages — each becomes a separate JS chunk
const Home = React.lazy(() => import("./pages/Home"));
const TutorsExplorer = React.lazy(() => import("./pages/TutorsExplorer"));
const DashboardSwitcher = React.lazy(() => import("./pages/DashboardSwitcher"));
const SubjectsManagement = React.lazy(() => import("./pages/SubjectsManagement"));
const DispoManagement = React.lazy(() => import("./pages/DispoManagement"));
const TutorAgendaDetail = React.lazy(() => import("./pages/TutorAgendaDetail"));
const GestionTutorias = React.lazy(() => import("./pages/GestionTutorias"));
const AcademicChat = React.lazy(() => import("./pages/AcademicChat"));
const MyTutorsHistory = React.lazy(() => import("./pages/MyTutorsHistory"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Support = React.lazy(() => import("./pages/Support"));
const Verified = React.lazy(() => import("./pages/Verified"));

/**
 * Loading fallback shown while lazy-loaded pages are being downloaded.
 */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-sm text-gray-400 tracking-wide">Cargando...</p>
    </div>
  </div>
);

/**
 * Root Application Component with HashRouter configuration.
 */
function App() {
  return (
    <AuthProvider>
      <SessionRenewalModal />
      {/* Usamos Router (HashRouter) sin la propiedad basename */}
      <Router>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/verified" element={<Verified />} />
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
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;