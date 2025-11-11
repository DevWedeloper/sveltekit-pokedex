import type { PokemonListQuery } from '@/gql/graphql'

export type Pokemon = PokemonListQuery['pokemon'][0] | undefined | null
