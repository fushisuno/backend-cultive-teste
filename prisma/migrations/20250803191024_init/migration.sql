/*
  Warnings:

  - The values [ESCOLAR,COMUNITARIA,INSTITUCIONAL,ONG] on the enum `EHorta` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Colheita` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `colheitaId` on the `Colheita` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Colheita` table. All the data in the column will be lost.
  - You are about to drop the column `culturaColheita` on the `Colheita` table. All the data in the column will be lost.
  - You are about to drop the column `familiaId` on the `Colheita` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Colheita` table. All the data in the column will be lost.
  - The primary key for the `Familia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dataAdesao` on the `Familia` table. All the data in the column will be lost.
  - You are about to drop the column `familiaId` on the `Familia` table. All the data in the column will be lost.
  - You are about to drop the column `gerenteId` on the `Familia` table. All the data in the column will be lost.
  - You are about to drop the column `habilidades` on the `Familia` table. All the data in the column will be lost.
  - You are about to drop the column `nomeGrupo` on the `Familia` table. All the data in the column will be lost.
  - You are about to drop the column `observacoes` on the `Familia` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Familia` table. All the data in the column will be lost.
  - The primary key for the `Horta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cordenadaGpsHorta` on the `Horta` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Horta` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoHorta` on the `Horta` table. All the data in the column will be lost.
  - You are about to drop the column `hortaId` on the `Horta` table. All the data in the column will be lost.
  - You are about to drop the column `nomeHorta` on the `Horta` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Horta` table. All the data in the column will be lost.
  - The primary key for the `Plantio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Plantio` table. All the data in the column will be lost.
  - You are about to drop the column `culturaPlantio` on the `Plantio` table. All the data in the column will be lost.
  - You are about to drop the column `dataPlantio` on the `Plantio` table. All the data in the column will be lost.
  - You are about to drop the column `plantioId` on the `Plantio` table. All the data in the column will be lost.
  - You are about to drop the column `tipoManejo` on the `Plantio` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Plantio` table. All the data in the column will be lost.
  - You are about to drop the column `dataAdesao` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nomeCompleto` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gerente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teste` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cultura` to the `Colheita` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Colheita` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `gestorId` to the `Familia` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Familia` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nome` to the `Familia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cordenada` to the `Horta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endereco` to the `Horta` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Horta` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `nome` to the `Horta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cultura` to the `Plantio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataInicio` to the `Plantio` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Plantio` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `username` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'gestor', 'voluntario', 'cultivador');

-- CreateEnum
CREATE TYPE "DiaSemana" AS ENUM ('DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB');

-- AlterEnum
BEGIN;
CREATE TYPE "EHorta_new" AS ENUM ('escolar', 'comunitaria', 'institucional', 'ong');
ALTER TABLE "Horta" ALTER COLUMN "tipoHorta" TYPE "EHorta_new" USING ("tipoHorta"::text::"EHorta_new");
ALTER TYPE "EHorta" RENAME TO "EHorta_old";
ALTER TYPE "EHorta_new" RENAME TO "EHorta";
DROP TYPE "EHorta_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Colheita" DROP CONSTRAINT "Colheita_plantioId_fkey";

-- DropForeignKey
ALTER TABLE "Familia" DROP CONSTRAINT "Familia_familiaId_fkey";

-- DropForeignKey
ALTER TABLE "Familia" DROP CONSTRAINT "Familia_gerenteId_fkey";

-- DropForeignKey
ALTER TABLE "Gerente" DROP CONSTRAINT "Gerente_gerenteId_fkey";

-- DropForeignKey
ALTER TABLE "Horta" DROP CONSTRAINT "Horta_familiaId_fkey";

-- DropForeignKey
ALTER TABLE "Plantio" DROP CONSTRAINT "Plantio_hortaId_fkey";

-- DropIndex
DROP INDEX "Familia_familiaId_key";

-- DropIndex
DROP INDEX "Usuario_id_key";

-- AlterTable
ALTER TABLE "Colheita" DROP CONSTRAINT "Colheita_pkey",
DROP COLUMN "colheitaId",
DROP COLUMN "createdAt",
DROP COLUMN "culturaColheita",
DROP COLUMN "familiaId",
DROP COLUMN "updatedAt",
ADD COLUMN     "cultura" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Colheita_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Familia" DROP CONSTRAINT "Familia_pkey",
DROP COLUMN "dataAdesao",
DROP COLUMN "familiaId",
DROP COLUMN "gerenteId",
DROP COLUMN "habilidades",
DROP COLUMN "nomeGrupo",
DROP COLUMN "observacoes",
DROP COLUMN "updatedAt",
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "gestorId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD CONSTRAINT "Familia_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Horta" DROP CONSTRAINT "Horta_pkey",
DROP COLUMN "cordenadaGpsHorta",
DROP COLUMN "createdAt",
DROP COLUMN "enderecoHorta",
DROP COLUMN "hortaId",
DROP COLUMN "nomeHorta",
DROP COLUMN "updatedAt",
ADD COLUMN     "cordenada" TEXT NOT NULL,
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "endereco" TEXT NOT NULL,
ADD COLUMN     "gestorId" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ALTER COLUMN "familiaId" DROP NOT NULL,
ADD CONSTRAINT "Horta_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Plantio" DROP CONSTRAINT "Plantio_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "culturaPlantio",
DROP COLUMN "dataPlantio",
DROP COLUMN "plantioId",
DROP COLUMN "tipoManejo",
DROP COLUMN "updatedAt",
ADD COLUMN     "cultura" TEXT NOT NULL,
ADD COLUMN     "dataColheita" TIMESTAMP(3),
ADD COLUMN     "dataInicio" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Plantio_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "dataAdesao",
DROP COLUMN "foto",
DROP COLUMN "nomeCompleto",
DROP COLUMN "tipo",
ADD COLUMN     "endereco" TEXT,
ADD COLUMN     "familiaId" TEXT,
ADD COLUMN     "nome" TEXT,
ADD COLUMN     "pictureUrl" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'cultivador',
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Gerente";

-- DropTable
DROP TABLE "Teste";

-- DropEnum
DROP TYPE "EUser";

-- CreateTable
CREATE TABLE "PerfilGestor" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cargo" TEXT,
    "recebeAlertas" BOOLEAN NOT NULL DEFAULT true,
    "organizacaoVinculada" TEXT NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "PerfilGestor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disponibilidade" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "diaSemana" "DiaSemana" NOT NULL,
    "horarioIni" TIMESTAMP(3) NOT NULL,
    "horarioFim" TIMESTAMP(3) NOT NULL,
    "perfilVoluntarioId" TEXT,

    CONSTRAINT "Disponibilidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfilVoluntario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "interesse" TEXT,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "observacoes" TEXT,

    CONSTRAINT "PerfilVoluntario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfilCultivador" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipoExperiencia" TEXT,
    "habilidades" TEXT,
    "plantasFavoritas" TEXT,
    "observacoes" TEXT,

    CONSTRAINT "PerfilCultivador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfilAdmin" (
    "id" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "observacoes" TEXT,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "PerfilAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aviso" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataEvento" TIMESTAMP(3) NOT NULL,
    "familiaId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aviso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "contexto" TEXT,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "categoria" TEXT,
    "ordem" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PerfilGestor_usuarioId_key" ON "PerfilGestor"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Disponibilidade_usuarioId_key" ON "Disponibilidade"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilVoluntario_usuarioId_key" ON "PerfilVoluntario"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilCultivador_usuarioId_key" ON "PerfilCultivador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilAdmin_id_key" ON "PerfilAdmin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilAdmin_usuarioId_key" ON "PerfilAdmin"("usuarioId");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilGestor" ADD CONSTRAINT "PerfilGestor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disponibilidade" ADD CONSTRAINT "Disponibilidade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disponibilidade" ADD CONSTRAINT "Disponibilidade_perfilVoluntarioId_fkey" FOREIGN KEY ("perfilVoluntarioId") REFERENCES "PerfilVoluntario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilVoluntario" ADD CONSTRAINT "PerfilVoluntario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilCultivador" ADD CONSTRAINT "PerfilCultivador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilAdmin" ADD CONSTRAINT "PerfilAdmin_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Familia" ADD CONSTRAINT "Familia_gestorId_fkey" FOREIGN KEY ("gestorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horta" ADD CONSTRAINT "Horta_gestorId_fkey" FOREIGN KEY ("gestorId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horta" ADD CONSTRAINT "Horta_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plantio" ADD CONSTRAINT "Plantio_hortaId_fkey" FOREIGN KEY ("hortaId") REFERENCES "Horta"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colheita" ADD CONSTRAINT "Colheita_plantioId_fkey" FOREIGN KEY ("plantioId") REFERENCES "Plantio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aviso" ADD CONSTRAINT "Aviso_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
