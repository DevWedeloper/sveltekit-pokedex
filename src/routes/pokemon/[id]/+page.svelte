<script lang='ts'>
  import type { PageData } from './$types'
  import { goto } from '$app/navigation'
  import * as Dialog from '$lib/components/ui/dialog/index.js'
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js'
  import { getPokemonDetailsQuery } from '$lib/data-access/getPokemonDetails'
  import PokemonDetailsCard from './ui/PokemonDetailsCard.svelte'
  import PokemonDetailsSkeleton from './ui/PokemonDetailsSkeleton.svelte'

  const { data }: { data: PageData } = $props()

  const pokemonDetails = $derived(getPokemonDetailsQuery(data.id))
  const pokemonDetailsLoading = $derived(pokemonDetails.isFetching)
  const pokemonData = $derived(pokemonDetails.data)

  let innerWidth = $state(typeof window !== 'undefined' ? window.innerWidth : 0)
  let isOpen = $derived(innerWidth < 768)

  $effect(() => {
    if (!isOpen && innerWidth < 768) {
      goto('/pokemon')
    }
  })
</script>

<svelte:window bind:innerWidth />

<ScrollArea class='h-[calc(100vh-6rem)] p-8 md:h-full'>
  {#if !pokemonDetailsLoading}
    {#if pokemonData}
      <PokemonDetailsCard pokemon={pokemonData} />
    {/if}
  {:else}
    <PokemonDetailsSkeleton />
  {/if}
</ScrollArea>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content>
    <ScrollArea class='h-[calc(100vh-6rem)] p-8 md:h-full'>
      {#if !pokemonDetailsLoading}
        {#if pokemonData}
          <PokemonDetailsCard pokemon={pokemonData} />
        {/if}
      {:else}
        <PokemonDetailsSkeleton />
      {/if}
    </ScrollArea>
  </Dialog.Content>
</Dialog.Root>
