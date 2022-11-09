import type { Types } from 'ably';
import Ably from 'ably/promises';
import { useEffect } from 'react';

const ably: Types.RealtimePromise = new Ably.Realtime.Promise({
  authUrl: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/createTokenRequest`
    : `http://localhost:3000/api/createTokenRequest`,
});

export function useChannel(
  channelName: string,
  callbackOnMessage: (message: Types.Message) => void
) {
  const channel: Types.RealtimeChannelPromise = ably.channels.get(channelName);

  useEffect(() => {
    channel.subscribe((message) => {
      callbackOnMessage(message);
    });

    return () => channel.unsubscribe();
  });

  return [channel, ably];
}
