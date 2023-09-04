// // // pages/api/patreon-auth.ts
// // import { NextApiRequest, NextApiResponse } from 'next';
// // import patreonAPI, { oauth as patreonOAuth } from 'patreon';
// // import url from 'url'


// // const CLIENT_ID = process.env.PATREON_CLIENT_ID // Replace with your client ID
// // const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET; // Replace with your client secret
// // // const REDIRECT_URL = 'http://127.0.0.1:3000/api/patreon-auth'; // Replace with your redirect URL
// // const REDIRECT_URL = 'http://127.0.0.1:3000/patreon-si'; // Replace with your redirect URL

// // console.log("client secret", CLIENT_SECRET)
// // console.log("client id", CLIENT_ID)

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== 'POST') {
// //     return res.status(405).end(); // Method Not Allowed
// //   }

// //   const objectKey = Object.keys(req.body)[0];
// //   const parsedObjectKey = objectKey && JSON.parse(objectKey);

// // const oauthGrantCode = parsedObjectKey.code;


// //   if (!oauthGrantCode) {
// //     return res.status(400).json({ error: 'Missing authorization code' });
// //   }

// //   const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);
// //   console.log("patreonOAuthClient: ", patreonOAuthClient)
// //   console.log("oauthGrantCode: ", oauthGrantCode)

// //   try {
// //     console.log("start try")
// //     if (oauthGrantCode) {
// //       console.log("if code's code: ", oauthGrantCode)
// //       const tokensResponse = await patreonOAuthClient.getTokens(oauthGrantCode, REDIRECT_URL);
// //       console.log("tokensResponse: ", tokensResponse)
// //       const patreonAPIClient = patreonAPI(tokensResponse.access_token);
// //       console.log("patreonAPICLient: ", patreonAPIClient)
// //       const currentUserResponse = await patreonAPIClient('/current_user');
// //       console.log("currentUserResponse: ", currentUserResponse)
// //       const user = currentUserResponse.store.find('user').map(user => user.serialize());
// //       console.log("user: ", user)
  
// //       return res.status(200).json({ user });
// //     }

// //   } catch (error) {
// //     console.error('Error fetching user profile:', error);
// //     return res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // }





// // pages/api/patreon-auth.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// // import patreonAPI, { oauth as patreonOAuth } from 'patreon';
// import url from 'url'
// import { patreon, oauth as patreonOAuth } from 'patreon'



// const CLIENT_ID = process.env.PATREON_CLIENT_ID // Replace with your client ID
// const CLIENT_SECRET = process.env.PATREON_CLIENT_SECRET; // Replace with your client secret
// // const REDIRECT_URL = 'http://127.0.0.1:3000/api/patreon-auth'; // Replace with your redirect URL
// const REDIRECT_URL = 'http://127.0.0.1:3000/patreon-si'; // Replace with your redirect URL

// // const patreonAPI = patreon.patreon
// // var patreonOAuth = patreon.oauth

// console.log("client secret", CLIENT_SECRET)
// console.log("client id", CLIENT_ID)

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).end(); // Method Not Allowed
//   }

//   const objectKey = Object.keys(req.body)[0];
//   const parsedObjectKey = objectKey && JSON.parse(objectKey);

// const oauthGrantCode = parsedObjectKey.code;


//   if (!oauthGrantCode) {
//     return res.status(400).json({ error: 'Missing authorization code' });
//   }

//   const patreonOAuthClient = patreonOAuth(CLIENT_ID, CLIENT_SECRET);
//   console.log("patreonOAuthClient: ", patreonOAuthClient)
//   console.log("oauthGrantCode: ", oauthGrantCode)

//   try {
//     console.log("start try")
//     if (oauthGrantCode) {
//       // console.log("if code's code: ", oauthGrantCode)
//       // const tokensResponse = await patreonOAuthClient.getTokens(oauthGrantCode, REDIRECT_URL);
//       // console.log("tokensResponse: ", tokensResponse)
//       // const patreonAPIClient = patreon(tokensResponse.access_token);
//       // console.log("patreonAPICLient: ", patreonAPIClient)
//       // const currentUserResponse = await patreonAPIClient('/current_user');
//       // console.log("currentUserResponse: ", currentUserResponse)
//       // const user = currentUserResponse.store.find('user').map(user => user.serialize());
//       // console.log("user: ", user)
  
//       // return res.status(200).json({ user });
//       patreonOAuthClient
//       .getTokens(oauthGrantCode, REDIRECT_URL)
//       .then(function(tokensResponse) {
//         console.log(tokensResponse.access_token)
//           var patreonAPIClient = patreon(tokensResponse.access_token)
//           console.log("patreonAPIClient: ", patreonAPIClient)
//           return patreonAPIClient('/current_user')
//       })
//       .then(function(result) {
//         console.log("result: ", result)
//           var store = result.store
//           console.log(store)
//           // store is a [JsonApiDataStore](https://github.com/beauby/jsonapi-datastore)
//           // You can also ask for result.rawJson if you'd like to work with unparsed data
//           res.end(store.findAll('user').map(user => user.serialize()))
//       })
//       .catch(function(err) {
//           console.error('error!', err)
//           res.end(err)
//       })
//     }


//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
