// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import Modal from '../components/Modal.jsx';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

class TextPage extends React.Component {
  render() {
    const { renderFunction } = this.props;

    return (
      <div className="overlay-wrapper">
        <Modal/>
        <div className="page text-page">
          <div className="page-content">
            <span
              className="overlay-close"
              onClick={this.context.router.goBack}
              title="Back"
            >
              &times;
            </span>
            {renderFunction()}
          </div>
        </div>
      </div>
    );
  }
}

TextPage.propTypes = {
  renderFunction: React.PropTypes.func,
};

TextPage.contextTypes = {
  router: React.PropTypes.object,
};

export default TextPage;
