Feature: job search result page static check

    check the contens displayed on the job search result page

    Scenario: job search result page static check
        Given Browse to website
        When click SEEK button
        Then only two sponsored jobs are displayed
        Then 20 organic jobs are displayed
        Then job title are displayed for each job
        Then job company are displayed for each job
        Then job location are displayed for each job
        Then job classification are displayed for each job
        Then job short description are displayed for each job
        Then two job mail panels are displayed
        Then the href for the pagination is correct
        When click page 2
        Then only two sponsored jobs are displayed
        Then 20 organic jobs are displayed
        Then two job mail panels are displayed


