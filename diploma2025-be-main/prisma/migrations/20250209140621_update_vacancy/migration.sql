/*
  Warnings:

  - You are about to drop the column `deadline` on the `vacancies` table. All the data in the column will be lost.
  - Added the required column `location` to the `vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxSalary` to the `vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minSalary` to the `vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `vacancies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vacancies" DROP COLUMN "deadline",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "maxSalary" TEXT NOT NULL,
ADD COLUMN     "minSalary" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT[],
ADD COLUMN     "type" TEXT NOT NULL;
