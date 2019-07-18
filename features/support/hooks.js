var { After, Before, AfterAll, setDefaultTimeout } = require('cucumber');
const { driver } = require('./web_driver');

setDefaultTimeout(60 * 1000);

Before(async function () {
    await driver.manage().window().maximize();
})

After(async function () {
    //let screenshot = await driver.takeScreenshot();
    //this.attach(screenshot, 'image/png');
    await driver.manage().deleteAllCookies();
});

AfterAll(function () {
    return driver.quit();
})