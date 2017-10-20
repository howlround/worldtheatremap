import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  words as splitWords,
  size,
} from 'lodash';
import cheerio from 'cheerio';

import { SearchShare } from '../searchShare.js';

import ShareBackgroundImage from '../../../ui/components/ShareBackgroundImage.jsx';

// AWS
import AWS from 'aws-sdk';
AWS.config.credentials = new AWS.Credentials({
  accessKeyId: Meteor.settings.AWSAccessKeyId,
  secretAccessKey: Meteor.settings.AWSSecretAccessKey,
});
AWS.config.region = Meteor.settings.AWSRegion;

// Adapted from https://bl.ocks.org/mbostock/7555321
const svgWrap = (inputText, lineWrap) => {
  const $ = cheerio.load('<text></text>');
  const words = splitWords(inputText).reverse();
  let word = null;
  let line = [];
  let lineNumber = 0;
  const lineHeight = 1.1;
  const y = 30;
  const x = 40;
  const dy = 1.2;
  let tspan = cheerio('<tspan></tspan>').attr('x', x).attr('dy', `${dy}em`);
  $('text').append(tspan);

  while (word = words.pop()) {
    line.push(word);
    const expandedLine = line.join(' ');
    tspan.text(expandedLine);

    if (size(tspan.text()) > lineWrap) {
      line.pop();
      tspan.text(line.join(' '));
      line = [word];
      tspan = cheerio('<tspan></tspan>')
        .attr('x', x)
        .attr('dy', `${dy}em`)
        .text(word);
      $('text').append(tspan);
    }
  }

  return $('text').html();
};

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

      const singleLineText = `${doc.count} ${doc.modifiers}`;
      const characterCount = size(singleLineText);

      let fontSize = '80px';
      let lineWrap = 24;
      if (characterCount > 250) {
        fontSize = '40px';
        lineWrap = 50;
      } else if (characterCount > 175) {
        fontSize = '50px';
        lineWrap = 40;
      } else if (characterCount > 120) {
        fontSize = '60px';
        lineWrap = 33;
      } else if (characterCount > 90) {
        fontSize = '70px';
        lineWrap = 28;
      }

      const wrappedText = svgWrap(singleLineText, lineWrap);
      const svg = (
        <svg width="1200" height="630">
          <ShareBackgroundImage />
          <text
            dangerouslySetInnerHTML={{ __html: wrappedText }}
            x="40"
            y="30"
            fontFamily="OpenSans"
            fontWeight="900"
            fontSize={fontSize}
            fill="#1cb4b0"
          />
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
