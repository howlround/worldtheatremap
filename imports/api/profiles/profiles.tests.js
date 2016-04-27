// /* eslint-env mocha */

// import { Factory } from 'meteor/factory';
// import { Profiles } from './profiles.js';
// import { insert, makePublic, makePrivate, updateName, remove } from './methods.js';
// import { Todos } from '../todos/todos.js';
// import { PublicationCollector } from 'meteor/publication-collector';
// import { chai, assert } from 'meteor/practicalmeteor:chai';
// import { Random } from 'meteor/random';
// import { Meteor } from 'meteor/meteor';
// import { _ } from 'meteor/underscore';
// import { DDP } from 'meteor/ddp-client';

// if (Meteor.isServer) {
//   require('./server/publications.js');

//   describe('profiles', () => {
//     describe('mutators', () => {
//       it('builds correctly from factory', () => {
//         const profile = Factory.create('profile');
//         assert.typeOf(profile, 'object');
//         assert.match(profile.name, /Profile /);
//       });
//     });

//     describe('publications', () => {
//       const userId = Random.id();

//       // TODO -- make a `profileWithTodos` factory
//       const createProfile = (props = {}) => {
//         const profile = Factory.create('profile', props);
//         _.times(3, () => {
//           Factory.create('todo', { profileId: profile._id });
//         });
//       };

//       before(() => {
//         Profiles.remove({});
//         _.times(3, () => createProfile());
//         _.times(2, () => createProfile({ userId }));
//         _.times(2, () => createProfile({ userId: Random.id() }));
//       });


//       describe('profiles.public', () => {
//         it('sends all public profiles', (done) => {
//           const collector = new PublicationCollector();
//           collector.collect('profiles.public', (collections) => {
//             chai.assert.equal(collections.Profiles.length, 3);
//             done();
//           });
//         });
//       });

//       describe('profiles.private', () => {
//         it('sends all owned profiles', (done) => {
//           const collector = new PublicationCollector({ userId });
//           collector.collect('profiles.private', (collections) => {
//             chai.assert.equal(collections.Profiles.length, 2);
//             done();
//           });
//         });
//       });
//     });

//     describe('methods', () => {
//       let profileId;
//       let todoId;
//       let otherProfileId;
//       let userId;

//       beforeEach(() => {
//         // Clear
//         Profiles.remove({});
//         Todos.remove({});

//         // Create a profile and a todo in that profile
//         profileId = Factory.create('profile')._id;
//         todoId = Factory.create('todo', { profileId })._id;

//         // Create throwaway profile, since the last public profile can't be made private
//         otherProfileId = Factory.create('profile')._id;

//         // Generate a 'user'
//         userId = Random.id();
//       });

//       describe('makePrivate / makePublic', () => {
//         function assertProfileAndTodoArePrivate() {
//           assert.equal(Profiles.findOne(profileId).userId, userId);
//           assert.isTrue(Profiles.findOne(profileId).isPrivate());
//           assert.isTrue(Todos.findOne(todoId).editableBy(userId));
//           assert.isFalse(Todos.findOne(todoId).editableBy(Random.id()));
//         }

//         it('makes a profile private and updates the todos', () => {
//           // Check initial state is public
//           assert.isFalse(Profiles.findOne(profileId).isPrivate());

//           // Set up method arguments and context
//           const methodInvocation = { userId };
//           const args = { profileId };

//           // Making the profile private adds userId to the todo
//           makePrivate._execute(methodInvocation, args);
//           assertProfileAndTodoArePrivate();

//           // Making the profile public removes it
//           makePublic._execute(methodInvocation, args);
//           assert.isUndefined(Todos.findOne(todoId).userId);
//           assert.isTrue(Todos.findOne(todoId).editableBy(userId));
//         });

//         it('only works if you are logged in', () => {
//           // Set up method arguments and context
//           const methodInvocation = { };
//           const args = { profileId };

