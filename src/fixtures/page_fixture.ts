import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Define the types for our fixtures
export interface PageFixtures {
  homePage: HomePage;
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
}

// Extend the base test with our page fixtures
export const test = base.extend<PageFixtures>({
  // HomePage fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // LoginPage fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // ProductsPage fixture
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  // CartPage fixture
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // CheckoutPage fixture
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

// Export the test with fixtures
export { expect } from '@playwright/test';

// Export individual page classes for direct imports if needed
export { HomePage } from '../pages/HomePage';
export { LoginPage } from '../pages/LoginPage';
export { ProductsPage } from '../pages/ProductsPage';
export { CartPage } from '../pages/CartPage';
export { CheckoutPage } from '../pages/CheckoutPage';
export { BasePage } from '../pages/BasePage';
