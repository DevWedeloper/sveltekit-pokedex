<script lang='ts'>
  import type { FilterListQuery } from '$lib/gql/graphql'
  import { Button } from '$lib/components/ui/button/index.js'
  import { Input } from '$lib/components/ui/input'
  import { ScrollArea } from '$lib/components/ui/scroll-area/index.js'

  type Props = {
    filters: FilterListQuery
    updateFilter: (filterType: string, filterValue: string) => void
    resetFilters: () => void
    search: string
    oninput: (event: Event) => void
  }

  let { filters, updateFilter, resetFilters, search = $bindable(), oninput }: Props = $props()
</script>

{#snippet filterGroup(title: string, items: { name: string }[], filterType: string)}
  <h3 class='mt-3 mb-2 font-semibold'>{title}</h3>
  <ScrollArea orientation='horizontal' class='w-full'>
    <div class='flex gap-2 pb-2'>
      {#each items as item}
        <Button class='capitalize' variant='outline' onclick={() => updateFilter(filterType, item.name)}>
          {item.name}
        </Button>
      {/each}
    </div>
  </ScrollArea>
{/snippet}

<div class='mb-6'>
  <Button variant='destructive' onclick={resetFilters}>
    Reset
  </Button>

  <h3 class='mt-3 mb-2 font-semibold'>Search</h3>
  <Input bind:value={search} {oninput} type='text' placeholder='Search...' />

  {@render filterGroup('Types', filters.type, 'type')}
  {@render filterGroup('Regions', filters.region, 'region')}
</div>
