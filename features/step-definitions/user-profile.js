const { driver } = require('../support/web_driver');
const { By, Key, until } = require('selenium-webdriver');

const { Given, When, Then } = require('cucumber');
const assert = require('assert');

let expected_name, expected_location;

When('click profile tab', async function () {
    await driver.findElement(By.linkText('Profile')).click();
});

When('click edit personal details button', async function () {
    let ele = await driver.wait(until.elementLocated(By.css('button[data-automation="personal-details-edit"]')),10000);
    ele.click();
});

When('input first name {string} and last name {string}', async function (firstName, lastName) {
    expected_name = firstName + ' ' + lastName;
    let fn = await driver.findElement(By.id('firstName'));
    await driver.actions().doubleClick(fn).sendKeys(Key.DELETE).perform();
    await fn.sendKeys(firstName);
    await driver.sleep(1000);
    
    let ln = await driver.findElement(By.id('lastName'));
    await driver.actions().doubleClick(ln).sendKeys(Key.DELETE).perform();
    await ln.sendKeys(lastName);
});

When('input phnoe number {string}', async function (phoneNumber) {
    let pn = await driver.findElement(By.id('phoneNumber'));
    await driver.actions().doubleClick(pn).sendKeys(Key.DELETE).perform();
    await pn.sendKeys(phoneNumber);
});

When('select home location', async function () {
    await driver.findElement(By.id('currentLocation-primary')).click();
    let lc = await driver.findElement(By.css('#currentLocation-primary > optgroup:nth-child(2) > option:nth-child(3)'));
    await lc.click();
    expected_location = "All " + lc.getText();
});

When('click save button', async function () {
    await driver.findElement(By.css('button[data-automation="personal-details-save-button"]')).click();
    await driver.sleep(1000);
});

Then('name and location are displayed on the top of the profile page', async function () {
    let text_name = await driver.findElement(By.css('span[data-automation="inline-nudge-name"]')).getText();
    assert.equal(text_name, expected_name)
    let text_location = await driver.findElement(By.css('span[data-automation="inline-nudge-location"]')).getText();
    assert.equal(expected_location, expected_location);
    
});




