Feature: List shows on the playwright profile

  As a user
  I want to see all shows by a playwright
  So I can better understand what they do

  Background:
    Given I am on the home page

  Scenario: After creating a show that lists a profile as the primary author the show should display on that profile page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "A Play About Maryam"
    And I fill in ".show-about-edit" with "Most popular name in the Arab world (2015) (BabyCenter Arabia members)"
    And I fill in ".show-author-name-edit" with "Favorite"
    When I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I click on ".show-author"
    Then the "article.show-teaser" element should contain "A Play About Maryam"

  Scenario: After creating a show that lists a profile as a role other than primary author the show should display on that profile page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "A Play About Maryam"
    And I fill in ".show-about-edit" with "Most popular name in the Arab world (2015) (BabyCenter Arabia members)"
    And I fill in ".show-author-name-edit" with "Favorite"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I go to the "event" add page
    And I fill in ".event-show-edit" with "A Play About Maryam"
    And I click on ".autocomplete-results li"
    And I fill in ".event-about-edit" with "A workshop on spelling"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"
    And a profile with the following fields:
      | name | Il Regista |
    And I go to the show page for "A Play About Maryam"
    And I click on ".event-name a"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Stage Director"
    And I click on ".edit-participant-save"
    When I go to the profile page for "Il Regista"
    Then the "article.show-teaser" element should contain "A Play About Maryam"
