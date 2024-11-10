const { test, expect } = require('@playwright/test');
const POManager = require('../pageobjects/POManager');
const getTestData = require('./jsonDataProvider');

// Set the user agent to Chrome on Linux
test.use({ userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });


// Testcase for visual regression
test('TC1: Visual Regression Test for Valid Scenario', async ({ page }, testInfo) => {
  const testData = await getTestData();

  // instance of the POManager
  const poManager = new POManager(page);

  // instances of the pages
  const LoginPage = poManager.getLoginPage(page);
  const ProductPage = poManager.getProductPage(page);
  const CartPage = poManager.getCartPage(page);
  const CheckoutPage = poManager.getCheckoutPage(page);
  const HomePage = poManager.getHomePage(page);

  //  test steps
  await page.goto(testData.URL); // navigates to the website.
  expect(await page.screenshot()).toMatchSnapshot('LoginPage.png');
  await LoginPage.submitLoginCredentials(testData.validUsername, testData.password); // logs in using valid username and password values.
  await LoginPage.validateLoginURL(); //verifies navigation to products page
  await ProductPage.validateProductsCount(); //verifies all products are displayed
  await ProductPage.validateProductSpecifications(); // verifies products name, price and description
  await ProductPage.sortProductsByPrice(); //sorts items by price
  await ProductPage.validateProductSorting(); // validates items are sorted by price
  expect(await page.screenshot()).toMatchSnapshot('productsSortedPrice.png');//visual confirmation for the sort
  await ProductPage.sortProductsByName(); //sorts items by name
  await ProductPage.validateProductSpecifications(); // validates items are sorted by name
  expect(await page.screenshot()).toMatchSnapshot('productsSortedAz.png'); //visual confirmation for the sort
  await ProductPage.addProductToCart(); //adds 2 items to cart
  await ProductPage.removeProductFromCart(); //removes 1 item from cart
  await ProductPage.navigateToCart(); //navigates to cart page
  await CartPage.verifyProductInCart(); // verifies the product details in the cart
  expect(await page.screenshot()).toMatchSnapshot('productsInCart.png'); //visual confirmation for the products in the cart
  await CartPage.checkout(); //navigates to checkout page
  await CheckoutPage.fillCheckoutInfo(testData.firstName, testData.lastName, testData.postalCode); //fills checkout data: first and last name and postal code
  await CheckoutPage.validateCheckoutOverview(); //reviews product, placing order and validates that order is placed
  await HomePage.logout(); //user logs out and is redirected to login page
})

// TC: Verify the user is able to login and place an order successfully
test('TC2: Verify the user is able to login and place an order successfully', async ({ page }, testInfo) => {
  const testData = await getTestData();

  // instance of the POManager
  const poManager = new POManager(page);

  // instances of the pages
  const LoginPage = poManager.getLoginPage(page);
  const ProductPage = poManager.getProductPage(page);
  const CartPage = poManager.getCartPage(page);
  const CheckoutPage = poManager.getCheckoutPage(page);
  const HomePage = poManager.getHomePage(page);

  //  test steps
  await page.goto(testData.URL); // navigates to the website.
  await LoginPage.submitLoginCredentials(testData.validUsername, testData.password); // logs in using valid username and password values.
  await LoginPage.validateLoginURL(); //verifies navigation to products page
  await ProductPage.validateProductsCount(); //verifies all products are displayed
  await ProductPage.validateProductSpecifications(); // verifies products name, price and description
  await ProductPage.sortProductsByPrice(); //sorts items by price
  await ProductPage.validateProductSorting(); // validates items are sorted by price
  expect(await page.screenshot()).toMatchSnapshot('productsSortedPrice.png'); // Visual confirmation for the sort by price
  await ProductPage.sortProductsByName(); //sorts items by name
  await ProductPage.validateProductSpecifications(); // validates items are sorted by name
  expect(await page.screenshot()).toMatchSnapshot('productsSortedAz.png'); // Visual confirmation for the sort by name
  await ProductPage.addProductToCart(); //adds 2 items to cart
  await ProductPage.removeProductFromCart(); //removes 1 item from cart
  await ProductPage.navigateToCart(); //navigates to cart page
  await CartPage.verifyProductInCart(); // verifies the product details in the cart
  expect(await page.screenshot()).toMatchSnapshot('productsInCart.png'); // Visual confirmation for the products in the cart
  await CartPage.checkout(); //navigates to checkout page
  await CheckoutPage.fillCheckoutInfo(testData.firstName, testData.lastName, testData.postalCode); //fills checkout data: first and last name and postal code
  await CheckoutPage.validateCheckoutOverview(); //reviews product, placing order and validates that order is placed
  await HomePage.logout(); //user logs out and is redirected to login page

})
// TC: Verify the user is not able to login with invalid credentials
test('TC3: Verify the user is not able to login with invalid credentials', async ({ page }, testInfo) => {
  const testData = await getTestData();

  // instance of the POManager
  const poManager = new POManager(page);

  // instance of the login page
  const LoginPage = poManager.getLoginPage(page);
  
  //  test steps
  await page.goto(testData.URL); // navigates to the website.
  await LoginPage.submitLoginCredentials(testData.invalidUsername, testData.password); // logs in using invalid username and password values.
  await page.waitForSelector("//form//div[@class='error-message-container error']/h3"); // waits for the invalid login message to appear
  expect(await page.screenshot()).toMatchSnapshot('invalidLoginScreenshot.png'); // screenshots comparison for -ve scenario
  await LoginPage.verifyMessage(); //verify invalid login message

})


