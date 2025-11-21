import { expect, test } from '@playwright/test'

test('navigates to Pokémon detail page', async ({ page }) => {
  await page.goto('/pokemon')

  const cards = page.locator('a.group')
  await cards.first().waitFor({ state: 'visible' })

  await cards.first().click()

  await expect(page).toHaveURL(/\/pokemon\/1$/)

  await expect(page.getByRole('heading', { level: 2 })).toHaveText(/bulbasaur/i)
})

test('navigates and preserves query params', async ({ page }) => {
  // Go to Pokémon list with query params
  await page.goto('/pokemon?filterType=region&filterValue=kanto')

  const cards = page.locator('a.group')
  await cards.first().waitFor({ state: 'visible' })

  // Click first Pokémon
  await cards.first().click()

  // Verify navigation includes the Pokémon detail page
  await expect(page).toHaveURL(/\/pokemon\?filterType=region&filterValue=kanto/)
})
