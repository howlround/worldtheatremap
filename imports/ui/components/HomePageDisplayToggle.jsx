import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

export default class HomePageDisplayToggle extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    const { updateDisplay, active } = this.props;

    event.preventDefault();

    // Disable curent event tab and hard code
    // const nextDisplay = (active === 'events') ? 'people' : 'events';
    const nextDisplay = 'people';

    updateDisplay(nextDisplay);
  }

  render() {
    return (
      <div className="homepage-option-toggle">
        <a
          href="#"
          className={classnames(
            'option-toggle-item',
            'homepage-display-events',
            'icon-arrow-up'
          )}
          onClick={this.toggle}
        />
        <a
          href="#"
          className={classnames(
            'option-toggle-item',
            'homepage-display-people',
            'icon-arrow-up'
          )}
          onClick={this.toggle}
        />
      </div>
    );
  }
}

HomePageDisplayToggle.propTypes = {
  updateDisplay: React.PropTypes.func,
  active: React.PropTypes.string,
};

HomePageDisplayToggle.contextTypes = {
  router: React.PropTypes.object,
};
