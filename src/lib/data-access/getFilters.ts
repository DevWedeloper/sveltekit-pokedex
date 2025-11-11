import type { FilterListQuery } from '@/gql/graphql'
import { createQuery } from '@tanstack/svelte-query'
import { execute } from '@/gql/execute'
import { FilterListDocument } from '@/gql/graphql'

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
