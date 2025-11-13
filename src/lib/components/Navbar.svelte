<script>
  import pokeball from '$lib/assets/pokeball.svg'
</script>

<nav class='bg-card text-card-foreground w-full shadow-sm'>
  <div class='mx-auto flex max-w-6xl items-center justify-between px-6 py-4'>
    <a href='/' class='text-primary flex items-center gap-2 text-xl font-bold transition hover:opacity-90'>
      <img src={pokeball} alt='Pokeball' class='h-6 w-6' />
      <span>Pokédex</span>
    </a>
    <div class='text-foreground flex space-x-6 font-medium'>
      <a href='/pokemon' class='hover:text-primary transition'>Pokemon</a>
    </div>
  </div>
</nav>
