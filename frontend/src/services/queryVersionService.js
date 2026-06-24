import api from "./api";

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
