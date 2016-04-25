module.exports = function() {
  this.Given(/^I am am logged in$/, function () {
    client.waitForExist('#login-sign-in-link');
    client.click('#login-sign-in-link');
    client.click('#signup-link');
    client.setValue('#login-username', 'letme1n3');
    client.setValue('#login-password', 'letme1n');
    client.setValue('#login-password-again', 'letme1n');
    client.click('#login-buttons-password');

    client.waitForExist('#login-name-link');
    expect(client.getText('#login-name-link')).toEqual('letme1n3 ▾');
  });

  this.Given(/^I am an anonymous user$/, function () {
    client.waitForExist('.login-link-text');
    expect(client.getText('.login-link-text')).toEqual('Sign in ▾');
  });

  this.Given(/^I am on the home page$/, function () {
    browser.url('http://localhost:3000');
  });

  this.When(/^I go to the profile page for "([^"]*)"$/, function (name) {
    // Look up the profile with this name
    //
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

    server.call('login', {
      user: {username: userObject.username},
      password: userObject.password
    }, userObject);

    const data = table.rowsHash();
    server.execute((data) => {
      const { Meteor } = require('meteor/meteor');
      Meteor.call('profiles.insert', data);
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
