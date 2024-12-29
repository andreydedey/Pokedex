import { useEffect, useState, useRef } from "react"
import { fetchPokemon } from "../http/pokemonFetch"
import { Link } from "react-router-dom"

function PokemonList({
  pokemons,
}: { pokemons: { name: string; url: string }[] }) {
  const loadMore = 24

  const [detailedPokemon, setDetailedPokemon] = useState<any[]>([])
  const [pokemonLimit, setPokemonLimit] = useState(loadMore)
  const [loadingMore, setLoadingMore] = useState(false)

  const prevPokemons = useRef(pokemons)
  const prevPokemonLimit = useRef(pokemonLimit)

  useEffect(() => {
    const pokemonsChanged = !areArraysEqual(prevPokemons.current, pokemons)
    const pokemonLimitChanged = prevPokemonLimit.current !== pokemonLimit

    // Se os pokemons mudaram, resetar o estado
    if (pokemonsChanged) {
      console.log("Pokemons mudaram")
      setDetailedPokemon([]) // Resetar os pokemons detalhados
    }

    // Se o limite de pokemons mudou ou se os pokemons mudaram
    if (pokemonsChanged || pokemonLimitChanged) {
      fetchDetails()
    }

    prevPokemons.current = pokemons
    prevPokemonLimit.current = pokemonLimit
  }, [pokemons, pokemonLimit])

  const fetchDetails = async () => {
    const newDetails: any = []

    // Carregar os detalhes dos pokemons com base no limite atual
    for (let i = 0; i < pokemons.length; i++) {
      if (i >= 0 && i < pokemonLimit) {
        const details = await fetchPokemon(pokemons[i].url)
        if (!detailedPokemon.some((poke) => poke.id === details.id)) {
          newDetails.push(details)
        }
      }
    }

    // Atualiza o estado com os novos detalhes carregados
    setDetailedPokemon((prev) => [...prev, ...newDetails])
    setLoadingMore(false)
    console.log(pokemons)
    console.log(newDetails)
  }

  const loadPokemons = () => {
    if (pokemons.length > pokemonLimit) {
      setPokemonLimit((prev) => prev + loadMore)
      setLoadingMore(true)
    }
  }

  return (
    <div className="pokemonList">
      <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md> grid-cols-2 gap-4 justify-items-center">
        {detailedPokemon.map((pokemon: any) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            className="card card-compact w-2/3 shadow-x1 bg-slate-800 animate-fade-in"
          >
            <li key={pokemon.id}>
              <figure className="bg-slate-700 rounded-lg">
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{pokemon.name}</h2>
                <div className="card-actions justify-start">
                  {pokemon.types[0] && (
                    <div className="badge badge-outline">
                      {pokemon.types[0].type.name}
                    </div>
                  )}
                  {pokemon.types[1] && (
                    <div className="badge badge-outline">
                      {pokemon.types[1].type.name}
                    </div>
                  )}
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>

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

const areArraysEqual = (arr1: any[], arr2: any[]) => {
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].url !== arr2[i].url) return false
  }
  return true
}

export default PokemonList
