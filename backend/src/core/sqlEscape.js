import { validateSqlInput } from "./sqlValidator.js";

export const escapeSqlValue = (value) => {
  validateSqlInput(value);

  if (value === null || value === undefined) {
    return "NULL";
  }

  if (typeof value === "number") {
    return value;
  }

  return `'${String(value).replace(/'/g, "''")}'`;
};
