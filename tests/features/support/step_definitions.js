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

  this.Given(/^a task with the following fields:$/, function (table) {
    const data = table.rowsHash();
    const tasks = server.execute((data) => {
      const {Tasks} = require('/imports/api/tasks');
      return Tasks.insert(data);
    }, data);
  });

  this.Before(function () {
    // make sure the DDP connection is not logged in before clearing the database
    server.call('logout');
    server.execute(function () {
      Package['xolvio:cleaner'].resetDatabase();
    });
  })
}
