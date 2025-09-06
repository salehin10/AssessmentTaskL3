import { APIRequestContext, expect } from '@playwright/test';

export class ApiClient {
  constructor(private request: APIRequestContext) {
    
  }

  /**
   * Creates a new user account via API
   * @param userData User registration data
   * @returns API response
   */
  async createAccount(userData: any) {
    // Convert object to form data string
    const formData = new URLSearchParams(userData).toString();
    
    const response = await this.request.post('/api/createAccount', {
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseBody = await response.text();

    return {
      status: response.status(),
      body: responseBody,
      json: () => JSON.parse(responseBody)
    };
  }

  /**
   * Validates successful user creation response
   * @param response API response object
   */
  validateSuccessfulCreation(response: any) {
    expect(response.status).toBe(200);
    const responseJson = response.json();
    expect(responseJson.responseCode).toBe(201);
    expect(response.body).toContain('User created!');
  }

  /**
   * Validates duplicate email error response
   * @param response API response object
   */
  validateDuplicateEmailError(response: any) {
    expect(response.status).toBe(200);
    const responseJson = response.json();
    expect(responseJson.responseCode).toBe(400);
    expect(response.body).toContain('Email already exists!');
  }
}
