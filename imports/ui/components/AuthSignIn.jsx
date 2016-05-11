import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';

export default class AuthSignIn extends React.Component {
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
      errors.email = 'Email required';
    }
    if (!password) {
      errors.password = 'Password required';
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

      // @TODO: If the path is /signin then redirect
      // otherwise let the person stay where they were
      this.context.router.push('/');
    });
  }

  render() {
    const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';

    return (
      <div className="wrapper-auth">
        <h1 className="title-auth">Sign In.</h1>
        <p className="subtitle-auth" >Signing in allows you to add and edit profiles and events</p>
        <form onSubmit={this.onSubmit}>
          <ul className="list-errors">
            {errorMessages.map(msg => (
              <li className="list-item" key={msg}>{msg}</li>
            ))}
          </ul>
          <div className={`input-symbol ${errorClass('email')}`}>
            <input type="email" name="email" ref="email" placeholder="Your Email"/>
            <span className="icon-email" title="Your Email"></span>
          </div>
          <div className={`input-symbol ${errorClass('password')}`}>
            <input type="password" name="password" ref="password" placeholder="Password"/>
            <span className="icon-lock" title="Password"></span>
          </div>
          <button type="submit">Sign in</button>
        </form>
        <Link to="/join" className="link-auth-alt">Need an account? Join Now.</Link>
      </div>
    );
  }
}

AuthSignIn.contextTypes = {
  router: React.PropTypes.object,
};
