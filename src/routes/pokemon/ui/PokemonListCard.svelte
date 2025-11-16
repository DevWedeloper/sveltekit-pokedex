<script lang='ts'>
  import type { Pokemon } from '$lib/types/pokemon'
  import { page } from '$app/state'
  import { typeColors } from '$lib/constants/typeColors'
  import { cn } from '$lib/utils/cn'

  const { pokemon }: { pokemon: Pokemon } = $props()

  const circlePositions = [
    '-top-[35%] -left-[35%]',
    '-top-[35%] -right-[35%]',
    '-bottom-[35%] -left-[35%]',
    '-bottom-[35%] -right-[35%]',
  ]

  const currentQuery = $derived(page.url.search)
  const pokemonUrl = $derived(`/pokemon/${pokemon.id}${currentQuery}`)
</script>

<div class='flex flex-col gap-2'>
  <a
    href={pokemonUrl}
    class='group @container-[size] relative aspect-square w-full overflow-hidden rounded-xl'
  >
    {#each pokemon.pokemontypes as type, index}
      <div
        class={cn('absolute size-[80cqw] rounded-full blur-[50cqw]', circlePositions[index])}
        style={`background: ${type?.type?.name ? typeColors[type.type.name] : '#A8A8A8'};`}
      ></div>
    {/each}

    <div class='flex h-full items-center justify-center'>
      <img
        src={pokemon.pokemonsprites[0]?.sprites || '/pokeball-silhouette.svg'}
        alt={pokemon.name}
        class='size-[80cqw] transition-transform select-none group-hover:scale-110 md:size-[60cqw]'
        loading='lazy'
      />
    </div>
  </a>

  <p class='text-center text-sm font-medium capitalize'>{pokemon.name} <span class='text-muted-foreground'>#{pokemon.id}</span></p>
</div>
