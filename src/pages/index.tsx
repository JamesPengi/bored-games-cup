import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const router = useRouter();
  const { mutate } = trpc.useMutation('game.create', {
    onSuccess(data) {
      router.push(`/${data}/draft`);
    },
  });

  return (
    <>
      <Head>
        <title>BG Cup Draft | Bored Games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col min-h-screen justify-center text-white bg-slate-800 p-4">
        <h1 className="font-bold text-3xl text-center">BG Cup Draft</h1>
        <span className="text-center">
          Use /create in the #bg-cup-1 text channel
        </span>
        <button
          onClick={() => {
            mutate({
              blueTeamId: 'cl8ke5kw300003n6l0w7npbjx',
              redTeamId: 'cl8ke5kw300023n6lo9bqia0k',
            });
          }}
        >
          Create Game
        </button>
      </main>
    </>
  );
};

export default Home;
