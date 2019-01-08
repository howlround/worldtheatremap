// Utilities
import React from 'react';
import classnames from 'classnames';
import Helmet from 'react-helmet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

// Components
import ContentEdit from '../components/ContentEdit.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import AccessDeniedMessage from '../components/AccessDeniedMessage.jsx';
import Modal from '../components/Modal.jsx';
import AuthHowlRound from '../components/AuthHowlRound.jsx';
import Loading from '../components/Loading.jsx';

class ContentEditPage extends React.Component {
  render() {
    const { content, user, access, loading } = this.props;
    const { locale } = this.props.intl;

    const pageClass = classnames({
      page: true,
    });

    if (loading) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <Loading key="loading" />
        </div>
      );
    } else if (!loading && !content) {
      return (
        <NotFoundPage />
      );
    } else if (user && access) {
      return (
        <div className="overlay-wrapper">
          <Modal />
          <div className={pageClass}>
            <Helmet title={`Edit ${content.title}`} />
            <span
              className="overlay-close"
              onClick={this.context.router.goBack}
              title="Back"
            >
              &times;
            </span>
            <ContentEdit
              content={content}
            />
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
              <AuthHowlRound />
            </div>
          </div>
        </div>
      );
    }
  }
}

ContentEditPage.propTypes = {
  content: React.PropTypes.object,
  user: React.PropTypes.object,
  loading: React.PropTypes.bool,
  intl: intlShape.isRequired,
};

ContentEditPage.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ContentEditPage);
