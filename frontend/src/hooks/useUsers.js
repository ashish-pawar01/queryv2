import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as userService from "../services/userService";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: userService.getUsers,
  });

export const useCreateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userService.updateUser,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useToggleUserStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userService.toggleUserStatus,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
