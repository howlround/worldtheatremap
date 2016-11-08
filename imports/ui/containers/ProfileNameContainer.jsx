// import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import ProfileName from '../components/ProfileName.jsx';

// Collections
import { Profiles } from '../../api/profiles/profiles.js';

const ProfileNameContainer = createContainer((props) => {
  const { profileId } = props;
  // const profilesSub = TAPi18n.subscribe('profiles.singleById', profileId);

  // const loading = !(profilesSub.ready());
  const loading = false;

  const profileName = Profiles.find(
    {
      _id: profileId,
    }, {
      fields: { name: 1, i18n: 1 },
      limit: 1,
    }).fetch()[0];

  const profileExists = !loading && !!profileName;

  return {
    loading,
    profileName,
    profileExists,
  };
}, ProfileName);

export default ProfileNameContainer;
