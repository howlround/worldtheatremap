// Utilities
import { Meteor } from 'meteor/meteor';
import React from 'react';
import Helmet from 'react-helmet';
import Modal from '../components/Modal.jsx';
import { intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

class TextPage extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.redirect = this.redirect.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  goBack() {
    this.context.router.goBack();
  }

  redirect() {
    const { redirect } = this.props;

    this.context.router.push(redirect);
  }

  onClick() {
    const { redirect } = this.props;

    if (redirect) {
      this.redirect();
    } else {
      this.goBack();
    }
  }

  render() {
    const { renderFunction, redirect } = this.props;

    return (
      <div className="overlay-wrapper">
        <Modal/>
        <div className="page text-page">
          <div className="page-content">
            <span
              className="overlay-close"
              onClick={this.onClick}
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
  redirect: React.PropTypes.string,
};

TextPage.contextTypes = {
  router: React.PropTypes.object,
};

export default TextPage;
