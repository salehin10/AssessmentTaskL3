import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  // Product elements
  private readonly productItems: Locator;

  constructor(page: Page) {
    super(page);
    
    // Product selectors
    this.productItems = page.locator('.productinfo');
  }


  /**
   * Adds a product to cart by index
   * @param productIndex Index of the product to add (0-based)
   */
  async addProductToCart(productIndex: number = 0): Promise<void> {
    // Get the specific product item
    const productItem = this.productItems.nth(productIndex);
    
    // Scroll to the product to ensure it's in view
    await productItem.scrollIntoViewIfNeeded();
    
    // Wait for the page to stabilize
    await this.page.waitForTimeout(500);
    
    // Hover over the product to show the add to cart button
    await productItem.hover();
    
    // Wait a bit for the hover effect to stabilize
    await this.page.waitForTimeout(500);
    
    // Get the add to cart button for this specific product
    const addToCartButton = productItem.locator('a.add-to-cart');
    
    // Ensure the button is visible and clickable
    await addToCartButton.waitFor({ state: 'visible' });
    
    // Click the add to cart button with force if needed
    await addToCartButton.click({ force: true });
    
    // Handle the modal that appears after adding to cart
    await this.handleAddToCartModal();
    
    // Wait for the page to stabilize after modal closes
    await this.page.waitForTimeout(1000);
  }

  /**
   * Handles the modal that appears after adding a product to cart
   */
  private async handleAddToCartModal(): Promise<void> {
    try {
      // Wait for the modal to appear
      const modal = this.page.locator('#cartModal');
      await modal.waitFor({ state: 'visible', timeout: 3000 });
      
      // Click "Continue Shopping" button to close the modal
      const continueShoppingBtn = this.page.locator('#cartModal .modal-footer button', { hasText: 'Continue Shopping' });
      if (await continueShoppingBtn.isVisible()) {
        await continueShoppingBtn.click();
        
        // Wait for modal to be hidden
        await modal.waitFor({ state: 'hidden', timeout: 3000 });
      }
    } catch (error) {
      // Modal handling failed, continue
    }
  }


  /**
   * Gets the number of products on the page
   * @returns Number of products
   */
  async getProductCount(): Promise<number> {
    const count = await this.productItems.count();
    return count;
  }

  /**
   * Waits for the page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Waits for products to be visible
   */
  async waitForProducts(): Promise<void> {
    await this.page.waitForSelector('.productinfo', { timeout: 10000 });
  }
}
