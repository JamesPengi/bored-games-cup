import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Player = {
  id: string;
  name: string;
  teamId: string;
};

const playerData: Player[] = [
  {
    id: '177880723468845057',
    name: 'Speedy',
    teamId: 'cl8ke5kw300003n6l0w7npbjx',
  },
  {
    id: '330047548507160576',
    name: 'Alex',
    teamId: 'cl8ke5kw300003n6l0w7npbjx',
  },
  {
    id: '315488234085810176',
    name: 'IXR',
    teamId: 'cl8ke5kw300003n6l0w7npbjx',
  },
  {
    id: '143220069684477952',
    name: 'Jakku',
    teamId: 'cl8ke5kw300003n6l0w7npbjx',
  },
  {
    id: '156234699533058048',
    name: 'Pengi',
    teamId: 'cl8ke5kw300003n6l0w7npbjx',
  },
  {
    id: '147810755859709952',
    name: 'Trentawn',
    teamId: 'cl8ke5kw300013n6lv9h9usi4',
  },
  {
    id: '487995889235787797',
    name: 'dhivz',
    teamId: 'cl8ke5kw300013n6lv9h9usi4',
  },
  {
    id: '196454640311599118',
    name: 'boba everyday',
    teamId: 'cl8ke5kw300013n6lv9h9usi4',
  },
  {
    id: '359843453187915776',
    name: 'Vivid',
    teamId: 'cl8ke5kw300013n6lv9h9usi4',
  },
  {
    id: '143577267333758977',
    name: 'kayisdabomb',
    teamId: 'cl8ke5kw300013n6lv9h9usi4',
  },
  {
    id: '259794754542239744',
    name: 'aldemious',
    teamId: 'cl8ke5kw300023n6lo9bqia0k',
  },
  {
    id: '187426696968798208',
    name: 'Pastel Pat',
    teamId: 'cl8ke5kw300023n6lo9bqia0k',
  },
  {
    id: '149282836522729472',
    name: 'VVI11',
    teamId: 'cl8ke5kw300023n6lo9bqia0k',
  },
  {
    id: '359851316371259393',
    name: 'ShatteredRelic',
    teamId: 'cl8ke5kw300023n6lo9bqia0k',
  },
  {
    id: '143379073006043136',
    name: 'KingdeG',
    teamId: 'cl8ke5kw300023n6lo9bqia0k',
  },
  {
    id: '287429580351078403',
    name: 'azinar',
    teamId: 'cl8ke5kw300033n6lw3qlouyk',
  },
  {
    id: '235943892191674369',
    name: 'Taranis',
    teamId: 'cl8ke5kw300033n6lw3qlouyk',
  },
  {
    id: '127490133208334336',
    name: 'Skeletastic',
    teamId: 'cl8ke5kw300033n6lw3qlouyk',
  },
  {
    id: '211843613947068416',
    name: 'ShadesOfRay',
    teamId: 'cl8ke5kw300033n6lw3qlouyk',
  },
  {
    id: '209827902622138368',
    name: 'LordSnow42',
    teamId: 'cl8ke5kw300033n6lw3qlouyk',
  },
  {
    id: '331617023824232458',
    name: 'dunreadmyname',
    teamId: 'cla9ra33t0008169dh417lo6q',
  },
  {
    id: '342883982767030293',
    name: 'CritRole',
    teamId: 'cla9ra33t0008169dh417lo6q',
  },
  {
    id: '359843935914295298',
    name: 'PANDA',
    teamId: 'cla9ra33t0008169dh417lo6q',
  },
  {
    id: '178987974002868224',
    name: 'TTT',
    teamId: 'cla9ra33t0008169dh417lo6q',
  },
  {
    id: '287643384301092864',
    name: 'Aminta',
    teamId: 'cla9ra33t0008169dh417lo6q',
  },
];

async function main() {
  playerData.forEach(async (player) => {
    await prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: 'discord',
          providerAccountId: player.id,
        },
      },
      create: {
        provider: 'discord',
        providerAccountId: player.id,
        type: 'oauth',
        user: {
          connectOrCreate: {
            where: { name: player.name },
            create: {
              name: player.name,
              teamId: player.teamId,
            },
          },
        },
      },
      update: {
        user: {
          update: {
            name: player.name,
            teamId: player.teamId,
          },
        },
      },
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
