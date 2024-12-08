import { useEffect, useState } from "react"
import { fetchPokemon } from "../http/pokemonFetch"
import { Link } from "react-router-dom"

function PokemonList({
  pokemons,
}: { pokemons: { name: string; url: string }[] }) {
  const [detailedPokemon, setDetailedPokemon] = useState<any[]>([])

  useEffect(() => {
    if (pokemons.length > 0) {
      const fetchDetails = async () => {
        const newDetails: any = []

        for (const pokemon of pokemons) {
          // Evita buscar detalhes de pokémons que já existem
          const details = await fetchPokemon(pokemon.url)
          newDetails.push(details)
        }

        // Adiciona os novos detalhes ao estado
        setDetailedPokemon((prev) => [...prev, ...newDetails])
      }

      fetchDetails()
    }
  }, [pokemons])

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
    </div>
  )
}

export default PokemonList
