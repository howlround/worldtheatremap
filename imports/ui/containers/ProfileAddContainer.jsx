import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ProfileAddPage from '../pages/ProfileAddPage.jsx';

export default createContainer(() => {
  const add = true;
  return {
    add,
    // user,
  };
}, ProfileAddPage);
