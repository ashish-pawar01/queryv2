import api from "./api";

export const getModules = async ({ page = 1, limit = 10, search = "" }) => {
  const { data } = await api.get("/modules", {
    params: {
      page,
      limit,
      search,
    },
  });

  return data;
};

export const createModule = async (payload) => {
  const { data } = await api.post("/modules", payload);

  return data;
};

export const updateModule = async ({ id, payload }) => {
  const { data } = await api.put(`/modules/${id}`, payload);

  return data;
};

export const deleteModule = async (id) => {
  const { data } = await api.delete(`/modules/${id}`);

  return data;
};

export const toggleModuleStatus = async (id) => {
  const { data } = await api.patch(`/modules/toggle-status/${id}`);

  return data;
};
