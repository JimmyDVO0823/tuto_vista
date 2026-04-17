import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import TutorsExplorer from './pages/TutorsExplorer'
import DashboardStudent from './pages/DashboardStudent'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tutors" element={<TutorsExplorer />} />
        <Route path="/dashboard/student" element={<DashboardStudent />} />
      </Routes>
    </Router>
  )
}

export default App
