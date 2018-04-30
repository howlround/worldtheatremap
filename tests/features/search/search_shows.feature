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
    And I click on ".label-text=Musical Theatre"
    And I click on ".edit-show-save"
    # Add Second Show
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Aadya"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I fill in ".show-about-edit" with "Most popular name in India"
    And I click on ".label-text=African Diaspora"
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
    And I select "African Diaspora" from the ".interests-edit" combobox
    And the ".search-results" element should contain "Sofia"
    And the ".search-results" element should contain "Aadya"

  Scenario: Users can search for shows by name (partial/full, different case variations)
    # Full name, match case
    When I fill in ".show-search-text" with "Sofia"
    Then the ".search-results" element should contain "Sofia"
    And the ".search-results" element should not contain "Aadya"
    # Full name, different case
    When I fill in ".show-search-text" with "sofia"
    Then the ".search-results" element should contain "Sofia"
    # Partial name (begining), match case
    When I fill in ".show-search-text" with "Sof"
    Then the ".search-results" element should contain "Sofia"
    # Partial name (end), match case
    When I fill in ".show-search-text" with "fia"
    Then the ".search-results" element should contain "Sofia"

  Scenario: Shows with diacritics in the title can be found by searching with the original characters
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Söžía"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I go to the "shows" search page
    When I fill in ".show-search-text" with "Söžía"
    Then the ".search-results" element should contain "Söžía"

  Scenario: Shows with diacritics in the title can be found by searching with the romanized characters
    And I go to the "show" add page
    And I fill in ".show-name-edit" with "Söžía"
    And I fill in ".show-author-name-edit" with "My Favorite Playwright"
    And I click on ".autocomplete-results li"
    And I click on ".edit-show-save"
    And I go to the "shows" search page
    When I fill in ".show-search-text" with "Sozia"
    Then the ".search-results" element should contain "Söžía"

  Scenario: After editing a show name the new name should be searchable
    And I go to the show page for "Sofia"
    And I click on ".edit-link"
    And I fill in ".show-name-edit" with "Mofia"
    And I click on ".edit-show-save"
    And I go to the "shows" search page
    When I fill in ".show-search-text" with "Mof"
    Then the ".search-results" element should contain "Mofia"
