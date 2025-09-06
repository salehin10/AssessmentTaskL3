import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Cart elements
  private readonly cartItems: Locator;

  // Action buttons
  private readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Cart item selectors
    this.cartItems = page.locator('#cart_info_table tbody tr');

    // Action button selectors
    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout")');
  }

  /**
   * Gets the number of items in the cart
   * @returns Number of cart items
   */
  async getCartItemCount(): Promise<number> {
    const count = await this.cartItems.count();
    return count;
  }


  /**
   * Verifies cart contains expected number of items
   * @param expectedCount Expected number of items
   */
  async verifyCartItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getCartItemCount();
    expect(actualCount).toBe(expectedCount);
  }


  /**
   * Proceeds to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.proceedToCheckoutButton, false);
  }


}
