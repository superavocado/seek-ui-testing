require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { Given, When, Then } = require('cucumber');
const assert = require('assert');

const { driver } = require('../support/web_driver');
const { rootUrl } = require('../../config.js');

When('input keywords {string}', async function (keywords) {
  await driver.findElement(By.id('SearchBar__Keywords')).sendKeys(keywords);
});

When('click classification DropDown List', async function () {
  await driver.findElement(By.css('label[data-automation="classificationDropDownList"]')).click();
  driver.sleep(2000);
});

Then('vefiry the classification DropDown list', async function () {
  let classification_elements = await driver.findElements(By.css('#classificationsPanel > nav > ul > li'));
  let calssifictaion_lists = [];
  for (let item of classification_elements) {
    let text = await item.findElement(By.tagName('a')).getText();
    calssifictaion_lists.push(text);
  };
  let expected_lists = ['Accounting',
    'Administration & Office Support',
    'Advertising, Arts & Media',
    'Banking & Financial Services',
    'Call Centre & Customer Service',
    'CEO & General Management',
    'Community Services & Development',
    'Construction',
    'Consulting & Strategy',
    'Design & Architecture',
    'Education & Training',
    'Engineering',
    'Farming, Animals & Conservation',
    'Government & Defence',
    'Healthcare & Medical',
    'Hospitality & Tourism',
    'Human Resources & Recruitment',
    'Information & Communication Technology',
    'Insurance & Superannuation',
    'Legal',
    'Manufacturing, Transport & Logistics',
    'Marketing & Communications',
    'Mining, Resources & Energy',
    'Real Estate & Property',
    'Retail & Consumer Products',
    'Sales',
    'Science & Technology',
    'Self Employment',
    'Sport & Recreation',
    'Trades & Services']
  for (let i = 0; i < expected_lists.length; i++) {
    assert.equal(calssifictaion_lists[i], expected_lists[i]);
  }
});

When('select classification - {string}', async function (classification) {
  if (classification >= 1) {
    let selector = "#classificationsPanel > nav > ul > li:nth-child(" + classification + ") > a";
    await driver.findElement(By.css(selector)).click();
    await driver.findElement(By.css(selector)).sendKeys(Key.ESCAPE);
  }
});

When('input location {string}', async function (location) {
  await driver.findElement(By.id('SearchBar__Where')).sendKeys(location + Key.TAB);
  driver.sleep(1000);
});

When('click SEEK button', async function () {
  await driver.findElement(By.css('button[data-automation="searchButton"]')).click();
  driver.sleep(1000);
});

Then('vefiry the search resault with proper or empty conditions', async function () {
  let result = await driver.wait(until.elementLocated(By.id('SearchSummary')), 10 * 1000).getText();
  assert.ok(result.includes("jobs found"));
});

Then('vefiry the search job resault with improper conditions', async function () {
  let result = await driver.wait(until.elementLocated(By.css('div[data-automation="searchZeroResults"]')), 10 * 1000).getText();
  assert.ok(result.includes("Sorry, we couldn’t find anything. Maybe try taking the following steps…"));
});

let result_no_filter;
Then('record the search resault without any filter', async function () {
  result_no_filter = await driver.wait(until.elementLocated(By.id('SearchSummary')), 10 * 1000).getText();
  result_no_filter = result_no_filter.split(' ')[0].replace(/,/g, "");
    });

When('select work types', async function () {
  await driver.wait(until.elementLocated(By.css('label[data-automation="toggleWorkTypePanel"]')), 10 * 1000).click();
  driver.sleep(1000);
  await driver.findElement(By.css('a[data-automation="242"]')).click();
});

When('select listed time', async function () {
  await driver.findElement(By.css('label[data-automation="toggleDateListedPanel"]')).click();
  driver.sleep(1000);
  await driver.findElement(By.css('a[data-automation="7"]')).click();

});

Then('verify the new search with filters', async function () {
  let result = await driver.wait(until.elementLocated(By.id('SearchSummary')), 10 * 1000).getText();
  result = result.split(' ')[0].replace(/,/g, "");;
  assert.ok(Number(result) <= Number(result_no_filter));
});