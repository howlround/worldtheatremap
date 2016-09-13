@profiles @i18n
Feature: Translate profile fields

  As a user
  I want to translate a profile into Spanish
  So I can add information in spanish

  Background:
    Given I am on the home page

  Scenario: As a user looking at the site in English I should be able to translate basic fields on a profile into Spanish
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Simona"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Mexico (2013)"
    And I click on ".edit-profile-save"
    When I click on ".translate-link"
    And I fill in ".translation-target .profile-name-edit" with "Ximena"
    And I fill in ".translation-target .profile-about-edit" with "La mayoría nombre popular en México (2013)"
    And I click on ".translation-target .edit-profile-save"
    # Make sure it's not just overwriting base language
    Then the ".profile-name" element should contain "Simona"
    And the ".profile-about" element should contain "Most popular name in Mexico (2013)"
    And I click on ".language-switcher [name=es]"
    And the ".profile-name" element should contain "Ximena"
    And the ".profile-about" element should contain "La mayoría nombre popular en México (2013)"

  Scenario: The translate page should display the translation next time it loaded
    And I am logged in
    And I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Simona"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "Most popular name in Mexico (2013)"
    And I click on ".edit-profile-save"
    And I click on ".translate-link"
    And I fill in ".translation-target .profile-name-edit" with "Ximena"
    And I fill in ".translation-target .profile-about-edit" with "La mayoría nombre popular en México (2013)"
    And I click on ".translation-target .edit-profile-save"
    # Make sure it's not just overwriting base language
    Then the ".profile-name" element should contain "Simona"
    And the ".profile-about" element should contain "Most popular name in Mexico (2013)"
    When I click on ".translate-link"
    Then the ".translation-target .profile-name-edit" field should have the value "Ximena"
    And the ".translation-target .profile-about-edit" field should have the value "La mayoría nombre popular en México (2013)"
