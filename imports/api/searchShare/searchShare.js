// Meteor
import { Mongo } from 'meteor/mongo';

class SearchShareCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const SearchShare = new SearchShareCollection('SearchShare');

// Deny all client-side updates since we will be using methods to manage this collection
SearchShare.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
