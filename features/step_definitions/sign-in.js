require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { Given, When, Then, Before, After, setDefaultTimeout} = require('cucumber');
const assert = require('assert');

const { Options } = require('selenium-webdriver/chrome');
const { rootUrl } = require('../../config.js');

var chromeOptions = new Options();
setDefaultTimeout(60*1000);
var driver;


Before(async function(){
    driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions.headless(), chromeOptions.addArguments("--window-size=1366x768"))
    .build();
})
After(async function () {
    //let screenshot = await driver.takeScreenshot();
    //this.attach(screenshot, 'image/png');
    await driver.manage().deleteAllCookies();
    await driver.quit();
});


Given(/^Browse to web site$/, async function () {

    await driver.get(rootUrl);
});

When(/^click sign in to go to the sign in page$/, async function () {

    await driver.wait(until.elementLocated(By.css('nav[data-automation="sign-in-register"]>a:nth-child(1)'))).click();
    //await driver.wait(until.titleIs('Candidate Sign in - SEEK'), 10 * 1000);
});

When(/^input email "([^"]*)"$/, async function (email) {
    let ele = await driver.wait(until.elementLocated(By.id('email')), 10*1000);
    ele.sendKeys(email);
});

When(/^input password "([^"]*)"$/, async function (pw) {

    await driver.findElement(By.id('password')).sendKeys(pw);
});

When(/^click sign in button$/, async function () {

    await driver.findElement(By.css('button[data-automation="signin-submit"]')).click();
});

Then(/^verify the "([^"]*)" acorrding to the "([^"]*)"$/, async function (checkpoint, status) {
    let result; 
    async function verify_email_message(){
        result = await driver.findElement(By.id('email-message')).getText();
        return assert.ok(result.includes(checkpoint));
    }
    async function verify_pw_message() {
        result = await driver.findElement(By.id('password-message')).getText();
        return assert.ok(result.includes(checkpoint));
    }
    switch(status){
        case 0:
            result = await driver.findElement(By.css('span[data-automation="user-account-name"]')).getText();
            assert.equal(result, checkpoint);
        case 1:
            verify_pw_message();
        case 2:
            verify_pw_message();
        case 3:
            verify_email_message();
        case 4:
            verify_email_message();
        case 5:
            verify_email_message();
    }
});