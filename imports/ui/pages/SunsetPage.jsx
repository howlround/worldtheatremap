// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import Modal from '../components/Modal.jsx';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Pages
import TextPage from '../../ui/pages/TextPage.jsx';

class SunsetPage extends React.Component {
  constructor(props) {
    super(props);

    this.switchLanguage = this.switchLanguage.bind(this);
    this.renderEnglish = this.renderEnglish.bind(this);
    this.renderSpanish = this.renderSpanish.bind(this);
    this.renderFrench = this.renderFrench.bind(this);
  }

  renderEnglish() {
    return (
      <div className="page-content">
        <Helmet title="Sunsetting the World Theatre Map"/>
        <h3>Sunsetting</h3>
        <p>
          We are sunsetting one of our experimental open source projects, the World Theatre Map. As an community-edited directory of the world’s theatre field, the project attempted to fulfill an important need for knowledge and connection. We discovered that the need for this kind of resource wasn’t as strong as we anticipated, and the Map has struggled to be as vibrant as other HowlRound projects such as the Journal and HowlRound TV.
        </p>
      </div>
    );
  }

  renderSpanish() {
    return (
      <div className="page-content">
        <Helmet title="¿Qué es el Mapa Mundial del Teatro?" />
        <h3>El Mapa Mundial del Teatro</h3>
        <p>
          We are sunsetting one of our experimental open source projects, the World Theatre Map. As an community-edited directory of the world’s theatre field, the project attempted to fulfill an important need for knowledge and connection. We discovered that the need for this kind of resource wasn’t as strong as we anticipated, and the Map has struggled to be as vibrant as other HowlRound projects such as the Journal and HowlRound TV.
        </p>
      </div>
    );
  }

  renderFrench() {
    return (
      <div className="page-content">
        <Helmet title="La Carte mondiale du théâtre ?" />
        <h3>La Carte mondiale du théâtre ?</h3>
        <p>
          We are sunsetting one of our experimental open source projects, the World Theatre Map. As an community-edited directory of the world’s theatre field, the project attempted to fulfill an important need for knowledge and connection. We discovered that the need for this kind of resource wasn’t as strong as we anticipated, and the Map has struggled to be as vibrant as other HowlRound projects such as the Journal and HowlRound TV.
        </p>
      </div>
    );
  }

  switchLanguage() {
    const { locale } = this.props.intl;

    switch (locale) {
      case 'fr':
        return this.renderFrench();
        break;
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

SunsetPage.propTypes = {
  intl: intlShape.isRequired,
};

SunsetPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(SunsetPage);
