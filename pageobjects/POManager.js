const { test, expect } = require('@playwright/test');
const {HomePage} = require('./HomePage');
const {LoginPage} = require('./LoginPage');
const {ProductPage} = require('./ProductPage');
const {CheckoutPage} = require('./CheckoutPage');
const {CartPage} = require('./CartPage');

class POManager
{
constructor(page)
{
    this.page = page;
    this.HomePage = new HomePage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.ProductPage = new ProductPage(this.page);
    this.CheckoutPage = new CheckoutPage(this.page);
    this.cartPage = new CartPage(this.page);

}

// methods to return the instances of the pages
getHomePage()
{
    return this.HomePage;
}

getLoginPage()
{
    return this.loginPage;
}

getCartPage()
{
    return this.cartPage;
}

getProductPage()
{
    return this.ProductPage;
}
getCheckoutPage()
{
    return this.CheckoutPage;
}
}

module.exports = POManager;