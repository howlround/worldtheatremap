import '/imports/startup/server';

var basicAuth = new HttpBasicAuth("world theatre map", "world theatre map");
basicAuth.protect();
