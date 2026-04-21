/*
  Warnings:

  - You are about to drop the column `onBoarding` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `onBoarding` on the `Familia` table. All the data in the column will be lost.
  - You are about to drop the column `onBoarding` on the `Gerente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "onBoarding";

-- AlterTable
ALTER TABLE "Familia" DROP COLUMN "onBoarding";

-- AlterTable
ALTER TABLE "Gerente" DROP COLUMN "onBoarding";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "onBoarding" BOOLEAN NOT NULL DEFAULT false;
