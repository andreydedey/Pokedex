export async function fetchPokemon(url: string) {
  const response = await fetch(url)
  const data = await response.json()

  return data
}
