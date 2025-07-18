const fs = require('fs');

const file = `export const environment = {
  production: true,
  apiUrl: '${process.env['API_URL']}',
  urlHub: '${process.env['URL_HUB']}',
  googleClientId: '${process.env['GOOGLE_CLIENT_ID']}',
  googleRedirectUri: '${process.env['GOOGLE_REDIRECT_URI']}',
  facebookClientId: '${process.env['FACEBOOK_CLIENT_ID']}',
  facebookRedirectUri: '${process.env['FACEBOOK_REDIRECT_URI']}'
};`;

fs.writeFileSync('./src/environments/environment.prod.ts', file);