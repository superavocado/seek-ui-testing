Feature: Search jobs
    Search jobs according to different conditions and filters

    Scenario: Search jobs with proper conditions
        Given Browse to website
        When input keywords "software test analyst"
        And click classification DropDown List
        Then vefiry the classification DropDown list
        And select classification - "18"
        And input location "Melbourne"
        And click SEEK button
        Then vefiry the search resault with proper or empty conditions

    Scenario: Search jobs with empty conditions
        Given Browse to website
        And click SEEK button
        Then vefiry the search resault with proper or empty conditions

    Scenario Outline: Search jobs with improper conditions
        Given Browse to website
        When input keywords "<keywords>"
        And click classification DropDown List
        And select classification - "<classification>"
        And input location "<location>"
        And click SEEK button
        Then vefiry the search job resault with improper conditions
        Examples:
            | keywords                   | classification | location                   |
            | jdaljfalfjdlafhdfsafdafdsa | 1              |                            |
            |                            | 2              | jdaljfalfjdlafhdfsafdafdsa |


    Scenario: Add filters on search results
        Given Browse to website
        When click SEEK button
        Then record the search resault without any filter
        And select work types
        And select listed time
        Then verify the new search with filters
