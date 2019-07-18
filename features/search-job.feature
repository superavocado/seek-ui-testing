Feature: Search jobs - full time jobs listed in the last 7 days
Search jobs according to different keywords and location.

    Scenario Outline: Search jobs
        Given Browse to website
        When input keywords "<keywords>" 
        And select classification - Science & Technology
        And input location "<location>"
        And click SEEK button
        And selet work types
        And select listed time
        Then vefiry the search result
        Examples:
        | keywords | location |
        | software test analyst  | melbourne  |
        |||