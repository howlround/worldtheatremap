// Meteor
import { Mongo } from 'meteor/mongo';
import React from 'react';

class StatsCollection extends Mongo.Collection {
  // insert(profile, callback) {
  // }
  // remove(selector, callback) {
  // }
}

export const Stats = new StatsCollection('Stats');

// Deny all client-side updates since we will be using methods to manage this collection
Stats.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Stats.publicFields = {
  total: 1,
  count: 1,
};
