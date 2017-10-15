# @search
# Feature: Pager on profile search

#   As a user
#   I want to use a pager on profile search
#   So I can find more profiles

#   Background:
#     Given I am on the English language home page
#     And a profile with the following fields:
#       | name | Alpha |
#       | postalCode | 16000 |
#       | lat | -31.03133177633187 |
#       | lon | -71.0703125 |
#     And a profile with the following fields:
#       | name | Bravo |
#       | postalCode | 16000 |
#       | lat | -32.03133177633187 |
#       | lon | -72.0703125 |
#     And a profile with the following fields:
#       | name | Charlie |
#       | postalCode | 16000 |
#       | lat | -33.03133177633187 |
#       | lon | -73.0703125 |
#     And a profile with the following fields:
#       | name | Delta |
#       | postalCode | 16000 |
#       | lat | -34.03133177633187 |
#       | lon | -74.0703125 |
#     And a profile with the following fields:
#       | name | Echo |
#       | postalCode | 16000 |
#       | lat | -35.03133177633187 |
#       | lon | -75.0703125 |
#     And a profile with the following fields:
#       | name | Foxtrot |
#       | postalCode | 16000 |
#       | lat | -36.03133177633187 |
#       | lon | -76.0703125 |
#     And a profile with the following fields:
#       | name | Golf |
#       | postalCode | 16000 |
#       | lat | -37.03133177633187 |
#       | lon | -77.0703125 |
#     And a profile with the following fields:
#       | name | Hotel |
#       | postalCode | 16000 |
#       | lat | -38.03133177633187 |
#       | lon | -78.0703125 |
#     And a profile with the following fields:
#       | name | India |
#       | postalCode | 16000 |
#       | lat | -39.03133177633187 |
#       | lon | -79.0703125 |
#     And a profile with the following fields:
#       | name | Juliett |
#       | postalCode | 16000 |
#       | lat | -40.03133177633187 |
#       | lon | -80.0703125 |
#     And a profile with the following fields:
#       | name | Kilo |
#       | postalCode | 16000 |
#       | lat | -41.03133177633187 |
#       | lon | -81.0703125 |
#     And a profile with the following fields:
#       | name | Lima |
#       | postalCode | 16000 |
#       | lat | -42.03133177633187 |
#       | lon | -82.0703125 |
#     And a profile with the following fields:
#       | name | Mike |
#       | postalCode | 16000 |
#       | lat | -43.03133177633187 |
#       | lon | -83.0703125 |
#     And a profile with the following fields:
#       | name | November |
#       | postalCode | 16000 |
#       | lat | -44.03133177633187 |
#       | lon | -84.0703125 |
#     And a profile with the following fields:
#       | name | Oscar |
#       | postalCode | 16000 |
#       | lat | -45.03133177633187 |
#       | lon | -85.0703125 |
#     And a profile with the following fields:
#       | name | Papa |
#       | postalCode | 16000 |
#       | lat | -46.03133177633187 |
#       | lon | -86.0703125 |
#     And a profile with the following fields:
#       | name | Quebec |
#       | postalCode | 16000 |
#       | lat | -47.03133177633187 |
#       | lon | -87.0703125 |
#     And a profile with the following fields:
#       | name | Romeo |
#       | postalCode | 16000 |
#       | lat | -48.03133177633187 |
#       | lon | -88.0703125 |
#     And a profile with the following fields:
#       | name | Sierra |
#       | postalCode | 16000 |
#       | lat | -49.03133177633187 |
#       | lon | -89.0703125 |
#     And a profile with the following fields:
#       | name | Tango |
#       | postalCode | 16000 |
#       | lat | -50.03133177633187 |
#       | lon | -90.0703125 |
#     And a profile with the following fields:
#       | name | Uniform |
#       | postalCode | 16000 |
#       | lat | -51.03133177633187 |
#       | lon | -91.0703125 |
#     And I go to the "profiles" search page
#
#   Scenario: Profiles search results map should have a pager to see the next page
#     And I fill in ".profile-postal-code-edit" with "16000"
#     And I click on ".results-display-map"
#     When I click on ".search-results-pager .next"
#     Then the ".items-globe .profile-name" element should contain "Uniform"
