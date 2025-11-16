/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query filterList {\n  type {\n    name\n  }\n  region {\n    name\n  }\n}": typeof types.FilterListDocument,
    "query pokemonDetailsById($id: Int!) {\n  pokemon(where: {id: {_eq: $id}}) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonabilities {\n      ability {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n    pokemonspecy {\n      pokemonspeciesflavortexts(limit: 1, where: {pokemon_species_id: {_eq: $id}}) {\n        flavor_text\n      }\n    }\n    pokemonstats {\n      base_stat\n      stat {\n        name\n      }\n    }\n  }\n}": typeof types.PokemonDetailsByIdDocument,
    "query pokemonList($limit: Int!, $offset: Int!) {\n  pokemon(limit: $limit, offset: $offset) {\n    id\n    name\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites(path: \"other.official-artwork.front_default\")\n    }\n  }\n}": typeof types.PokemonListDocument,
    "query pokemonListByKeyword($keyword: String!, $limit: Int!, $offset: Int!) {\n  pokemon(limit: $limit, offset: $offset, where: {name: {_regex: $keyword}}) {\n    id\n    name\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites(path: \"other.official-artwork.front_default\")\n    }\n  }\n}": typeof types.PokemonListByKeywordDocument,
    "query pokemonListByRegion($regionName: String!, $limit: Int!, $offset: Int!) {\n  generation(where: {region: {name: {_eq: $regionName}}}) {\n    pokemonspecies(limit: $limit, offset: $offset, order_by: {id: asc}) {\n      pokemons {\n        id\n        name\n        pokemontypes {\n          type {\n            name\n          }\n        }\n        pokemonsprites {\n          sprites(path: \"other.official-artwork.front_default\")\n        }\n      }\n    }\n  }\n}": typeof types.PokemonListByRegionDocument,
    "query pokemonListByType($typeName: String!, $limit: Int!, $offset: Int!) {\n  pokemontype(\n    limit: $limit\n    offset: $offset\n    where: {type: {name: {_eq: $typeName}}}\n  ) {\n    pokemon {\n      id\n      name\n      pokemontypes {\n        type {\n          name\n        }\n      }\n      pokemonsprites {\n        sprites(path: \"other.official-artwork.front_default\")\n      }\n    }\n  }\n}": typeof types.PokemonListByTypeDocument,
};
const documents: Documents = {
    "query filterList {\n  type {\n    name\n  }\n  region {\n    name\n  }\n}": types.FilterListDocument,
    "query pokemonDetailsById($id: Int!) {\n  pokemon(where: {id: {_eq: $id}}) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonabilities {\n      ability {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n    pokemonspecy {\n      pokemonspeciesflavortexts(limit: 1, where: {pokemon_species_id: {_eq: $id}}) {\n        flavor_text\n      }\n    }\n    pokemonstats {\n      base_stat\n      stat {\n        name\n      }\n    }\n  }\n}": types.PokemonDetailsByIdDocument,
    "query pokemonList($limit: Int!, $offset: Int!) {\n  pokemon(limit: $limit, offset: $offset) {\n    id\n    name\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites(path: \"other.official-artwork.front_default\")\n    }\n  }\n}": types.PokemonListDocument,
    "query pokemonListByKeyword($keyword: String!, $limit: Int!, $offset: Int!) {\n  pokemon(limit: $limit, offset: $offset, where: {name: {_regex: $keyword}}) {\n    id\n    name\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites(path: \"other.official-artwork.front_default\")\n    }\n  }\n}": types.PokemonListByKeywordDocument,
    "query pokemonListByRegion($regionName: String!, $limit: Int!, $offset: Int!) {\n  generation(where: {region: {name: {_eq: $regionName}}}) {\n    pokemonspecies(limit: $limit, offset: $offset, order_by: {id: asc}) {\n      pokemons {\n        id\n        name\n        pokemontypes {\n          type {\n            name\n          }\n        }\n        pokemonsprites {\n          sprites(path: \"other.official-artwork.front_default\")\n        }\n      }\n    }\n  }\n}": types.PokemonListByRegionDocument,
    "query pokemonListByType($typeName: String!, $limit: Int!, $offset: Int!) {\n  pokemontype(\n    limit: $limit\n    offset: $offset\n    where: {type: {name: {_eq: $typeName}}}\n  ) {\n    pokemon {\n      id\n      name\n      pokemontypes {\n        type {\n          name\n        }\n      }\n      pokemonsprites {\n        sprites(path: \"other.official-artwork.front_default\")\n      }\n    }\n  }\n}": types.PokemonListByTypeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query filterList {\n  type {\n    name\n  }\n  region {\n    name\n  }\n}"): (typeof documents)["query filterList {\n  type {\n    name\n  }\n  region {\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query pokemonDetailsById($id: Int!) {\n  pokemon(where: {id: {_eq: $id}}) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonabilities {\n      ability {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n    pokemonspecy {\n      pokemonspeciesflavortexts(limit: 1, where: {pokemon_species_id: {_eq: $id}}) {\n        flavor_text\n      }\n    }\n    pokemonstats {\n      base_stat\n      stat {\n        name\n      }\n    }\n  }\n}"): (typeof documents)["query pokemonDetailsById($id: Int!) {\n  pokemon(where: {id: {_eq: $id}}) {\n    id\n    name\n    height\n    weight\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonabilities {\n      ability {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites\n    }\n    pokemonspecy {\n      pokemonspeciesflavortexts(limit: 1, where: {pokemon_species_id: {_eq: $id}}) {\n        flavor_text\n      }\n    }\n    pokemonstats {\n      base_stat\n      stat {\n        name\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query pokemonList($limit: Int!, $offset: Int!) {\n  pokemon(limit: $limit, offset: $offset) {\n    id\n    name\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites(path: \"other.official-artwork.front_default\")\n    }\n  }\n}"): (typeof documents)["query pokemonList($limit: Int!, $offset: Int!) {\n  pokemon(limit: $limit, offset: $offset) {\n    id\n    name\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites(path: \"other.official-artwork.front_default\")\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query pokemonListByKeyword($keyword: String!, $limit: Int!, $offset: Int!) {\n  pokemon(limit: $limit, offset: $offset, where: {name: {_regex: $keyword}}) {\n    id\n    name\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites(path: \"other.official-artwork.front_default\")\n    }\n  }\n}"): (typeof documents)["query pokemonListByKeyword($keyword: String!, $limit: Int!, $offset: Int!) {\n  pokemon(limit: $limit, offset: $offset, where: {name: {_regex: $keyword}}) {\n    id\n    name\n    pokemontypes {\n      type {\n        name\n      }\n    }\n    pokemonsprites {\n      sprites(path: \"other.official-artwork.front_default\")\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query pokemonListByRegion($regionName: String!, $limit: Int!, $offset: Int!) {\n  generation(where: {region: {name: {_eq: $regionName}}}) {\n    pokemonspecies(limit: $limit, offset: $offset, order_by: {id: asc}) {\n      pokemons {\n        id\n        name\n        pokemontypes {\n          type {\n            name\n          }\n        }\n        pokemonsprites {\n          sprites(path: \"other.official-artwork.front_default\")\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query pokemonListByRegion($regionName: String!, $limit: Int!, $offset: Int!) {\n  generation(where: {region: {name: {_eq: $regionName}}}) {\n    pokemonspecies(limit: $limit, offset: $offset, order_by: {id: asc}) {\n      pokemons {\n        id\n        name\n        pokemontypes {\n          type {\n            name\n          }\n        }\n        pokemonsprites {\n          sprites(path: \"other.official-artwork.front_default\")\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query pokemonListByType($typeName: String!, $limit: Int!, $offset: Int!) {\n  pokemontype(\n    limit: $limit\n    offset: $offset\n    where: {type: {name: {_eq: $typeName}}}\n  ) {\n    pokemon {\n      id\n      name\n      pokemontypes {\n        type {\n          name\n        }\n      }\n      pokemonsprites {\n        sprites(path: \"other.official-artwork.front_default\")\n      }\n    }\n  }\n}"): (typeof documents)["query pokemonListByType($typeName: String!, $limit: Int!, $offset: Int!) {\n  pokemontype(\n    limit: $limit\n    offset: $offset\n    where: {type: {name: {_eq: $typeName}}}\n  ) {\n    pokemon {\n      id\n      name\n      pokemontypes {\n        type {\n          name\n        }\n      }\n      pokemonsprites {\n        sprites(path: \"other.official-artwork.front_default\")\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;