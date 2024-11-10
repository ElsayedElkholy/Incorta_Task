const { expect } = require('@playwright/test');

class LoginPage {

constructor(page){
    this.page = page;
    this.loginBtn= page.locator("#login-button");
    this.userName = page.locator("#user-name");
    this.password = page.locator("#password");
    this.invalidLoginMsg = page.locator("//form//div[@class='error-message-container error']/h3");

}

//navigates to the url passed to it
async navigateToURL(url)
{
    await this.page.goto(url);
}

//fills the username and password fields and clicks the login button
async submitLoginCredentials(username,password)
{
    await  this.userName.fill(username);
     await this.password.fill(password);
     await this.loginBtn.click();
}
//to verify the message that appears when the login credentials are incorrect
async verifyMessage()
{

    const messageText = await this.invalidLoginMsg.innerText();

    // Assert the expected message
    if (messageText.includes('Epic sadface: Username and password do not match any user in this service')) {
        console.log('Displayed the correct error message');
    } else if (messageText.includes('Epic sadface: Username is required')) {
        console.log('Displayed the correct error message');
    }else if (messageText.includes('Epic sadface: Password is required')) {
        console.log('Displayed the correct error message');
    } else
    {
        console.log('Displayed the wrong error message or no message at all');
    }
}

//to verify the user is navigated to the inventory page after successful login
async validateLoginURL()
{
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
}

}
module.exports = {LoginPage};