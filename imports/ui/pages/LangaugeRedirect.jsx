import { TAPi18n } from 'meteor/tap:i18n';
import React from 'react';
import { Link } from 'react-router';
import Loading from '../components/Loading.jsx';

export default class LanguageRedirect extends React.Component {
  componentWillReceiveProps() {
    const locale = this.props.route.path;
    window.AppState.setLocale(locale);
    window.AppState.rerender();
    this.context.router.push('/');
  }

  render() {
    return (<Loading key="loading" />);
  }
}

LanguageRedirect.contextTypes = {
  router: React.PropTypes.object,
};
