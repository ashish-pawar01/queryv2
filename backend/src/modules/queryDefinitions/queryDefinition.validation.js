import { z } from "zod";

export const createQueryDefinitionSchema =
  z.object({
    name: z.string().min(1),

    description: z.string().optional(),

    category: z.string(),

    module: z.string(),

    queryType: z.enum([
      "MANUAL",
      "AUTO_INSERT",
      "AUTO_UPDATE",
      "AUTO_DELETE",
      "HYBRID"
    ]),

    targetTable: z.string(),

    manualSql: z.string().optional(),

    fields: z.array(z.any()),

    conditions: z.array(z.any())
  });