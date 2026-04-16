import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import TutorsExplorer from './pages/TutorsExplorer'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tutors" element={<TutorsExplorer />} />
      </Routes>
    </Router>
  )
}

export default App
