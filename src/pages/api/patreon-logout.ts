import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader('Set-Cookie', [
      `patreonAccessToken=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`,
      `patreonRefreshToken=; HttpOnly; Max-Age=0; Path=/; SameSite=Strict`,
    ]);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ success: false, error: 'Logout failed' });
  }
}
