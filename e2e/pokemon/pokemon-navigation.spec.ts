import { expect, test } from '@playwright/test'

test('should navigate to the correct URL when switching filters and viewing Pokémon', async ({ page }) => {
  await page.goto('/pokemon/1')

  await expect(page).toHaveURL('/pokemon/1')

  // Wait for initial load
  await page.getByText('Loading Pokemons...').waitFor({ state: 'detached' })

  // Wait for filter button
  const normalFilter = page.locator('button', { hasText: 'Normal' })
  await normalFilter.waitFor({ state: 'visible' })

  // Click Normal
  await normalFilter.click()

  // Wait for list to reload
  await page.getByText('Loading Pokemons...').waitFor({ state: 'detached' })

  await expect(page).toHaveURL('/pokemon/1?filterType=type&filterValue=normal')

  // Ensure at least one card is visible
  const firstCard = page.locator('a.group').first()
  await firstCard.waitFor({ state: 'visible' })

  await firstCard.click()

  // Pidgey is the first normal type Pokémon
  await expect(page).toHaveURL('/pokemon/16?filterType=type&filterValue=normal')

  const resetFiltersButton = page.locator('button', { hasText: 'Reset' })
  await resetFiltersButton.click()

  await expect(page).toHaveURL('/pokemon/16')

  const newFirstCard = page.locator('a.group').first()
  await newFirstCard.waitFor({ state: 'visible' })

  await newFirstCard.click()

  await expect(page).toHaveURL('/pokemon/1')
})
