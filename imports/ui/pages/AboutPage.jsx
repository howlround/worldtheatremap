// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import Modal from '../components/Modal.jsx';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Pages
import TextPage from '../../ui/pages/TextPage.jsx';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.switchLanguage = this.switchLanguage.bind(this);
    this.renderEnglish = this.renderEnglish.bind(this);
    this.renderSpanish = this.renderSpanish.bind(this);
  }

  renderEnglish() {
    return (
      <div className="page-content">
        <Helmet title="About" />
        <h1>About</h1>
        <p>
          This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page. This is the about page.
        </p>
      </div>
    );
  }

  renderSpanish() {
    return (
      <div className="page-content">
        <Helmet title="Aobre" />
        <h1>Aobre</h1>
        <p>
          This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page. This is the Spanish about page.
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

AboutPage.propTypes = {
  intl: intlShape.isRequired,
};

AboutPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AboutPage);
