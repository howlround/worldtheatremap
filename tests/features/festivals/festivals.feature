@festivals
Feature: Festival System

  As a user maintaining an organization profile
  I want to create a festival profile
  So that I can keep each festival year seperate from my organization

  Background:
    Given I am on the English language home page

  Scenario: As a user I want to be able to create a festival profile
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "National Festival of Festivals 2010"
    And I select "Festival" from the ".profile-type-edit" combobox
    And I click on ".edit-profile-save"
    Then the ".profile-name" element should contain "National Festival of Festivals 2010"

  Scenario: As a user I want to affiliate a parent organization with a festival profile
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "National Festival of Festivals 2010"
    And I select "Festival" from the ".profile-type-edit" combobox
    And I click on ".edit-profile-save"
    And a profile with the following fields:
      | name | National Festival Organizers |
      | about | We fest |
    When I go to the profile page for "National Festival of Festivals 2010"
    And I fill in ".festival-organizer-profile-edit" with "National Festival Organizers"
    And I click on ".autocomplete-results li"
    And I click on ".edit-festival-organizer-save"
    Then the ".festival-organizers" element should contain "National Festival Organizers"
    When I go to the profile page for "National Festival Organizers"
    Then the ".affiliated-festivals" element should contain "National Festival of Festivals 2010"

  Scenario: Other festivals should not display as options in the parent organization autocomplete
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "National Festival of Festivals 2010"
    And I select "Festival" from the ".profile-type-edit" combobox
    And I click on ".edit-profile-save"
    And a profile with the following fields:
      | name | National Festival Organizers |
      | about | We fest |
    When I go to the profile page for "National Festival of Festivals 2010"
    And I fill in ".festival-organizer-profile-edit" with "National Festival"
    Then the ".autocomplete-results li" element should not contain "National Festival of Festivals 2010"

  Scenario: Users can delete festival organizer affiliations
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "National Festival of Festivals 2010"
    And I select "Festival" from the ".profile-type-edit" combobox
    And I click on ".edit-profile-save"
    And a profile with the following fields:
      | name | National Festival Organizers |
      | about | We fest |
    When I go to the profile page for "National Festival of Festivals 2010"
    And I fill in ".festival-organizer-profile-edit" with "National Festival Organizers"
    And I click on ".autocomplete-results li"
    And I click on ".edit-festival-organizer-save"
    And I click on ".delete-affiliation"
    Then I should not see ".festival-organizers li"

  Scenario: Festival Organizer block should only display on Festival profiles
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Not a Festival"
    And I click on ".edit-profile-save"
    Then I should not see ".festival-organizer-profile-edit"
