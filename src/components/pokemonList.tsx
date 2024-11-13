function PokemonList({ pokemons }: any) {
  console.log(pokemons)

  return (
    <div className="pokemonList grid">
      <ul>
        {pokemons.map((pokemon: any, index: number) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
