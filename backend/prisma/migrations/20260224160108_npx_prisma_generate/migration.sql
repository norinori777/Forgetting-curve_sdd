-- CreateEnum
CREATE TYPE "ReviewResult" AS ENUM ('success', 'failure');

-- CreateTable
CREATE TABLE "LearningItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewSchedule" (
    "learningItemId" TEXT NOT NULL,
    "dueOn" DATE NOT NULL,
    "stage" INTEGER NOT NULL DEFAULT 0,
    "lastReviewedOn" DATE,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewSchedule_pkey" PRIMARY KEY ("learningItemId")
);

-- CreateTable
CREATE TABLE "ReviewEvent" (
    "id" TEXT NOT NULL,
    "learningItemId" TEXT NOT NULL,
    "reviewedOn" DATE NOT NULL,
    "result" "ReviewResult" NOT NULL,
    "difficulty" INTEGER,
    "memo" TEXT,
    "scheduledDueOn" DATE NOT NULL,
    "scheduledStage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewPreset" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "intervalsDays" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReviewPreset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "activeReviewPresetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReviewEvent_learningItemId_idx" ON "ReviewEvent"("learningItemId");

-- CreateIndex
CREATE INDEX "ReviewEvent_reviewedOn_idx" ON "ReviewEvent"("reviewedOn");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewPreset_name_key" ON "ReviewPreset"("name");

-- AddForeignKey
ALTER TABLE "ReviewSchedule" ADD CONSTRAINT "ReviewSchedule_learningItemId_fkey" FOREIGN KEY ("learningItemId") REFERENCES "LearningItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewEvent" ADD CONSTRAINT "ReviewEvent_learningItemId_fkey" FOREIGN KEY ("learningItemId") REFERENCES "LearningItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_activeReviewPresetId_fkey" FOREIGN KEY ("activeReviewPresetId") REFERENCES "ReviewPreset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
