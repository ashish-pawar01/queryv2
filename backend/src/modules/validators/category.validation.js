import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2),

  code: z.string().min(2),

  description: z.string().optional(),
});
