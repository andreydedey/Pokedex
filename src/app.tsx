import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./components/home"
import Pokemon from "./components/pokemon"

export function App() {
  return (
    <Router>
      <div className="app h-screen bg-white">
        <Navbar />
        <main className="bg-white">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pokemon/:id" element={<Pokemon />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
