// import { google } from 'googleapis';
var {google}=require('googleapis')

/*******************/
/** CONFIGURATION **/
/*******************/

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
  clientSecret: "oO_2YumT_XgHbq0yg-_CNXSG", 
  // e.g. _ASDFA%DFASDFASDFASD#FAD-
  redirect: process.env.GOOGLE_REDIRECT_URL, // this must match your google api settings
};

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email',
  "https://www.googleapis.com/auth/userinfo.profile"
];

/*************/
/** HELPERS **/
/*************/

// function createConnection() {
//   return new google.auth.OAuth2(
//     googleConfig.clientId,
//     googleConfig.clientSecret,
//     googleConfig.redirect
//   );
// }

var oauth2Client=new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect
);

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
}



/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */
function urlGoogle() {
  // const auth = createConnection();
  const url = getConnectionUrl(oauth2Client);
  return url;
}

/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
async function getGoogleAccountFromCode(code) {
  try {
  const data = await oauth2Client.getToken(code);
  console.log(data);
  const tokens = data.tokens.access_token;
  console.log(tokens.scope);
  oauth2Client.setCredentials(tokens);
  return {
     tokens
  };
  } catch (error) {
    
    return error
  }
  
}


module.exports={
  urlGoogle,getGoogleAccountFromCode
}