// Meteor
import { Mongo } from 'meteor/mongo';

class CountsCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Counts = new CountsCollection('Counts');

// Deny all client-side updates since we will be using methods to manage this collection
Counts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Counts.publicFields = {
  count: 1,
};
