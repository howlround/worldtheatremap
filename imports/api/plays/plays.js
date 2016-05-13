import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import React from 'react';
import t from 'tcomb-form';
import { Profiles } from '../profiles/profiles.js';

class PlaysCollection extends Mongo.Collection {
  insert(play, callback) {
    const ourPlay = play;
    if (!ourPlay.name) {
      let nextLetter = 'A';
      ourPlay.name = `Play ${nextLetter}`;

      while (!!this.findOne({ name: ourPlay.name })) {
        // not going to be too smart here, can go past Z
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        ourPlay.name = `Play ${nextLetter}`;
      }
    }

    return super.insert(ourPlay, callback);
  }
  remove(selector, callback) {
    Plays.remove({ playId: selector });
    return super.remove(selector, callback);
  }
}

export const Plays = new PlaysCollection('Plays');

// Deny all client-side updates since we will be using methods to manage this collection
Plays.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const playAuthorSchema = t.struct({
  name: t.String,
  id: t.String,
});

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in playAuthor?
const atLeastOne = arr => arr.length > 0
export const playSchema = t.struct({
  name: t.String,
  author: t.refinement(t.list(playAuthorSchema), atLeastOne),
  about: t.maybe(t.String),
});

const authorLayout = (author) => {
  return (
    <div className="author-fields-group">
      {author.inputs.name}
      {author.inputs.id}
      <ul className="play-author-edit-results"></ul>
    </div>
  );
};

export const defaultFormOptions = () => {
  return {
    fields: {
      name: {
        attrs: {
          className: 'play-name-edit',
        },
        error: 'Name is required',
      },
      author: {
        auto: 'none',
        error: 'At least one author is required',
        label: 'Primary authorship',
        attrs: {
          className: 'play-author-edit',
        },
        item: {
          template: authorLayout,
          fields: {
            name: {
              error: 'Primary authorship is required',
              attrs: {
                className: 'play-author-name-edit',
                autocomplete: 'off'
              }
            },
            id: {
              attrs: {
                className: 'play-author-id-edit'
              }
            }
          }
        }
      },
      about: {
        type: 'textarea',
        attrs: {
          rows: '10',
          className: 'play-about-edit',
        },
      },
    },
  };
}

// Plays.schema = new SimpleSchema({
//   name: { type: String },
//   about: { type: String, optional: true },
//   userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
// });

// Plays.attachSchema(Plays.schema);

// This represents the keys from Plays objects that should be published
// to the client. If we add secret properties to Play objects, don't play
// them here to keep them private to the server.
Plays.publicFields = {
  name: 1,
  author: 1,
  about: 1,
  userId: 1,
};

Factory.define('play', Plays, {});

// Plays.helpers({
//   // A play is considered to be private if it has a userId set
//   isPrivate() {
//     return !!this.userId;
//   },
//   isLastPublicPlay() {
//     const publicPlayCount = Plays.find({ userId: { $exists: false } }).count();
//     return !this.isPrivate() && publicPlayCount === 1;
//   },
//   editableBy(userId) {
//     if (!this.userId) {
//       return true;
//     }

//     return this.userId === userId;
//   },
//   todos() {
//     return Todos.find({ playId: this._id }, { sort: { createdAt: -1 } });
//   },
// });
