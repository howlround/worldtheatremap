import { Mongo } from 'meteor/mongo';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import t from 'tcomb-form';
import RelatedProfileTextboxContainer from '../../ui/containers/RelatedProfileTextboxContainer.jsx';

class FestivalOrganizersCollection extends Mongo.Collection {
  // insert(ourFestivalOrganizer, callback) {
  //   return super.insert(ourFestivalOrganizer, callback);
  // }
  // remove(selector, callback) {
  //   return super.remove(selector, callback);
  // }
}

export const FestivalOrganizers = new FestivalOrganizersCollection('FestivalOrganizers');

// Deny all client-side updates since we will be using methods to manage this collection
FestivalOrganizers.deny({
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
        limit="notFestivals"
        addNew={false}
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

export const relatedFestivalSchema = t.struct({
  _id: t.String,
  name: t.maybe(t.String),
  startDate: t.maybe(t.Date),
});

export const festivalOrganizerSchema = t.struct({
  profile: relatedFestivalSchema,
  parentId: t.String,
});

export const festivalOrganizerFormSchema = t.struct({
  profile: relatedProfileSchema,
});

export const defaultFormOptions = () => ({
  fields: {
    profile: {
      factory: RelatedProfileFactory,
      error: <FormattedMessage
        id="forms.festivalOrganizerFormError"
        description="Error text for FestivalOrganizer name"
        defaultMessage="Go to 'add person/organization' to make a profile for this profile."
      />,
      attrs: {
        className: 'festival-organizer-profile-edit',
        autoComplete: 'off',
      },
      label: <FormattedMessage
        id="forms.festivalOrganizerFormLabel"
        description="Label for FestivalOrganizer name"
        defaultMessage="Festival Organizer"
      />,
      help: <FormattedMessage
        id="forms.festivalOrganizerFormHelp"
        description="Help text for FestivalOrganizer name"
        defaultMessage="If your Festival Organizer does not appear here, it doesn't have a profile yet. Go to 'add person/organization' to make one."
      />,
      disableAdd: true,
      disableRemove: true,
      disableOrder: true,
      fields: {
        name: {
          attrs: {
            className: 'festival-organizer-profile-name-edit',
            autoComplete: 'off',
            placeholder: 'Profile name',
          },
        },
        _id: {
          attrs: {
            className: 'festival-organizer-profile-id-edit',
          },
        },
      },
    },
  },
});

// This represents the keys from FestivalOrganizers objects that should be published
// to the client. If we add secret properties to FestivalOrganizer objects, don't event
// them here to keep them private to the server.
FestivalOrganizers.publicFields = {
  profile: 1,
  parentId: 1,
};
