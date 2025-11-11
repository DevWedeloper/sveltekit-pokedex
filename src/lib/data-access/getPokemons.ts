import type { Pokemon } from '$lib/types/pokemon'
import { createInfiniteQuery } from '@tanstack/svelte-query'
import { execute } from '@/gql/execute'
import { PokemonListByRegionDocument, PokemonListByTypeDocument, PokemonListDocument } from '@/gql/graphql'

interface FetchPokemonsArgs {
  filter: { filterType: string | null, filterValue: string | null }
  offset?: number
  limit?: number
  fetch?: typeof window.fetch
  signal?: AbortSignal
}

export function POKEMONS_QUERY_KEY(filter: { filterType: string | null, filterValue: string | null }, limit = 15) {
  const { filterType = null, filterValue = null } = filter || {}
  return [
    'pokemons',
    { filterType, filterValue },
    limit,
  ]
}

export async function fetchPokemons({
  filter = { filterType: null, filterValue: null },
  offset = 0,
  limit = 15,
  fetch = window.fetch,
  signal,
}: FetchPokemonsArgs): Promise<Pokemon[]> {
  const { filterType = null, filterValue = null } = filter || {}

  const res = await (async () => {
    if (filterType === 'type' && filterValue) {
      const { pokemontype } = await execute(
        PokemonListByTypeDocument,
        { typeName: filterValue, limit, offset },
        { fetch, signal },
      )
      return pokemontype.map(({ pokemon }) => pokemon)
    }

    if (filterType === 'region' && filterValue) {
      const { generation } = await execute(
        PokemonListByRegionDocument,
        { regionName: filterValue, limit, offset },
        { fetch, signal },
      )
      return generation[0].pokemonspecies.flatMap(({ pokemons }) => pokemons)
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

export function getPokemonsQuery(filter: { filterType: string | null, filterValue: string | null }, limit = 15) {
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
