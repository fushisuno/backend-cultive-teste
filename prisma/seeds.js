import { PrismaClient } from "@prisma/client"; // { PrismaClient }

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // ------------------------------
  // USUÁRIOS
  // ------------------------------
  await prisma.usuario.createMany({
    data: [
      {
        id: "u-admin-001",
        email: "admin@sistema.com",
        senhaHash: "hash_admin",
        telefone: "44999990000",
        nome: "Administrador Geral",
        username: "admin",
        role: "admin",
        onBoarding: true,
      },
      {
        id: "u-gestor-001",
        email: "gestor@hortas.com",
        senhaHash: "hash_gestor",
        telefone: "44988887777",
        nome: "Maria Silva",
        username: "maria.gestor",
        role: "gestor",
        onBoarding: true,
      },
      {
        id: "u-cult-001",
        email: "joao@hortas.com",
        senhaHash: "hash_cult",
        telefone: "44977776666",
        nome: "João Barbosa",
        username: "joao.cult",
        role: "cultivador",
        onBoarding: true,
        familiaId: "fam-001",
      },
      {
        id: "u-vol-001",
        email: "ana@voluntaria.com",
        senhaHash: "hash_vol",
        telefone: "44966665555",
        nome: "Ana Oliveira",
        username: "ana.vol",
        role: "voluntario",
        onBoarding: true,
      },
    ],
  });

  // ------------------------------
  // PERFIS
  // ------------------------------

  await prisma.perfilAdmin.create({
    data: {
      id: "p-admin-001",
      cargo: "Administrador Geral",
      ativo: true,
      usuarioId: "u-admin-001",
    },
  });

  await prisma.perfilGestor.create({
    data: {
      id: "p-gestor-001",
      usuarioId: "u-gestor-001",
      cargo: "Gestora Comunitária",
      organizacaoVinculada: "Associação Verde Viva",
      recebeAlertas: true,
    },
  });

  await prisma.perfilCultivador.create({
    data: {
      id: "p-cult-001",
      usuarioId: "u-cult-001",
      tipoExperiencia: "Horta caseira",
      habilidades: "Plantio de verduras",
      plantasFavoritas: "Alface, cenoura",
    },
  });

  await prisma.perfilVoluntario.create({
    data: {
      id: "p-vol-001",
      usuarioId: "u-vol-001",
      interesse: "Ajudar na colheita",
      disponivel: true,
    },
  });

  // ------------------------------
  // DISPONIBILIDADE
  // ------------------------------

  await prisma.disponibilidade.create({
    data: {
      id: "disp-001",
      usuarioId: "u-vol-001",
      diaSemana: "SAB",
      horarioIni: new Date("2025-01-01T08:00:00.000Z"),
      horarioFim: new Date("2025-01-01T12:00:00.000Z"),
      perfilVoluntarioId: "p-vol-001",
    },
  });

  // ------------------------------
  // FAMÍLIA
  // ------------------------------

  await prisma.familia.create({
    data: {
      id: "fam-001",
      nome: "Família Barbosa",
      representante: "João Barbosa",
      qtdMembros: 4,
      descricao: "Família tradicional do bairro.",
      gestorId: "u-gestor-001",
    },
  });

  // ------------------------------
  // HORTA
  // ------------------------------

  await prisma.horta.create({
    data: {
      id: "horta-001",
      nome: "Horta Comunitária Central",
      areaCultivada: 120.5,
      tipoSolo: "Argiloso",
      tipoHorta: "comunitaria",
      endereco: "Rua Principal, 123",
      descricao: "Horta comunitária da região central.",
      gestorId: "u-gestor-001",
      familiaId: "fam-001",
    },
  });

  // ------------------------------
  // PLANTIO
  // ------------------------------

  await prisma.plantio.create({
    data: {
      id: "plantio-001",
      tipoPlantacao: "Alface Crespa",
      previsaoColheita: new Date("2025-02-20T00:00:00.000Z"),
      quantidadePlantada: 200,
      unidadeMedida: "mudas",
      hortaId: "horta-001",
      cultura: "Alface",
      dataInicio: new Date("2025-01-15T00:00:00.000Z"),
    },
  });

  // ------------------------------
  // COLHEITA
  // ------------------------------

  await prisma.colheita.create({
    data: {
      id: "colheita-001",
      dataColheita: new Date("2025-02-18T00:00:00.000Z"),
      quantidadeColhida: 180,
      unidadeMedida: "mudas",
      destinoColheita: "Distribuição comunitária",
      plantioId: "plantio-001",
      cultura: "Alface",
    },
  });

  // ------------------------------
  // AVISO
  // ------------------------------

  await prisma.aviso.create({
    data: {
      id: "aviso-001",
      titulo: "Reunião de organização",
      descricao: "Reunião extraordinária no sábado.",
      dataEvento: new Date("2025-01-10T14:00:00.000Z"),
      familiaId: "fam-001",
    },
  });

  // ------------------------------
  // NOTIFICAÇÃO
  // ------------------------------

  await prisma.notificacao.create({
    data: {
      id: "notif-001",
      usuarioId: "u-cult-001",
      titulo: "Plantio próximo da colheita",
      mensagem: "O plantio de alface está próximo da data prevista!",
    },
  });

  // ------------------------------
  // LOG
  // ------------------------------

  await prisma.log.create({
    data: {
      id: "log-001",
      usuarioId: "u-gestor-001",
      acao: "Criou nova horta",
      contexto: "Horta Comunitária Central",
    },
  });

  // ------------------------------
  // FAQ
  // ------------------------------

  await prisma.faq.create({
    data: {
      id: "faq-001",
      pergunta: "Como participar da horta comunitária?",
      resposta: "Você pode se cadastrar como voluntário na plataforma.",
      categoria: "Participação",
      ordem: 1,
    },
  });

  console.log("🌱 Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
