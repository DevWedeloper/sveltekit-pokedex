import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 375, height: 667 } })

test('mobile: hides right panel', async ({ page }) => {
  // Go to Pokémon page
  await page.goto('/pokemon')

  const mainPanel = page.locator('main')
  const sidebar = page.locator('aside.border-sidebar-border')

  // Sidebar should be visible
  await expect(sidebar).toBeVisible()

  // Main panel should be hidden on mobile
  await expect(mainPanel).toHaveCount(1) // ensure it exists
  await expect(mainPanel).not.toBeVisible()
})

test('mobile: displays Pokémon details in modal', async ({ page }) => {
  // Go to Pokémon list
  await page.goto('/pokemon')

  const cards = page.locator('a.group')
  await cards.first().waitFor({ state: 'visible' })

  // Click the first Pokémon (Bulbasaur)
  await cards.first().click()

  // Modal should appear
  const modal = page.locator('[data-slot="dialog-content"][role="dialog"]')
  await expect(modal).toBeVisible()

  // Modal should contain Pokémon name
  await expect(modal.getByRole('heading', { level: 2 })).toHaveText(/bulbasaur/i)
})

test('mobile: closes Pokémon modal and navigates back on overlay click', async ({ page }) => {
  // Go to Pokémon list
  await page.goto('/pokemon')

  const cards = page.locator('a.group')
  await cards.first().waitFor({ state: 'visible' })

  // Open first Pokémon (Bulbasaur) in modal
  await cards.first().click()

  const modal = page.locator('[data-slot="dialog-content"][role="dialog"]')
  await expect(modal).toBeVisible()

  // Close modal (simulate back gesture / click the close button)
  const closeButton = page.locator('[data-dialog-close]')
  await closeButton.click()

  // Modal should no longer exist
  await expect(modal).toHaveCount(0)

  // URL should be back to /pokemon
  await expect(page).toHaveURL('/pokemon')
})
