import React from 'react';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';

// Components
import Message from '../components/Message.jsx';

class AccessDeniedMessage extends React.Component {
  render() {
    const { formatMessage, locale } = this.props.intl;

    const messages = defineMessages({
      accessDeniedTitle: {
        'id': 'auth.accessDeniedTitle',
        'defaultMessage': 'Access denied',
        'description': 'Access denied message title',
      },
      accessDeniedSubtitle: {
        'id': 'auth.accessDeniedSubtitle',
        'defaultMessage': 'Sign in or register to participate in the World Theatre Map',
        'description': 'Access denied message subtitle',
      }
    });

    return (
      <Message
        title={formatMessage(messages.accessDeniedTitle)}
        subtitle={formatMessage(messages.accessDeniedSubtitle)}
      />
    );
  }
}

AccessDeniedMessage.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AccessDeniedMessage);
