Feature: List plays on the playwright profile

  As a user
  I want to see all plays by a playwright
  So I can better understand what they do

  Scenario: After creating a play that lists a profile as the primary author the play should display on that profile page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I click on ".add"
    When I click on ".add-play"
    And I fill in ".play-name-edit" with "A Play About Maryam"
    And I fill in ".play-about-edit" with "Most popular name in the Arab world (2015) (BabyCenter Arabia members)"
    And I fill in ".play-author-name-edit" with "Favorite"
    When I click on "ul.play-author-edit-results li"
    And I click on ".edit-play-save"
    And I click on ".play-author"
    Then the "article.play-teaser" element should contain "A Play About Maryam"
