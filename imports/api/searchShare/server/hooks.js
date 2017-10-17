import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { IntlProvider } from 'react-intl';

import { SearchShare } from '../searchShare.js';

// AWS
import AWS from 'aws-sdk';
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: Meteor.settings.AWSAccessKeyId,
  secretAccessKey: Meteor.settings.AWSSecretAccessKey,
});
AWS.config.region = Meteor.settings.AWSRegion;

// Insert
// We use upsert for search share docs.
// Hooks package fires .after.insert or .after.update depending on result of upsert
// We only care about insert for generating the image
SearchShare.after.insert((userId, doc) => {
  if (Meteor.isServer) {
    AWS.config.credentials.get((err) => {
      // attach event listener
      if (err) {
        console.error('Error retrieving AWS credentials.');
        console.error(err);
        return;
      }

      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: Meteor.settings.AWSShareImageBucket },
      });

      const svg = (
        <svg width="1200" height="630">
          <text x="20" y="20" fontFamily="sans-serif" fontSize="20px" fill="red">
            {doc.count} {doc.type} {doc.modifiers}
          </text>
        </svg>
      );

      const svgString = ReactDOMServer.renderToString(svg);
      const file = svgString;
      // const file = Buffer.from(svgString).toString('base64');
      const fileName = `${new Date().getTime()}.svg`;
      const albumPhotosKey = encodeURIComponent('in') + '/';
      const photoKey = albumPhotosKey + fileName;
      s3.upload({
        Key: photoKey,
        Body: file,
        ACL: 'public-read'
      }, function(err, data) {
        if (err) {
          return console.log('There was an error uploading your photo: ', err.message);
        }
        console.log('Successfully uploaded photo.');
        // viewAlbum(albumName);
      });
    });
  }
});
