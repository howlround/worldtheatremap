import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PlayAddPage from '../pages/PlayAddPage.jsx';

export default createContainer(() => {
  const add = true;
  return {
    add,
  };
}, PlayAddPage);
