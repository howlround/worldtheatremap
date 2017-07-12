@profiles @i18n
Feature: Translate profile fields

  As a user
  I want to translate a profile into Spanish
  So I can add information in spanish

  Background:
    Given I am on the English language home page

  Scenario: As a user looking at the site in English I should be able to translate basic fields on a profile into Spanish
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Simona"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Mexico (2013)"
    And I click on ".edit-profile-save"
    When I click on ".language-switcher [name=es]"
    And I follow ".edit-link"
    And I fill in ".profile-name-edit" with "Ximena"
    And I fill in ".profile-about-edit" with "La mayoría nombre popular en México (2013)"
    And I click on ".edit-profile-save"
    Then the ".profile-name" element should contain "Ximena"
    And the ".profile-about" element should contain "La mayoría nombre popular en México (2013)"
    # Make sure it's not just overwriting base language
    And I click on ".language-switcher [name=en]"
    And the ".profile-name" element should contain "Simona"
    And the ".profile-about" element should contain "Most popular name in Mexico (2013)"

  Scenario: Creating a profile in Spanish should automatically translate the about field into English
    And I am logged in
    And I click on ".language-switcher [name=es]"
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Ximena"
    And I fill in ".profile-about-edit" with "El nombre más popular en México"
    And I click on ".edit-profile-save"
    And I click on ".language-switcher [name=en]"
    And the ".profile-about" element should contain "The most popular name in Mexico"

  Scenario: If the profile about field is blank it should not be translated
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Simona"
    And I click on ".edit-profile-save"
    When I click on ".language-switcher [name=es]"
    Then I should not see ".profile-about"

  Scenario: When creating a new profile the about field should be automatically translated
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Simona"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "The most popular name in Mexico"
    And I click on ".edit-profile-save"
    And I click on ".language-switcher [name=es]"
    And the ".profile-about" element should contain "El nombre más popular en México"

  Scenario: Profiles should record the source language
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Simona"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "The most popular name in Mexico"
    And I click on ".edit-profile-save"
    And I click on ".language-switcher [name=es]"
    Then I should see the ".machine-translation-warning" element

  @i18n
  Scenario: When saving a profile in English the country should be saved correctly
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Simona"
    And I select "Mexico" from the ".country-select-edit" combobox
    And I click on ".edit-profile-save"
    When I click on ".language-switcher [name=es]"
    Then the ".profile-country" element should contain "México"

  @i18n
  Scenario: When saving a profile in Spanish the country should be saved correctly
    And I am logged in
    And I click on ".language-switcher [name=es]"
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Simona"
    And I select "México" from the ".country-select-edit" combobox
    And I click on ".edit-profile-save"
    When I click on ".language-switcher [name=en]"
    Then the ".profile-country" element should contain "Mexico"
