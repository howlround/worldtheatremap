if (Meteor.isServer) {
  Meteor.startup(function () {
    ServiceConfiguration.configurations.upsert(
      { service: 'oidc' },
      {
        $set: {
          loginStyle: 'redirect',
          clientId: 'world_theatre_map',
          secret: 'U2bhXwPfaGzO1VmTgBbMZRfOftc27ahobaixERgHZh5J6t7QQiLTCmVAfqgGxP08',
          serverUrl: 'http://howlround.local',
          authorizationEndpoint: '/oauth2/authorize?',
          tokenEndpoint: '/oauth2/token',
          userinfoEndpoint: '/oauth2/UserInfo',
          idTokenWhitelistFields: []
        }
      }
    );
  });
}
