<script lang='ts'>
  import type { Pokemon } from '$lib/types/pokemon'
  import { page } from '$app/state'
  import { typeColors } from '$lib/constants/typeColors'
  import { cn } from '$lib/utils/cn'

  const { pokemon }: { pokemon: Pokemon } = $props()

  const circlePositions = [
    '-top-10 -left-10',
    '-top-10 -right-10',
    '-bottom-10 -left-10',
    '-bottom-10 -right-10',
  ]

  const currentQuery = page.url.search
  const pokemonUrl = $derived(pokemon ? `/pokemon/${pokemon.id}${currentQuery}` : '')
</script>

{#if pokemon}
  <a
    href={pokemonUrl}
    class='group text-card-foreground relative aspect-square overflow-hidden rounded-xl'
  >
    {#each pokemon.pokemontypes as type, index}
      <div
        class={cn('absolute z-0 size-24 rounded-full', circlePositions[index])}
        style={`background: ${typeColors[type.type?.name ?? '#A8A8A8']};`}
      ></div>
    {/each}

    <div class='absolute inset-0 backdrop-blur-3xl'></div>

    <div class='relative z-20 flex h-full flex-col items-center justify-center p-2 text-center'>
      <img
        src={pokemon.pokemonsprites[0].sprites}
        alt={pokemon.name}
        class='h-20 w-20 transition-transform select-none group-hover:scale-110'
        loading='lazy'
      />
      <p class='text-sm font-medium capitalize'>{pokemon.name}</p>
      <p class='text-muted-foreground text-xs'>#{pokemon.id}</p>
    </div>
  </a>
{/if}
