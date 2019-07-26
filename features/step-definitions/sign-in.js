const { Given, When, Then} = require('cucumber');
const { By, until } = require('selenium-webdriver');

const assert = require('assert');

const { driver } = require('../support/web_driver');

Given('Browse to website {string}', async function (url) {
    await driver.get(url);
    await driver.sleep(1000);
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
    await driver.sleep(1000);
});

Then(/^verify the sign in "([^"]*)" acorrding to the "([^"]*)"$/, async function (checkpoint, status) {
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
            break;
        case 1:
            verify_pw_message();
            break;
        case 2:
            verify_pw_message();
            break;
        case 3:
            verify_email_message();
            break;
        case 4:
            verify_email_message();
            break;
        case 5:
            verify_email_message();
    }
});