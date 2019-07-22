Feature: job search result page static check

    check the contens displayed on the job search result page

    Scenario: job search result page static check
        Given Browse to website "https://www.seek.com.au/jobs"
        Then only two sponsored jobs are displayed
        Then 20 organic jobs are displayed
        Then job title is displayed for each job
        Then job location is displayed for each job
        Then job classification is displayed for each job
        Then job short description is displayed for each job
        Then save job is displayed for each job
        Then two job mail panels are displayed
        Then the href for the pagination is correct
        When click page 2
        Then only two sponsored jobs are displayed
        Then 20 organic jobs are displayed
        Then two job mail panels are displayed


