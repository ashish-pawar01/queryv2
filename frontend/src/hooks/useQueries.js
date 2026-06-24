import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getQueries,
  getQueryById,
  createQuery,
  updateQuery,
  deleteQuery,
  cloneQuery,
  publishQuery,
  archiveQuery,
  getVersions,
  rollbackVersion,
} from "../services/queryService";

export const useQueries = () => {
  return useQuery({
    queryKey: ["queries"],
    queryFn: getQueries,
  });
};

export const useQueryById = (id) => {
  return useQuery({
    queryKey: ["query", id],
    queryFn: () => getQueryById(id),
    enabled: !!id,
  });
};

export const useCreateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuery,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};

export const useUpdateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuery,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};

export const useDeleteQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuery,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};

export const useCloneQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cloneQuery,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};

export const usePublishQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishQuery,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};

export const useArchiveQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: archiveQuery,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};

export const useVersions = (id) => {
  return useQuery({
    queryKey: ["queryVersions", id],
    queryFn: () => getVersions(id),
    enabled: !!id,
  });
};

export const useRollbackQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rollbackVersion,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};
