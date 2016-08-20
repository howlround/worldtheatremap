import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/factory';
import React from 'react';
import t from 'tcomb-form';
import { Profiles } from '../profiles/profiles.js';
// import Autosuggest from 'react-autosuggest'

class ShowsCollection extends Mongo.Collection {
  insert(show, callback) {
    const ourShow = show;
    if (!ourShow.name) {
      let nextLetter = 'A';
      ourShow.name = `Show ${nextLetter}`;

      while (!!this.findOne({ name: ourShow.name })) {
        // not going to be too smart here, can go past Z
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        ourShow.name = `Show ${nextLetter}`;
      }
    }

    return super.insert(ourShow, callback);
  }
  remove(selector, callback) {
    Shows.remove({ showId: selector });
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
const atLeastOne = arr => arr.length > 0
export const showSchema = t.struct({
  name: t.String,
  author: t.refinement(t.list(showAuthorSchema), atLeastOne),
  about: t.maybe(t.String),
});

// function getSuggestions(value) {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   const regex = new RegExp('.*' + inputValue + '.*', 'i');
//   const results = Profiles.find({name: { $regex: regex }}, {limit: 5}).fetch();

//   return results;
// }

// function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
//   return (typeof suggestion != 'undefined') ? suggestion.name : '';                 // what should be the value of the input
// }

// function renderSuggestion(suggestion) {
//   return (
//     <span>{suggestion.name}</span>
//   )
// }

// function onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }) {
// }

// // define the template only once
// function AutosuggestTemplate(options) {
//   function renderInput(locals) {
//     const value = locals.value || '' // react-autosuggest doesn't like null or undefined as value
//     const inputProps = {
//       ...locals.attrs,
//       value: value,
//       onChange: (evt, { newValue }) => {
//         locals.onChange(newValue)
//       }
//     }
//     const suggestions = options.getSuggestions(value)
//     return (
//       <Autosuggest
//         suggestions={suggestions}
//         getSuggestionValue={options.getSuggestionValue}
//         renderSuggestion={options.renderSuggestion}
//         inputProps={inputProps}
//         onSuggestionSelected={options.onSuggestionSelected}
//       />
//     )
//   }

//   return t.form.Form.templates.textbox.clone({ renderInput })
// }

const authorLayout = (author) => {
  return (
    <div className="author-fields-group autocomplete-group">
      {author.inputs.name}
      {author.inputs.id}
      <ul className="autocomplete-results"></ul>
    </div>
  );
};

export const defaultFormOptions = () => {
  return {
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
              // template: AutosuggestTemplate({
              //   getSuggestions,
              //   getSuggestionValue,
              //   renderSuggestion,
              //   onSuggestionSelected
              // }),
              error: 'Primary authorship is required',
              attrs: {
                className: 'show-author-name-edit',
                autoComplete: 'off'
              }
            },
            id: {
              attrs: {
                className: 'show-author-id-edit'
              }
            }
          }
        }
      },
      about: {
        type: 'textarea',
        attrs: {
          rows: '10',
          className: 'show-about-edit',
        },
      },
    },
  };
}

// Shows.schema = new SimpleSchema({
//   name: { type: String },
//   about: { type: String, optional: true },
//   userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
// });

// Shows.attachSchema(Shows.schema);

// This represents the keys from Shows objects that should be published
// to the client. If we add secret properties to Show objects, don't show
// them here to keep them private to the server.
Shows.publicFields = {
  name: 1,
  author: 1,
  about: 1,
  userId: 1,
};

Factory.define('show', Shows, {});

// Shows.helpers({
//   // A show is considered to be private if it has a userId set
//   isPrivate() {
//     return !!this.userId;
//   },
//   isLastPublicShow() {
//     const publicShowCount = Shows.find({ userId: { $exists: false } }).count();
//     return !this.isPrivate() && publicShowCount === 1;
//   },
//   editableBy(userId) {
//     if (!this.userId) {
//       return true;
//     }

//     return this.userId === userId;
//   },
//   todos() {
//     return Todos.find({ showId: this._id }, { sort: { createdAt: -1 } });
//   },
// });
