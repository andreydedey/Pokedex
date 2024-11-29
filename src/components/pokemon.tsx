import { useEffect, useState } from "react"
import { fetchPokemon } from "../http/pokemonFetch"
import { useParams } from "react-router-dom"
import ProgressBar from "../ui/progressBar"

function Pokemon() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [pokemonSpecies, setPokemonSpecies] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPokemon = async () => {
      fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`).then((data) => {
        setPokemon(data)
        setLoading(false)
      })
    }

    const getPokemonSpecies = async () => {
      fetchPokemon(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(
        (data) => {
          setPokemonSpecies(data)
        },
      )
    }

    getPokemon()
    getPokemonSpecies()
  }, [])

  if (pokemon) {
    return (
      <>
        <div className="flex flex-col items-center mt-5">
          <h1 className="text-3xl text-black font-bold">
            {pokemon.name} <span className="text-gray-500">Nº{pokemon.id}</span>
          </h1>
          <div className="flex gap-4 mt-10">
            <figure className="bg-slate-200 rounded-xl">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="h-64"
              />
            </figure>
            <div className="flex flex-col w-96">
              <p className="text-black text-lg text-justify mb-3">
                {pokemonSpecies.flavor_text_entries[0].flavor_text}
              </p>
              <ul className="grid grid-cols-2 gap-2 bg-sky-500 p-6 rounded-md text-white text-xl">
                <li>
                  Altura: <br />
                  <span className="text-black">
                    {pokemon.height * 10} centímetros
                  </span>
                </li>
                <li>
                  Peso: <br />
                  <span className="text-black">
                    {pokemon.weight} hectogramas
                  </span>
                </li>
                <li>
                  Habilidade: <br />
                  <span className="text-black">
                    {pokemon.abilities[0].ability.name}
                  </span>
                </li>
                <li>
                  Habitat: <br />
                  <span className="text-black">
                    {pokemonSpecies.habitat.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap mt-3">
            <h3 className="text-2xl text-black font-semibold">Stats</h3>
            {pokemon.stats.map((stats) => (
              <ProgressBar
                key={stats.stat.name}
                value={stats.base_stat}
                name={stats.stat.name}
              />
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default Pokemon
