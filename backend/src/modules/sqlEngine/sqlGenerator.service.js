import { escapeSqlValue } from "../../core/sqlEscape.js";

const generateManualSql = (queryDefinition, payload) => {
  let sql = queryDefinition.manualSql;

  Object.entries(payload).forEach(([key, value]) => {
    sql = sql.replaceAll(`{{${key}}}`, escapeSqlValue(value));
  });

  return sql;
};

const generateInsertSql = (queryDefinition, payload) => {
  const columns = [];

  const values = [];

  queryDefinition.fields.forEach((field) => {
    if (payload[field.fieldKey] !== undefined) {
      columns.push(field.dbColumn);

      values.push(escapeSqlValue(payload[field.fieldKey]));
    }
  });

  if (!columns.length) {
    throw new Error("No fields supplied for insert");
  }

  return `
INSERT INTO ${queryDefinition.targetTable}
(
${columns.join(",")}
)
VALUES
(
${values.join(",")}
);
`;
};

const generateUpdateSql = (queryDefinition, payload) => {
  const setClause = [];

  queryDefinition.fields.forEach((field) => {
    const value = payload[field.fieldKey];

    if (value !== undefined) {
      setClause.push(`${field.dbColumn}=${escapeSqlValue(value)}`);
    }
  });

  const whereClause = [];

  queryDefinition.conditions.forEach((condition) => {
    const value = payload[condition.fieldKey];

    if (value !== undefined) {
      whereClause.push(
        `${condition.dbColumn} ${condition.operator} ${escapeSqlValue(value)}`,
      );
    }
  });
  if (!whereClause.length) {
    throw new Error("Update query requires at least one condition");
  }
  if (!setClause.length) {
    throw new Error("No update fields supplied");
  }

  return `
UPDATE ${queryDefinition.targetTable}
SET
${setClause.join(",")}

WHERE

${whereClause.join(" AND ")};
`;
};

const generateDeleteSql = (queryDefinition, payload) => {
  const whereClause = [];

  queryDefinition.conditions.forEach((condition) => {
    const value = payload[condition.fieldKey];

    if (value !== undefined) {
      whereClause.push(
        `${condition.dbColumn} ${condition.operator} ${escapeSqlValue(value)}`,
      );
    }
  });
  if (!whereClause.length) {
    throw new Error("Delete query requires at least one condition");
  }

  return `
DELETE FROM ${queryDefinition.targetTable}

WHERE

${whereClause.join(" AND ")};
`;
};

const generateHybridSql = (queryDefinition, payload) => {
  const setClause = [];

  queryDefinition.fields.forEach((field) => {
    const value = payload[field.fieldKey];

    if (value !== undefined && value !== "") {
      setClause.push(`${field.dbColumn}=${escapeSqlValue(value)}`);
    }
  });

  const whereClause = [];

  queryDefinition.conditions.forEach((condition) => {
    const value = payload[condition.fieldKey];

    if (value !== undefined) {
      whereClause.push(
        `${condition.dbColumn} ${condition.operator} ${escapeSqlValue(value)}`,
      );
    }
  });

  return `
UPDATE ${queryDefinition.targetTable}

SET

${setClause.join(",")}

WHERE

${whereClause.join(" AND ")};
`;
};

export const generateSql = (queryDefinition, payload) => {
  switch (queryDefinition.queryType) {
    case "MANUAL":
      return generateManualSql(queryDefinition, payload);

    case "AUTO_INSERT":
      return generateInsertSql(queryDefinition, payload);

    case "AUTO_UPDATE":
      return generateUpdateSql(queryDefinition, payload);

    case "AUTO_DELETE":
      return generateDeleteSql(queryDefinition, payload);

    case "HYBRID":
      return generateHybridSql(queryDefinition, payload);

    default:
      throw new Error("Unsupported Query Type");
  }
};
