const assert = require('assert');
const { driver } = require('../support/web_driver');
const { Given, When, Then } = require('cucumber');
const { By, Key, until } = require('selenium-webdriver');


let premium_Jobs;
let normal_Jobs;
Then('only two sponsored jobs are displayed', async function () {
    premium_Jobs = await driver.findElements(By.css('article[data-automation="premiumJob"]'));
    assert.ok(premium_Jobs.length == 2);
});

Then('{int} organic jobs are displayed', async function (result_per_page) {
    normal_Jobs = await driver.findElements(By.css('article[data-automation="normalJob"]'));
    assert.ok(normal_Jobs.length == result_per_page);
});

Then('job title is displayed for each job', async function () {
    for (let ele of premium_Jobs){
        let job_Title = await ele.findElement(By.css('a[data-automation="jobTitle"]')).getText();
        assert.ok(job_Title.length>0);
    }
    for (let ele of normal_Jobs){
        let job_Title = await ele.findElement(By.css('a[data-automation="jobTitle"]')).getText();
        assert.ok(job_Title.length>0);
    }
});

Then('job location is displayed for each job', async function () {
    for (let ele of premium_Jobs){
        let job_Location = await ele.findElement(By.css('a[data-automation="jobLocation"]')).getText();
        assert.ok(job_Location.length>0);
    }
    for (let ele of normal_Jobs){
        let job_Location = await ele.findElement(By.css('a[data-automation="jobLocation"]')).getText();
        assert.ok(job_Location.length>0);
    }
});

Then('job classification is displayed for each job', async function () {
    for (let ele of premium_Jobs){
        let job_Classification = await ele.findElement(By.css('a[data-automation="jobClassification"]')).getText();
        assert.ok(job_Classification.length>0);
    }
    for (let ele of normal_Jobs){
        let job_Classification = await ele.findElement(By.css('a[data-automation="jobClassification"]')).getText();
        assert.ok(job_Classification.length>0);
    }
});


Then('job short description is displayed for each job', async function () {
    for (let ele of premium_Jobs){
        let job_Description = await ele.findElement(By.css('span[data-automation="jobShortDescription"]')).getText();
        assert.ok(job_Description.length>0);
    }
    for (let ele of normal_Jobs){
        let job_Description = await ele.findElement(By.css('span[data-automation="jobShortDescription"]')).getText();
        assert.ok(job_Description.length>0);
    }
});

Then('save job is displayed for each job', async function () {
    for (let ele of premium_Jobs){
        let save_Job = await ele.findElement(By.css('a[data-automation="signed-out-save-job"]')).getText();
        assert.ok(save_Job.includes('Save'));
    }
    for (let ele of normal_Jobs){
        let save_Job = await ele.findElement(By.css('a[data-automation="signed-out-save-job"]')).getText();
        assert.ok(save_Job.includes('Save'));
    }
});

Then('two job mail panels are displayed', async function () {
    let job_Mail_Panels = await driver.findElements(By.css('div[data-automation="jobMailPanel"]'));
    for (let ele of job_Mail_Panels){
        let text = await ele.getText();
        assert.ok(text.includes('Receive new jobs for this search by email'));
    }
    
});

Then('the href for the pagination is correct', async function () {
    for (let i = 2; i < 8; i ++){
        let href = await driver.findElement(By.css('a[data-automation="page-' + i + '"]')).getAttribute('href');
        assert.ok(href == "https://www.seek.com.au/jobs?page="+i);
    }
    let href = await driver.findElement(By.css('a[data-automation="page-next"]')).getAttribute('href');
    assert.ok(href == "https://www.seek.com.au/jobs?page=2");
});


When('click page {int}', async function (page_index) {
    await driver.findElement(By.css('a[data-automation="page-' + page_index + '"]')).click();
    await driver.sleep('1000');
});
