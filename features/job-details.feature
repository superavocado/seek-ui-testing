Feature: static check job details page

    static check job details page
    Scenario: static check job details page
        Given Browse to website "https://www.seek.com.au/jobs"
        When select one job
        Then job title is displayed
        Then job description is displayed
        Then job apply button is displayed
        Then job save button is displayed
        Then job send button is displayed
        Then job side info is displayed
        Then job safe searching info is displayed