import React from 'react';
import classnames from 'classnames';

export default class HowlRoundPostFeatured extends React.Component {
  render() {
    const { post } = this.props;

    return (
      <div className="howlround-post-featured">
        <img src={post.image_url} />
        <div className="howlround-post-color-overlay" />
        <div className="howlround-post-content">
          <div className="howlround-post-date">
            {post.created}
          </div>
          <a
            href={post.url}
            className="howlround-post-title"
          >
            {post.title}
          </a>
          <div className="howlround-post-authors">by {post.authors}</div>
        </div>
      </div>
    );
  }
}

HowlRoundPostFeatured.propTypes = {
  post: React.PropTypes.object,
};
