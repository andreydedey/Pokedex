import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"
import PokemonList from "./pokemonList"
import { fetchPokemon } from "../http/pokemonFetch"
import { useState, useEffect } from "react"

function Home() {
  // TODO: Filtrar Pokemons com base na Barra de Pesquisa

  const [search, setSearch] = useState("")
  const [pokemons, setPokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon")

  const loadPokemons = async () => {
    const response = await fetchPokemon(url)
    setUrl(response.next)
    setPokemons(response.results)
  }

  useEffect(() => {
    const getPokemons = async () => {
      const data = await fetchPokemon(url)
      setPokemons(data.results)
      setUrl(data.next) // Para que quando eu aperte o botão de carregar mais venha a outra leva de pokemons
    }

    getPokemons()
  }, [])

  return (
    <div className="mt-8">
      {/* Barra de Pesquisa */}
      <div className="flex bg-slate-900 p-8 my-6 items-center justify-center">
        <div className="w-1/2 mx-6">
          <h2 className="text-2xl m-1 text-left">Nome ou Número</h2>
          <input
            type="text"
            className="input w-full max-w-xs h-10 text-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-orange-600 hover:bg-red-700 hover:scale-105 
            duration-200 text-xl text-white rounded-md h-10 w-10 ml-5"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="w-1/2 bg-green-500 p-4 rounded-md">
          <p className="text-white text-2xl">
            Realize a busca por Pokémeon pelo nome ou usando número do Pokédex
            Nacional.
          </p>
        </div>
      </div>

      {/* Lista de Pokemons */}
      {pokemons && <PokemonList pokemons={pokemons} />}

      {/* Botão de Carregar Pokemons */}
      <div className="flex justify-center my-4">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 hover:scale-105 
          duration-300 text-white p-4 rounded-lg mb-4"
          onClick={loadPokemons}
        >
          Carregar mais!
        </button>
      </div>
    </div>
  )
}

export default Home
