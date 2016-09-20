import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { createContainer } from 'meteor/react-meteor-data';
import ShowAddPage from '../pages/ShowAddPage.jsx';

export default createContainer(() => {
  const loading = false;
  const add = true;
  return {
    loading,
    add,
  };
}, ShowAddPage);
