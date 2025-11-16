import type { FilterListQuery } from '$lib/gql/graphql'
import { FilterListDocument } from '$lib/gql/graphql'
import { execute } from '$lib/utils/execute'
import { createQuery } from '@tanstack/svelte-query'

interface FetchFiltersArgs {
  fetch?: typeof window.fetch
  signal?: AbortSignal
}

export function FILTERS_QUERY_KEY() {
  return ['filters']
}

export async function fetchFilters(
  { fetch = window.fetch, signal }: FetchFiltersArgs,
): Promise<FilterListQuery> {
  return execute(FilterListDocument, { fetch, signal })
}

export function getFiltersQuery() {
  return createQuery(() => ({
    queryKey: FILTERS_QUERY_KEY(),
    queryFn: ({ signal }) => fetchFilters({ signal }),
  }))
}
