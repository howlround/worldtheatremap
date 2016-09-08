// Meteor
import { Mongo } from 'meteor/mongo';

// Forms
import React from 'react';
import t from 'tcomb-form';

// API
import { factory as interestsFactory } from '../../api/interests/interests.js';

class ShowsCollection extends Mongo.Collection {
  insert(show, callback) {
    const ourShow = show;

    return super.insert(ourShow, callback);
  }
  remove(selector, callback) {
    return super.remove(selector, callback);
  }
}

export const Shows = new ShowsCollection('Shows');

// Deny all client-side updates since we will be using methods to manage this collection
Shows.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

export const showAuthorSchema = t.struct({
  name: t.String,
  id: t.String,
});

// @TODO: Refactor to look like this:
// https://github.com/gcanti/tcomb-form/issues/311
// Maybe that should be in showAuthor?
const atLeastOne = arr => arr.length > 0;
export const showSchema = t.struct({
  name: t.String,
  author: t.refinement(t.list(showAuthorSchema), atLeastOne),
  about: t.maybe(t.String),
  interests: t.maybe(t.list(t.String)),
});

export const showFiltersSchema = t.struct({
  name: t.maybe(t.String),
  interests: t.maybe(t.list(t.String)),
});

const authorLayout = (author) => (
  <div className="author-fields-group autocomplete-group">
    {author.inputs.name}
    {author.inputs.id}
    <ul className="autocomplete-results"></ul>
  </div>
);

export const defaultFormOptions = () => ({
  fields: {
    name: {
      attrs: {
        className: 'show-name-edit',
      },
      error: 'Name is required',
    },
    author: {
      auto: 'none',
      error: 'At least one author is required',
      label: 'Primary authorship',
      attrs: {
        className: 'show-author-edit',
      },
      item: {
        template: authorLayout,
        fields: {
          name: {
            error: 'Primary authorship is required',
            attrs: {
              className: 'show-author-name-edit',
              autoComplete: 'off',
            },
          },
          id: {
            attrs: {
              className: 'show-author-id-edit',
            },
          },
        },
      },
    },
    about: {
      type: 'textarea',
      attrs: {
        rows: '10',
        className: 'show-about-edit',
      },
    },
    interests: {
      factory: interestsFactory(),
    },
  },
});

export const filtersFormOptions = () => ({
  fields: {
    name: {
      auto: 'none',
      attrs: {
        className: 'show-search-text',
        autoComplete: 'off',
        placeholder: 'Search for shows by name',
      },
    },
    interests: {
      factory: interestsFactory(),
    },
  },
});

// This represents the keys from Shows objects that should be published
// to the client. If we add secret properties to Show objects, don't show
// them here to keep them private to the server.
Shows.publicFields = {
  name: 1,
  author: 1,
  about: 1,
  interests: 1,
};
