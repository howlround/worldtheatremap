import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Profile } from '../ui/Profile.jsx';
import { About } from '../ui/About.jsx';
import { Profiles } from '../api/profiles.js';


// export default createContainer(({ params: { id } }) => {
//   const todosHandle = Meteor.subscribe('todos.inList', id);
//   const loading = !todosHandle.ready();
//   const list = Lists.findOne(id);
//   const listExists = !loading && !!list;
//   return {
//     loading,
//     list,
//     listExists,
//     todos: listExists ? list.todos().fetch() : [],
//   };
// }, ListPage);


export default createContainer(({ params: { id } }) => {
  const profiles = Meteor.subscribe('profiles');
  const profile = Profiles.findOne(id);

  return {
    profile
  }
}, About);
