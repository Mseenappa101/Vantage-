import { Routes, Route } from 'react-router-dom'
import Waitlist from './pages/Waitlist'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Waitlist />} />
    </Routes>
  )
}

export default App
