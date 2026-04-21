/*
  Warnings:

  - The values [Escolar,Comunitaria,Institucional,Ong,Familiar] on the enum `EHorta` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EHorta_new" AS ENUM ('escolar', 'comunitaria', 'institucional', 'ong', 'familiar');
ALTER TABLE "Horta" ALTER COLUMN "tipoHorta" TYPE "EHorta_new" USING ("tipoHorta"::text::"EHorta_new");
ALTER TYPE "EHorta" RENAME TO "EHorta_old";
ALTER TYPE "EHorta_new" RENAME TO "EHorta";
DROP TYPE "public"."EHorta_old";
COMMIT;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);
