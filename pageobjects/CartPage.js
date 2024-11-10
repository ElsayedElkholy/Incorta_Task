const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItemPrice = page.locator('.inventory_item_price');
    this.checkoutButton = page.locator('#checkout');
  }

  // Reviews the product in the cart by validating the name and the price.
  async verifyProductInCart() {
    const name = await this.cartItemName.innerText();
    const price = await this.cartItemPrice.innerText();

    expect(name).toBe('Sauce Labs Bike Light');
    expect(price).toBe('$9.99');
  }

  // Clicks on the checkout button and validates redirection to the first step of the checkout process.
  async checkout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  }
}

module.exports = { CartPage };