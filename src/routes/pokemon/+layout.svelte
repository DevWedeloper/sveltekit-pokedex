<script lang='ts'>
  import type { Snippet } from 'svelte'
  import type { LayoutData } from './$types'
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import InfiniteScroll from '$lib/components/InfiniteScroll.svelte'
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js'
  import { getFiltersQuery } from '$lib/data-access/getFilters'
  import { getPokemonsQuery } from '$lib/data-access/getPokemons'
  import { useDebounce } from 'runed'
  import Filters from './ui/Filters.svelte'
  import PokemonListCard from './ui/PokemonListCard.svelte'

  const { data, children }: { data: LayoutData, children: Snippet } = $props()
  const filter = $derived(data.filter)

  const getFilters = getFiltersQuery()
  const filters = $derived(getFilters.data)

  const getPokemons = $derived(getPokemonsQuery(filter))
  const getPokemonsLoading = $derived(getPokemons.isLoading)
  const isFetchingNextPage = $derived(getPokemons.isFetchingNextPage)
  const hasNextPage = $derived(getPokemons.hasNextPage)
  const pokemonList = $derived(getPokemons.data ? getPokemons.data.pages.flatMap(page => page) : [])

  let search = $derived(filter.search || '')

  function updateFilter(filterType: string, filterValue: string) {
    const params = new URLSearchParams()
    params.set('filterType', filterType)
    params.set('filterValue', filterValue)

    goto(`${page.url.pathname}?${params.toString()}`, { invalidateAll: true })
  }

  function handleSearch() {
    const params = new URLSearchParams()
    if (search)
      params.set('search', search)
    else params.delete('search')

    goto(`${page.url.pathname}?${params.toString()}`, { invalidateAll: true, keepFocus: true })
  }

  function resetFilters() {
    goto(`${page.url.pathname}`, { invalidateAll: true })
  }

  const oninput = useDebounce(
    () => {
      handleSearch()
    },
    () => 500,
  )

  let scrollViewport: HTMLDivElement | null = $state(null)
</script>

<div class='bg-background text-foreground grid min-h-[calc(100vh-60px)] grid-cols-1 md:grid-cols-2'>
  <aside class='border-sidebar-border bg-sidebar text-sidebar-foreground border-r'>
    <ScrollArea class='h-[calc(100vh-60px)] p-6' bind:viewportRef={scrollViewport} data-testing-id='main-grid'>
      {#if filters}
        <Filters {filters} {updateFilter} {resetFilters} bind:search {oninput} />
      {/if}

      {#if !getPokemonsLoading}
        {#if pokemonList.length > 0}
          <InfiniteScroll loadMore={() => getPokemons.fetchNextPage()} {scrollViewport}>
            <div class='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {#each pokemonList as pokemon}
                <PokemonListCard {pokemon} />
              {/each}
            </div>

            {#if isFetchingNextPage}
              <p class='text-muted-foreground mt-4 text-center'>Loading more Pokemons...</p>
            {/if}
            {#if !hasNextPage}
              <p class='text-muted-foreground mt-4 text-center'>You’ve reached the end!</p>
            {/if}
          </InfiniteScroll>
        {:else}
          <p class='text-muted-foreground text-center'>No Pokemons found</p>
        {/if}
      {:else}
        <p class='text-muted-foreground text-center'>Loading Pokemons...</p>
      {/if}
    </ScrollArea>
  </aside>

  <main class='hidden h-[calc(100vh-60px)] overflow-y-auto md:block'>
    {@render children()}
  </main>
</div>
