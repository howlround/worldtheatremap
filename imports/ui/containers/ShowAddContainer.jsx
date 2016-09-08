import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ShowAddPage from '../pages/ShowAddPage.jsx';

export default createContainer(() => {
  const profilesSubscribe = Meteor.subscribe('profiles.public');
  const loading = !profilesSubscribe.ready();
  const add = true;
  return {
    loading,
    add,
  };
}, ShowAddPage);
