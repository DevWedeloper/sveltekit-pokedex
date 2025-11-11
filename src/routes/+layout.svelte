<script lang='ts'>
  import { page } from '$app/state'
  import favicon from '$lib/assets/favicon.svg'
  import Navbar from '$lib/components/Navbar.svelte'
  import { QueryClientProvider } from '@tanstack/svelte-query'
  import '../app.css'

  const { children, data } = $props()
</script>

<svelte:head>
  <link rel='icon' href={favicon} />

  <link rel='canonical' href='{page.url.origin}{page.url.pathname}' />

  <title>Pokédex</title>
  <meta name='title' content='Pokédex' />
  <meta name='description' content='A modern Pokédex built with SvelteKit.' />
  <meta name='author' content='DevWedeloper ' />
</svelte:head>

<Navbar />

<QueryClientProvider client={data.queryClient}>
  {@render children?.()}
</QueryClientProvider>
