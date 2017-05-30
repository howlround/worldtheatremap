import React from 'react';
import t from 'tcomb-form';
import { _ } from 'meteor/underscore';
import { Accounts } from 'meteor/accounts-base';
import { displayError } from '../helpers/errors.js';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { get } from 'lodash';
import { Link } from 'react-router';

// Components
import Loading from '../components/Loading.jsx';

// API
import { userSchema, defaultFormOptions } from '../../api/users/users.js';
import { allCountriesFactory } from '../../api/countries/countries.js';

const Form = t.form.Form;

class AuthJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      loading: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState(value);
  }

  onSubmit(event) {
    event.preventDefault();
    const { locale } = this.props.intl;
    const user = this.refs.form.getValue();
    const password = get(user, 'password');
    const confirm = get(user, 'confirm');
    const errors = {};

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

    if (user) {
      const result = t.validate(user, userSchema);

      if (result.isValid()) {
        // Set loading to true
        this.setState({
          loading: true,
        });

        Accounts.createUser(user, err => {
          if (err) {
            // Set loading to false to deal with errors
            this.setState({
              errors: { none: err.reason },
              loading: false,
            });
          }
          else {
            this.context.router.push(`/${locale}`);
          }
        });
      }
    }
  }

  render() {
    const { formatMessage, locale } = this.props.intl;
    const { errors, profile, loading } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    let formOptions = defaultFormOptions();
    if (!_.contains(get(profile, 'referrer'), 'Other')) {
      formOptions.fields.profile.fields.referrerOther.disabled = true;
    }
    formOptions.fields.profile.fields.country.factory = allCountriesFactory(locale, true);

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

        {loading ?
          <Loading key="loading" />
        : ''}

        {!loading ?
          <div>
            <form className="account-join-form" onSubmit={this.onSubmit.bind(this)}>
              <div className="list-errors">
                {errorMessages.map(msg => (
                  <div className="list-item" key={msg}>{msg}</div>
                ))}
              </div>
              <Form
                ref="form"
                type={userSchema}
                options={formOptions}
                onChange={this.onChange}
                value={this.state}
              />

              <button
                type="submit"
                className="account-join-save"
              >
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
        : ''}
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
