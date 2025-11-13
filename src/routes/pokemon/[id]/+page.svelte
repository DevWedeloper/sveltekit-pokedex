<script lang='ts'>
  import type { PageData } from './$types'
  import { goto } from '$app/navigation'
  import * as Dialog from '$lib/components/ui/dialog/index.js'
  import { getPokemonDetailsQuery } from '$lib/data-access/getPokemonDetails'
  import PokemonDetailsCard from './ui/PokemonDetailsCard.svelte'

  const { data }: { data: PageData } = $props()

  const pokemonDetails = $derived(getPokemonDetailsQuery(data.id))
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

{#if pokemonData}
  <PokemonDetailsCard pokemon={pokemonData} />
{:else}
  <p>Loading...</p>
{/if}

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content>
    {#if pokemonData}
      <PokemonDetailsCard pokemon={pokemonData} />
    {:else}
      <p>Loading...</p>
    {/if}
  </Dialog.Content>
</Dialog.Root>
