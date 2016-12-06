import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

class AuthJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const { locale } = this.props.intl;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirm = this.refs.confirm.value;
    const errors = {};

    if (!email) {
      errors.email = <FormattedMessage
        id='auth.errorsEmail'
        description='Field validation error when user does not enter an email on an auth form'
        defaultMessage='Email required'
      />
    }
    if (!password) {
      errors.password = <FormattedMessage
        id='auth.errorsPassword'
        description='Field validation error when user does not enter a password on an auth form'
        defaultMessage='Password required'
      />
    }
    if (confirm !== password) {
      errors.confirm = <FormattedMessage
        id='auth.errorsConfirm'
        description='Field validation error when user does not enter a confirmation password on the join form'
        defaultMessage='Please confirm your password'
      />
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      email,
      password,
    }, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
      else {
        this.context.router.push(`/${locale}`);
      }
    });
  }

  render() {
    const { formatMessage, locale } = this.props.intl;
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    return (
      <div className="wrapper-auth">
        <h1 className="title-auth">
          <FormattedMessage
            id="auth.joinTitle"
            description="Title for the Join screen"
            defaultMessage="Join"
          />
        </h1>
        <p className="subtitle-auth" >
          <FormattedMessage
            id="auth.joinSubTitle"
            description="Subtitle for the Join screen"
            defaultMessage="Joining allows you to add and edit profiles and events"
          />
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <div className={`input-symbol ${errorClass('email')}`}>
            <input
              type="email"
              name="email"
              ref="email"
              placeholder="Your Email"
              placeholder={
                formatMessage({
                  'id': 'auth.emailLabel',
                  'defaultMessage': 'Your Email',
                  'description': 'Placeholder text for email field'
                })
              }
            />
            <span className="icon-email" title="Your Email"></span>
          </div>
          <div className={`input-symbol ${errorClass('password')}`}>
            <input
              type="password"
              name="password"
              ref="password"
              placeholder={
                formatMessage({
                  'id': 'auth.passwordLabel',
                  'defaultMessage': 'Password',
                  'description': 'Placeholder text for password field'
                })
              }
            />
            <span className="icon-lock" title="Password"></span>
          </div>
          <div className={`input-symbol ${errorClass('confirm')}`}>
            <input
              type="password"
              name="confirm"
              ref="confirm"
              placeholder={
                formatMessage({
                  'id': 'auth.passwordConfirmLabel',
                  'defaultMessage': 'Confirm Password',
                  'description': 'Placeholder text for confirm password field'
                })
              }
            />
            <span className="icon-lock" title="Confirm Password"></span>
          </div>
          <button type="submit">
            <FormattedMessage
              id='auth.joinButton'
              description='Button on the Join Now form'
              defaultMessage="Join Now"
            />
          </button>
        </form>
        <Link to={`/${locale}/signin`} className="link-auth-alt">
          <FormattedMessage
            id="auth.linkToSignIn"
            description="Link to sign in instead of join"
            defaultMessage="Have an account? Sign in"
          />
        </Link>
      </div>
    );
  }
}

AuthJoin.propTypes = {
  intl: intlShape.isRequired,
};

AuthJoin.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthJoin);
