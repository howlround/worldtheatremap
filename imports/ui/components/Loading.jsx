import React from 'react';
import classnames from 'classnames';
import { defineMessages, intlShape, injectIntl } from 'react-intl';


class Loading extends React.Component {
  render() {
    const { textOverride } = this.props;
    const { formatMessage } = this.props.intl;
    const className = {
      'interior-loading-block': true,
      // Not using this option for now, but the styling is still there.
      // 'interior-loading-block': interiorBlock,
    };

    const messages = defineMessages({
      defaultText: {
        id: 'loading.defaultText',
        defaultMessage: 'Loading...',
      },
    });

    const text = !!textOverride ? textOverride : formatMessage(messages.defaultText);

    return (
      <span className={classnames(className)}>
        <img src="/loading_globe.png" className="loading-app" />
        <h2 className="loading-app">{text}</h2>
      </span>
    );
  }
}

Loading.propTypes = {
  interiorBlock: React.PropTypes.bool,
  textOverride: React.PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(Loading);
