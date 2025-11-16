import type { FetchOptions } from '$lib/types/fetch'
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { fetchWithCache } from '$lib/utils/fetchWithCache'
import { print } from 'graphql'

export function execute<TResult>(
  query: DocumentNode<TResult, Record<string, never>>,
  options?: FetchOptions,
): Promise<TResult>

export function execute<TResult, TVariables>(
  query: DocumentNode<TResult, TVariables>,
  variables: TVariables,
  options?: FetchOptions,
): Promise<TResult>

export async function execute<TResult, TVariables>(
  query: DocumentNode<TResult, TVariables>,
  variablesOrOptions?: TVariables | FetchOptions,
  maybeOptions?: FetchOptions,
): Promise<TResult> {
  const variables = maybeOptions ? (variablesOrOptions as TVariables) : undefined
  const options = maybeOptions || (variablesOrOptions as FetchOptions | undefined)

  const fetchFn = options?.fetch ?? fetchWithCache

  const response = await fetchFn('https://graphql.pokeapi.co/v1beta2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/graphql-response+json',
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
    signal: options?.signal,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json().then(result => result.data) as Promise<TResult>
}
