/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const SALT_ROUND = 11;
const prisma = new PrismaClient();
async function main() {
  console.log(`Start seeding ...`);
  console.log(`==============> SEEDING User <===============`);

  const password = await bcrypt.hash('admin123', SALT_ROUND);
  await prisma.user.createManyAndReturn({
    data: [
      {
        email: 'admin@gmail.com',
        name: 'ADMIN',
        password,
      },
    ],
  });

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
