function TypeBadge({ type }) {
  type PokemonColor = {
    bg: string
    text: string
  }

  const colorMap: Record<string, PokemonColor> = {
    grass: { bg: "bg-green-400", text: "text-black" },
    poison: { bg: "bg-purple-500", text: "text-white" },
    normal: { bg: "bg-purple-500", text: "text-white" },
    fighting: { bg: "bg-purple-500", text: "text-white" },
    flying: { bg: "bg-purple-500", text: "text-white" },
    ground: { bg: "bg-purple-500", text: "text-white" },
    rock: { bg: "bg-purple-500", text: "text-white" },
    bug: { bg: "bg-purple-500", text: "text-white" },
    ghost: { bg: "bg-purple-500", text: "text-white" },
    steel: { bg: "bg-purple-500", text: "text-white" },
    fire: { bg: "bg-purple-500", text: "text-white" },
    water: { bg: "bg-purple-500", text: "text-white" },
    electric: { bg: "bg-purple-500", text: "text-white" },
    psychic: { bg: "bg-purple-500", text: "text-white" },
    ice: { bg: "bg-purple-500", text: "text-white" },
    dragon: { bg: "bg-purple-500", text: "text-white" },
    dark: { bg: "bg-purple-500", text: "text-white" },
    fairy: { bg: "bg-purple-500", text: "text-white" },
    stellar: { bg: "bg-purple-500", text: "text-white" },
    unknown: { bg: "bg-purple-500", text: "text-white" },
  }

  const getClassNames = (type: string): string => {
    const { bg, text } = colorMap[type] || {}
    return `${bg} ${text}`.trim()
  }

  console.log(type)

  return (
    <span
      className={`${getClassNames(type.type.name)} text-lg font-medium me-2 px-12 py-1 rounded`}
    >
      {type.type.name}
    </span>
  )
}

export default TypeBadge
