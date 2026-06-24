import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getModules,
  createModule,
  updateModule,
  deleteModule,
  toggleModuleStatus,
} from "../services/moduleService";

export const useModules = ({ page, limit, search }) => {
  return useQuery({
    queryKey: ["modules", page, limit, search],
    queryFn: () =>
      getModules({
        page,
        limit,
        search,
      }),
  });
};

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createModule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
    },
  });
};

export const useUpdateModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateModule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
    },
  });
};

export const useDeleteModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteModule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
    },
  });
};

export const useToggleModuleStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleModuleStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["modules"],
      });
    },
  });
};
