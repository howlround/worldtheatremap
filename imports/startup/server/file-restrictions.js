Meteor.startup( () => {
  Slingshot.fileRestrictions("myFileUploads", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
    maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
  });

  Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
    bucket: Meteor.settings.AWSSourceBucket,

    acl: "public-read",

    authorize: function () {
      //Deny uploads if user is not logged in.
      if (!this.userId) {
        var message = "Please login before posting files";
        throw new Meteor.Error("Login Required", message);
      }

      return true;
    },

    key: function (file) {
      //Store file into a directory by the user's username.
      // var user = Meteor.users.findOne(this.userId);
      return file.name;
    }
  });
})
