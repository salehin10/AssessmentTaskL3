import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Form elements
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly signupButton: Locator;

  // Signup form elements
  private readonly signupNameInput: Locator;
  private readonly signupEmailInput: Locator;

  // Messages
  private readonly errorMessage: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Login form selectors
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    
    // Signup form selectors
    this.signupNameInput = page.locator('input[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');

    // Message selectors
    this.errorMessage = page.locator('.login-form p');
    this.successMessage = page.locator('.signup-form p');
  }

  /**
   * Navigates to the login page
   */
  async goToLoginPage(): Promise<void> {
    await this.navigateTo('https://automationexercise.com/login');
  }

  /**
   * Performs user login
   * @param email User email
   * @param password User password
   */
  async login(email: string, password: string): Promise<void> {
    
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton, true);
    
  }

  /**
   * Performs user signup
   * @param name User name
   * @param email User email
   */
  async signup(name: string, email: string): Promise<void> {
    
    await this.fillInput(this.signupNameInput, name);
    await this.fillInput(this.signupEmailInput, email);
    await this.clickElement(this.signupButton, true);
    
  }

  /**
   * Verifies login error message
   * @param expectedMessage Expected error message
   */
  async verifyLoginError(expectedMessage: string): Promise<void> {
    await this.verifyTextContains(this.errorMessage, expectedMessage);
  }

  /**
   * Verifies signup success message
   * @param expectedMessage Expected success message
   */
  async verifySignupSuccess(expectedMessage: string): Promise<void> {
    await this.verifyTextContains(this.successMessage, expectedMessage);
  }

  /**
   * Checks if login form is visible
   */
  async verifyLoginFormVisible(): Promise<void> {
    await this.verifyElementVisible(this.emailInput);
    await this.verifyElementVisible(this.passwordInput);
    await this.verifyElementVisible(this.loginButton);
  }

  /**
   * Checks if signup form is visible
   */
  async verifySignupFormVisible(): Promise<void> {
    await this.verifyElementVisible(this.signupNameInput);
    await this.verifyElementVisible(this.signupEmailInput);
    await this.verifyElementVisible(this.signupButton);
  }
}
