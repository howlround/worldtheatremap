Feature: Select gender options on profile

  As a user
  I want to select appropriate gender options on a profile
  So I can add accurate information

  Background:
    Given I am on the home page

  Scenario: Users should be able to create a profile choosing a pre-existing gender option
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Amelija"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "4th most popular name in Albania (2014)"
    And I fill in ".profile-locality-edit" with "Tirana"
    And I fill in ".profile-administrative-area-edit" with "Tirana County"
    And I fill in ".profile-country-edit" with "Albania"
    And I select "Female" from the ".profile-gender-edit" combobox
    And I click on ".edit-profile-save"
    Then the ".profile-gender" element should contain "Female"

  Scenario: Users should be able to create a profile choosing multiple pre-existing gender options
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Amelija"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "4th most popular name in Albania (2014)"
    And I fill in ".profile-locality-edit" with "Tirana"
    And I fill in ".profile-administrative-area-edit" with "Tirana County"
    And I fill in ".profile-country-edit" with "Albania"
    And I select "Female" from the ".profile-gender-edit" combobox
    And I select "Other" from the ".profile-gender-edit" combobox
    And I click on ".edit-profile-save"
    Then the ".profile-gender" element should contain "Female and Other"

  Scenario: Users should be able to create a profile choosing a non pre-existing gender option
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Amelija"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "4th most popular name in Albania (2014)"
    And I fill in ".profile-locality-edit" with "Tirana"
    And I fill in ".profile-administrative-area-edit" with "Tirana County"
    And I fill in ".profile-country-edit" with "Albania"
    And I select "Decline to Answer" from the ".profile-gender-edit" combobox
    And I click on ".edit-profile-save"
    Then the ".profile-gender" element should contain "Decline to Answer"

  Scenario: After selecting a gender option that wasn't in the system that option should be available when editing that profile
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "Amelija"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I fill in ".profile-about-edit" with "4th most popular name in Albania (2014)"
    And I fill in ".profile-locality-edit" with "Tirana"
    And I fill in ".profile-administrative-area-edit" with "Tirana County"
    And I fill in ".profile-country-edit" with "Albania"
    And I select "Decline to Answer" from the ".profile-gender-edit" combobox
    And I click on ".edit-profile-save"
    When I go to the profile page for "Amelija"
    And I follow ".edit-link"
    And I select "Female" from the ".profile-gender-edit" combobox
    And I click on ".edit-profile-save"
    Then the ".profile-gender" element should contain "Decline to Answer and Female"

