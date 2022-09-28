import { z } from 'zod';
import { createRouter } from './context';

export const gameRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx: { prisma } }) {
      return prisma.game.findMany({
        orderBy: { createdAt: 'desc' },
      });
    },
  })
  .query('getById', {
    input: z.string().cuid(),
    async resolve({ input, ctx: { prisma } }) {
      return await prisma.game.findUnique({
        where: { id: input },
      });
    },
  })
  .mutation('create', {
    input: z.object({
      blueTeamId: z.string().cuid(),
      redTeamId: z.string().cuid(),
    }),
    async resolve({ input, ctx: { prisma } }) {
      const { id: gameId } = await prisma.game.create({
        data: {
          blueTeamId: input.blueTeamId,
          redTeamId: input.redTeamId,
        },
      });

      return gameId;
    },
  });
