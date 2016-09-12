import { TAPi18n } from 'meteor/tap:i18n';
import React from 'react';
import { Link } from 'react-router';

export default class LanguageSwitcher extends React.Component {
  constructor(props) {
    super(props);

    // Get all supported languages
    const switchOptions = this.props.supportedLanguages;

    this.state = {
      switchOptions
    };
  }

  componentWillReceiveProps() {
    // Get all supported languages
    const switchOptions = this.props.supportedLanguages;

    // Remove current language
    delete switchOptions[this.props.lang];

    this.setState({switchOptions});
  }

  renderLangLinks() {
    const { switchOptions } = this.state;
    return (_.map(_.pairs(switchOptions), (pair) => {
      // console.log(lang);
      const langCode = pair[0];
      const langLocalName = pair[1].name;

      return (
        <a key={langCode} name={langCode} onClick={
          (e) => {
            e.preventDefault();
            window.AppState.setLocale(langCode);
            window.AppState.rerender();
          }
        }>
          {langLocalName}
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
  lang: React.PropTypes.string,
  supportedLanguages: React.PropTypes.object,
};
