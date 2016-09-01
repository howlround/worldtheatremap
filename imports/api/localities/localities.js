// Meteor
import { Mongo } from 'meteor/mongo';

class LocalitiesCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Localities = new LocalitiesCollection('Localities');

// Deny all client-side updates since we will be using methods to manage this collection
Localities.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Localities.publicFields = {
  value: 1,
  label: 1,
};
