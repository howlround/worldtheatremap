@profiles
Feature: Select gender options on profile

  As a user
  I want to select appropriate gender options on a profile
  So I can add accurate information

  Background:
    Given I am on the English language home page

  Scenario: Users should be able to create a profile choosing a pre-existing gender option
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Amelija"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I click on ".gender-label-text=Female"
    And I click on ".edit-profile-save"
    Then the ".profile-gender" element should contain "Female"

  Scenario: Users should be able to create a profile choosing multiple pre-existing gender options
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Amelija"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I click on ".gender-label-text=Female"
    And I click on ".gender-label-text=Transgender"
    And I click on ".edit-profile-save"
    Then the ".profile-gender" element should contain "Female and Transgender"

  Scenario: When users select Another Identity for the Gender option they should be able to enter a text value
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Amelija"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I click on ".gender-label-text=Another Identity"
    And I fill in ".form-group-genderOther-0 input" with "Tirana"
    And I click on ".edit-profile-save"
    Then the ".profile-gender" element should not contain "Another Identity"
    And the ".profile-gender" element should contain "Tirana"

  Scenario: When a user editing a profile selects Another Identity for the Gender option they should be able to enter a text value
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Amelija"
    And I click on ".edit-profile-save"
    And I click on ".edit-link"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I click on ".gender-label-text=Another Identity"
    And I fill in ".form-group-genderOther-0 input" with "Tirana"
    And I click on ".edit-profile-save"
    Then the ".profile-gender" element should not contain "Another Identity"
    And the ".profile-gender" element should contain "Tirana"
