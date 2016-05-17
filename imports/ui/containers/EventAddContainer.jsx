import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import EventAddPage from '../pages/EventAddPage.jsx';

export default createContainer(() => {
  const add = true;
  return {
    add,
  };
}, EventAddPage);
