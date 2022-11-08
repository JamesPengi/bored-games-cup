import type { GetServerSideProps, NextPage } from 'next';
import { type Session, unstable_getServerSession } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trpc } from '../../utils/trpc';
import { authOptions } from '../api/auth/[...nextauth]';
import { prisma } from '../../server/db/client';

type Props = {
  session: Session | null;
  team: 'blue' | 'red' | 'spectator';
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

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

    if (userTeam?.teamId === game[0]?.blueTeamId) {
      return { props: { session, team: 'blue' } };
    } else if (userTeam?.teamId === game[0]?.redTeamId) {
      return { props: { session, team: 'red' } };
    }
  }

  return { props: { session, team: 'spectator' } };
};

const Draft: NextPage<Props> = ({ session, team }) => {
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
        {gameDataStatus === 'loading' && <div>Loading Game Data</div>}
        {gameData && (
          <div className="flex flex-col">
            {team !== 'spectator' ? (
              <div>{/* TODO: Here goes draft stuff */}</div>
            ) : (
              <div>
                {/* TODO: Tell users that they can't spectate. Show button to redirect to actual spectate page */}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Draft;
