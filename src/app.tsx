import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./components/home"

export function App() {
  return (
    <div className="app h-screen w-full">
      <Navbar />
      <Router>
        <main className="flex justify-center items-center bg-white">
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </main>
      </Router>
    </div>
  )
}
