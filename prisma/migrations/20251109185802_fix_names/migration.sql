/*
  Warnings:

  - You are about to drop the column `cordenada` on the `Horta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Horta" DROP COLUMN "cordenada",
ADD COLUMN     "coordenada" TEXT;