// TC: Verify the user is not able to login with empty credentials
test('TC4: Verify the user is not able to login with empty credentials', async ({ page }, testInfo) => {
  const testData = await getTestData();


  // instance of the POManager
  const poManager = new POManager(page);

  //empty username and password
  const emptyUsername = '';
  const emptyPassword = '';

  // instance of the login page
  const LoginPage = poManager.getLoginPage(page);

  //  test steps
  await page.goto(testData.URL); // navigates to the website.
  await LoginPage.submitLoginCredentials(emptyUsername, emptyPassword); // logs in using empty username and password values.
  await page.waitForTimeout(3000); // waits for the invalid login message to appear
  expect(await page.screenshot()).toMatchSnapshot('emptyLoginScreenshot.png'); // screenshots comparison for -ve scenario
  await LoginPage.verifyMessage(); //verify invalid login message

})

// TC: Verify the user cannot place an order without filling the checkout information
test('TC5: Verify the user cannot place an order without filling the checkout information', async ({ page }, testInfo) => {
  const testData = await getTestData();

  // instance of the POManager
  const poManager = new POManager(page);
  
  // instances of the pages
  const LoginPage = poManager.getLoginPage(page);
  const ProductPage = poManager.getProductPage(page);
  const CartPage = poManager.getCartPage(page);
  const CheckoutPage = poManager.getCheckoutPage(page);
  const HomePage = poManager.getHomePage(page);

  //  test steps
  await page.goto(testData.URL); // navigates to the website.
  await LoginPage.submitLoginCredentials(testData.validUsername, testData.password); // logs in using valid username and password values.
  await LoginPage.validateLoginURL(); //verifies navigation to products page
  await ProductPage.validateProductsCount(); //verifies all products are displayed
  await ProductPage.validateProductSpecifications(); // verifies products name, price and description
  await ProductPage.sortProductsByPrice(); //sorts items by price
  await ProductPage.validateProductSorting(); // validates items are sorted by price
  expect(await page.screenshot()).toMatchSnapshot('productsSortedPrice.png'); // Visual confirmation for the sort by price
  await ProductPage.sortProductsByName(); //sorts items by name
  await ProductPage.validateProductSpecifications(); // validates items are sorted by name
  expect(await page.screenshot()).toMatchSnapshot('productsSortedAz.png'); // Visual confirmation for the sort by name
  await ProductPage.addProductToCart(); //adds 2 items to cart
  await ProductPage.removeProductFromCart(); //removes 1 item from cart
  await ProductPage.navigateToCart(); //navigates to cart page
  await CartPage.verifyProductInCart(); // verifies the product details in the cart
  expect(await page.screenshot()).toMatchSnapshot('productsInCart.png'); // Visual confirmation for the products in the cart
  await CartPage.checkout(); //navigates to checkout page
  await CheckoutPage.fillCheckoutInfo('','',''); //fills checkout data with empty values
  await CheckoutPage.verifyErrorMessage(); //verifies the error message
  await HomePage.logout(); //user logs out and is redirected to login page
});



