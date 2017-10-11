// Meteor
import { Mongo } from 'meteor/mongo';

class VariablesCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Variables = new VariablesCollection('Variables');

// Deny all client-side updates since we will be using methods to manage this collection
Variables.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Variables.publicFields = {
  value: 1,
};
