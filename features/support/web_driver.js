require('chromedriver');
// require('geckodriver');
// require('iedriver');
const webDriver = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
var chromeOptions = new Options();

function createDriver() {
    //let browserConfig = process.env.browser || 'chrome';
    //let browser = browserConfig.toLowerCase();
    //if (['chrome', 'firefox', 'ie'].indexOf(browser) < 0) browser = 'chrome'; //default to chrome
    return new webDriver.Builder().forBrowser('chrome')
    .setChromeOptions(chromeOptions.headless(), chromeOptions.addArguments("--window-size = 1366 x 768"))
    .build();
}

exports.driver = createDriver();