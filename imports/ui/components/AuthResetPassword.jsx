import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';

class AuthResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { locale } = this.props.intl;
    const { token } = this.props;
    const newPassword = this.refs.password.value;
    const errors = {};

    if (!newPassword) {
      errors.password = (<FormattedMessage
        id="auth.errorsPassword"
        description="Field validation error when user does not enter a password on an auth form"
        defaultMessage="Password required"
      />);
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.resetPassword(token, newPassword, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      } else {
        // After recovering password redirect to home page.
        this.context.router.push(`/${locale}`);
      }
    });
  }

  render() {
    const { formatMessage, locale } = this.props.intl;
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const messages = defineMessages({
      passwordLabel: {
        id: 'auth.passwordLabel',
        defaultMessage: 'Password',
        description: 'Placeholder text for password field',
      },
    });

    return (
      <div className="wrapper-auth">
        <h1 className="title-auth">
          <FormattedMessage
            id="auth.resetTitle"
            defaultMessage="Change Password"
          />
        </h1>
        <p className="subtitle-auth" >
          <FormattedMessage
            id="auth.recoverSubTitle"
            defaultMessage="Enter your email to recover your password"
          />
        </p>
        <form onSubmit={this.onSubmit}>
          <ul className="list-errors">
            {errorMessages.map(msg => (
              <li className="list-item" key={msg}>{msg}</li>
            ))}
          </ul>
          <div className={`input-symbol ${errorClass('password')}`}>
            <input
              type="password"
              name="password"
              ref="password"
              placeholder={formatMessage(messages.passwordLabel)}
            />
            <span className="icon-lock" title="Password"></span>
          </div>
          <button type="submit">
            <FormattedMessage
              id="auth.recoverButton"
              defaultMessage="Submit"
            />
          </button>
        </form>
        <div className="link-auth-alt">
          <Link to={`/${locale}/join`}>
            <FormattedMessage
              id="auth.linkToJoin"
              description="Link to join instead of sign in"
              defaultMessage="Need an account? Join Now"
            />
          </Link>
          <Link to={`/${locale}/signin`}>
            <FormattedMessage
              id="auth.linkToSignIn"
              description="Link to sign in instead of join"
              defaultMessage="Have an account? Sign in"
            />
          </Link>
        </div>
      </div>
    );
  }
}

AuthResetPassword.propTypes = {
  intl: intlShape.isRequired,
  token: React.PropTypes.string,
};

AuthResetPassword.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthResetPassword);
