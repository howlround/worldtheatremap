import React from 'react';
import { FormattedMessage } from 'react-intl';

const ConnectionNotification = () => (
  <div className="notifications">
    <div className="notification">
      <span className="icon-sync"></span>
      <div className="meta">
        <div className="title-notification">
          <FormattedMessage
            id='connection.title'
            description='Message to the user when the site is unable to connect to the database'
            defaultMessage='Trying to connect'
          />
        </div>
        <div className="description">
          <FormattedMessage
            id='connection.description'
            description='Message to the user when the site is unable to connect to the database'
            defaultMessage='There seems to be a connection issue'
          />
        </div>
      </div>
    </div>
  </div>
);

export default ConnectionNotification;
