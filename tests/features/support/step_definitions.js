module.exports = function() {
  this.Given(/^I have visited the home page$/, function () {
    browser.url('http://localhost:3000');
  });

  this.Then(/^the "([^"]*)" element should contain "([^"]*)"$/, function (element, text) {
    browser.waitForText(element);
    const completedText = browser.getTitle();

    expect(client.getText(element)).toEqual(text);
  });
}
