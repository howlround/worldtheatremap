module.exports = function() {
  this.Given(/^I have visited the home page$/, function () {
    browser.url('http://localhost:3000');
  });

  this.Then(/^I should see "([^"]*)"$/, function (text) {
    browser.waitForText('.hide-completed', text);
  });
}
