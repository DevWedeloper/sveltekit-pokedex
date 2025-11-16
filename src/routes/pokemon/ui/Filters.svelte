<script lang='ts'>
  import type { FilterListQuery } from '@/gql/graphql'
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

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
</script>

<div class='mb-6'>
  <Button variant='destructive' onclick={resetFilters}>
    Reset
  </Button>

  <h3 class='mt-3 mb-2 font-semibold'>Search</h3>
  <Input bind:value={search} {oninput} type='text' placeholder='Search...' />

  <h3 class='mt-3 mb-2 font-semibold'>Types</h3>
  <ScrollArea orientation='horizontal' class='w-full'>
    <div class='flex gap-2 pb-2'>
      {#each filters.type as type}
        <Button variant='outline' onclick={() => updateFilter('type', type.name)}>
          {capitalize(type.name)}
        </Button>
      {/each}
    </div>
  </ScrollArea>

  <h3 class='mt-3 mb-2 font-semibold'>Regions</h3>
  <ScrollArea orientation='horizontal' class='w-full'>
    <div class='flex gap-2 pb-2'>
      {#each filters.region as region}
        <Button variant='outline' onclick={() => updateFilter('region', region.name)}>
          {capitalize(region.name)}
        </Button>
      {/each}
    </div>
  </ScrollArea>
</div>
