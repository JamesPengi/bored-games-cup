import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const GameLanding: NextPage = () => {
  const router = useRouter();
  const gameId = router.query.gameId as string;

  return (
    <>
      <Head>
        <title>Game | Bored Games</title>
      </Head>

      <main className="min-h-screen bg-slate-700">
        <span>Game ID: {gameId}</span>
        <button onClick={() => router.push(`/${gameId}/draft`)}>
          Go to Draft
        </button>
      </main>
    </>
  );
};

export default GameLanding;
