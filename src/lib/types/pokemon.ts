import type { PokemonDetailsByIdQuery, PokemonListQuery } from '@/gql/graphql'

export type Pokemon = PokemonListQuery['pokemon'][0] | undefined | null
export type PokemonDetails = PokemonDetailsByIdQuery['pokemon'][0]
