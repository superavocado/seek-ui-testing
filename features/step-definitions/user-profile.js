const { driver } = require('../support/web_driver');
const { By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

const { Given, When, Then } = require('cucumber');
const assert = require('assert');

let expected_name, expected_location;

//Personal details
When('click profile tab', async function () {
    await driver.findElement(By.linkText('Profile')).click();
});

When('click edit personal details button', async function () {
    let ele = await driver.wait(until.elementLocated(By.css('button[data-automation="personal-details-edit"]')), 10000);
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

When('click save button to save personla details', async function () {
    await driver.findElement(By.css('button[data-automation="personal-details-save-button"]')).click();
    await driver.sleep(1000);
});

Then('name and location are displayed on the top of the profile page', async function () {
    let text_name = await driver.findElement(By.css('span[data-automation="inline-nudge-name"]')).getText();
    assert.equal(text_name, expected_name)
    let text_location = await driver.findElement(By.css('span[data-automation="inline-nudge-location"]')).getText();
    assert.equal(expected_location, expected_location);

});

//Personal summary
let personal_summary;
When('click edit summary or add summary button', async function () {
    let ele = await driver.wait(until.elementLocated(By.css('button[data-automation="summary-edit"]')), 3 * 1000);
    await ele.click();
    await driver.sleep(1000);
});

When('input the personal summary', async function (docString) {
    personal_summary = docString;
    let ele = await driver.findElement(By.css('textarea[data-automation="summary-input"]'));
    let text = await ele.getText();
    if (text.length > 0) {
        await driver.findElement(By.css('button[data-automation="summary-clear-button"]')).click();
    }
    await ele.sendKeys(docString);
});

When('click save button to save the personal summary', async function () {
    await driver.findElement(By.css('button[data-automation="summary-save-button"]')).click();
    await driver.sleep(1000);
});

Then('personla summary is displayed on the screen', async function () {
    let text = await driver.findElement(By.css('span[data-automation="summary-read-text"]')).getText();
    assert.equal(text, personal_summary);
});

//Career history
let job_title, job_company;
When('click add role button', async function () {
    let ele = await driver.wait(until.elementLocated(By.css('button[data-automation="career-history-add"]')), 3 * 1000);
    await ele.click();
});

When('input job title {string}', async function (title) {
    job_title = title;
    let ele = await driver.findElement(By.id('title'));
    await ele.sendKeys(title);
    await ele.sendKeys(Key.TAB);
});

When('input company name {string}', async function (company) {
    job_company = company;
    let ele = await driver.findElement(By.id('company'));
    await ele.sendKeys(company);
    await ele.sendKeys(Key.TAB);

});

When('select the start month and the year', async function () {
    await driver.findElement(By.id('from-month')).sendKeys('Jun');
    await driver.findElement(By.id('from-year')).sendKeys('2017');
});

When('select the end month and the year', async function () {
    await driver.findElement(By.css('#stillInRole+label')).click();
    await driver.sleep(1000);
    await driver.findElement(By.id('to-month')).sendKeys('Jun');
    await driver.findElement(By.id('to-year')).sendKeys('2019');

});

When('add some description', async function (docString) {
    await driver.findElement(By.id('achievements')).sendKeys(docString);
});

When('click save button to save the career history', async function () {
    await driver.findElement(By.css('button[data-automation="career-history-save-button"]')).click();
    await driver.sleep(1000);
});

Then('career history is displayed on the screen', async function () {
    let eles = await driver.findElements(By.css('span[data-automation="role-read-text"]'));
    let text = await eles[eles.length - 1].getText();
    let expected_title = job_title + ' at ' + job_company;
    assert.equal(text, expected_title);

    if (eles.length > 1) {
        let edit_buttons = await driver.findElements(By.css('button[data-automation^="career-role-edit"]'));
        await edit_buttons[edit_buttons.length - 1].click();

        let delet_button = await driver.wait(until.elementIsVisible(await driver.findElement(By.css('button[data-automation="career-history-delete"]'))), 3 * 1000);
        await delet_button.click();
        let confirm_button = await driver.wait(until.elementIsVisible(await driver.findElement(By.css('button[data-automation="confirm-delete-role"]'))), 3 * 1000);
        await confirm_button.click();
    }
});

//Education
let edu_institute, edu_qualification;
When('click add qualification button', async function () {
    let ele = await driver.wait(until.elementLocated(By.css('button[data-automation="education-add"]')), 3*1000);
    await ele.click()
});

When('input the institution name  {string}', async function (institute) {
    edu_institute = institute;
    let ele = await driver.findElement(By.id('institute'));
    await ele.sendKeys(institute);
    await ele.sendKeys(Key.TAB);
});

When('input the course or qualification {string}', async function (qualification) {
    edu_qualification = qualification;
    let ele = await driver.findElement(By.id('name'));
    await ele.sendKeys(qualification);
    await ele.sendKeys(Key.TAB);
});

When('click save button to save the education', async function () {
    await driver.findElement(By.css('button[data-automation="education-save-button"]')).click();
    await driver.sleep(1000);
    let imageData = await driver.takeScreenshot();
    //console.log(imageData);
     fs.writeFile(__dirname + '/screenshot.png', imageData, 'base64', (err) => {
         if (err) throw (err);
     });
});

Then('education is displayed on the screen', async function () {
    //await driver.wait(until.elementLocated(By.css('h1[data-automation="education-read-title"]')), 3*1000);
    let ele = await driver.wait(until.elementLocated(By.css('button[data-automation="education-add"]')), 3*1000);
    let eles = await driver.findElements(By.css('span[data-automation^="qualification"]'));
    let text = await eles[eles.length - 1].getText()
    let expected_education = edu_qualification + ' from ' + edu_institute;
    assert.equal(text, expected_education);

    if (eles.length > 0) {
        let edit_buttons = await driver.findElements(By.css('button[data-automation^="edit-qualfication"]'));
        await edit_buttons[edit_buttons.length - 1].click();

        let delet_button = await driver.wait(until.elementIsVisible(await driver.findElement(By.css('button[data-automation="education-delete"]'))), 3 * 1000);
        await delet_button.click();
        let confirm_button = await driver.wait(until.elementIsVisible(await driver.findElement(By.css('button[data-automation="confirm-delete-qualification"]'))), 3 * 1000);
        await confirm_button.click();
    }
});

