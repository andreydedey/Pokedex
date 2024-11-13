export function filterPokemon(pokemons: any, searchTerm: string) {
  return pokemons.filter((pokemon: any) => {
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  })
}
