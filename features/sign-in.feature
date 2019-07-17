Feature: sign in
verify different scenarios for sign in

  Scenario Outline: sign in
    Given Browse to web site
    When click sign in to go to the sign in page
    And input email "<email>"
    And input password "<pw>"
    And click sign in button
    Then verify the "<checkpoint>" acorrding to the "<status>"
    Examples: 
      | email                  | pw           | status | checkpoint                    |
      | mywebtest007@gmail.com | Test007@seek | 0      | Test007                       |
      | mywebtest007@gmail.com | 123456       | 1      | Incorrect password            |
      | mywebtest007@gmail.com |              | 2      | Password can't be blank       |
      | aaabbbccc              | Test007@seek | 3      | Email is not a valid email    |
      |                        | Test007@seek | 4      | Email is not a valid email    |
      | mywebtest008@gmail.com | Test007@seek | 5      | We don't recognise this email |
      
     