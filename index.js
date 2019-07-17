var reporter = require('cucumber-html-reporter');
 
var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber_report.json',
        output: 'reports/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true,
        metadata: {
            "App Version":"5.1.0",
            "Browser": "Chrome  75.0.3770.100",
            "Parallel": "Scenarios",
        }
    };
 
    reporter.generate(options);
    