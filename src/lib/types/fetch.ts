export interface FetchOptions {
  fetch?: typeof window.fetch
  signal?: AbortSignal
}
