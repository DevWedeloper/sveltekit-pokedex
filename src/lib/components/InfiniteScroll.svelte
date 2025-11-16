<script lang='ts'>
  import type { Snippet } from 'svelte'
  import { onDestroy, onMount } from 'svelte'

  type Props = {
    loadMore: () => Promise<any>
    scrollViewport?: HTMLDivElement | null
    children: Snippet
  }

  const { loadMore, scrollViewport, children }: Props = $props()

  let sentinel: HTMLDivElement | null = $state(null)
  let observer: IntersectionObserver

  onMount(() => {
    if (!sentinel)
      return

    observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          await loadMore()
        }
      },
      {
        root: scrollViewport,
        rootMargin: '1px',
        threshold: 0.1,
      },
    )

    observer.observe(sentinel)
  })

  onDestroy(() => {
    if (observer && sentinel)
      observer.unobserve(sentinel)
  })
</script>

{@render children()}
<div bind:this={sentinel} data-testing-id='sentinel'></div>
