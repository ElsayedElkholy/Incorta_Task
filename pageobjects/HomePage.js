const { expect } = require('@playwright/test');

class HomePage {
  
  constructor(page) {
    this.page = page;
    this.menu = page.locator('.bm-burger-button');
    this.logoutButton = page.locator('#logout_sidebar_link');
  }

// Logs user out of the website and validates redirection to the login page.
async logout() {
  await this.menu.click();
  await this.logoutButton.click();
  await expect(this.page).toHaveURL("https://www.saucedemo.com/");
}
}

module.exports = { HomePage };