import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const teams = [
  { id: 'cl8ke5kw300003n6l0w7npbjx', name: 'Smile' },
  { id: 'cl8ke5kw300013n6lv9h9usi4', name: 'Yawn' },
  { id: 'cl8ke5kw300023n6lo9bqia0k', name: 'Wide Eyed' },
  { id: 'cl8ke5kw300033n6lw3qlouyk', name: 'Wink' },
  { id: 'cla9ra33t0008169dh417lo6q', name: 'Pout' },
];

async function main() {
  teams.forEach(async (team) => {
    await prisma.team.upsert({
      where: { id: team.id },
      create: { name: team.name },
      update: { name: team.name },
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
