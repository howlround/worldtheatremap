import React from 'react';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router';
import { TAPi18n } from 'meteor/tap:i18n';

export default class LanguageSwitcher extends React.Component {
  constructor(props) {
    super(props);

    // Get all supported languages
    const switchOptions = this.props.supportedLanguages;

    // Remove current language
    delete switchOptions[this.props.locale];

    this.state = {
      switchOptions
    };
  }

  componentWillReceiveProps() {
    // Get all supported languages
    const switchOptions = this.props.supportedLanguages;

    // Remove current language
    delete switchOptions[this.props.locale];

    this.setState({switchOptions});
  }

  renderLangLinks() {
    const { switchOptions } = this.state;

    return (_.map(_.pairs(switchOptions), (pair) => {
      const localeCode = pair[0];
      const localeLocalName = pair[1].name;

      const localePath = window.location.pathname;
      const neutralPath = localePath.substring(localeCode.length + 1);

      return (
        <a key={localeCode} name={localeCode} onClick={
          (e) => {
            e.preventDefault();
            this.context.router.push(`/${localeCode}${neutralPath}${window.location.search}`);
            window.AppState.setLocale(localeCode);
            window.AppState.rerender();
          }
        }>
          {localeLocalName}
        </a>
      );
    }));
  }

  render() {
    return (
      <div className="language-switcher">
        {this.renderLangLinks()}
      </div>
    );
  }
}

LanguageSwitcher.propTypes = {
  locale: React.PropTypes.string,
  supportedLanguages: React.PropTypes.object,
};

LanguageSwitcher.contextTypes = {
  router: React.PropTypes.object,
};
