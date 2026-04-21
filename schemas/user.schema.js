import z from "zod";

export const baseSchema = z.object({
  telefone: z.string().min(8, "Telefone inválido").optional(),
  endereco: z.string().min(4, "Endereço muito curto").optional(),
  pictureUrl: z.string().url("URL da imagem inválida").optional(),
});

export const usuarioSchema = z
  .object({
    nome: z
      .string()
      .min(2, "O nome deve ter pelo menos 2 caracteres")
      .optional(),
    username: z
      .string()
      .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
      .optional(),
    email: z.string().email("E-mail inválido").optional(),
    telefone: z
      .string()
      .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido")
      .optional()
      .nullable(),
    endereco: z
      .string()
      .min(5, "Endereço muito curto")
      .max(255, "Endereço muito longo")
      .optional()
      .nullable(),
    familiaId: z.string().uuid("ID de família inválido").optional().nullable(),
    pictureUrl: z.string().url("URL inválida").optional().nullable(),
    role: z.enum(["admin", "gestor", "cultivador", "voluntario"]).optional(),
    onBoarding: z.boolean().optional(),
  })
  .transform((data) => ({
    ...data,
    nome: data.nome || data.name,
  }));

export const profileAdminSchema = z.object({
  cargo: z.string().min(2, "Cargo inválido"),
  ativo: z.boolean().optional().default(true),
  observacoes: z.string().optional(),
});

export const profileGestorSchema = z.object({
  cargo: z.string().min(2, "Cargo inválido"),
  organizacaoVinculada: z.string().min(2, "Organização obrigatória"),
  recebeAlertas: z.boolean().optional(),
  observacoes: z.string().optional(),
});

export const profileCultivadorSchema = z.object({
  tipoExperiencia: z.string().optional(),
  habilidades: z.string().optional(),
  plantasFavoritas: z.string().optional(),
  observacoes: z.string().optional(),
});

export const profileVoluntarioSchema = z.object({
  interesse: z.string().optional(),
  disponivel: z.boolean().optional(),
  observacoes: z.string().optional(),
});
