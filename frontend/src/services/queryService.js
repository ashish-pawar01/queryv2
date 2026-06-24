import api from "./api";

export const getQueries = async () => {
  const { data } = await api.get("/query-definitions");

  return data;
};

export const getQueryById = async (id) => {
  const { data } = await api.get(`/query-definitions/${id}`);

  return data;
};

export const createQuery = async (payload) => {
  const { data } = await api.post("/query-definitions", payload);

  return data;
};

export const updateQuery = async ({ id, payload }) => {
  const { data } = await api.put(`/query-definitions/${id}`, payload);

  return data;
};

export const deleteQuery = async (id) => {
  const { data } = await api.delete(`/query-definitions/${id}`);

  return data;
};

export const previewQuery = async ({ id, payload = {} }) => {
  const { data } = await api.post(`/query-definitions/${id}/preview`, payload);

  return data;
};

export const cloneQuery = async (id) => {
  const { data } = await api.post(`/query-definitions/${id}/clone`);

  return data;
};

export const publishQuery = async (id) => {
  const { data } = await api.patch(`/query-definitions/publish/${id}`);

  return data;
};

export const archiveQuery = async (id) => {
  const { data } = await api.patch(`/query-definitions/archive/${id}`);

  return data;
};

export const getVersions = async (id) => {
  const { data } = await api.get(`/query-definitions/${id}/versions`);

  return data;
};

export const rollbackVersion = async ({ id, versionNumber }) => {
  const { data } = await api.patch(`/query-definitions/rollback/${id}`, {
    versionNumber,
  });

  return data;
};
