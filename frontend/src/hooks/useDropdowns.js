import { useQuery } from "@tanstack/react-query";

import {
  getCategoryDropdown,
  getModuleDropdown,
} from "../services/dropdownService";

export const useCategoryDropdown = () => {
  return useQuery({
    queryKey: ["categoryDropdown"],
    queryFn: getCategoryDropdown,
  });
};

export const useModuleDropdown = () => {
  return useQuery({
    queryKey: ["moduleDropdown"],
    queryFn: getModuleDropdown,
  });
};
