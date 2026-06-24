import api from "./api";

export const getPermissions = async () => {
  const { data } = await api.get("/permissions");

  return data;
};

export const createPermission = async (payload) => {
  const { data } = await api.post("/permissions", payload);

  return data;
};

export const updatePermission = async ({ id, payload }) => {
  const { data } = await api.put(`/permissions/${id}`, payload);

  return data;
};

export const deletePermission = async (id) => {
  const { data } = await api.delete(`/permissions/${id}`);

  return data;
};
