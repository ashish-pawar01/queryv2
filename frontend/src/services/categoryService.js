import api from "./api";

export const getCategories = async ({ page, limit, search }) => {
  const { data } = await api.get("/categories", {
    params: {
      page,
      limit,
      search,
    },
  });

  return data;
};

export const createCategory = async (payload) => {
  const { data } = await api.post("/categories", payload);

  return data;
};

export const updateCategory = async ({ id, payload }) => {
  const { data } = await api.put(`/categories/${id}`, payload);

  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);

  return data;
};

export const toggleCategoryStatus = async (id) => {
  const { data } = await api.patch(`/categories/toggle-status/${id}`);

  return data;
};
