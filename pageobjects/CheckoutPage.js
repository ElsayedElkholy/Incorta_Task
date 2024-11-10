const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.itemName = page.locator('.inventory_item_name');
    this.itemPrice = page.locator('.inventory_item_price');
    this.totalPrice = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.confirmation = page.locator('.complete-header');
    this.errorMsg = page.locator("//form//div[@class='error-message-container error']/h3");


  }

  // Fills the checkout information and navigates to the next step of the checkout process , 
  //if any of the required fields are empty, the error message is displayed and the user is not navigated to the next step of the checkout process
  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();

    //if any of the required fields are empty, the error message is displayed and the user is not navigated to the next step of the checkout process
    if (firstName === '' || lastName === '' || postalCode === '') {
      await this.verifyErrorMessage();
      expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html"); //verifies navigation to step 2 of checkout
    }
    else{
    expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html"); //verifies navigation to step 2 of checkout
  }
  }

  //to verify the message that appears when the user tries to checkout without filling the required fields
  async verifyErrorMessage(){

    const messageText = await this.errorMsg.innerText();

    // Assert the expected message
    if (messageText.includes("Error: First Name is required")) {
        console.log('Displayed the correct error message');
    } else {
        console.log('Displayed the wrong error message or no message at all');
    }
  }

  // Validates the checkout overview page
  async validateCheckoutOverview() {
    const name = await this.itemName.innerText();
    const price = await this.itemPrice.innerText();
    const totalPrice = await this.totalPrice.innerText();

    // Assert the expected values
    expect(name).toBe("Sauce Labs Bike Light");
    expect(price).toBe("$9.99");
    expect(totalPrice).toBe("Total: $10.79");
    await this.finishButton.click();
    await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    const orderConfirmationMessage = await this.confirmation.innerText();
    expect(orderConfirmationMessage).toBe("Thank you for your order!");
  }

}


module.exports = { CheckoutPage };