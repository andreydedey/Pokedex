import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

function Evolution({ chain }: any) {
  console.log(chain)

  // a url nesse caso seria a das informações do pokemon na PokeAPI
  const getImage = (url: string) => {
    const id = url.replace(/.*\/(\d+)\/$/, "$1") // id retirado da url

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  }

  return (
    <div className="col-span-2 bg-slate-600 rounded-md p-6 mb-3">
      <h3 className="text-2xl text-white font-semibold mb-3">Evoluções</h3>
      <div className="flex justify-center gap-6">
        {Object.keys(chain).map((key, index) => (
          <div className="flex items-center gap-6">
            <ul key={key}>
              {chain[key].map((pokemon) => (
                <li className="bg-slate-800 rounded-md p-3">
                  <img
                    className="w-44"
                    src={getImage(pokemon.url)}
                    alt={`${pokemon.name} image`}
                  />
                  <h4 className="text-xl font-semibold text-white">
                    {pokemon.name}
                  </h4>
                </li>
              ))}
            </ul>
            {index < Object.keys(chain).length - 1 && (
              <FontAwesomeIcon icon={faArrowRight} className="text-4xl" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Evolution
