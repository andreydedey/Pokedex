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

  return <div className="flex">{pokemon && <h1>{pokemon.name}</h1>}</div>
}

export default Pokemon
