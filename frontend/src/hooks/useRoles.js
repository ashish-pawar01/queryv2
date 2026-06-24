import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as roleService from "../services/roleService";

export const useRoles = () =>
  useQuery({
    queryKey: ["roles"],
    queryFn: roleService.getRoles,
  });

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roleService.createRole,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roleService.updateRole,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: roleService.deleteRole,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
  });
};
