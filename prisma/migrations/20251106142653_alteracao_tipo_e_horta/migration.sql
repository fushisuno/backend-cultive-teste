/*
  Warnings:

  - The values [escolar,comunitaria,institucional,ong] on the enum `EHorta` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EHorta_new" AS ENUM ('Escolar', 'Comunitaria', 'Institucional', 'Ong', 'Familiar');
ALTER TABLE "Horta" ALTER COLUMN "tipoHorta" TYPE "EHorta_new" USING ("tipoHorta"::text::"EHorta_new");
ALTER TYPE "EHorta" RENAME TO "EHorta_old";
ALTER TYPE "EHorta_new" RENAME TO "EHorta";
DROP TYPE "public"."EHorta_old";
COMMIT;
