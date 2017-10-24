import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';

export default class HomePageDisplayToggle extends React.Component {
  constructor(props) {
    super(props);

    this.activateEvents = this.activateEvents.bind(this);
    this.activatePeople = this.activatePeople.bind(this);
  }

  activateEvents(event) {
    const { toggle } = this.props;

    event.preventDefault();

    toggle('events');
  }

  activatePeople(event) {
    const { toggle } = this.props;

    event.preventDefault();

    toggle('people');
  }

  render() {
    const { active } = this.props;

    return (
      <div className="option-toggle">
        <a
          href="#"
          className={classnames('option-toggle-item','homepage-display-people', { active: (active === 'people') })}
          onClick={this.activatePeople}
        >
          <FormattedMessage
            id="homepageDisplayToggle.people"
            description="Home page display toggle: People"
            defaultMessage="People"
          />
        </a>
        <a
          href="#"
          className={classnames('option-toggle-item', 'homepage-display-events', { active: (active === 'events') })}
          onClick={this.activateEvents}
        >
          <FormattedMessage
            id="homepageDisplayToggle.events"
            description="Home page display toggle: Events"
            defaultMessage="Events"
          />
        </a>
      </div>
    );
  }
}

HomePageDisplayToggle.propTypes = {
  toggle: React.PropTypes.func,
  active: React.PropTypes.string,
};

HomePageDisplayToggle.contextTypes = {
  router: React.PropTypes.object,
};
