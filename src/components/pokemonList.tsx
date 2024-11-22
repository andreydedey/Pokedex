import { useEffect, useState } from "react"
import { fetchPokemon } from "../http/pokemonFetch"

function PokemonList({
  pokemons,
}: { pokemons: { name: string; url: string }[] }) {
  const [detailedPokemon, setDetailedPokemon] = useState<any[]>([])

  useEffect(() => {
    if (pokemons.length > 0) {
      setDetailedPokemon([]) // Resetar o estado antes de buscar detalhes

      const fetchDetails = async () => {
        for (const pokemon of pokemons) {
          const details = await fetchPokemon(pokemon.url)
          setDetailedPokemon((prev) => {
            // Evita duplicações garantindo que o estado seja atualizado corretamente
            if (!prev.some((p) => p.name === details.name)) {
              return [...prev, details]
            }
            return prev
          })
        }
      }

      fetchDetails()
    }
  }, [pokemons])

  return (
    <div className="pokemonList">
      <ul className="grid grid-cols-3 gap-4">
        {detailedPokemon.map((pokemon: any, index: number) => (
          <li key={index}>
            <div className="card card-compact w-96 shadow-x1 bg-black">
              <figure>
                <img className="w-48" src={pokemon.sprites.front_default} />
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
