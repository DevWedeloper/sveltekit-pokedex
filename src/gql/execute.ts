import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { print } from 'graphql'
import { fetchWithCache } from '@/lib/utils/fetchWithCache'

interface ExecuteOptions {
  fetch?: typeof window.fetch
  signal?: AbortSignal
}

export function execute<TResult>(
  query: DocumentNode<TResult, Record<string, never>>,
  options?: ExecuteOptions,
): Promise<TResult>

export function execute<TResult, TVariables>(
  query: DocumentNode<TResult, TVariables>,
  variables: TVariables,
  options?: ExecuteOptions,
): Promise<TResult>

export async function execute<TResult, TVariables>(
  query: DocumentNode<TResult, TVariables>,
  variablesOrOptions?: TVariables | ExecuteOptions,
  maybeOptions?: ExecuteOptions,
): Promise<TResult> {
  const variables = maybeOptions ? (variablesOrOptions as TVariables) : undefined
  const options = maybeOptions || (variablesOrOptions as ExecuteOptions | undefined)

  const fetchFn = options?.fetch ?? fetchWithCache

  console.log(options?.fetch ? 'fetch' : 'fetchWithCache')

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
