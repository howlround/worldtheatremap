if (Meteor.isServer) {
  Meteor.startup(function () {
    ServiceConfiguration.configurations.upsert(
      { service: 'oidc' },
      {
        $set: {
          loginStyle: 'redirect',
          clientId: Meteor.settings.oidc.clientId,
          secret: Meteor.settings.oidc.secret,
          serverUrl: Meteor.settings.oidc.serverUrl,
          authorizationEndpoint: '/oauth2/authorize?',
          tokenEndpoint: '/oauth2/token',
          userinfoEndpoint: '/oauth2/UserInfo',
          idTokenWhitelistFields: []
        }
      }
    );
  });
}
