import type { PokemonDetailsByIdQuery } from '@/gql/graphql'
import { createQuery } from '@tanstack/svelte-query'
import { execute } from '@/gql/execute'
import { PokemonDetailsByIdDocument } from '@/gql/graphql'

type PokemonDetails = PokemonDetailsByIdQuery['pokemon'][0]

export const POKEMON_DETAILS_QUERY_KEY = (id: number) => ['pokemon-details', id]

interface FetchPokemonDetailsArgs {
  id: number
  fetch?: typeof window.fetch
  signal?: AbortSignal
}

export async function fetchPokemonDetails(
  { id, fetch = window.fetch, signal }: FetchPokemonDetailsArgs,
): Promise<PokemonDetails> {
  return execute(PokemonDetailsByIdDocument, { id }, { fetch, signal })
    .then(result => result.pokemon?.[0] ?? null)
}

export function getPokemonDetailsQuery(id: number) {
  return createQuery(() => ({
    queryKey: POKEMON_DETAILS_QUERY_KEY(id),
    queryFn: ({ signal }) => fetchPokemonDetails({ id, signal }),
  }))
}
