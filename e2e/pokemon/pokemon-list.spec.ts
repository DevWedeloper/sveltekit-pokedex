import { expect, test } from '@playwright/test'

test('displays list of Pokémon', async ({ page }) => {
  await page.goto('/pokemon')

  // Wait for loading text to disappear
  await page.getByText('Loading Pokemons...').waitFor({ state: 'detached' })

  // Now wait for at least one card
  const cards = page.locator('a.group')
  await cards.first().waitFor({ state: 'visible' })

  // Verify card count
  expect(await cards.count()).toBeGreaterThan(0)
})

test('filters Pokémon by type', async ({ page }) => {
  await page.goto('/pokemon')

  // Wait for initial load
  await page.getByText('Loading Pokemons...').waitFor({ state: 'detached' })

  // Wait for filter button
  const normalFilter = page.locator('button', { hasText: 'Normal' })
  await normalFilter.waitFor({ state: 'visible' })

  // Click Normal
  await normalFilter.click()

  // Wait for list to reload
  await page.getByText('Loading Pokemons...').waitFor({ state: 'detached' })

  // Ensure at least one card is visible
  const firstCard = page.locator('a.group').first()
  await firstCard.waitFor({ state: 'visible' })

  // Assert Pidgey is visible
  await expect(page.locator('p', { hasText: 'Pidgey' })).toBeVisible()
})

test('loads more Pokémon on scroll in main grid', async ({ page }) => {
  await page.goto('/pokemon')

  // Wait for initial Pokémon cards to appear
  const cards = page.locator('a.group')
  await cards.first().waitFor({ state: 'visible' })

  const initialCount = await cards.count()

  const scrollArea = page.locator('[data-testing-id="main-grid"]')

  await scrollArea.waitFor({ state: 'attached' })

  await scrollArea.evaluate((el) => {
    const sentinel = el.querySelector('div[data-testing-id="sentinel"]')
    if (sentinel) {
      sentinel.scrollIntoView({ behavior: 'auto', block: 'nearest' })
    }
  })

  await page.getByText('Loading more Pokemons...').waitFor({ state: 'detached' })

  const newCount = await cards.count()
  expect(newCount).toBeGreaterThan(initialCount)
})

test('search Pokémon by name', async ({ page }) => {
  await page.goto('/pokemon')

  // Wait for initial Pokémon cards to load
  const cards = page.locator('a.group')
  await cards.first().waitFor({ state: 'visible' })

  const initialCount = await cards.count()

  // Find the search input
  const searchInput = page.locator('input[placeholder="Search..."]')
  await searchInput.waitFor({ state: 'visible' })

  // Type "bulb" into the search input
  await searchInput.fill('bulb')

  // Wait for new cards to appear or count to change
  await page.waitForFunction(
    oldCount => document.querySelectorAll('a.group').length !== oldCount,
    initialCount,
  )

  // Wait for list to reload
  await page.getByText('Loading Pokemons...').waitFor({ state: 'detached' })

  // Verify all visible cards contain "bulb" in their name
  const filteredCards = page.locator('a.group')
  const count = await filteredCards.count()
  expect(count).toBeGreaterThan(0)

  for (let i = 0; i < count; i++) {
    const name = await filteredCards.nth(i).locator('p.text-sm').textContent()
    expect(name).not.toBeNull()
    expect(name!.toLowerCase()).toContain('bulb')
  }
})
