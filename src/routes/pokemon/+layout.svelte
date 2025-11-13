<script lang='ts'>
  import type { Snippet } from 'svelte'
  import type { LayoutData } from './$types'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js'
  import { getFiltersQuery } from '$lib/data-access/getFilters'
  import { getPokemonsQuery } from '$lib/data-access/getPokemons'
  import { onDestroy, onMount } from 'svelte'
  import Filters from './ui/Filters.svelte'
  import PokemonListCard from './ui/PokemonListCard.svelte'

  const { data, children }: { data: LayoutData, children: Snippet } = $props()
  const filter = $derived(data.filter)

  const getFilters = getFiltersQuery()
  const filters = $derived(getFilters.data)

  const getPokemons = $derived(getPokemonsQuery(filter))
  const pokemonList = $derived(getPokemons.data ? getPokemons.data.pages.flatMap(page => page) : [])

  function updateFilter(filterType: string, filterValue: string) {
    const params = new URLSearchParams(page.url.searchParams.toString())
    params.set('filterType', filterType)
    params.set('filterValue', filterValue)

    goto(`${page.url.pathname}?${params.toString()}`, { invalidateAll: true })
  }

  function resetFilters() {
    goto(`${page.url.pathname}`, { invalidateAll: true })
  }

  let sentinel: HTMLDivElement | null = $state(null)
  let observer: IntersectionObserver
  let scrollViewport: HTMLDivElement | null = $state(null)

  async function loadMorePokemons() {
    getPokemons.fetchNextPage()
  }

  onMount(() => {
    if (sentinel) {
      observer = new IntersectionObserver(
        async ([entry]) => {
          if (entry.isIntersecting) {
            await loadMorePokemons()
          }
        },
        {
          root: scrollViewport,
          rootMargin: '1px',
          threshold: 0.1,
        },
      )

      observer.observe(sentinel)
    }
  })

  onDestroy(() => {
    if (observer && sentinel) {
      observer.unobserve(sentinel)
    }
  })
</script>

<div class='bg-background text-foreground grid min-h-[calc(100vh-60px)] grid-cols-1 md:grid-cols-2'>
  <aside class='border-sidebar-border bg-sidebar text-sidebar-foreground border-r'>
    <ScrollArea class='h-[calc(100vh-60px)] p-6' bind:viewportRef={scrollViewport}>
      {#if filters}
        <Filters {filters} {updateFilter} {resetFilters} />
      {/if}

      <div class='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {#if pokemonList}
          {#each pokemonList as pokemon}
            <PokemonListCard {pokemon} />
          {/each}
        {:else}
          <p>Loading…</p>
        {/if}
      </div>
      <div bind:this={sentinel}></div>
    </ScrollArea>
  </aside>

  <main class='hidden h-[calc(100vh-60px)] overflow-y-auto md:block'>
    {@render children()}
  </main>
</div>
