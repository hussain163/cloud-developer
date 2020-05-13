// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'nwp69jfl81'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'hussu.auth0.com',            // Auth0 domain
  clientId: 'tLTnrU7V6hv2FVWwfQgB9LNwb2Dv0i2i',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
