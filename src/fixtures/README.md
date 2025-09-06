# Page Fixtures

This directory contains Playwright page fixtures that provide easy access to all page objects in your tests.

## What are Page Fixtures?

Page fixtures are a Playwright feature that allows you to automatically initialize and provide page objects to your tests. Instead of manually creating page objects in each test, you can use fixtures to have them automatically available.

## How to Use

### Basic Usage

```typescript
import { test, expect } from '../fixtures/page_fixture';

test('My test', async ({ homePage, loginPage }) => {
  // Page objects are automatically available
  await homePage.goToHomePage();
  await homePage.clickSignupLogin();
  await loginPage.verifyLoginFormVisible();
});
```

### Available Fixtures

The following page fixtures are available:

- `homePage` - HomePage instance
- `loginPage` - LoginPage instance  
- `productsPage` - ProductsPage instance
- `cartPage` - CartPage instance
- `checkoutPage` - CheckoutPage instance

### Using Individual Fixtures

You can use only the fixtures you need:

```typescript
test('Login test', async ({ loginPage }) => {
  await loginPage.goToLoginPage();
  await loginPage.login('user@example.com', 'password');
});
```

### Using Multiple Fixtures

```typescript
test('Complete flow', async ({ homePage, loginPage, productsPage, cartPage }) => {
  await homePage.goToHomePage();
  await homePage.clickSignupLogin();
  await loginPage.login('user@example.com', 'password');
  await homePage.clickProducts();
  await productsPage.addProductToCart(0);
  await homePage.clickCart();
  await cartPage.verifyCartItemCount(1);
});
```

## Benefits

1. **Cleaner Tests**: No need to manually initialize page objects
2. **Consistent Setup**: All page objects are initialized the same way
3. **Better Organization**: Page objects are managed centrally
4. **Type Safety**: Full TypeScript support with proper typing
5. **Reusability**: Easy to use across multiple test files

## Migration from Manual Setup

### Before (Manual Setup)
```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { LoginPage } from '../../src/pages/LoginPage';

test('My test', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  
  await homePage.goToHomePage();
  await homePage.clickSignupLogin();
  await loginPage.verifyLoginFormVisible();
});
```

### After (With Fixtures)
```typescript
import { test, expect } from '../fixtures/page_fixture';

test('My test', async ({ homePage, loginPage }) => {
  await homePage.goToHomePage();
  await homePage.clickSignupLogin();
  await loginPage.verifyLoginFormVisible();
});
```

## Advanced Usage

### Custom Setup with Fixtures

You can still do custom setup while using fixtures:

```typescript
test('Custom setup', async ({ homePage, loginPage }) => {
  // Custom navigation
  await homePage.page.goto('https://custom-url.com');
  
  // Use fixtures
  await homePage.clickSignupLogin();
  await loginPage.verifyLoginFormVisible();
});
```

### Accessing the Page Object

If you need direct access to the Playwright page object:

```typescript
test('Direct page access', async ({ homePage }) => {
  // Access the underlying page object
  await homePage.page.goto('https://example.com');
  await homePage.page.screenshot({ path: 'screenshot.png' });
});
```

## File Structure

```
src/fixtures/
├── page_fixture.ts    # Main fixture file
└── README.md         # This documentation
```

## Examples

See the following example files:
- `tests/e2e/purchaseFlow_with_fixtures.spec.ts` - Complete purchase flow using fixtures
- `tests/e2e/example_usage.spec.ts` - Various usage examples
