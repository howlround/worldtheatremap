Meteor.startup( () => {
  BrowserPolicy.content.allowOriginForAll( '*.googleapis.com' );
  BrowserPolicy.content.allowOriginForAll( 'fonts.gstatic.com' );
  BrowserPolicy.content.allowOriginForAll( 'wtm-dev-images-resized.s3.amazonaws.com' );
  BrowserPolicy.content.allowOriginForAll( 'wtm-dev-images.s3.amazonaws.com' );
  BrowserPolicy.content.allowOriginForAll( 's3.amazonaws.com' );
})
