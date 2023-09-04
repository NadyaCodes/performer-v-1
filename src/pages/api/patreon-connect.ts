import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("heyaaa")
  try {
    
    const CLIENT_ID = process.env.PATREON_CLIENT_ID;
    const OAUTH_REDIRECT_URL = encodeURIComponent(
      `${process.env.BASE_URL}/patreon-si`
    );
    const oauthUrl = `https://www.patreon.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code`;

    // Redirect to the Patreon OAuth URL
    // res.writeHead(302, {
    //   Location: oauthUrl,
    // });
    // res.end();
    // window.open(oauthUrl, '_blank');

    return oauthUrl
  } catch (error) {
    // Handle any errors here
    console.error('Login failed:', error);
    // res.status(500).json({ success: false, error: 'Login failed' });
  }
}