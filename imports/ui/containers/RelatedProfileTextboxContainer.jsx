import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import escapeRegExp from 'lodash.escaperegexp';
import { remove as removeDiacritics } from 'diacritics';

// Components
import RelatedProfileTextbox from '../components/RelatedProfileTextbox.jsx';

// Collections
import { Profiles } from '../../api/profiles/profiles.js';

const RelatedProfileTextboxContainer = createContainer((props) => {
  const search = props.parentValue.name;
  let results = [];
  let loading = false;

  if (search && search.length > 0) {
    const profilesSubscribe = TAPi18n.subscribe('profiles.autocompleteQuery', search, props.limit);
    const nameRegEx = escapeRegExp(removeDiacritics(search)).toUpperCase();

    const query = {
      nameSearch: {
        $regex: new RegExp(`.*${nameRegEx}.*`),
      },
    };

    switch (props.limit) {
      case 'networks':
        query.orgTypes = { $in: ['Network / Association / Union'] };
        break;
      case 'notFestivals':
        query.profileType = { $ne: 'Festival' };
        break;
      default:
    }

    results = Profiles.find(query, { limit: 10, fields: Profiles.autocompleteFields }).fetch();

    loading = !(profilesSubscribe.ready());
  }

  return {
    results,
    loading,
  };
}, RelatedProfileTextbox);

export default RelatedProfileTextboxContainer;
