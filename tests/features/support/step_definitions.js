/* eslint-disable */
module.exports = function() {
  this.Given(/^I am logged in$/, function () {
    browser.url('http://localhost:3000/join');
    client.waitForExist('input[name="email"]');
    client.setValue('input[name="email"]', 'reginold@worldtheatremap.org');
    client.setValue('input[name="password"]', 'letme1n3');
    client.setValue('input[name="confirm"]', 'letme1n3');

    client.waitForExist('button[type="submit"]');
    client.click('button[type="submit"]');

    client.waitForText('.user-menu a', 'REGINOLD');
    expect(client.getText('.user-menu a')).toEqual('REGINOLD');
  });

  this.Given(/^I am an anonymous user$/, function () {
    client.waitForExist('.login-link-text');
    expect(client.getText('.login-link-text')).toEqual('Sign in ▾');
  });

  this.Given(/^I am on the home page$/, function () {
    browser.url('http://localhost:3000');
  });

  this.When(/^I follow "([^"]*)"$/, function (element) {
    client.waitForExist(element);
    client.click(element);
  });

  this.When(/^I fill in "([^"]*)" with "([^"]*)"$/, function (element, text) {
    client.waitForExist(element);
    client.setValue(element, text);
  });

  this.When(/^I press "([^"]*)"$/, function (element) {
    client.waitForExist(element);
    client.click(element);
  });

  this.Then(/^I should not see "([^"]*)"$/, function (element) {
    expect(client.isExisting(element)).toBe(false);
  });

  this.When(/^I go to the profile page for "([^"]*)"$/, function (name) {
    // Look up the profile with this name
    const id = server.execute((name) => {
      const { Meteor } = require('meteor/meteor');
      const { Profiles } = require('/imports/api/profiles/profiles.js');
      const profile = Profiles._collection.findOne({name: name});

      return profile._id;
    }, name);

    browser.url('http://localhost:3000/profiles/' + id);

    // Check if we are on the correct page
    expect(client.getText('.page-title')).toEqual(name);
  });

  this.Then(/^the "([^"]*)" element should contain "([^"]*)"$/, function (element, text) {
    browser.waitForText(element, text);
    const completedText = browser.getTitle();

    expect(client.getText(element)).toEqual(text);
  });

  this.Given(/^a profile with the following fields:$/, function (table) {
    // Set up a user to be the owner of the insert
    Random = require('meteor-random');
    const userObject = {
      username: Random.id(),
      email: Random.id(5) + '@' + Random.id(8) + '.com',
      password: Random.id(5),
    }

    server.execute((userObject) => {
      const { Accounts } = require('meteor/accounts-base');
      try{
        Accounts.createUser(userObject);
      }catch(e){}
    }, userObject);

    const data = table.rowsHash();
    server.execute((data) => {
      const { Meteor } = require('meteor/meteor');
      const { Factory } = require('meteor/factory');
      Factory.create('profile', data);
    }, data);
  });

  this.Before(function () {
    // make sure the DDP connection is not logged in before clearing the database
    server.call('logout');
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });
  });
}
