import React from 'react';
import ReactSelect from 'react-select';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router';
import { TAPi18n } from 'meteor/tap:i18n';

export default class LanguageSwitcher extends React.Component {
  constructor(props) {
    super(props);

    // Get all supported languages
    const switchOptions = this.props.supportedLanguages;

    this.state = {
      switchOptions
    };

    this.onChangeLocale = this.onChangeLocale.bind(this);
  }

  componentWillReceiveProps() {
    // Get all supported languages
    const switchOptions = this.props.supportedLanguages;

    this.setState({switchOptions});
  }

  onChangeLocale(option) {
    const { router } = this.context;

    const localePath = window.location.pathname;
    const neutralPath = localePath.substring(option.value.length + 1);

    router.push(`/${option.value}${neutralPath}${window.location.search}`);
    window.AppState.setLocale(option.value);
    window.AppState.rerender();
  }

  renderLangLinks() {
    const { locale } = this.props;
    const { switchOptions } = this.state;

    const languageOptions = _.map(_.pairs(switchOptions), (pair) => {
      const localeCode = pair[0];
      const localeLocalName = pair[1].name;

      return (
        {
          value: localeCode,
          label: localeLocalName,
        }
      );
    });

    return (
      <ReactSelect
        autoBlur
        clearable={false}
        searchable={false}
        options={languageOptions}
        value={locale}
        onChange={this.onChangeLocale}
      />
    );
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
