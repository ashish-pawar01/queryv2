const forbiddenPatterns = [
  /drop\s+table/i,
  /truncate\s+table/i,
  /delete\s+from/i,
  /alter\s+table/i,
  /union\s+select/i,
  /--/,
  /;/,
];

export const validateSqlInput = (value) => {
  const str = String(value);

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(str)) {
      throw new Error("Invalid SQL Input");
    }
  }

  return true;
};
