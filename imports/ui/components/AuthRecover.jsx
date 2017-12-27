import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';
import { Link } from 'react-router';


class AuthRecover extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { locale } = this.props.intl;
    const email = this.refs.email.value;
    const errors = {};

    if (!email) {
      errors.email = (<FormattedMessage
        id="auth.errorsEmail"
        description="Field validation error when user does not enter an email on an auth form"
        defaultMessage="Email required"
      />);
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.forgotPassword({ email }, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      } else {
        // @TODO: If the path is /signin then redirect
        // otherwise let the person stay where they were
        this.context.router.push(`/${locale}/reset-password`);
      }
    });
  }

  render() {
    const { formatMessage, locale } = this.props.intl;
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    const messages = defineMessages({
      emailLabel: {
        id: 'auth.emailLabel',
        defaultMessage: 'Your Email',
        description: 'Placeholder text for email field',
      },
    });

    return (
      <div className="wrapper-auth">
        <h1 className="title-auth">
          <FormattedMessage
            id="auth.recoverTitle"
            defaultMessage="Recover Password"
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
          <div className={`input-symbol ${errorClass('email')}`}>
            <input
              type="email"
              name="email"
              ref="email"
              placeholder={formatMessage(messages.emailLabel)}
            />
            <span className="icon-email" title="Your Email"></span>
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

AuthRecover.propTypes = {
  intl: intlShape.isRequired,
};

AuthRecover.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthRecover);
