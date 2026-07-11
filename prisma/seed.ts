import 'dotenv/config';
import { faker } from '@faker-js/faker';

import { prisma } from '../src/lib/prisma';

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: faker.person.fullName(),
      email: 'demo@example.com',
      emailVerified: true,
    },
  });

  console.log(`Seeded user: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
