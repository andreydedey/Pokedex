import { useEffect, useState } from "react"
import { fetchPokemon } from "../http/pokemonFetch"
import { useParams } from "react-router-dom"
import ProgressBar from "../ui/progressBar"
import TypeBadge from "../ui/typeBadge"

function Pokemon() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [pokemonSpecies, setPokemonSpecies] = useState(null)
  const [pokemonWeakness, setPokemonWeakness] = useState([])
  const [evolutionChain, setEvolutionChain] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      getPokemon()
      getPokemonSpecies()
    }

    const getPokemon = async () => {
      fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${id}`).then((data) => {
        setPokemon(data)
        setLoading(false)
        getWeakness(data)
      })
    }

    const getWeakness = async (data: any) => {
      const uniqueWeakness = new Set<string>()

      for (const slot of data.types) {
        fetchPokemon(slot.type.url).then((slot) => {
          for (const weakness of slot.damage_relations.double_damage_from) {
            uniqueWeakness.add(weakness.name)
          }
          setPokemonWeakness(Array.from(uniqueWeakness))
        })
      }
    }

    const getPokemonSpecies = async () => {
      fetchPokemon(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(
        (data) => {
          setPokemonSpecies(data)
          getEvolutionChain(data.evolution_chain.url)
        },
      )
    }

    const getEvolutionChain = async (url: string) => {
      fetchPokemon(url).then((data) => {
        let chain: { [key: number]: any } = {}
        let evolution = data.chain.evolves_to
        chain[0] = data.chain.species

        let level: number = 1

        while (evolution.length > 0) {
          evolution.map((evolves_to: any) => {
            if (chain[level]) {
              chain[level].push(evolves_to.species)
            } else {
              chain[level] = []
              chain[level].push(evolves_to.species)
            }
          })
          level += 1
          evolution = evolution[0].evolves_to
        }
        setEvolutionChain(chain)
        console.log(chain)
      })
    }
    fetchData()
  }, [])

  if (pokemon && pokemonSpecies) {
    return (
      <>
        {/* Nome do Pokemon */}
        <div className="flex flex-col items-center justify-center mt-5">
          <h1 className="text-3xl text-black font-bold">
            {pokemon.name}
            <span className="text-gray-500"> Nº{pokemon.id}</span>
          </h1>
          {/* Card Pokemon */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            {/* Imagem Pokemon Primeira Grid */}
            <figure className="bg-slate-200 rounded-xl">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="h-80 mx-auto"
              />
            </figure>
            {/* Texto Pokemon e algumas características Segunda Grid*/}
            <div className="flex flex-col justify-between w-80">
              <p className="text-black text-lg text-justify mb-3">
                {pokemonSpecies.flavor_text_entries[0].flavor_text ||
                  "Carregando Descrição..."}
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
            {/* Stats  Terceira Grid*/}
            <div className="flex flex-col">
              <h3 className="text-2xl text-black font-semibold">Stats</h3>
              {pokemon.stats.map((stats) => (
                <ProgressBar
                  key={stats.stat.name}
                  value={stats.base_stat}
                  name={stats.stat.name}
                />
              ))}
            </div>
            {/* Type e Quarta Grid */}
            <div className="flex flex-col w-96">
              <h3 className="text-2xl text-black font-semibold mb-4">Type</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {pokemon.types.map((type) => (
                  <TypeBadge type={type.type.name} />
                ))}
              </div>
              {/* Weaknesses */}
              <h3 className="text-2xl text-black font-semibold mb-4">
                Weaknesses
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {pokemonWeakness.map((weakness) => (
                  <TypeBadge type={weakness} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-gray-800 p-6 rounded-md my-3">
            <h3 className="text-2xl text-white font-semibold">Evoluções</h3>
            <div className="flex">teste</div>
          </div>
        </div>
      </>
    )
  }
}

export default Pokemon
