// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  /** Testing server configuration */
  // url:'https://fleetqa.appskeeper.com/fleet/api/v1/',

  /** END */


  /** Dev server configuration */
  // url: 'https://fleetdev.appskeeper.com/fleet/api/v1/',
  // // socketUrl: "http://fleetdev.appskeeper.com:3024",
  // socketUrl: "https://fleetsocket.appskeeper.com",

  /** END */


  /** Staging server configuration */
  // url: "https://hpe-api.commutev.com/fleet/api/v1/",
  // socketUrl: "https://hpe-socket.commutev.com",
  // url: 'https://fleetstg.appskeeper.com/fleet/api/v1/',
  // socketUrl: "http://fleetstg.appskeeper.com:3026",
  /** END */

  // Dev server
  url: 'http://52.183.160.176:4000/ai-parking/api/v1/',
  socketUrl: "http://52.183.160.176:4002",

  // Local Server
  // url: 'http://localhost:4000/ai-parking/api/v1/',
  // socketUrl: "http://localhost:4002",

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

  //azure configuration
  azureConfig: {
    sas: "?sp=racwdl&st=2020-02-21T06:32:25Z&se=2029-02-22T06:32:00Z&sv=2019-02-02&sr=c&sig=IBHAnWGzRATut3EJJ08wlXkMolwVQl6C6wtt6PowjqM%3D",
    storageAccount: "commutevstorage",
    containerName: "fleet-app"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
