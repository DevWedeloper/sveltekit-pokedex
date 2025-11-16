import type { FilterListQuery } from '$lib/gql/graphql'
import type { FetchOptions } from '$lib/types/fetch'
import { FilterListDocument } from '$lib/gql/graphql'
import { execute } from '$lib/utils/execute'
import { createQuery } from '@tanstack/svelte-query'

export function FILTERS_QUERY_KEY() {
  return ['filters']
}

export async function fetchFilters(
  { fetch, signal }: FetchOptions,
): Promise<FilterListQuery> {
  return execute(FilterListDocument, { fetch, signal })
}

export function getFiltersQuery() {
  return createQuery(() => ({
    queryKey: FILTERS_QUERY_KEY(),
    queryFn: ({ signal }) => fetchFilters({ signal }),
  }))
}
