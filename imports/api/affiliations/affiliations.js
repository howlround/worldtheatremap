import { Mongo } from 'meteor/mongo';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';
import RelatedProfileTextboxContainer from '../../ui/containers/RelatedProfileTextboxContainer.jsx';

class AffiliationsCollection extends Mongo.Collection {
  // insert(ourAffiliation, callback) {
  //   return super.insert(ourAffiliation, callback);
  // }
  // remove(selector, callback) {
  //   return super.remove(selector, callback);
  // }
}

export const Affiliations = new AffiliationsCollection('Affiliations');

// Deny all client-side updates since we will be using methods to manage this collection
Affiliations.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

function renderTextbox(locals) {
  const onChange = (evt) => locals.onChange(evt);
  return (
    <div className="input-group">
      <RelatedProfileTextboxContainer
        disabled={locals.disabled}
        parentValue={locals.value}
        updateParent={onChange}
        attrs={locals.attrs}
      />
    </div>
  );
}

const textboxTemplate = t.form.Form.templates.textbox.clone({ renderTextbox });

// here we are: the factory
class RelatedProfileFactory extends t.form.Textbox {
  getTemplate() {
    return textboxTemplate;
  }
}

export const relatedProfileSchema = t.struct({
  name: t.maybe(t.String),
  _id: t.String,
});

export const affiliationSchema = t.struct({
  profile: relatedProfileSchema,
  parentId: t.String,
});

export const affiliationFormSchema = t.struct({
  profile: relatedProfileSchema,
});

export const defaultFormOptions = () => ({
  fields: {
    profile: {
      factory: RelatedProfileFactory,
      error: 'Profile is required',
      attrs: {
        className: 'affiliation-profile-edit',
        autoComplete: 'off',
      },
      label: <FormattedMessage
        id="forms.participantNameLabel"
        description="Label for Participant name"
        defaultMessage="Name (individual or organization name)"
      />,
      disableAdd: true,
      disableRemove: true,
      disableOrder: true,
      fields: {
        name: {
          error: 'Profile is required',
          attrs: {
            className: 'affiliation-profile-name-edit',
            autoComplete: 'off',
            placeholder: 'Profile name',
          },
        },
        _id: {
          attrs: {
            className: 'affiliation-profile-id-edit',
          },
        },
      },
    },
  },
});

// This represents the keys from Affiliations objects that should be published
// to the client. If we add secret properties to Affiliation objects, don't event
// them here to keep them private to the server.
Affiliations.publicFields = {
  profile: 1,
  parentId: 1,
};
