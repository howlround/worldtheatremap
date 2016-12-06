import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';


class AuthSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
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

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }

    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
      }
      else {
        // @TODO: If the path is /signin then redirect
        // otherwise let the person stay where they were
        this.context.router.push('/');
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
            id='auth.signInTitle'
            description='Title for the Sign In screen'
            defaultMessage="Sign In"
          />
        </h1>
        <p className="subtitle-auth" >
          <FormattedMessage
            id='auth.signInSubTitle'
            description='Subtitle for the Sign In screen'
            defaultMessage="Signing in allows you to add and edit profiles and events"
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
          <button type="submit">
            <FormattedMessage
              id='auth.signInButton'
              description='Button on the Sign In form'
              defaultMessage="Sign in"
            />
          </button>
        </form>
        <Link to={`/${locale}/join`} className="link-auth-alt">Need an account? Join Now.</Link>
      </div>
    );
  }
}

AuthSignIn.propTypes = {
    intl: intlShape.isRequired,
};

AuthSignIn.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(AuthSignIn);
