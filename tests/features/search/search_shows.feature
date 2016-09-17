@search
Feature: Filters on shows search

  As a user
  I want to use search filters
  So I can find shows

  Background:
    Given I am on the English language home page
    And a profile with the following fields:
      | name | My Favorite Playwright |
    And I am logged in
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Sofia"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in Italy"
    And I select "Musical Theatre" from the ".interests-edit" combobox
    And I click on ".edit-show-save"
    # Add Second Show
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Aadya"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in India"
    And I select "African-American" from the ".interests-edit" combobox
    And I click on ".edit-show-save"
    And I go to the "shows" search page
    And the ".search-type .active" element should contain "Shows"
    And I should not see ".search-results"

  # Interests
  Scenario: Users can filter shows by interest
    When I select "Musical Theatre" from the ".interests-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should not contain "Aadya"

  Scenario: Choosing multiple interests should match two different shows that each have one of the interests
    When I select "Musical Theatre" from the ".interests-edit" combobox
    And I select "African-American" from the ".interests-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should contain "Aadya"

  Scenario: Users can search for shows by name (partial/full, different case variations)
    # Full name, match case
    When I fill in ".show-search-text" with "Sofia"
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should not contain "Aadya"
    # Full name, different case
    When I fill in ".show-search-text" with "sofia"
    And the ".search-results" element should contain "Sofia"
    # Partial name (begining), match case
    When I fill in ".show-search-text" with "Sof"
    And the ".search-results" element should contain "Sofia"
    # Partial name (end), match case
    When I fill in ".show-search-text" with "fia"
    And the ".search-results" element should contain "Sofia"
