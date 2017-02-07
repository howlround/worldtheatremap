import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import escapeRegExp from 'lodash.escaperegexp';

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
    const regex = new RegExp(`.*${escapeRegExp(search)}.*`, 'i');

    const query = {
      name: {
        $regex: regex,
      },
    };

    if (props.limit === 'networks') {
      query.orgTypes = 'Network / Association / Union';
    }

    results = Profiles.find(query, { limit: 5, fields: Profiles.autocompleteFields }).fetch();

    loading = !(profilesSubscribe.ready());
  }

  return {
    results,
    loading,
  };
}, RelatedProfileTextbox);

export default RelatedProfileTextboxContainer;
