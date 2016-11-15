Meteor.startup( () => {
  BrowserPolicy.content.allowOriginForAll( '*.googleapis.com' );
  BrowserPolicy.content.allowOriginForAll( '*.gstatic.com' );
  BrowserPolicy.content.allowEval('https://ajax.googleapis.com');
  BrowserPolicy.content.allowOriginForAll( 'wtm-dev-images-resized.s3.amazonaws.com' );
  BrowserPolicy.content.allowOriginForAll( 'wtm-dev-images.s3.amazonaws.com' );
  BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
  // Allow images from the new play map server
  BrowserPolicy.content.allowOriginForAll( 'newplaymap.org' );
  // Pulling HowlRound posts
  BrowserPolicy.content.allowOriginForAll( 'howlround.com' );
})
