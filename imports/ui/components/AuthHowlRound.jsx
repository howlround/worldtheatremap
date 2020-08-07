import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';


class AuthHowlRound extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
  }

  login(e) {
    e.stopPropagation();
    Meteor.loginWithOidc();
  }

  render() {
    const { formatMessage, locale } = this.props.intl;
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    return (
      <div className="wrapper-auth">
        <h1 className="title-auth">
          Login and registration has been disabled
          {/*<FormattedMessage
            id="auth.signInTitle"
            description="Title for the Sign In screen"
            defaultMessage="Sign In"
          />*/}
        </h1>
        <p className="subtitle-auth" >
          <FormattedMessage
            id="auth.signInSubTitle"
            description="Subtitle for the Sign In screen"
            defaultMessage="Signing in allows you to add and edit profiles and events"
          />
        </p>
        {/*<button
          className="footer-add-button button"
          onClick={this.login.bind(this)}
        >
          Sign in
        </button>*/}
      </div>
    );
  }
}

AuthHowlRound.propTypes = {
  intl: intlShape.isRequired,
};

AuthHowlRound.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthHowlRound);
