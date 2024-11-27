import { useEffect, useState } from "react"
import { fetchPokemon } from "../http/pokemonFetch"
import { useParams } from "react-router-dom"

function Pokemon() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPokemon = async () => {
      fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`).then((data) => {
        setPokemon(data)
        setLoading(false)
      })
    }

    getPokemon()
  }, [])

  if (pokemon) {
    return (
      <>
        <div className="flex flex-col items-center mt-5">
          <h1 className="text-3xl text-black font-bold">
            {pokemon.name} <span className="text-gray-500">Nº{pokemon.id}</span>
          </h1>
          <div className="bg-slate-200 mt-2 p-5 rounded-md">
            <div className="flex items-center justify-center gap-4">
              <figure>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-48"
                />
              </figure>
              <div className="grid grid-cols-2 gap-2 bg-blue-500 p-6 rounded-md text-white text-lg">
                <p>
                  Altura: <br />{" "}
                  <span className="text-black">
                    {pokemon.height * 10} centímetros
                  </span>
                </p>
                <p>
                  Peso: <br />{" "}
                  <span className="text-black">
                    {pokemon.weight} hectogramas
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Pokemon
