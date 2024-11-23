import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="navbar bg-slate-700">
      <div className="flex-1 justify-center">
        <Link to={"home"}>
          <a className="btn btn-ghost text-xl text-slate-50 hover:bg-slate-500">
            Pokedex
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
