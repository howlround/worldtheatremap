// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { _ } from 'meteor/underscore';
import slugify from 'underscore.string/slugify';
import Helmet from 'react-helmet';
import { intlShape, injectIntl, FormattedNumber } from 'react-intl';
import { TAPi18n } from 'meteor/tap:i18n';

// Components
import AccessDeniedMessage from '../components/AccessDeniedMessage.jsx';
import Modal from '../components/Modal.jsx';
import AuthSignIn from '../components/AuthSignIn.jsx';

class SiteStatisticsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  extractLanguagePercentageValues(statObject) {
    if (typeof statObject == 'undefined') {
      return <tr></tr>;
    }

    let row = _.map(statObject.items, (count, key) => (
      <td key={key} className={key}>
        <FormattedNumber
          value={count/statObject.total}
          style="percent"
        />
      </td>
    ));

    return (
      <tr className={slugify(statObject._id)}>
        <th>{statObject._id}</th>
        {row}
      </tr>
    );
  }

  extractPercentageValues(statObject) {
    if (typeof statObject == 'undefined') {
      return <tr></tr>;
    }

    let row = _.map(statObject.items, item => (
      <td key={item.label} className={slugify(item.label)}>
        <FormattedNumber
          value={item.value/statObject.total}
          style="percent"
        />
      </td>
    ));

    return (
      <tr className={slugify(statObject._id)}>
        <th>{statObject._id}</th>
        {row}
      </tr>
    );
  }

  extractHeaders(statObject, key) {
    if (typeof statObject == 'undefined') {
      return <th></th>;
    }

    const header = _.map(statObject.items, (item) => (
      <th key={item[key]}>{item[key]}</th>
    ));

    return header;
  }

  renderLanguageStatisticsTable() {
    const { OriginalLanguage } = this.props;

    const supportedLocaleKeys = new Array;
    const supportedLanguages = TAPi18n.getLanguages();
    _.each(supportedLanguages, (locale, key) => {
      supportedLocaleKeys.push(key);
    });

    const header = _.map(supportedLanguages, (locale) => (
      <th key={locale.name}>
        {locale.name}
      </th>
    ));

    return (
      <tbody>
        <tr className="table-header"><th></th>{header}</tr>
        {this.extractLanguagePercentageValues(OriginalLanguage)}
      </tbody>
    );
  }

  renderCountryStatisticsTable() {
    const {
      EventsByCountry,
      TheatremakersByCountry,
    } = this.props;

    const header = this.extractHeaders(EventsByCountry, 'label');

    return (
      <tbody>
        <tr className="table-header"><th></th>{header}</tr>
        {this.extractPercentageValues(EventsByCountry)}
        {this.extractPercentageValues(TheatremakersByCountry)}
      </tbody>
    );
  }

  render() {
    const { user } = this.props;
    const access = Roles.userIsInRole(Meteor.userId(), ['admin']);

    if (user && access) {
      return (
        <div className="page">
          <Helmet title="Site Statistics" />
          <h1 className="page-title">Site Statistics</h1>
          <div className="page-content">
            <table className="site-statistics">
              {this.renderLanguageStatisticsTable()}
              {this.renderCountryStatisticsTable()}
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className="page auth">
            <AccessDeniedMessage />
            <div className="page-content">
              <Helmet title="Sign in to edit this content" />
              <AuthSignIn />
            </div>
          </div>
        </div>
      );
    }
  }
}

SiteStatisticsPage.propTypes = {
  intl: intlShape.isRequired,
  user: React.PropTypes.object,
  OriginalLanguage: React.PropTypes.object,
  EventsByCountry: React.PropTypes.object,
  TheatremakersByCountry: React.PropTypes.object,
};

SiteStatisticsPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(SiteStatisticsPage);
