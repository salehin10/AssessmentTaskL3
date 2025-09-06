import { faker } from '@faker-js/faker';

export interface UserCredentials {
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class TestDataGenerator {
  /**
   * Generates unique user credentials for testing
   * @returns UserCredentials object with unique email and valid test data
   */
  static generateUserCredentials(): UserCredentials {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    
    return {
      email: `testuser_${timestamp}_${randomSuffix}@example.com`,
      password: 'TestPassword123!',
      name: faker.person.fullName(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'United States',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.string.numeric(10)
    };
  }

  /**
   * Generates API request payload for user registration
   * @param credentials User credentials object
   * @returns API request payload
   */
  static generateApiPayload(credentials: UserCredentials) {
    return {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      title: 'Mr',
      birth_date: '01',
      birth_month: '01',
      birth_year: '1990',
      firstname: credentials.firstName,
      lastname: credentials.lastName,
      company: credentials.company,
      address1: credentials.address1,
      address2: credentials.address2,
      country: credentials.country,
      zipcode: credentials.zipcode,
      state: credentials.state,
      city: credentials.city,
      mobile_number: credentials.mobileNumber
    };
  }

  /**
   * Generates checkout data for testing
   * @returns Checkout data object
   */
  static generateCheckoutData(): UserCredentials {
    return this.generateUserCredentials();
  }

  /**
   * Generates payment data for testing
   * @returns Payment data object
   */
  static generatePaymentData() {
    return {
      nameOnCard: faker.person.fullName(),
      cardNumber: '4111111111111111', // Valid test card number
      cvc: faker.string.numeric(3),
      expiryMonth: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'),
      expiryYear: faker.number.int({ min: 2025, max: 2030 }).toString()
    };
  }
}
