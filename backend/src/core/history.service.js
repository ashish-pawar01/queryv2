import QueryHistory from "../modules/history/queryHistory.model.js";

export const createHistory = async ({
  user,
  queryDefinition,
  queryName,
  inputs,
  generatedSql,
}) => {
  return QueryHistory.create({
    user,
    queryDefinition,
    queryName,
    inputs,
    generatedSql,
  });
};
