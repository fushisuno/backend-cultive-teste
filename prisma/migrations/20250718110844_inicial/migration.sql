-- CreateEnum
CREATE TYPE "EUser" AS ENUM ('ADMIN', 'GERENTE', 'FAMILIA');

-- CreateEnum
CREATE TYPE "EHorta" AS ENUM ('ESCOLAR', 'COMUNITARIA', 'INSTITUCIONAL', 'ONG');

-- CreateTable
CREATE TABLE "Teste" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "telefone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "foto" TEXT,
    "telefone" TEXT,
    "tipo" "EUser" NOT NULL,
    "dataAdesao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Familia" (
    "familiaId" TEXT NOT NULL,
    "nomeGrupo" TEXT NOT NULL,
    "representante" TEXT NOT NULL,
    "habilidades" TEXT,
    "qtdMembros" INTEGER NOT NULL,
    "gerenteId" TEXT NOT NULL,
    "observacoes" TEXT,
    "onBoarding" BOOLEAN NOT NULL DEFAULT false,
    "dataAdesao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Familia_pkey" PRIMARY KEY ("familiaId")
);

-- CreateTable
CREATE TABLE "Gerente" (
    "gerenteId" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "entidadeResponsavel" TEXT NOT NULL,
    "observacoes" TEXT,
    "onBoarding" BOOLEAN NOT NULL,
    "data_adesao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gerente_pkey" PRIMARY KEY ("gerenteId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "observacoes" TEXT,
    "onBoarding" BOOLEAN NOT NULL,
    "dataAdesao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Horta" (
    "hortaId" TEXT NOT NULL,
    "nomeHorta" TEXT NOT NULL,
    "enderecoHorta" TEXT NOT NULL,
    "cordenadaGpsHorta" TEXT NOT NULL,
    "areaCultivada" DECIMAL(65,30) NOT NULL,
    "tipoSolo" TEXT NOT NULL,
    "tipoHorta" "EHorta" NOT NULL,
    "observacoes" TEXT,
    "familiaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Horta_pkey" PRIMARY KEY ("hortaId")
);

-- CreateTable
CREATE TABLE "Plantio" (
    "plantioId" TEXT NOT NULL,
    "culturaPlantio" TEXT NOT NULL,
    "tipoPlantacao" TEXT NOT NULL,
    "dataPlantio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "previsaoColheita" TIMESTAMP(3) NOT NULL,
    "tipoManejo" TEXT NOT NULL,
    "quantidadePlantada" DECIMAL(65,30) NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "observacoes" TEXT,
    "hortaId" TEXT NOT NULL,
    "colheitaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plantio_pkey" PRIMARY KEY ("plantioId")
);

-- CreateTable
CREATE TABLE "Colheita" (
    "colheitaId" TEXT NOT NULL,
    "culturaColheita" TEXT NOT NULL,
    "dataColheita" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantidadeColhida" DECIMAL(65,30) NOT NULL,
    "unidadeMedida" TEXT NOT NULL,
    "destinoColheita" TEXT NOT NULL,
    "plantioId" TEXT NOT NULL,
    "familiaId" TEXT,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Colheita_pkey" PRIMARY KEY ("colheitaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_key" ON "Usuario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Familia_familiaId_key" ON "Familia"("familiaId");

-- CreateIndex
CREATE UNIQUE INDEX "Gerente_gerenteId_key" ON "Gerente"("gerenteId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_adminId_key" ON "Admin"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Plantio_colheitaId_key" ON "Plantio"("colheitaId");

-- CreateIndex
CREATE UNIQUE INDEX "Colheita_plantioId_key" ON "Colheita"("plantioId");

-- AddForeignKey
ALTER TABLE "Familia" ADD CONSTRAINT "Familia_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Familia" ADD CONSTRAINT "Familia_gerenteId_fkey" FOREIGN KEY ("gerenteId") REFERENCES "Gerente"("gerenteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gerente" ADD CONSTRAINT "Gerente_gerenteId_fkey" FOREIGN KEY ("gerenteId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horta" ADD CONSTRAINT "Horta_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia"("familiaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plantio" ADD CONSTRAINT "Plantio_hortaId_fkey" FOREIGN KEY ("hortaId") REFERENCES "Horta"("hortaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Colheita" ADD CONSTRAINT "Colheita_plantioId_fkey" FOREIGN KEY ("plantioId") REFERENCES "Plantio"("plantioId") ON DELETE CASCADE ON UPDATE CASCADE;
