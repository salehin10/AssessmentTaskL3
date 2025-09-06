import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specific URL
   * @param url URL to navigate to
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Waits for an element to be visible
   * @param locator Element locator
   * @param timeout Timeout in milliseconds
   */
  async waitForElement(locator: Locator, timeout: number = 30000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Clicks an element and waits for navigation if needed
   * @param locator Element locator
   * @param waitForNavigation Whether to wait for navigation
   */
  async clickElement(locator: Locator, waitForNavigation: boolean = false): Promise<void> {
    
    if (waitForNavigation) {
      await Promise.all([
        this.page.waitForNavigation(),
        locator.click()
      ]);
    } else {
      await locator.click();
    }
  }

  /**
   * Fills an input field
   * @param locator Input field locator
   * @param value Value to fill
   */
  async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.clear();
    await locator.fill(value);
  }

  /**
   * Gets text content from an element
   * @param locator Element locator
   * @returns Text content
   */
  async getText(locator: Locator): Promise<string> {
    const text = await locator.textContent();
    return text || '';
  }

  /**
   * Verifies element is visible
   * @param locator Element locator
   */
  async verifyElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  /**
   * Verifies element contains specific text
   * @param locator Element locator
   * @param expectedText Expected text content
   */
  async verifyTextContains(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }

  /**
   * Takes a screenshot
   * @param name Screenshot name
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `screenshots/${name}.png`,
      fullPage: true 
    });
  }
}
