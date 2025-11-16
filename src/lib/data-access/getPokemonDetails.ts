import type { PokemonDetailsByIdQuery } from '$lib/gql/graphql'
import type { FetchOptions } from '$lib/types/fetch'
import { PokemonDetailsByIdDocument } from '$lib/gql/graphql'
import { execute } from '$lib/utils/execute'
import { createQuery } from '@tanstack/svelte-query'

type PokemonDetails = PokemonDetailsByIdQuery['pokemon'][0]

export const POKEMON_DETAILS_QUERY_KEY = (id: number) => ['pokemon-details', id]

type FetchPokemonDetailsArgs = {
  id: number
} & FetchOptions

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
