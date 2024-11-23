import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./components/home"

export function App() {
  return (
    <Router>
      <div className="app h-screen w-full">
        <Navbar />
        <main className="flex justify-center items-center bg-white">
          <Routes>
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
