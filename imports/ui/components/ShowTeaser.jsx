import React from 'react';
import { Link } from 'react-router';

export default class ShowTeaser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show } = this.props;

    // @TODO: Abstract this to a function or component to reduce duplication in Show.jsx
    const authors = show.author.map((author, index, array) => {
      let seperator = ', ';
      if (index == array.length - 1) {
        seperator = '';
      }
      else if (index == array.length - 2) {
        seperator = ' and ';
      }
      return <span key={author.id}><Link to={`/profiles/${ author.id }`} className="show-author">{author.name}</Link>{seperator}</span>
    });

    return (
      <article className="show-teaser">
        <div className="show-main-info">
          <h3 className="show-name">
            <Link to={`/shows/${ show._id }`} key={show._id}>{show.name}</Link>
          </h3>
          <div className="show-authorship">
            by {authors}
          </div>
        </div>
      </article>
    );
  }
}

ShowTeaser.propTypes = {
  show: React.PropTypes.object,
};

ShowTeaser.contextTypes = {
  router: React.PropTypes.object,
};
