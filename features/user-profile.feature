Feature: user profile page
  verify the information and the cards on profile page

  Scenario: Personal details
    Given Browse to website "https://www.seek.com.au"
    When click sign in to go to the sign in page
    And input email "mywebtest007@gmail.com"
    And input password "Test007@seek"
    And click sign in button
    And click profile tab
    And click edit personal details button
    And input first name "John" and last name "White"
    And input phnoe number "9876543210"
    And select home location
    And click save button to save personla details
    Then name and location are displayed on the top of the profile page


  Scenario: Personal summary
    Given Browse to website "https://www.seek.com.au"
    When click sign in to go to the sign in page
    And input email "mywebtest007@gmail.com"
    And input password "Test007@seek"
    And click sign in button
    And click profile tab
    And click edit summary or add summary button
    And input the personal summary
      """
      This is my personal summary
      one
      two
      three
      """
    And click save button to save personal summary
    Then personla summary is displayed on the screen

# Scenario: Career history
#   Given Browse to website "https://www.seek.com.au"
#   When click sign in to go to the sign in page
#   And input email "mywebtest007@gmail.com"
#   And input password "Test007@seek"
#   And click sign in button
#   And click profile tab
#   When click add role button
#   Then add role card pops up

# Scenario: Education
#   Given Browse to website "https://www.seek.com.au"
#   When click sign in to go to the sign in page
#   And input email "mywebtest007@gmail.com"
#   And input password "Test007@seek"
#   And click sign in button
#   And click profile tab
#   When click add qualification button
#   Then add qualification card pops up

# Scenario: Skills
#   Given Browse to website "https://www.seek.com.au"
#   When click sign in to go to the sign in page
#   And input email "mywebtest007@gmail.com"
#   And input password "Test007@seek"
#   And click sign in button
#   And click profile tab
#   When click add skills button
#   Then add skills card pops up

# Scenario: resume
#   Given Browse to website "https://www.seek.com.au"
#   When click sign in to go to the sign in page
#   And input email "mywebtest007@gmail.com"
#   And input password "Test007@seek"
#   And click sign in button
#   And click profile tab
#   When click add skills button
#   Then add skills card pops up

# Scenario: About your next role
#   Given Browse to website "https://www.seek.com.au"
#   When click sign in to go to the sign in page
#   And input email "mywebtest007@gmail.com"
#   And input password "Test007@seek"
#   And click sign in button
#   And click profile tab
#   When click add skills button
#   Then add skills card pops up

