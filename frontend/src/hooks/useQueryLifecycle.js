import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  publishQuery,
  archiveQuery,
  cloneQuery,
} from "../services/queryLifecycleService";

export const usePublishQuery = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: publishQuery,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};

export const useArchiveQuery = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: archiveQuery,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};

export const useCloneQuery = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: cloneQuery,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["queries"],
      });
    },
  });
};