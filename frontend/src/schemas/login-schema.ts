import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    remember: z.boolean(),
});

export type LoginData = z.infer<typeof LoginSchema>;
