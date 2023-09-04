// // import { NextApiRequest, NextApiResponse } from 'next';

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   try {
// //       const CLIENT_ID = process.env.PATREON_CLIENT_ID;


// //   const OAUTH_REDIRECT_URL = encodeURIComponent(
// //     `${process.env.BASE_URL}/patreon-si`
// //   ); 

// //   const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code`;


// //   //redirect to oauthURL
// //   // res.redirect(oauthUrl);
// //   res.writeHead(302, {
// //     Location: oauthUrl,
// //   });
// //   res.end();


// //   } catch (error) {
// //     // Handle any errors here
// //     console.error('Login failed:', error);
// //     // res.status(500).json({ success: false, error: 'Login failed' });
// //   }
// // }


// // pages/api/patreon-login.js
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log("heyaaa")
//   try {
    
//     const CLIENT_ID = process.env.PATREON_CLIENT_ID;
//     const OAUTH_REDIRECT_URL = encodeURIComponent(
//       `${process.env.BASE_URL}/patreon-si`
//     );
//     const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code`;

//     // Redirect to the Patreon OAuth URL
//     // res.writeHead(302, {
//     //   Location: oauthUrl,
//     // });
//     // res.end();
//     // window.open(oauthUrl, '_blank');

//     res.writeHead(302, {
//       Location: oauthUrl,
//     });
//     res.end();
//   } catch (error) {
//     // Handle any errors here
//     console.error('Login failed:', error);
//     // res.status(500).json({ success: false, error: 'Login failed' });
//   }
// }


// pages/api/patreon-login.js
// import { NextApiRequest, NextApiResponse } from 'next';
// import Cors from 'cors';

// // Initialize the cors middleware
// const cors = Cors({
//   origin: 'https://your-client-domain.com', // Replace with your actual client-side domain
//   methods: ['GET'], // Specify the allowed HTTP methods
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     await cors(req, res); // Apply the CORS middleware

//     const CLIENT_ID = process.env.PATREON_CLIENT_ID;
//     const OAUTH_REDIRECT_URL = encodeURIComponent(
//       `${process.env.BASE_URL}/patreon-si`
//     );
//     const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code`;

//     // Redirect to the Patreon OAuth URL
//     res.writeHead(302, {
//       Location: oauthUrl,
//     });
//     res.end();
//   } catch (error) {
//     // Handle any errors here
//     console.error('Login failed:', error);
//     // res.status(500).json({ success: false, error: 'Login failed' });
//   }
// }


// Server-side code (in pages/api/start-patreon-oauth.js)
// import { NextApiRequest, NextApiResponse } from 'next';
// import Cors from 'cors';

// const cors = Cors({
//   origin: 'http://127.0.0.1:3000', // Replace with your client-side domain
//   methods: ['GET'], // Specify the allowed HTTP methods
// });


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   cors(req, res, async () => {
//     // Rest of your server-side code
//     try {
//       const CLIENT_ID = process.env.PATREON_CLIENT_ID;
//       const OAUTH_REDIRECT_URL = encodeURIComponent(
//         `${process.env.BASE_URL}/patreon-si`
//       );
//       const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code`;
  
//       // Redirect to the Patreon OAuth URL
//       res.writeHead(302, {
//         Location: oauthUrl,
//       });
//       res.end();
//     } catch (error) {
//       // Handle any errors here
//       console.error('Login failed:', error);
//       // res.status(500).json({ success: false, error: 'Login failed' });
//     }
//   });

// }
