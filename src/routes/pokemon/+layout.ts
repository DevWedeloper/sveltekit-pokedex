import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'
import { fetchFilters, FILTERS_QUERY_KEY } from '$lib/data-access/getFilters'
import { fetchPokemons, POKEMONS_QUERY_KEY } from '$lib/data-access/getPokemons'
import { LIMIT } from '@/lib/constants/paginations'

export const load: LayoutLoad = async ({ parent, fetch, url }) => {
  const filterType = url.searchParams.get('filterType')
  const filterValue = url.searchParams.get('filterValue')

  const filter = { filterType, filterValue }

  if (!browser) {
    const limit = LIMIT
    const { queryClient } = await parent()

    await queryClient.prefetchInfiniteQuery({
      queryKey: POKEMONS_QUERY_KEY(filter),
      queryFn: ({ pageParam }) => fetchPokemons({ filter, offset: pageParam, limit, fetch }),
      initialPageParam: 0,
      getNextPageParam: (lastPage: any, allPages: any) => {
        if (lastPage.length < limit)
          return undefined
        return allPages.length * limit
      },
    })

    await queryClient.prefetchQuery({
      queryKey: FILTERS_QUERY_KEY(),
      queryFn: () => fetchFilters({ fetch }),
    })
  }

  return ({ filter })
}
