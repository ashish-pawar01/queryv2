import api from "./api";

export const previewQuery = async ({ id, payload }) => {
  const { data } = await api.post(`/query-definitions/${id}/preview`, payload);

  return data;
};
