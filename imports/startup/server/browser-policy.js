Meteor.startup( () => {
  BrowserPolicy.content.allowOriginForAll( '*.googleapis.com' );
  BrowserPolicy.content.allowOriginForAll( 'fonts.gstatic.com' );
  BrowserPolicy.content.allowOriginForAll( 'wtmstagingimages.s3.amazonaws.com' );
})
