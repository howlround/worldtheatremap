import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import ShowAddPage from '../pages/ShowAddPage.jsx';

export default createContainer(() => {
  const add = true;
  const countriesSubscribe = TAPi18n.subscribe('countries.public');
  const interestsSubscribe = TAPi18n.subscribe('interests.public');
  const languagesSubscribe = TAPi18n.subscribe('languages.public');
  const loading = !(
    countriesSubscribe.ready() &&
    languagesSubscribe.ready() &&
    interestsSubscribe.ready()
  );
  return {
    loading,
    add,
  };
}, ShowAddPage);
