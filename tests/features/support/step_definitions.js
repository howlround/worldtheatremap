/* eslint-disable */
RegExp.escape = function(str) {
  return (str+'').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

module.exports = function() {
  this.Given(/^I am logged in$/, function () {
    browser.url('http://localhost:3000/join');
    browser.waitForExist('input[name="email"]', 2000);
    browser.setValue('input[name="email"]', 'reginold@worldtheatremap.org');
    browser.setValue('input[name="password"]', 'letme1n3');
    browser.setValue('input[name="confirm"]', 'letme1n3');

    browser.waitForExist('button[type="submit"]', 2000);
    browser.click('button[type="submit"]');
    browser.pause(100);

    expect(browser.waitForText('.user-menu .menu-parent', 'REGINOLD'));
  });

  this.Given(/^I am an anonymous user$/, function () {
    browser.waitForExist('.login-link-text');
    expect(browser.getText('.login-link-text')).toEqual('Sign in ▾');
  });

  this.Given(/^I am on the home page$/, function () {
    browser.url('http://localhost:3000');
  });

  this.When(/^I follow "([^"]*)"$/, function (element) {
    browser.waitForExist(element);
    browser.click(element);
  });

  this.Given(/^I click on "([^"]*)"$/, function (element) {
    browser.waitForExist(element, 2000);
    browser.click(element);
  });

  this.Given(/^I hover over "([^"]*)"$/, function (element) {
    browser.waitForExist(element);
    browser.moveToObject(element);
  });

  this.Given(/^I go to the play add page$/, function () {
    browser.url('http://localhost:3000/plays/add');
  });

  this.When(/^I fill in "([^"]*)" with "([^"]*)"$/, function (element, text) {
    browser.waitForExist(element, 2000);
    browser.setValue(element, text);
  });

  this.When(/^I press "([^"]*)"$/, function (element) {
    browser.waitForExist(element);
    browser.click(element);
  });

  this.Then(/^I should see the "([^"]*)" element$/, function (element) {
    expect(browser.waitForExist(element, 2000));
  });

  this.Then(/^I should not see "([^"]*)"$/, function (element) {
    expect(browser.isExisting(element)).toBe(false);
  });

  this.When(/^I go to the profile page for "([^"]*)"$/, function (name, callback) {
    // Look up the profile with this name
    const profile = server.execute((name, callback) => {
      const { Meteor } = require('meteor/meteor');
      const { Profiles } = require('/imports/api/profiles/profiles.js');
      const profile = Profiles._collection.findOne({name: name});

      return profile;
    }, name);

    if (!profile) {
      callback(new Error('No profile exists with the name ' + name));
    }

    browser.url('http://localhost:3000/profiles/' + profile._id);

    // Check if we are on the correct page
    // const processedName = RegExp('/' + name + '/i');
    const processedName = RegExp(RegExp.escape(name), 'i');
    expect(browser.getText('.page-title')).toMatch(processedName);
    callback();
  });

  this.Then(/^the "([^"]*)" element should contain "([^"]*)"$/, function (element, text) {
    browser.waitForExist(element, 2000);
    const processedText = RegExp(RegExp.escape(text), 'i');

    expect(browser.getText(element)).toMatch(processedText);
  });

  this.Then(/^the "([^"]*)" element should not contain "([^"]*)"$/, function (element, text) {
    browser.waitForExist(element);
    const processedText = RegExp(RegExp.escape(text), 'i');

    expect(browser.getText(element)).not.toMatch(processedText);
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
    browser.pause(100);
  });
}
