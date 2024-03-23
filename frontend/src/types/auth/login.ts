import { z } from "zod";

import { LoginSchema } from "@/schemas/auth/login-schema";

export type LoginData = z.infer<typeof LoginSchema>;
