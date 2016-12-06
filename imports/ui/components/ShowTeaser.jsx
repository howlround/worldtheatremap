import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import Authors from '../components/Authors.jsx';
import ShowNameContainer from '../containers/ShowNameContainer.jsx';

class ShowTeaser extends React.Component {
  render() {
    const { show } = this.props;
    const { locale } = this.props.intl;

    return (
      <article className="show-teaser">
        <div className="show-main-info">
          <h3 className="show-name">
            <Link to={`/${locale}/shows/${ show._id }`} key={show._id}>
              <ShowNameContainer showId={show._id} />
            </Link>
          </h3>
          <div className="show-authorship">
            <FormattedMessage
              id="show.authors"
              description='By line for authors of a show'
              defaultMessage={`by {authors}`}
              values={{ authors: <Authors authors={show.author} /> }}
            />
          </div>
        </div>
      </article>
    );
  }
}

ShowTeaser.propTypes = {
  show: React.PropTypes.object,
  intl: intlShape.isRequired,
};

ShowTeaser.contextTypes = {
  router: React.PropTypes.object,
};

export default injectIntl(ShowTeaser);
