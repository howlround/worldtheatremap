import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import AuthJoinPage from '../pages/AuthJoinPage.jsx';

const AuthJoinContainer = createContainer(() => {
  const countriesSubscribe = TAPi18n.subscribe('countries.public');

  return {
    loading: !(countriesSubscribe.ready()),
  };
}, AuthJoinPage);

export default AuthJoinContainer;
