import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Components
import RelatedProfileTextbox from '../components/RelatedProfileTextbox.jsx';

// Collections
import { Profiles } from '../../api/profiles/profiles.js';

const RelatedProfileTextboxContainer = createContainer((props) => {
  const search = props.parentValue.name;
  let results = [];
  let loading = false;

  if (search && search.length > 0) {
    const profilesSubscribe = TAPi18n.subscribe('profiles.autocompleteQuery', search);
    const regex = new RegExp('^' + search + '.*', 'i');
    results = Profiles.find({name: { $regex: regex }}, { limit: 5, fields: Profiles.autocompleteFields }).fetch();

    loading = !(profilesSubscribe.ready());
  }

  return {
    results,
    loading,
  };
}, RelatedProfileTextbox);

export default RelatedProfileTextboxContainer;
