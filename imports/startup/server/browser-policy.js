Meteor.startup( () => {
  BrowserPolicy.content.allowOriginForAll( '*.googleapis.com' );
  BrowserPolicy.content.allowOriginForAll( 'fonts.gstatic.com' );
})
