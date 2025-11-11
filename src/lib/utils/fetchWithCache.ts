const cache: Record<string, Response> = {}

function createCacheKey(input: RequestInfo | URL, init?: RequestInit): string {
  const url = typeof input === 'string' ? input : input.toString()
  const method = init?.method ?? 'GET'
  const headers = init?.headers ? JSON.stringify(init.headers) : ''
  const body = init?.body ?? ''

  return JSON.stringify({ url, method, headers, body })
}

export async function fetchWithCache(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const key = createCacheKey(input, init)

  if (cache[key]) {
    return cache[key].clone()
  }

  const response = await fetch(input, init)

  cache[key] = response.clone()
  return response
}
