import { useEffect, useState } from "react"
import { fetchPokemon } from "../http/pokemonFetch"

function TypeBadge({ type }) {
  type PokemonColor = {
    bg: string
    text: string
  }

  // Tailwind class for gradient (factoring some code)
  const gradientType = "bg-gradient-to-b"

  const colorMap: Record<string, PokemonColor> = {
    grass: { bg: "bg-lime-500", text: "text-black" },
    poison: { bg: "bg-fuchsia-500", text: "text-white" },
    normal: { bg: "bg-zinc-400", text: "text-black" },
    fighting: { bg: "bg-orange-700", text: "text-white" },
    flying: {
      bg: `${gradientType} from-blue-500 from-50% to-zinc-400 to-50%`,
      text: "text-black",
    },
    ground: {
      bg: `${gradientType} from-amber-400 from-50% to-yellow-600 to-50%`,
      text: "text-black",
    },
    rock: { bg: "bg-yellow-600", text: "text-white" },
    bug: { bg: "bg-green-500", text: "text-white" },
    ghost: { bg: "bg-purple-500", text: "text-black" },
    steel: { bg: "bg-slate-400", text: "text-black" },
    fire: { bg: "bg-orange-500", text: "text-white" },
    water: { bg: "bg-sky-500", text: "text-white" },
    electric: { bg: "bg-amber-400", text: "text-black" },
    psychic: { bg: "bg-pink-500", text: "text-white" },
    ice: { bg: "bg-cyan-400", text: "text-black" },
    dragon: {
      bg: `${gradientType} from-sky-500 from-50% to-red-500 to-50%`,
      text: "text-white",
    },
    dark: { bg: "bg-purple-500", text: "text-white" },
    fairy: { bg: "bg-rose-300", text: "text-black" },
    stellar: { bg: "bg-purple-500", text: "text-white" },
    unknown: { bg: "bg-purple-500", text: "text-white" },
  }

  const getClassNames = (type: string): string => {
    const { bg, text } = colorMap[type] || {}
    return `${bg} ${text}`.trim()
  }

  return (
    <span
      className={`${getClassNames(type)} text-lg font-medium w-28 py-1 rounded text-center`}
    >
      {type}
    </span>
  )
}

export default TypeBadge
