import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import ShowAddPage from '../pages/ShowAddPage.jsx';

export default createContainer(() => {
  const profilesSubscribe = TAPi18n.subscribe('profiles.public');
  const loading = !profilesSubscribe.ready();
  const add = true;
  return {
    loading,
    add,
  };
}, ShowAddPage);
