import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { SearchShare } from '../searchShare.js';

import ShareBackgroundImage from '../../../ui/components/ShareBackgroundImage.jsx';

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
        console.error('Error retrieving AWS credentials.'); // eslint-disable-line no-console
        console.error(err); // eslint-disable-line no-console
        return;
      }

      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: Meteor.settings.AWSShareImageBucket },
      });

      const svg = (
        <svg width="1200" height="630">
          <ShareBackgroundImage />
          <text
            x="20"
            y="100"
            fontFamily="OpenSans"
            fontWeight="900"
            fontSize="80px"
            fill="#1cb4b0"
          >
            {doc.count} {doc.modifiers}
          </text>
        </svg>
      );

      const svgString = ReactDOMServer.renderToString(svg);
      const file = svgString;
      // const file = Buffer.from(svgString).toString('base64');
      const fileName = `${new Date().getTime()}.svg`;
      const albumPhotosKey = `${encodeURIComponent('in')}/`;
      const photoKey = albumPhotosKey + fileName;
      s3.upload({
        Key: photoKey,
        Body: file,
        ACL: 'public-read',
      }, errS3 => { // eslint-disable-line consistant-return
        const output = (errS3) ? errS3.message : null;
        return output;
      });
    });
  }
});
