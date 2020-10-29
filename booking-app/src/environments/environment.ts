// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  sso_api_username: '1o2uot96ekmmv1b8p0u30dtcue',
  sso_api_pwd: '1u47h5kv1nr3f5ncnui7ipj0b7ljb7v7kvebhcagv0mqkf8s4m2g',

  loginURL: 'https://bookingapp.auth.eu-central-1.amazoncognito.com/login?client_id=1o2uot96ekmmv1b8p0u30dtcue&response_type=code&scope=openid+profile&redirect_uri=http://localhost:4200/callback',

  signupURL: 'https://bookingapp.auth.eu-central-1.amazoncognito.com/signup?client_id=1o2uot96ekmmv1b8p0u30dtcue&response_type=code&scope=openid+profile&redirect_uri=http://localhost:4200/callback',

  redirectURL: 'http://localhost:4200/callback',

  cognitoTokenURL: 'https://bookingapp.auth.eu-central-1.amazoncognito.com/oauth2/token',
  
  logout: 'https://bookingapp.auth.eu-central-1.amazoncognito.com/logout?' + 
          'client_id=1o2uot96ekmmv1b8p0u30dtcue&' +
          'logout_uri=http://localhost:4200/start'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
