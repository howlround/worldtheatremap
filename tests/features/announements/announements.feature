Feature: Annoucement system

  As a site admin
  I want to administer a sitewide announcement
  So that I can keep the users informed

  Background:
    Given I am on the English language home page

  Scenario: Admins can create announcements that display at the top of the screen
    And I am logged in as an administrator
    And I go to "/announcement"
    And I fill in ".content-body-edit" with "New Announcement!"
    And I press ".edit-content-save"
    Then the ".announcement" element should contain "New Announcement!"

  Scenario: Admins can use basic formatting in announcements
    And I am logged in as an administrator
    And I go to "/announcement"
    And I fill in ".content-body-edit" with "New *Announcement*!"
    And I press ".edit-content-save"
    Then the ".announcement" element should not contain "New *Announcement*!"

  Scenario: Logged in users that are not admins should not see the form to edit announcements
    And I am logged in
    And I go to "/announcement"
    And the ".wrapper-message" element should contain "Sign in or register to participate in the World Theatre Map"

  @i18n
  Scenario: i18n
    And I am logged in as an administrator
    And I go to "/announcement"
    And I fill in ".content-body-edit" with "New Announcement!"
    And I press ".edit-content-save"
    When I set the language to "Español"
    And I go to "/announcement"
    And I fill in ".content-body-edit" with "¡Nuevo Anuncio!"
    And I press ".edit-content-save"
    Then the ".announcement" element should contain "¡Nuevo Anuncio!"
    When I set the language to "English"
    Then the ".announcement" element should contain "New Announcement!"
