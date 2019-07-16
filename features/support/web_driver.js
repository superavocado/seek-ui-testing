require('chromedriver');
//require('geckodriver');
//require('iedriver'); //add this package if you want to use it.
const webDriver = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
let chromeOptions = new Options();

//create WebDriver instance based on your browser config;
function createDriver() {
    let browserConfig = process.env.BROWSER || 'chrome';
    let browser = browserConfig.toLowerCase();
    if (['chrome', 'firefox', 'ie'].indexOf(browser) < 0) browser = 'chrome'; //default to chrome
    return new webDriver.Builder()
    .forBrowser(browser)
    .setChromeOptions(chromeOptions.headless())
    .build();
}

exports.driver = createDriver();