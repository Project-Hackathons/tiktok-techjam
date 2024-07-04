import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const csrfState = Math.random().toString(36).substring(2);

  // Set cookie using response headers
  res.setHeader('Set-Cookie', cookie.serialize('csrfState', csrfState, {
    maxAge: 60 * 1000, // Cookie expires in 1 minute
    httpOnly: true,    // Ensures the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === 'production', // Use secure flag in production
    path: '/',         // Cookie is valid for the entire site
    sameSite: 'strict' // Strict same-site policy
  }));

  let url = "https://www.tiktok.com/v2/auth/authorize/";
  
  // Concatenate URL parameters
  url += "?client_key=sbawtiri70hj56ck90";
  url += "&scope=user.info.basic";
  url += "&response_type=code";
  url += "&redirect_uri=https://tiktok-techjam-vercel.vercel.app/"; // Ensure the URL is valid
  url += "&state=" + csrfState;

  res.json({url})
};

export default handler;