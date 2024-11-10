# Incorta Task

## Overview:
This project is a Playwright-based test suite for verifying various functionalities of the saucedemo web app.

## Prerequisites
- Node.js
- npm (Node Package Manager)
- Playwright
- Visual Studio Code (VS Code)

## Project Structure
- **pageobjects**: Contains page object files for each page tested, implementing methods to interact with page elements.
- **e2e**: Contains the test file that run various scenarios.
- **playwright.config.js**: Contains the Playwright configuration settings.
- **playwright-report**: Stores the HTML report.
- **tests.spec.js-snapshots**: Stores the screenshots.
- **package.json**: Contains the project dependencies and scripts.

## TestCases
- **TC1:** Visual Regression Test for Valid Scenario.
- **TC2:** Verify the user is able to login and place an order successfully.
- **TC3:** Verify the user is not able to login with invalid credentials.
- **TC4:** Verify the user is not able to login with empty credentials.
- **TC5:** Verify the user cannot place an order without filling the checkout information.

when running the tests and the test fails, it will try 2 times using flaky test and the test will take a screenshot and save it in the `tests.spec.js-snapshots` folder.

### Running Tests
To run the Tests, use the following command:
   ```sh
   npx playwright test
   ```
### Test Report
The test report is generated in the `playwright-report` folder.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/elsayedelkholy/Incorta_Task.git
   ```
2. Install the required Node packages, including Playwright:
   ```sh
   npm install
   ```
3. Install Playwright Browsers:
   ```sh
   npx playwright install
   ```
4. Run the Tests:
   ```sh
   npx playwright test
   ```
