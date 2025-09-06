# QA Level 3 Assessment - Playwright Automation Framework

A comprehensive Playwright automation framework for the QA Level 3 Assessment, implementing end-to-end purchase flow testing and API automation for the Automation Exercise website.

## 🚀 Features

- **Page Object Model (POM)** - Maintainable and reusable test structure
- **API & UI Testing** - Complete test coverage including API endpoints and UI flows
- **Cross-Browser Support** - Chrome, Firefox, and Safari testing
- **Parallel Execution** - Fast test execution with configurable workers
- **Rich Reporting** - HTML reports, screenshots, and video recordings
- **CI/CD Integration** - GitHub Actions workflow with artifact uploads
- **Test Data Management** - Dynamic test data generation and credential management
- **Invoice Download & Verification** - Complete purchase flow with file validation

## 📋 Test Coverage

### E2E Tests (`tests/e2e/`)
- ✅ Complete purchase flow with new user registration via API
- ✅ 12-step E2E automation following assessment requirements
- ✅ Cart functionality verification
- ✅ Invoice download and validation
- ✅ Error handling with screenshots and console logging
- ✅ Cross-browser testing (Chrome, Firefox, Microsoft Edge)

## 🛠️ Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AssessmentTask
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:browsers
   ```

## 🏃‍♂️ Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suites
```bash
# E2E tests only
npx playwright test tests/e2e/

# Chrome only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# Microsoft Edge only
npx playwright test --project=microsoftedge
```

### Run Tests in Different Modes
```bash
# Headed mode (see browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# UI mode (interactive)
npx playwright test --ui

# All browsers in parallel
npx playwright test
```

### View Test Reports
```bash
npx playwright show-report
```

## 🏗️ Project Structure

```
AssessmentTask/
├── src/
│   ├── pages/                 # Page Object Model classes
│   │   ├── BasePage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── utils/                 # Utility classes
│   │   ├── testDataGenerator.ts
│   │   ├── credentialsManager.ts
│   │   └── apiClient.ts
│   └── fixtures/              # Playwright fixtures
│       └── page_fixture.ts
├── tests/
│   └── e2e/                   # End-to-end test suites
│       └── purchaseFlow_with_fixtures.spec.ts
├── downloads/                  # Invoice downloads
├── test-results/              # Test failure screenshots
├── playwright-report/         # HTML test reports
├── playwright.config.ts       # Playwright configuration
├── package.json
└── README.md
```

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)
- **Browsers**: Chrome, Firefox, Microsoft Edge
- **Parallel Execution**: Enabled with configurable workers
- **Retries**: 2 retries on CI, 0 locally
- **Timeouts**: 30s action timeout, 60s navigation timeout
- **Reporting**: HTML, JSON, and JUnit reports
- **Screenshots**: On failure
- **Videos**: Retained on failure
- **Traces**: On first retry

### Test Data Management
- **Dynamic Generation**: Unique test data for each run
- **Credential Storage**: JSON file for user credentials
- **API Payload**: Structured data for API requests

## 🚀 Test Execution

The framework supports:

### Test Execution
- **Cross-Browser**: Tests run on Chrome, Firefox, and Microsoft Edge
- **Parallel Execution**: Multiple browsers run simultaneously
- **Error Handling**: Automatic screenshots and detailed logging on failures

### Artifacts Generated
- **HTML Reports**: Test execution reports in `playwright-report/`
- **Screenshots**: Failure screenshots in `test-results/`
- **Invoice Files**: Downloaded invoice files in `downloads/`
- **Test Results**: JSON and XML test results

## 📊 Test Reports

After test execution, you can find:

- **HTML Report**: `playwright-report/index.html`
- **Screenshots**: `test-results/` directory (on failure)
- **Videos**: `test-results/` directory (on failure)
- **Invoice Files**: `downloads/` directory

## 🔍 Key Test Scenarios

### 1. Complete E2E Purchase Flow (12 Steps)
1. Create user account via API
2. Navigate to automationexercise.com
3. Retrieve credentials from user_credentials.json
4. Perform UI login with stored credentials
5. Add two products to cart from different categories
6. Proceed to checkout and complete the order
7. Review and place order
8. Fill payment form and confirm payment
9. Verify order placement success
10. Download the invoice
11. Verify invoice file exists in downloads directory
12. Assert invoice file size > 0 (non-empty)

### 2. Error Handling & Debugging
1. Automatic screenshot capture on failures
2. Detailed console logging for each step
3. Safe error handling for closed pages
4. Test timeout management

## 🐛 Debugging

### Debug Mode
```bash
npx playwright test --debug
```

### UI Mode
```bash
npx playwright test --ui
```

### Screenshots
Screenshots are automatically taken on test failures and saved to `test-results/` directory.

### Traces
Traces are generated on first retry and can be viewed using:
```bash
npx playwright show-trace trace.zip
```

## 📝 Test Data

### User Credentials
- Generated dynamically using Faker.js
- Stored in `user_credentials.json`
- Includes all required fields for registration

### API Payload
- Structured according to API requirements
- Includes validation data
- Supports multiple test scenarios

## 🔒 Security Notes

- Passwords are not logged in console output
- Credentials file is cleaned up after tests
- API keys and sensitive data are not hardcoded

## 🚀 Performance

- **Parallel Execution**: Up to 4 workers by default
- **Cross-Browser**: Tests run simultaneously on different browsers
- **Efficient Selectors**: Optimized element locators
- **Smart Waits**: Network idle and element visibility waits

## 📈 Extensibility

The framework is designed for easy extension:

1. **New Page Objects**: Add to `src/pages/`
2. **New Utilities**: Add to `src/utils/`
3. **New Test Suites**: Add to `tests/`
4. **New Browsers**: Update `playwright.config.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
1. Check the [Playwright Documentation](https://playwright.dev/)
2. Review test logs and screenshots
3. Create an issue in the repository

## 🎯 Assessment Completion

This framework fulfills all requirements for the QA Level 3 Assessment:

- ✅ **Framework Structure**: Page Object Model implementation with fixtures
- ✅ **Test Data Management**: Dynamic generation and credential handling
- ✅ **Reporting & Logging**: HTML reports, screenshots, and detailed console logging
- ✅ **Parallel & Cross-Browser**: Chrome, Firefox, Microsoft Edge, and parallel execution
- ✅ **API Automation**: Complete API integration for user registration
- ✅ **E2E Testing**: Full 12-step purchase flow automation
- ✅ **Invoice Download**: File download and validation
- ✅ **Error Handling**: Automatic screenshots and logging on failures
- ✅ **Bonus Features**: Retry mechanism, test parameterization, extensibility

---

**Last Updated**: Septembar 2025  
**Framework Version**: 1.0.0  
**Playwright Version**: Latest
