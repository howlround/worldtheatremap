import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class AuthJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errors: {} };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirm = this.refs.confirm.value;
    const errors = {};

    if (!email) {
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
    }
    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
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
        this.context.router.push('/');
      }
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    return (
      <div className="wrapper-auth">
        <h1 className="title-auth">Join.</h1>
        <p className="subtitle-auth" >Joining allows you to make private lists</p>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <div className={`input-symbol ${errorClass('email')}`}>
            <input type="email" name="email" ref="email" placeholder="Your Email"/>
            <span className="icon-email" title="Your Email"></span>
          </div>
          <div className={`input-symbol ${errorClass('password')}`}>
            <input type="password" name="password" ref="password" placeholder="Password"/>
            <span className="icon-lock" title="Password"></span>
          </div>
          <div className={`input-symbol ${errorClass('confirm')}`}>
            <input type="password" name="confirm" ref="confirm" placeholder="Confirm Password"/>
            <span className="icon-lock" title="Confirm Password"></span>
          </div>
          <button type="submit">Join Now</button>
        </form>
        <Link to="/signin" className="link-auth-alt">Have an account? Sign in</Link>
      </div>
    );
  }
}

AuthJoin.contextTypes = {
  router: React.PropTypes.object,
};
