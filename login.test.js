const assert = require('assert');
const { remote } = require('webdriverio');

describe('Login functionality', () => {
    let browser;
    const loginUrl = 'http://uitestingplayground.com/sampleapp/';

    before(async () => {
        browser = await remote({
            capabilities: {
                browserName: 'chrome'
            }
        });
    });

    after(async () => {
        await browser.deleteSession();
    });

    it('should display error message when invalid credentials are entered', async () => {
        await browser.url(loginUrl);
        const userName = await browser.$('input[name="UserName"]');
        const password = await browser.$('input[name="Password"]');
        const loginButton = await browser.$("#login");
        await userName.setValue('invalid_username');
        await password.setValue('invalid_password');
        await loginButton.click();
        const errorMessage = await browser.$('#loginstatus');
        const errorMessageText = await errorMessage.getText();
        assert.strictEqual(errorMessageText, 'Invalid username/password');
    }, 5000);

    it('should allow user to log in with valid credentials', async () => {
        await browser.url(loginUrl);
        const userName = await browser.$('input[name="UserName"]');
        const password = await browser.$('input[name="Password"]');
        const loginButton = await browser.$("#login");
        await userName.setValue('testuser');
        await password.setValue('pwd');
        await loginButton.click();
        const successMessage = await browser.$('#loginstatus');
        const successMessageText = await successMessage.getText();
        assert.strictEqual(successMessageText, '');
    }, 5000);

    it('should not allow login with missing password', async () => {
        await browser.url(loginUrl);
        const userName = await browser.$('input[name="UserName"]');
        const password = await browser.$('input[name="Password"]');
        const loginButton = await browser.$("#login");
        await userName.setValue('testuser');
        await loginButton.click();
        const errorMessage = await browser.$('#loginstatus');
        const errorMessageText = await errorMessage.getText();
        assert.strictEqual(errorMessageText, 'Invalid username/password');
    }, 5000);
});