//           assert.throws(() => {
//             makePrivate._execute(methodInvocation, args);
//           }, Meteor.Error, /profiles.makePrivate.notLoggedIn/);

//           assert.throws(() => {
//             makePublic._execute(methodInvocation, args);
//           }, Meteor.Error, /profiles.makePublic.notLoggedIn/);
//         });

//         it('only works if it\'s not the last public profile', () => {
//           // Remove other profile, now we're the last public profile
//           Profiles.remove(otherProfileId);

//           // Set up method arguments and context
//           const methodInvocation = { userId };
//           const args = { profileId };

//           assert.throws(() => {
//             makePrivate._execute(methodInvocation, args);
//           }, Meteor.Error, /profiles.makePrivate.lastPublicProfile/);
//         });

//         it('only makes the profile public if you made it private', () => {
//           // Set up method arguments and context
//           const methodInvocation = { userId };
//           const args = { profileId };

//           makePrivate._execute(methodInvocation, args);

//           const otherUserMethodInvocation = { userId: Random.id() };

//           // Shouldn't do anything
//           assert.throws(() => {
//             makePublic._execute(otherUserMethodInvocation, args);
//           }, Meteor.Error, /profiles.makePublic.accessDenied/);

//           // Make sure things are still private
//           assertProfileAndTodoArePrivate();
//         });
//       });

//       describe('updateName', () => {
//         it('changes the name, but not if you don\'t have permission', () => {
//           updateName._execute({}, {
//             profileId,
//             newName: 'new name',
//           });

//           assert.equal(Profiles.findOne(profileId).name, 'new name');

//           // Make the profile private
//           makePrivate._execute({ userId }, { profileId });

//           // Works if the owner changes the name
//           updateName._execute({ userId }, {
//             profileId,
//             newName: 'new name 2',
//           });

//           assert.equal(Profiles.findOne(profileId).name, 'new name 2');

//           // Throws if another user, or logged out user, tries to change the name
//           assert.throws(() => {
//             updateName._execute({ userId: Random.id() }, {
//               profileId,
//               newName: 'new name 3',
//             });
//           }, Meteor.Error, /profiles.updateName.accessDenied/);

//           assert.throws(() => {
//             updateName._execute({}, {
//               profileId,
//               newName: 'new name 3',
//             });
//           }, Meteor.Error, /profiles.updateName.accessDenied/);

//           // Confirm name didn't change
//           assert.equal(Profiles.findOne(profileId).name, 'new name 2');
//         });
//       });

//       describe('remove', () => {
//         it('does not delete the last public profile', () => {
//           const methodInvocation = { userId };

//           // Works fine
//           remove._execute(methodInvocation, { profileId: otherProfileId });

//           // Should throw because it is the last public profile
//           assert.throws(() => {
//             remove._execute(methodInvocation, { profileId });
//           }, Meteor.Error, /profiles.remove.lastPublicProfile/);
//         });

//         it('does not delete a private profile you don\'t own', () => {
//           // Make the profile private
//           makePrivate._execute({ userId }, { profileId });

//           // Throws if another user, or logged out user, tries to delete the profile
//           assert.throws(() => {
//             remove._execute({ userId: Random.id() }, { profileId });
//           }, Meteor.Error, /profiles.remove.accessDenied/);

//           assert.throws(() => {
//             remove._execute({}, { profileId });
//           }, Meteor.Error, /profiles.remove.accessDenied/);
//         });
//       });

//       describe('rate limiting', () => {
//         it('does not allow more than 5 operations rapidly', () => {
//           const connection = DDP.connect(Meteor.absoluteUrl());

//           _.times(5, () => {
//             connection.call(insert.name, {});
//           });

//           assert.throws(() => {
//             connection.call(insert.name, {});
//           }, Meteor.Error, /too-many-requests/);

//           connection.disconnect();
//         });
//       });
//     });
//   });
// }
