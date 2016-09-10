import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { Profiles } from '../../api/profiles/profiles.js';
import { createContainer } from 'meteor/react-meteor-data';
import ProfileTranslatePage from '../pages/ProfileTranslatePage.jsx';

const ProfileTranslateContainer = createContainer(({ params: { id, lang } }) => {
  const singleProfileSubscription = TAPi18n.subscribe('profiles.singleById', id);
  const profile = Profiles.findOne(id);
  const profileExists = !loading && !!profile;
  const loading = !(singleProfileSubscription.ready());
  return {
    loading,
    profile,
    editing: profileExists ? profile._id : null,
    // shows: [],
    lang,
  };
}, ProfileTranslatePage);

export default ProfileTranslateContainer;
