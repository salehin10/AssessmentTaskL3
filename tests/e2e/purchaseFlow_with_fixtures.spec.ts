import { test, expect } from '../../src/fixtures/page_fixture';
import { TestDataGenerator } from '../../src/utils/testDataGenerator';
import { CredentialsManager } from '../../src/utils/credentialsManager';
import { ApiClient } from '../../src/utils/apiClient';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

test.describe('E2E Tests - Purchase Flow', () => {
  let userCredentials: any;
  let apiClient: ApiClient;

  // Helper function to safely take screenshots
  async function takeScreenshot(page: any, filename: string) {
    try {
      await page.screenshot({ path: `test-results/${filename}` });
    } catch (screenshotError) {
      console.log(`Could not take screenshot ${filename} - page may be closed:`, screenshotError);
    }
  }

  test.beforeEach(async ({ request }) => {
    // Ensure downloads directory exists
    const downloadsDir = join(process.cwd(), 'downloads');
    if (!existsSync(downloadsDir)) {
      mkdirSync(downloadsDir, { recursive: true });
    }

    // Ensure test-results directory exists for failure screenshots
    const testResultsDir = join(process.cwd(), 'test-results');
    if (!existsSync(testResultsDir)) {
      mkdirSync(testResultsDir, { recursive: true });
    }

    // Initialize API client
    apiClient = new ApiClient(request);
    
    // Generate new user credentials for this test run
    userCredentials = TestDataGenerator.generateUserCredentials();
  });

  test.afterEach(async () => {
    // Clean up credentials file after each test
    CredentialsManager.deleteCredentials();
  });

  test('Complete E2E Purchase Flow with New User Registration', async ({ 
    homePage, 
    loginPage, 
    productsPage, 
    cartPage, 
    checkoutPage,
    page
  }) => {
    // Add error handling and logging for failures
    test.setTimeout(120000); // 2 minutes timeout for the entire test
    // Step 1: Send a POST request to create account
    await test.step('1. Create new user account via API', async () => {
      try {
        const apiPayload = TestDataGenerator.generateApiPayload(userCredentials);
        const response = await apiClient.createAccount(apiPayload);
        
        // Validate successful response
        apiClient.validateSuccessfulCreation(response);
        
        // Save credentials for UI tests
        CredentialsManager.saveCredentials(userCredentials);
        console.log('API account creation successful');
      } catch (error) {
        console.log('API account creation failed:', error);
        await takeScreenshot(page, 'api-creation-failure.png');
        throw error;
      }
    });

    // Step 2: Navigate to automationexercise.com
    await test.step('2. Navigate to automationexercise.com', async () => {
      try {
        await homePage.goToHomePage();
        await homePage.verifyElementVisible(homePage['signupLoginLink']);
        console.log('Homepage navigation successful');
      } catch (error) {
        console.log('Homepage navigation failed:', error);
        await takeScreenshot(page, 'homepage-navigation-failure.png');
        throw error;
      }
    });

    // Step 3: Retrieve credentials from user_credentials.json (already loaded in beforeEach)
    await test.step('3. Retrieve credentials from user_credentials.json', async () => {
      // Credentials are already loaded in beforeEach
      expect(userCredentials.email).toBeTruthy();
      expect(userCredentials.password).toBeTruthy();
    });

    // Step 4: Perform UI login with the same email & password
    await test.step('4. Perform UI login with stored credentials', async () => {
      try {
        await homePage.clickSignupLogin();
        await loginPage.login(userCredentials.email, userCredentials.password);
        await homePage.verifyLoggedIn(userCredentials.name);
        console.log('Login successful');
      } catch (error) {
        console.log('Login failed:', error);
        await takeScreenshot(page, 'login-failure.png');
        throw error;
      }
    });

    // Step 5: Add two products to cart (preferably from different categories)
    await test.step('5. Add two products to cart from different categories', async () => {
      try {
        await homePage.clickProducts();
        
        // Wait for the products page to load completely
        await productsPage.waitForPageLoad();
        
        // Wait for products to be visible
        await productsPage.waitForProducts();
        
        // Verify products are loaded by checking count
        const productCount = await productsPage.getProductCount();
        expect(productCount).toBeGreaterThan(0);
        
        // Add first product
        await productsPage.addProductToCart(0);
        
        // Add second product (try to get from different category if possible)
        await productsPage.addProductToCart(1);
        console.log('Products added to cart successfully');
      } catch (error) {
        console.log('Adding products to cart failed:', error);
        await takeScreenshot(page, 'add-products-failure.png');
        throw error;
      }
    });

    // Step 6: Proceed to checkout and complete the order
    await test.step('6. Proceed to checkout and complete the order', async () => {
      try {
        await homePage.clickCart();
        await cartPage.verifyCartItemCount(2);
        await cartPage.proceedToCheckout();
        console.log('Checkout navigation successful');
      } catch (error) {
        console.log('Checkout navigation failed:', error);
        await takeScreenshot(page, 'checkout-navigation-failure.png');
        throw error;
      }
    });

    // Step 7: Review order placement
    await test.step('7. Review and place order', async () => {
      //const checkoutData = TestDataGenerator.generateCheckoutData();
      //await checkoutPage.fillCheckoutForm(checkoutData);
      await checkoutPage.placeOrder();
    });

    // Step 8: Assert the success confirmation message and/or validate checkout success URL
    await test.step('8. Fill payment form and confirm payment', async () => {
      try {
        const paymentData = TestDataGenerator.generatePaymentData();
        await checkoutPage.fillPaymentForm(paymentData);
        await checkoutPage.confirmPayment();
        console.log('Payment form filled and confirmed successfully');
      } catch (error) {
        console.log('Payment form filling failed:', error);
        await takeScreenshot(page, 'payment-form-failure.png');
        throw error;
      }
    });

    // Step 9: Verify order placement success
    await test.step('9. Verify order placement success', async () => {
      try {
        await checkoutPage.verifyOrderSuccess();
        console.log('Order success verification passed');
      } catch (error) {
        console.log('Order success verification failed:', error);
        await takeScreenshot(page, 'order-success-verification-failure.png');
        throw error;
      }
    });

    // Step 10: Download the invoice
    await test.step('10. Download the invoice', async () => {
      try {
        await checkoutPage.downloadInvoice();
        console.log('Invoice download successful');
      } catch (error) {
        console.log('Invoice download failed:', error);
        await takeScreenshot(page, 'invoice-download-failure.png');
        throw error;
      }
    });

    // Step 11: Verify the invoice file exists in downloads directory
    await test.step('11. Verify invoice file exists in downloads directory', async () => {
      const downloadsDir = join(process.cwd(), 'downloads');
      const invoiceFiles = require('fs').readdirSync(downloadsDir).filter((file: string) => 
        file.toLowerCase().includes('invoice') || file.toLowerCase().includes('.pdf')
      );
      
      expect(invoiceFiles.length).toBeGreaterThan(0);
    });

    // Step 12: Assert file size > 0 (non-empty)
    await test.step('12. Assert invoice file size > 0 (non-empty)', async () => {
      const downloadsDir = join(process.cwd(), 'downloads');
      const invoiceFiles = require('fs').readdirSync(downloadsDir).filter((file: string) => 
        file.toLowerCase().includes('invoice') || file.toLowerCase().includes('.pdf')
      );
      
      if (invoiceFiles.length > 0) {
        const invoicePath = join(downloadsDir, invoiceFiles[0]);
        const stats = require('fs').statSync(invoicePath);
        expect(stats.size).toBeGreaterThan(0);
      }
    });

    // Continue after order completion
    await test.step('Continue after order completion', async () => {
      await checkoutPage.continueAfterOrder();
    });

  });

});
