import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Checkout form elements
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyInput: Locator;
  private readonly address1Input: Locator;
  private readonly address2Input: Locator;
  private readonly countrySelect: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator;
  private readonly mobileNumberInput: Locator;

  // Action buttons
  private readonly placeOrderButton: Locator;

  // Payment elements
  private readonly nameOnCardInput: Locator;
  private readonly cardNumberInput: Locator;
  private readonly cvcInput: Locator;
  private readonly expiryMonthInput: Locator;
  private readonly expiryYearInput: Locator;
  private readonly payAndConfirmButton: Locator;

  // Success elements
  private readonly successMessage: Locator;
  private readonly downloadInvoiceButton: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Checkout form selectors
    this.nameInput = page.locator('input[data-qa="name"]');
    this.emailInput = page.locator('input[data-qa="email"]');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.address1Input = page.locator('input[data-qa="address"]');
    this.address2Input = page.locator('input[data-qa="address2"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');

    // Action button selectors
    this.placeOrderButton = page.locator('a[href="/payment"]');
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payAndConfirmButton = page.locator('button[data-qa="pay-button"]');

    // Success message selectors
    this.successMessage = page.locator('p:has-text("Congratulations! Your order has been confirmed!")');
    this.downloadInvoiceButton = page.locator('a[href*="invoice"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }


  /**
   * Fills the checkout form with user details
   * @param userData User data object
   */
  async fillCheckoutForm(userData: any): Promise<void> {
    await this.fillInput(this.nameInput, userData.name);
    await this.fillInput(this.emailInput, userData.email);
    await this.fillInput(this.passwordInput, userData.password);
    await this.fillInput(this.firstNameInput, userData.firstName);
    await this.fillInput(this.lastNameInput, userData.lastName);
    await this.fillInput(this.companyInput, userData.company);
    await this.fillInput(this.address1Input, userData.address1);
    await this.fillInput(this.address2Input, userData.address2);
    
    // Select country
    await this.countrySelect.selectOption(userData.country);
    
    await this.fillInput(this.stateInput, userData.state);
    await this.fillInput(this.cityInput, userData.city);
    await this.fillInput(this.zipcodeInput, userData.zipcode);
    await this.fillInput(this.mobileNumberInput, userData.mobileNumber);
  }

  /**
   * Clicks the place order button
   */
  async placeOrder(): Promise<void> {
    await this.clickElement(this.placeOrderButton, true);
  }

  /**
   * Fills payment form
   * @param paymentData Payment data object
   */
  async fillPaymentForm(paymentData: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }): Promise<void> {
    await this.fillInput(this.nameOnCardInput, paymentData.nameOnCard);
    await this.fillInput(this.cardNumberInput, paymentData.cardNumber);
    await this.fillInput(this.cvcInput, paymentData.cvc);
    await this.fillInput(this.expiryMonthInput, paymentData.expiryMonth);
    await this.fillInput(this.expiryYearInput, paymentData.expiryYear);
  }

  /**
   * Confirms payment
   */
  async confirmPayment(): Promise<void> {
    await this.clickElement(this.payAndConfirmButton, true);
  }

  /**
   * Verifies order success
   * @param expectedMessage Expected success message
   */
  async verifyOrderSuccess(expectedMessage: string = 'Congratulations! Your order has been confirmed!'): Promise<void> {
    // Wait a bit for the page to load
    await this.page.waitForTimeout(2000);
    expect(this.successMessage).toHaveText(expectedMessage);
    
    
  }

  /**
   * Downloads the invoice
   */
  async downloadInvoice(): Promise<void> {
    
    // Set up download promise
    const downloadPromise = this.page.waitForEvent('download');
    await this.clickElement(this.downloadInvoiceButton);
    const download = await downloadPromise;
    
    // Save the file
    const fileName = `invoice_${Date.now()}.pdf`;
    await download.saveAs(`downloads/${fileName}`);
    
  }

  /**
   * Continues after successful order
   */
  async continueAfterOrder(): Promise<void> {
    await this.clickElement(this.continueButton);
  }


}
