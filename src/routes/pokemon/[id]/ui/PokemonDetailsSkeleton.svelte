<script lang='ts'>
  import { Skeleton } from '$lib/components/ui/skeleton'

</script>

<div class='flex justify-center'>
  <div class='flex max-w-80 flex-col items-center gap-4 rounded-2xl p-4 text-center'>
    <!-- Pokémon Image Skeleton -->
    <Skeleton class='h-40 w-40 rounded-full' />

    <!-- ID and Name -->
    <div class='flex flex-col items-center gap-2'>
      <Skeleton class='h-4 w-12' /> <!-- ID -->
      <Skeleton class='h-8 w-32' /> <!-- Name -->

      <!-- Type Badges -->
      <div class='flex justify-center gap-2'>
        <Skeleton class='h-6 w-16 rounded-md' />
        <Skeleton class='h-6 w-16 rounded-md' />
      </div>

      <!-- Pokedex Entry -->
      <div class='mt-4 space-y-2'>
        <Skeleton class='h-5 w-20' /> <!-- "Pokedex Entry" label -->
        <Skeleton class='h-4 w-60' />
        <Skeleton class='h-4 w-56' />
        <Skeleton class='h-4 w-64' />
      </div>

      <!-- Height & Weight -->
      <div class='mt-4 flex w-full justify-between gap-6'>
        <Skeleton class='h-8 w-20 rounded-lg' />
        <Skeleton class='h-8 w-20 rounded-lg' />
      </div>

      <!-- Abilities -->
      <div class='mt-4 flex flex-wrap justify-center gap-4'>
        <Skeleton class='h-6 w-24 rounded-lg' />
        <Skeleton class='h-6 w-24 rounded-lg' />
      </div>

      <!-- Stats -->
      <div class='mt-4 flex flex-wrap justify-center gap-4'>
        {#each Array.from({ length: 7 }) as _}
          <Skeleton class='h-8 w-8 rounded-full' />
        {/each}
      </div>

    </div>
  </div>
</div>
