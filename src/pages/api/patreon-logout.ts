// // api/patreon-logout.ts

// export default async function handler(req, res) {
//   // Clear HTTP-only cookies
//   res.clearCookie('patreonAccessToken');
//   res.clearCookie('patreonRefreshToken');

//   // // Redirect to the login page or any other appropriate page
//   // res.redirect('/login');
//   res.json({ success: true });
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import * as cookie from "cookie";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Clear HTTP-only cookies
//   const emptyCookie = cookie.serialize("patreonAccessToken", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
//     path: "/",
//   });

//   res.setHeader("Set-Cookie", [emptyCookie]);

//   // You can clear the refresh token cookie in the same way if needed
//   // const emptyRefreshCookie = cookie.serialize("patreonRefreshToken", "", {
//   //   httpOnly: true,
//   //   secure: process.env.NODE_ENV === "production",
//   //   sameSite: "strict",
//   //   maxAge: 0,
//   //   path: "/",
//   // });

//   // res.setHeader("Set-Cookie", [emptyRefreshCookie]);

//   res.json({ success: true });
// }


// import { NextApiRequest, NextApiResponse } from "next";
// import * as cookie from "cookie";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Clear HTTP-only cookies
//   res.setHeader(
//     "Set-Cookie",
//     cookie.serialize("patreonAccessToken", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       expires: new Date(0), // Set expires to a past date to expire the cookie immediately
//       path: "/",
//     })
//   );

//   res.setHeader(
//     "Set-Cookie",
//     cookie.serialize("patreonRefreshToken", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       expires: new Date(0),
//       path: "/",
//     })
//   );

//   res.json({ success: true });
// }


// export default async function handler(req, res) {
//   // Clear HTTP-only cookies
//   res.clearCookie('patreonAccessToken');
//   res.clearCookie('patreonRefreshToken');
  
//   // You can also perform other cleanup actions here if needed.
  
//   // Respond with success
//   res.json({ success: true });
// }

// api/patreon-logout.ts (Next.js API route)
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Clear HTTP-only cookies
//   res.setHeader('Set-Cookie', [
//     `patreonAccessToken=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`,
//     `patreonRefreshToken=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`,
//   ]);
//   res.redirect('/patreon');
//   // Send a response indicating successful logout
//   res.status(200).json({ success: true });
  
// }

// api/patreon-logout.ts (Next.js API route)
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Clear HTTP-only cookies
    res.setHeader('Set-Cookie', [
      `patreonAccessToken=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`,
      `patreonRefreshToken=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`,
    ]);

    // Send a response indicating successful logout
    res.status(200).json({ success: true });
  } catch (error) {
    // Handle any errors here
    console.error('Logout failed:', error);
    res.status(500).json({ success: false, error: 'Logout failed' });
  }
}
