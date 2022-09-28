import type { GetServerSideProps, NextPage } from 'next';
import { type Session, unstable_getServerSession } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trpc } from '../../../utils/trpc';
import { authOptions } from '../../api/auth/[...nextauth]';
import { prisma } from '../../../server/db/client';

type Props = {
  session: Session | null;
  isSpectator: boolean;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session && session.user?.id) {
    const game = await prisma.game.findMany({
      take: 1,
      orderBy: { createdAt: 'desc' },
      select: { id: true, redTeamId: true, blueTeamId: true },
    });
    const userTeam = await prisma.user.findFirst({
      where: { id: session.user.id },
      select: { teamId: true },
    });

    if (
      userTeam?.teamId === game[0]?.blueTeamId ||
      userTeam?.teamId === game[0]?.redTeamId
    ) {
      return {
        props: {
          session,
          isSpectator: false,
        },
      };
    } else {
      return {
        props: { session, isSpectator: true },
      };
    }
  }

  return {
    props: { session, isSpectator: true },
  };
};

const Draft: NextPage<Props> = ({ session, isSpectator }) => {
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const { data: gameData, status: gameDataStatus } = trpc.useQuery([
    'game.getById',
    gameId,
  ]);

  useEffect(() => {
    if (!session) {
      signIn('discord', { callbackUrl: window.location.pathname });
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Draft | Bored Games</title>
      </Head>

      <main className="min-h-screen bg-slate-700 text-white">
        <button onClick={() => signOut()}>DEBUG SIGN OUT</button>
        {gameDataStatus === 'loading' && <div>Loading Game Data</div>}
        {gameData && <div>{JSON.stringify(gameData, null, 2)}</div>}
      </main>
    </>
  );
};

export default Draft;
