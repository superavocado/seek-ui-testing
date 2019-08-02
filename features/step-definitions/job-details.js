

const assert = require('assert');
const { When, Then } = require('cucumber');
const { By, Key, until } = require('selenium-webdriver');
const { driver } = require('../support/web_driver')


When('select one job', async function () {
    let normal_Jobs = await driver.findElements(By.css('article[data-automation="normalJob"]'));
    let job = await normal_Jobs[0].findElement(By.css('a[data-automation="jobTitle"]'));
    job.click();
    await driver.sleep('10000');
});

Then('job title is displayed', async function () {
    let eles = await driver.findElements(By.css('span[data-automation="job-detail-title"]'));
    let text = await eles[1].getText();
    assert.ok(text.length > 0)
});

Then('job description is displayed', async function () {
    let text = await driver.findElement(By.css('div[data-automation="jobDescription"]')).getText();
    assert.ok(text.length > 0)
});

Then('job apply button is displayed', async function () {
    let eles = await driver.findElements(By.css('a[data-automation="job-detail-apply"]'));
    let text = await eles[0].getAttribute("textContent");
    assert.equal(text, "Apply for this job")
});

Then('job save button is displayed', async function () {
    let text = await driver.findElement(By.css('button[data-automation="signed-out-save-job"]')).getText();
    assert.equal(text, "Save job")
});

Then('job send button is displayed', async function () {
    let text = await driver.findElement(By.css('button[data-automation="job-detail-send-job"]')).getText();
    assert.equal(text, "Send job")
});

Then('job side info is displayed', async function () {
    let eles = await driver.findElements(By.css('section[aria-labelledby="jobInfoHeader"]'));
    let text = await eles[1].getText();
    assert.ok(text.length > 0);

});

Then('job safe searching info is displayed', async function () {
    let ele = await driver.findElement(By.linkText('Be careful'));
    let href = await ele.getAttribute('href');
    assert.equal(href, "https://www.seek.com.au/safe-job-searching");
});