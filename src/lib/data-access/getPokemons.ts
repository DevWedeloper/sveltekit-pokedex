import type { Filter } from '$lib/types/filter'
import type { Pokemon } from '$lib/types/pokemon'
import { PokemonListByKeywordDocument, PokemonListByRegionDocument, PokemonListByTypeDocument, PokemonListDocument } from '$lib/gql/graphql'
import { execute } from '$lib/utils/execute'
import { createInfiniteQuery } from '@tanstack/svelte-query'
import { LIMIT } from '../constants/paginations'

interface FetchPokemonsArgs {
  filter: Filter
  offset?: number
  limit?: number
  fetch?: typeof window.fetch
  signal?: AbortSignal
}

export function POKEMONS_QUERY_KEY(filter: Filter, limit = LIMIT) {
  return [
    'pokemons',
    filter,
    limit,
  ]
}

export async function fetchPokemons({
  filter,
  offset = 0,
  limit = LIMIT,
  fetch,
  signal,
}: FetchPokemonsArgs): Promise<Pokemon[]> {
  const { filterType, filterValue, search } = filter

  const res = await (async () => {
    if (search) {
      const { pokemon } = await execute(
        PokemonListByKeywordDocument,
        { keyword: search, limit, offset },
        { fetch, signal },
      )
      return pokemon
    }

    if (filterType === 'type' && filterValue) {
      const { pokemon } = await execute(
        PokemonListByTypeDocument,
        { typeName: filterValue, limit, offset },
        { fetch, signal },
      )
      return pokemon
    }

    if (filterType === 'region' && filterValue) {
      const { pokemon } = await execute(
        PokemonListByRegionDocument,
        { regionName: filterValue, limit, offset },
        { fetch, signal },
      )
      return pokemon
    }

    const { pokemon } = await execute(
      PokemonListDocument,
      { limit, offset },
      { fetch, signal },
    )
    return pokemon
  })()

  return res
}

export function getPokemonsQuery(filter: Filter, limit = LIMIT) {
  return createInfiniteQuery(() => ({
    queryKey: POKEMONS_QUERY_KEY(filter, limit),
    queryFn: ({ pageParam, signal }) => fetchPokemons({ filter, offset: pageParam, limit, signal }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit)
        return undefined
      return allPages.length * limit
    },
  }))
}
