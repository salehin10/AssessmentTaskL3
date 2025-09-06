import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { UserCredentials } from './testDataGenerator';

export class CredentialsManager {
  private static readonly CREDENTIALS_FILE = 'user_credentials.json';

  /**
   * Saves user credentials to JSON file
   * @param credentials User credentials to save
   */
  static saveCredentials(credentials: UserCredentials): void {
    try {
      writeFileSync(
        join(process.cwd(), this.CREDENTIALS_FILE),
        JSON.stringify(credentials, null, 2),
        'utf8'
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Loads user credentials from JSON file
   * @returns User credentials object
   */
  static loadCredentials(): UserCredentials {
    try {
      const filePath = join(process.cwd(), this.CREDENTIALS_FILE);
      
      if (!existsSync(filePath)) {
        throw new Error(`Credentials file not found: ${filePath}`);
      }

      const fileContent = readFileSync(filePath, 'utf8');
      const credentials = JSON.parse(fileContent) as UserCredentials;
      
      return credentials;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Checks if credentials file exists
   * @returns boolean indicating if file exists
   */
  static credentialsExist(): boolean {
    const filePath = join(process.cwd(), this.CREDENTIALS_FILE);
    return existsSync(filePath);
  }

  /**
   * Deletes credentials file
   * @returns boolean indicating if file was successfully deleted
   */
  static deleteCredentials(): boolean {
    try {
      const filePath = join(process.cwd(), this.CREDENTIALS_FILE);
      if (existsSync(filePath)) {
        require('fs').unlinkSync(filePath);
        return true;
      }
      return false; // File didn't exist
    } catch (error) {
      console.warn(`Failed to delete credentials file: ${error}`);
      return false;
    }
  }
}
