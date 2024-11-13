import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import PokemonList from "./components/pokemonList"
import { fetchPokemon } from "./http/pokemonFetch"
import Home from "./components/home"

export function App() {
  const [pokemons, setPokemons] = useState(null)
  // const [searchFilter, setSearchFilter] = useState('');

  // TODO
  // a função getPokemons() deve retornar apenas os pokemons que serão com base em uma barra de pesquisa
  // utilizados no componente <PokemonList />

  useEffect(() => {
    async function getAllPokemons() {
      const data = await fetchPokemon("https://pokeapi.co/api/v2/pokemon")
      setPokemons(data)
    }
    getAllPokemons()
  }, [])

  return (
    <div className="app h-screen bg-slate-50">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  )
}
