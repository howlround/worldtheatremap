import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';

Meteor.startup(() => {
  Slingshot.fileRestrictions('myFileUploads', {
    allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
    maxSize: 10 * 1024 * 1024, // 10 MB (use null for unlimited).
  });

  Slingshot.createDirective('myFileUploads', Slingshot.S3Storage, {
    bucket: Meteor.settings.AWSSourceBucket,
    acl: 'public-read',

    authorize: () => {
      // Deny uploads if user is not logged in.
      if (!Meteor.userId()) {
        const message = 'Please login before posting files';
        throw new Meteor.Error('Login Required', message);
      }

      return true;
    },

    key: file => (
      // Store file into a directory by the user's username.
      // const user = Meteor.users.findOne(this.userId);
      `${Meteor.userId()}/${file.name}`
    ),
  });
});
