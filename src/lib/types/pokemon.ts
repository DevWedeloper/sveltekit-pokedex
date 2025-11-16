import type { PokemonDetailsByIdQuery, PokemonListQuery } from '$lib/gql/graphql'

export type Pokemon = PokemonListQuery['pokemon'][0]
export type PokemonDetails = PokemonDetailsByIdQuery['pokemon'][0]
