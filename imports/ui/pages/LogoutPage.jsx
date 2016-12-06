import React from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { Meteor } from 'meteor/meteor';

class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { locale } = this.props.intl;

    Meteor.logout();

    this.context.router.push({
      pathname: `/${locale}`,
    });
  }

  render() {
    return null;
  }
}

LogoutPage.contextTypes = {
  router: React.PropTypes.object,
};

LogoutPage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(LogoutPage);
