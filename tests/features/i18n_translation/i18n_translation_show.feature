@shows @i18n
Feature: Translate show fields

  As a user
  I want to translate a show into Spanish
  So I can add information in spanish

  Background:
    Given I am on the English language home page

  Scenario: As a user looking at the site in English I should be able to translate basic fields on a show into Spanish
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Mary"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Peru"
    And I click on ".edit-show-save"
    When I click on ".language-switcher [name=es]"
    And I follow ".edit-link"
    And I fill in ".show-name-edit" with "María"
    And I fill in ".show-about-edit" with "La mayoría nombre popular en Peru (2013)"
    And I click on ".edit-show-save"
    Then the ".show-name" element should contain "María"
    And the ".show-about" element should contain "La mayoría nombre popular en Peru (2013)"
    # Make sure it's not just overwriting base language
    And I click on ".language-switcher [name=en]"
    And the ".show-name" element should contain "Mary"
    And the ".show-about" element should contain "Most popular name in Peru"

  # Scenario: Selecting a show interest when creating a Show directly in Spanish should still be selected when viewing the show in English

  # Scenario: Creating a profile in Spanish should automatically translate the about field into English
  #   And I am logged in
  #   And I click on ".language-switcher [name=es]"
  #   And I go to the "profile" add page
  #   And I fill in ".profile-name-edit" with "María"
  #   And I fill in ".profile-about-edit" with "El nombre más popular en México"
  #   And I click on ".edit-profile-save"
  #   And I click on ".language-switcher [name=en]"
  #   And the ".profile-about" element should contain "The most popular name in Mexico"

  # Scenario: If the profile about field is blank it should not be translated
  #   And I am logged in
  #   And I go to the "profile" add page
  #   And I fill in ".profile-name-edit" with "Mary"
  #   And I click on ".edit-profile-save"
  #   When I click on ".language-switcher [name=es]"
  #   Then I should not see ".profile-about"

  # Scenario: When creating a new profile the about field should be automatically translated
  #   And I am logged in
  #   And I go to the "profile" add page
  #   And I fill in ".profile-name-edit" with "Mary"
  #   And I select "Individual" from the ".profile-type-edit" combobox
  #   And I fill in ".profile-about-edit" with "The most popular name in Mexico"
  #   And I click on ".edit-profile-save"
  #   And I click on ".language-switcher [name=es]"
  #   And the ".profile-about" element should contain "El nombre más popular en México"
