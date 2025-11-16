<script lang='ts'>
  import type { PokemonDetails } from '$lib/types/pokemon'
  import { statColors } from '$lib/constants/statColors'
  import { statLabels } from '$lib/constants/statLabels'
  import { typeColors } from '$lib/constants/typeColors'

  const { pokemon }: { pokemon: PokemonDetails } = $props()
</script>

{#snippet bodyStat(label: string, value: string)}
  <div class='flex w-full flex-col items-center gap-2'>
    <h4 class='text-foreground font-semibold'>{label}</h4>
    <span class='bg-card text-foreground w-full rounded-lg p-1'>{value}</span>
  </div>
{/snippet}

{#snippet statItem(label: string, value: number, color: string)}
  <div class='flex flex-col items-center'>
    <div
      class='flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold'
      style='background: {color}'
      title={label}
    >
      {label}
    </div>
    <span class='text-foreground mt-1 text-sm font-semibold'>{value}</span>
  </div>
{/snippet}

<div class='flex justify-center'>
  <div
    class='flex max-w-80 flex-col items-center gap-4 rounded-2xl text-center'
  >
    <img
      src={pokemon.pokemonsprites[0].sprites.other.dream_world?.front_default
        ?? pokemon.pokemonsprites[0].sprites.front_default
        ?? '/pokeball-silhouette.svg'}
      alt={pokemon.name}
      class='h-40'
      loading='lazy'
    />

    <div class='flex flex-col items-center gap-2'>
      <span class='text-muted-foreground text-sm font-bold'>
        N° {pokemon.id}
      </span>

      <h2 class='text-primary text-3xl font-bold capitalize'>
        {pokemon.name}
      </h2>

      <div class='flex justify-center gap-2'>
        {#each pokemon.pokemontypes as { type }}
          <div
            class='rounded-md px-4 py-1 text-sm font-semibold'
            style={`background-color: ${typeColors[type?.name ?? '#999']}`}
          >
            {#if type?.name}
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            {/if}
          </div>
        {/each}
      </div>

      {#if pokemon.pokemonspecy?.pokemonspeciesflavortexts}
        <h4 class='mt-4 font-semibold'>Pokedex Entry</h4>
        <span class='text-muted-foreground max-w-sm text-sm'>
          {pokemon.pokemonspecy?.pokemonspeciesflavortexts?.[0]?.flavor_text ?? 'No description available.'}
        </span>
      {/if}

      <div class='mt-4 flex w-full justify-between gap-6'>
        {@render bodyStat('Height', `${(pokemon.height ?? 0) / 10}m`)}
        {@render bodyStat('Weight', `${(pokemon.weight ?? 0) / 10}kg`)}
      </div>

      <div class='mt-4 flex w-full flex-col justify-between gap-2'>
        <h4 class='text-foreground font-semibold'>Abilities</h4>
        <div class='flex justify-between gap-6'>
          {#each pokemon.pokemonabilities as { ability }}
            <span class='bg-card text-foreground w-full rounded-lg p-1 text-sm capitalize'>
              {ability?.name}
            </span>
          {/each}
        </div>
      </div>

      <div class='mt-4 flex gap-4'>
        {#each pokemon.pokemonstats as stat}
          {@render statItem(
            stat.stat?.name ? statLabels[stat.stat.name] : 'N/A',
            stat.base_stat,
            stat.stat?.name ? statColors[stat.stat.name] : '#aaa',
          )}
        {/each}
        {@render statItem(
          'TOT',
          pokemon.pokemonstats.reduce((sum, s) => sum + s.base_stat, 0),
          '#60A5FA',
        )}
      </div>
    </div>
  </div>
</div>
