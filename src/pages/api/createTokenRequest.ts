import type { NextApiRequest, NextApiResponse } from 'next';
import Ably from 'ably/promises';
import { env } from '../../env/server.mjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Ably.Realtime(env.ABLY_API_KEY);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: '*',
  });
  return res.status(200).json(tokenRequestData);
}
