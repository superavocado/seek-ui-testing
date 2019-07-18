require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { Given, When, Then } = require('cucumber');
const assert = require('assert');

const { driver } = require('../support/web_driver');
const { rootUrl } = require('../../config.js');


When('input keywords {string}', async function (keywords) {
  await driver.findElement(By.id('SearchBar__Keywords')).sendKeys(keywords);
});

When('input location {string}', async function (location) {
  await driver.findElement(By.id('SearchBar__Where')).sendKeys(location + Key.TAB);
});

When('select classification - Science & Technology', async function () {
  await driver.findElement(By.css('label[data-automation="classificationDropDownList"]')).click();
  driver.sleep(1000);
  await driver.findElement(By.css('a[data-automation="6281"]')).click();
  await driver.findElement(By.css('a[data-automation="6281"]')).sendKeys(Key.ESCAPE);
});

When('click SEEK button', async function () {
  await driver.findElement(By.css('button[data-automation="searchButton"]')).click();
  //driver.sleep(3000);
});

When('selet work types', async function () {
  //await driver.findElement(By.css('label[data-automation="toggleWorkTypePanel"]')).click();
  await driver.wait(until.elementLocated(By.css('label[data-automation="toggleWorkTypePanel"]')), 10 * 1000).click();
  driver.sleep(1000);
  await driver.findElement(By.css('a[data-automation="242"]')).click();
});

When('select listed time', async function () {
  await driver.findElement(By.css('label[data-automation="toggleDateListedPanel"]')).click();
  driver.sleep(1000);
  await driver.findElement(By.css('a[data-automation="7"]')).click();

});

Then('vefiry the search result', async function () {
  let result = await driver.wait(until.elementLocated(By.id('SearchSummary')), 10 * 1000).getText();
  assert.ok(result.includes('jobs found'));
});