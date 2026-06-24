import api from "./api";

export const publishQuery = async (id) => {
  const { data } = await api.patch(`/query-definitions/publish/${id}`);

  return data;
};

export const archiveQuery = async (id) => {
  const { data } = await api.patch(`/query-definitions/archive/${id}`);

  return data;
};

export const cloneQuery = async (id) => {
  const { data } = await api.post(`/query-definitions/${id}/clone`);

  return data;
};
