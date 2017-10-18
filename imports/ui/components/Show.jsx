import React from 'react';
import { Link } from 'react-router';
import { insert } from '../../api/shows/methods.js';
import classNames from 'classnames';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

// Components
import Authors from '../components/Authors.jsx';
import EventsMiniGlobe from '../components/EventsMiniGlobe.jsx';
import EventTeaser from '../components/EventTeaser.jsx';
import Languages from '../components/Languages.jsx';
import Interests from '../components/Interests.jsx';
import Countries from '../components/Countries.jsx';

marked.setOptions({
  tables: false,
});

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, user, eventsByShow } = this.props;
    const { formatMessage, locale } = this.props.intl;

    const editLink = user ?
      <Link
        to={`/${locale}/shows/${ show._id }/edit`}
        key={show._id}
        title={show.name}
        className="edit-link"
        activeClassName="active"
      >
        Edit
      </Link>
    : '';

    let events;
    if (eventsByShow && eventsByShow.length) {
      events = eventsByShow.map(event => (
        <li key={event._id}>
          <EventTeaser
            event={event}
            displayOrg={true}
          />
        </li>
      ));
    }

    const interests = (show.interests) ?
      <Interests interests={show.interests} />
      : false;

    const countries = (show.country) ?
      <Countries countries={show.country} />
      : false;

    const languages = (show.languages) ?
      <Languages languages={show.languages} />
      : false;

    let requestRemovalText = '';
    if (show.requestRemoval === null) {
      requestRemovalText = <h3 className="email-only">No deletion requested</h3>;
    } else if (show.requestRemoval && typeof show.requestRemoval === 'string') {
      requestRemovalText = <h3 className="email-only">Deletion requested</h3>;
    }

    const articleClasses = classNames('show', 'full', {
      'with-location': eventsByShow && eventsByShow.length,
    });

    return (
      <article className={articleClasses}>
        {requestRemovalText}
        <section>
          {(eventsByShow && eventsByShow.length) ?
            <EventsMiniGlobe events={eventsByShow} /> : ''
          }
          <div className="show-main-info">
            <h1 className="show-name page-title">
              {show.name}
            </h1>
            {show.author ?
              <div className="show-authorship">
                <FormattedMessage
                  id="show.authors"
                  description='By line for authors of a show'
                  defaultMessage={`by {authors}`}
                  values={{ authors: <Authors authors={show.author} /> }}
                />
              </div> : ''
            }
            <div className="show-metadata metadata">
              { !_.isEmpty(show.interests) ?
                <div className="show-interests" title="Interests">{ interests }</div> : '' }
            </div>
            <div className="show-metadata metadata">
              <div>
                { !_.isEmpty(show.country) ?
                  <div className="show-interests" title="Country of origin">{ countries }</div> : '' }
              </div>
              <div>
                { !_.isEmpty(show.languages) ?
                  <div className="show-interests" title="Languages">{ languages }</div> : '' }
              </div>
            </div>
            <div className="edit-links">
              {editLink}
            </div>
          </div>
        </section>
        {!_.isEmpty(show.about) ?
          <section className="show-about">
            <h2>
              <FormattedMessage
                id="show.about"
                description="About section on show page"
                defaultMessage="About"
              />
            </h2>
            <div
              className="markdown-formatted"
              dangerouslySetInnerHTML={{__html: sanitizeHtml(marked(show.about))}}
            />
            <div className="edit-links">
              {editLink}
            </div>
            { !_.isEmpty(show.source) && show.source !== locale ?
              <div className="machine-translation-warning">
                <FormattedMessage
                  id="translation.possibleMachineTranslationWarning"
                  description="Text informing user that the text was possibly machine translated"
                  defaultMessage="This text was written in another language and was originally machine translated. If you would like to make improvements to the translation please edit this page."
                />
              </div> : ''
            }
          </section> : ''
        }
        {(eventsByShow && eventsByShow.length) ?
          <section className="show-events">
            <h2>
              <FormattedMessage
                id="show.history"
                description="Show history section on show page"
                defaultMessage="Show History"
              />
            </h2>
            <ul>
              {events}
            </ul>
          </section>
          : ''
        }
      </article>
    );
  }
}

Show.propTypes = {
  show: React.PropTypes.object,
  eventsByShow: React.PropTypes.array,
  user: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
  intl: intlShape.isRequired,
};

Show.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(Show);
