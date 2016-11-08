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

  Scenario: Selecting a show interest when creating a show directly in Spanish should still be selected when viewing the show in English
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I click on ".language-switcher [name=es]"
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Argentina"
    And I click on ".label-text=Teatro Musical"
    And I click on ".edit-show-save"
    And I click on ".language-switcher [name=en]"
    Then the ".show-interests" element should contain "Musical Theatre"

  Scenario: Choosing show interests when editing a show in Spanish should display when viewing the show in English
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Argentina"
    And I click on ".edit-show-save"
    And I click on ".language-switcher [name=es]"
    And I follow ".edit-link"
    And I click on ".label-text=Teatro Musical"
    And I click on ".edit-show-save"
    And I click on ".language-switcher [name=en]"
    Then the ".show-interests" element should contain "Musical Theatre"

  Scenario: Creating a show in Spanish should automatically translate the about field into English
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I click on ".language-switcher [name=es]"
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "El nombre más popular en Argentina"
    And I click on ".edit-show-save"
    And I click on ".language-switcher [name=en]"
    And the ".show-about" element should contain "The most popular name in Argentina"

  Scenario: If the show about field is blank it should not be translated
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    When I click on ".language-switcher [name=es]"
    Then I should not see ".profile-about"

  Scenario: When creating a new show in English the about field should be automatically translated
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    When I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofía"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "The most popular name in Argentina"
    And I click on ".edit-show-save"
    And I click on ".language-switcher [name=es]"
    And the ".show-about" element should contain "El nombre más popular en Argentina"
