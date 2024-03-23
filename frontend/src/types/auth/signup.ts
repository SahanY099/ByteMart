import { z } from "zod";

import { SignupSchema } from "@/schemas/auth/signup-schema";

export type SignupData = z.infer<typeof SignupSchema>;
