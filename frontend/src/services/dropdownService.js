import api from "./api";

export const getCategoryDropdown = async () => {
  const { data } = await api.get("/categories/dropdown");

  return data.data;
};

export const getModuleDropdown = async () => {
  const { data } = await api.get("/modules/dropdown");

  return data.data;
};
