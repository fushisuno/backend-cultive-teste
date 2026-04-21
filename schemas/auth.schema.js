import { string, z } from "zod";

export const signupSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  username: z.string().min(3, "O username deve ter pelo menos 3"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const loginSchema = z
  .object({
    username: z.string().min(3, "O username deve ter pelo menos 3").optional(),
    email: z.string().email("E-mail inválido").optional(),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.email || data.username, {
    message: "Informe o e-mail ou o username",
    path: ["email"], // onde o erro vai aparecer (pode ser 'username' também)
  });
