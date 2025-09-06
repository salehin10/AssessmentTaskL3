import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Navigation elements
  private readonly signupLoginLink: Locator;
  private readonly loggedInAsText: Locator;
  private readonly productsLink: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Navigation selectors
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.loggedInAsText = page.locator('a:has-text("Logged in as")');
    this.productsLink = page.locator('a[href="/products"]');
    this.cartLink = page.locator('a[href="/view_cart"]').first();
  }

  /**
   * Navigates to the home page
   */
  async goToHomePage(): Promise<void> {
    await this.navigateTo('https://automationexercise.com');
  }

  /**
   * Clicks on Signup/Login link
   */
  async clickSignupLogin(): Promise<void> {
    await this.clickElement(this.signupLoginLink);
  }

  /**
   * Verifies user is logged in
   * @param username Username to verify
   */
  async verifyLoggedIn(username: string): Promise<void> {
    await this.verifyTextContains(this.loggedInAsText, username);
  }

  /**
   * Clicks on Products link
   */
  async clickProducts(): Promise<void> {
    await this.clickElement(this.productsLink);
  }

  /**
   * Clicks on Cart link
   */
  async clickCart(): Promise<void> {
    await this.clickElement(this.cartLink);
  }
}
