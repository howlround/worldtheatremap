@analytics
Feature: Analytics page

  As a administrator
  I want to see statistics about all the content on the site
  So I can report on content

  Background:
    Given I am on the English language home page

  Scenario: Admins can view the statistics page
    And I am logged in as an administrator
    And I go to "/site-statistics"
    Then the "h1.page-title" element should contain "Site Statistics"

  Scenario: Logged in users that are not admins should not see the site statistics page
    And I am logged in
    And I go to "/site-statistics"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  Scenario: The analytics page displays the percentage of content originally created in each language
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "My Favorite Playwright"
    And I click on ".edit-profile-save"
    When I go to the "event" add page
    And I fill in ".event-show-edit" with "Althea"
    And I click on ".autocomplete-results li"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I fill in ".event-organization-edit" with "Organization of the year"
    And I click on ".autocomplete-results li"
    And I select "Performance" from the ".event-type-edit" combobox
    And I click on ".form-group-startDate input"
    And I click on ".react-datepicker__day=1"
    And I click on ".form-group-endDate input"
    And I click on ".react-datepicker__navigation--next"
    And I click on ".react-datepicker__day=15"
    And I select "India" from the ".country-select-edit" combobox
    And I fill in "[name=lat]" with "-36.03133177633187"
    And I fill in "[name=lon]" with "-72.0703125"
    And I click on ".edit-event-save"
    And I am logged in as an administrator
    And I go to "/site-statistics"
    And the ".content-original-language .en" element should contain "100%"
    And the ".content-original-language .es" element should contain "0%"

  Scenario: The analytics page displays the percentage individual profiles that are US-based vs non-US-based
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "My Favorite Playwright"
    And I select "Individual" from the ".profile-type-edit" combobox
    And I select "Algeria" from the ".country-select-edit" combobox
    And I click on ".edit-profile-save"
    And I am logged in as an administrator
    And I go to "/site-statistics"
    And the ".theatremakers-by-country .united-states" element should contain "0%"
    And the ".theatremakers-by-country .other-countries" element should contain "100%"

  Scenario: The analytics page displays the percentage organization profiles that are US-based vs non-US-based
    And I am logged in
    When I go to the "profile" add page
    And I fill in ".profile-name-edit" with "My Favorite Playwright"
    And I select "Organization" from the ".profile-type-edit" combobox
    And I select "Algeria" from the ".country-select-edit" combobox
    And I click on ".edit-profile-save"
    And I am logged in as an administrator
    And I go to "/site-statistics"
    And the ".organizations-by-country .united-states" element should contain "0%"
    And the ".organizations-by-country .other-countries" element should contain "100%"
