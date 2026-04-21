/*
  Warnings:

  - Added the required column `updatedAt` to the `Colheita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Disponibilidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Familia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Horta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notificacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PerfilAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PerfilCultivador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PerfilGestor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PerfilVoluntario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Plantio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aviso" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Colheita" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Disponibilidade" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Familia" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Horta" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Notificacao" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PerfilAdmin" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PerfilCultivador" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PerfilGestor" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PerfilVoluntario" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Plantio" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
