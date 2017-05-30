@profiles
Feature: List shows on the playwright profile

  As a user
  I want to see all shows by a playwright
  So I can better understand what they do

  Background:
    Given I am on the English language home page

  Scenario: After creating a show that lists a profile as the primary author the show should display on that profile page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "A Play About Maryam"
    And I fill in ".show-about-edit" with "Most popular name in the Arab world (2015) (BabyCenter Arabia members)"
    And I fill in ".show-author-name-edit" with "My Favorite"
    When I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I click on ".show-author"
    Then the "article.show-teaser" element should contain "A Play About Maryam"

  Scenario: After creating a show that lists a profile as the local organization the show should display on that profile page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "event" add page
    And I fill in ".event-show-edit" with "A Play About Maryam"
    And I click on ".autocomplete-results li"
    And I fill in ".show-name-edit" with "A Play About Maryam"
    And I fill in ".show-about-edit" with "Most popular name in the Arab world (2015) (BabyCenter Arabia members)"
    And I fill in ".show-author-name-edit" with "My Favorite"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I fill in ".event-about-edit" with "http://google.com"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__day=15"
    And I select "Coral Sea Islands" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"
    When I go to the profile page for "Organization of the year"
    Then the "article.show-teaser" element should contain "A Play About Maryam"

  Scenario: After creating a show that lists a profile as a role other than primary author the show should display on that profile page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "event" add page
    And I fill in ".event-show-edit" with "A Play About Maryam"
    And I click on ".autocomplete-results li"
    And I fill in ".show-name-edit" with "A Play About Maryam"
    And I fill in ".show-about-edit" with "Most popular name in the Arab world (2015) (BabyCenter Arabia members)"
    And I fill in ".show-author-name-edit" with "My Favorite"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I fill in ".event-about-edit" with "http://google.com"
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
    And I click on "a.event-view-link"
    And I fill in ".participant-profile-edit" with "Il Regista"
    And I click on ".autocomplete-results li"
    And I fill in ".participant-role-edit" with "Director"
    And I click on ".edit-participant-save"
    When I go to the profile page for "Il Regista"
    Then the "article.show-teaser" element should contain "A Play About Maryam"

  Scenario: When viewing a profile of an author if the show displayed has multiple authors all authors should be properly displayed
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And a profile with the following fields:
      | name | The second best playwright |
    And a profile with the following fields:
      | name | The worst playwright |
    And I am logged in
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "My Favorite"
    And I click on "ul.autocomplete-results li"
    And I click on ".btn-add"
    And I fill in ".form-group-author-1 .show-author-name-edit" with "The second"
    And I click on "ul.autocomplete-results li"
    And I click on ".btn-add"
    And I fill in ".form-group-author-2 .show-author-name-edit" with "The worst"
    And I click on "ul.autocomplete-results li"
    And I click on ".edit-show-save"
    And I click on ".show-author"
    Then the ".show-authorship" element should contain "My Favorite Playwright, The second best playwright and The worst playwright"
