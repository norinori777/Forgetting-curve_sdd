import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const presetDefault = await prisma.reviewPreset.upsert({
    where: { name: "Default" },
    update: { intervalsDays: [0, 1, 3, 7, 14, 30] },
    create: {
      name: "Default",
      intervalsDays: [0, 1, 3, 7, 14, 30],
    },
  });

  await prisma.reviewPreset.upsert({
    where: { name: "Intensive" },
    update: { intervalsDays: [0, 1, 2, 4, 7] },
    create: {
      name: "Intensive",
      intervalsDays: [0, 1, 2, 4, 7],
    },
  });

  await prisma.settings.upsert({
    where: { id: 1 },
    update: { activeReviewPresetId: presetDefault.id },
    create: { id: 1, activeReviewPresetId: presetDefault.id },
  });
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
