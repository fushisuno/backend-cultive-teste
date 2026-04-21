import prisma from "../config/prisma.js";

const formatPlantioDates = (plantio) => {
  const parseDate = (d) => {
    if (!d) return null;
    const dateObj = d instanceof Date ? d : new Date(d);
    return isNaN(dateObj) ? null : dateObj.toISOString();
  };

  return {
    ...plantio,
    dataInicio: parseDate(plantio.dataInicio),
    previsaoColheita: parseDate(plantio.previsaoColheita),
    dataColheita: parseDate(plantio.dataColheita),
  };
};

export const PlantioRepository = {
  findAll: async (options = {}) => {
    const plantios = await prisma.plantio.findMany({
      where: options.where ?? {},
      select: {
        id: true,
        tipoPlantacao: true,
        cultura: true,
        dataInicio: true,
        previsaoColheita: true,
        dataColheita: true,
        quantidadePlantada: true,
        unidadeMedida: true,
        observacoes: true,
        horta: {
          select: {
            id: true,
            nome: true,
            tipoSolo: true,
            areaCultivada: true,
          },
        },
      },
      take: options.take,
      skip: options.skip,
      orderBy: options.orderBy,
    });
    return plantios.map(formatPlantioDates);
  },

  findById: async (id) => {
    const plantio = await prisma.plantio.findUnique({
      where: { id },
      select: {
        id: true,
        tipoPlantacao: true,
        cultura: true,
        dataInicio: true,
        previsaoColheita: true,
        dataColheita: true,
        quantidadePlantada: true,
        unidadeMedida: true,
        observacoes: true,
        horta: {
          select: {
            id: true,
            nome: true,
            tipoSolo: true,
            areaCultivada: true,
          },
        },
      },
    });

    return plantio ? formatPlantioDates(plantio) : null;
  },

  findByHortaIds: async (hortaIds) => {
    if (!hortaIds || hortaIds.length === 0) return [];
    const plantios = await prisma.plantio.findMany({
      where: { hortaId: { in: hortaIds } },
      select: {
        id: true,
        tipoPlantacao: true,
        cultura: true,
        dataInicio: true,
        previsaoColheita: true,
        dataColheita: true,
        quantidadePlantada: true,
        unidadeMedida: true,
        observacoes: true,
        horta: {
          select: {
            id: true,
            nome: true,
            tipoSolo: true,
            areaCultivada: true,
          },
        },
      },
    });

    return plantios.map(formatPlantioDates);
  },

  create: async (data) => {
    const plantio = await prisma.plantio.create({
      data,
      select: {
        id: true,
        tipoPlantacao: true,
        cultura: true,
        dataInicio: true,
        previsaoColheita: true,
        dataColheita: true,
        quantidadePlantada: true,
        unidadeMedida: true,
        observacoes: true,
        horta: {
          select: {
            id: true,
            nome: true,
            tipoSolo: true,
            areaCultivada: true,
          },
        },
      },
    });

    return formatPlantioDates(plantio);
  },

  update: async (id, data) => {
    const plantio = await prisma.plantio.update({
      where: { id },
      data,
      select: {
        id: true,
        tipoPlantacao: true,
        cultura: true,
        dataInicio: true,
        previsaoColheita: true,
        dataColheita: true,
        quantidadePlantada: true,
        unidadeMedida: true,
        observacoes: true,
        horta: {
          select: {
            id: true,
            nome: true,
            tipoSolo: true,
            areaCultivada: true,
          },
        },
      },
    });

    return formatPlantioDates(plantio);
  },

  delete: async (id) => {
    return await prisma.plantio.delete({ where: { id } });
  },
};
