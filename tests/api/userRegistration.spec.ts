import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/utils/apiClient';
import { TestDataGenerator } from '../../src/utils/testDataGenerator';
import { CredentialsManager } from '../../src/utils/credentialsManager';

test.describe('API Tests - User Registration', () => {
  let apiClient: ApiClient;
  let testUser: any;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    testUser = TestDataGenerator.generateUserCredentials();
  });

  test('TC-API-001: Create new user account successfully', async () => {
    const apiPayload = TestDataGenerator.generateApiPayload(testUser);
    const response = await apiClient.createAccount(apiPayload);
    
    // Validate successful response
    apiClient.validateSuccessfulCreation(response);
    
    // Save credentials for UI tests
    CredentialsManager.saveCredentials(testUser);
  });

  test('TC-API-002: Attempt to create account with existing email', async () => {
    const apiPayload = TestDataGenerator.generateApiPayload(testUser);
    
    // First, create a user account
    const firstResponse = await apiClient.createAccount(apiPayload);
    apiClient.validateSuccessfulCreation(firstResponse);
    
    // Save credentials
    CredentialsManager.saveCredentials(testUser);
    
    // Attempt to create account with same email
    const duplicateResponse = await apiClient.createAccount(apiPayload);
    apiClient.validateDuplicateEmailError(duplicateResponse);
  });
});