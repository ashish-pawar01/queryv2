import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as permissionService from "../services/permissionService";

export const usePermissions = () =>
  useQuery({
    queryKey: ["permissions"],
    queryFn: permissionService.getPermissions,
  });

export const useCreatePermission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: permissionService.createPermission,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
};

export const useUpdatePermission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: permissionService.updatePermission,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
};

export const useDeletePermission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: permissionService.deletePermission,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["permissions"],
      });
    },
  });
};
