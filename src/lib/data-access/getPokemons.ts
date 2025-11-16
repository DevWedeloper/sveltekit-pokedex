import type { Pokemon } from '$lib/types/pokemon'
import { createInfiniteQuery } from '@tanstack/svelte-query'
import { execute } from '@/gql/execute'
import { PokemonListByKeywordDocument, PokemonListByRegionDocument, PokemonListByTypeDocument, PokemonListDocument } from '@/gql/graphql'
import { LIMIT } from '../constants/paginations'

interface FetchPokemonsArgs {
  filter: { filterType: string | null, filterValue: string | null, search: string | null }
  offset?: number
  limit?: number
  fetch?: typeof window.fetch
  signal?: AbortSignal
}

export function POKEMONS_QUERY_KEY(filter: { filterType: string | null, filterValue: string | null, search: string | null }, limit = LIMIT) {
  const { filterType = null, filterValue = null, search = null } = filter || {}
  return [
    'pokemons',
    { filterType, filterValue, search },
    limit,
  ]
}

export async function fetchPokemons({
  filter = { filterType: null, filterValue: null, search: null },
  offset = 0,
  limit = LIMIT,
  fetch,
  signal,
}: FetchPokemonsArgs): Promise<Pokemon[]> {
  const { filterType = null, filterValue = null, search } = filter || {}

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

export function getPokemonsQuery(filter: { filterType: string | null, filterValue: string | null, search: string | null }, limit = LIMIT) {
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
