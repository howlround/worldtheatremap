import { Meteor } from 'meteor/meteor';
import React from 'react';
import classnames from 'classnames';
import { _ } from 'meteor/underscore';
import { FormattedMessage } from 'react-intl';

export default class HowlRoundPosts extends React.Component {
  constructor(props) {
    super(props);

    const { searchText, _id } = this.props;

    Meteor.call('profiles.getHowlRoundPosts', { searchText, _id });
  }

  render() {
    const { existingPosts, searchText, _id, url } = this.props;

    const existingPostsMarkup = !_.isEmpty(existingPosts) ? existingPosts.map((post, index) => (
      <div
        key={`howlround-post-${index}`}
        className="howlround-post"
        dangerouslySetInnerHTML={{__html: post}}
      />
    )) : '';

    if (!_.isEmpty(existingPosts)) {
      return (
        <section className="howlround-posts">
          <h2>HowlRound Posts</h2>
          {existingPostsMarkup}
          <a
            href={url}
            target="_blank"
            className="howlround-posts-view-all"
          >
            <FormattedMessage
              id="profile.howlroundPostsMoreLink"
              description="See all related HowlRound posts"
              defaultMessage="See All HowlRound Posts"
            />
          </a>
        </section>
      );
    } else {
      return null;
    }
  }
}

HowlRoundPosts.propTypes = {
  searchText: React.PropTypes.string,
  _id: React.PropTypes.string,
  existingPosts: React.PropTypes.array,
  url: React.PropTypes.string,
};
