// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import Modal from '../components/Modal.jsx';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Pages
import TextPage from '../../ui/pages/TextPage.jsx';

class TermsOfUsePage extends React.Component {
  constructor(props) {
    super(props);

    this.switchLanguage = this.switchLanguage.bind(this);
    this.renderEnglish = this.renderEnglish.bind(this);
    this.renderSpanish = this.renderSpanish.bind(this);
  }

  renderEnglish() {
    return (
      <div className="page-content">
        <Helmet title="Terms of Use" />
        <h1>Terms of Use</h1>
        <p>
          This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page. This is the terms of use page.
        </p>
      </div>
    );
  }

  renderSpanish() {
    return (
      <div className="page-content">
        <Helmet title="Términos de Uso" />
        <h1>Términos de Uso</h1>
        <p>
          This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page. This is the Spanish terms of use page.
        </p>
      </div>
    );
  }

  switchLanguage() {
    const { locale } = this.props.intl;

    switch (locale) {
      case 'es':
        return this.renderSpanish();
        break;
      default:
        return this.renderEnglish();
    }
  }

  render() {
    return (
      <TextPage renderFunction={this.switchLanguage} />
    );
  }
}

TermsOfUsePage.propTypes = {
  intl: intlShape.isRequired,
};

TermsOfUsePage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(TermsOfUsePage);
