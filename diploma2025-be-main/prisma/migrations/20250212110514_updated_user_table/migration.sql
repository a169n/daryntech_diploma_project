/*
  Warnings:

  - You are about to drop the column `certifications` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `seniorityLevel` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "certifications",
DROP COLUMN "experience",
DROP COLUMN "seniorityLevel",
DROP COLUMN "skills",
ADD COLUMN     "cv" TEXT;
