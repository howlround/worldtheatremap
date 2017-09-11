import React from 'react';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import YAML from 'yamljs';
import { _ } from 'meteor/underscore';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

// Components
import ProfileMainFieldsRaw from '../components/ProfileMainFieldsRaw.jsx';
import ProfileContact from '../components/ProfileContact.jsx';

class ProfileAllFields extends React.Component {
  constructor(props) {
    super(props);

    this.renderFields = this.renderFields.bind(this);
    this.renderRequestRemoval = this.renderRequestRemoval.bind(this);
  }

  renderRequestRemoval(requestRemoval) {
    let output = '';
    if (requestRemoval === null) {
      output = <h3>No deletion requested</h3>;
    } else if (requestRemoval && typeof requestRemoval === 'string') {
      output = <h3>Deletion requested</h3>;
    }

    return output;
  }

  renderFields(profile) {
    return (
      <div className="profile-all-fields">
        {this.renderRequestRemoval(profile.requestRemoval)}
        <ProfileMainFieldsRaw profile={profile} />
        {profile.profileType ?
          <div>
            <h3>Profile type:</h3>
            {YAML.stringify(profile.profileType)}
          </div> : ''
        }
        {profile.about ?
          <div>
            <h2>
              <FormattedMessage
                id="profile.aboutSectionHeader"
                description="Section header for the profile about section"
                defaultMessage="About"
              />
            </h2>
            <div
              className="markdown-formatted"
              dangerouslySetInnerHTML={{__html: sanitizeHtml(marked(profile.about))}}
            />
          </div> : ''
        }
        {profile.lat ?
          <div>
            <h3>Latitude:</h3>
            {profile.lat}
          </div> : ''
        }
        {profile.lon ?
          <div>
            <h3>Longitude:</h3>
            {profile.lon}
          </div> : ''
        }
        <ProfileContact profile={profile} />
      </div>
    );
  }

  render() {
    const { profile } = this.props;

    const outputChildren = [];
    outputChildren.push(this.renderFields(profile));

    // @TODO: Loop over locales
    _.each(profile.i18n, (locale, key) => {
      outputChildren.push(<h2><em>{key.toUpperCase()}</em> language fields:</h2>);
      outputChildren.push(this.renderFields(locale));
    });

    return React.createElement('div', {}, ...outputChildren);
  }
}

ProfileAllFields.propTypes = {
  profile: React.PropTypes.object,
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileAllFields);
