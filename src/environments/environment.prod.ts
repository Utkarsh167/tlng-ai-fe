export const environment = {
  production: true,

  /** Dev server configuration */

  // url: 'https://fleetdev.appskeeper.com/fleet/api/v1/',
  // socketUrl: "https://fleetsocket.appskeeper.com",

  /** END */

  /** Staging server configuration */

  // url: 'https://fleetstg.appskeeper.com/fleet/api/v1/',
  // socketUrl: "https://fleetsocketstg.appskeeper.com",
  /** END */

  /** Client configuration */

  // url: "https://hpe-api.commutev.com/fleet/api/v1/",
  // socketUrl: "https://hpe-socket.commutev.com",
  // url: "https://app-api.commutev.com/fleet/api/v1/",
  // socketUrl: "https://socket.commutev.com",

  
  /** END */

  /** Testing server configuration */


  url: 'http://52.183.160.176:4000/ai-parking/api/v1/',
  socketUrl: "http://52.183.160.176:4002",

  //   url: 'http://192.168.0.130:4000/ai-parking/api/v1/',
  // socketUrl: "http://192.168.0.130:4002",

  /** END */

  //S3 config
  // config: {
  //   AWS_BUCKET: "your bucket name",
  //   AWS_ACCESS_KEY: "your acccess key",
  //   AWS_SECRET_KEY: "your secret key",
  //   AWS_REGION: "your zone"
  // },
  firebase: {
    apiKey: "AIzaSyAl7bnf61UeIk3-mNpfSND2S6KVzlJOSeo",
    authDomain: "fleet-admin-9a923.firebaseapp.com",
    databaseURL: "https://fleet-admin-9a923.firebaseio.com",
    projectId: "fleet-admin-9a923",
    storageBucket: "fleet-admin-9a923.appspot.com",
    messagingSenderId: "1098311983111",
    appId: "1:1098311983111:web:28c6b06a074f91b2ad8aa2"
  },
  // azure configuration
  azureConfig: {
    sas: "?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2023-02-27T13:23:11Z&st=2020-02-27T05:23:11Z&spr=https&sig=4Yn1uibjA67xFZR8b9ZadUq0HfXqCFJ%2BxfJYRvj7qWg%3D",
    storageAccount: "commutevprodblob",
    containerName: "commutev-hpe"
  }
};
