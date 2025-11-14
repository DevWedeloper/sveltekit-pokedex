import type { PageLoad } from './$types'
import { fetchPokemonDetails, POKEMON_DETAILS_QUERY_KEY } from '$lib/data-access/getPokemonDetails'

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const id = Number(params.id)

  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: POKEMON_DETAILS_QUERY_KEY(id),
    queryFn: () => fetchPokemonDetails({ id, fetch }),
  })

  return { id }
}
