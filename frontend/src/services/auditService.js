import api from "./api";

export const getAuditLogs = async () => {
  const { data } = await api.get("/audit");
  return data;
};